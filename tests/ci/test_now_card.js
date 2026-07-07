/* Build 363/365: NOW card — live day-of companion at the top of the Agenda.
   Drives the REAL app with a pinned "now" via window.__nowOverride over the
   jul26 demo trip (days 2026-07-14 … 2026-07-19). Verifies the approved mockup
   structure for both states (live park-day card with LIVE header, weather AFTER
   hours+crowd, Next-up + countdown pill, Later-today, tap footer; pre-trip
   big-number countdown with trip-week weather + First-up), the countdown,
   graceful weather-fail, refreshNowCard() touching only #now-card-host, the
   collapse chevron (expanded by default, collapsible, chevron never triggers
   navigation), and that tapping into the agenda always visibly responds —
   including the regression case where the previewed day was ALREADY selected
   (a bare selDay() would silently no-op there; nowOpenAgenda() must still
   reset/open the Daily Agenda card so the tap is never a dead end). */
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
    window.fetch = () => Promise.reject(new Error('offline-test')); // weather must fail invisibly

    loadDemoData(true);
    S.persona = 'scott'; S.tripId = 'jul26'; S.tab = 'home'; loadLists();

    const DAY = '2026-07-15';
    DINING.length = 0; LLS.length = 0; SHOWS.length = 0; PARADES.length = 0;
    FLIGHTS.length = 0; RESORTS.length = 0; REBOOKS.length = 0;
    const dd = DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0];
    if (dd) dd.itin = [];
    DINING.push({ id: 'ztd', trip: 'jul26', day: DAY, meal: 'Lunch', name: 'ZZNOWDINE', time: '12:30 PM', loc: 'in', park: 'ep', status: 'reserved', who: 'all' });
    LLS.push({ id: 'ztl', trip: 'jul26', day: DAY, ride: 'ZZNOWRIDE', tier: 'sp', status: 'booked', bookedTime: '10:00 AM', winStart: '10:00 AM', winEnd: '11:00 AM', who: 'all' });

    // ── State 1a: park day, 09:00 → live card, next is the 10:00 LL, 1h out ──
    window.__nowOverride = { date: DAY, mins: 9 * 60 };
    let h = nowCardHtml();
    r.s1_liveHeader = h.indexOf('now-live') >= 0 && h.indexOf('>Now<') >= 0;
    r.s1_parkName = h.indexOf('now-park') >= 0 && h.indexOf('EPCOT') >= 0;
    r.s1_nextUp = h.indexOf('Next up') >= 0 && h.indexOf('ZZNOWRIDE') >= 0;
    r.s1_countdownPill = h.indexOf('now-cd2') >= 0 && h.indexOf('1h 0m') >= 0 && h.indexOf('until') >= 0;
    r.s1_laterHasDining = h.indexOf('now-later') >= 0 && h.indexOf('ZZNOWDINE') >= 0;
    r.s1_tapFooter = h.indexOf('now-tap') >= 0 && h.indexOf('Open today') >= 0;
    r.s1_weatherAbsentOffline = h.indexOf('°/') < 0; // fetch rejected → segment omitted

    // ── State 1b: 13:00 → both items passed ──
    window.__nowOverride = { date: DAY, mins: 13 * 60 };
    h = nowCardHtml();
    r.s1b_nothingElse = h.indexOf('Nothing else scheduled') >= 0;
    r.s1b_rideNotNext = h.indexOf('ZZNOWRIDE') < 0;

    // ── State 1c: 06:00, before any item → LL still next ──
    window.__nowOverride = { date: DAY, mins: 6 * 60 };
    r.s1c_nextStillRide = nowCardHtml().indexOf('ZZNOWRIDE') >= 0;

    // ── State 2: before the trip → big-number countdown ──
    window.__nowOverride = { date: '2026-07-01', mins: 10 * 60 };
    h = nowCardHtml();
    r.s2_bigNumber = h.indexOf('now-num') >= 0 && h.indexOf('>13<') >= 0;
    r.s2_daysUntil = h.indexOf('days until') >= 0;
    r.s2_dateRange = h.indexOf('Jul 14') >= 0 && h.indexOf('July 2026') >= 0;
    r.s2_firstUp = h.indexOf('now-first') >= 0; // first-up line present (07-14 has a dinner)

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

    // ── Collapse chevron: expanded by default; toggling never navigates ──
    window.__nowOverride = { date: DAY, mins: 9 * 60 };
    S.dayIdx = 1; S.open = defOpen(); render();
    r.c_expandedByDefault = document.getElementById('now-card-host').innerHTML.indexOf('now-nlabel') >= 0;
    document.querySelector('#now-card-host .now-hd .chev').click();
    r.c_collapsedAfterChevron = document.getElementById('now-card-host').innerHTML.indexOf('now-headline') >= 0
      && document.getElementById('now-card-host').innerHTML.indexOf('now-nlabel') < 0;
    r.c_headlineKeepsInfo = document.getElementById('now-card-host').innerHTML.indexOf('ZZNOWRIDE') >= 0;
    r.c_chevronDidNotNavigate = S.tab === 'home' && S.dayIdx === 1;
    document.querySelector('#now-card-host .now-hd .chev').click();
    r.c_reexpands = document.getElementById('now-card-host').innerHTML.indexOf('now-nlabel') >= 0;

    // ── Pre-trip card also collapses without losing its headline number ──
    window.__nowOverride = { date: '2026-07-01', mins: 10 * 60 };
    S.open = defOpen(); render();
    document.querySelector('#now-card-host .now-hd .chev').click();
    const preCollapsed = document.getElementById('now-card-host').innerHTML;
    r.c_preCollapsedKeepsNumber = preCollapsed.indexOf('>13<') >= 0 && preCollapsed.indexOf('now-wxweek') < 0;
    S.open = defOpen();

    // ── Tap-to-open-agenda regression: already on the previewed day, the tap
    //    must STILL visibly respond (reset/open the Daily Agenda card) rather
    //    than silently no-op because dayIdx didn't change ──
    window.__nowOverride = { date: DAY, mins: 9 * 60 };
    S.dayIdx = 1; S.open = defOpen(); S.open.itin = false; render();
    r.t_itinClosedBeforeTap = S.open.itin === false;
    document.querySelector('#now-card-host .now-tap').click();
    r.t_dayIdxStillCorrect = S.dayIdx === 1;
    r.t_itinReopenedByTap = S.open.itin === true;
    r.t_stillOnHomeTab = S.tab === 'home';

    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
