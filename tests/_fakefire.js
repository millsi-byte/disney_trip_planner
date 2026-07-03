/* Fake Firestore for two-device sync tests.
   The backend (doc store + change log) lives in NODE, shared by every page
   that attaches to it — so two Playwright contexts are literally two devices
   syncing through one "cloud". Pages get a minimal firebase-compat shim
   (auth + firestore: doc/collection get/set/delete, onSnapshot via polling,
   batch, FieldValue.serverTimestamp) installed BEFORE any app script runs.
   The real vendor SDK is neutralized with a window.firebase accessor trap.

   Coverage is exactly the API surface js/cloud.js uses — nothing more. */

function makeBackend() {
  const docs = new Map();          // full path -> data object
  const log = [];                  // { seq, path, data|null, writer }
  let seq = 0;
  let failNextBatch = false;

  const subst = o => {
    if (o === '__SVTS__') return Date.now();
    if (Array.isArray(o)) return o.map(subst);
    if (o && typeof o === 'object') { const r = {}; for (const k in o) r[k] = subst(o[k]); return r; }
    return o;
  };
  const setDoc = (path, data, merge, writer) => {
    const cur = docs.get(path);
    const next = merge && cur ? Object.assign({}, cur, subst(data)) : subst(data);
    docs.set(path, next);
    log.push({ seq: ++seq, path, data: next, writer });
  };
  const childDocs = colPath =>
    [...docs.entries()]
      .filter(([p]) => p.startsWith(colPath + '/') && !p.slice(colPath.length + 1).includes('/'))
      .map(([p, d]) => ({ id: p.slice(colPath.length + 1), data: d }));

  async function op(a) {
    switch (a.op) {
      case 'getDoc': {
        const d = docs.get(a.path);
        return { exists: d !== undefined, data: d === undefined ? null : d };
      }
      case 'setDoc': setDoc(a.path, a.data, a.merge, a.writer); return {};
      case 'delDoc': docs.delete(a.path); log.push({ seq: ++seq, path: a.path, data: null, writer: a.writer }); return {};
      case 'getCol': return { docs: childDocs(a.path) };
      case 'batch': {
        if (failNextBatch) { failNextBatch = false; throw new Error('batch write failed (injected fault)'); }
        a.ops.forEach(o => setDoc(o.path, o.data, false, a.writer));
        return {};
      }
      case 'poll': {
        /* latest state per doc under path since cursor, oldest-first */
        const seen = new Set(), changes = [];
        for (let i = log.length - 1; i >= 0; i--) {
          const e = log[i];
          if (e.seq <= a.cursor) break;
          if (!e.path.startsWith(a.path + '/') || e.path.slice(a.path.length + 1).includes('/')) continue;
          if (seen.has(e.path)) continue;
          seen.add(e.path);
          changes.push({ id: e.path.slice(a.path.length + 1), data: e.data,
                         type: e.data === null ? 'removed' : 'modified', writer: e.writer });
        }
        changes.reverse();
        return { cursor: seq, changes };
      }
      case 'fault': failNextBatch = !!a.failNextBatch; return {};
      case 'count': return { n: childDocs(a.path).filter(d => !a.live || !d.data.del).length };
      default: throw new Error('unknown op ' + a.op);
    }
  }
  const seed = (path, data) => setDoc(path, data, false, 'seed');
  return { op, seed, docs };
}

/* Installed via addInitScript — runs before every app script. `clientId`
   makes our own writes echo back with hasPendingWrites=true, like the SDK. */
function fakeFirebaseInit({ clientId }) {
  let authCb = null, curUser = null;
  const call = a => window.__fsOp(a);
  const clean = o => JSON.parse(JSON.stringify(o));

  const docRef = path => ({
    _path: path,
    id: path.split('/').pop(),
    get: () => call({ op: 'getDoc', path }).then(r => ({ exists: r.exists, data: () => r.data })),
    set: (data, opts) => call({ op: 'setDoc', path, data: clean(data), merge: !!(opts && opts.merge), writer: clientId }),
    delete: () => call({ op: 'delDoc', path, writer: clientId }),
    collection: sub => colRef(path + '/' + sub),
  });
  const wrapDocs = (path, ds) => ds.map(d => ({ id: d.id, data: () => d.data, ref: docRef(path + '/' + d.id) }));
  const colRef = path => ({
    doc: id => docRef(path + '/' + id),
    get: () => call({ op: 'getCol', path }).then(r => {
      const ds = wrapDocs(path, r.docs);
      return { docs: ds, forEach: fn => ds.forEach(fn) };
    }),
    onSnapshot: (cb) => {
      let cursor = 0, stopped = false, busy = false;
      const iv = setInterval(async () => {
        if (stopped || busy) return;
        busy = true;
        try {
          const r = await call({ op: 'poll', path, cursor });
          cursor = r.cursor;
          if (r.changes.length && !stopped) cb({
            docChanges: () => r.changes.map(ch => ({
              type: ch.type,
              doc: { id: ch.id, data: () => ch.data,
                     metadata: { hasPendingWrites: ch.writer === clientId } },
            })),
          });
        } catch (e) {}
        busy = false;
      }, 60);
      return () => { stopped = true; clearInterval(iv); };
    },
  });

  const FAKE = {
    _fake: true,
    initializeApp: () => {},
    auth: () => ({
      onAuthStateChanged: cb => { authCb = cb; setTimeout(() => cb(curUser), 30); },
      signOut: () => { curUser = null; if (authCb) authCb(null); return Promise.resolve(); },
      signInWithRedirect: () => Promise.resolve(),
    }),
    firestore: () => ({
      doc: p => docRef(p),
      collection: p => colRef(p),
      settings: () => {},
      batch: () => {
        const ops = [];
        return {
          set: (ref, data) => ops.push({ path: ref._path, data: clean(data) }),
          commit: () => call({ op: 'batch', ops, writer: clientId }),
        };
      },
    }),
  };
  FAKE.auth.GoogleAuthProvider = function () { this.setCustomParameters = () => {}; };
  FAKE.firestore.FieldValue = { serverTimestamp: () => '__SVTS__' };

  window.__signIn = (uid, email) => { curUser = { uid, email }; if (authCb) authCb(curUser); };
  window.__signOut = () => { curUser = null; if (authCb) authCb(null); };

  /* the vendor compat SDK loads AFTER this and assigns window.firebase —
     swallow that assignment so the fake stays in charge */
  Object.defineProperty(window, 'firebase', { get: () => FAKE, set: () => {}, configurable: false });
}

/* wire one page to a backend as device `clientId` */
async function attachDevice(page, backend, clientId) {
  /* keep the real vendor SDK from loading at all — the accessor trap already
     neutralizes its global, but its init code still throws noisy pageerrors
     when it can't reach the swallowed namespace */
  await page.route('**/vendor/firebase/*', r => r.fulfill({ contentType: 'application/javascript', body: '/* stubbed by _fakefire */' }));
  await page.exposeFunction('__fsOp', a => backend.op(a));
  await page.addInitScript(fakeFirebaseInit, { clientId });
  await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
}

module.exports = { makeBackend, attachDevice };
