/* Build 355: the list-clobber sync race (the wife's-phone incident).
   Two real app instances (two browser contexts) sync through one shared fake
   Firestore. Device A makes genuine, synced edits to its own to-do shard (one
   add, one delete). Device B boots holding a STALE pre-347 legacy blob for A's
   creator id — so migrateListShards seeds a stale copy of A's shard on B — and
   then B adds ITS OWN first item during the window before B has refreshed
   in-memory state from the reconcile. Pre-fix, B's save rebuilds every shard
   from stale memory and clobbers A's just-corrected shard with a fresh
   timestamp; post-fix, B only writes the shard it actually changed (its own),
   so A's data survives and everyone converges to A's real list + B's item.

   The reconcile→memory gap is made deterministic by monkey-patching the global
   `rehydrate` on B to defer its work behind a short timeout — stretching the
   real (but tiny) production gap into a controllable window without touching
   app code. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');
const { makeBackend, attachDevice } = require('../_fakefire');

const WID = 'RACEWID000111';
const TRIP = { id:'racetrip', name:'Race Trip', sub:'', members:['scott','hayley'],
               parties:['g1'], by:'scott', start:'2026-09-01', end:'2026-09-03',
               dates:'Sep 1 – 3, 2026', color:'#333' };
const staleBlob = JSON.stringify([
  {id:'keep1', trip:'racetrip', n:'Call Owners Locker', done:false, by:'scott', who:[]},
  {id:'keep2', trip:'racetrip', n:'Book Space 220',     done:false, by:'scott', who:[]}
]);

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const be = makeBackend();
  be.seed('workspaces/'+WID, { name:'Race Fam', by:'uidA', createdAt:1 });
  be.seed('workspaces/'+WID+'/members/uidA', { email:'a@test.dev', joinedAt:1 });
  be.seed('workspaces/'+WID+'/members/uidB', { email:'b@test.dev', joinedAt:1 });
  be.seed('users/uidA/meta/profile', { wid:WID, wids:[WID] });
  be.seed('users/uidB/meta/profile', { wid:WID, wids:[WID] });

  const out = {}, errs = [];
  const mkTrip = () => { TRIPS.push(TRIP); save('dtp_trips', TRIPS); };  // eslint-disable-line

  // ── Device A: real synced edits ──
  const A = await (await browser.newContext()).newPage();
  A.on('pageerror', e => errs.push('devA: ' + e.message));
  await attachDevice(A, be, 'devA');
  await A.goto(APP_URL, { waitUntil:'load' }); await A.waitForTimeout(600);
  await A.evaluate((trip) => {
    loadDemoData(true); localStorage.removeItem('dtp__demo');
    TRIPS.push(trip); save('dtp_trips', TRIPS);
    S.tripId='racetrip'; S.persona='scott'; loadLists();
    genDays('racetrip'); saveDays();
    TODO.push({id:'keep1', trip:'racetrip', n:'Call Owners Locker', done:false, by:'scott', who:[]});
    TODO.push({id:'keep2', trip:'racetrip', n:'Book Space 220', done:false, by:'scott', who:[]});
    saveTODO();
  }, TRIP);
  await A.evaluate(() => __signIn('uidA','a@test.dev'));
  await A.waitForTimeout(1500);
  out.aSynced = await A.evaluate(() => !!(window.CLOUD.user && window.CLOUD.synced));
  // A's genuine later history: one add, one delete — pushed up
  await A.evaluate(() => {
    TODO.push({id:'new1', trip:'racetrip', n:'Print park tickets', done:false, by:'scott', who:[]});
    TODO = TODO.filter(t => t.id !== 'keep2');
    saveTODO();
  });
  await A.waitForTimeout(1500);
  out.cloudHasAReal = (await be.op({ op:'getDoc', path:'workspaces/'+WID+'/kv/dtp_todo_racetrip_scott' }))
    .data.v.includes('new1');

  // ── Device B: stale legacy blob, boots and races ──
  const B = await (await browser.newContext()).newPage();
  B.on('pageerror', e => errs.push('devB: ' + e.message));
  await attachDevice(B, be, 'devB');
  await B.addInitScript((blob) => { localStorage.setItem('dtp_todo_racetrip', blob); }, staleBlob);
  await B.goto(APP_URL, { waitUntil:'load' }); await B.waitForTimeout(600);
  await B.evaluate((args) => {
    const [trip, blob] = args;
    loadDemoData(true); localStorage.removeItem('dtp__demo');
    TRIPS.push(trip); save('dtp_trips', TRIPS);
    S.tripId='racetrip'; S.persona='hayley';
    localStorage.setItem('dtp_todo_racetrip', blob);   // re-force stale (loadDemoData touched storage)
    loadLists();   // migrateListShards seeds a STALE dtp_todo_racetrip_scott shard on B
  }, [TRIP, staleBlob]);
  out.bHasStaleShard = await B.evaluate(() =>
    (localStorage.getItem('dtp_todo_racetrip_scott')||'').includes('keep2'));

  // Deterministically construct the exact race state: a reconcile has corrected
  // scott's shard on DISK (write A's real cloud value straight to localStorage,
  // exactly what reconcile's kv-merge does at cloud.js:591) while B's in-memory
  // TODO and its LIST_SNAP baseline are BOTH still stale — the split-second an
  // established device sits in after reconcile fixes disk but before rehydrate
  // refreshes memory. No timing dependence.
  const aReal = (await be.op({ op:'getDoc', path:'workspaces/'+WID+'/kv/dtp_todo_racetrip_scott' })).data.v;
  out.bRaceState = await B.evaluate((real) => {
    localStorage.setItem('dtp_todo_racetrip_scott', real);     // disk = A's real shard now
    return (localStorage.getItem('dtp_todo_racetrip_scott')||'').includes('new1')
        && TODO.some(t => t.id === 'keep2') && !TODO.some(t => t.id === 'new1');  // memory still stale
  }, aReal);

  // ── THE RACE: B adds its OWN first item while memory is stale. Record which
  //    shard keys B pushes. The fix's whole job: an unrelated edit pushes ONLY
  //    the shard it changed (hayley), never rebuilds+pushes someone else's
  //    (scott). Without the fix, saveByCreator pushes scott too — stale content,
  //    fresh timestamp — overwriting the just-corrected disk value and the cloud. ──
  const bpush = await B.evaluate(() => {
    window.__bpush = [];
    var real = window.CLOUD.push.bind(window.CLOUD);
    window.CLOUD.push = function(k,v){ window.__bpush.push(k); return real(k,v); };
    TODO.push({id:'hayley1', trip:'racetrip', n:'Pack sunscreen', done:false, by:'hayley', who:[]});
    saveTODO();
    return window.__bpush.slice();
  });
  out.bPushedOwnShard = bpush.includes('dtp_todo_racetrip_hayley');
  out.bDidNotPushScottShard = !bpush.includes('dtp_todo_racetrip_scott');   // ← fails pre-fix
  out.aShardOnDiskSurvives = await B.evaluate(() => {                       // corrected disk value untouched
    var d = localStorage.getItem('dtp_todo_racetrip_scott') || '';
    return d.includes('new1') && !d.includes('keep2');
  });

  // convergence: sign B in for real; reconcile + listener settle everyone
  await B.evaluate(() => __signIn('uidB','b@test.dev'));
  await B.waitForTimeout(1600);

  await B.waitForTimeout(1500); await A.waitForTimeout(1500);

  const scottIds  = p => p.evaluate(() => TODO.filter(t=>t.by==='scott').map(t=>t.id).sort());
  const hayleyIds = p => p.evaluate(() => TODO.filter(t=>t.by==='hayley').map(t=>t.id).sort());
  out.aKeepsOwnEdits        = JSON.stringify(await scottIds(A))  === JSON.stringify(['keep1','new1']);
  out.bConvergesToRealScott = JSON.stringify(await scottIds(B))  === JSON.stringify(['keep1','new1']);
  out.bOwnItemSurvives      = (await hayleyIds(B)).includes('hayley1');
  out.aSeesHayleyItem       = (await hayleyIds(A)).includes('hayley1');

  await browser.close();
  out.noPageErrors = errs.length === 0;
  if (errs.length) console.log(errs.join('\n'));
  report(out);
})();
