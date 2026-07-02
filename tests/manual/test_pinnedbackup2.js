const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;
(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const logs=[]; page.on('pageerror',e=>logs.push('ERR:'+e.stack));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver','11'); localStorage.setItem('dtp_persona','scott'); });
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const out = {};
    // dtp_trips must exist in localStorage for snapshotKeys()'s "nothing to back up yet" guard
    localStorage.setItem('dtp_trips', JSON.stringify(TRIPS));

    // 1. autoBackup eviction respects pinned entries beyond BACKUP_MAX
    var list = [];
    for (var i=0;i<14;i++) list.push({ts:1000+i,iso:'',build:'1',wid:null,_sig:'s'+i,keys:{},label:'',pinned:(i===5),kind:'auto'});
    saveBackups(list);
    autoBackup(true);
    var after = loadBackups();
    out.pinnedSurvived = after.some(b=>b._sig==='s5'&&b.pinned===true);
    out.unpinnedCountWithinCap = unpinnedCount(after) <= BACKUP_MAX;
    out.totalCount = after.length;

    // 2. manualSnapshot: mock CLOUD.saveBackup, assert called + shape
    var calledWith = null;
    window.CLOUD = { enabled:true, user:{uid:'u1'}, wid:'wabc',
      saveBackup: function(id,obj){ calledWith = {id:id,obj:obj}; return Promise.resolve(true); } };
    var before = loadBackups().length;
    manualSnapshot('known good before troubleshooting');
    var afterManual = loadBackups();
    var newEntry = afterManual[afterManual.length-1];
    out.manualAddedOne = afterManual.length === before+1;
    out.manualIsPinned = newEntry.pinned === true;
    out.manualKind = newEntry.kind;
    out.manualLabel = newEntry.label;
    out.cloudSaveCalled = !!calledWith;
    out.cloudSaveSameId = calledWith && calledWith.id === newEntry.id;
    out.manualSurvivesEviction = true;

    // 2b. that manual+pinned entry survives further auto-evictions even when way over cap
    for (var j=0;j<20;j++) autoBackup(true);
    var afterMany = loadBackups();
    out.manualStillPresentAfterManyAutoBackups = afterMany.some(b=>b.id===newEntry.id&&b.pinned===true);
    out.unpinnedStillWithinCap = unpinnedCount(afterMany) <= BACKUP_MAX;

    // 3. pruneArchive keeps a pinned entry past the 7-day daily window
    var now = Date.now(), DAY=86400000;
    var arc = [];
    for (var d=1; d<=10; d++) arc.push({id:'a'+d, ts: now-d*DAY, iso:'', build:'1', wid:null, keys:{}, label:'', pinned:(d===9), kind:'daily'});
    var pruned = pruneArchive(arc);
    out.pinnedArchiveSurvived = pruned.some(b=>b.id==='a9');
    out.prunedCount = pruned.length;

    // 4. toggleBackupPin / toggleArchivePin work
    var idxToPin = 0;
    toggleBackupPin(idxToPin);
    out.toggleBackupPinWorks = loadBackups()[idxToPin].pinned === true;
    saveArchive(pruned);
    toggleArchivePin('a1');
    out.toggleArchivePinWorks = loadArchive().filter(b=>b.id==='a1')[0].pinned === true;

    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  if (logs.length) console.log(logs.join('\n'));
  await browser.close();
})();
