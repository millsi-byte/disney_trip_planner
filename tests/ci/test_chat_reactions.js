/* Build 362: reaction attribution. On a phone the "who reacted" info only
   existed in a desktop-only hover title, so you couldn't tell who left a
   👍/❤️. chatReactions now renders the reactor names as a visible line. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push('ERR:' + e.message));
  await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
  await page.goto(APP_URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const out = await page.evaluate(() => {
    const r = {};
    loadDemoData(true);
    S.persona = 'scott'; S.tripId = 'jul26';
    const scott = person('scott').name, hayley = person('hayley').name;
    const m = { id: 'zmsg', trip: 'jul26', from: 'hayley', text: 'hi', reactions: { '👍': ['scott', 'hayley'], '❤️': ['hayley'] } };

    const html = chatReactions(m);
    r.hasNamesLine = html.indexOf('rxn-names') >= 0;
    r.showsThumbReactors = html.indexOf(scott) >= 0 && html.indexOf(hayley) >= 0;   // both 👍 reactors named
    r.namesPairedWithEmoji = new RegExp('👍[^<]*' + scott).test(html.replace(/<[^>]+>/g, ''));
    // no names line when there are no reactions
    r.noLineWhenEmpty = chatReactions({ id: 'z2', trip: 'jul26', from: 'hayley', text: 'x' }).indexOf('rxn-names') < 0;
    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
