const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;

async function runFreshSecondDevice() {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  // A device signed into the real cloud account (dtp__lastuid set) but with
  // NO local trip/day cache at all -- exactly "opened the app on a different
  // device" before its first reconcile has pulled anything down.
  await page.addInitScript(() => {
    localStorage.setItem('dtp_ver','11');
    localStorage.setItem('dtp__lastuid','someRealFirebaseUid');
  });
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    var keys = [];
    for (var i=0;i<localStorage.length;i++){ var k=localStorage.key(i); if(k && k.indexOf('dtp_days')===0) keys.push(k); }
    return { daysKeysWritten: keys, daysInMemory: DAYS.length, tripsInMemory: TRIPS.length, awaitingSync: awaitingFirstCloudSync() };
  });
  await browser.close();
  return r;
}

async function runFirstEverInstall() {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  // Genuinely brand-new, never-signed-in install -- demo onboarding must
  // still work: days should still get generated for the seed trips.
  await page.addInitScript(() => { localStorage.setItem('dtp_ver','11'); });
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    var keys = [];
    for (var i=0;i<localStorage.length;i++){ var k=localStorage.key(i); if(k && k.indexOf('dtp_days')===0) keys.push(k); }
    return { daysKeysWritten: keys, daysInMemory: DAYS.length, tripsInMemory: TRIPS.length, awaitingSync: awaitingFirstCloudSync() };
  });
  await browser.close();
  return r;
}

async function runRehydrateBackfill() {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('dtp_ver','11');
    localStorage.setItem('dtp__lastuid','someRealFirebaseUid');
  });
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    // simulate reconcile() having pulled the REAL trip down (with a trip that
    // legitimately has no days yet, e.g. just created) -- rehydrate() must
    // still backfill it once the data is verified.
    localStorage.setItem('dtp_trips', JSON.stringify([{id:'realtrip', name:'Real Trip', start:'2026-08-01', end:'2026-08-03', members:['scott']}]));
    localStorage.setItem('dtp_family', JSON.stringify([{id:'scott',name:'Scott',color:'#2563EB',admin:true}]));
    rehydrate();
    var d = DAYS.filter(x => x.trip === 'realtrip');
    return { realTripDaysGenerated: d.length, dates: d.map(x=>x.date) };
  });
  await browser.close();
  return r;
}

(async () => {
  console.log('Fresh 2nd device (cloud-used, no local cache):', JSON.stringify(await runFreshSecondDevice()));
  console.log('First-ever install (demo onboarding):', JSON.stringify(await runFirstEverInstall()));
  console.log('rehydrate() backfill after real data arrives:', JSON.stringify(await runRehydrateBackfill()));
})();
