const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push('ERR:' + e.message));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver','11'); localStorage.setItem('dtp_persona','scott'); });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(async () => {
    const out = {};
    loadDemoData(true);   // blank-first boot: tests opt into the demo dataset
    localStorage.setItem('dtp_trips', JSON.stringify(TRIPS));

    /* ── 1. esc() now escapes quotes (XSS fix) while keeping text readable ── */
    out.escQuotes = esc('a"b\'c<d>&') === 'a&quot;b&#39;c&lt;d&gt;&amp;';
    // form-field round trip: value="esc(x)" must not break out
    out.escNoBreakout = !('<input value="' + esc('" onfocus="alert(1)') + '">').includes('" onfocus=');

    /* ── 2. archiveMirror keepIds includes pinned rolling-list ids ── */
    let prunedWith = null, savedBackup = null;
    window.CLOUD = { enabled:true, user:{uid:'u1'}, wid:'W', synced:true,
      saveBackup: (id,obj) => { savedBackup = {id,obj}; return Promise.resolve(true); },
      pruneBackups: (ids) => { prunedWith = ids.slice(); return Promise.resolve(); },
      push: function(){}, pushNow: () => Promise.resolve(true),
      pauseSync: function(){}, resumeSync: () => Promise.resolve() };
    saveBackups([
      {id:'bkPINNED', ts:1, iso:'', build:'1', keys:{dtp_trips:'[]'}, pinned:true,  label:'my good one', kind:'manual'},
      {id:'bkPLAIN',  ts:2, iso:'', build:'1', keys:{dtp_trips:'[]'}, pinned:false, label:'', kind:'auto'}
    ]);
    localStorage.removeItem('dtparchive_mirrored');
    archiveMirror([{id:'bkARCH', ts:3, iso:'', build:'1', keys:{dtp_trips:'[]'}, kind:'daily'}]);
    await new Promise(res => setTimeout(res, 50));
    out.keepIdsHasArchive = !!prunedWith && prunedWith.includes('bkARCH');
    out.keepIdsHasPinned  = !!prunedWith && prunedWith.includes('bkPINNED');
    out.keepIdsSkipsUnpinned = !!prunedWith && !prunedWith.includes('bkPLAIN');

    /* ── 3. pin toggle uploads to cloud; auto entries get an id at pin time ── */
    savedBackup = null;
    saveBackups([{ts:10, iso:'', build:'1', keys:{dtp_trips:'[]'}, pinned:false, kind:'auto'}]); // no id
    toggleBackupPin(0);
    await new Promise(res => setTimeout(res, 30));
    const afterPin = loadBackups()[0];
    out.pinAssignsId = !!afterPin.id;
    out.pinUploads = !!savedBackup && savedBackup.id === afterPin.id && savedBackup.obj.pinned === true;
    toggleBackupPin(0);
    await new Promise(res => setTimeout(res, 30));
    out.unpinUpdatesCloudFlag = !!savedBackup && savedBackup.obj.pinned === false;

    /* ── 4. durable restore: pauses sync, awaits pushes, resumes ── */
    const calls = { pause:0, resume:0, pushed:[] };
    window.CLOUD.pauseSync = () => calls.pause++;
    window.CLOUD.resumeSync = () => { calls.resume++; return Promise.resolve(); };
    window.CLOUD.pushNow = (k,v) => { calls.pushed.push(k); return Promise.resolve(true); };
    window.confirm = () => true;
    const snap = { ts: Date.now(), iso:'', build:'x', keys: {
      dtp_trips: JSON.stringify(TRIPS),
      dtp_family: JSON.stringify(FAMILY),
      'dtp_packing_rtrip': JSON.stringify({scott:[{cat:'C',items:[{n:'RealItem',qty:1}]}]}),
      dtp_persona: JSON.stringify('EVIL'),        // must be skipped
      'dtp__synctimes': JSON.stringify({a:1})     // must be skipped
    }};
    applyBackupObj(snap);
    await new Promise(res => setTimeout(res, 100));
    out.restorePaused = calls.pause === 1;
    out.restoreResumed = calls.resume === 1;
    out.restorePushedDataKeys = calls.pushed.includes('dtp_packing_rtrip') && calls.pushed.includes('dtp_trips');
    // Build 347: a legacy packing blob in the snapshot is migrated into a
    // per-person shard during restore; the SHARD (post-migration state) must
    // be what reaches both localStorage and the cloud.
    out.restorePushedShard = calls.pushed.includes('dtp_packing_rtrip_scott');
    out.restoreSkippedLocalKeys = !calls.pushed.includes('dtp_persona') && !calls.pushed.includes('dtp__synctimes');
    out.restorePersonaUntouched = localStorage.getItem('dtp_persona') !== '"EVIL"';
    out.restoreWroteLocal = (localStorage.getItem('dtp_packing_rtrip_scott')||'').includes('RealItem');

    /* ── 5. content viewer shows actual item names + resolves names from snapshot ── */
    const viewSnap = { ts: Date.now(), iso:'', build:'x', label:'test view', keys: {
      dtp_family: JSON.stringify([{id:'pX', name:'Scotty'}]),
      dtp_trips: JSON.stringify([{id:'tX', name:'My Real Trip'}]),
      'dtp_packing_tX': JSON.stringify({pX:[{cat:'Clothes',items:[{n:'Gum for plane',done:false},{n:'Gold Bond',done:true}]}]}),
      'dtp_todo_tX': JSON.stringify([{n:'Call Owners Locker',done:false}]),
      'dtp_wishlist_tX': JSON.stringify([{title:'Space 220',booked:false}])
    }};
    saveBackups([viewSnap]);
    S.screen = { type:'backupview', src:'local', ref:0 };
    const html = scrBackupView();
    out.viewerShowsItemNames = html.includes('Gum for plane') && html.includes('Gold Bond ✓');
    out.viewerResolvesPerson = html.includes('Scotty');
    out.viewerResolvesTrip = html.includes('My Real Trip');
    out.viewerShowsTodoAndWish = html.includes('Call Owners Locker') && html.includes('Space 220');

    /* ── 6. import round-trip: importBackupText accepts a downloaded snapshot ── */
    const fileText = JSON.stringify(viewSnap);
    const imported = importBackupText(fileText, 'my-backup.json');
    out.importPinned = imported.pinned === true && imported.kind === 'imported';
    out.importKeptDataKeys = !!imported.keys['dtp_packing_tX'];
    const parsedShape = importBackupText(JSON.stringify({keys:{dtp_trips:[{id:'q'}], dtp_persona:'x'}}), 'export.json');
    out.importAcceptsParsedShape = typeof parsedShape.keys.dtp_trips === 'string';
    out.importSkipsLocalKeys = !('dtp_persona' in parsedShape.keys);
    let importRejected = false;
    try { importBackupText('{"nope":1}', 'bad.json'); } catch(e) { importRejected = true; }
    out.importRejectsGarbage = importRejected;

    /* ── 7. orphan detection ── */
    localStorage.setItem('dtp_packing_ghostTrip', JSON.stringify({p1:[{cat:'C',items:[{n:'Lost item'}]}]}));
    localStorage.setItem('dtp_todo_ghostTrip', JSON.stringify([{n:'Lost todo'}]));
    localStorage.setItem('dtp_packing_'+TRIPS[0].id, JSON.stringify({scott:[{cat:'C',items:[{n:'x'}]}]})); // linked, must NOT appear
    const orphans = orphanTripKeys();
    out.orphanFindsGhost = orphans.some(o => o.key === 'dtp_packing_ghostTrip' && o.count === 1)
                        && orphans.some(o => o.key === 'dtp_todo_ghostTrip');
    out.orphanSkipsLinked = !orphans.some(o => o.tripId === TRIPS[0].id);
    S.screen = { type:'backups' };
    const bkHtml = scrBackups();
    out.backupsScreenShowsOrphans = bkHtml.includes('Unlinked trip data') && bkHtml.includes('dtp_packing_ghostTrip');
    out.backupsScreenHasImport = bkHtml.includes('importBackupPick') && bkHtml.includes('import-backup-file');
    out.backupsScreenHasDownload = bkHtml.includes("downloadSnapshot('local'");

    /* ── 8. buildBackup excludes dtp__ bookkeeping ── */
    localStorage.setItem('dtp__synctimes', '{"x":1}');
    const dump = buildBackup();
    out.exportSkipsBookkeeping = !('dtp__synctimes' in dump.keys) && !('dtp__lastuid' in dump.keys);
    out.exportKeepsData = 'dtp_trips' in dump.keys;

    return out;
  });

  console.log(JSON.stringify(r, null, 2));
  if (errs.length) console.log(errs.join('\n'));
  await browser.close();
  const bad = Object.entries(r).filter(([k,v]) => v !== true);
  if(bad.length){console.log('FAILURES: '+bad.map(([k])=>k).join(', '));process.exit(1);}console.log('ALL PASS');
})();
