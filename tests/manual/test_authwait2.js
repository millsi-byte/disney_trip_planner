const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;

async function run(seedLastUid, waitMs) {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  await page.addInitScript((seedLastUid) => {
    localStorage.setItem('dtp_ver','11');
    if (seedLastUid) localStorage.setItem('dtp__lastuid','someRealFirebaseUid');
  }, seedLastUid);
  await page.goto(url,{waitUntil:'load'});
  if (waitMs) await page.waitForTimeout(waitMs);
  const r = await page.evaluate(() => ({
    screenType: S.screen && S.screen.type,
    awaitingSync: awaitingFirstCloudSync(),
    cloudExists: typeof window.CLOUD,
  }));
  await browser.close();
  return r;
}

(async () => {
  console.log('cloud-used device, immediately after load:', JSON.stringify(await run(true, 0)));
  console.log('cloud-used device, after bootFrontDoor would have polled (200ms):', JSON.stringify(await run(true, 200)));
  console.log('cloud-used device, after the 6s retry window elapses:', JSON.stringify(await run(true, 6500)));
  console.log('genuine first-ever install, after settle (1s):', JSON.stringify(await run(false, 1000)));
})();
