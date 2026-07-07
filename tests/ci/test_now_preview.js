/* Build 364: NOW-card preview control — a dev-only "jump the day/time" tool
   (Admin hub -> Preview NOW card) so a tester can see every NOW-card state on
   their own device without a console. Verifies: the hub row and screen only
   appear on -dev builds, applying a preview updates the live card AND shows
   an amber banner app-wide, the before/after pseudo-days exercise the other
   two NOW-card branches, clearing restores real time, and — the safety
   property that matters most — a production build (no "-dev" suffix) hides
   the feature entirely and ignores any stored override, even one left behind
   from a prior -dev session on the same device. */
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
    window.fetch = () => Promise.reject(new Error('offline-test'));
    loadDemoData(true); S.persona = 'scott'; S.tripId = 'jul26'; S.tab = 'admin'; loadLists();
    render();

    r.devHubShowsRow = document.getElementById('app').innerHTML.indexOf('Preview NOW card') >= 0;

    openScreen({ type: 'nowpreview' });
    const day = tripDays()[1].date; // 2026-07-15 (EPCOT)
    document.getElementById('np-day').value = day;
    document.getElementById('np-time__h').value = '9';
    document.getElementById('np-time__m').value = '00';
    document.getElementById('np-time__ap').value = 'AM';
    tfSync('np-time');
    npApply();
    r.appliedGoesHome = S.tab === 'home';
    r.bannerShows = document.getElementById('header-host').innerHTML.indexOf('Previewing NOW as') >= 0;
    r.exitButtonInBanner = document.getElementById('header-host').innerHTML.indexOf('npClear()') >= 0;
    r.agendaReflectsPreview = document.getElementById('app').innerHTML.indexOf('Cosmic Rewind') >= 0;

    openScreen({ type: 'nowpreview' });
    const scrHtml = document.getElementById('screen-host').innerHTML;
    r.screenShowsActiveStatus = scrHtml.indexOf('Currently previewing') >= 0;
    r.screenHasExitFooter = scrHtml.indexOf('Exit preview') >= 0;
    closeScreen();

    npClear();
    r.bannerGoneAfterClear = document.getElementById('header-host').innerHTML.indexOf('Previewing NOW as') < 0;
    r.previewGetNullAfterClear = nowPreviewGet() === null;

    openScreen({ type: 'nowpreview' });
    document.getElementById('np-day').value = '__before';
    tfSync('np-time');
    npApply();
    r.beforePseudoShowsCountdown = document.getElementById('app').innerHTML.indexOf('days until') >= 0;
    npClear();

    openScreen({ type: 'nowpreview' });
    document.getElementById('np-day').value = '__after';
    tfSync('np-time');
    npApply();
    r.afterPseudoHidesCard = !!document.getElementById('now-card-host') && document.getElementById('now-card-host').innerHTML === '';
    npClear();

    // production build: the feature must be fully inert, even with a stale key
    localStorage.setItem('dtp__nowpreview', JSON.stringify({ date: day, mins: 540, sel: day }));
    window.BUILD = '364'; // strip -dev, as the real prod build does
    render();
    r.prodHidesBanner = document.getElementById('header-host').innerHTML.indexOf('Previewing NOW as') < 0;
    S.tab = 'admin'; render();
    r.prodHidesHubRow = document.getElementById('app').innerHTML.indexOf('Preview NOW card') < 0;
    S.tab = 'home'; render();
    const np = nowParts();
    r.prodIgnoresStoredOverride = !(np.date === day && np.mins === 540);
    localStorage.removeItem('dtp__nowpreview');
    window.BUILD = '364-dev';

    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
