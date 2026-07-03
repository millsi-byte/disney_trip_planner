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
  await page.evaluate(() => loadDemoData(true));   // blank-first boot: opt into demo dataset
  const r = await page.evaluate(() => {
    const out = {};
    localStorage.setItem('dtp_trips', JSON.stringify(TRIPS));
    localStorage.setItem('dtp_wid', 'realFamilyWid');
    localStorage.setItem('dtp_persona', 'scott');
    localStorage.setItem('dtp_tripId', 'jul26');
    localStorage.setItem('dtp_partyId', 'g1');

    // 1. snapshotKeys() must NOT capture local-only identity/selector keys
    var keys = snapshotKeys();
    out.capturesWid = 'dtp_wid' in keys;
    out.capturesPersona = 'dtp_persona' in keys;
    out.capturesTripId = 'dtp_tripId' in keys;
    out.capturesPartyId = 'dtp_partyId' in keys;
    out.capturesTrips = 'dtp_trips' in keys; // SHOULD still capture real shared data

    // 2. applyBackupObj defensively skips local-only keys even in an OLD-format
    //    backup that still has them (simulating a pre-fix snapshot, e.g. one
    //    taken on a different device with a DIFFERENT workspace/persona).
    window.confirm = () => true; // auto-confirm the restore dialog
    localStorage.setItem('dtp_wid', 'currentDeviceWid');
    localStorage.setItem('dtp_persona', 'currentPersona');
    var oldFormatBackup = {
      ts: Date.now(), iso:'', build:'1', keys: {
        dtp_trips: JSON.stringify(TRIPS),
        dtp_wid: JSON.stringify('someOtherDeviceWid'),
        dtp_persona: JSON.stringify('someOtherPersona'),
        dtp_tripId: JSON.stringify('someOtherTrip'),
        dtp_partyId: JSON.stringify('someOtherParty')
      }
    };
    applyBackupObj(oldFormatBackup);
    out.widUnchangedAfterRestore = localStorage.getItem('dtp_wid') === 'currentDeviceWid';
    out.personaUnchangedAfterRestore = localStorage.getItem('dtp_persona') === 'currentPersona';

    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  if (logs.length) console.log(logs.join('\n'));
  await browser.close();
})();
