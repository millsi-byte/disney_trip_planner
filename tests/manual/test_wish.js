const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;
(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const logs=[]; page.on('pageerror',e=>logs.push('ERR:'+e.stack));
  await page.addInitScript(() => {
    localStorage.setItem('dtp_ver','11');
    localStorage.setItem('dtp_persona','scott');
  });
  await page.goto(url,{waitUntil:'load'});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const out={};
    const tid = S.tripId;
    // seed wishes: one by scott (open), one by hayley (open), one by scott (booked)
    WISHLIST.length = 0;
    WISHLIST.push({id:'w1',trip:tid,by:'scott',title:'Dole Whip',kind:'snack',who:[],booked:false});
    WISHLIST.push({id:'w2',trip:tid,by:'hayley',title:'Festival of Fantasy',kind:'parade',who:[],booked:false});
    WISHLIST.push({id:'w3',trip:tid,by:'scott',title:'Space Mountain',kind:'ride',who:[],booked:true});
    S.persona='scott';
    S.screen={type:'wishlist'};

    // default (Everyone): has filter row + both open wishes + booked section
    S.listWho=null; try{localStorage.setItem('bt_wlHideDone','0');}catch(e){}
    let html = wishBody();
    out.hasFilterRow = html.includes('pfilter-row');
    out.everyoneShowsBoth = html.includes('Dole Whip') && html.includes('Festival of Fantasy');
    out.everyoneShowsBooked = html.includes('Space Mountain') && html.includes('>Booked<');
    out.hasHideToggle = html.includes('wlToggleHideDone');

    // filter to hayley: only her wish
    S.listWho='hayley';
    html = wishBody();
    out.hayleyOnlyHers = html.includes('Festival of Fantasy') && !html.includes('Dole Whip') && !html.includes('Space Mountain');

    // filter to scott: his open + his booked
    S.listWho='scott';
    html = wishBody();
    out.scottShowsHis = html.includes('Dole Whip') && html.includes('Space Mountain') && !html.includes('Festival of Fantasy');

    // hide booked toggle ON (everyone)
    S.listWho=null; try{localStorage.setItem('bt_wlHideDone','1');}catch(e){}
    html = wishBody();
    out.hideBookedWorks = !html.includes('Space Mountain') && !html.includes('>Booked<') && html.includes('Show booked');
    out.openStillVisibleWhenHidden = html.includes('Dole Whip') && html.includes('Festival of Fantasy');

    return out;
  });
  console.log(JSON.stringify(r,null,2));
  if(logs.length)console.log(logs.join('\n'));
  await browser.close();
})();
