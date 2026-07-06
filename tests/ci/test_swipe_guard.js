/* Build 358: unsaved-changes guard behind the swipe-back / top-left close.
   The swipe gesture itself is feel-tested on a device; THIS covers the
   safety-critical half — that closing an editor with unsaved edits warns,
   respects cancel vs confirm, never warns on a clean screen, and never warns
   on the programmatic post-save close(). Drives the REAL editor through
   openScreen so the rAF baseline capture runs against real DOM. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push('ERR:' + e.message));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
  await page.goto(APP_URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  await page.evaluate(() => {
    loadDemoData(true);
    S.persona = 'scott';                       // admin → pass editor shows the name field
    window.__confirmCount = 0;
    window.__confirmReturn = true;
    window.confirm = () => { window.__confirmCount++; return window.__confirmReturn; };
  });

  // open a real editor screen
  await page.evaluate(() => { S.screen = null; S._scrBack = null; renderOverlay(); openScreen({ type: 'passedit' }); });
  await page.waitForTimeout(150);              // let the rAF baseline capture run

  const out = await page.evaluate(async () => {
    const r = {};
    const nameInput = () => document.querySelector('#screen-host #pass-name');

    r.editorOpened = !!(S.screen && S.screen.type === 'passedit') && !!nameInput();
    r.sigNonEmpty = screenFormSig().length > 0;
    r.cleanNotDirty = screenDirty() === false;      // nothing changed yet

    // change a field → dirty
    nameInput().value = 'Scott Sorcerer Pass EDIT';
    r.dirtyAfterEdit = screenDirty() === true;

    // guarded close, user taps "Keep editing" (confirm→false): screen stays
    window.__confirmReturn = false;
    const kept = closeScreenGuarded();
    r.cancelKeepsScreen = kept === false && !!S.screen && window.__confirmCount === 1;

    // guarded close, user confirms discard (confirm→true): screen closes
    window.__confirmReturn = true;
    const closed = closeScreenGuarded();
    await new Promise(res => setTimeout(res, 320));
    r.confirmClosesScreen = closed === true && !S.screen && window.__confirmCount === 2;

    return r;
  });

  // clean screen closes with NO prompt
  await page.evaluate(() => { S.screen = null; S._scrBack = null; renderOverlay(); openScreen({ type: 'passedit' }); });
  await page.waitForTimeout(150);
  Object.assign(out, await page.evaluate(async () => {
    const r = {};
    const before = window.__confirmCount;
    closeScreenGuarded();                        // nothing edited
    await new Promise(res => setTimeout(res, 320));
    r.cleanCloseNoPrompt = window.__confirmCount === before && !S.screen;
    return r;
  }));

  // post-save path (programmatic closeScreen) never prompts, even when dirty
  await page.evaluate(() => { S.screen = null; S._scrBack = null; renderOverlay(); openScreen({ type: 'passedit' }); });
  await page.waitForTimeout(150);
  Object.assign(out, await page.evaluate(async () => {
    const r = {};
    document.querySelector('#screen-host #pass-name').value = 'changed then saved';
    const before = window.__confirmCount;
    closeScreen();                               // what a Save handler calls
    await new Promise(res => setTimeout(res, 320));
    r.saveCloseNoPrompt = window.__confirmCount === before && !S.screen;
    return r;
  }));

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
