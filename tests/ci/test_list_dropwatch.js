/* Build 355: the damage safety net. If a remote sync sharply shrinks a trip's
   lists (an old-build device clobbered a shard), the app can't undo it in place
   but pins the most-recent pre-drop snapshot and records a visible alert. This
   exercises listDropWatch() directly with the demo dataset loaded. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push('ERR:' + e.message));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
  await page.goto(APP_URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const r = await page.evaluate(() => {
    const out = {};
    loadDemoData(true);                       // real lists on the demo trip
    // ensure a couple of automatic snapshots exist to pin
    autoBackup(true);
    var baseline = activeListItemCount();
    out.hasMeaningfulBaseline = baseline >= 8;

    // simulate a remote apply that sharply shrinks the lists
    window.CLOUD = { applyingRemote: true };
    _listCounts[S.tripId] = baseline;         // last-known good count
    TODO = TODO.slice(0, 1);                  // gut the lists
    WISHLIST = [];
    Object.keys(PACKING).forEach(pid => PACKING[pid] = []);
    _listCounts[S.tripId] = activeListItemCount();   // loadLists would set this; emulate it
    var pinnedBefore = loadBackups().filter(b => b.pinned).length;
    listDropWatch(baseline);

    out.dropAlertRecorded = !!localStorage.getItem('dtp__listdrop');
    var drop = JSON.parse(localStorage.getItem('dtp__listdrop') || '{}');
    out.dropAlertShape = drop.before === baseline && drop.after < baseline && !!drop.tid;
    out.snapshotGotPinned = loadBackups().filter(b => b.pinned).length > pinnedBefore;
    out.backupsBannerShows = (function(){ S.screen = { type:'backups' }; return scrBackups().includes('Your lists shrank'); })();

    // does NOT fire on the user's OWN local edits (applyingRemote false)
    localStorage.removeItem('dtp__listdrop');
    window.CLOUD = { applyingRemote: false };
    _listCounts[S.tripId] = 40;
    TODO = []; WISHLIST = []; Object.keys(PACKING).forEach(pid => PACKING[pid] = []);
    _listCounts[S.tripId] = activeListItemCount();
    listDropWatch(40);
    out.ignoresLocalEdits = !localStorage.getItem('dtp__listdrop');

    // does NOT fire on a tiny list (no meaningful baseline)
    window.CLOUD = { applyingRemote: true };
    listDropWatch(3);
    out.ignoresTinyLists = !localStorage.getItem('dtp__listdrop');

    return out;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(r);
})();
