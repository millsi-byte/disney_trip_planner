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
    // mirrors REAL WDW data: early entry / extended evening arrive as
    // description-tagged entries (often TICKETED_EVENT, not EXTRA_HOURS),
    // party events must be ignored, and order must not matter
    const sched = (dates) => ({ schedule: dates.flatMap(d => ([
      { date: d, type: 'EXTRA_HOURS', description: 'Extended Evening', openingTime: d + 'T23:00:00-04:00', closingTime: d + 'T01:00:00-04:00' },
      { date: d, type: 'OPERATING', openingTime: d + 'T09:00:00-04:00', closingTime: d + 'T23:00:00-04:00' },
      { date: d, type: 'TICKETED_EVENT', description: 'Early Entry', openingTime: d + 'T08:30:00-04:00', closingTime: d + 'T09:00:00-04:00' },
      { date: d, type: 'TICKETED_EVENT', description: 'H2O Glow After Hours', openingTime: d + 'T22:00:00-04:00', closingTime: d + 'T02:00:00-04:00' },
    ])) });
    const tripDates = ['2026-07-14','2026-07-15','2026-07-16','2026-07-17','2026-07-18','2026-07-19','2026-07-20'];
    const goodFetch = (url) => {
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
          { entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Space Mountain', queue: { STANDBY: { waitTime: 60 }, PAID_RETURN_TIME: { price: { amount: 1500 } } } },
          { entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Peter Pan', queue: { STANDBY: { waitTime: 40 }, RETURN_TIME: {} } },
          { entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Other', queue: { STANDBY: { waitTime: 20 } } },
          { entityType: 'SHOW', status: 'OPERATING', id: 'ent-hea', name: 'Happily Ever After', showtimes: [{ startTime: '2026-07-15T20:30:00-04:00' }, { startTime: '2026-07-15T22:30:00-04:00' }] },
        ] };
      } else if (url.indexOf('/entity/ent-fof/schedule') >= 0) {
        body = { schedule: tripDates.map(d => ({ date: d, type: 'OPERATING', openingTime: d + 'T15:00:00-04:00' })) };
      } else if (url.indexOf('/entity/ent-hea/schedule') >= 0) {
        // no published times for 07-20 → the item must still create as TBD
        body = { schedule: tripDates.filter(d => d !== '2026-07-20').flatMap(d => ([
          { date: d, type: 'OPERATING', openingTime: d + 'T20:30:00-04:00' },
          { date: d, type: 'OPERATING', openingTime: d + 'T22:30:00-04:00' },
        ])) };
      } else if (url.indexOf('/schedule/2026/07') >= 0) {
        body = sched(tripDates);
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
    };
    window.fetch = goodFetch;

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
    r.partyEventIgnored = !!mk15 && mk15.late !== '2:00 AM'; // after-hours party must not be read as extended evening
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
    const wsm = st2.waits && st2.waits.by['zz space mountain'];
    r.liveWaitsCached = !!wsm && wsm.w === 60 && st2.waits.day === DAY;
    r.liveLLMetadata = !!wsm && wsm.ll === 'single' && wsm.price === 15 && st2.waits.by['zz peter pan'].ll === 'multi';
    r.rideMetaLine = papiRideMeta('ZZ Space Mountain').indexOf('60 min standby') >= 0 && papiRideMeta('ZZ Space Mountain').indexOf('LL Single Pass $15') >= 0;
    // ── Planned Rides: own component; LL link supplies the window; LL form untouched ──
    LLS.push({ id: 'zll9', trip: 'jul26', day: DAY, ride: 'ZZNOWRIDE', tier: 'mp1', status: 'booked', winStart: '2:00 PM', winEnd: '3:00 PM', rideTime: '', who: 'all' });
    RIDES.push({ id: 'zrd1', trip: 'jul26', day: DAY, name: 'ZZ Space Mountain', rideTime: '2:15 PM', llId: 'zll9', who: 'all' });
    const rdItem = dayPlanItems(DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0]).filter(i => i.type === 'ride')[0];
    r.rideOnDayPlan = !!rdItem && rdItem.x === 'ZZ Space Mountain' && rdItem.t === '2:15 PM';
    S.screen = { type: 'rideedit', day: DAY };
    const rdForm = scrRideEdit();
    r.rideFormAutocomplete = rdForm.indexOf('papiRideSuggest') >= 0 && rdForm.indexOf('rd-name__sug') >= 0;
    r.rideFormLLLink = rdForm.indexOf('rd-ll') >= 0 && rdForm.indexOf('ZZNOWRIDE') >= 0;
    S.screen = { type: 'addll', day: DAY };
    S._formInit = null; S._formTier = null;
    const llForm = scrAddLL();
    r.llFormRestored = llForm.indexOf('Standby') < 0 && llForm.indexOf('Ride Window') >= 0 && llForm.indexOf('papi-ridelist') < 0;
    S.screen = { type: 'apirides', day: DAY, pk: 'mk' };
    const brHtml = scrApiRides();
    r.browseRidesPickers = brHtml.indexOf('papiBrowseDay') >= 0 && brHtml.indexOf('ZZ Space Mountain') >= 0;
    r.planHubLiveGroup = (S.screen = null, renderPlanHub().indexOf('Live data refresh') >= 0 && renderPlanHub().indexOf('Planned Rides') >= 0);

    // ── Browse: explicit day+park pickers, grouped, special events surfaced ──
    S.screen = { type: 'apishows', day: DAY };
    let bHtml = scrApiShows();
    r.browseHasPickers = bHtml.indexOf('papiBrowseDay') >= 0 && bHtml.indexOf('papiBrowsePark') >= 0;
    S.screen.pk = 'mk'; bHtml = scrApiShows();
    r.browseGroups = bHtml.indexOf('Parades') >= 0 && bHtml.indexOf('Nighttime Spectaculars') >= 0 && bHtml.indexOf('Other Shows') >= 0;
    r.browseSpecialEvents = bHtml.indexOf('Special Events') >= 0 && bHtml.indexOf('H2O Glow After Hours') >= 0;
    r.browseParkSwitch = (S.screen.pk = 'ep', scrApiShows().indexOf('EPCOT') >= 0);
    S.screen = null;
    r.datalistHasRides = papiRideDatalist().indexOf('ZZ Space Mountain') >= 0; // still available for future use

    // ── a manual refresh with the Live Disney Data console OPEN updates it in place ──
    openScreen({ type: 'parkapi' });
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: 0, crowdFetched: 0 })));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    const scrHtml2 = document.getElementById('screen-host').innerHTML;
    r.screenShowsStampAfterRefresh = scrHtml2.indexOf('Checked live Disney data') >= 0;
    r.screenShowsRunReport = scrHtml2.indexOf('Last run:') >= 0 && scrHtml2.indexOf('schedule fetches') >= 0;
    r.screenNoFailureOnSuccess = scrHtml2.indexOf('Last refresh failed') < 0;
    S.screen = null; renderOverlay();

    // ── the Hours day screen carries only the quiet auto-updates note, no controls ──
    openScreen({ type: 'hoursplan', day: DAY });
    const hoursHtml = document.getElementById('screen-host').innerHTML;
    r.hoursScreenQuietNote = hoursHtml.indexOf('Auto-updates from live Disney data') >= 0;
    r.hoursScreenNoControls = hoursHtml.indexOf('papiForce') < 0 && hoursHtml.indexOf('Last run:') < 0;
    S.screen = null; renderOverlay();

    // ── blocked fetch (CSP/CORS/offline): failure must be VISIBLE, not silent ──
    window.fetch = () => { fetchCount++; return Promise.reject(new TypeError('Failed to fetch')); };
    localStorage.removeItem('dtp__parkapi');
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    const stF = papiData();
    r.failureRecorded = !!stF.lastErr && stF.lastOk === 0;
    r.stampShowsFailure = papiStampLine().indexOf('Last refresh failed') >= 0 && papiStampLine().indexOf('Failed to fetch') >= 0;

    // ── "Use live hours": deliberate adoption of a fully user-populated trip ──
    window.fetch = goodFetch;   // the failure block above left the rejecting stub installed
    // mirror the real fully-user-populated trip: the slot has ONE record and it's the person's
    for (let i = PARKHOURS.length - 1; i >= 0; i--) if (PARKHOURS[i].park === 'ak' && PARKHOURS[i].day === DAY) PARKHOURS.splice(i, 1);
    PARKHOURS.push({ id: 'huser2', trip: 'jul26', by: 'scott', park: 'ak', day: DAY, open: '7:30 AM', close: '5:00 PM', early: '', late: '', crowd: 7 });
    window.confirm = () => false;             // decline → nothing changes
    papiAdoptHours();
    r.adoptDeclinedNoChange = PARKHOURS.filter(h => h.id === 'huser2')[0].src === undefined;
    window.confirm = () => true;              // accept → adopted + live values applied
    papiAdoptHours();
    await new Promise(res => setTimeout(res, 300));
    const adopted = PARKHOURS.filter(h => h.id === 'huser2')[0];
    r.adoptTakesLiveHours = !!adopted && adopted.src === 'api' && adopted.open === '9:00 AM';
    r.adoptKeepsUserCrowd = adopted.crowd === 7 && adopted.crowdSrc === undefined;

    // ── a NEW trip fills automatically: nudge busts the 12h throttle ──
    window.fetch = goodFetch;
    TRIPS.push({ id: 'zt2', name: 'ZZ New Trip', start: '2026-07-20', end: '2026-07-21', parties: ['g1'], by: 'scott' });
    DAYS.push({ trip: 'zt2', date: '2026-07-20', d: '20', dl: 'Mon', itin: [] });
    // simulate "refresh ran recently" — without the nudge this would wait ~12h
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: Date.now() })));
    papiNudge();                       // what ntFinish/date-change now call
    await new Promise(res => setTimeout(res, 2900)); // nudge refreshes after ~2.5s
    r.newTripAutoFilled = PARKHOURS.some(h => h.trip === 'zt2' && h.day === '2026-07-20' && h.src === 'api' && h.open === '9:00 AM');
    r.newTripShowTBD = SHOWS.some(x => x.trip === 'zt2' && x.day === '2026-07-20' && x.apiKey === 'ent-hea' && x.time === 'TBD' && x.status === 'scheduled');
    r.stampListsHeadlines = papiStampLine().indexOf('Happily Ever After') >= 0;

    // ── rate-limit politeness: TTLs survive force; cooldown after a blocked run ──
    window.fetch = goodFetch;
    const beforeTTL = fetchCount;
    papiRefresh(true);                              // everything fetched recently → TTLs skip schedule/children
    await new Promise(res => setTimeout(res, 250));
    r.ttlSkipsRefetch = (fetchCount - beforeTTL) <= 2;   // at most live-crowd call(s)
    window.fetch = () => { fetchCount++; return Promise.reject(new TypeError('Failed to fetch')); };
    localStorage.removeItem('dtp__parkapi');         // no stamps → real fetches attempted → all fail
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 250));
    const stC = papiData();
    r.cooldownSet = stC.coolUntil > Date.now();
    const beforeCool = fetchCount;
    papiRefresh(false);                              // auto refresh must honor the cooldown
    await new Promise(res => setTimeout(res, 100));
    r.cooldownHonored = fetchCount === beforeCool;
    r.blockedDeviceHint = papiStampLine().indexOf('blocking the data service') >= 0;

    // ── blocked-device catalog: a device that can't fetch still gets ride lists via sync ──
    r.catalogPublished = !!localStorage.getItem('dtp_papicat') && localStorage.getItem('dtp_papicat').indexOf('ZZ Space Mountain') >= 0;
    localStorage.removeItem('dtp__parkapi');   // simulate the laptop: empty device cache
    S.screen = { type: 'apirides', day: DAY, pk: 'mk' };
    r.browseWorksWithoutCache = scrApiRides().indexOf('ZZ Space Mountain') >= 0;
    S.screen = { type: 'apishows', day: DAY, pk: 'mk' };
    r.showsBrowseWorksWithoutCache = scrApiShows().indexOf('Happily Ever After') >= 0;
    S.screen = null;

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
