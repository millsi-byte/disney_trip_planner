const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;
(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  await page.addInitScript(() => { localStorage.setItem('dtp_ver','11'); localStorage.setItem('dtp_persona','scott'); });
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(500);
  await page.evaluate(() => loadDemoData(true));   // blank-first boot: opt into demo dataset
  const r = await page.evaluate(() => {
    const out = {};

    // Scenario 1: real data present, user CANCELS the confirm -> nothing wiped
    let confirmCalls = 0;
    window.confirm = () => { confirmCalls++; return false; };
    const familyBefore = FAMILY.length, tripsBefore = TRIPS.length;
    wizSkip();
    out.scenario1_confirmWasCalled = confirmCalls === 1;
    out.scenario1_familyUnchanged = FAMILY.length === familyBefore;
    out.scenario1_tripsUnchanged = TRIPS.length === tripsBefore;

    // Scenario 2: real data present, user CONFIRMS -> wipe proceeds as before
    confirmCalls = 0;
    window.confirm = () => { confirmCalls++; return true; };
    wizSkip();
    out.scenario2_confirmWasCalled = confirmCalls === 1;
    out.scenario2_familyWiped = FAMILY.length === 1;
    out.scenario2_tripsWiped = TRIPS.length === 0;

    // Scenario 3: genuine first-run (nothing to lose) -> no confirm() at all
    FAMILY.length = 0; TRIPS.length = 0; PARTIES.length = 0;
    var oid='p'+Date.now();
    FAMILY.push({id:oid,name:'Solo Owner',color:'#000',admin:true,parties:[]});
    confirmCalls = 0;
    window.confirm = () => { confirmCalls++; return false; }; // would fail the test if called
    wizSkip();
    out.scenario3_confirmWasNOTCalled = confirmCalls === 0;
    out.scenario3_proceededFine = FAMILY.length === 1; // resetToBlank ran, no error

    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})();
