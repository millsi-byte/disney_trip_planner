/* Build 370: live Disney park data (ThemeParks.wiki) — DEV BUILDS ONLY.
   Stubs fetch with canned API JSON and drives papiRefresh over the jul26 demo
   trip. Verifies: hours records created with correct 12h formatting + early/
   late mapped from EXTRA_HOURS entries; re-runs are idempotent (no churn, no
   duplicates); records a person created or edited are NEVER touched (and a
   manual save clears src, ending auto-updates); the curated headline parade +
   night show auto-create once as 'scheduled'; non-headline shows don't; the
   pick-list add creates an 'attend' item; the day-of crowd estimate writes
   only over empty/api-owned values; and the whole engine is inert on a
   production BUILD string. */
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
    S.persona = 'scott'; S.tripId = 'jul26'; S.tab = 'home'; loadLists();
    localStorage.removeItem('dtp__parkapi');

    // trip days are 2026-07-14..19; pin "today" inside the trip on the EPCOT day
    const DAY = '2026-07-15';
    window.__nowOverride = { date: DAY, mins: 10 * 60 };

    // wipe demo hours/shows/parades so we assert only on what the API writes
    for (let i = PARKHOURS.length - 1; i >= 0; i--) PARKHOURS.splice(i, 1);
    for (let i = SHOWS.length - 1; i >= 0; i--) SHOWS.splice(i, 1);
    for (let i = PARADES.length - 1; i >= 0; i--) PARADES.splice(i, 1);

    // ── canned ThemeParks.wiki responses ──
    const MK = '75ea578a-adc8-4116-a54d-dccb60765ef9';
    const EP = '47f90d2c-e191-4239-a466-5892ef59a88b';
    let fetchCount = 0;
    // evening EXTRA_HOURS deliberately FIRST: classification must not depend on array order
    const sched = (dates) => ({ schedule: dates.flatMap(d => ([
      { date: d, type: 'EXTRA_HOURS', openingTime: d + 'T23:00:00-04:00', closingTime: d + 'T01:00:00-04:00' },
      { date: d, type: 'OPERATING', openingTime: d + 'T09:00:00-04:00', closingTime: d + 'T23:00:00-04:00' },
      { date: d, type: 'EXTRA_HOURS', openingTime: d + 'T08:30:00-04:00', closingTime: d + 'T09:00:00-04:00' },
    ])) });
    const tripDates = ['2026-07-14','2026-07-15','2026-07-16','2026-07-17','2026-07-18','2026-07-19'];
    window.fetch = (url) => {
      fetchCount++;
      let body = {};
      if (url.indexOf('/children') >= 0) {
        body = { children: [
          { id: 'ent-fof', entityType: 'SHOW', name: 'Festival of Fantasy Parade' },
          { id: 'ent-hea', entityType: 'SHOW', name: 'Happily Ever After' },
          { id: 'ent-stage', entityType: 'SHOW', name: 'ZZ Some Stage Show' },
          { id: 'ent-ride1', entityType: 'ATTRACTION', name: 'ZZ Space Mountain' },
          { id: 'ent-ride2', entityType: 'ATTRACTION', name: 'ZZ Peter Pan' },
        ] };
      } else if (url.indexOf('/live') >= 0) {
        body = { liveData: [
          { entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Space Mountain', queue: { STANDBY: { waitTime: 60 } } },
          { entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Peter Pan', queue: { STANDBY: { waitTime: 40 } } },
          { entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Other', queue: { STANDBY: { waitTime: 20 } } },
        ] };
      } else if (url.indexOf('/entity/ent-fof/schedule') >= 0) {
        body = { schedule: tripDates.map(d => ({ date: d, type: 'OPERATING', openingTime: d + 'T15:00:00-04:00' })) };
      } else if (url.indexOf('/entity/ent-hea/schedule') >= 0) {
        body = { schedule: tripDates.flatMap(d => ([
          { date: d, type: 'OPERATING', openingTime: d + 'T20:30:00-04:00' },
          { date: d, type: 'OPERATING', openingTime: d + 'T22:30:00-04:00' },
        ])) };
      } else if (url.indexOf('/schedule/2026/07') >= 0) {
        body = sched(tripDates);
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
    };

    // pre-seed a USER hours record for MK on the 16th — must never be touched
    PARKHOURS.push({ id: 'huser1', trip: 'jul26', by: 'scott', park: 'mk', day: '2026-07-16', open: '7:00 AM', close: '10:00 PM', early: '', late: '', crowd: 4 });
    const userSnap = JSON.stringify(PARKHOURS.filter(h => h.id === 'huser1'));

    // ── first refresh ──
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));

    const mk15 = PARKHOURS.filter(h => h.trip === 'jul26' && h.park === 'mk' && h.day === DAY)[0];
    r.hoursCreated = !!mk15;
    r.hoursFormat = !!mk15 && mk15.open === '9:00 AM' && mk15.close === '11:00 PM';
    r.earlyLateMapped = !!mk15 && mk15.early === '8:30 AM' && mk15.late === '1:00 AM';
    r.hoursSrcStamped = !!mk15 && mk15.src === 'api' && mk15.apiUpd > 0;
    r.allParksFilled = ['mk','ep','hs','ak'].every(pk => PARKHOURS.some(h => h.park === pk && h.day === DAY && h.src === 'api'));
    r.userRecordUntouched = JSON.stringify(PARKHOURS.filter(h => h.id === 'huser1')) === userSnap;

    const fof = PARADES.filter(p => p.day === DAY && p.apiKey === 'ent-fof')[0];
    const hea = SHOWS.filter(s => s.day === DAY && s.apiKey === 'ent-hea')[0];
    r.paradeCreatedScheduled = !!fof && fof.status === 'scheduled' && fof.time === '3:00 PM' && fof.src === 'api';
    r.showCreatedScheduled = !!hea && hea.status === 'scheduled' && hea.time === '8:30 PM & 10:30 PM';
    r.stageShowNotAutoCreated = !SHOWS.some(s => s.name === 'ZZ Some Stage Show');

    // crowd: EPCOT is the 15th's park (demo VISITS) → live estimate lands there
    const ep15 = PARKHOURS.filter(h => h.park === 'ep' && h.day === DAY)[0];
    r.crowdWritten = !!ep15 && ep15.crowd >= 1 && ep15.crowd <= 10 && ep15.crowdSrc === 'api';
    r.userCrowdUntouched = PARKHOURS.filter(h => h.id === 'huser1')[0].crowd === 4;

    // ── idempotency: force a second full run → zero changes, zero dupes ──
    const snap = JSON.stringify([PARKHOURS, SHOWS, PARADES]);
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: 0, crowdFetched: 0 })));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    // apiUpd only bumps when values change, so full-state must be identical
    r.idempotentRerun = JSON.stringify([PARKHOURS, SHOWS, PARADES]) === snap;

    // ── manual edit takes ownership: save the api MK record via saveHours ──
    openScreen({ type: 'hoursedit', edit: mk15.id, day: DAY });
    document.getElementById('ph-open__h').value = '8'; tfSync('ph-open');
    saveHours();
    const owned = PARKHOURS.filter(h => h.id === mk15.id)[0];
    r.editClearsSrc = !!owned && owned.src === undefined && owned.open === '8:00 AM';
    // refresher must now leave it alone
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: 0 })));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    r.ownedNotReverted = PARKHOURS.filter(h => h.id === mk15.id)[0].open === '8:00 AM';

    // ── pick-list add creates an 'attend' item ──
    S.screen = { type: 'apishows', day: DAY };
    papiAddShow('ent-stage', DAY);
    await new Promise(res => setTimeout(res, 200));
    const added = SHOWS.filter(s => s.name === 'ZZ Some Stage Show')[0];
    r.pickListAddsAttend = !!added && added.status === 'attend' && added.src === 'api';
    S.screen = null;

    // ── ride list + live waits cached; LL form gets the autocomplete ──
    const st2 = papiData();
    r.rideListCached = !!st2.rides && (st2.rides.mk || []).some(x => x.name === 'ZZ Space Mountain');
    r.liveWaitsCached = !!st2.waits && st2.waits.by['zz space mountain'] === 60 && st2.waits.day === DAY;
    const dl = papiRideDatalist();
    r.datalistHasRides = dl.indexOf('papi-ridelist') >= 0 && dl.indexOf('ZZ Space Mountain') >= 0;
    S.screen = { type: 'addll', day: DAY };
    r.llFormWiresDatalist = scrAddLL().indexOf('list="papi-ridelist"') >= 0;
    S.screen = null;

    // ── a manual refresh with the Hours screen OPEN updates the screen itself ──
    openScreen({ type: 'hoursplan', day: DAY });
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: 0, crowdFetched: 0 })));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    const scrHtml2 = document.getElementById('screen-host').innerHTML;
    r.screenShowsStampAfterRefresh = scrHtml2.indexOf('Updated from live Disney data') >= 0;
    r.screenNoFailureOnSuccess = scrHtml2.indexOf('Last refresh failed') < 0;
    S.screen = null; renderOverlay();

    // ── blocked fetch (CSP/CORS/offline): failure must be VISIBLE, not silent ──
    window.fetch = () => { fetchCount++; return Promise.reject(new TypeError('Failed to fetch')); };
    localStorage.removeItem('dtp__parkapi');
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    const stF = papiData();
    r.failureRecorded = !!stF.lastErr && stF.lastOk === 0;
    r.stampShowsFailure = papiStampLine().indexOf('Last refresh failed') >= 0 && papiStampLine().indexOf('Failed to fetch') >= 0;

    // ── production build: engine fully inert ──
    const realBuild = window.BUILD;
    window.BUILD = realBuild.replace('-dev', '');
    const before = fetchCount;
    localStorage.setItem('dtp__parkapi', JSON.stringify({ fetched: 0, crowdFetched: 0 }));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 200));
    r.prodInert = fetchCount === before;
    r.prodStampHidden = papiStampLine() === '';
    r.prodDatalistHidden = papiRideDatalist() === '';
    window.BUILD = realBuild;

    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
