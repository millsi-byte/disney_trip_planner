/* Per-item sync engine (audit F-01 Tier B), Build 350.
   TWO REAL DEVICES: two browser contexts running the actual app, syncing
   through one shared fake-Firestore backend living in Node (tests/_fakefire).
   This is the test the whole engine was designed against:
     - concurrent edits to DIFFERENT items both survive (the F-01 fix)
     - same-item edits converge to one version on every device
     - a tombstone beats a stale offline copy (no ghost resurrection)
     - an offline EDIT beats a delete (content wins over absence)
     - an offline local delete propagates as a tombstone
     - migration is parity-checked, idempotent, and an interrupted run
       leaves the flag off with blob mode fully intact
     - blob-mode collections keep syncing exactly as before */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');
const { makeBackend, attachDevice } = require('../_fakefire');

const WID = 'TESTWID123456';

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const be = makeBackend();
  be.seed('workspaces/' + WID, { name: 'Test Fam', by: 'uidA', createdAt: 1 });
  be.seed('workspaces/' + WID + '/members/uidA', { email: 'a@test.dev', joinedAt: 1 });
  be.seed('workspaces/' + WID + '/members/uidB', { email: 'b@test.dev', joinedAt: 1 });
  be.seed('users/uidA/meta/profile', { wid: WID, wids: [WID] });
  be.seed('users/uidB/meta/profile', { wid: WID, wids: [WID] });

  const out = {};
  const errs = [];
  const newDevice = async (id) => {
    const page = await (await browser.newContext()).newPage();
    page.on('pageerror', e => errs.push(id + ': ' + e.message));
    await attachDevice(page, be, id);
    await page.goto(APP_URL, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    return page;
  };

  /* ── boot: A seeds demo data locally, signs in, pushes up (blob mode) ── */
  const A = await newDevice('devA');
  await A.evaluate(() => loadDemoData(true));
  await A.evaluate(() => __signIn('uidA', 'a@test.dev'));
  await A.waitForTimeout(1500);
  out.aSynced = await A.evaluate(() => !!(window.CLOUD.user && window.CLOUD.synced));

  /* ── B: blank device signs in, adopts everything ── */
  const B = await newDevice('devB');
  await B.evaluate(() => __signIn('uidB', 'b@test.dev'));
  await B.waitForTimeout(1800);
  const ids = p => p.evaluate(() => JSON.stringify(DINING.map(d => d.id).sort()));
  out.bAdopted = await B.evaluate(() => Array.isArray(DINING) && DINING.length >= 2);
  out.bMatchesA = (await ids(B)) === (await ids(A));

  /* ── blob mode still works before any flag is on (regression guard) ── */
  await A.evaluate(() => { DINING[0].conf = 'BLOB-MODE-EDIT'; save('dtp_dining', DINING); });
  await B.waitForTimeout(800);
  out.blobModeStillSyncs = await B.evaluate(() => DINING.some(d => d.conf === 'BLOB-MODE-EDIT'));

  /* ── enable per-item sync for dining on A; B picks the flag up on its next
        reconcile (resumeSync = what any sign-in/tenant-switch runs) ── */
  const migrated = await A.evaluate(() => window.CLOUD.enableItemSync('dining'));
  out.migrationCountsItems = migrated >= 2;
  out.flagOnA = await A.evaluate(() => window.CLOUD.itemMode('dining'));
  out.migrationParity = (await be.op({ op: 'count', path: 'workspaces/' + WID + '/items', live: true })).n === migrated;
  await B.evaluate(() => window.CLOUD.resumeSync());
  await B.waitForTimeout(1200);
  out.flagOnB = await B.evaluate(() => window.CLOUD.itemMode('dining'));

  /* ── migration idempotent: enabling again neither dupes nor loses docs ── */
  const again = await A.evaluate(() => window.CLOUD.enableItemSync('dining'));
  out.migrationIdempotent = again === migrated &&
    (await be.op({ op: 'count', path: 'workspaces/' + WID + '/items', live: true })).n === migrated;

  /* ── THE F-01 TEST: concurrent edits to DIFFERENT items both survive ── */
  await A.evaluate(() => { DINING[0].conf = 'EDIT-FROM-A'; save('dtp_dining', DINING); });
  await B.evaluate(() => { DINING[1].conf = 'EDIT-FROM-B'; save('dtp_dining', DINING); });
  await A.waitForTimeout(1200); await B.waitForTimeout(300);
  const bothEdits = p => p.evaluate(() =>
    DINING.some(d => d.conf === 'EDIT-FROM-A') && DINING.some(d => d.conf === 'EDIT-FROM-B'));
  out.concurrentEditsSurviveOnA = await bothEdits(A);
  out.concurrentEditsSurviveOnB = await bothEdits(B);

  /* ── same item from both sides converges to ONE version everywhere ── */
  await A.evaluate(() => { DINING[0].conf = 'SAME-A'; save('dtp_dining', DINING); });
  await B.evaluate(() => { DINING[0].conf = 'SAME-B'; save('dtp_dining', DINING); });
  await A.waitForTimeout(1500); await B.waitForTimeout(300);
  const v0 = p => p.evaluate(() => DINING.map(d => d.conf).filter(c => c === 'SAME-A' || c === 'SAME-B').join(','));
  const va = await v0(A), vb = await v0(B);
  out.sameItemConverges = va === vb && (va === 'SAME-A' || va === 'SAME-B');

  /* ── tombstone vs stale copy: A deletes while B is offline; B comes back
        holding the item and must NOT resurrect it ── */
  const delId = await A.evaluate(() => {
    const id = DINING[1].id;
    DINING = DINING.filter(d => d.id !== id); save('dtp_dining', DINING);
    return id;
  });
  await B.evaluate(() => window.CLOUD.pauseSync());   // offline before the delete arrives
  await A.waitForTimeout(600);
  out.bStillHoldsStale = await B.evaluate(id => DINING.some(d => d.id === id), delId);
  await B.evaluate(() => window.CLOUD.resumeSync());
  await B.waitForTimeout(1200);
  out.tombstoneBeatsStaleCopy = await B.evaluate(id => !DINING.some(d => d.id === id), delId);
  out.deleteHeldOnA = await A.evaluate(id => !DINING.some(d => d.id === id), delId);

  /* ── edit beats delete: B edits offline, A deletes; the edit resurrects ── */
  const warId = await A.evaluate(() => DINING[0].id);
  await B.evaluate(() => window.CLOUD.pauseSync());
  await B.evaluate(id => {
    const it = DINING.find(d => d.id === id); it.conf = 'OFFLINE-EDIT-WINS';
    save('dtp_dining', DINING);
  }, warId);
  await A.evaluate(id => {
    DINING = DINING.filter(d => d.id !== id); save('dtp_dining', DINING);
  }, warId);
  await A.waitForTimeout(600);
  await B.evaluate(() => window.CLOUD.resumeSync());
  await B.waitForTimeout(1500); await A.waitForTimeout(600);
  const hasWar = p => p.evaluate(id => {
    const it = DINING.find(d => d.id === id); return !!it && it.conf === 'OFFLINE-EDIT-WINS';
  }, warId);
  out.editBeatsDeleteOnB = await hasWar(B);
  out.editBeatsDeleteOnA = await hasWar(A);

  /* ── offline local delete propagates as a tombstone on reconnect ── */
  const offDelId = await B.evaluate(() => DINING[DINING.length - 1].id);
  await B.evaluate(() => window.CLOUD.pauseSync());
  await B.evaluate(id => { DINING = DINING.filter(d => d.id !== id); save('dtp_dining', DINING); }, offDelId);
  await B.evaluate(() => window.CLOUD.resumeSync());
  await B.waitForTimeout(1500); await A.waitForTimeout(300);
  out.offlineDeletePropagates = await A.evaluate(id => !DINING.some(d => d.id === id), offDelId);

  /* ── interrupted migration: injected batch failure → flag stays off,
        blob mode untouched; the retry then succeeds ── */
  await be.op({ op: 'fault', failNextBatch: true });
  const failMsg = await A.evaluate(() =>
    window.CLOUD.enableItemSync('lls').then(() => null, e => e.message || 'rejected'));
  out.interruptedMigrationRejects = failMsg !== null;
  out.interruptedMigrationLeavesFlagOff = await A.evaluate(() => !window.CLOUD.itemMode('lls'));
  await A.evaluate(() => { if (LLS.length) { LLS[0].conf = 'LLS-BLOB-EDIT'; } save('dtp_lls', LLS); });
  await B.waitForTimeout(800);
  out.blobModeIntactAfterFailedMigration = await B.evaluate(() =>
    !LLS.length || LLS.some(l => l.conf === 'LLS-BLOB-EDIT'));
  const llsCount = await A.evaluate(() => window.CLOUD.enableItemSync('lls'));
  out.migrationRetrySucceeds = await A.evaluate(() => window.CLOUD.itemMode('lls')) && llsCount >= 0;

  /* ── kv blob is retired once item mode owns a collection: A's item-mode
        edits must NOT touch the cloud kv doc ── */
  const kvDining = await be.op({ op: 'getDoc', path: 'workspaces/' + WID + '/kv/dtp_dining' });
  out.kvBlobRetired = !(kvDining.data && (kvDining.data.v || '').includes('EDIT-FROM-A'));

  await browser.close();
  out.noPageErrors = errs.length === 0;
  if (errs.length) console.log(errs.join('\n'));
  report(out);
})();
