/* Build 362: wish thumbs up/down votes showed only a count, never who voted.
   wishVoteNames now renders the voters' names under the vote buttons (used on
   the wish list and on wish cards in chat). */
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
    const w = { id: 'zw', trip: 'jul26', by: 'scott', title: 'Dole Whip', kind: 'snack', who: [], booked: false,
                votes: { scott: 'up', hayley: 'down' } };

    const row = wishVoteRow(w);
    r.hasNamesLine = row.indexOf('wl-votenames') >= 0;
    r.showsUpVoter = new RegExp('👍[^<]*' + scott).test(row.replace(/<[^>]+>/g, ''));
    r.showsDownVoter = new RegExp('👎[^<]*' + hayley).test(row.replace(/<[^>]+>/g, ''));
    // no names line when nobody has voted
    r.noLineWhenNoVotes = wishVoteRow({ id: 'z2', trip: 'jul26', by: 'scott', title: 'x' }).indexOf('wl-votenames') < 0;
    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
