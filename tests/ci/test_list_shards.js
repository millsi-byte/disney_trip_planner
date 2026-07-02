/* Build 347: sharded list sync.
   Verifies the F-01 harm-reduction layer: packing per-person, todo/wishlist
   per-creator, change-detection saves, idempotent merge migration, orphan
   detection and snapshot-viewer support for both storage generations. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push('ERR:' + e.message));
  await page.addInitScript(() => {
    localStorage.setItem('dtp_ver', '11');
    localStorage.setItem('dtp_persona', 'scott');
    // legacy combined blobs, as a Build-345 device would have written them
    localStorage.setItem('dtp_packing_jul26', JSON.stringify({
      scott:  [{cat:'C', items:[{n:'Gum for plane', done:false}]}],
      hayley: [{cat:'C', items:[{n:'Kindle', done:true}]}]
    }));
    localStorage.setItem('dtp_todo_jul26', JSON.stringify([
      {id:'t1', trip:'jul26', n:'Call Owners Locker', done:false, by:'scott', who:[]},
      {id:'t2', trip:'jul26', n:'Book Space 220',     done:false, by:'hayley', who:[]}
    ]));
    localStorage.setItem('dtp_wishlist_jul26', JSON.stringify([
      {id:'w1', trip:'jul26', by:'scott', title:'Dole Whip', kind:'snack', who:[], booked:false}
    ]));
  });
  await page.goto(APP_URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(async () => {
    const out = {};
    localStorage.setItem('dtp_trips', JSON.stringify(TRIPS));
    S.tripId = 'jul26'; loadLists();

    /* ── 1. migration split the legacy blobs into shards ── */
    out.packingShardScott  = (localStorage.getItem('dtp_packing_jul26_scott')  || '').includes('Gum for plane');
    out.packingShardHayley = (localStorage.getItem('dtp_packing_jul26_hayley') || '').includes('Kindle');
    out.legacyPackingEmptied = localStorage.getItem('dtp_packing_jul26') === '{}';
    out.todoShardScott  = (localStorage.getItem('dtp_todo_jul26_scott')  || '').includes('Call Owners Locker');
    out.todoShardHayley = (localStorage.getItem('dtp_todo_jul26_hayley') || '').includes('Book Space 220');
    out.legacyTodoEmptied = localStorage.getItem('dtp_todo_jul26') === '[]';
    out.wishShardScott = (localStorage.getItem('dtp_wishlist_jul26_scott') || '').includes('Dole Whip');

    /* ── 2. in-memory shape unchanged ── */
    out.memPacking = !!(PACKING.scott && PACKING.hayley) &&
      PACKING.scott[0].items[0].n === 'Gum for plane';
    out.memTodoFlat = Array.isArray(TODO) && TODO.length === 2;
    out.memWishFlat = Array.isArray(WISHLIST) && WISHLIST.length === 1;

    /* ── 3. migration is idempotent + merges by id (shard wins, new ids added) ── */
    localStorage.setItem('dtp_todo_jul26', JSON.stringify([
      {id:'t1', trip:'jul26', n:'STALE OVERWRITE ATTEMPT', done:true, by:'scott', who:[]},   // same id → shard wins
      {id:'t3', trip:'jul26', n:'New from old device',     done:false, by:'scott', who:[]}   // new id → merged in
    ]));
    migrateListShards();
    const scottTodos = JSON.parse(localStorage.getItem('dtp_todo_jul26_scott'));
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
    out.editPushesOwnShard = pushed.includes('dtp_packing_jul26_scott');
    out.editSkipsOtherShards = !pushed.includes('dtp_packing_jul26_hayley')
      && !pushed.some(k => k.indexOf('dtp_todo_') === 0)
      && !pushed.some(k => k.indexOf('dtp_wishlist_') === 0);

    /* ── 5. deleting a creator's last item writes [] to their shard only ── */
    pushed.length = 0;
    WISHLIST = [];   // scott's only wish removed
    saveWish();
    out.deleteWritesEmptyShard = pushed.includes('dtp_wishlist_jul26_scott')
      && localStorage.getItem('dtp_wishlist_jul26_scott') === '[]';
    out.deleteTouchesNothingElse = pushed.length === 1;

    /* ── 6. orphan detector understands shards ── */
    localStorage.setItem('dtp_packing_ghostTrip_scott', JSON.stringify([{cat:'C', items:[{n:'Lost'}]}]));
    const orphans = orphanTripKeys();
    out.orphanFindsShard = orphans.some(o => o.key === 'dtp_packing_ghostTrip_scott' && o.tripId === 'ghostTrip' && o.count === 1);
    out.orphanSkipsLiveShards = !orphans.some(o => o.tripId === 'jul26');

    /* ── 7. snapshot viewer renders shard-generation backups ── */
    const snap = { ts: Date.now(), iso:'', build:'347-dev', keys: {
      dtp_family: JSON.stringify([{id:'scott', name:'Scott'}]),
      dtp_trips: JSON.stringify([{id:'jul26', name:'July 2026'}]),
      'dtp_packing_jul26_scott': localStorage.getItem('dtp_packing_jul26_scott'),
      'dtp_todo_jul26_scott': localStorage.getItem('dtp_todo_jul26_scott')
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
