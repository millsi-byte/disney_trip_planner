/* Build 415: load the global to-do template into an already-started list.
   tdLoadTemplate() must MERGE — add template to-dos you don't already have,
   keep existing items (and their done state), skip duplicates — and the button
   must only show once your list is started and your template is non-empty. */
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
    TRIPS.push({id:'tt', name:'Tmpl Trip', sub:'', members:['scott','hayley'], parties:['g1'], by:'scott',
                start:'2026-09-01', end:'2026-09-03', dates:'Sep 1 – 3, 2026', color:'#333'});
    save('dtp_trips', TRIPS); genDays('tt'); saveDays();
    S.tripId = 'tt'; S.persona = 'scott'; loadLists();

    TODO_TMPL.scott = [{n:'Book dining', when:'60 days out'}, {n:'Pack ponchos', priv:true}, {n:'Check in online'}];
    out.hiddenBeforeStart = !todoSticky([]).includes('tdLoadTemplate()');

    /* started list: one overlapping item (already done), one unique; plus an
       item someone else created with the same name — must not block the add */
    TODO.push({id:'a1', trip:'tt', by:'scott', n:'book dining', done:true, who:[]});
    TODO.push({id:'a2', trip:'tt', by:'scott', n:'Buy sunscreen', done:false, who:[]});
    TODO.push({id:'h1', trip:'tt', by:'hayley', n:'Check in online', done:false, who:[]});
    saveTODO();
    out.buttonShown = todoSticky(tdMine('scott')).includes('tdLoadTemplate()');

    tdLoadTemplate();
    const mine = tdMine('scott');
    out.mergedNames = mine.map(t => t.n).join('|') === 'book dining|Buy sunscreen|Pack ponchos|Check in online';
    out.existingDoneKept = mine[0].done === true;
    out.newFieldsCopied = mine[2].priv === true && mine[2].done === false && mine[2].trip === 'tt';
    out.uniqueIds = new Set(TODO.map(t => t.id)).size === TODO.length;
    out.persistedToShard = (localStorage.getItem('dtp_todo_tt_scott') || '').includes('Pack ponchos');

    const before = TODO.length;
    tdLoadTemplate();
    out.idempotent = TODO.length === before;

    TODO_TMPL.scott = [];
    out.hiddenWhenTemplateEmpty = !todoSticky(tdMine('scott')).includes('tdLoadTemplate()');
    return out;
  });
  r.noPageErrors = errs.length === 0 || errs;
  await browser.close();
  report(r);
})();
