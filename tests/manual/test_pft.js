const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;
(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const logs=[]; page.on('pageerror',e=>logs.push('ERR:'+e.stack));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver','11'); localStorage.setItem('dtp_persona','scott'); });
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const out={};
    // two passes covering July 2026: one for scott (a trip member), one for hayley (not on the new trip)
    PASSES.length=0;
    PASSES.push({id:'a1',category:'ap',person:'scott', name:"Scott's Pass", tier:'sorcerer',activation:'2026-01-01',expiration:'2027-01-01',activated:true});
    PASSES.push({id:'a2',category:'ap',person:'hayley',name:"Hayley's Pass",tier:'sorcerer',activation:'2026-01-01',expiration:'2027-01-01',activated:true});
    // make the active trip have ONLY scott as a member
    var t = tripById(S.tripId) || trip();
    out.tripId = S.tripId;
    t.members = ['scott'];
    var pft = passesForTrip().map(p=>p.person).sort();
    out.passesForTrip = pft;
    out.onlyScott = pft.length===1 && pft[0]==='scott';
    // now add hayley to the trip -> both should show
    t.members = ['scott','hayley'];
    out.bothWhenBoth = passesForTrip().map(p=>p.person).sort().join(',') === 'hayley,scott';
    return out;
  });
  console.log(JSON.stringify(r,null,2));
  if(logs.length)console.log(logs.join('\n'));
  await browser.close();
})();
