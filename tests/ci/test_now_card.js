/* Build 363: NOW card — live day-of companion at the top of the Agenda.
   Drives the REAL app with a pinned "now" via window.__nowOverride over the
   jul26 demo trip (days 2026-07-14 … 2026-07-19). Verifies the three states
   (live park-day / pre-trip countdown / after-trip empty), the live countdown,
   graceful weather-fail (fetch stubbed to reject → segment simply omitted), and
   that refreshNowCard() touches only #now-card-host. */
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
    // weather must fail invisibly: force fetch to reject so no cache is written
    window.fetch = () => Promise.reject(new Error('offline-test'));

    loadDemoData(true);
    S.persona = 'scott'; S.tripId = 'jul26'; S.tab = 'home'; loadLists();

    // clean the 15th so we control exactly what "today" contains
    const DAY = '2026-07-15';
    DINING.length = 0; LLS.length = 0; SHOWS.length = 0; PARADES.length = 0;
    FLIGHTS.length = 0; RESORTS.length = 0; REBOOKS.length = 0;
    const dd = DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0];
    if (dd) dd.itin = [];
    DINING.push({ id: 'ztd', trip: 'jul26', day: DAY, meal: 'Lunch', name: 'ZZNOWDINE', time: '12:30 PM', loc: 'in', park: 'ep', status: 'reserved', who: 'all' });
    LLS.push({ id: 'ztl', trip: 'jul26', day: DAY, ride: 'ZZNOWRIDE', tier: 'sp', status: 'booked', bookedTime: '10:00 AM', winStart: '10:00 AM', winEnd: '11:00 AM', who: 'all' });

    // ── State 1a: park day, 09:00 → next is the 10:00 LL, ~1h out ──
    window.__nowOverride = { date: DAY, mins: 9 * 60 };
    let h = nowCardHtml();
    r.s1_hasCard = h.indexOf('now-card') >= 0;
    r.s1_nextIsRide = h.indexOf('ZZNOWRIDE') >= 0 && h.indexOf('Next') >= 0;
    r.s1_countdown1h = h.indexOf('in 1h') >= 0;
    r.s1_laterHasDining = h.indexOf('ZZNOWDINE') >= 0;
    r.s1_weatherAbsentOffline = h.indexOf('°/') < 0;   // fetch rejected → omitted

    // ── State 1b: 13:00 → both items passed ──
    window.__nowOverride = { date: DAY, mins: 13 * 60 };
    h = nowCardHtml();
    r.s1b_nothingElse = h.indexOf('Nothing else scheduled') >= 0;
    r.s1b_rideNotNext = h.indexOf('ZZNOWRIDE') < 0;

    // ── State 1c: 06:00, before any item → LL is still next (not before-open) ──
    window.__nowOverride = { date: DAY, mins: 6 * 60 };
    h = nowCardHtml();
    r.s1c_nextStillRide = h.indexOf('ZZNOWRIDE') >= 0;

    // ── State 2: before the trip → hype countdown ──
    window.__nowOverride = { date: '2026-07-01', mins: 10 * 60 };
    h = nowCardHtml();
    r.s2_countdown = h.indexOf('13 days until') >= 0 && h.indexOf('July 2026') >= 0;

    // ── State 3: after the trip → empty ──
    window.__nowOverride = { date: '2026-08-01', mins: 10 * 60 };
    r.s3_empty = nowCardHtml() === '';

    // ── refreshNowCard touches ONLY #now-card-host ──
    window.__nowOverride = { date: DAY, mins: 9 * 60 };
    render();
    const host = document.getElementById('now-card-host');
    r.rf_hostExists = !!host;
    r.rf_hostHasCard = !!host && host.innerHTML.indexOf('ZZNOWRIDE') >= 0;
    window.__nowOverride = { date: DAY, mins: 13 * 60 };
    refreshNowCard();
    r.rf_updatedInPlace = host.innerHTML.indexOf('Nothing else scheduled') >= 0;
    r.rf_hostStillPresent = !!document.getElementById('now-card-host');

    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
