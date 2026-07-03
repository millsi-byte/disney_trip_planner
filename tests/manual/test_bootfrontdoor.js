const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;
(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  await page.addInitScript(() => { localStorage.setItem('dtp_ver','11'); localStorage.setItem('dtp__lastuid','someRealFirebaseUid'); });
  await page.goto(url,{waitUntil:'load'});
  const r = await page.evaluate(() => {
    var out = {};
    // Force the locked state, exactly as the synchronous boot-tail lock would.
    openScreen({type:'authwait'});
    out.beforeBootFrontDoor = S.screen.type;

    // Simulate CLOUD existing + enabled + no resolved user yet (the exact
    // race window: signed-in-before device, real auth hasn't finished).
    var realCloud = window.CLOUD;
    window.CLOUD = {enabled:true, user:null};
    bootFrontDoor();
    out.afterBootFrontDoor_cloudEnabledNoUser = S.screen.type;

    // Re-lock, then simulate CLOUD not having loaded at all yet.
    openScreen({type:'authwait'});
    window.CLOUD = undefined;
    bootFrontDoor();
    out.afterBootFrontDoor_cloudMissing = S.screen.type;

    window.CLOUD = realCloud;
    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})();
