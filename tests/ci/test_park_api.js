/* Build 370: live Disney park data (ThemeParks.wiki) — DEV BUILDS ONLY.
   Stubs fetch with canned API JSON and drives papiRefresh over the jul26 demo
   trip. Verifies: hours records created with correct 12h formatting + early/
   late mapped from EXTRA_HOURS entries; re-runs are idempotent (no churn, no
   duplicates); records a person created or edited are NEVER touched (and a
   manual save clears src, ending auto-updates); the curated headline parade +
   night show auto-create once as 'scheduled'; non-headline shows don't; the
   pick-list add creates an 'attend' item; the day-of crowd estimate writes
   only over empty/api-owned values; and the engine runs on production
   BUILD strings too (promoted with Build 392). */
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
    let liveLate = false;   // evening live feed: only the late performance remains
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
          { id: 'ent-quiet', entityType: 'SHOW', name: 'ZZ Quiet Show' },   // never publishes times → manual picker
          { id: 'ent-ride1', entityType: 'ATTRACTION', name: 'ZZ Space Mountain' },
          { id: 'ent-ride2', entityType: 'ATTRACTION', name: 'ZZ Peter Pan' },
        ] };
      } else if (url.indexOf('/live') >= 0) {
        body = { liveData: [
          { id: 'ent-ride1', entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Space Mountain',
            queue: { STANDBY: { waitTime: 60 }, PAID_RETURN_TIME: { price: { amount: 1500 } } },
            forecast: [ // Disney's own hourly expected waits (day-of)
              { time: DAY + 'T13:00:00-04:00', waitTime: 65, percentage: 80 },
              { time: DAY + 'T14:00:00-04:00', waitTime: 55, percentage: 70 },
              { time: DAY + 'T15:00:00-04:00', waitTime: 70, percentage: 90 },
            ] },
          { id: 'ent-ride2', entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Peter Pan',
            queue: { STANDBY: { waitTime: 40 }, RETURN_TIME: { returnStart: DAY + 'T14:40:00-04:00' } },
            forecast: [
              { time: DAY + 'T13:00:00-04:00', waitTime: 30, percentage: 60 },
              { time: DAY + 'T14:00:00-04:00', waitTime: 35, percentage: 65 },
              { time: DAY + 'T15:00:00-04:00', waitTime: 45, percentage: 85 },
            ] },
          { entityType: 'ATTRACTION', status: 'OPERATING', name: 'ZZ Other', queue: { STANDBY: { waitTime: 20 } } },
          { entityType: 'SHOW', status: 'OPERATING', id: 'ent-hea', name: 'Happily Ever After',
            // REVERSED order on purpose — the stable sort must normalize it
            showtimes: liveLate ? [{ startTime: '2026-07-15T22:30:00-04:00' }] : [{ startTime: '2026-07-15T22:30:00-04:00' }, { startTime: '2026-07-15T20:30:00-04:00' }] },
        ] };
      } else if (url.indexOf('/entity/ent-fof/schedule') >= 0) {
        body = { schedule: tripDates.map(d => ({ date: d, type: 'OPERATING', openingTime: d + 'T15:00:00-04:00' })) };
      } else if (url.indexOf('/entity/ent-quiet/schedule') >= 0) {
        body = { schedule: [] };
      } else if (url.indexOf('/entity/ent-hea/schedule') >= 0) {
        // no published times for 07-20 → the item must still create as TBD
        body = { schedule: tripDates.filter(d => d !== '2026-07-20').flatMap(d => ([
          { date: d, type: 'OPERATING', openingTime: d + 'T20:30:00-04:00' },
          { date: d, type: 'OPERATING', openingTime: d + 'T22:30:00-04:00' },
        ])) };
      } else if (url.indexOf('/schedule/2026/07') >= 0) {
        body = sched(tripDates.concat(['2026-07-25']));   // non-trip date → cache must trim it
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
    r.idempotentNoUpdates = (window.__papiStat || {}).updated === 0 && (window.__papiStat || {}).created === 0;
    r.cacheTrimmed = !((papiData().hours || {}).mk || {})['2026-07-25']; // whole-month feed, trip-dates-only cache

    // ── live day-of showtimes OWN today's entry: applied once, then no
    //    monthly/live tug-of-war ("8 refreshed" on every tap in prod) ──
    liveLate = true;
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: 0, crowdFetched: 0 })));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    r.liveTimesWin = SHOWS.filter(s => s.day === DAY && s.apiKey === 'ent-hea')[0].time === '10:30 PM';
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: 0, crowdFetched: 0 })));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));
    r.liveTimesNoChurn = (window.__papiStat || {}).updated === 0;
    liveLate = false;   // restore the full evening; the next forced run re-applies both times
    localStorage.setItem('dtp__parkapi', JSON.stringify(Object.assign(papiData(), { fetched: 0, crowdFetched: 0 })));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 300));

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
    r.rideMetaLine = papiRideMeta('ZZ Space Mountain').indexOf('60 min</strong> standby now') >= 0 && papiRideMeta('ZZ Space Mountain').indexOf('LL Single Pass $15') >= 0;
    r.waitHighlighted = papiRideMeta('ZZ Space Mountain').indexOf('<strong class="papi-wait">60 min</strong>') >= 0; // bold wait for sunlight readability
    r.waitHighlighted = papiRideMeta('ZZ Space Mountain').indexOf('<strong class="papi-wait">60 min</strong>') >= 0; // bold wait for sunlight readability

    // ── Build 389: 4-park live sweep, apiKey joins, forecasts, expected crowds ──
    const stW = papiData();
    r.waitsAllParks = ['mk','ep','hs','ak'].every(pk => stW.waits.parks && stW.waits.parks[pk] && stW.waits.parks[pk].by['zz space mountain']);
    r.waitsByIdJoin = papiRideMeta('Totally Renamed Ride', 'ent-ride1').indexOf('60 min</strong> standby') >= 0; // exact entity-id join beats the name
    r.metaExpectedAtTime = papiRideMeta('ZZ Space Mountain', '', DAY, '2:00 PM').indexOf('~55 min</strong> expected at 2:00 PM') >= 0;
    r.metaNoForecastOtherDay = papiRideMeta('ZZ Space Mountain', '', '2026-07-16', '2:00 PM').indexOf('expected at') < 0; // forecast is day-of only
    r.metaNextWindow = papiRideMeta('ZZ Peter Pan').indexOf('next window 2:40 PM') >= 0;
    r.parkExpectedLine = papiParkExpected('ep', DAY).indexOf('Expected today') >= 0 && papiParkExpected('ep', DAY).indexOf('3:00 PM') >= 0; // 3 PM is the peak hour
    r.parkExpectedOnlyToday = papiParkExpected('ep', '2026-07-16') === '';
    // ── Planned Rides: own component; LL link supplies the window; LL form untouched ──
    LLS.push({ id: 'zll9', trip: 'jul26', day: DAY, ride: 'ZZNOWRIDE', tier: 'mp1', status: 'booked', winStart: '2:00 PM', winEnd: '3:00 PM', rideTime: '', who: 'all' });
    RIDES.push({ id: 'zrd1', trip: 'jul26', day: DAY, name: 'ZZ Space Mountain', rideTime: '2:15 PM', llId: 'zll9', who: 'all' });
    const rdItem = dayPlanItems(DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0]).filter(i => i.type === 'ride')[0];
    r.rideOnDayPlan = !!rdItem && rdItem.x === 'ZZ Space Mountain' && rdItem.t === '2:15 PM';
    // today's Day Agenda rows carry the live line (merged ride zrd1 = ZZ Space Mountain)
    S.open = defOpen(); S.open.itin = true;
    r.agendaRowLiveMeta = dayPlanCard(DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0], PARKS.ep).indexOf('standby now') >= 0;
    // ── rides carry the attendance row on the agenda + breakdown on the form ──
    const dpRsvp = dayPlanCard(DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0], PARKS.ep);
    r.rideHasRsvpRow = dpRsvp.indexOf("rsvpSet('ride','zrd1','in')") >= 0 && dpRsvp.indexOf('Will attend') >= 0;
    rsvpSet('ride', 'zrd1', 'out');
    const zrdOut = RIDES.filter(x => x.id === 'zrd1')[0];
    r.rideRsvpOutRemovesMe = zrdOut.rsvp && zrdOut.rsvp.scott === 'out' && zrdOut.who !== 'all' && zrdOut.who.indexOf('scott') < 0;
    rsvpSet('ride', 'zrd1', 'out');   // toggle back off → cleared, back in who
    r.rideRsvpClears = !RIDES.filter(x => x.id === 'zrd1')[0].rsvp;
    S.screen = { type: 'rideedit', edit: 'zrd1', day: DAY };
    r.rideFormAttendance = scrRideEdit().indexOf('Attendance') >= 0;
    S.screen = null;

    // NOW card: at 2:05 PM the 2:15 ride is next-up → current + expected wait in its line
    window.__nowOverride = { date: DAY, mins: 14 * 60 + 5 };
    const nowHtml = nowCardHtml();
    r.nowNextUpWait = nowHtml.indexOf('standby now') >= 0 && nowHtml.indexOf('expected at') >= 0;
    r.nowRefreshWaitsBtn = nowHtml.indexOf('nowRefreshWaits') >= 0; // header Waits refresh control (dev builds)
    window.__nowOverride = { date: DAY, mins: 10 * 60 };
    S.screen = { type: 'rideedit', day: DAY };
    const rdForm = scrRideEdit();
    r.rideFormAutocomplete = rdForm.indexOf('papiRideSuggest') >= 0 && rdForm.indexOf('rd-name__sug') >= 0;
    // zll9 is claimed by zrd1 → a NEW ride's LL dropdown must NOT offer it
    r.rideFormLLLink = rdForm.indexOf('rd-ll') >= 0 && rdForm.indexOf('ZZNOWRIDE') < 0;
    S.screen = { type: 'addll', day: DAY };
    S._formInit = null; S._formTier = null;
    const llForm = scrAddLL();
    r.llFormRestored = llForm.indexOf('Standby') < 0 && llForm.indexOf('Ride Window') >= 0 && llForm.indexOf('papi-ridelist') < 0;
    S.screen = { type: 'apirides', day: DAY, pk: 'mk' };
    const brHtml = scrApiRides();
    r.browseRidesPickers = brHtml.indexOf('papiBrowseDay') >= 0 && brHtml.indexOf('ZZ Space Mountain') >= 0;
    r.planHubLiveGroup = (S.screen = null, renderPlanHub().indexOf('Live data refresh') >= 0 && renderPlanHub().indexOf('Rides & Attractions') >= 0);

    // ── Browse: explicit day+park pickers, grouped, special events surfaced ──
    S.screen = { type: 'apishows', day: DAY };
    let bHtml = scrApiShows();
    r.browseHasPickers = bHtml.indexOf('papiBrowseDay') >= 0 && bHtml.indexOf('papiBrowsePark') >= 0;
    S.screen.pk = 'mk'; bHtml = scrApiShows();
    r.browseGroups = bHtml.indexOf('Parades') >= 0 && bHtml.indexOf('Nighttime Spectaculars') >= 0 && bHtml.indexOf('Other Shows') >= 0;
    r.browseSpecialEvents = bHtml.indexOf('Special Events') >= 0 && bHtml.indexOf('H2O Glow After Hours') >= 0;
    // every row with cached showtimes carries them (not just Special Events)
    r.browseRowShowsTime = bHtml.indexOf('8:30 PM &amp; 10:30 PM') >= 0 && bHtml.indexOf('3:00 PM') >= 0;
    // rides-style flow: name-tap opens the right form; chips select
    r.browseShowNameOpensForm = bHtml.indexOf("type:'showedit'") >= 0 && bHtml.indexOf("type:'paradeedit'") >= 0 && bHtml.indexOf('seed:') >= 0;
    r.browseParkSwitch = (S.screen.pk = 'ep', scrApiShows().indexOf('EPCOT') >= 0);
    S.screen = null;
    // let the browse sweeps triggered above settle before counting fetches later
    await new Promise(res => setTimeout(res, 300));

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
    r.ttlSkipsRefetch = (fetchCount - beforeTTL) <= 5;   // at most the 4-park live sweep
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

    // ── Browse rides: tap name → form seed; multi-select → batch time entry (blank = TBD) ──
    S.screen = { type: 'apirides', day: DAY, pk: 'mk' };
    let br = scrApiRides();
    r.browseNameOpensForm = br.indexOf("type:'rideedit'") >= 0 && br.indexOf('seed:') >= 0;
    r.selBarHiddenWhenNone = br.indexOf('papi-selbar') < 0;
    papiRideSel('ent-ride1'); papiRideSel('ent-ride2');
    br = scrApiRides();
    r.browseMultiSelect = br.indexOf('Set times for 2 selected') >= 0;
    // the action bar lives in the PINNED FOOTER (flies in from the bottom),
    // not at the top of the scrolling body where it went unseen
    r.selBarInFooter = br.indexOf('screen-foot') >= 0 && br.indexOf('papi-selbar') > br.indexOf('screen-foot');
    r.selBarNotInBody = br.substring(br.indexOf('screen-body'), br.indexOf('screen-foot')).indexOf('Set times for') < 0;
    r.selBarHint = br.indexOf('Keep selecting') >= 0;
    // slide-in animation plays only on the FIRST selection, not every tick
    S.screen._selBarOn = 0;
    r.selBarFliesFirstTime = scrApiRides().indexOf('papi-selbar fly') >= 0;
    r.selBarNoRefly = scrApiRides().indexOf('papi-selbar fly') < 0;
    papiRideTimes();
    r.timesScreenLists = scrRideTimes().indexOf('ZZ Space Mountain') >= 0 && scrRideTimes().indexOf('ZZ Peter Pan') >= 0;
    // save with no times typed → both created as TBD ('')
    const ridesBefore = RIDES.length;
    renderOverlay();      // materialize the form so val() can read the (empty) fields
    saveRideTimes();
    r.batchAddTBD = RIDES.length === ridesBefore + 2 && RIDES.slice(-2).every(x => x.rideTime === '' && x.day === DAY);
    S.screen = null; renderOverlay();
    // seeded form prefill
    S.screen = { type: 'rideedit', day: DAY, seed: { name: 'ZZ Space Mountain' } };
    r.formSeedPrefills = scrRideEdit().indexOf('ZZ Space Mountain') >= 0;
    S.screen = null;

    // ── ride + linked LL = ONE merged Day Agenda row (never two) ──
    const dayD = DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0];
    let dpi = dayPlanItems(dayD);
    r.mergedSingleRow = !dpi.some(i => i.type === 'll' && i.ref === 'zll9') && dpi.some(i => i.type === 'ride' && i.ref === 'zrd1');
    const mrg = dpi.filter(i => i.ref === 'zrd1')[0];
    r.mergedWindowInfo = !!mrg && mrg.win === '2:00 PM–3:00 PM' && !!mrg.ll && mrg.ll.tier === 'mp1';
    r.mergedRideTimeWins = !!mrg && mrg.t === '2:15 PM';
    // ride with no planned time falls back to the LL slot for agenda ordering
    RIDES.filter(x => x.id === 'zrd1')[0].rideTime = '';
    r.mergedTimeFallback = dayPlanItems(dayD).filter(i => i.ref === 'zrd1')[0].t === '2:00 PM';
    RIDES.filter(x => x.id === 'zrd1')[0].rideTime = '2:15 PM';
    // the absorbed LL's rolling re-book still weaves in right after the merged row
    REBOOKS.push({ id: 'rb_z1', trip: 'jul26', day: DAY, after: 'zll9', text: 'ZZ rebook target', who: 'all' });
    dpi = dayPlanItems(dayD);
    const rdIdx = dpi.findIndex(i => i.ref === 'zrd1');
    r.mergedKeepsRebook = rdIdx >= 0 && !!dpi[rdIdx + 1] && dpi[rdIdx + 1].type === 'rebook';
    REBOOKS.pop();
    // an unclaimed LL keeps its own row
    LLS.push({ id: 'zll8', trip: 'jul26', day: DAY, ride: 'ZZ Solo LL', tier: 'sp', status: 'booked', winStart: '4:00 PM', winEnd: '5:00 PM', who: 'all' });
    r.unlinkedLLKeepsRow = dayPlanItems(dayD).some(i => i.type === 'll' && i.ref === 'zll8');

    // ── LL first, ride later: form pre-selects the same-named unclaimed LL ──
    LLS.push({ id: 'zll7', trip: 'jul26', day: DAY, ride: 'ZZ Link Coaster', tier: 'mp2', status: 'planning', winStart: '1:00 PM', winEnd: '2:00 PM', who: 'all' });
    S.screen = { type: 'rideedit', day: DAY, seed: { name: 'ZZ Link Coaster' } };
    renderOverlay();
    const rdHtml = document.getElementById('screen-host').innerHTML;
    r.rideFormPreselectsLL = document.getElementById('rd-ll').value === 'zll7';
    r.rideFormOffersCreateNew = rdHtml.indexOf('__new') >= 0;
    saveRide();
    await new Promise(res => setTimeout(res, 300));   // closeScreen's deferred finish
    const linkedRide = RIDES.filter(x => x.name === 'ZZ Link Coaster')[0];
    r.rideAutoLinked = !!linkedRide && linkedRide.llId === 'zll7';
    // a claimed LL disappears from other rides' LL dropdowns
    S.screen = { type: 'rideedit', day: DAY };
    r.claimedLLHidden = scrRideEdit().indexOf('ZZ Link Coaster') < 0 && scrRideEdit().indexOf('ZZ Solo LL') >= 0;
    S.screen = null; renderOverlay();

    // ── ride first, LL later: saving a same-named LL links itself to the ride ──
    RIDES.push({ id: 'zrd2', trip: 'jul26', day: DAY, name: 'ZZ Orphan Ride', rideTime: '', llId: '', who: 'all', park: 'ep' });
    S.screen = { type: 'addll', day: DAY };
    S._formInit = null;
    renderOverlay();
    document.getElementById('ll-ride').value = 'ZZ Orphan Ride';
    saveLL();
    await new Promise(res => setTimeout(res, 300));
    const orphan = RIDES.filter(x => x.id === 'zrd2')[0];
    r.llAutoLinksRide = !!orphan.llId && LLS.some(l => l.id === orphan.llId && l.ride === 'ZZ Orphan Ride');

    // ── "+ Create a new Lightning Lane…" from the ride form links back ──
    S.screen = { type: 'rideedit', day: DAY };
    S._formInit = null;
    renderOverlay();
    document.getElementById('rd-name').value = 'ZZ Chain Ride';
    document.getElementById('rd-ll').value = '__new';
    saveRide();
    r.newLLFlowOpensLLForm = !!S.screen && S.screen.type === 'addll' && !!S.screen.seed && S.screen.seed.ride === 'ZZ Chain Ride' && !!S.screen.linkRide;
    saveLL();
    await new Promise(res => setTimeout(res, 300));
    const chainRide = RIDES.filter(x => x.name === 'ZZ Chain Ride')[0];
    r.newLLFlowLinksBack = !!chainRide && !!chainRide.llId && LLS.some(l => l.id === chainRide.llId && l.ride === 'ZZ Chain Ride');

    // ── moving a linked LL to another day un-links the ride left behind ──
    S.screen = { type: 'addll', edit: chainRide.llId, day: DAY };
    S._formInit = null;
    renderOverlay();
    document.getElementById('ll-day').value = '2026-07-16';
    saveLL();
    await new Promise(res => setTimeout(res, 300));
    r.llDayMoveUnlinks = RIDES.filter(x => x.id === chainRide.id)[0].llId === '';

    // ── batch browse-add: LL dropdown appears, pre-selects the name match, links on save ──
    LLS.push({ id: 'zll6', trip: 'jul26', day: DAY, ride: 'ZZ Space Mountain', tier: 'sp', status: 'planning', winStart: '6:00 PM', winEnd: '7:00 PM', who: 'all' });
    S.screen = { type: 'apirides', day: DAY, pk: 'mk', _sel: { 'ent-ride1': 1 } };
    papiRideTimes();
    renderOverlay();
    const rtHtml = document.getElementById('screen-host').innerHTML;
    r.batchLLDropdown = rtHtml.indexOf('rl_0') >= 0;
    r.batchLLPreselected = document.getElementById('rl_0').value === 'zll6';
    saveRideTimes();
    await new Promise(res => setTimeout(res, 300));
    r.batchLinksLL = RIDES[RIDES.length - 1].llId === 'zll6' && RIDES[RIDES.length - 1].name === 'ZZ Space Mountain';
    S.screen = null; renderOverlay();

    // ── Build 388: Day Agenda quick-add Ride chip + Browse Rides manual add ──
    S.open = defOpen(); S.open.itin = true;
    const dpHtml = dayPlanCard(DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0], PARKS[dayPrimaryPark(DAY)] || PARKS.mk);
    r.agendaAddRideChip = dpHtml.indexOf('Add Ride') >= 0 && dpHtml.indexOf("type:'apirides'") >= 0;
    S.screen = { type: 'apirides', day: DAY, pk: 'mk' };
    r.browseManualAtBottom = scrApiRides().indexOf('Add Ride Manually') >= 0;
    S.screen = null;

    // ── Build 388: LL naming — every LL surface says Lightning Lane ──
    r.llCardSaysLL = llCard(llFor(DAY), DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0], PARKS.ep).indexOf('Add Lightning Lane') >= 0;
    S.screen = { type: 'section', section: 'll' };
    const llSecHtml = scrSection();
    r.llSectionSaysLL = llSecHtml.indexOf('Add Lightning Lane') >= 0 && llSecHtml.indexOf('>Add ride<') < 0;
    S.screen = null;
    r.hubCountsPasses = renderPlanHub().indexOf('passes') >= 0;

    // ── Build 388: LL form — Day+Park on top, ride picker, no own ride-time ──
    S.screen = { type: 'addll', day: DAY }; S._formInit = null;
    renderOverlay();
    const llHtml = document.getElementById('screen-host').innerHTML;
    r.llFormTitle = llHtml.indexOf('Add Lightning Lane') >= 0;
    r.llFormDayParkTop = llHtml.indexOf('ll-day') >= 0 && llHtml.indexOf('ll-park') >= 0 && llHtml.indexOf('ll-day') < llHtml.indexOf('ll-ride');
    r.llFormNoOwnRideTime = llHtml.indexOf('ll-rtime') < 0;
    // empty query on focus → the day's unclaimed planned rides, tagged
    llRideSuggest('ll-ride');
    const sug = document.getElementById('ll-ride__sug').innerHTML;
    r.llPickerListsPlanned = sug.indexOf('ZZ Peter Pan') >= 0 && sug.indexOf('planned') >= 0;
    // typing → live attraction catalog autocomplete (PAPICAT-only device here)
    document.getElementById('ll-ride').value = 'zz space';
    llRideSuggest('ll-ride');
    r.llPickerAutocompletes = document.getElementById('ll-ride__sug').innerHTML.indexOf('ZZ Space Mountain') >= 0;
    // naming a ride nobody planned yet creates + links the planned ride
    document.getElementById('ll-ride').value = 'ZZ Fresh Coaster';
    const ridesBeforeLL = RIDES.length;
    saveLL();
    await new Promise(res => setTimeout(res, 300));
    const freshLL = LLS.filter(l => l.ride === 'ZZ Fresh Coaster')[0];
    const freshRide = RIDES.filter(x => x.name === 'ZZ Fresh Coaster')[0];
    r.llCreatesRide = !!freshLL && !!freshRide && RIDES.length === ridesBeforeLL + 1 && freshRide.llId === freshLL.id && freshRide.day === DAY && freshRide.rideTime === '';
    r.llCreatedMergedRow = !dayPlanItems(DAYS.filter(x => x.trip === 'jul26' && x.date === DAY)[0]).some(i => i.type === 'll' && i.ref === freshLL.id);

    // ── Browse shows: multi-select → batch screen; published times become a
    //    selector (each / all / TBD), unpublished ones the manual picker.
    //    Still on the PAPICAT-only device: times must come from the catalog. ──
    S.screen = { type: 'apishows', day: DAY, pk: 'mk' };
    scrApiShows();
    papiRideSel('ent-fof'); papiRideSel('ent-hea'); papiRideSel('ent-quiet');
    r.showMultiSelect = scrApiShows().indexOf('Set times for 3 selected') >= 0;
    r.showSelBarInFooter = scrApiShows().indexOf('papi-selbar') > scrApiShows().indexOf('screen-foot');
    r.showTimesFromCatalog = scrApiShows().indexOf('8:30 PM &amp; 10:30 PM') >= 0; // device cache is empty here
    papiShowBatch();
    renderOverlay();
    const stHtml = document.getElementById('screen-host').innerHTML;
    r.batchSelectorForPublished = stHtml.indexOf('All showtimes (8:30 PM &amp; 10:30 PM)') >= 0 && stHtml.indexOf('id="st_1"') >= 0;
    r.batchSelectorHasTBD = stHtml.indexOf('>TBD<') >= 0;
    r.batchManualForUnpublished = stHtml.indexOf('st_2__h') >= 0; // ZZ Quiet Show → manual time picker
    const showsBefore = SHOWS.length, parBefore = PARADES.length;
    saveShowTimes();
    const newPar = PARADES[PARADES.length - 1];
    r.batchRoutesParade = PARADES.length === parBefore + 1 && newPar.name === 'Festival of Fantasy Parade' && newPar.time === '3:00 PM' && newPar.src === 'api' && newPar.status === 'attend';
    r.batchShowFromSelector = SHOWS.some(s => s.apiKey === 'ent-hea' && s.day === DAY && s.time === '8:30 PM & 10:30 PM' && s.status === 'attend');
    r.batchUnpublishedTBD = SHOWS.some(s => s.apiKey === 'ent-quiet' && s.day === DAY && s.time === 'TBD');
    r.batchCounts = SHOWS.length === showsBefore + 2;
    S.screen = null; renderOverlay();

    // ── Park Hours section: refresh + last-checked on top, manual add renamed ──
    S.screen = { type: 'section', section: 'hours' };
    const hrsHtml = scrSection();
    r.hoursTopRefresh = hrsHtml.indexOf('papiForce') >= 0 && hrsHtml.indexOf('Auto-updates from live Disney data') >= 0;
    r.hoursAddManually = hrsHtml.indexOf('Add Park Hours Manually') >= 0 && hrsHtml.indexOf('>Add park hours<') < 0;
    S.screen = null;

    // ── merged Live Entertainment section + renamed Rides & Attractions ──
    PARADES.push({ id: 'pa_zz', trip: 'jul26', day: DAY, name: 'ZZ Merge Parade', time: '3:00 PM', status: 'scheduled', park: 'mk', who: 'all' });
    S.screen = { type: 'section', section: 'shows' };
    const secHtml = scrSection();
    r.mergedSectionTitle = secHtml.indexOf('Live Entertainment') >= 0;
    r.mergedShowsParades = secHtml.indexOf('ZZ Merge Parade') >= 0 && secHtml.indexOf('Happily Ever After') >= 0;
    r.mergedTopBrowse = secHtml.indexOf('Browse Live Entertainment') >= 0 && secHtml.indexOf('Auto-assign') < 0;
    r.showsTopRefresh = secHtml.indexOf('papiForce') >= 0; // every API-fed section refreshes from its top
    r.mergedAddManually = secHtml.indexOf('Add Live Entertainment Manually') >= 0;
    r.paradeRoutesToParadeEdit = secHtml.indexOf("type:'paradeedit',edit:'pa_zz'") >= 0;
    S.screen = { type: 'section', section: 'rides' };
    const ridesHtml = scrSection();
    r.ridesSectionRenamed = ridesHtml.indexOf('Rides &amp; Attractions') >= 0 && ridesHtml.indexOf('Browse Rides') >= 0;
    r.ridesTopRefresh = ridesHtml.indexOf('papiForce') >= 0;
    S.screen = null;
    r.hubMerged = renderPlanHub().indexOf('Live Entertainment') >= 0 && renderPlanHub().indexOf('Night Shows') < 0 && renderPlanHub().indexOf('Rides & Attractions') >= 0;

    // ── a stalled request cannot wedge the run: hard per-request timeout ──
    window.__papiTimeoutMs = 60;
    window.fetch = () => new Promise(() => {});   // hangs forever
    localStorage.setItem('dtp__parkapi', JSON.stringify({ fetched: 0, crowdFetched: 0 }));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 2500));
    r.timeoutUnwedges = window.__papiInflight === false && (papiData().lastErr || '').indexOf('timeout') >= 0;
    window.__papiTimeoutMs = null;
    window.fetch = goodFetch;

    // ── watchdog: a dead in-flight flag older than 2 minutes no longer blocks refreshes ──
    window.__papiInflight = true; window.__papiStart = Date.now() - 130000;
    const beforeW = fetchCount;
    localStorage.setItem('dtp__parkapi', JSON.stringify({ fetched: 0, crowdFetched: 0 }));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 400));
    r.watchdogRecovers = fetchCount > beforeW && window.__papiInflight === false;

    // ── storage full: papiSave sheds bulky day-of payloads instead of silently losing the cache ──
    const origSetItem = localStorage.setItem.bind(localStorage);
    let failNext = true;
    localStorage.setItem = function (k, v) { if (failNext && k === 'dtp__parkapi') { failNext = false; throw new Error('QuotaExceededError'); } return origSetItem(k, v); };
    const stQ = papiData(); stQ.waits = stQ.waits || { day: DAY, parks: {} };
    papiSave(stQ);
    localStorage.setItem = origSetItem;
    const savedQ = papiData();
    r.quotaShedSaves = savedQ.waits === undefined && !!savedQ.stamps;

    // ── production build: the engine ships LIVE from Build 392 (user-approved promotion) ──
    const realBuild = window.BUILD;
    window.BUILD = realBuild.replace('-dev', '');
    window.fetch = goodFetch;
    const before = fetchCount;
    localStorage.setItem('dtp__parkapi', JSON.stringify({ fetched: 0, crowdFetched: 0 }));
    papiRefresh(true);
    await new Promise(res => setTimeout(res, 250));
    r.prodActive = fetchCount > before;
    r.prodStampShown = papiStampLine().indexOf('Park data via ThemeParks.wiki') >= 0;
    window.BUILD = realBuild;

    return r;
  });

  await browser.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  report(out);
})();
