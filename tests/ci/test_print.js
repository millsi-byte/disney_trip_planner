/* Build 359 / 416: Print / Save-as-PDF for the three lists.
   Verifies each builder produces a clean sheet, respects the hide-completed
   and everyone/mine scope filters, and that printCurrentList populates
   #print-host, calls window.print(), and clears on afterprint.
   On iPhone/iPad the same button must hand a PDF to the system share sheet
   (Print / Save to Files) instead of the deferred window.print() iOS ignores. */
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
    PACKING.scott[0].items.push({ n: 'ZZUNIQUEPACK', done: true, qty: 1, store: 'person', packFor: 'hayley' });
    localStorage.setItem('bt_pkHideDone', '1');
    r.pkHideExcludesDone = prPackingHTML().indexOf('ZZUNIQUEPACK') < 0;
    localStorage.setItem('bt_pkHideDone', '0');
    const pk = prPackingHTML();
    r.pkShowIncludesDone = pk.indexOf('ZZUNIQUEPACK') >= 0;
    r.pkShowsStorage = pk.indexOf('On me') >= 0;                              // storage label
    r.pkShowsAssignment = pk.indexOf('Pack for ' + person('hayley').name) >= 0; // who it's packed for
    r.pkNoFaintText = pk.indexOf('#777') < 0;                                 // completed text no longer too light
    r.pkDoneReadable = pk.indexOf('color:#111') >= 0;                         // item names near-black
    // an item someone else assigned to you to pack shows under "Assigned to you"
    if (!PACKING.hayley) PACKING.hayley = [{ cat: 'Misc', items: [] }];
    PACKING.hayley[0].items.push({ n: 'ZZASSIGNED', done: false, store: 'bag', qty: 1, packFor: 'scott', by: 'hayley' });
    const pk2 = prPackingHTML();
    r.pkAssignedToYou = pk2.indexOf('ZZASSIGNED') >= 0 && pk2.indexOf('Assigned to you to pack') >= 0;

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

    // the on-screen button is wired to the same path (desktop still prints)
    window.__printed = 0;
    openScreen({type:'packlist'});
    var btn = document.querySelector('#screen-host button[onclick*="printCurrentList"]');
    r.printButtonPresent = !!btn && btn.textContent.indexOf('Print / Save PDF') >= 0;
    if (btn) btn.click();
    await new Promise(res => setTimeout(res, 160));
    r.printButtonCallsPrint = window.__printed === 1;
    r.printButtonFillsHost = document.getElementById('print-host').innerHTML.indexOf('Packing List') >= 0;

    // ── iOS device detection (iPadOS uses a desktop Mac user-agent) ──
    r.iosPhone = isIOSSignals('Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1', 'iPhone', 5, false) === true;
    r.iosPad = isIOSSignals('Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X) AppleWebKit/605.1.15', 'iPad', 5, false) === true;
    r.iosPadDesktopUA = isIOSSignals('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15', 'MacIntel', 5, false) === true;
    r.iosHomeScreen = isIOSSignals('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15', 'MacIntel', 0, true) === true;
    r.iosMacIsDesktop = isIOSSignals('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15', 'MacIntel', 0, false) === false;
    r.iosAndroidIsNo = isIOSSignals('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36', 'Linux armv8l', 5, false) === false;

    // ── iOS share sheet receives a real PDF of the current list ──
    isIOSDevice = function(){ return true; };
    window.__shareCalls = 0;
    window.__shared = null;
    var shareFn = function(data){ window.__shareCalls++; window.__shared = data; return Promise.resolve(); };
    var canYes = function(data){ return !!(data && data.files && data.files.length); };
    try {
      Object.defineProperty(navigator, 'share', {configurable:true, writable:true, value:shareFn});
      Object.defineProperty(navigator, 'canShare', {configurable:true, writable:true, value:canYes});
    } catch (e) {
      navigator.share = shareFn;
      navigator.canShare = canYes;
    }
    window.__printed = 0;
    PACKING.scott[0].items.push({ n: 'ZZPDFITEM', done: false, qty: 1, store: 'bag' });
    localStorage.setItem('bt_pkHideDone', '0');
    printCurrentList('packing');
    r.iosShareCalled = window.__shareCalls === 1 && window.__shared.files.length === 1;
    r.iosDidNotCallWindowPrint = window.__printed === 0;
    var f = window.__shared.files[0];
    r.iosPdfType = f.type === 'application/pdf' && /\.pdf$/.test(f.name) && f.name.indexOf('Packing List') >= 0;
    var pdfTxt = new TextDecoder('latin1').decode(await f.arrayBuffer());
    r.iosPdfHeader = pdfTxt.indexOf('%PDF-1.4') === 0 && /%%EOF\s*$/.test(pdfTxt);
    r.iosPdfHasList = pdfTxt.indexOf('Packing List') >= 0 && pdfTxt.indexOf('ZZPDFITEM') >= 0 && pdfTxt.indexOf('[ ]') >= 0;
    r.iosPdfKeepsQty = pdfTxt.indexOf('Suitcase x7') >= 0;
    r.iosPdfStructure = (function(txt){
      var sm = txt.match(/startxref\n(\d+)\n%%EOF\s*$/);
      if (!sm) return false;
      var at = parseInt(sm[1], 10);
      if (txt.slice(at, at + 5) !== 'xref\n') return false;
      var re = /\/Length (\d+) >>\nstream\n/g, m, ok = false;
      while ((m = re.exec(txt))) {
        ok = true;
        var len = parseInt(m[1], 10);
        var start = m.index + m[0].length;
        if (txt.slice(start, start + len).length !== len) return false;
        if (txt.slice(start + len, start + len + 9) !== 'endstream') return false;
      }
      return ok;
    })(pdfTxt);

    PACKING.scott[0].items.push({ n: 'ZZ (paren) item', done: false, qty: 1, store: 'bag' });
    printCurrentList('packing');
    var pdf2 = new TextDecoder('latin1').decode(await window.__shared.files[0].arrayBuffer());
    r.iosPdfEscapesParens = pdf2.indexOf('ZZ \\(paren\\) item') >= 0 && /%%EOF\s*$/.test(pdf2);

    PACKING.scott[0].items.push({ n: 'ZZHIDEME', done: true, qty: 1, store: 'person' });
    localStorage.setItem('bt_pkHideDone', '1');
    printCurrentList('packing');
    var pdf3 = new TextDecoder('latin1').decode(await window.__shared.files[0].arrayBuffer());
    r.iosPdfHidesPacked = pdf3.indexOf('ZZHIDEME') < 0 && pdf3.indexOf('ZZPDFITEM') >= 0;
    localStorage.setItem('bt_pkHideDone', '0');

    var many = [];
    for (var i = 0; i < 90; i++) many.push({text:'Row ' + i + ' sunscreen shirts socks', size:14, bold:false});
    var big = buildListPdf(many);
    r.iosPdfMultipage = (big.match(/\/Type \/Page /g) || []).length >= 2;

    // no file-share support: still do something in the same tap (not the
    // 80ms desktop timer, which iOS would ignore)
    var callsBefore = window.__shareCalls;
    window.__printed = 0;
    window.__opened = null;
    var canNo = function(){ return false; };
    try { Object.defineProperty(navigator, 'canShare', {configurable:true, writable:true, value:canNo}); }
    catch (e2) { navigator.canShare = canNo; }
    window.open = function(){
      var doc = { html:'', open:function(){}, close:function(){}, write:function(h){ this.html += h; } };
      var w = { document:doc, focus:function(){}, print:function(){ window.__printed++; }, close:function(){} };
      window.__opened = w;
      return w;
    };
    printCurrentList('todo');
    r.iosFallbackSyncPrint = window.__printed === 1
      && window.__shareCalls === callsBefore
      && window.__opened
      && window.__opened.document.html.indexOf('To-Do List') >= 0;

    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
