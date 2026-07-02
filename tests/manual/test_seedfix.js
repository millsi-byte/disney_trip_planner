const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;

async function run(seedLastUid) {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  await page.addInitScript((seedLastUid) => {
    localStorage.setItem('dtp_ver','11');
    if (seedLastUid) localStorage.setItem('dtp__lastuid','someRealFirebaseUid');
    localStorage.setItem('dtp_persona','scott');
  }, seedLastUid);
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    S.tripId = 'jul26';
    loadLists();
    return {
      packingIsSeeded: JSON.stringify(PACKING) === JSON.stringify(PACKING_SEED),
      todoIsSeeded: JSON.stringify(TODO) === JSON.stringify(TODO_SEED),
      packingScottKeys: Object.keys(PACKING)
    };
  });
  await browser.close();
  return r;
}

(async () => {
  const cloudUsedDevice = await run(true);   // device that HAS used cloud before -> must NOT seed
  const brandNewDevice  = await run(false);  // truly first-ever launch -> SHOULD still seed (preserve demo UX)
  console.log('cloud-used device (no local cache):', JSON.stringify(cloudUsedDevice));
  console.log('brand-new device (never signed in):', JSON.stringify(brandNewDevice));
})();
