/* Build 347: sharded list sync.
   Verifies the F-01 harm-reduction layer: packing per-person, todo/wishlist
   per-creator, change-detection saves, idempotent merge migration, orphan
   detection and snapshot-viewer support for both storage generations.
   Runs against the demo dataset on a dedicated 'testtrip' so it can't
   interfere with (or be masked by) the demo trip's own shards. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push('ERR:' + e.message));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
  await page.goto(APP_URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(async () => {
    const out = {};
    loadDemoData(true);   /* people/admin persona come from the demo bundle */
    TRIPS.push({id:'testtrip', name:'Test Trip', sub:'', members:['scott','hayley'], parties:['g1'], by:'scott',
                start:'2026-09-01', end:'2026-09-03', dates:'Sep 1 – 3, 2026', color:'#333'});
    save('dtp_trips', TRIPS);
    genDays('testtrip'); saveDays();   // a real trip always has day skeletons; renders assume it

    // legacy combined blobs, as a Build-345 device would have written them
    localStorage.setItem('dtp_packing_testtrip', JSON.stringify({
      scott:  [{cat:'C', items:[{n:'Gum for plane', done:false}]}],
      hayley: [{cat:'C', items:[{n:'Kindle', done:true}]}]
    }));
    localStorage.setItem('dtp_todo_testtrip', JSON.stringify([
      {id:'t1', trip:'testtrip', n:'Call Owners Locker', done:false, by:'scott', who:[]},
      {id:'t2', trip:'testtrip', n:'Book Space 220',     done:false, by:'hayley', who:[]}
    ]));
    localStorage.setItem('dtp_wishlist_testtrip', JSON.stringify([
      {id:'w1', trip:'testtrip', by:'scott', title:'Dole Whip', kind:'snack', who:[], booked:false}
    ]));
    S.tripId = 'testtrip'; loadLists();

    /* ── 1. migration split the legacy blobs into shards ── */
    out.packingShardScott  = (localStorage.getItem('dtp_packing_testtrip_scott')  || '').includes('Gum for plane');
    out.packingShardHayley = (localStorage.getItem('dtp_packing_testtrip_hayley') || '').includes('Kindle');
    out.legacyPackingEmptied = localStorage.getItem('dtp_packing_testtrip') === '{}';
    out.todoShardScott  = (localStorage.getItem('dtp_todo_testtrip_scott')  || '').includes('Call Owners Locker');
    out.todoShardHayley = (localStorage.getItem('dtp_todo_testtrip_hayley') || '').includes('Book Space 220');
    out.legacyTodoEmptied = localStorage.getItem('dtp_todo_testtrip') === '[]';
    out.wishShardScott = (localStorage.getItem('dtp_wishlist_testtrip_scott') || '').includes('Dole Whip');

    /* ── 2. in-memory shape unchanged ── */
    out.memPacking = !!(PACKING.scott && PACKING.hayley) &&
      PACKING.scott[0].items[0].n === 'Gum for plane';
    out.memTodoFlat = Array.isArray(TODO) && TODO.length === 2;
    out.memWishFlat = Array.isArray(WISHLIST) && WISHLIST.length === 1;

    /* ── 3. migration is idempotent + merges by id (shard wins, new ids added) ── */
    localStorage.setItem('dtp_todo_testtrip', JSON.stringify([
      {id:'t1', trip:'testtrip', n:'STALE OVERWRITE ATTEMPT', done:true, by:'scott', who:[]},   // same id → shard wins
      {id:'t3', trip:'testtrip', n:'New from old device',     done:false, by:'scott', who:[]}   // new id → merged in
    ]));
    migrateListShards();
    const scottTodos = JSON.parse(localStorage.getItem('dtp_todo_testtrip_scott'));
    out.mergeShardWins = scottTodos.some(t => t.id === 't1' && t.n === 'Call Owners Locker');
    out.mergeAddsNewIds = scottTodos.some(t => t.id === 't3');
    out.mergeNoDupes = scottTodos.filter(t => t.id === 't1').length === 1;

    /* ── 4. change-detection: editing ONE person's data touches ONLY their shard ── */
    loadLists();
    const pushed = [];
    window.CLOUD = { enabled:true, user:{uid:'u'}, synced:true,
      push: (k) => pushed.push(k), applyingRemote:false };
    PACKING.scott[0].items.push({n:'Sunscreen', done:false});
    saveLists();
    out.editPushesOwnShard = pushed.includes('dtp_packing_testtrip_scott');
    out.editSkipsOtherShards = !pushed.includes('dtp_packing_testtrip_hayley')
      && !pushed.some(k => k.indexOf('dtp_todo_') === 0)
      && !pushed.some(k => k.indexOf('dtp_wishlist_') === 0);

    /* ── 5. deleting a creator's last item writes [] to their shard only ── */
    pushed.length = 0;
    WISHLIST = [];   // scott's only wish removed
    saveWish();
    out.deleteWritesEmptyShard = pushed.includes('dtp_wishlist_testtrip_scott')
      && localStorage.getItem('dtp_wishlist_testtrip_scott') === '[]';
    out.deleteTouchesNothingElse = pushed.length === 1;

    /* ── 6. orphan detector understands shards ── */
    localStorage.setItem('dtp_packing_ghostTrip_scott', JSON.stringify([{cat:'C', items:[{n:'Lost'}]}]));
    const orphans = orphanTripKeys();
    out.orphanFindsShard = orphans.some(o => o.key === 'dtp_packing_ghostTrip_scott' && o.tripId === 'ghostTrip' && o.count === 1);
    out.orphanSkipsLiveShards = !orphans.some(o => o.tripId === 'testtrip' || o.tripId === 'jul26');

    /* ── 6b. deleting an orphan empties it THROUGH sync + drops it from the list ── */
    const delPushed = [];
    window.CLOUD = { enabled:true, user:{uid:'u'}, synced:true,
      push: (k) => delPushed.push(k), applyingRemote:false };
    window.confirm = () => true;
    deleteOrphanKey('dtp_packing_ghostTrip_scott');
    out.orphanDeleteEmpties = localStorage.getItem('dtp_packing_ghostTrip_scott') === '[]';
    out.orphanDeleteSyncs = delPushed.includes('dtp_packing_ghostTrip_scott');
    out.orphanDeleteDropsFromList = !orphanTripKeys().some(o => o.key === 'dtp_packing_ghostTrip_scott');
    /* clear-all sweeps the rest */
    localStorage.setItem('dtp_todo_ghostTrip_x', JSON.stringify([{id:'g1', n:'Lost todo'}]));
    deleteAllOrphans();
    out.orphanClearAllEmpties = localStorage.getItem('dtp_todo_ghostTrip_x') === '[]' && orphanTripKeys().length === 0;

    /* ── 7. snapshot viewer renders shard-generation backups ── */
    const snap = { ts: Date.now(), iso:'', build:'347-dev', keys: {
      dtp_family: JSON.stringify([{id:'scott', name:'Scott'}]),
      dtp_trips: JSON.stringify([{id:'testtrip', name:'Test Trip'}]),
      'dtp_packing_testtrip_scott': localStorage.getItem('dtp_packing_testtrip_scott'),
      'dtp_todo_testtrip_scott': localStorage.getItem('dtp_todo_testtrip_scott')
    }};
    saveBackups([snap]);
    S.screen = { type:'backupview', src:'local', ref:0 };
    const html = scrBackupView();
    out.viewerRendersShardPacking = html.includes('Gum for plane') && html.includes('Scott');
    out.viewerRendersShardTodo = html.includes('Call Owners Locker');

    /* ── 8. trip cleanup removes legacy + shards ── */
    localStorage.setItem('dtp_packing_deadTrip', '{}');
    localStorage.setItem('dtp_packing_deadTrip_x', '[]');
    localStorage.setItem('dtp_todo_deadTrip_x', '[]');
    removeTripListKeys('deadTrip');
    out.cleanupRemovesAll = !localStorage.getItem('dtp_packing_deadTrip')
      && !localStorage.getItem('dtp_packing_deadTrip_x')
      && !localStorage.getItem('dtp_todo_deadTrip_x');

    return out;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(r);
})();
