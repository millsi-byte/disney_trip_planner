/* Build 359: Print / Save-as-PDF for the three lists.
   Verifies each builder produces a clean sheet, respects the hide-completed
   and everyone/mine scope filters, and that printCurrentList populates
   #print-host, calls window.print(), and clears on afterprint. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push('ERR:' + e.message));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
  await page.goto(APP_URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const out = await page.evaluate(async () => {
    const r = {};
    loadDemoData(true);
    S.persona = 'scott'; S.tripId = 'jul26'; loadLists();

    // ── Packing ──
    r.pkHeader = prPackingHTML().includes('Packing List') && prPackingHTML().includes(trip().name);
    r.pkCheckboxes = /[☐☑]/.test(prPackingHTML());
    // controlled hide-completed: a done item vanishes when "hide packed" is on
    PACKING.scott[0].items.push({ n: 'ZZUNIQUEPACK', done: true, qty: 1 });
    localStorage.setItem('bt_pkHideDone', '1');
    r.pkHideExcludesDone = prPackingHTML().indexOf('ZZUNIQUEPACK') < 0;
    localStorage.setItem('bt_pkHideDone', '0');
    r.pkShowIncludesDone = prPackingHTML().indexOf('ZZUNIQUEPACK') >= 0;

    // ── To-Do ──
    r.tdHeader = prTodoHTML().includes('To-Do List') && prTodoHTML().includes('My to-dos');
    TODO.push({ id: 'ztd', trip: 'jul26', n: 'ZZUNIQUETODO', done: false, by: 'scott', who: [] });
    r.tdHasOwnItem = prTodoHTML().indexOf('ZZUNIQUETODO') >= 0;
    // everyone scope (scott is admin) lists other people by name
    S.tdScope = 'all';
    const hay = person('hayley');
    r.tdEveryoneShowsOthers = !!hay && prTodoHTML().indexOf(hay.name) >= 0;
    S.tdScope = 'mine';

    // ── Wish ──
    r.wlHeader = prWishHTML().includes('Wish List');
    WISHLIST.push({ id: 'zwl', trip: 'jul26', by: 'scott', title: 'ZZUNIQUEWISH', kind: 'snack', who: [], booked: false });
    r.wlHasItem = prWishHTML().indexOf('ZZUNIQUEWISH') >= 0;

    // ── printCurrentList flow ──
    window.__printed = 0;
    window.print = () => { window.__printed++; };
    printCurrentList('todo');
    r.printHostFilled = document.getElementById('print-host').innerHTML.indexOf('To-Do List') >= 0;
    await new Promise(res => setTimeout(res, 160));
    r.printCalled = window.__printed === 1;
    // content must SURVIVE an early iOS-style 'afterprint' (the blank-page bug)
    window.dispatchEvent(new Event('afterprint'));
    r.printHostSurvivesAfterprint = document.getElementById('print-host').innerHTML.indexOf('To-Do List') >= 0;
    // it's cleared when you leave the list
    clearPrintHost();
    r.printHostClearsOnLeave = document.getElementById('print-host').innerHTML === '';

    // print-host is hidden on screen (only shown by @media print)
    r.printHostHiddenOnScreen = getComputedStyle(document.getElementById('print-host')).display === 'none';

    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
