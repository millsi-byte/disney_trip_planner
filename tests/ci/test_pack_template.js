/* Build 414: load the global packing template into an already-started list.
   pkLoadTemplate() must MERGE — add missing sections/items, keep existing
   items (and their packed state), skip duplicates — and the button must only
   show on your own started list when you have a non-empty template. */
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
    loadDemoData(true);
    TRIPS.push({id:'pt', name:'Tmpl Trip', sub:'', members:['scott','hayley'], parties:['g1'], by:'scott',
                start:'2026-09-01', end:'2026-09-03', dates:'Sep 1 – 3, 2026', color:'#333'});
    save('dtp_trips', TRIPS); genDays('pt'); saveDays();
    S.tripId = 'pt'; S.persona = 'scott'; loadLists();

    PACKING_TMPL.scott = [
      {cat:'Clothes', items:[{n:'Socks', qty:5}, {n:'Hat', qty:1}]},
      {cat:'Tech',    items:[{n:'Charger', qty:1, store:'person'}]}
    ];
    /* started list: one overlapping item (already packed), one unique */
    PACKING.scott = [{cat:'clothes', items:[{n:'socks', qty:2, done:true, who:[]}, {n:'Swimsuit', qty:1, done:false, who:[]}]}];
    pkMarkStarted('scott'); saveLists();

    out.buttonShown = packSticky('scott').includes('pkLoadTemplate()');
    out.buttonHiddenForOthers = !packSticky('hayley').includes('pkLoadTemplate()');

    pkLoadTemplate();
    const L = PACKING.scott;
    const names = L.map(c => c.cat + ':' + c.items.map(i => i.n).join(','));
    out.mergedIntoExistingSection = names[0] === 'clothes:socks,Swimsuit,Hat';
    out.newSectionAdded = names[1] === 'Tech:Charger';
    out.existingPackedKept = L[0].items[0].done === true && L[0].items[0].qty === 2;
    out.newItemsUnpacked = L[0].items[2].done === false && L[1].items[0].store === 'person';
    out.persistedToShard = (localStorage.getItem('dtp_packing_pt_scott') || '').includes('Charger');

    const before = JSON.stringify(PACKING.scott);
    pkLoadTemplate();
    out.idempotent = JSON.stringify(PACKING.scott) === before;

    PACKING_TMPL.scott = [];
    out.hiddenWhenTemplateEmpty = !packSticky('scott').includes('pkLoadTemplate()');
    return out;
  });
  r.noPageErrors = errs.length === 0 || errs;
  await browser.close();
  report(r);
})();
