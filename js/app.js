/* ============================================================
   Baseline Tap — App
   Vanilla JS. Global handlers (matches the prototype\'s style).
   ============================================================ */

/* ── Icons ─────────────────────────────────────────────────── */
var IC = {
  home:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/></svg>',
  plan:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11H3v10h6z"/><path d="M21 3h-6v18h6z"/><path d="M15 7H9v14h6z"/></svg>',
  grid:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  chat:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>',
  gear:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  chevd:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  chev:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  chevUp:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
  grip:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',
  plane:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5S16 1 14.5 2.5L11 6 2.8 4.2 1.4 5.6l6.5 5.5-2.9 3.4-2.8.5-.9.9 2.3 2.3 2.3 2.3.9-.9.5-2.8 3.4-2.9 5.5 6.5 1.4-1.4z"/></svg>',
  planexs:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5S16 1 14.5 2.5L11 6 2.8 4.2 1.4 5.6l6.5 5.5-2.9 3.4-2.8.5-.9.9 2.3 2.3 2.3 2.3.9-.9.5-2.8 3.4-2.9 5.5 6.5 1.4-1.4z"/></svg>',
  route:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
  bolt:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  book:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  fork:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  star:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  bed:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
  ticket:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="12" y1="5" x2="12" y2="19"/></svg>',
  map:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  suitcase:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="12" y1="11" x2="12" y2="17"/></svg>',
  checks:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  cart:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  list:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  sparkles:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></svg>',
  warn:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  qmark:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  checkw:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  arr:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  lock:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  pencil:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
  back:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  send:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  upload:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  bell:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  clock:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
  users:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  cal:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
};

/* ── State ─────────────────────────────────────────────────── */
var S = {
  tripId:"jul26",
  tab:"home",
  dayIdx:1,            // default to first real park day
  fmode:"all",         // primary person filter: all | mine | notme
  filter:new Set(),    // specific-person filter (rare); non-empty overrides fmode
  planView:"dayplan",  // agenda view: dayplan (Daily Agenda: strategy + day plan) | all (Daily Planning: everything)
  open:{},             // collapsible card state per key
  plan:"packing",      // packing | todo
  persona:"scott",     // current persona (who am I)
  screen:null,         // slide-in screen def
  sheet:null,          // bottom sheet def
  importStep:1,
  newTmpl:"blank",
  formLegs:1
};
function defOpen(){return {flight:true,itin:true,ll:true,strat:false,din:true,shows:true};}
S.open = defOpen();

/* persistence */
function load(k,fb){try{var s=localStorage.getItem(k);if(s)return JSON.parse(s);}catch(e){}return fb;}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}
  try{if(typeof window!=='undefined'&&window.CLOUD&&window.CLOUD.push)window.CLOUD.push(k,v);}catch(e){}}

/* schema guard — when the saved-data shape changes, bump this so old
   localStorage is cleared instead of breaking the app */
var DATA_VERSION='11';
var BUILD='304';   /* bumped each deploy — shown in Settings to spot stale caches */
var PALETTE=[['#2563EB','Blue'],['#DB2777','Pink'],['#16A34A','Green'],['#EA580C','Orange'],['#7C3AED','Purple'],['#0891B2','Teal'],['#CA8A04','Gold'],['#DC2626','Red'],['#4F46E5','Indigo'],['#0D9488','Emerald'],['#9333EA','Violet'],['#475569','Slate']];
try{
  if(localStorage.getItem('dtp_ver')!==DATA_VERSION){
    Object.keys(localStorage).forEach(function(k){if(k.indexOf('dtp_')===0)localStorage.removeItem(k);});
    localStorage.setItem('dtp_ver',DATA_VERSION);
  }
}catch(e){}

/* keep the seed lists so new trips can start from a template */
var PACKING_SEED=PACKING, TODO_SEED=TODO;
TODO_TMPL = load('dtp_todo_tmpl', TODO_TMPL);   /* per-person global to-do templates */
/* per-person global packing template (sections + items, no per-trip status) */
function stripPackTmpl(dict){
  var o={};
  Object.keys(dict||{}).forEach(function(k){
    o[k]=(dict[k]||[]).map(function(c){
      return {cat:c.cat, items:(c.items||[]).map(function(it){return {n:it.n,qty:it.qty,l:!!it.l,store:it.store||'',priv:!!it.priv};})};
    });
  });
  return o;
}
var PACKING_TMPL = load('dtp_pack_tmpl', stripPackTmpl(PACKING_SEED));
function savePackTmpl(){save('dtp_pack_tmpl',PACKING_TMPL);}

FAMILY  = load('dtp_family', FAMILY);
ALL_IDS = FAMILY.map(function(p){return p.id;});
migrateDays(); DAYS = loadDays();
VISITS  = load('dtp_visits', VISITS);
PARKHOURS = load('dtp_hours', PARKHOURS);
DINING  = load('dtp_dining', DINING);
LLS     = load('dtp_lls', LLS);
SHOWS   = load('dtp_shows', SHOWS);
FLIGHTS = load('dtp_flights', FLIGHTS);
RESORTS = load('dtp_resorts', RESORTS);
PARKRES = load('dtp_parkres', PARKRES);
TICKETS = load('dtp_tickets', TICKETS);
REBOOKS = load('dtp_rebooks', REBOOKS);
TRIPS   = load('dtp_trips', TRIPS);
NOTIFS  = load('dtp_notifs', NOTIFS);
S.persona = load('dtp_persona', S.persona);
S.tripId  = load('dtp_tripId', S.tripId);   /* remember the last-selected trip across reloads */
function saveNotifs(){save('dtp_notifs',NOTIFS);}
function saveTripId(){save('dtp_tripId',S.tripId);}

/* ── Planning Parties (tenancy: a family/household above people & trips) ──
   A person carries party membership as metadata; a trip belongs to one or more
   parties; the active party scopes what you see. Synced like everything else. */
var PARTIES = load('dtp_parties', null);
if(!PARTIES){ var _legacy=load('dtp_groups',null); if(_legacy&&_legacy.length)PARTIES=_legacy; }
if(!PARTIES||!PARTIES.length){
  var _hasCloud=false;try{_hasCloud=!!localStorage.getItem('dtp__lastuid');}catch(e){}
  if(!_hasCloud){
    var _pa=(FAMILY.filter(function(p){return p.admin;})[0]||FAMILY[0]||{}).id||null;
    PARTIES=[{id:'g1',name:'My Group',by:_pa}];
  }else{
    PARTIES=[];
  }
}
/* every person & trip belongs to >=1 party (migrate legacy .groups). Must run
   on first load AND after every cloud pull, since synced records may predate
   the parties field — otherwise visibleTrips would wall them all out. */
function ensurePartyTags(){
  if(!PARTIES||!PARTIES.length){
    if(S._freshTenant)return;
    var _legacy=load('dtp_groups',null);
    if(_legacy&&_legacy.length)PARTIES=_legacy;
    else{
      var _hc=false;try{_hc=!!localStorage.getItem('dtp__lastuid');}catch(e){}
      if(_hc)return;
      var _pa=(FAMILY.filter(function(p){return p.admin;})[0]||FAMILY[0]||{}).id||null;
      PARTIES=[{id:'g1',name:'My Group',by:_pa}];
    }
  }
  var pid=PARTIES[0].id;
  /* parties carry a color too (like people and trips) — backfill any missing
     one from the shared palette so existing data picks up a stable color.
     Also rename the old auto-default "My Planning Party" to the new "My Group"
     (only the known default string — user-chosen names are left alone). */
  for(var pc=0;pc<PARTIES.length;pc++){if(!PARTIES[pc].color)PARTIES[pc].color=PALETTE[pc%PALETTE.length][0];
    if(PARTIES[pc].name==='My Planning Party')PARTIES[pc].name='My Group';}
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];
    if(!Array.isArray(p.parties)||!p.parties.length)p.parties=(Array.isArray(p.groups)&&p.groups.length)?p.groups.slice():[pid];
    /* split legacy single-field full legal name into first (p.name) + last name.
       Everything after the first token becomes the last name so middle names
       aren't dropped; p.name (the casual first name) is left untouched. */
    if(p.lastName===undefined&&p.fullName){var _sp=String(p.fullName).trim().split(/\s+/);p.lastName=_sp.length>1?_sp.slice(1).join(' '):'';}}
  for(var j=0;j<TRIPS.length;j++){var t=TRIPS[j];
    if(!Array.isArray(t.parties)||!t.parties.length)t.parties=(Array.isArray(t.groups)&&t.groups.length)?t.groups.slice():[pid];
    /* migrate legacy status field: 'active' trips had notifications on by default */
    if(t.notifyByDefault===undefined)t.notifyByDefault=!!(t.status==='active');}
}
ensurePartyTags();
function saveParties(){save('dtp_parties',PARTIES);}
S.partyId = load('dtp_partyId', PARTIES[0].id);   /* active party context */
function savePartyId(){save('dtp_partyId',S.partyId);}

/* every planning item belongs to a trip — default seed items to jul26 */
function tagTrip(coll){for(var i=0;i<coll.length;i++)if(!coll[i].trip)coll[i].trip='jul26';}
[DAYS,VISITS,PARKHOURS,DINING,LLS,SHOWS,FLIGHTS,RESORTS,PARKRES,TICKETS,REBOOKS].forEach(tagTrip);
CHAT = load('dtp_chat', CHAT);
/* every chat message needs a trip, a stable id, and a sortable timestamp
   (the seed uses display strings only) — backfill so sync/ordering works later */
(function(){var base=Date.now()-CHAT.length*1000;
  for(var i=0;i<CHAT.length;i++){var m=CHAT[i];
    if(!m.trip)m.trip='jul26';
    if(!m.id)m.id='c'+(base+i*1000)+'_'+i;
    if(!m.ts)m.ts=base+i*1000;
  }
})();
function saveChat(){save('dtp_chat',CHAT);}

/* per-trip packing / to-do (PACKING/TODO hold the active trip\'s lists) */
function listKey(base){return 'dtp_'+base+'_'+S.tripId;}
function loadLists(){
  if(!S.tripId){PACKING={};TODO=[];return;}   /* no trip selected — nothing to load */
  PACKING=load(listKey('packing'),null)||(S.tripId==='jul26'?PACKING_SEED:{});
  TODO=load(listKey('todo'),null)||(S.tripId==='jul26'?JSON.parse(JSON.stringify(TODO_SEED)):[]);
  if(!Array.isArray(TODO))TODO=[];   /* guard against old per-person shape */
  ensureLists();
}
function ensureLists(){tripMembers().forEach(function(id){if(!PACKING[id])PACKING[id]=[];});}
function saveLists(){if(!S.tripId)return;save(listKey('packing'),PACKING);save(listKey('todo'),TODO);}
function saveTODO(){save(listKey('todo'),TODO);}
function saveTmpl(){save('dtp_todo_tmpl',TODO_TMPL);}

/* generate day skeletons for any trip that has none, from its start/end */
function genDays(tid){
  var t=tripById(tid);if(!t||!t.start||!t.end)return;
  var s=t.start.split('-'),e=t.end.split('-');
  var cur=new Date(Date.UTC(+s[0],+s[1]-1,+s[2])),end=new Date(Date.UTC(+e[0],+e[1]-1,+e[2]));
  var WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  while(cur<=end){
    var ds=cur.getUTCFullYear()+'-'+('0'+(cur.getUTCMonth()+1)).slice(-2)+'-'+('0'+cur.getUTCDate()).slice(-2);
    DAYS.push({trip:tid,date:ds,d:String(cur.getUTCDate()),dl:WD[cur.getUTCDay()],tags:[],alert:null,visit:'',blurb:'',strategy:'',itin:[]});
    cur.setUTCDate(cur.getUTCDate()+1);
  }
}
/* reconcile a trip\'s day records to its start/end range, keeping in-range
   days (and their data), adding missing ones, dropping out-of-range ones */
function reconcileDays(tid){
  var t=tripById(tid);if(!t||!t.start||!t.end)return;
  var s=t.start.split('-'),e=t.end.split('-');
  var cur=new Date(Date.UTC(+s[0],+s[1]-1,+s[2])),end=new Date(Date.UTC(+e[0],+e[1]-1,+e[2]));
  var WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],want={};
  while(cur<=end){
    var ds=cur.getUTCFullYear()+'-'+('0'+(cur.getUTCMonth()+1)).slice(-2)+'-'+('0'+cur.getUTCDate()).slice(-2);
    want[ds]=WD[cur.getUTCDay()];cur.setUTCDate(cur.getUTCDate()+1);
  }
  for(var i=DAYS.length-1;i>=0;i--)if(DAYS[i].trip===tid&&!(DAYS[i].date in want))DAYS.splice(i,1);
  var have={};
  for(var j=0;j<DAYS.length;j++)if(DAYS[j].trip===tid)have[DAYS[j].date]=DAYS[j];
  Object.keys(want).forEach(function(ds){
    if(have[ds]){have[ds].d=String(+ds.slice(8));have[ds].dl=want[ds];}
    else DAYS.push({trip:tid,date:ds,d:String(+ds.slice(8)),dl:want[ds],tags:[],alert:null,visit:'',blurb:'',strategy:'',itin:[]});
  });
}
function materializeAllDays(){
  var changed=false;
  for(var i=0;i<TRIPS.length;i++){var tid=TRIPS[i].id,has=false;
    for(var j=0;j<DAYS.length;j++)if(DAYS[j].trip===tid){has=true;break;}
    if(!has){genDays(tid);changed=true;}}
  if(changed)saveDays();
}

/* ── Per-trip day storage ──────────────────────────────────────
   Days used to live in ONE record (dtp_days = every day of every trip). That
   single doc was the biggest thing we synced and the most likely to hit
   Firestore's size limit — and a failed write there silently lost ALL day
   strategies/plans at once. Now each trip's days are their own record
   (dtp_days_<tripId>), so size is bounded and a problem with one trip can't
   take down the rest. In-memory we still keep one flat DAYS array, so nothing
   else in the app changes. */
function daysKey(tid){return 'dtp_days_'+tid;}
/* read every per-trip day record back into one flat array; fall back to the
   legacy single key for any trip not yet migrated so nothing is ever lost */
function loadDays(){
  var out=[],seen={};
  try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);
    if(k&&k.indexOf('dtp_days_')===0){var a=load(k,[]);if(Array.isArray(a)){for(var j=0;j<a.length;j++)out.push(a[j]);seen[k.slice(9)]=1;}}
  }}catch(e){}
  var legacy=load('dtp_days',null);
  if(Array.isArray(legacy))legacy.forEach(function(d){if(d&&d.trip&&!seen[d.trip])out.push(d);});
  return out;
}
/* write the flat DAYS array back out, one record per trip */
function saveDays(){
  var byTrip={};
  for(var i=0;i<DAYS.length;i++){var d=DAYS[i];if(!d||!d.trip)continue;(byTrip[d.trip]=byTrip[d.trip]||[]).push(d);}
  for(var tid in byTrip)save(daysKey(tid),byTrip[tid]);
}
/* one-time split of the legacy dtp_days record into per-trip records. Safe to
   run repeatedly: it only writes a trip's record if one doesn't already exist
   (never clobbers newer per-trip data), then empties the legacy doc so the big
   record stops being written/synced. Also runs after cloud pulls in case data
   arrives from a device still on the old single-record build. */
function migrateDays(){
  var legacy=load('dtp_days',null);
  if(!Array.isArray(legacy)||!legacy.length)return;
  var existing={};
  try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('dtp_days_')===0)existing[k.slice(9)]=1;}}catch(e){}
  var byTrip={};
  legacy.forEach(function(d){if(d&&d.trip)(byTrip[d.trip]=byTrip[d.trip]||[]).push(d);});
  Object.keys(byTrip).forEach(function(tid){if(!existing[tid])save(daysKey(tid),byTrip[tid]);});
  save('dtp_days',[]);   /* retire the legacy record (kept empty so the empty state syncs out) */
}

/* collection savers */
function persist(){
  saveDays();save('dtp_visits',VISITS);save('dtp_hours',PARKHOURS);save('dtp_dining',DINING);save('dtp_lls',LLS);
  save('dtp_shows',SHOWS);save('dtp_flights',FLIGHTS);save('dtp_resorts',RESORTS);
  save('dtp_parkres',PARKRES);save('dtp_tickets',TICKETS);save('dtp_rebooks',REBOOKS);save('dtp_trips',TRIPS);save('dtp_family',FAMILY);save('dtp_parties',PARTIES);save('dtp_chat',CHAT);
}

/* re-read every synced collection from localStorage into the in-memory globals.
   Called after a cloud pull (sign-in reconcile or a realtime update) so the UI
   reflects data that arrived from another device. Identity/selection keys
   (persona, tripId) stay device-local and are intentionally not touched. */
function rehydrate(){
  TODO_TMPL=load('dtp_todo_tmpl',TODO_TMPL);
  PACKING_TMPL=load('dtp_pack_tmpl',PACKING_TMPL);
  FAMILY=load('dtp_family',FAMILY); ALL_IDS=FAMILY.map(function(p){return p.id;});
  migrateDays(); DAYS=loadDays(); VISITS=load('dtp_visits',VISITS); PARKHOURS=load('dtp_hours',PARKHOURS);
  DINING=load('dtp_dining',DINING); LLS=load('dtp_lls',LLS); SHOWS=load('dtp_shows',SHOWS);
  FLIGHTS=load('dtp_flights',FLIGHTS); RESORTS=load('dtp_resorts',RESORTS); PARKRES=load('dtp_parkres',PARKRES); TICKETS=load('dtp_tickets',TICKETS);
  REBOOKS=load('dtp_rebooks',REBOOKS); TRIPS=load('dtp_trips',TRIPS); NOTIFS=load('dtp_notifs',NOTIFS);
  PARTIES=load('dtp_parties',PARTIES)||PARTIES; CHAT=load('dtp_chat',CHAT);
  try{ensurePartyTags();}catch(e){}   /* re-tag records that arrived without a party */
  /* If a sync just removed the persona we were signed in as (the owner deleted
     us), we've been evicted — lock out instead of silently resolving to another
     seat (which let a removed test account become the admin and write to the
     tenant). Do this before ensure/render so the no-access gate wins. */
  try{ if(revalidateAfterSync())return; }catch(e){}
  try{ensureActiveParty();}catch(e){}
  try{ensureVisibleTrip();}catch(e){}
  try{loadLists();}catch(e){}
  try{render();}catch(e){}
}
/* returns true (and locks the device out) if the signed-in account's seat was
   removed from the shared workspace it's in. No-ops for the super-admin, for
   tenant impersonation, when not in a shared workspace, or mid-join (no persona
   claimed yet) — only a genuine eviction of a previously-claimed seat triggers. */
function revalidateAfterSync(){
  if(!(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user))return false;
  if(window.CLOUD.adminWid||window.CLOUD.isSuper)return false;
  if(!S._seated)return false;                 /* never settled on a seat — mid-join/adopt, don't evict */
  if(!(window.CLOUD.inParty&&window.CLOUD.inParty()))return false;
  if(!S.persona)return false;
  if(person(S.persona))return false;          /* our seat still exists */
  if(personaForUid(cloudUid()))return false;  /* re-linked to another seat */
  try{ if(window.CLOUD.leaveParty)window.CLOUD.leaveParty(); }catch(e){}
  revokeAccess();
  return true;
}

/* ── Helpers ───────────────────────────────────────────────── */
function person(id){for(var i=0;i<FAMILY.length;i++)if(FAMILY[i].id===id)return FAMILY[i];return null;}
/* ── Planning Parties ── (active-party context scopes what you see) */
function partyById(id){for(var i=0;i<PARTIES.length;i++)if(PARTIES[i].id===id)return PARTIES[i];return null;}
function personInParty(p,pid){return !!(p&&p.parties&&p.parties.indexOf(pid)>=0);}
function partyPeople(pid){pid=pid||S.partyId;return FAMILY.filter(function(p){return personInParty(p,pid);});}
function tripsInParty(pid){return TRIPS.filter(function(t){return t.parties&&t.parties.indexOf(pid)>=0;});}
/* re-materialize the member snapshot of every trip in a group = everyone in the
   trip's group(s). Trips store members at save time, so when group membership
   changes later we refresh affected trips — otherwise a newly-added person isn't
   counted on, filterable in, or notified about trips created before they joined. */
function refreshTripMembers(gid){
  var changed=false;
  TRIPS.forEach(function(t){
    if(!(t.parties&&t.parties.indexOf(gid)>=0))return;
    var ids={};(t.parties||[]).forEach(function(g){partyPeople(g).forEach(function(p){ids[p.id]=1;});});
    var next=Object.keys(ids),prev=t.members||[];
    if(next.length!==prev.length||next.some(function(id){return prev.indexOf(id)<0;})){t.members=next;changed=true;}
  });
  if(changed)save('dtp_trips',TRIPS);
}
function visibleParties(){if(isAdmin())return PARTIES.slice();var me=person(S.persona);return PARTIES.filter(function(g){return personInParty(me,g.id);});}
function activeParty(){return partyById(S.partyId)||visibleParties()[0]||PARTIES[0]||null;}
/* the human label for the current party — prefers the in-app name over the
   cloud workspace name (which can be a stale "Planning Party" default) */
function partyLabel(){var g=activeParty();return (g&&g.name)||(window.CLOUD&&window.CLOUD.partyName)||'Group';}
function ensureActiveParty(){var vg=visibleParties();if(!vg.length){S.partyId=(PARTIES[0]||{}).id||null;return;}for(var i=0;i<vg.length;i++)if(vg[i].id===S.partyId)return;S.partyId=vg[0].id;}
function switchParty(pid){if(pid===S.partyId){closeSheet();return;}S.partyId=pid;savePartyId();ensureVisibleTrip();S.dayIdx=0;S.open=defOpen();S.fmode='all';S.filter.clear();closeSheet();toast('Group: '+((partyById(pid)||{}).name||''));render();}
function trip(){for(var i=0;i<TRIPS.length;i++)if(TRIPS[i].id===S.tripId)return TRIPS[i];return visibleTrips()[0]||TRIPS[0];}
/* trips the current persona may see: within the active party; admins see all of
   it, others only trips they own or are a member of (owning always wins) */
/* a trip belongs to the active party (an untagged trip shows everywhere so
   data never silently disappears) */
function visibleTrips(){
  if(isAdmin())return TRIPS.slice();
  var me=person(S.persona);
  return TRIPS.filter(function(t){
    if(t.by&&t.by===S.persona)return true;
    if(t.members&&t.members.indexOf(S.persona)>=0)return true;
    /* group membership grants visibility too — every member of a trip's group is
       on the trip (the t.members snapshot can lag a later-added person). Mirrors
       the person-detail "trips this person is on" logic. */
    return (t.parties||[]).some(function(g){return personInParty(me,g);});
  });
}
/* does the current persona have any trip they can see? */
function hasVisibleTrip(){return !!visibleTrips().length;}
/* is the current selection empty or pointing at a trip this persona can\'t see?
   "no trip selected" is a deliberate state — you only leave it by picking a trip */
function noTripSelected(){
  if(!S.tripId)return true;
  var vt=visibleTrips();
  for(var i=0;i<vt.length;i++)if(vt[i].id===S.tripId)return false;
  return true;
}
/* validate the active selection; auto-select the first visible trip if nothing
   is currently selected or the stored id no longer exists. */
function ensureVisibleTrip(){if(noTripSelected()){var vt=visibleTrips();S.tripId=(vt[0]&&vt[0].id)||null;}}
/* who may edit a trip\'s details: admins or the person who created it */
function canEditTrip(t){t=t||trip();return isAdmin()||!!(t&&t.by&&t.by===S.persona);}
/* personas assigned to the current trip (drives filters + who-select) */
function tripMembers(){var t=trip();return (t&&t.members&&t.members.length)?t.members.filter(function(id){return !!person(id);}):partyPeople(S.partyId).map(function(p){return p.id;});}
function whoArr(who){return who==="all"?tripMembers():who;}
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function monOf(ds){return MON[parseInt(ds.slice(5,7),10)-1]||'';}
function tripDays(){return DAYS.filter(function(d){return d.trip===S.tripId;}).sort(function(a,b){return a.date<b.date?-1:a.date>b.date?1:0;});}
function day(){var ds=tripDays();return ds[S.dayIdx]||ds[0]||null;}
function dayByDate(ds){for(var i=0;i<DAYS.length;i++)if(DAYS[i].trip===S.tripId&&DAYS[i].date===ds)return DAYS[i];return null;}
function fmtDay(ds){var d=dayByDate(ds);return d?(monOf(ds)+" "+d.d+" · "+d.dl):ds;}
/* park visits — first-class items that drive each day\'s park */
function visitsFor(ds){return VISITS.filter(function(v){return v.trip===S.tripId&&v.day===ds;});}
function dayPrimaryPark(ds){var vs=visitsFor(ds).filter(function(v){return visible(v.who);});if(!vs.length)vs=visitsFor(ds);return vs.length?vs[0].park:null;}
function pkOf(ds){var p=dayPrimaryPark(ds);return (p&&PARKS[p])?PARKS[p]:PARKS.trv;}
/* park hours (a park-on-a-date fact: open/close/early/late + crowd) */
function parkHoursFor(ds){return PARKHOURS.filter(function(h){return h.trip===S.tripId&&h.day===ds;});}
function hoursFor(park,ds){var l=parkHoursFor(ds);for(var i=0;i<l.length;i++)if(l[i].park===park)return l[i];return null;}
var TIMING={morning:'Morning',day:'Day',evening:'Evening',late:'Late'};
function timingLbl(t){return TIMING[t]||'Day';}

/* person-filter visibility.
   A non-empty S.filter (specific people picked) always wins; otherwise the
   primary mode applies: all = everything, mine = items I\'m on (incl. everyone-
   items), notme = items I\'m NOT on (the ones I could ask to join). */
function visible(who){
  if(S.filter&&S.filter.size){
    if(who==="all") return true;           // everyone-items always show
    for(var i=0;i<who.length;i++) if(S.filter.has(who[i])) return true;
    return false;
  }
  var mode=S.fmode||'all';
  if(mode==='all') return true;
  var meIn=(who==="all")||(Array.isArray(who)&&who.indexOf(S.persona)>=0);
  return mode==='mine'?meIn:!meIn;         // 'notme'
}
/* is any person filter currently narrowing the view? */
function filterActive(){return !!((S.filter&&S.filter.size)||(S.fmode&&S.fmode!=='all'));}
function esc(s){return (s==null?"":String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

/* who display — person-initial circles everywhere something is assigned */
/* an explicit list that already covers the whole trip is just "everyone" */
function collapseWho(who){
  if(!Array.isArray(who))return who;
  var mem=tripMembers();
  if(!mem.length||who.length<mem.length)return who;
  for(var i=0;i<mem.length;i++)if(who.indexOf(mem[i])<0)return who;
  return 'all';
}
function whoChips(who){return whoStack(who);}
/* live member id-set for the active trip, computed from its groups' CURRENT
   membership (not the t.members snapshot, which can lag). Used to hide the icons
   of people who've been removed from the trip's group without needing the item
   re-saved. Returns null when membership is unknown (don't filter). */
function tripMemberIds(){
  var t=trip();if(!t)return null;
  if(t.parties&&t.parties.length){var ids={};t.parties.forEach(function(g){partyPeople(g).forEach(function(p){ids[p.id]=1;});});return ids;}
  if(t.members&&t.members.length){var m={};t.members.forEach(function(id){if(person(id))m[id]=1;});return m;}
  return null;
}
function whoStack(who){
  who=collapseWho(who);
  if(who==="all"||!who) return '<div class="who-named-row"><span class="who-named who-all">'+IC.users+'Everyone</span></div>';
  if(!who.length) return '';
  var set=tripMemberIds();
  var ppl=[];
  for(var i=0;i<who.length;i++){var id=who[i];if(set&&!set[id])continue;var p=person(id);if(p)ppl.push(p);}
  if(!ppl.length) return '';
  /* 1–2 people: spell out the names; 3+: compact overlapping initials */
  if(ppl.length<=2){
    var chips='';
    for(var j=0;j<ppl.length;j++){var pj=ppl[j];
      chips+='<span class="who-named"><span class="wdot" style="background:'+pj.color+'">'+esc(pj.name[0])+'</span>'+esc(pj.name)+'</span>';}
    return '<div class="who-named-row">'+chips+'</div>';
  }
  var dots='';
  for(var k=0;k<ppl.length;k++){var pk=ppl[k];
    dots+='<span class="wdot" style="background:'+pk.color+'" title="'+esc(pk.name)+'">'+esc(pk.name[0])+'</span>';}
  return '<div class="who-stack">'+dots+'</div>';
}

/* status badge */
function statusBadge(st){
  var map={
    booked:['st-booked','Booked'], planning:['st-planning','Planned'],
    reserved:['st-reserved','Reserved'], planned:['st-planned','Planned'], want:['st-want','Want to Try'],
    attend:['st-booked','Attending'], scheduled:['st-todo','Scheduled'],
    todo:['st-todo','To Do'], done:['st-done','Done'], na:['st-na','N/A']
  };
  var m=map[st]||['st-todo',st];
  var ic = (st==='booked'||st==='reserved'||st==='done')?'<span style="display:flex">'+IC.checkw+'</span>':'';
  return '<span class="st-badge '+m[0]+'">'+ic+m[1]+'</span>';
}
function isPlanningStatus(st){return st==='planning'||st==='want'||st==='planned'||st==='scheduled';}

function tagCls(t){return t==='sp'?'sp':t==='mp1'?'mp1':'mp2';}
function tagLbl(t){return t==='sp'?'Single Pass':t==='mp1'?'Multi Pass T1':'Multi Pass T2';}
function tagShort(t){return t==='sp'?'SP':t==='mp1'?'T1':'T2';}

function crowdPill(v){
  if(v==null)return '<span style="color:var(--muted);font-size:13px">—</span>';
  var cls=v<=3?'cpl-lt':v<=6?'cpl-md':'cpl-hv', lbl=v<=3?'Light':v<=6?'Moderate':'Heavy';
  return '<span class="crowd-pill '+cls+'">'+lbl+'</span><span style="font-size:10px;color:var(--muted);margin-left:3px">'+v+'/10</span>';
}
function firstSentence(s){if(!s)return'';var m=s.match(/^([^.!?]+[.!?])/);return m?m[1].trim():s.split('\n')[0].trim();}
function pillify(t){
  t=t.replace(/\(Single Pass[^)]*\)/g,'<span class="ll-tag sp">SP</span>');
  t=t.replace(/\(MP T1\)/g,'<span class="ll-tag mp1">T1</span>');
  t=t.replace(/\(MP T2\)/g,'<span class="ll-tag mp2">T2</span>');
  return t;
}
function isFlightRow(it){return (it.crit&&it.crit.toLowerCase().indexOf('flight')>=0)||/^(Depart|Arrive)\b/.test(it.x);}
/* "Admin" is a persona role. Being signed in as an admin persona grants all
   admin rights; switching into an admin persona is itself PIN-protected, so the
   admin\'s login PIN is effectively the admin PIN — the two are one and the same. */
function isAdmin(){var p=person(S.persona);return !!(p&&p.admin);}            /* global admin (any trip) */
function canCreateTrip(){
  if(!(window.CLOUD&&window.CLOUD.enabled))return true;
  if(window.CLOUD.isSuper)return true;
  if(isAdmin())return true;
  /* first-time authorized owner who hasn't created a tenant yet — the wizard
     creates the tenant for them when they finish naming their group */
  if(window.CLOUD.isOwner&&!(window.CLOUD.inParty&&window.CLOUD.inParty()))return true;
  return false;
}
function isTripOwner(t){t=t||trip();return !!(t&&t.by&&t.by===S.persona);}    /* owner of this trip */
/* may edit/delete an item: its creator, the trip owner, or a global admin */
function canManage(it){
  if(isAdmin()||isTripOwner()) return true;
  return !!(it&&it.by&&it.by===S.persona);
}
/* delete/edit guard with a toast on refusal (everyday items) */
function ownOK(it){
  if(canManage(it)) return true;
  var who=(it&&it.by&&person(it.by))?person(it.by).name:'its creator';
  toast('Only '+who+', the trip owner or an admin can change this'); return false;
}
/* critical/irreversible deletes: caution + the acting person\'s own PIN */
function confirmCritical(label,cb){
  if(!confirm('⚠️ Delete this '+label+'?\n\nThis can\'t be undone. Make sure you really mean to.')) return;
  var me=person(S.persona);
  if(me&&me.pin){
    askPin({title:'Confirm with your PIN',sub:'Enter your PIN to delete this '+label+'.'},function(e){
      if(e==null)return;
      if(String(e).trim()!==String(me.pin)){toast('Incorrect PIN');return;}
      cb();
    });
  } else cb();
}
/* gate for admin-only areas (Settings, managing people) */
function adminGate(){
  if(isAdmin()) return true;
  toast('Admin only — switch to an admin persona first'); return false;
}
/* the item a (single) edit screen is pointed at, or null for a new item */
function screenItem(){
  if(!S.screen)return null;
  var t=S.screen.type;
  if(t==='stopedit'){var d=dayByDate(S.screen.day);return (d&&d.itin&&S.screen.idx!=null)?d.itin[S.screen.idx]:null;}
  var id=S.screen.edit;if(!id)return null;
  var M={adddining:DINING,llbook:LLS,addll:LLS,addflight:FLIGHTS,resortedit:RESORTS,showedit:SHOWS,predit:PARKRES,ticketedit:TICKETS,visedit:VISITS,hoursedit:PARKHOURS,rbedit:REBOOKS};
  var coll=M[t];if(!coll)return null;
  for(var i=0;i<coll.length;i++)if(coll[i].id===id)return coll[i];
  return null;
}
/* remove just yourself from an item\'s people (the self-removal exception) */
function removeMe(){
  var it=screenItem();if(!it){closeScreen();return;}
  var cat=CAT_OF[S.screen.type]||'';
  var oldWho=it.who;
  if(it.who==='all') it.who=tripMembers().filter(function(m){return m!==S.persona;});
  else if(Array.isArray(it.who)) it.who=it.who.filter(function(m){return m!==S.persona;});
  persist();
  if(cat) notifyChange({trip:it.trip,cat:cat,label:notifLabel(cat,it),item:it,oldWho:oldWho,newWho:it.who,actor:S.persona,optIn:S._notify});
  toast('Removed you from this');closeScreen();render();
}
/* add yourself to an item you can see but aren\'t on (self-add / "request back in") */
function joinMe(){
  var it=screenItem();if(!it){closeScreen();return;}
  var cat=CAT_OF[S.screen.type]||'';
  if(it.who==='all'){toast('You\'re already included');closeScreen();return;}
  var oldWho=it.who;
  var arr=Array.isArray(it.who)?it.who.slice():[];
  if(arr.indexOf(S.persona)<0)arr.push(S.persona);
  it.who=collapseWho(arr);
  persist();
  if(cat) notifyChange({trip:it.trip,cat:cat,label:notifLabel(cat,it),item:it,oldWho:oldWho,newWho:it.who,actor:S.persona,optIn:S._notify});
  toast(isActionCat(cat)?'Added you — '+(person(creatorOf(it,it.trip))?person(creatorOf(it,it.trip)).name:'the organizer')+' will update the booking':'Added you to this');
  closeScreen();render();
}

/* ============================================================
   NOTIFICATIONS
   action-required kinds always notify the creator; everything else is
   gated by trip.notifyByDefault (off = silent unless opted in; on = prompt)
   ============================================================ */
var ACTION_CATS={Dining:1,'Lightning Lane':1,'Park reservation':1};
function isActionCat(c){return !!ACTION_CATS[c];}
/* screen type → notification category (drives self-leave from plan items) */
var CAT_OF={adddining:'Dining',llbook:'Lightning Lane',addll:'Lightning Lane',predit:'Park reservation',
  showedit:'Show',addflight:'Flight',resortedit:'Resort',visedit:'Park visit'};

function pname(id){var p=person(id);return p?p.name:'Someone';}
/* readable list of who an item applies to: "Everyone" / "Nancy" / "Scott & Cian" */
function whoNames(who){
  who=collapseWho(who);
  if(who==='all'||!who) return 'Everyone';
  if(!who.length) return '';
  var names=[];for(var i=0;i<who.length;i++){var p=person(who[i]);if(p)names.push(p.name);}
  if(!names.length) return '';
  if(names.length===1) return names[0];
  return names.slice(0,-1).join(', ')+' & '+names[names.length-1];
}
/* display full name: first + last when a last name is set, else just first */
function pfullname(p){if(!p)return '';return (p.lastName?(p.name+' '+p.lastName):p.name)||'';}
/* a who-bearing item\'s responsible person: its creator, else the trip owner */
function creatorOf(item,tid){
  if(item&&item.by)return item.by;
  var t=tripById(tid||(item&&item.trip)||S.tripId);
  return t?t.by:null;
}
/* normalise an item\'s `who` to an explicit member array for a given trip */
function whoArrFor(who,tid){
  if(who==='all'){var t=tripById(tid)||trip();return (t&&t.members&&t.members.length)?t.members.slice():tripMembers();}
  return Array.isArray(who)?who.slice():[];
}
function notifLabel(cat,it){
  it=it||{};
  if(cat==='Dining')return it.name||'a dining reservation';
  if(cat==='Lightning Lane')return it.ride||'a Lightning Lane';
  if(cat==='Park reservation')return (it.park&&PARKS[it.park]?PARKS[it.park].name:'a park')+' reservation';
  if(cat==='Re-book')return it.text||'a re-book';
  if(cat==='Show')return it.name||'a show';
  if(cat==='Flight')return it.label||'a flight';
  if(cat==='Resort')return it.name||'a resort stay';
  if(cat==='Park visit')return (it.park&&PARKS[it.park]?PARKS[it.park].name:'a park')+' visit';
  if(cat==='Park ticket')return ticketLabel(it);
  if(cat==='Plan')return it.x||it.n||'a plan';
  if(cat==='To Do')return it.n||'a to-do';
  if(cat==='Packing')return it.n||'a packing item';
  return 'this item';
}

/* pure: split a who-change into forced (always-send) + optional notifications */
function buildNotifPlan(o){
  var actor=o.actor||S.persona, cat=o.cat, label=o.label||'this item', item=o.item||{}, tid=o.trip||S.tripId;
  var oldA=whoArrFor(o.oldWho,tid), newA=whoArrFor(o.newWho,tid);
  var added=newA.filter(function(x){return oldA.indexOf(x)<0;});
  var removed=oldA.filter(function(x){return newA.indexOf(x)<0;});
  var priv=!!item.priv, onItem=newA, who=pname(actor);
  var optional=[], forced=[];
  function mk(to,kind,text){return {to:to,kind:kind,cat:cat,label:label,text:text,trip:tid,from:actor};}
  added.forEach(function(id){ if(id&&id!==actor) optional.push(mk(id,'added',who+' added you to “'+label+'” ('+cat+')')); });
  removed.forEach(function(id){
    if(!id||id===actor)return;
    if(priv&&onItem.indexOf(id)<0)return;       /* hidden item: only notify people still on it */
    optional.push(mk(id,'removed',who+' removed you from “'+label+'” ('+cat+')'));
  });
  if(isActionCat(cat)){
    var creator=creatorOf(item,tid);
    var canSeeCreator=!priv||onItem.indexOf(creator)>=0;
    if(creator&&creator!==actor&&canSeeCreator){
      if(added.length){
        var addedOthers=added.filter(function(x){return x!==actor;});
        var txt=addedOthers.length
          ? who+' added '+addedOthers.map(function(x){return pname(x);}).join(', ')+' to “'+label+'” — you may need to update the booking'
          : who+' joined “'+label+'” — you may need to update the booking';
        forced.push(mk(creator,'action',txt));
      }
      if(removed.indexOf(actor)>=0){
        forced.push(mk(creator,'left',who+' left “'+label+'” — you may need to update the booking'));
      }
    }
  }
  return {optional:optional,forced:forced};
}

function sendNotifPlan(items){
  if(!items||!items.length)return 0;
  for(var i=0;i<items.length;i++){var p=items[i];
    NOTIFS.push({id:'n'+Date.now()+'_'+Math.random().toString(36).slice(2,6),
      trip:p.trip,to:p.to,from:p.from,kind:p.kind,cat:p.cat,label:p.label,text:p.text,time:Date.now(),read:false});
  }
  saveNotifs();return items.length;
}
function bumpBell(){var hh=document.getElementById('header-host');if(hh)hh.innerHTML=renderHeader();}

/* orchestrate after a who-change. On active trips (or planning + opt-in) we
   open the "who to notify" picker: the creator is preselected (and locked for
   real bookings), the people added/removed are preselected, and everyone else
   on the trip is available to add. On a planning trip with no opt-in we stay
   silent except for the must-notify creator of an action-required item. */
function notifyChange(o){
  var plan=buildNotifPlan(o);
  if(!plan.forced.length&&!plan.optional.length){bumpBell();return;}
  var t=tripById(o.trip)||trip();
  var active=(t&&t.notifyByDefault);
  if(!active&&!o.optIn){ if(plan.forced.length)sendNotifPlan(plan.forced); bumpBell(); return; }
  openNotifConfirm(o,plan);
}
function tripMembersFor(tid){var t=tripById(tid)||trip();return (t&&t.members&&t.members.length)?t.members.slice():tripMembers();}

/* the notification we\'d deliver a given recipient for this change */
function notifForRecipient(id,o){
  var b=(S._notifById||{})[id];if(b)return b;
  /* someone the actor chose to also tell — a plain heads-up */
  var who=pname(o.actor),text,kind='change';
  if(o.bought){ return {to:id,from:o.actor,trip:o.trip,cat:o.cat,label:o.label,kind:'added',text:who+' bought “'+o.label+'”'}; }
  if(o.rsvp){ return {to:id,from:o.actor,trip:o.trip,cat:o.cat,label:o.label,kind:(o.rsvp==='in'?'added':'removed'),text:who+(o.rsvp==='in'?' is in for ':' can’t make ')+'“'+o.label+'”'}; }
  if(o.deleted){ text=who+' deleted “'+o.label+'” ('+o.cat+')'; kind='removed'; }
  else{
    var oldA=whoArrFor(o.oldWho,o.trip),newA=whoArrFor(o.newWho,o.trip);
    if(oldA.indexOf(o.actor)>=0&&newA.indexOf(o.actor)<0) text=who+' left “'+o.label+'” ('+o.cat+')';
    else if(oldA.indexOf(o.actor)<0&&newA.indexOf(o.actor)>=0) text=who+' joined “'+o.label+'” ('+o.cat+')';
    else text=who+' updated who\'s on “'+o.label+'” ('+o.cat+')';
  }
  return {to:id,from:o.actor,trip:o.trip,cat:o.cat,label:o.label,kind:kind,text:text};
}
/* deleting an item that had people on it — offer to alert them (and the
   creator, if an admin/owner is deleting someone else\'s). Same status gate. */
function notifyDelete(cat,item){
  if(!item||!cat)return;
  var actor=S.persona,tid=item.trip||S.tripId,who=pname(actor),label=notifLabel(cat,item);
  var people=whoArrFor(item.who,tid).filter(function(id){return id!==actor&&person(id);});
  var creator=creatorOf(item,tid);
  if(creator&&creator!==actor&&people.indexOf(creator)<0&&person(creator))people.push(creator);
  if(!people.length)return;
  var t=tripById(tid)||trip(),active=(t&&t.notifyByDefault);
  if(!active&&!S._notify)return;          /* silent unless trip notifies by default or opted in */
  var off=isActionCat(cat)?' — that booking is off':'';
  var plan={forced:[],optional:[]};
  people.forEach(function(id){
    plan.optional.push({to:id,from:actor,trip:tid,cat:cat,label:label,kind:'removed',text:who+' deleted “'+label+'” ('+cat+')'+off});
  });
  openNotifConfirm({actor:actor,trip:tid,cat:cat,label:label,oldWho:item.who,newWho:[],deleted:true},plan);
}
/* trip membership changed (created or edited) — offer to tell people they were
   added to / removed from the trip. Gated like everything else. */
function notifyMembership(tripObj,oldMem,newMem,optIn){
  if(!tripObj)return;
  var actor=S.persona,who=pname(actor),oldA=oldMem||[],newA=newMem||[];
  var added=newA.filter(function(x){return oldA.indexOf(x)<0&&x!==actor&&person(x);});
  var removed=oldA.filter(function(x){return newA.indexOf(x)<0&&x!==actor&&person(x);});
  if(!added.length&&!removed.length)return;
  var active=(tripObj.notifyByDefault);
  if(!active&&!optIn)return;             /* silent unless trip notifies by default or opted in */
  var plan={forced:[],optional:[]};
  added.forEach(function(id){plan.optional.push({to:id,from:actor,trip:tripObj.id,cat:'Trip',label:tripObj.name,kind:'added',text:who+' added you to the trip “'+tripObj.name+'”'});});
  removed.forEach(function(id){plan.optional.push({to:id,from:actor,trip:tripObj.id,cat:'Trip',label:tripObj.name,kind:'removed',text:who+' removed you from the trip “'+tripObj.name+'”'});});
  openNotifConfirm({actor:actor,trip:tripObj.id,cat:'Trip',label:tripObj.name,oldWho:oldA,newWho:newA},plan);
}

/* confirm picker — choose who to notify */
function openNotifConfirm(o,plan){
  var byId={};
  plan.forced.forEach(function(p){byId[p.to]={to:p.to,from:p.from,trip:p.trip,cat:p.cat,label:p.label,kind:p.kind,text:p.text,locked:true};});
  plan.optional.forEach(function(p){if(!byId[p.to])byId[p.to]={to:p.to,from:p.from,trip:p.trip,cat:p.cat,label:p.label,kind:p.kind,text:p.text,locked:false};});
  S._notifCtx=o;S._notifById=byId;
  S._notifSel=new Set(Object.keys(byId));
  S._notifLocked=new Set();Object.keys(byId).forEach(function(id){if(byId[id].locked)S._notifLocked.add(id);});
  S._notifPool=tripMembersFor(o.trip).filter(function(id){return id!==o.actor&&person(id);});
  Object.keys(byId).forEach(function(id){if(S._notifPool.indexOf(id)<0&&person(id))S._notifPool.push(id);});
  var host=document.getElementById('notif-host');
  if(!host){host=document.createElement('div');host.id='notif-host';document.body.appendChild(host);}
  renderNotifConfirm();
}
function notifKindShort(k){return k==='removed'?'removed':k==='left'?'left':k==='action'?'must act':k==='added'?'added':'';}
function notifRoleSub(id){var b=(S._notifById||{})[id];return b?(b.locked?'must act':notifKindShort(b.kind)):'';}
function renderNotifConfirm(){
  var host=document.getElementById('notif-host');if(!host)return;
  var pool=S._notifPool||[];if(!pool.length){host.innerHTML='';return;}
  var anyLocked=!!(S._notifLocked&&S._notifLocked.size);
  var h='<div class="pin-backdrop" onclick="if(event.target===this)skipNotif()"><div class="pin-modal" style="max-width:340px;text-align:left">';
  h+='<div class="pin-title">Send a notification?</div>';
  h+='<div class="pin-sub">Choose who to let know. '+(anyLocked?'Whoever booked it is always told.':'Tap to add or remove anyone.')+'</div>';
  h+='<div class="whoselect" style="margin:12px 0 4px">';
  for(var i=0;i<pool.length;i++){var id=pool[i],p=person(id);if(!p)continue;
    var locked=S._notifLocked&&S._notifLocked.has(id);
    var on=locked||(S._notifSel&&S._notifSel.has(id));
    var sub=notifRoleSub(id);
    h+='<div class="who-opt'+(on?' on':'')+(locked?' locked':'')+'"'+(locked?'':' onclick="toggleNotifSel(\''+id+'\')"')+'>'
      +'<span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)
      +(sub?'<span class="notif-sel-kind">'+sub+(locked?' '+IC.lock:'')+'</span>':'')
      +'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';
  }
  h+='</div>';
  h+='<div style="display:flex;gap:8px;margin-top:14px"><button class="btn-secondary" style="margin:0;flex:1" onclick="skipNotif()">'+(anyLocked?'Just them':'Skip')+'</button><button class="btn-secondary green" style="margin:0;flex:1" onclick="sendNotif()">Send</button></div>';
  h+='</div></div>';
  host.innerHTML=h;
}
function toggleNotifSel(id){if(!S._notifSel)S._notifSel=new Set();if(S._notifSel.has(id))S._notifSel.delete(id);else S._notifSel.add(id);renderNotifConfirm();}
function closeNotifConfirm(){S._notifCtx=null;S._notifById=null;S._notifSel=null;S._notifLocked=null;S._notifPool=null;var host=document.getElementById('notif-host');if(host)host.innerHTML='';}
function skipNotif(){ /* still deliver the must-notify (locked) recipients */
  var o=S._notifCtx,sel=[];
  if(o&&S._notifLocked)S._notifLocked.forEach(function(id){sel.push(notifForRecipient(id,o));});
  var n=sendNotifPlan(sel);closeNotifConfirm();bumpBell();
  if(n)toast('Notified '+n+' '+(n===1?'person':'people'));
}
function sendNotif(){
  var o=S._notifCtx,ids=new Set(),sel=[];
  if(S._notifSel)S._notifSel.forEach(function(id){ids.add(id);});
  if(S._notifLocked)S._notifLocked.forEach(function(id){ids.add(id);});
  ids.forEach(function(id){sel.push(notifForRecipient(id,o));});
  var n=sendNotifPlan(sel);closeNotifConfirm();bumpBell();
  toast(n?('Notified '+n+' '+(n===1?'person':'people')):'No notifications sent');
}

/* recipient-side queries */
/* newest first; tiebreak by insertion order so same-millisecond notifs are stable */
function notifsFor(pid){pid=pid||S.persona;
  return NOTIFS.map(function(n,i){return {n:n,i:i};})
    .filter(function(x){return x.n.to===pid;})
    .sort(function(a,b){return (b.n.time-a.n.time)||(b.i-a.i);})
    .map(function(x){return x.n;});
}
function notifUnread(pid){pid=pid||S.persona;var n=0;for(var i=0;i<NOTIFS.length;i++)if(NOTIFS[i].to===pid&&!NOTIFS[i].read)n++;return n;}
function markNotifsRead(pid){pid=pid||S.persona;var ch=false;for(var i=0;i<NOTIFS.length;i++)if(NOTIFS[i].to===pid&&!NOTIFS[i].read){NOTIFS[i].read=true;ch=true;}if(ch)saveNotifs();}
function clearNotifs(){NOTIFS=NOTIFS.filter(function(n){return n.to!==S.persona;});saveNotifs();
  var h=document.getElementById('screen-host');if(h){h.innerHTML=renderScreen();var s=h.firstChild;if(s)s.classList.add('in');}bumpBell();}
function agoText(ts){
  var s=Math.floor((Date.now()-ts)/1000);if(s<60)return 'just now';
  var m=Math.floor(s/60);if(m<60)return m+'m ago';
  var hr=Math.floor(m/60);if(hr<24)return hr+'h ago';
  var d=Math.floor(hr/24);if(d<7)return d+'d ago';
  try{return new Date(ts).toLocaleDateString();}catch(e){return '';}
}
/* Chat timestamp: format the real ts ("Jun 2 · 8:14 PM" to match seed style),
   falling back to the stored time string for seed messages that have no ts. */
var CHAT_MONS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function chatTime(m){
  if(m&&m.ts){
    try{
      var d=new Date(m.ts);
      var hr=d.getHours(),ap=hr<12?'AM':'PM',h12=hr%12;if(h12===0)h12=12;
      var mn=d.getMinutes();mn=mn<10?'0'+mn:''+mn;
      return CHAT_MONS[d.getMonth()]+' '+d.getDate()+' · '+h12+':'+mn+' '+ap;
    }catch(e){}
  }
  return (m&&m.time)?m.time:'';
}
function notifKindCls(k){return (k==='action'||k==='left')?'nk-act':k==='removed'?'nk-rm':'nk-add';}
function notifKindMark(k){return (k==='action'||k==='left')?IC.warn:k==='removed'?'<span style="font-weight:800">–</span>':IC.checkw;}
function notifDefault(){return !!(trip()&&trip().notifyByDefault);}
function notifToggle(){S._notify=!S._notify;renderScreen_inplace2();}
/* the in-editor notify control (appended after the who-select) */
function notifyField(cat){
  var active=!!(trip()&&trip().notifyByDefault),on=!!S._notify;
  var h='<div class="field"><label class="field-label">Notifications</label>';
  h+='<div class="notify-row'+(on?' on':'')+'" onclick="notifToggle()"><span class="notify-check">'+(on?IC.checkw:'')+'</span>';
  if(active){
    h+='<div><div class="notify-lbl">Notify people when I save</div><div class="notify-sub">This trip notifies by default — tick to choose who to let know when you save.</div></div></div>';
  }else{
    h+='<div><div class="notify-lbl">Notify people of this change</div><div class="notify-sub">Notifications are off by default for this trip — switch on to notify for this change.</div></div></div>';
  }
  if(isActionCat(cat))h+='<div class="notify-note amber">'+IC.warn+' Whoever booked this is always told when people join or leave — it may need a real reservation change.</div>';
  return h+'</div>';
}
/* open the picker for a general heads-up when who didn\'t change but notify is on */
function openNotifAll(cat,rec){
  var actor=S.persona,tid=rec.trip||S.tripId,label=notifLabel(cat,rec);
  var members=whoArrFor(rec.who,tid).filter(function(id){return id!==actor&&person(id);});
  if(isActionCat(cat)){
    var creator=creatorOf(rec,tid);
    if(creator&&creator!==actor&&members.indexOf(creator)<0&&person(creator))members.push(creator);
  }
  if(!members.length){bumpBell();return;}
  var who=pname(actor),plan={forced:[],optional:[]};
  members.forEach(function(id){
    plan.optional.push({to:id,from:actor,trip:tid,cat:cat,label:label,kind:'change',text:who+' updated "'+label+'" ('+cat+')'});
  });
  openNotifConfirm({actor:actor,trip:tid,cat:cat,label:label,oldWho:rec.who,newWho:rec.who},plan);
}
function afterWhoSave(cat,rec,oldWho){
  var tid=rec.trip||S.tripId;
  if(S._notify){
    var oldA=whoArrFor(oldWho,tid),newA=whoArrFor(rec.who,tid);
    if(oldA.slice().sort().join()===newA.slice().sort().join()){openNotifAll(cat,rec);return;}
  }
  notifyChange({trip:tid,cat:cat,label:notifLabel(cat,rec),item:rec,oldWho:oldWho,newWho:rec.who,actor:S.persona,optIn:S._notify});
}
/* offer to notify when a Need-to-Buy item is marked bought. Recipients = the
   people it's for, plus the list owner, minus whoever ticked it. Always offers
   the picker (the point is the opportunity); private items never notify. */
function notifyBought(owner,it){
  if(!it||it.priv)return;
  var actor=S.persona,tid=S.tripId,who=pname(actor),label=it.n,recips=[];
  /* pre-select the people it's for, plus the owner (minus whoever ticked it) */
  ((it.who&&it.who.length)?it.who:[]).forEach(function(id){if(id!==actor&&person(id)&&recips.indexOf(id)<0)recips.push(id);});
  if(owner!==actor&&person(owner)&&recips.indexOf(owner)<0)recips.push(owner);
  /* still open the picker even with no default recipients, as long as there's
     someone on the trip to tell — that's the whole point of the opportunity */
  var hasOthers=tripMembersFor(tid).some(function(id){return id!==actor&&person(id);});
  if(!hasOthers){bumpBell();return;}
  var ctx={actor:actor,trip:tid,cat:'Need to Buy',label:label,oldWho:it.who,newWho:it.who,bought:true};
  var plan={forced:[],optional:[]};
  recips.forEach(function(id){plan.optional.push({to:id,from:actor,trip:tid,cat:'Need to Buy',label:label,kind:'added',text:who+' bought “'+label+'”'});});
  openNotifConfirm(ctx,plan);
}
/* ── RSVP: one-tap "Count me in / Can't make it" on planned items ──────
   Declining removes you from the item's who; opting in adds you. Reuses the
   notification picker so the booker (and others on it) get a heads-up. */
function rsvpRecord(type,id){
  if(type==='dining'){var d=DINING.filter(function(x){return x.id===id;})[0];return d?{rec:d,cat:'Dining',save:function(){save('dtp_dining',DINING);}}:null;}
  if(type==='ll'){var l=LLS.filter(function(x){return x.id===id;})[0];return l?{rec:l,cat:'Lightning Lane',save:function(){save('dtp_lls',LLS);}}:null;}
  if(type==='show'){var s=SHOWS.filter(function(x){return x.id===id;})[0];return s?{rec:s,cat:'Show',save:function(){save('dtp_shows',SHOWS);}}:null;}
  if(type==='manual'){var pp=String(id).split('|'),dd=dayByDate(pp[0]),it=dd&&dd.itin&&dd.itin[parseInt(pp[1],10)];return it?{rec:it,cat:'Plan',save:function(){saveDays();}}:null;}
  return null;
}
/* Attendance: two mutually-exclusive buttons per item (Will attend / Won't
   attend), neither active by default. The choice is recorded in rec.rsvp
   {personaId:'in'|'out'} AND syncs who-it's-for: 'out' removes you, 'in' or
   cleared keeps you in. Own row at the bottom of each item. */
function rsvpRow(type,id){var b=rsvpBtn(type,id);return b?'<div class="rsvp-row">'+b+'</div>':'';}
function rsvpBtn(type,id){
  if(!id)return '';
  var info=rsvpRecord(type,id);if(!info)return '';
  var rec=info.rec,me=S.persona,rsvp=rec.rsvp||{},st=rsvp[me];
  var going=Object.keys(rsvp).filter(function(x){return rsvp[x]==='in'&&person(x);}).length;
  var h='<button class="rsvp-btn going'+(st==='in'?' on':'')+'" onclick="event.stopPropagation();rsvpSet(\''+type+'\',\''+id+'\',\'in\')">Will attend</button>';
  h+='<button class="rsvp-btn cant'+(st==='out'?' on':'')+'" onclick="event.stopPropagation();rsvpSet(\''+type+'\',\''+id+'\',\'out\')">Won\'t attend</button>';
  h+='<button class="rsvp-check" onclick="event.stopPropagation();openAttendance(\''+type+'\',\''+id+'\')">'+IC.users+(going?' '+going+' going':' Attendance')+'</button>';
  return h;
}
/* quick attendance popup — glance at who's confirmed / not / out while in the park */
function openAttendance(type,id){
  var info=rsvpRecord(type,id);if(!info)return;
  var rec=info.rec,tid=rec.trip||S.tripId,rsvp=rec.rsvp||{};
  var base=whoArrFor(rec.who==null?'all':rec.who,tid).slice();
  Object.keys(rsvp).forEach(function(pid){if(base.indexOf(pid)<0)base.push(pid);});
  var att=base.filter(function(pid){return person(pid);});
  function chip(pid,decl){var p=person(pid);return '<span class="att-chip'+(decl?' declined':'')+'"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'</span>';}
  function grp(label,ids,decl){return '<div class="att-grp"><div class="att-h">'+label+' · '+ids.length+'</div><div class="att-list">'+(ids.length?ids.map(function(x){return chip(x,decl);}).join(''):'<span class="att-none">—</span>')+'</div></div>';}
  var conf=att.filter(function(pid){return rsvp[pid]==='in';});
  var pend=att.filter(function(pid){return rsvp[pid]==null;});
  var decl=att.filter(function(pid){return rsvp[pid]==='out';});
  var h='<div class="pin-backdrop" onclick="if(event.target===this)closeAttendance()"><div class="pin-modal" style="max-width:340px;text-align:left">';
  h+='<div class="pin-title">Attendance</div><div class="pin-sub">'+esc(notifLabel(info.cat,rec))+'</div>';
  h+=grp('Will attend',conf,false)+grp('Not confirmed',pend,false)+grp('Won\'t attend',decl,true);
  h+='<button class="btn-secondary" style="margin:14px 0 0;width:100%" onclick="closeAttendance()">Close</button>';
  h+='</div></div>';
  var host=document.getElementById('att-host');if(!host){host=document.createElement('div');host.id='att-host';document.body.appendChild(host);}
  host.innerHTML=h;
}
function closeAttendance(){var h=document.getElementById('att-host');if(h)h.innerHTML='';}
function rsvpSet(type,id,val){
  var info=rsvpRecord(type,id);if(!info)return;
  var rec=info.rec,me=S.persona,tid=rec.trip||S.tripId;
  rec.rsvp=rec.rsvp||{};
  var now; if(rec.rsvp[me]===val){delete rec.rsvp[me];now=null;}else{rec.rsvp[me]=val;now=val;}
  /* a show is "Attending" (on the day plan) while anyone is in; once no one is
     attending it falls back to "Scheduled". */
  if(type==='show'){
    var ins=Object.keys(rec.rsvp).filter(function(x){return rec.rsvp[x]==='in'&&person(x);}).length;
    rec.status=ins>0?'attend':'scheduled';
  }
  /* sync who-it's-for: 'out' removes me; 'in' or cleared ensures I'm included */
  var arr=whoArrFor(rec.who==null?'all':rec.who,tid).slice();
  if(now==='out')arr=arr.filter(function(x){return x!==me;});
  else if(arr.indexOf(me)<0)arr.push(me);
  rec.who=collapseWho(arr);
  if(!Object.keys(rec.rsvp).length)delete rec.rsvp;
  info.save();
  if(now)notifyRsvp(rec,info.cat,now==='in');
  toast(now==='in'?'Marked: will attend':now==='out'?"Marked: won't attend":'Cleared your RSVP');
  render();
}
/* attendance breakdown for an item's edit form — Will attend vs Not confirmed.
   Audience = who-it's-for plus anyone who explicitly responded (so declines,
   who were removed from who, still appear). */
function rsvpFormSection(rec){
  if(!rec)return '';
  var tid=rec.trip||S.tripId,rsvp=rec.rsvp||{};
  var base=whoArrFor(rec.who==null?'all':rec.who,tid).slice();
  Object.keys(rsvp).forEach(function(id){if(base.indexOf(id)<0)base.push(id);});
  var att=base.filter(function(id){return person(id);});
  if(!att.length)return '';
  function chip(id,decl){var p=person(id);return '<span class="att-chip'+(decl?' declined':'')+'"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'</span>';}
  function grp(label,ids,isDecl){return '<div class="att-grp"><div class="att-h">'+label+' · '+ids.length+'</div><div class="att-list">'+(ids.length?ids.map(function(id){return chip(id,isDecl);}).join(''):'<span class="att-none">—</span>')+'</div></div>';}
  var conf=att.filter(function(id){return rsvp[id]==='in';});
  var pend=att.filter(function(id){return rsvp[id]==null;});
  var decl=att.filter(function(id){return rsvp[id]==='out';});
  var h='<div class="field"><label class="field-label">Attendance <span class="opt">(separate from who it\'s for · set from the agenda)</span></label>';
  h+=grp('Will attend',conf,false)+grp('Not confirmed',pend,false)+grp('Won\'t attend',decl,true);
  return h+'</div>';
}
function notifyRsvp(rec,cat,joined){
  var actor=S.persona,tid=rec.trip||S.tripId,who=pname(actor),label=notifLabel(cat,rec);
  var creator=creatorOf(rec,tid);
  var txt=who+(joined?' is in for ':' can\'t make ')+'“'+label+'”';
  var plan={forced:[],optional:[]};
  /* Action items (Dining, Lightning Lane, Park reservation) NEED the booker to
     know — a real reservation may have to change. Force it (locked, sent even on
     Skip), matching the form-edit behaviour in buildNotifPlan. */
  if(isActionCat(cat)&&creator&&creator!==actor&&person(creator)){
    plan.forced.push({to:creator,from:actor,trip:tid,cat:cat,label:label,kind:joined?'action':'left',
      text:who+(joined?' is now attending ':' can\'t make ')+'“'+label+'” — you may need to update the booking'});
  }
  /* optional heads-up to others on it (booker too, if it isn't an action item) */
  var recips=[];
  if(!isActionCat(cat)&&creator&&creator!==actor&&person(creator))recips.push(creator);
  whoArrFor(rec.who,tid).forEach(function(id){if(id!==actor&&person(id)&&recips.indexOf(id)<0)recips.push(id);});
  recips.forEach(function(id){plan.optional.push({to:id,from:actor,trip:tid,cat:cat,label:label,kind:joined?'added':'removed',text:txt});});
  if(!plan.forced.length&&!plan.optional.length){bumpBell();return;}
  var ctx={actor:actor,trip:tid,cat:cat,label:label,oldWho:rec.who,newWho:rec.who,rsvp:joined?'in':'out'};
  openNotifConfirm(ctx,plan);
}

/* queries — all scoped to the current trip */
function flightsFor(date){return FLIGHTS.filter(function(f){return f.trip===S.tripId&&f.day===date;});}
var MEAL_ORDER={breakfast:0,brunch:1,lunch:2,snack:3,dinner:4,dessert:5,drinks:6};
function mealRank(m){var r=MEAL_ORDER[(m||'').toLowerCase()];return r==null?5:r;}
function diningFor(date){
  return DINING.filter(function(d){return d.trip===S.tripId&&d.day===date;})
    .sort(function(a,b){
      var ta=mins(a.time),tb=mins(b.time);
      if(ta!==tb)return ta-tb;                 /* earliest time first */
      return mealRank(a.meal)-mealRank(b.meal);/* tie / no time → breakfast·lunch·dinner */
    });
}
function llFor(date){return LLS.filter(function(l){return l.trip===S.tripId&&l.day===date;});}
function showsFor(date){return SHOWS.filter(function(s){return s.trip===S.tripId&&s.day===date;});}
/* map well-known WDW nighttime shows / parades → their park, by name */
var SHOW_PARK_RULES=[
  {p:'mk',re:/happily ever after|disney enchantment|\bwishes\b|festival of fantasy|electrical parade|disney starlight|\bstarlight\b|once upon a time|celebrate the magic|magic kingdom/},
  {p:'ep',re:/luminous|harmonious|epcot forever|illuminations|reflections of earth|\bepcot\b/},
  {p:'hs',re:/fantasmic|movie magic|galactic spectacular|star wars|wonderful world of animation|\banimation\b|sunset showcase|hollywood studios/},
  {p:'ak',re:/rivers of light|tree of life|awakening|kite tails|discovery island|animal kingdom/}
];
function parkForShowName(nm){var s=(nm||'').toLowerCase();for(var i=0;i<SHOW_PARK_RULES.length;i++)if(SHOW_PARK_RULES[i].re.test(s))return SHOW_PARK_RULES[i].p;return '';}
/* one-tap: tag every show in the active trip to its park by recognizing the
   name. Idempotent; only changes shows whose park is wrong/missing. */
function autoAssignShowParks(){
  if(!isAdmin()&&!(window.CLOUD&&window.CLOUD.isSuper)){toast('Admin only');return;}
  var n=0,unmatched=0;
  SHOWS.forEach(function(s){
    if(s.trip!==S.tripId)return;
    var pk=parkForShowName(s.name);
    if(pk){if(s.park!==pk){s.park=pk;n++;}}
    else if(!s.park)unmatched++;
  });
  if(n)save('dtp_shows',SHOWS);
  toast((n?('Tagged '+n+' show'+(n===1?'':'s')):'No changes')+(unmatched?(' · '+unmatched+' unrecognized — set manually'):''));
  if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();else render();
}
function resortsFor(date){return RESORTS.filter(function(r){return r.trip===S.tripId&&date>=r.checkin&&date<=r.checkout;});}
function parkResFor(date){return PARKRES.filter(function(p){return p.trip===S.tripId&&p.day===date;});}
function rebooksFor(date){return REBOOKS.filter(function(r){return r.trip===S.tripId&&r.day===date;});}
/* parse a loose time string ("5:45 AM", "Evening", "Afternoon") to minutes for sorting */
function mins(t){
  if(!t)return 99999;var s=String(t);
  var m=s.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if(m){var h=+m[1],mm=+m[2],ap=(m[3]||'').toUpperCase();if(ap==='PM'&&h!==12)h+=12;if(ap==='AM'&&h===12)h=0;return h*60+mm;}
  m=s.match(/(\d{1,2})\s*(AM|PM)/i);
  if(m){var h2=+m[1],ap2=m[2].toUpperCase();if(ap2==='PM'&&h2!==12)h2+=12;if(ap2==='AM'&&h2===12)h2=0;return h2*60;}
  var l=s.toLowerCase();
  if(l.indexOf('morning')>=0)return 8*60;
  if(l.indexOf('noon')>=0||l.indexOf('midday')>=0)return 12*60;
  if(l.indexOf('afternoon')>=0)return 14*60;
  if(l.indexOf('evening')>=0)return 19*60;
  if(l.indexOf('night')>=0||l.indexOf('late')>=0)return 21*60;
  return 99999;
}

/* ── Actions ───────────────────────────────────────────────── */
function go(tab){S.tab=tab;closeSheet();render();}
function selDay(i){S.dayIdx=i;S.open=defOpen();render();}
function toggleCard(k){S.open[k]=!S.open[k];render();}
function setPlan(p){S.plan=p;render();}
function toast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('in');clearTimeout(window._tt);window._tt=setTimeout(function(){t.classList.remove('in');},1900);}
/* unregister the service worker + drop caches, then reload — escapes a stale cache */
/* full device wipe — kept available (callable, e.g. from the console) but
   intentionally NOT surfaced anywhere in the UI. */
function resetLocalData(){
  if(confirm('Reset all saved data on this device? This wipes everything and starts fresh.')){
    try{localStorage.clear();}catch(e){}location.reload();
  }
}
function forceUpdate(){
  toast('Clearing cache…');
  var go=function(){
    window.location.href=window.location.pathname+'?_bust='+Date.now();
  };
  try{
    var jobs=[];
    if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations){
      jobs.push(navigator.serviceWorker.getRegistrations().then(function(rs){
        return Promise.all(rs.map(function(r){return r.unregister();}));
      }));
    }
    if(window.caches&&caches.keys){
      jobs.push(caches.keys().then(function(ks){
        return Promise.all(ks.map(function(k){return caches.delete(k);}));
      }));
    }
    Promise.all(jobs).then(function(){
      setTimeout(go,300);
    },function(){
      setTimeout(go,300);
    });
  }catch(e){setTimeout(go,300);}
}

/* re-render whatever surface the filter affects */
function applyFilterChange(){
  if(S.screen&&(S.screen.type==='lists'||S.screen.type==='packlist'))refreshLists();
  else if(S.screen&&S.screen.type==='todolist')refreshTodo();
  else if(S.screen&&S.screen.type==='section')renderScreen_inplace2();
  else render();
}
/* primary filter: Mine / Everyone / Not mine — clears any specific-person pick */
function setFilterMode(m){S.fmode=m;S.filter.clear();applyFilterChange();}
/* rare: pick specific people. A non-empty set overrides the primary mode. */
function togglePersonFilter(id){
  if(S.filter.has(id))S.filter.delete(id);else S.filter.add(id);
  var host=document.getElementById('sheet-host');
  if(host&&S.sheet){host.innerHTML=renderSheet();var b=host.firstChild;if(b)b.classList.add('in');}
  applyFilterChange();
}
function clearPersonFilter(){S.filter.clear();applyFilterChange();
  var host=document.getElementById('sheet-host');
  if(host&&S.sheet){host.innerHTML=renderSheet();var b=host.firstChild;if(b)b.classList.add('in');}
}
/* keep toggleFilter as a thin alias (legacy callers) */
function toggleFilter(id){if(id==="all")setFilterMode('all');else togglePersonFilter(id);}

/* sheets */
function openSheet(def){S.sheet=def;renderOverlay();requestAnimationFrame(function(){var b=document.getElementById('sheet-host').firstChild;if(b)b.classList.add('in');});}
/* only tears down the sheet — must NOT re-render screen-host, or a screen
   opened right after (e.g. New trip) loses its slide-in and flies off */
function closeSheet(){var host=document.getElementById('sheet-host');var b=host&&host.firstChild;if(b){b.classList.remove('in');setTimeout(function(){S.sheet=null;var hh=document.getElementById('sheet-host');if(hh)hh.innerHTML='';},240);}else{S.sheet=null;var h2=document.getElementById('sheet-host');if(h2)h2.innerHTML='';}}
function switchTrip(id){saveLists();S.tripId=id;saveTripId();var _st=tripById(id);if(_st&&_st.parties&&_st.parties[0]&&partyById(_st.parties[0])){S.partyId=_st.parties[0];savePartyId();}loadLists();S.dayIdx=0;S.tab="home";S.open=defOpen();S.fmode='all';S.filter.clear();closeSheet();toast("Switched to "+trip().name);render();}

/* screens (slide-in) */
function openScreen(def){
  S.screen=def;S._who=null;S._formStatus={};S._delpk=null;S._deltd=null;S.tdForm=null;S.tdScope='mine';S._tdPriv=false;S.listWho=null;S.pkStoreFilter=null;S.ttForm=null;S._ttPriv=false;S.ptForm=null;S._ptStore='bag';S._ptPriv=false;
  S.pkForm=null;S.pkScope='mine';S._delsect=null;S._pksect=null;ADD.psect=null;
  S._formLoc=null;S._formTier=null;S._formInit=null;S._formColor=null;
  S._notify=notifDefault();
  if(def.type==='newtrip'){S._notify=true;S._formInit=null;S._ntStep=null;S._ntPartyId=null;S._ntWhoMode=null;S._ntProvParty=null;S._ntTripId=null;S._ntFirstRun=false;S._ntPeople=null;S._ntInvite=null;S._ntPeopleCount=1;S._ntExpandedParty=null;S._ntTripName=null;S._ntGname=null;S._ntStart=null;S._ntEnd=null;S._ntCalYear=null;S._ntCalMonth=null;}
  else if(def.type==='tripedit'){var _et=tripById(def.tripId);S._notify=!!(_et&&_et.notifyByDefault);}
  if(def.type==='addflight'){S.formLegs=def.edit?((FLIGHTS.filter(function(f){return f.id===def.edit;})[0]||{legs:[0]}).legs.length):1;}
  else{S.formLegs=1;}
  if(def.type==='import'||def.type==='csvimport'){S.importStep=1;S._importItems=null;S._importCount=0;S._importEdit=null;}
  renderOverlay();requestAnimationFrame(function(){var s=document.getElementById('screen-host').firstChild;if(s)s.classList.add('in');});
}
function closeScreen(){var host=document.getElementById('screen-host');var s=host&&host.firstChild;if(s){s.classList.remove('in');setTimeout(function(){S.screen=null;renderOverlay();},260);}else{S.screen=null;renderOverlay();}}

/* PIN entry — custom modal so we get a numeric keypad + auto-focused cursor
   (the native prompt() can\'t do either). Async: calls cb(value) or cb(null). */
function askPin(opts,cb){
  opts=opts||{};
  /* test hook: synchronous answer when running headless */
  if(typeof window!=='undefined'&&typeof window.askPinSync==='function'){cb(window.askPinSync(opts));return;}
  var host=document.getElementById('pin-host');
  if(!host){host=document.createElement('div');host.id='pin-host';document.body.appendChild(host);}
  window._pinDone=function(val){host.innerHTML='';window._pinDone=null;cb(val);};
  var h='<div class="pin-backdrop" onclick="if(event.target===this)_pinDone(null)"><div class="pin-modal">';
  h+='<div class="pin-title">'+esc(opts.title||'Enter PIN')+'</div>';
  if(opts.sub)h+='<div class="pin-sub">'+esc(opts.sub)+'</div>';
  h+='<input id="pin-input" class="pin-input" type="password" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="12" autofocus '
    +'onkeydown="if(event.key===\'Enter\')_pinSubmit()">';
  h+='<div class="pin-actions">';
  h+='<button class="pin-btn" onclick="_pinDone(null)">Cancel</button>';
  h+='<button class="pin-btn primary" onclick="_pinSubmit()">'+esc(opts.confirmLabel||'OK')+'</button>';
  h+='</div></div></div>';
  host.innerHTML=h;
  /* focus synchronously inside the tap gesture so mobile pops the keyboard */
  var inp=document.getElementById('pin-input');if(inp)inp.focus();
}
function _pinSubmit(){var inp=document.getElementById('pin-input');var v=inp?inp.value:'';if(window._pinDone)window._pinDone(v);}

/* persona — local picker (offline / no-cloud fallback). No PINs: who you are
   is just personalization on this device, or your claimed cloud identity. */
function setPersona(id){
  var p=person(id);if(!p){closeScreen();return;}
  finishLogin(id);
}
function finishLogin(id){
  var p=person(id);if(!p)return;
  S.persona=id;save('dtp_persona',id);ensureActiveParty();savePartyId();ensureVisibleTrip();saveTripId();S.tab='home';toast("You are "+p.name);render();closeScreen();
}

/* ── single sign-on via the cloud ──────────────────────────
   When a cloud user is signed in, the person they ARE is whichever persona
   carries their uid. First time, they claim one; after that it\'s automatic
   on every device. No PINs anywhere. */
function cloudUid(){return (window.CLOUD&&window.CLOUD.user)?window.CLOUD.user.uid:null;}
function personaForUid(uid){if(!uid)return null;for(var i=0;i<FAMILY.length;i++)if(FAMILY[i].uid===uid)return FAMILY[i];return null;}
function pendingInvite(){
  if(S._invite)return S._invite;
  try{var s=localStorage.getItem('dtp_invite');if(s)return JSON.parse(s);}catch(e){}
  return null;
}
function clearInvite(){S._invite=null;try{localStorage.removeItem('dtp_invite');}catch(e){}}
/* a persona pre-tagged with the email you signed in with (and not already
   linked to someone else) — lets sign-in match a person with no picking */
function emailPersona(email){
  if(!email)return null;email=String(email).toLowerCase();
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];
    if(p.email&&String(p.email).toLowerCase()===email&&(!p.uid||p.uid===cloudUid()))return p;}
  return null;
}
/* called by cloud.js once sign-in + data sync have completed.
   The goal: you just sign in. We figure out who you are with no screen when we can. */
function onCloudSynced(){
  var uid=cloudUid();if(!uid)return;
  var i;
  /* 0. enforce authorization on EVERY sign-in. If we definitively know this
     account is no longer authorized (not super, not on the allowlist, not a
     current workspace member) — and they aren't mid-invite — lock them out,
     even if a linked persona is cached locally. Only act when the access reads
     actually completed (authUncertain=false); a blocked/offline read must not
     wrongly evict a legit user, and the server-side Firestore rules still gate
     all shared data regardless. */
  if(window.CLOUD&&!window.CLOUD.authUncertain&&window.CLOUD.authorized&&!window.CLOUD.authorized()){
    var inv0=pendingInvite();
    /* A pending invite CODE falls through to the code path (step 3). Otherwise
       this account isn't authorized yet — but an owner may have added our email
       to their group. Check the server invite index and, if found, auto-join
       that workspace and become the matching person. Only revoke if there's no
       invite. (We must NOT trust the local family copy here: it may be this
       account's own stale data from an earlier session, which is exactly how a
       guest used to end up on "The Mills Family" with admin nav and no trips.) */
    if(!(inv0&&inv0.code)){ tryEmailInvite(uid); return; }
  }
  /* keep the email→workspace index current so future members can auto-join */
  publishAllInvites();
  /* An authorized user can be invited to additional tenants (someone added their
     email to a different group). Silently add the new tenant to their list — DO
     NOT switch active, so they don't get bounced out of whatever they're
     currently looking at. The new tenant shows up in the Account → Your groups
     switcher; a toast hints at it. */
  if(window.CLOUD&&window.CLOUD.autoJoinPendingInvite&&window.CLOUD.authorized&&window.CLOUD.authorized()){
    window.CLOUD.autoJoinPendingInvite().then(function(r){
      if(r&&r.result==='joined'){
        toast('Added to '+(r.count===1?'a new tenant':r.count+' new tenants')+' — switch in Account.');
        if(S.screen&&S.screen.type==='persona'&&typeof renderScreen_inplace2==='function')renderScreen_inplace2();
      }
    });
  }
  /* 1. already linked → straight in */
  var mine=personaForUid(uid);
  if(mine){
    S.persona=mine.id;save('dtp_persona',mine.id);S._seated=true;
    ensureActiveParty();ensureVisibleTrip();
    /* An authorized owner with a linked persona but NO cloud workspace (e.g.
       their tenant was deleted, or they were just re-added to the allowlist)
       must be guided to choose or create a group — otherwise they land on Home
       with no tenant and nothing ever prompts them to make one. Not auto-create:
       the wizard makes them pick/create. Owners only (super is exempt; guests
       and owners who already have a workspace have inParty()===true). */
    if(window.CLOUD&&window.CLOUD.isOwner&&!window.CLOUD.isSuper&&
       window.CLOUD.inParty&&!window.CLOUD.inParty()){
      /* Clean slate: clear any leftover local groups/trips (e.g. a legacy
         "My Group" auto-seeded by older builds, or orphaned data from a deleted
         tenant) so the owner truly starts fresh and only gets a group when they
         create one — which creates the cloud tenant. */
      S._freshTenant=true;
      resetToBlank();
      openScreen({type:'newtrip'});return;
    }
    if(S.screen&&(S.screen.type==='signin'||S.screen.type==='claim'||S.screen.type==='authwait'))closeScreen();
    render();return;
  }
  /* 2. your email matches a person the admin set up → link automatically */
  var byEmail=emailPersona(window.CLOUD.user&&window.CLOUD.user.email);
  if(byEmail){claimPersona(byEmail.id);return;}
  /* 3. you opened a personal invite link → join, then match by email or name */
  var inv=pendingInvite();
  if(inv&&inv.code){
    clearInvite();
    window.CLOUD.joinParty(inv.code).then(function(){
      if(personaForUid(uid)){onCloudSynced();return;}                 /* claimed before */
      var be=emailPersona(window.CLOUD.user&&window.CLOUD.user.email);
      if(be){claimPersona(be.id);return;}                             /* email match */
      if(inv.as&&person(inv.as)){claimPersona(inv.as);return;}        /* invited person */
      openScreen({type:'claim'});                                     /* fall back to pick */
    }).catch(function(e){toast(e.message||'Invite failed');openScreen({type:'claim'});});
    return;
  }
  /* 4. not linked / matched / invited → access depends on authorization */
  if(window.CLOUD.isSuper||window.CLOUD.isOwner){
    /* "real data" = a person linked to an account (uid) or carrying an email.
       The demo seed (data.js) has neither on ANY person — and its demo TRIPS
       must NOT count toward this, or a fresh owner who merged the seed would
       look like an established account and get the claim screen full of demo
       names instead of the setup wizard. */
    var hasRealData=FAMILY.some(function(p){return !!(p.uid||p.email);});
    if(!hasRealData&&!window.CLOUD.isSuper){
      /* Fresh authorized owner sitting on the unclaimed demo seed (possibly
         still attached to a stale workspace from earlier testing). Detach from
         that workspace in the cloud profile so it can't return on the next
         sign-in, wipe the local demo seed, and start them in the setup wizard.
         Only do the destructive reset once we have a reliable cloud read. */
      var toWizard=function(){ S._freshTenant=true; resetToBlank(); openScreen({type:'newtrip'}); };
      if(window.CLOUD.synced&&window.CLOUD.startFresh)
        window.CLOUD.startFresh().then(toWizard,toWizard);
      else
        toWizard();
    }else if(window.CLOUD.inParty&&window.CLOUD.inParty()){
      openScreen({type:'claim'});      /* returning owner whose seat isn\'t linked → pick */
    }else{
      openScreen({type:'newtrip'});    /* authorized owner, no active party → guided setup */
    }
  }else{
    openScreen({type:'noaccess'});     /* not on the guest list */
  }
}
/* an unauthorized account just signed in: see if an owner added our email to
   their group. Look up the server invite index; if found, join that workspace
   (which ADOPTS the owner's live family/trips, replacing any stale local data)
   and become the matching person. Otherwise show the no-access gate. */
function tryEmailInvite(uid){
  if(!(window.CLOUD&&window.CLOUD.findInvite)){revokeAccess();return;}
  window.CLOUD.findInvite().then(function(inv){
    if(!inv||!inv.wid){revokeAccess();return;}
    window.CLOUD.joinParty(inv.wid).then(function(){
      /* joined → owner's data is now local. Claim the persona they set up. */
      if(inv.persona&&person(inv.persona)){claimPersona(inv.persona);return;}
      var be=emailPersona(window.CLOUD.user&&window.CLOUD.user.email);
      if(be){claimPersona(be.id);return;}
      openScreen({type:'claim'});            /* joined but no match → pick a seat */
    }).catch(function(){revokeAccess();});
  }).catch(function(){revokeAccess();});
}
/* publish an email→workspace invite for every family member who has an email,
   so people added before this feature (or while offline) still get indexed.
   No-op unless we're the owner of an actual cloud workspace. */
function publishAllInvites(){
  if(!(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.inParty&&window.CLOUD.inParty()&&window.CLOUD.publishInvite))return;
  if(!(window.CLOUD.isSuper||window.CLOUD.isOwner))return;
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];if(p.email)window.CLOUD.publishInvite(p.email,p.id);}
}
/* keep one person's invite index entry in step with their email on save */
function syncPersonInvite(p,oldEmail){
  if(!p||!(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.inParty&&window.CLOUD.inParty()))return;
  if(!(window.CLOUD.isSuper||window.CLOUD.isOwner))return;
  var ne=(p.email||'').trim().toLowerCase(), oe=(oldEmail||'').trim().toLowerCase();
  if(oe&&oe!==ne&&window.CLOUD.revokeInvite)window.CLOUD.revokeInvite(oe);
  if(ne&&window.CLOUD.publishInvite)window.CLOUD.publishInvite(ne,p.id);
}
/* access was revoked (removed from the allowlist / tenant deleted): drop the
   local persona link and show the hard No-Access gate. Their own cached data
   stays on their device (local-first), but the gate blocks normal use and the
   server rules block all shared data. They can sign out from the gate. */
function revokeAccess(){
  try{localStorage.removeItem('dtp_persona');}catch(e){}
  S.persona=null;S._seated=false;
  openScreen({type:'noaccess'});
}
/* called by cloud.js when there\'s no signed-in cloud user */
function onCloudSignedOut(){
  try{localStorage.removeItem('dtp_persona');}catch(e){}
  S._seated=false;
  openScreen({type:'signin'});   /* the gate covers the app until they sign in again */
}
/* bind the signed-in cloud account to a chosen persona */
function claimPersona(id){
  var p=person(id);if(!p)return;
  var uid=cloudUid();
  if(!uid){toast('Sign in first');return;}
  /* no stealing: a seat already linked to a different account is off-limits */
  if(p.uid&&p.uid!==uid){toast(p.name+' is already taken — an admin can unlink it first');return;}
  /* no self-promotion: you can\'t grab an admin seat unless you\'re already an
     admin or no admin has been set up yet (the very first owner) */
  var adminExists=FAMILY.some(function(x){return x.admin&&x.uid&&x.uid!==uid;});
  if(p.admin&&adminExists&&!isAdmin()){toast('Only an admin can take an admin seat');return;}
  var prev=personaForUid(uid);if(prev&&prev.id!==id)prev.uid=null;   /* one persona per account */
  p.uid=uid;
  if(window.CLOUD&&window.CLOUD.user&&window.CLOUD.user.email&&!p.email)p.email=window.CLOUD.user.email;
  save('dtp_family',FAMILY);
  S.persona=id;save('dtp_persona',id);S._seated=true;
  ensureActiveParty();ensureVisibleTrip();
  closeScreen();
  /* if you brought your own data and aren\'t sharing yet, spin up a party so
     you get a code to invite others — no separate "create" step needed */
  if(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user&&window.CLOUD.inParty&&!window.CLOUD.inParty()){
    window.CLOUD.createParty('My Group').then(function(){publishAllInvites();toast('You are '+p.name);render();}).catch(function(){toast('You are '+p.name);render();});
  }else{
    toast('You are '+p.name);render();
  }
}
/* admin: free a persona so a different account can claim it */
function unclaimPersona(id){
  var p=person(id);if(!p)return;
  if(!confirm('Unlink '+p.name+' from their sign-in? They\'ll claim it again next time they sign in.'))return;
  p.uid=null;save('dtp_family',FAMILY);toast(p.name+' unlinked');renderScreen_inplace2();
}
/* sign out — cloud sign-out when available, else just forget the local persona */
function logoutPersona(){
  try{if(window.CLOUD&&window.CLOUD.adminWid){localStorage.removeItem('dtp_adminWid');}}catch(e){}   /* never sign out stranded in someone else\'s space */
  if(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user){
    window.CLOUD.signOut();   /* triggers onCloudSignedOut → sign-in screen */
    return;
  }
  try{localStorage.removeItem('dtp_persona');}catch(e){}
  S.screen={type:'persona'};renderOverlay();
  requestAnimationFrame(function(){var s=document.getElementById('screen-host').firstChild;if(s)s.classList.add('in');});
}

/* packing / todo */
function pkPersons(){
  var mem=tripMembers();
  if(S.filter&&S.filter.size)return mem.filter(function(id){return S.filter.has(id);});
  var mode=S.fmode||'all';
  if(mode==='mine')return mem.filter(function(id){return id===S.persona;});
  if(mode==='notme')return mem.filter(function(id){return id!==S.persona;});
  return mem.slice();
}
function refreshLists(){
  var b=document.getElementById('lists-body');
  if(b&&S.screen&&(S.screen.type==='packlist'||S.screen.type==='lists')){
    /* preserve scroll: replacing the list HTML otherwise jumps you elsewhere
       (e.g. editing/saving a packing item) */
    var sc=b.closest?b.closest('.screen-body'):null,top=sc?sc.scrollTop:0;
    b.innerHTML=(S.screen.type==='packlist')?packingBody():listScreenBody('packing');
    if(sc)sc.scrollTop=top;
    return;
  }
  render();
}
var ADD={};
/* who may manage a person\'s packing list / its sections: the owner or oversight */
function pkCanList(pid){return pid===S.persona||listOversight();}
/* who may change a single item: list manager, or whoever added it */
function pkCanItem(pid,it){return pkCanList(pid)||(it&&it.by===S.persona);}
function savePK(){saveLists();}
function pkChk(pid,c,i){var it=PACKING[pid][c].items[i];if(!pkCanItem(pid,it)){toast('Only the owner or an admin can change this');return;}it.done=!it.done;savePK();refreshLists();}
function pkInc(pid,c,i){var it=PACKING[pid][c].items[i];if(!pkCanItem(pid,it))return;it.qty=(it.qty||0)+1;savePK();refreshLists();}
function pkDec(pid,c,i){var it=PACKING[pid][c].items[i];if(!pkCanItem(pid,it))return;if(it.qty>0)it.qty--;savePK();refreshLists();}
function pkDel(pid,c,i){var it=PACKING[pid][c].items[i];if(!pkCanItem(pid,it)){toast('Only the owner or an admin can delete this');return;}var k='d_'+pid+'_'+c+'_'+i;if(S._delpk===k){PACKING[pid][c].items.splice(i,1);S._delpk=null;savePK();}else{S._delpk=k;}refreshLists();}
function pkDelCancel(){S._delpk=null;refreshLists();}
function pkAdd(pid,c){if(!pkCanList(pid)){toast('Only the owner or an admin can add here');return;}ADD.pk=pid+'_'+c;refreshLists();setTimeout(function(){var e=document.getElementById('pk-inp');if(e)e.focus();},40);}
function pkOk(pid,c){var e=document.getElementById('pk-inp');if(!e||!e.value.trim())return;var it={n:e.value.trim(),qty:1,l:false,done:false,needBuy:false,who:[]};if(pid!==S.persona)it.by=S.persona;PACKING[pid][c].items.push(it);ADD.pk=null;savePK();refreshLists();}
function pkCancel(){ADD.pk=null;refreshLists();}
/* sections (per person, editable) */
function pkSectAdd(pid){if(!pkCanList(pid)){toast('Only the owner or an admin can add sections');return;}ADD.psect=pid;refreshLists();setTimeout(function(){var e=document.getElementById('psect-inp');if(e)e.focus();},40);}
function pkSectOk(pid){var e=document.getElementById('psect-inp');if(!e||!e.value.trim())return;if(!PACKING[pid])PACKING[pid]=[];PACKING[pid].push({cat:e.value.trim(),items:[]});ADD.psect=null;savePK();refreshLists();}
function pkSectCancel(){ADD.psect=null;refreshLists();}
function pkSectRenameOpen(pid,c){if(!pkCanList(pid)){toast('Only the owner or an admin can rename');return;}S._pksect=pid+'|'+c;S._delsect=null;refreshLists();setTimeout(function(){var e=document.getElementById('psname-inp');if(e)e.focus();},40);}
function pkSectRenameOk(pid,c){var e=document.getElementById('psname-inp');if(e&&e.value.trim())PACKING[pid][c].cat=e.value.trim();S._pksect=null;savePK();refreshLists();}
function pkSectRenameCancel(){S._pksect=null;S._delsect=null;refreshLists();}
function pkSectDel(pid,c){if(!pkCanList(pid))return;var k='ds_'+pid+'_'+c;if(S._delsect===k){PACKING[pid].splice(c,1);S._delsect=null;S._pksect=null;savePK();}else{S._delsect=k;}refreshLists();}
function pkSectDelCancel(){S._delsect=null;refreshLists();}
/* per-item editor (storage, need-to-buy, buyer assignment) */
function pkFormItem(){var f=S.pkForm;return f?(PACKING[f.pid]&&PACKING[f.pid][f.c]&&PACKING[f.pid][f.c].items[f.i]):null;}
function pkItemEdit(pid,c,i){var it=PACKING[pid][c].items[i];if(!pkCanItem(pid,it)){toast('Only the owner or an admin can edit this');return;}S.pkForm={pid:pid,c:c,i:i};S._who=new Set(it.who||[]);S._notify=notifDefault();refreshLists();}
function pkItemCancel(){S.pkForm=null;S._who=null;refreshLists();}
/* storage location of a packing item: 'bag' (suitcase) | 'person' | 'locker'.
   Backward compatible: legacy items only had l (true=locker). */
function pkStore(it){return (it&&it.store==='person')?'person':((it&&it.l)?'locker':'bag');}
function pkSetStore(v){var it=pkFormItem();if(!it)return;
  it.store=(v==='person')?'person':'';
  it.l=(v==='locker');
  if(v==='bag'){if(!it.qty)it.qty=1;}else{it.qty=0;}   /* carried items have no count */
  saveLists();renderScreen_inplace2();}
function pkFormStore(v){var it=pkFormItem();if(!it)return;it.l=v;if(v)it.qty=0;else if(!it.qty)it.qty=1;saveLists();renderScreen_inplace2();}
function pkFormNeed(v){var it=pkFormItem();if(!it)return;it.needBuy=v;saveLists();renderScreen_inplace2();}
function pkFormPriv(v){var it=pkFormItem();if(!it)return;it.priv=v;saveLists();renderScreen_inplace2();}
function pkItemSave(){var it=pkFormItem();if(!it){pkItemCancel();return;}var nm=val('pki-name');if(nm)it.n=nm;var oldWho=it.who||[];it.who=S._who?tripMembers().filter(function(id){return S._who.has(id);}):[];saveLists();afterWhoSave('Packing',it,oldWho);S.pkForm=null;S._who=null;toast('Saved');refreshLists();}
/* trip-wide Need to Buy (shared) */
/* shared shopping entries — private items only surface to their own owner */
function needBuyEntries(){
  var out=[];
  tripMembers().forEach(function(owner){(PACKING[owner]||[]).forEach(function(cat,ci){(cat.items||[]).forEach(function(it,ii){
    if(it.needBuy&&(!it.priv||owner===S.persona))out.push({owner:owner,ci:ci,ii:ii,it:it});
  });});});
  return out;
}
/* hub badge counts only OUTSTANDING (not-yet-bought) items */
function needBuyCount(){return needBuyEntries().filter(function(e){return !e.it.bought;}).length;}
/* mark bought / not bought — keeps the item on the list (struck through) instead
   of removing it, so the record of what's been purchased stays visible */
function pkGotIt(owner,ci,ii){var it=PACKING[owner]&&PACKING[owner][ci]&&PACKING[owner][ci].items[ii];if(!it)return;
  var buyers=(it.who&&it.who.length)?it.who:[owner];
  if(!(buyers.indexOf(S.persona)>=0||owner===S.persona||listOversight())){toast('Only the buyer, the owner or an admin can do this');return;}
  it.bought=!it.bought;saveLists();toast(it.bought?'Marked as bought':'Back on the list');
  if(S.screen&&S.screen.type==='needbuy')renderScreenHard();else render();
  if(it.bought)notifyBought(owner,it);
}
function nbHideDone(){try{return localStorage.getItem('bt_nbHideDone')==='1';}catch(e){return false;}}
function nbToggleHideDone(){try{localStorage.setItem('bt_nbHideDone',nbHideDone()?'0':'1');}catch(e){}renderScreenHard();}
function nbHideToggle(){return '<div style="display:flex;justify-content:flex-end;margin:-2px 2px 8px"><button class="lens-btn'+(nbHideDone()?' on':'')+'" onclick="nbToggleHideDone()">'+(nbHideDone()?'Show bought':'Hide bought')+'</button></div>';}
/* packing: per-trip per-person "has started" flag + template seeding */
function pkStartKey(){return 'dtp_packstart_'+S.tripId;}
function pkStartedSet(){return load(pkStartKey(),[]);}
function pkHasStarted(pid){pid=pid||S.persona;
  if(PACKING[pid]&&PACKING[pid].some(function(c){return c.items&&c.items.length;}))return true;
  return pkStartedSet().indexOf(pid)>=0;}
function pkMarkStarted(pid){pid=pid||S.persona;var s=pkStartedSet();if(s.indexOf(pid)<0){s.push(pid);save(pkStartKey(),s);}}
function pkStartFromTemplate(){
  var t=PACKING_TMPL[S.persona];
  PACKING[S.persona]=t?t.map(function(c){return {cat:c.cat,items:(c.items||[]).map(function(it){return {n:it.n,qty:it.qty,l:!!it.l,store:it.store||'',priv:!!it.priv,done:false,needBuy:false,who:[]};})};}):[];
  pkMarkStarted(S.persona);saveLists();toast(t&&t.length?'Loaded your template':'Your template is empty');refreshLists();
}
function pkStartEmpty(){if(!PACKING[S.persona])PACKING[S.persona]=[];pkMarkStarted(S.persona);refreshLists();}
function pkSaveAsTemplate(){
  PACKING_TMPL[S.persona]=(PACKING[S.persona]||[]).map(function(c){return {cat:c.cat,items:(c.items||[]).map(function(it){return {n:it.n,qty:it.qty,l:!!it.l,store:it.store||'',priv:!!it.priv};})};});
  savePackTmpl();toast('Saved as your global packing template');
}
/* ── To Do — assignable per-trip items ─────────────────────────
   Visibility: you see an item if you created it (`by`) or it\'s assigned
   to you (`who`). Creator + global admin may edit/delete; creator,
   assignee or admin may toggle done; an assignee may unassign themselves. */
/* who gets full list oversight: the global admin, or this trip\'s owner
   (they\'re organising the trip and keeping everyone on track) */
function listOversight(){return isAdmin()||isTripOwner();}
function todoOversight(){return listOversight();}
function tdById(id){for(var i=0;i<TODO.length;i++)if(TODO[i].id===id)return TODO[i];return null;}
function tdMine(pid){pid=pid||S.persona;return TODO.filter(function(t){return t.trip===S.tripId&&t.by===pid;});}
function tdAssignedTo(pid){pid=pid||S.persona;return TODO.filter(function(t){return t.trip===S.tripId&&t.by!==pid&&t.who&&t.who.indexOf(pid)>=0;});}
/* can the current persona see this item? creator + assignees always can;
   oversight sees everything except others' items marked private (hidden) */
function tdCanSee(t){
  if(t.by===S.persona)return true;
  if(t.who&&t.who.indexOf(S.persona)>=0)return true;
  return todoOversight()&&!t.priv;
}
function tdVisibleCount(pid){return TODO.filter(function(t){return t.trip===S.tripId&&tdCanSee(t);}).length;}
/* hide-completed preference — device-local (non-synced key) so it sticks per
   device without syncing a view setting across the group */
function tdHideDone(){try{return localStorage.getItem('bt_tdHideDone')==='1';}catch(e){return false;}}
function tdToggleHideDone(){try{localStorage.setItem('bt_tdHideDone',tdHideDone()?'0':'1');}catch(e){}refreshTodo();}
function tdNotDone(t){return !t.done;}
function todoHideToggle(anyDone){
  if(!anyDone)return '';
  return '<div style="display:flex;justify-content:flex-end;margin:-2px 2px 8px"><button class="lens-btn'+(tdHideDone()?' on':'')+'" onclick="tdToggleHideDone()">'+(tdHideDone()?'Show completed':'Hide completed')+'</button></div>';
}
/* shared person filter for the Everyone / Need-to-Buy views */
function setListWho(pid){
  S.listWho=(S.listWho===pid)?null:(pid||null);
  if(S.screen&&S.screen.type==='todolist')refreshTodo();
  else if(S.screen&&(S.screen.type==='packlist'||S.screen.type==='lists'))refreshLists();
  else renderScreen_inplace2();
}
function personFilterRow(members){
  if(!members||members.length<2)return '';
  var o='<div class="pfilter-row">';
  o+='<button class="pf-chip all'+(!S.listWho?' on':'')+'" onclick="setListWho(null)">Everyone</button>';
  for(var i=0;i<members.length;i++){var p=person(members[i]);if(!p)continue;
    o+='<button class="pf-chip'+(S.listWho===p.id?' on':'')+'" onclick="setListWho(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'</button>';
  }
  return o+'</div>';
}
function tdCanEdit(t){return !!t&&(t.by===S.persona||todoOversight());}
function tdCanCheck(t){return !!t&&(t.by===S.persona||todoOversight()||(t.who&&t.who.indexOf(S.persona)>=0));}
/* per-trip per-person "has started a list" flag (so we can offer template / blank) */
function tdStartKey(){return 'dtp_todostart_'+S.tripId;}
function tdStartedSet(){return load(tdStartKey(),[]);}
function tdHasStarted(pid){pid=pid||S.persona;
  if(tdMine(pid).length||tdAssignedTo(pid).length)return true;
  return tdStartedSet().indexOf(pid)>=0;}
function tdMarkStarted(pid){pid=pid||S.persona;var s=tdStartedSet();if(s.indexOf(pid)<0){s.push(pid);save(tdStartKey(),s);}}

function refreshTodo(){
  var b=document.getElementById('todo-body');
  if(b&&S.screen&&S.screen.type==='todolist'){
    var sc=b.closest?b.closest('.screen-body'):null,top=sc?sc.scrollTop:0;
    b.innerHTML=todoBody();
    if(sc)sc.scrollTop=top;   /* keep position so the accordion expand/collapse doesn't jump */
    return;
  }
  render();
}

function tdToggle(id){var t=tdById(id);if(!t)return;if(!tdCanCheck(t)){toast('Only the creator, an assignee or an admin can check this');return;}t.done=!t.done;saveTODO();refreshTodo();}
function tdAddOpen(){
  S.tdForm={id:null};S._who=new Set();S._tdPriv=false;S._notify=notifDefault();refreshTodo();
  /* the new-task editor renders at the BOTTOM of My to-dos — scroll to it + focus */
  setTimeout(function(){var e=document.getElementById('td-name');if(e){try{e.scrollIntoView({block:'center',behavior:'smooth'});}catch(_){e.scrollIntoView();}try{e.focus({preventScroll:true});}catch(_2){e.focus();}}},60);
}
function tdEdit(id){var t=tdById(id);if(!t)return;if(!tdCanEdit(t)){toast('Only the creator or an admin can edit this');return;}S.tdForm={id:id};S._who=new Set(t.who||[]);S._tdPriv=!!t.priv;S._notify=notifDefault();refreshTodo();}
function tdCancelForm(){S.tdForm=null;S._who=null;S._tdPriv=false;refreshTodo();}
function tdRemoveCancel(){S._deltd=null;refreshTodo();}
function tdFormPriv(v){S._tdPriv=v;renderScreen_inplace2();}
function tdSave(){
  var nm=val('td-name');if(!nm){toast('Add a task');return;}
  var f=S.tdForm;if(!f)return;
  var edit=f.id?tdById(f.id):null;
  if(edit&&!tdCanEdit(edit)){toast('Only the creator or an admin can edit this');S.tdForm=null;refreshTodo();return;}
  var creator=edit?edit.by:S.persona;
  var oldWho=edit?(edit.who||[]):[];
  var who=S._who?tripMembers().filter(function(id){return id!==creator&&S._who.has(id);}):[];
  var rec=edit||{id:'td'+Date.now(),trip:S.tripId,by:S.persona,done:false};
  rec.n=nm;rec.when=val('td-when');rec.who=who;rec.priv=!!S._tdPriv;
  if(!edit){TODO.push(rec);tdMarkStarted(S.persona);}
  saveTODO();afterWhoSave('To Do',rec,oldWho);S.tdForm=null;S._who=null;S._tdPriv=false;toast('Saved');refreshTodo();
}
function tdRemove(id){
  var t=tdById(id);if(!t)return;
  if(!tdCanEdit(t)){toast('Only the creator or an admin can delete this');return;}
  var k='tdrm_'+id;
  if(S._deltd===k){for(var i=0;i<TODO.length;i++)if(TODO[i].id===id){TODO.splice(i,1);break;}S._deltd=null;saveTODO();notifyDelete('To Do',t);}
  else{S._deltd=k;}
  refreshTodo();
}
function tdUnassignMe(id){var t=tdById(id);if(!t)return;t.who=(t.who||[]).filter(function(p){return p!==S.persona;});saveTODO();toast('Removed you from this');refreshTodo();}
function tdStartFromTemplate(){
  var tmpl=TODO_TMPL[S.persona]||[];
  for(var i=0;i<tmpl.length;i++)TODO.push({id:'td'+Date.now()+'_'+i,trip:S.tripId,by:S.persona,done:false,n:tmpl[i].n,when:tmpl[i].when||'',priv:!!tmpl[i].priv,who:[]});
  tdMarkStarted(S.persona);saveTODO();toast(tmpl.length?'Loaded your template':'Your template is empty');refreshTodo();
}
function tdStartEmpty(){tdMarkStarted(S.persona);refreshTodo();}
function tdSaveAsTemplate(){
  var mine=tdMine(S.persona);
  TODO_TMPL[S.persona]=mine.map(function(t){return {n:t.n,when:t.when||'',priv:!!t.priv};});
  saveTmpl();toast('Saved as your global template');
}

/* ============================================================
   HEADER + STRIP + FILTER
   ============================================================ */
function renderHeader(){
  var me=person(S.persona)||FAMILY[0];
  var h='<header class="hdr">';
  if(noTripSelected()){
    /* nothing selected — let them open the picker (or show "no trips" if they have none) */
    if(hasVisibleTrip()){
      h+='<button class="hdr-trip left" onclick="openSheet({type:\'trips\'})">';
      h+='<div class="hdr-trip-name">Select a trip '+IC.chevd+'</div></button>';
    }else{
      h+='<div class="hdr-trip left"><div class="hdr-trip-name" style="opacity:.55">No trips yet</div></div>';
    }
  }else{
    var t=trip();
    h+='<button class="hdr-trip left" onclick="openSheet({type:\'trips\'})">';
    h+='<div class="hdr-trip-name">'+esc(t.name)+' '+IC.chevd+'</div>';
    h+='<div class="hdr-trip-sub">'+esc(t.dates)+'</div></button>';
  }
  var nb=notifUnread();
  h+='<button class="hdr-bell" onclick="openScreen({type:\'notifs\'})" aria-label="Notifications">'+IC.bell+(nb?'<span class="bell-badge">'+(nb>9?'9+':nb)+'</span>':'')+'</button>';
  h+='<button class="hdr-iam" onclick="openScreen({type:\'persona\'})">';
  h+='<span class="iam-name"><span class="pdot" style="background:'+me.color+'">'+esc(me.name[0])+'</span>'+esc(me.name)+' '+IC.chevd+'</span>';
  h+='</button>';
  h+='</header>';
  return h;
}
function renderStrip(){
  if(S.tab!=='home')return '';
  var TD=tripDays();
  if(!TD.length) return '';
  var h='<div class="strip-wrap"><div class="strip">';
  for(var i=0;i<TD.length;i++){
    var d=TD[i],vs=visitsFor(d.date);
    var bar,code;
    if(vs.length){
      bar='<div class="p-bar">';for(var k=0;k<Math.min(vs.length,2);k++){var pp=PARKS[vs[k].park];bar+='<span style="background:'+(pp?pp.color:PARKS.trv.color)+'"></span>';}bar+='</div>';
      code=vs.slice(0,2).map(function(v){return PARKS[v.park]?PARKS[v.park].short:'?';}).join('/');
    }else{
      bar='<div class="p-bar"><span style="background:'+PARKS.trv.color+'"></span></div>';code='—';
    }
    h+='<div class="dpill'+(i===S.dayIdx?' on':'')+'" onclick="selDay('+i+')">'
      +'<div class="p-day">'+d.dl+'</div><div class="p-date">'+d.d+'</div>'+bar
      +'<div class="p-pk">'+code+'</div></div>';
  }
  return h+'</div></div>';
}
function renderFilter(){
  var byPerson=!!(S.filter&&S.filter.size), mode=S.fmode||'all';
  function seg(m,label){
    var on=!byPerson&&mode===m;
    return '<button class="fseg'+(on?' on':'')+'" onclick="setFilterMode(\''+m+'\')">'+label+'</button>';
  }
  var h='<div class="pfilter-wrap"><div class="pfilter">';
  h+='<div class="fseg-group">'+seg('mine','Mine')+seg('all','Everyone')+seg('notme','Not mine')+'</div>';
  h+='<button class="fbyperson'+(byPerson?' on':'')+'" onclick="openSheet({type:\'pfilter\'})" aria-label="Filter by person">'
    +IC.users+(byPerson?'<span class="fcount">'+S.filter.size+'</span>':'')+'</button>';
  return h+'</div></div>';
}

/* Day-view switch: All Plan Details vs Day Plan Only — same segmented look as
   renderFilter, two segments, no people icon */
function renderPlanView(){
  function seg(m,label){var on=(S.planView||'dayplan')===m;
    return '<button class="fseg'+(on?' on':'')+'" onclick="setPlanView(\''+m+'\')">'+label+'</button>';}
  var anyOpen=agendaCardKeys().some(function(k){return S.open[k];});
  var h='<div class="pfilter-wrap"><div class="pfilter"><div class="fseg-group">'
    +seg('dayplan','Daily Agenda')+seg('all','Daily Planning')+'</div>';
  h+='<button class="fbyperson" onclick="toggleAllCards()" aria-label="Collapse or expand all sections" title="'+(anyOpen?'Collapse all':'Expand all')+'">'+(anyOpen?IC.chevUp:IC.chevd)+'</button>';
  return h+'</div></div>';
}
function setPlanView(m){S.planView=m;render();}
/* every collapsible card key on the agenda (fixed sections + dynamic resort cards) */
function agendaCardKeys(){
  var keys=['strat','itin','flight','hours','parkplan','din','ll','shows'];
  Object.keys(S.open).forEach(function(k){if(k.indexOf('resort_')===0)keys.push(k);});
  return keys;
}
/* single toggle: if anything is open, collapse everything; otherwise expand everything */
function toggleAllCards(){
  var keys=agendaCardKeys(),anyOpen=keys.some(function(k){return S.open[k];});
  keys.forEach(function(k){S.open[k]=!anyOpen;});
  render();
}

/* ============================================================
   AGENDA (Home)
   ============================================================ */
function cardHead(key,bg,pkColor,icon,title,sub,planning,addAction){
  var h='<div class="card-hd card-hd-pk" style="background:'+bg+'" onclick="toggleCard(\''+key+'\')">';
  h+='<div class="card-lbl"><div class="card-icon" style="background:'+pkColor+';color:#fff">'+icon+'</div>';
  h+='<div><div class="card-title">'+title+'</div>'+(sub?'<div class="card-sub">'+sub+'</div>':'')+'</div></div>';
  h+='<div class="chev'+(S.open[key]?' open':'')+'">'+IC.chev+'</div></div>';
  return h;
}

function dayConditions(d){
  var vs=visitsFor(d.date).filter(function(v){return visible(v.who);});
  if(!vs.length){
    return '<div class="cond"><span class="cond-dot" style="background:'+PARKS.trv.color+'"></span><div style="flex:1"><div class="cond-pk">No park visits planned</div></div></div>';
  }
  var o='';
  for(var i=0;i<vs.length;i++){
    var v=vs[i],pk=PARKS[v.park]||PARKS.trv,h=hoursFor(v.park,d.date);
    var pr=null,prl=parkResFor(d.date);
    for(var j=0;j<prl.length;j++){if(prl[j].park===v.park&&visible(prl[j].who)){pr=prl[j];break;}}
    o+='<div class="cond"><span class="cond-dot" style="background:'+pk.color+'"></span>';
    o+='<div style="flex:1;min-width:0"><div class="cond-top"><span class="cond-pk">'+esc(pk.name)+'</span><span class="cond-time">'+timingLbl(v.timing)+'</span>';
    if(pr) o+='<span class="cond-res">'+(pr.status==='booked'?'<span style="display:flex">'+IC.check+'</span> Reserved':'Res · planning')+'</span>';
    o+='</div>';
    if(h){
      o+='<div class="cond-hours">'+esc((h.open||'—')+' – '+(h.close||'—'));
      if(h.early) o+=' <span class="cond-chip">Early '+esc(h.early)+'</span>';
      if(h.late) o+=' <span class="cond-chip">Late '+esc(h.late)+'</span>';
      o+='</div>';
    }else o+='<div class="cond-hours" style="color:var(--muted)">Hours not set</div>';
    o+='</div><div class="cond-meta">'+crowdPill(h?h.crowd:null)+'</div></div>';
  }
  return o;
}
/* Park Plan card — park visits with reservation status, ticket indicator and
   the early-entry / evening perks the group plans to use */
function parkPlanCard(d,pk){
  var key='parkplan';
  if(!(key in S.open)) S.open[key]=true;
  var vs=visitsFor(d.date).filter(function(v){return visible(v.who);});
  var o='<div class="card">';
  o+=cardHead(key,'#0F766E',pk.color,IC.map,'Park Plan',vs.length?(vs.length+' park'+(vs.length>1?'s':'')):'No park visits planned');
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'parksplan\',day:\''+d.date+'\'})">'+IC.pencil+' Edit Parks Plan</button>';
    if(!vs.length){
      o+='<div class="body-empty">No park visits planned.</div>';
    }else{
      for(var i=0;i<vs.length;i++){var v=vs[i],vpk=PARKS[v.park]||PARKS.trv;
        var pr=null,prl=parkResFor(d.date);
        for(var j=0;j<prl.length;j++){if(prl[j].park===v.park&&visible(prl[j].who)){pr=prl[j];break;}}
        o+='<div class="cond"><span class="cond-dot" style="background:'+vpk.color+'"></span>';
        o+='<div style="flex:1;min-width:0"><div class="cond-top"><span class="cond-pk">'+esc(vpk.name)+'</span></div>';
        o+='<div class="cond-status">';
        if(pr) o+='<span class="cond-res">'+(pr.status==='booked'?'<span style="display:flex">'+IC.check+'</span> Reserved':'Res · planning')+'</span>';
        o+=visitTicketTag(v);
        o+='</div>';
        var perks=[];if(v.earlyEntry)perks.push('Early Entry');if(v.eveningHours)perks.push('Evening Hours');
        if(perks.length) o+='<div class="cond-hours" style="color:var(--muted)">'+esc(perks.join(' · '))+'</div>';
        o+=whoChips(v.who);
        o+='</div><div class="cond-meta"><span class="cond-time">'+timingLbl(v.timing)+'</span></div></div>';
      }
    }
    o+='</div>';
  }
  return o+'</div>';
}
/* Park Hours & Crowds card — per-park hours + crowd for the day */
function hoursCard(d,pk){
  var key='hours';
  if(!(key in S.open)) S.open[key]=true;
  var phl=parkHoursFor(d.date);
  var o='<div class="card">';
  o+=cardHead(key,'#475569',pk.color,IC.clock,'Park Hours & Crowds',phl.length?(phl.length+' park'+(phl.length>1?'s':'')):'Not set');
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'hoursplan\',day:\''+d.date+'\'})">'+IC.pencil+' Edit park hours &amp; crowds</button>';
    if(!phl.length){
      o+='<div class="body-empty">No park hours set for this day.</div>';
    }else{
      for(var i=0;i<phl.length;i++){var h=phl[i],hpk=PARKS[h.park]||PARKS.trv;
        o+='<div class="cond"><span class="cond-dot" style="background:'+hpk.color+'"></span>';
        o+='<div style="flex:1;min-width:0"><div class="cond-top"><span class="cond-pk">'+esc(hpk.name)+'</span></div>';
        o+='<div class="cond-hours">'+esc((h.open||'—')+' – '+(h.close||'—'));
        if(h.early) o+=' <span class="cond-chip">Early '+esc(h.early)+'</span>';
        if(h.late) o+=' <span class="cond-chip">Late '+esc(h.late)+'</span>';
        o+='</div></div><div class="cond-meta">'+crowdPill(h.crowd)+'</div></div>';
      }
    }
    o+='</div>';
  }
  return o+'</div>';
}
/* badges derived from the day\'s items (+ any custom one-off tags) */
function dayBadges(d){
  var date=d.date,out=[],vis=function(w){return visible(w);};
  if(flightsFor(date).filter(function(f){return vis(f.who);}).length) out.push('Travel Day');
  var anyIn=false,anyOut=false;
  for(var i=0;i<RESORTS.length;i++){var r=RESORTS[i];if(r.trip===S.tripId&&vis(r.who)){if(r.checkin===date)anyIn=true;if(r.checkout===date)anyOut=true;}}
  if(anyIn) out.push('Check-in');
  if(anyOut) out.push('Check-out');
  var dayVisits=visitsFor(date).filter(function(v){return vis(v.who);});
  /* Park Hop — only when two visits to DIFFERENT parks are planned */
  var distinctParks={};dayVisits.forEach(function(v){distinctParks[v.park]=1;});
  if(Object.keys(distinctParks).length>=2) out.push('Park Hop');
  if(parkResFor(date).filter(function(p){return vis(p.who);}).length) out.push('Park Reservation');
  /* Early Entry / Evening Hours — only when the visit explicitly marks the
     perk as planned (checkboxes on the park visit), not merely available. */
  if(dayVisits.some(function(v){return v.earlyEntry;})) out.push('Early Entry');
  if(dayVisits.some(function(v){return v.eveningHours;})) out.push('Evening Hours');
  /* Single Pass / Multi Pass — only when the pass is confirmed (booked) */
  var lls=llFor(date).filter(function(l){return vis(l.who);});
  if(lls.some(function(l){return l.tier==='sp'&&l.status==='booked';})) out.push('Single Pass');
  if(lls.some(function(l){return (l.tier==='mp1'||l.tier==='mp2')&&l.status==='booked';})) out.push('Multi Pass');
  var TD=tripDays();
  if(TD.length&&TD[TD.length-1].date===date) out.push('Last Day');
  if(d.tags&&d.tags.length) out=out.concat(d.tags);
  /* honor per-day suppressions (any auto tag the user removed in Edit Day) */
  if(d.hiddenTags&&d.hiddenTags.length) out=out.filter(function(t){return d.hiddenTags.indexOf(t)<0;});
  return out;
}
/* Daily Agenda / Daily Planning shown as a segmented pill on the hero, with the
   collapse-all chevron on the right of the strip */
function heroTabs(){
  function tab(m,label){var on=(S.planView||'dayplan')===m;
    return '<button class="hero-seg-btn'+(on?' on':'')+'" onclick="setPlanView(\''+m+'\')">'+label+'</button>';}
  var anyOpen=agendaCardKeys().some(function(k){return S.open[k];});
  return '<div class="hero-tabs"><div class="hero-seg">'+tab('dayplan','Daily Agenda')+tab('all','Daily Planning')+'</div>'
    +'<button class="hero-collapse" onclick="toggleAllCards()" title="'+(anyOpen?'Collapse all':'Expand all')+'" aria-label="Collapse or expand all sections">'+(anyOpen?IC.chevUp:IC.chevd)+'</button></div>';
}
function renderAgenda(){
  var d=day();
  if(!d) return '<div class="body-empty" style="margin-top:30px">No days for this trip yet.<br><br>Set the trip\'s start and end dates (tap the trip name in the header → edit) and days will be generated automatically.</div>';
  var vs=visitsFor(d.date).filter(function(v){return visible(v.who);});
  var pk=vs.length?(PARKS[vs[0].park]||PARKS.trv):PARKS.trv;
  var sec=vs.length>1?vs[1]:null;
  var p2=sec?(PARKS[sec.park]||null):null;
  var WDF={Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Saturday',Sun:'Sunday'};
  var o='';

  /* Hero */
  o+='<div class="hero fadein">';
  o+='<div class="hero-body" style="background:'+pk.color+'">';
  o+='<button class="hero-edit" onclick="openScreen({type:\'dayedit\',day:\''+d.date+'\'})">'+IC.pencil+' Edit Day</button>';
  o+='<div class="h-date">'+monOf(d.date)+' '+d.d+' · '+(WDF[d.dl]||d.dl)+'</div>';
  o+='<div class="h-park">'+esc(d.visit||pk.name)+'</div>';
  if(p2&&!d.visit) o+='<div class="h-park2"><span class="p2dot" style="background:'+p2.color+'"></span>then '+p2.name+' · '+timingLbl(sec.timing).toLowerCase()+'</div>';
  if(d.blurb) o+='<div class="h-resort">'+esc(d.blurb)+'</div>';
  var bdg=dayBadges(d);
  o+='<div class="h-badges">';
  for(var b=0;b<bdg.length;b++) o+='<span class="badge">'+esc(bdg[b])+'</span>';
  o+='</div>';
  o+=heroTabs();   /* Daily Agenda / Daily Planning as underline tabs on the hero */
  o+='</div>';
  if(d.alert) o+='<div class="hero-alert">'+IC.warn+'<div class="hero-alert-txt">'+esc(d.alert)+'</div></div>';
  o+='</div>';

  /* Only the people filter sits below the hero now (the view switch is in the hero) */
  o+=renderFilter();

  if(S.planView==='dayplan'){
    /* Daily Agenda: hero + strategy + the timed day plan only */
    o+=stratCard(d,pk);
    o+=dayPlanCard(d,pk);
    return o;
  }

  /* Daily Planning order: Flight Reservations · Hotel Reservations ·
     Park Hours & Crowds · Park Plan · Dining Plan · Lightning Lane Plan ·
     Night Show Schedule */
  var flts=flightsFor(d.date).filter(function(f){return visible(f.who);});
  if(flts.length) o+=flightCard(flts,d);

  var stays=resortsFor(d.date).filter(function(r){return visible(r.who)&&(r.checkin===d.date||r.checkout===d.date);});
  for(var s=0;s<stays.length;s++) o+=resortCard(stays[s],d.date);

  o+=hoursCard(d,pk);
  o+=parkPlanCard(d,pk);

  var din=diningFor(d.date).filter(function(x){return visible(x.who);});
  o+=diningCard(din,pk,d.date);

  var lls=llFor(d.date).filter(function(l){return visible(l.who);});
  if(lls.length) o+=llCard(lls,d,pk);

  var sh=showsFor(d.date).filter(function(x){return visible(x.who);});
  o+=showsCard(sh,pk,d.date);

  return o;
}

function resortCard(r,date){
  var key='resort_'+r.id;
  if(!(key in S.open)) S.open[key]=true;
  var flag = date===r.checkin?'<span class="resort-flag flag-in">'+IC.check+' Check-in today</span>'
           : date===r.checkout?'<span class="resort-flag flag-out">'+IC.warn+' Check-out today</span>':'';
  var o='<div class="card'+(isPlanningStatus(r.status)?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-resort)',pkOf(date).color,IC.bed,'Hotel Reservations',r.name,isPlanningStatus(r.status));
  if(S.open[key]){
    o+='<div class="card-body"><div class="resort-body">';
    o+='<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">';
    o+='<div><div class="resort-name">'+esc(r.name)+'</div><div class="resort-room">'+esc(r.room)+'</div></div>';
    o+='<div class="row-status" style="display:flex;align-items:center;gap:8px">'+statusBadge(r.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280" onclick="openScreen({type:\'resortedit\',edit:\''+r.id+'\'})">'+IC.pencil+'</button></div></div>';
    o+='<div class="resort-dates"><div class="rd-cell"><div class="rd-lbl">Check-in</div><div class="rd-day">'+monOf(r.checkin)+' '+(+r.checkin.slice(8))+'</div><div class="rd-sub">'+(fmtDay(r.checkin).split(' · ')[1]||'')+' · '+esc(r.inTime||'4:00 PM')+'</div></div>';
    o+='<div class="rd-cell"><div class="rd-lbl">Check-out</div><div class="rd-day">'+monOf(r.checkout)+' '+(+r.checkout.slice(8))+'</div><div class="rd-sub">'+(fmtDay(r.checkout).split(' · ')[1]||'')+' · '+esc(r.outTime||'11:00 AM')+'</div></div></div>';
    o+='<div class="resort-conf">Confirmation #'+esc(r.conf)+'</div>';
    o+=whoChips(r.who);
    if(flag) o+=flag;
    o+='</div></div>';
  }
  o+='</div>';
  return o;
}

function flightCard(flts,d){
  var key='flight', pk=pkOf(d.date);
  var allPlanning=flts.length>0&&flts.every(function(f){return isPlanningStatus(f.status);});
  var sub=flts.length?(flts.length+' journey'+(flts.length>1?'s':'')):'None yet';
  var o='<div class="card'+(allPlanning?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-flight)',pk.color,IC.plane,'Flight Reservations',sub,allPlanning);
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'addflight\',day:\''+d.date+'\'})">'+IC.plus+' Add flight</button>';
    if(!flts.length){
      o+='<div class="body-empty">No flights for this day'+(filterActive()?' for the current filter':'')+'.</div>';
    }
    for(var i=0;i<flts.length;i++) o+='<div class="flt-jbox'+(isPlanningStatus(flts[i].status)?' planning':'')+'">'+flightJourney(flts[i],d)+'</div>';
    o+='</div>';
  }
  o+='</div>';
  return o;
}
function flightJourney(f,d){
  var o='<div class="flt-journey">';
  o+='<div class="flt-jhd"><span class="flt-jlabel">'+esc(f.label)+'</span>'
    +'<div style="display:flex;align-items:center;gap:8px">'+statusBadge(f.status)
    +'<button class="hdr-icon" style="width:32px;height:32px;background:#F3F1EC;color:#6B7280" onclick="openScreen({type:\'addflight\',edit:\''+f.id+'\',day:\''+f.day+'\'})">'+IC.pencil+'</button></div></div>';
  o+='<div style="padding:6px 14px 0">'+whoStack(f.who)+'</div>';
  for(var i=0;i<f.legs.length;i++){
    var lg=f.legs[i];
    if(i>0) o+='<div class="flt-layover">Connection in '+esc(lg.depCity)+'</div>';
    o+='<div class="flt-grid">';
    o+='<div class="flt-side"><div class="flt-apt">'+esc(lg.depApt)+'</div><div class="flt-city">'+esc(lg.depCity)+'</div><div class="flt-time">'+esc(lg.depTime)+'</div><div class="flt-date">'+fmtDay(lg.depDate).split(' · ')[0]+'</div></div>';
    o+='<div class="flt-mid"><div class="flt-line"><div class="flt-dash"></div>'+IC.planexs+'<div class="flt-dash"></div></div><div class="flt-carrier">'+esc(lg.airline)+'</div></div>';
    o+='<div class="flt-side right"><div class="flt-apt">'+esc(lg.arrApt)+'</div><div class="flt-city">'+esc(lg.arrCity)+'</div><div class="flt-time">'+esc(lg.arrTime)+'</div><div class="flt-date">'+fmtDay(lg.arrDate).split(' · ')[0]+'</div></div>';
    o+='</div>';
    o+='<div class="flt-meta"><div class="flt-meta-cell"><div class="flt-mlbl">Flight</div><div class="flt-mval">'+esc(lg.num)+'</div></div>';
    o+='<div class="flt-meta-cell"><div class="flt-mlbl">Confirmation</div><div class="flt-mval">'+(lg.conf?esc(lg.conf):'<span style="color:var(--muted);font-weight:600">—</span>')+'</div></div></div>';
  }
  o+='</div>';
  return o;
}

/* assemble the day plan: derived booked items + manual stops, time-sorted */
function dayPlanItems(d){
  var date=d.date,out=[];
  for(var i=0;i<RESORTS.length;i++){var r=RESORTS[i];if(r.trip!==S.tripId||r.status!=='booked')continue;
    if(r.checkin===date) out.push({t:r.inTime||'4:00 PM',x:'Check in — '+r.name,type:'resort',who:r.who});
    if(r.checkout===date) out.push({t:r.outTime||'11:00 AM',x:'Check out — '+r.name,type:'resort',who:r.who});}
  flightsFor(date).forEach(function(f){if(f.status!=='booked')return;f.legs.forEach(function(lg){
    if(lg.depDate===date) out.push({t:lg.depTime,x:'Depart '+lg.depApt+' — '+lg.airline+(lg.num?' '+lg.num:''),type:'flight',who:f.who});
    if(lg.arrDate===date) out.push({t:lg.arrTime,x:'Arrive '+lg.arrApt+(lg.arrCity&&lg.arrCity!==lg.arrApt?' ('+lg.arrCity+')':''),type:'flight',who:f.who});
  });});
  diningFor(date).forEach(function(dn){if(dn.status==='reserved'||dn.status==='planned')out.push({t:dn.time,x:dn.meal+' — '+dn.name,name:dn.name,meal:dn.meal,park:(dn.loc==='in'?dn.park:null),loc:dn.loc,type:'dining',who:dn.who,ref:dn.id,status:dn.status,dstatus:dn.status,soft:dn.status==='planned'});});
  showsFor(date).forEach(function(s){if((s.status||'attend')==='attend')out.push({t:s.time,x:s.name,name:s.name,park:s.park,type:'show',who:s.who,ref:s.id,status:s.status||'attend'});});
  llFor(date).forEach(function(l){var bk=l.status==='booked';out.push({t:bk?(l.bookedTime||l.window):l.window,x:l.ride,name:l.ride,type:'ll',who:l.who,ref:l.id,soft:!bk,tier:l.tier,status:l.status});});
  (d.itin||[]).forEach(function(it,idx){
    if(it.priv&&it.by&&it.by!==S.persona)return;   /* private stop — only its author sees it */
    out.push({t:it.t,x:it.x,type:'manual',who:it.who||'all',crit:it.crit,idx:idx,priv:!!it.priv});
  });
  out=out.filter(function(e){return visible(e.who);});
  out.sort(function(a,b){return mins(a.t)-mins(b.t);});
  // weave each rolling re-book in right after the booked LL it follows
  var woven=[];
  out.forEach(function(e){
    woven.push(e);
    if(e.type==='ll'&&e.ref){
      rebooksFor(date).forEach(function(rb){if(rb.after===e.ref&&visible(rb.who))woven.push({t:e.t,x:rebookText(rb),type:'rebook',who:rb.who,soft:e.soft});});
    }
  });
  return woven;
}
function rebookText(rb){var a=rb.after?(LLS.filter(function(l){return l.id===rb.after;})[0]):null;return (a?'After '+a.ride+' → ':'')+rb.text;}
function planChip(t){
  var map={flight:['Flight','#1B2B4A','#fff'],dining:['Dining','#7C2D12','#fff'],show:['Show','#4C1D95','#fff'],ll:['Lightning Lane','#FACC15','#7C2D12'],resort:['Resort','#1C3A5E','#fff'],rebook:['Re-book','#7C3AED','#fff']};
  var m=map[t];return m?'<span class="t-tag'+(t==='ll'?' t-tag-ll':'')+'" style="background:'+m[1]+';color:'+m[2]+'">'+m[0]+'</span>':'';
}
function dayPlanCard(d,pk){
  var key='itin';
  var summary=d.strategy?firstSentence(d.strategy):null;
  var items=dayPlanItems(d);
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-plan)',pk.color,IC.route,'Daily Agenda',items.length+' stops');
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'stopedit\',day:\''+d.date+'\'})">'+IC.plus+' Add plans</button>';
    if(llFor(d.date).length){
      o+='<div class="ll-legend"><div class="ll-legend-item"><span class="ll-tag sp">SP</span> Single Pass</div>'
        +'<div class="ll-legend-item"><span class="ll-tag mp1">T1</span> Multi Pass T1</div>'
        +'<div class="ll-legend-item"><span class="ll-tag mp2">T2</span> Multi Pass T2</div></div>';
    }
    if(summary) o+='<div class="plan-summary"><strong>The plan:</strong> '+esc(summary)+'</div>';
    for(var j=0;j<items.length;j++){
      var e=items[j];
      o+='<div class="t-row'+(e.soft?' t-soft':'')+'" data-dpkey="'+encodeURIComponent(e.x+(e.t?' · '+e.t:''))+'">';
      o+='<div class="t-time">'+esc(e.t)+'</div>';
      /* name: dining/show use the bare name; LL appends its tier pill; others keep text (may carry pill markers) */
      var nameHtml=(e.type==='ll')?(esc(e.name||e.x)+' <span class="ll-tag '+tagCls(e.tier)+'">'+tagShort(e.tier)+'</span>')
                   :(e.type==='dining'||e.type==='show')?esc(e.name||e.x):pillify(esc(e.x));
      o+='<div style="flex:1;min-width:0"><div class="t-text">'+nameHtml+'</div>';
      /* pills: category + the SAME shared pills the cards use (status / meal / park) */
      var tags=[];
      var chip=planChip(e.type);if(chip)tags.push(chip);
      if((e.type==='dining'||e.type==='show'||e.type==='ll')&&e.status) tags.push(statusBadge(e.status));
      if(e.type==='dining'){
        tags.push(e.park&&PARKS[e.park]?'<span class="inpark-badge" style="background:'+PARKS[e.park].color+'">'+esc(PARKS[e.park].short)+'</span>':(e.loc==='in'?'<span class="inpark-badge" style="background:#8C9BAA">In-Park</span>':'<span class="nonpark-badge">Non-Park</span>'));
      }
      if(e.type==='show'&&e.park&&PARKS[e.park]) tags.push('<span class="inpark-badge" style="background:'+PARKS[e.park].color+'">'+esc(PARKS[e.park].short)+'</span>');
      /* non-component rows keep the soft "Planned" hint */
      if(e.soft&&e.type!=='dining'&&e.type!=='show'&&e.type!=='ll') tags.push(statusBadge('planned'));
      if(e.priv) tags.push('<span class="t-tag" style="background:#EEF2FF;color:#3730A3">'+IC.lock+' Private</span>');
      if(e.crit) tags.push('<span class="t-tag t-tag-crit">'+esc(e.crit)+'</span>');
      if(tags.length) o+='<div class="t-tags">'+tags.join('')+'</div>';
      o+=whoStack(e.who);
      o+='</div>';
      if(e.type==='manual') o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0;align-self:flex-start" onclick="openScreen({type:\'stopedit\',day:\''+d.date+'\',idx:'+e.idx+'})">'+IC.pencil+'</button>';
      if(e.ref&&(e.type==='dining'||e.type==='ll'||e.type==='show')) o+=rsvpRow(e.type,e.ref);
      else if(e.type==='manual'&&!e.priv) o+=rsvpRow('manual',d.date+'|'+e.idx);
      o+='</div>';
    }
    o+='</div>';
  }
  return o+'</div>';
}

/* shift a YYYY-MM-DD date by N days (UTC, no TZ drift) */
function shiftDate(ds,days){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(ds||''))return ds;
  var p=ds.split('-'),dt=new Date(Date.UTC(+p[0],+p[1]-1,+p[2]));
  dt.setUTCDate(dt.getUTCDate()+days);
  return dt.getUTCFullYear()+'-'+('0'+(dt.getUTCMonth()+1)).slice(-2)+'-'+('0'+dt.getUTCDate()).slice(-2);
}
function fmtBookDate(ds){return /^\d{4}-\d{2}-\d{2}$/.test(ds||'')?(monOf(ds)+' '+(+ds.slice(8))):ds;}
/* earliest on-Disney-property check-in for this trip (the anchor for the resort
   7-day booking window). On-property is the default; only an explicit unchecked
   box (onProp===false) counts as off-property. Continuous split stays anchor to
   the first check-in. Returns null when there's no on-property stay. */
function earliestOnPropCheckin(){
  var best=null;
  for(var i=0;i<RESORTS.length;i++){var r=RESORTS[i];
    if(r.trip===S.tripId&&r.onProp!==false&&r.checkin&&(!best||r.checkin<best))best=r.checkin;}
  return best;
}
/* when to book a given Lightning Lane item:
   - On-property: 7 days before the (first) resort check-in, 7 AM, whole trip (SP + MP)
   - Off-property: Multi Pass = 3 days before the day; Single Pass = the morning of */
function llBookInfo(l){
  var onpIn=earliestOnPropCheckin(),bd,note;
  if(onpIn){bd=shiftDate(onpIn,-7);note='7 days before check-in · Disney Resort';}
  else if(l.tier==='sp'){bd=l.day;note='morning of · off-property';}
  else{bd=shiftDate(l.day,-3);note='3 days before · off-property';}
  return {date:bd,label:fmtBookDate(bd)+' @ 7:00 AM',note:note};
}
/* yellow banner of when to book — one line per distinct date/rule across the
   given (planning) items, so identical timing collapses to a single message */
function llBookBanner(items){
  var planning=(items||[]).filter(function(l){return l.status!=='booked';});
  if(!planning.length) return '';
  var seen={},o='';
  planning.forEach(function(l){var bi=llBookInfo(l),k=bi.label+'|'+bi.note;if(!seen[k]){seen[k]=1;
    o+='<div class="ll-bookdate">'+IC.bolt+' Book '+esc(bi.label)+' <span class="ll-book-note">'+esc(bi.note)+'</span></div>';}});
  return o;
}
function llCard(lls,d,pk){
  var key='ll';
  var planning=lls.filter(function(l){return l.status==='planning';}).length;
  var booked=lls.length-planning;
  var roll=rebooksFor(d.date).filter(function(r){return visible(r.who);});
  var anyPlan=planning>0;
  var o='<div class="card'+(anyPlan?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-ll)',pk.color,IC.bolt,'Lightning Lane Plan',booked+' booked · '+planning+' planning'+(roll.length?' · '+roll.length+' rolling':''),anyPlan);
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'addll\',day:\''+d.date+'\'})">'+IC.plus+' Add ride</button>';
    o+='<button class="add-link" onclick="openScreen({type:\'rbedit\',day:\''+d.date+'\'})">'+IC.plus+' Add rolling re-book</button>';
    o+='<div class="ll-legend"><div class="ll-legend-item"><span class="ll-tag sp">SP</span> Single Pass</div>'
      +'<div class="ll-legend-item"><span class="ll-tag mp1">T1</span> Multi Pass T1</div>'
      +'<div class="ll-legend-item"><span class="ll-tag mp2">T2</span> Multi Pass T2</div></div>';
    o+=llBookBanner(lls);
    for(var i=0;i<lls.length;i++){
      var l=lls[i];
      o+='<div class="ll-row">';
      o+='<div class="ll-top"><div class="ll-ride">'+esc(l.ride)+' <span class="ll-tag '+tagCls(l.tier)+'">'+tagShort(l.tier)+'</span></div>';
      o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="openScreen({type:\'addll\',edit:\''+l.id+'\',day:\''+l.day+'\'})">'+IC.pencil+'</button></div>';
      if(l.status==='booked'){
        o+='<div class="ll-win booked">'+IC.check+' Booked '+esc(l.bookedTime)+'</div>';
        if(l.conf) o+='<div class="ll-conf">Confirmation '+esc(l.conf)+'</div>';
      }else{
        o+='<div class="ll-win">Planned window: '+esc(l.window)+'</div>';
      }
      o+=whoStack(l.who);
      if(l.status!=='booked'){
        o+='<div class="ll-meta-row">'+statusBadge(l.status);
        o+='<button class="ri-btn" style="margin-left:auto" onclick="openScreen({type:\'llbook\',id:\''+l.id+'\'})">Mark as booked</button>';
        o+='</div>';
      }
      o+=rsvpRow('ll',l.id);
      o+='</div>';
    }
    o+='<div class="roll-hd">Rolling Re-books</div>';
    for(var r=0;r<roll.length;r++){var rb=roll[r];
      o+='<div class="roll-row"><span class="roll-arr">'+IC.arr+'</span><span style="flex:1">'+esc(rebookText(rb))+' '+whoStack(rb.who)+'</span>'
        +'<button class="hdr-icon" style="width:26px;height:26px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="openScreen({type:\'rbedit\',edit:\''+rb.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div>';
    }
    if(!roll.length) o+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No rolling re-books yet.</div>';
    o+='</div>';
  }
  return o+'</div>';
}

function stratCard(d,pk){
  var key='strat';
  var sub=d.strategy?'Tap to read':'No strategy yet';
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-strat)',pk.color,IC.book,'Strategy & Notes',sub);
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'strategyedit\',day:\''+d.date+'\'})">'+IC.pencil+(d.strategy?' Edit strategy':' Add strategy')+'</button>';
    if(d.strategy){
      o+='<div class="strategy-body">'+renderStrat(d.strategy)+'</div>';
    }else{
      o+='<div class="body-empty">No strategy written for this day yet.</div>';
    }
    o+='</div>';
  }
  return o+'</div>';
}

function diningCard(din,pk,date){
  var key='din';
  var anyPlan=din.some(function(x){return isPlanningStatus(x.status);});
  var o='<div class="card'+(anyPlan?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-din)',pk.color,IC.fork,'Dining Plan',din.length?(din.length+' in plan'):'Nothing yet',anyPlan);
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'adddining\',day:\''+date+'\'})">'+IC.plus+' Add dining</button>';
    if(!din.length) o+='<div class="body-empty">No dining'+(filterActive()?' for the current filter':'')+' on this day.</div>';
    for(var i=0;i<din.length;i++) o+=diningRow(din[i]);
    o+='</div>';
  }
  return o+'</div>';
}
function diningRow(dn){
  var dpk=(dn.loc==='in'&&dn.park&&PARKS[dn.park])?PARKS[dn.park]:null;
  var o='<div class="item-row"><div style="flex:1;min-width:0"><div class="item-name">'+esc(dn.name)+'</div>';
  o+='<div style="display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap">';
  o+=statusBadge(dn.status);
  o+=dpk?'<span class="inpark-badge" style="background:'+dpk.color+'">'+esc(dpk.short)+'</span>':(dn.loc==='in'?'<span class="inpark-badge" style="background:#8C9BAA">In-Park</span>':'<span class="nonpark-badge">Non-Park</span>');
  o+=whoChips(dn.who);
  o+='</div>';
  if(dn.status==='reserved'&&dn.conf&&dn.conf!=='walk-up') o+='<div class="item-conf">Confirmation '+esc(dn.conf)+'</div>';
  o+='</div><div class="item-time">'+esc(dn.time)+'</div>';
  o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0;margin-left:8px" onclick="openScreen({type:\'adddining\',edit:\''+dn.id+'\',day:\''+dn.day+'\'})">'+IC.pencil+'</button>';
  o+=rsvpRow('dining',dn.id);
  o+='</div>';
  return o;
}
function showsCard(sh,pk,date){
  var key='shows';
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-show)',pk.color,IC.star,'Night Show Schedule',sh.length?(sh.length+' show'+(sh.length>1?'s':'')):'Nothing yet');
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<button class="add-link solo" onclick="openScreen({type:\'showedit\',day:\''+date+'\'})">'+IC.plus+' Add show</button>';
    if(!sh.length) o+='<div class="body-empty">No shows'+(filterActive()?' for the current filter':'')+' on this day.</div>';
    for(var i=0;i<sh.length;i++){var x=sh[i];var xpk=x.park&&PARKS[x.park];
      o+='<div class="item-row"><div style="flex:1"><div class="item-name">'+esc(x.name)+'</div><div style="display:flex;align-items:center;gap:6px;margin-top:4px">'+statusBadge(x.status||'attend')+(xpk?'<span class="inpark-badge" style="background:'+xpk.color+'">'+esc(xpk.short)+'</span>':'')+whoChips(x.who)+'</div></div><div class="item-time">'+esc(x.time)+'</div>';
      o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0;margin-left:8px" onclick="openScreen({type:\'showedit\',edit:\''+x.id+'\',day:\''+x.day+'\'})">'+IC.pencil+'</button>'+rsvpRow('show',x.id)+'</div>';
    }
    o+='</div>';
  }
  return o+'</div>';
}

/* ============================================================
   LISTS HUB  (own nav tab)
   ============================================================ */
function pkMyCount(){var n=0;(PACKING[S.persona]||[]).forEach(function(c){n+=(c.items?c.items.length:0);});return n;}
function tdTmplCount(){return (TODO_TMPL[S.persona]||[]).length;}
function pkTmplCount(){return (PACKING_TMPL[S.persona]||[]).reduce(function(a,c){return a+(c.items?c.items.length:0);},0);}
function renderListsHub(){
  var t=trip();
  var o='<div class="pg-title">Lists</div><div class="pg-sub">'+esc(t.name)+' · '+esc(t.dates)+'</div>';
  o+= tdHasStarted(S.persona)
      ? hubRow(['To Do List',IC.checks,'#166534',tdVisibleCount()+' items','todo'])
      : listStarterCard('To Do List',IC.checks,'#166534','todo',tdTmplCount());
  o+= pkHasStarted(S.persona)
      ? hubRow(['Packing List',IC.suitcase,'#92400E',pkMyCount()+' items','packing'])
      : listStarterCard('Packing List',IC.suitcase,'#92400E','packing',pkTmplCount());
  o+=hubRow(['Need to Buy',IC.cart,'#B45309',needBuyCount()+' items','needbuy']);
  o+='<div class="body-empty" style="text-align:left;padding:12px 2px 0;font-size:12px">Your To&nbsp;Do and Packing lists are private to you; the trip owner and admins can see everyone\'s. <strong>Need to Buy</strong> is shared with the whole group.</div>';
  o+='<div class="hub-section-label">Master templates</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'todotmpl\'})"><div class="hub-icon" style="background:#166534">'+IC.checks+'</div>'
    +'<div class="hub-main"><div class="hub-title">Global To Do Template</div><div class="hub-sub">Reused when you start a new trip</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'packtmpl\'})"><div class="hub-icon" style="background:#92400E">'+IC.suitcase+'</div>'
    +'<div class="hub-main"><div class="hub-title">Global Packing Template</div><div class="hub-sub">Reused when you start a new trip</div></div><div class="chev">'+IC.chev+'</div></button>';
  return o;
}
/* not-set-up-yet card: create the list blank or from your global template */
function listStarterCard(title,icon,color,kind,nTmpl){
  var o='<div class="hub-row" style="align-items:flex-start;cursor:default">';
  o+='<div class="hub-icon" style="background:'+color+'">'+icon+'</div>';
  o+='<div class="hub-main" style="width:100%"><div class="hub-title">'+title+'</div><div class="hub-sub">Not set up yet for this trip</div>';
  o+='<div style="display:flex;gap:8px;margin-top:10px">';
  if(nTmpl)o+='<button class="btn-primary" style="margin:0;flex:1;padding:9px" onclick="listStart(\''+kind+'\',\'tmpl\')">Use my template</button>';
  o+='<button class="btn-secondary" style="margin:0;flex:1;padding:9px" onclick="listStart(\''+kind+'\',\'blank\')">Start blank</button>';
  o+='</div></div></div>';
  return o;
}
function listStart(kind,mode){
  if(kind==='todo'){ if(mode==='tmpl')tdStartFromTemplate(); else tdStartEmpty(); openScreen({type:'todolist'}); }
  else { if(mode==='tmpl')pkStartFromTemplate(); else pkStartEmpty(); openScreen({type:'packlist'}); }
}

/* ============================================================
   PLAN HUB
   ============================================================ */
function renderPlanHub(){
  var o='<div class="pg-title">Plan</div><div class="pg-sub">Build out every part of '+esc(trip().name)+'.</div>';
  var tid=S.tripId;
  function cnt(coll){var n=0;for(var i=0;i<coll.length;i++)if(coll[i].trip===tid)n++;return n;}
  var rows=[
    ['Flights',IC.plane,'var(--hd-flight)',cnt(FLIGHTS)+' journeys','addflight'],
    ['Dining',IC.fork,'var(--hd-din)',cnt(DINING)+' reservations','dining'],
    ['Lightning Lanes',IC.bolt,'var(--hd-ll)',cnt(LLS)+' rides','ll'],
    ['Night Shows',IC.star,'var(--hd-show)',cnt(SHOWS)+' show'+(cnt(SHOWS)===1?'':'s'),'shows'],
    ['Resort',IC.bed,'var(--hd-resort)',cnt(RESORTS)+' stays','resort'],
    ['Park Tickets',IC.ticket,'#0F766E',cnt(TICKETS)+' ticket'+(cnt(TICKETS)===1?'':'s'),'tickets'],
    ['Park Reservations',IC.ticket,'#0F5F73',cnt(PARKRES)+' reservations','parkres'],
    ['Park Visits',IC.map,'#3B7549',cnt(VISITS)+' visits','visits'],
    ['Park Hours',IC.bolt,'#0F5F73',cnt(PARKHOURS)+' set','hours']
  ];
  /* Edit Trip Details sits at the top of the page */
  if(canEditTrip())
    o+='<button class="hub-row" onclick="openScreen({type:\'tripedit\'})"><div class="hub-icon" style="background:#6B4FA0">'+IC.pencil+'</div>'
      +'<div class="hub-main"><div class="hub-title">Edit Trip Details</div><div class="hub-sub">'+esc(trip().dates)+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<div class="hub-section-label">Trip components</div>';
  for(var i=0;i<rows.length;i++) o+=hubRow(rows[i]);
  return o;
}
/* Admin tab — admin-only hub for imports + people/groups (far-right nav tab) */
function renderAdminHub(){
  if(!isAdmin())return '<div class="body-empty" style="margin-top:40px">Admin only.</div>';
  var _t0=trip();
  var o='<div class="pg-title">Admin</div><div class="pg-sub">Power-user tools for '+esc((_t0&&_t0.name)||partyLabel())+'.</div>';
  o+='<div class="hub-section-label">Manage</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'parties\'})"><div class="hub-icon" style="background:#6B4FA0">'+IC.home+'</div>'
    +'<div class="hub-main"><div class="hub-title">Groups</div><div class="hub-sub">'+PARTIES.length+' '+(PARTIES.length===1?'group':'groups')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'personas\'})"><div class="hub-icon" style="background:#1C3A5E">'+IC.users+'</div>'
    +'<div class="hub-main"><div class="hub-title">People</div><div class="hub-sub">'+FAMILY.length+' '+(FAMILY.length===1?'person':'people')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'alltrips\'})"><div class="hub-icon" style="background:#0E7490">'+IC.map+'</div>'
    +'<div class="hub-main"><div class="hub-title">Trips</div><div class="hub-sub">'+TRIPS.length+' '+(TRIPS.length===1?'trip':'trips')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  if(window.CLOUD&&window.CLOUD.isSuper){
    o+='<div class="hub-section-label">Super Admin</div>';
    o+='<button class="hub-row" onclick="openTenants()"><div class="hub-icon" style="background:#7C2D12">'+IC.grid+'</div>'
      +'<div class="hub-main"><div class="hub-title">All Tenants</div><div class="hub-sub">Every owner\'s groups, people & trips</div></div><div class="chev">'+IC.chev+'</div></button>';
    o+='<button class="hub-row" onclick="openOwners()"><div class="hub-icon" style="background:#0F766E">'+IC.users+'</div>'
      +'<div class="hub-main"><div class="hub-title">Authorized Users</div><div class="hub-sub">Who may sign in to the app</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  o+='<div class="hub-section-label">Import</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'import\'})"><div class="hub-icon" style="background:#1E40AF">'+IC.sparkles+'</div>'
    +'<div class="hub-main"><div class="hub-title">AI Import</div><div class="hub-sub">Paste structured details from Claude</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'csvimport\'})"><div class="hub-icon" style="background:#0F766E">'+IC.upload+'</div>'
    +'<div class="hub-main"><div class="hub-title">CSV Import</div><div class="hub-sub">Seed a trip from a spreadsheet</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<div class="hub-section-label">Data</div>';
  o+='<button class="hub-row" onclick="exportAllData()"><div class="hub-icon" style="background:#475569">'+IC.upload+'</div>'
    +'<div class="hub-main"><div class="hub-title">Export / Backup</div><div class="hub-sub">Download all data as JSON</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'backups\'})"><div class="hub-icon" style="background:#0F766E">'+IC.clock+'</div>'
    +'<div class="hub-main"><div class="hub-title">Restore from backup</div><div class="hub-sub">'+backupCountLabel()+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="startOver()"><div class="hub-icon" style="background:#B91C1C">'+IC.warn+'</div>'
    +'<div class="hub-main"><div class="hub-title">Start over</div><div class="hub-sub">Wipe all trips, people & lists — leaves just you</div></div><div class="chev">'+IC.chev+'</div></button>';
  return o;
}
/* nuke everything (cloud + local) and re-seed a blank account with just you */
function startOver(){
  if(!isAdmin()&&!(window.CLOUD&&window.CLOUD.isSuper)){toast('Admin only');return;}
  if(!confirm('Start over? This permanently deletes ALL trips, people and lists, leaving only you. It cannot be undone.'))return;
  if(!confirm('Last chance — wipe everything and start fresh?'))return;
  toast('Starting over…');
  var finish=function(){
    resetToBlank();
    try{closeScreen();}catch(e){}
    S.tab='home';S.sheet=null;
    render();
    toast('Fresh start — just you now');
  };
  if(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user&&window.CLOUD.wipe){
    window.CLOUD.wipe().then(finish,finish);
  }else finish();
}
function hubRow(r){
  var act=r[4];
  var on='openScreen({type:\'section\',section:\''+act+'\'})';
  if(act==='packing') on='S.tab=\'plan\';go(\'home\');S.tab=\'plan\';openSection(\'packing\')';
  return '<button class="hub-row" onclick="openSection(\''+act+'\')">'
    +'<div class="hub-icon" style="background:'+r[2]+'">'+r[1]+'</div>'
    +'<div class="hub-main"><div class="hub-title">'+r[0]+'</div><div class="hub-sub">'+r[3]+'</div></div>'
    +'<span class="hub-count">'+r[3].split(' ')[0]+'</span><div class="chev" style="margin-left:8px">'+IC.chev+'</div></button>';
}
function openSection(section){
  if(section==='todo'){openScreen({type:'todolist'});return;}
  if(section==='packing'){openScreen({type:'packlist'});return;}
  if(section==='needbuy'){openScreen({type:'needbuy'});return;}
  if(section==='personas'){if(!adminGate())return;openScreen({type:'personas'});return;}
  openScreen({type:'section',section:section});
}

/* shared day header (used by the Plan section screens) */
function dayHd(date,noPark){
  var d=dayByDate(date),pp=dayPrimaryPark(date),pk=(pp&&PARKS[pp])?PARKS[pp]:null;
  var bg=pk?pk.color:PARKS.trv.color;
  return '<div class="day-hd" style="background:'+bg+'"><div class="day-hd-name">'+monOf(date)+' '+(d?d.d:(+date.slice(8)))+(d?' · '+d.dl:'')+'</div>'+((pk&&!noPark)?'<div class="day-hd-date">'+esc(pk.name)+'</div>':'')+'</div>';
}

/* ============================================================
   CHAT
   ============================================================ */
/* chat unread — per trip + persona, tracked by message count seen */
function chatSeenKey(){return 'dtp_chatseen_'+S.tripId+'_'+S.persona;}
function chatMsgCount(){var n=0;for(var i=0;i<CHAT.length;i++)if(CHAT[i].trip===S.tripId)n++;return n;}
function chatUnread(){return Math.max(0,chatMsgCount()-load(chatSeenKey(),0));}
function markChatSeen(){save(chatSeenKey(),chatMsgCount());}
function renderChat(){
  var me=S.persona;
  markChatSeen();           /* opening the thread clears its unread badge */
  var h='<div id="chatwrap">';
  h+='<div class="chat-asof">Group thread · '+esc(trip().name)+'</div>';
  var lastDay=null;
  var msgs=CHAT.filter(function(m){return m.trip===S.tripId;});
  if(!msgs.length) h+='<div class="body-empty" style="margin-top:20px">No messages yet for this trip.</div>';
  for(var i=0;i<msgs.length;i++){
    var m=msgs[i],p=person(m.from),mine=m.from===me;
    if(!p)p={color:'#94A3B8',name:'?'};   /* sender was deleted — render a placeholder */
    if(m.day&&m.day!==lastDay){lastDay=m.day;h+='<div class="chat-day"><span>'+fmtDay(m.day)+'</span></div>';}
    h+='<div class="msgwrap'+(mine?' me':'')+'">';
    h+='<div class="msg'+(mine?' me':'')+'">';
    h+='<div class="msg-av" style="background:'+p.color+'">'+p.name[0]+'</div>';
    h+='<div class="msg-col">';
    if(!mine) h+='<div class="msg-name">'+esc(p.name)+'</div>';
    if(S._editMsg===m.id){
      h+='<div class="msg-editbox"><textarea class="msg-editta" id="edit-'+m.id+'">'+esc(m.text)+'</textarea>';
      h+='<div class="msg-edit-btns"><button class="rxn-act" onclick="chatEditCancel()">Cancel</button><button class="rxn-act save" onclick="chatEditSave(\''+m.id+'\')">Save</button></div></div>';
    }else{
      h+='<div class="msg-bubble" ontouchstart="chatPressStart(event,\''+m.id+'\')" ontouchend="chatPressEnd()" ontouchmove="chatPressEnd()" onclick="chatTapMsg(\''+m.id+'\')">';
      if(m.ref) h+='<div class="msg-ref" onclick="event.stopPropagation();chatJumpRef(\''+m.id+'\')">'+refIcon(m.ref.type)+esc(m.ref.label)+'</div>';
      h+=(m.text?esc(m.text):'')+'</div>';
      h+='<div class="msg-time">'+esc(chatTime(m))+(m.edited?' · edited':'')+'</div>';
    }
    h+='</div></div>';   /* close msg-col, msg — avatar now bottom-aligns to the bubble */
    if(S._editMsg!==m.id) h+='<div class="rxnrow">'+chatReactions(m)+'</div>';
    h+='</div>';   /* close msgwrap */
  }
  h+='</div>';
  h+='<div class="chat-bar">';
  if(S._chatRef) h+='<div class="chat-refpill">'+refIcon(S._chatRef.type)+'<span>'+esc(S._chatRef.label)+'</span><button onclick="chatClearRef()" aria-label="Remove attachment">&times;</button></div>';
  h+='<div class="chat-bar-row">';
  h+='<button class="chat-attach" onclick="chatAttach()" aria-label="Attach a planned item">'+IC.route+'</button>';
  h+='<input class="chat-input" id="chat-inp" placeholder="Message the group…" onkeydown="if(event.key===\'Enter\')sendChat()">';
  h+='<button class="chat-send" onclick="sendChat()">'+IC.send+'</button></div></div>';
  return h;
}
function refIcon(t){var i=t==='dining'?IC.fork:t==='flight'?IC.planexs:t==='show'?IC.star:IC.route;return '<span style="display:flex">'+i+'</span>';}
function sendChat(){var e=document.getElementById('chat-inp');var txt=e?e.value.trim():'';
  if(!txt&&!S._chatRef)return;
  var msg={id:'c'+Date.now()+'_'+Math.random().toString(36).slice(2,6),from:S.persona,text:txt,time:'Now',ts:Date.now(),trip:S.tripId};
  if(S._chatRef)msg.ref=S._chatRef;
  CHAT.push(msg);S._chatRef=null;
  saveChat();render();
  setTimeout(function(){var w=document.getElementById('chatwrap');if(w)window.scrollTo(0,document.body.scrollHeight);},30);
}
/* ── Chat reactions (thumbs + emojis) ───────────────────────── */
var CHAT_RXNS=['👍','👎','❤️','😂','🎉','😮'];
function chatReactions(m){
  var me=S.persona,rx=m.reactions||{},o='<div class="msg-rxns">';
  var keys=Object.keys(rx).filter(function(e){return rx[e]&&rx[e].length;});
  for(var i=0;i<keys.length;i++){var e=keys[i],arr=rx[e],on=arr.indexOf(me)>=0;
    var names=arr.map(function(id){return person(id)?person(id).name:'?';}).join(', ');
    var dots='';
    for(var di=0;di<arr.length&&di<4;di++){var pp=person(arr[di]);if(pp)dots+='<span class="rxn-dot" style="background:'+pp.color+'">'+esc(pp.name[0])+'</span>';}
    if(arr.length>4)dots+='<span class="rxn-more">+'+(arr.length-4)+'</span>';
    o+='<button class="rxn-chip'+(on?' on':'')+'" title="'+esc(names)+'" onclick="chatReact(\''+m.id+'\',\''+e+'\')">'+e+'<span class="rxn-who">'+dots+'</span></button>';
  }
  if(S._msgActive===m.id||S._reactFor===m.id){
    o+='<button class="rxn-add" title="Add reaction" onclick="chatToggleReactPicker(\''+m.id+'\')">'+(S._reactFor===m.id?'×':'＋')+'</button>';
    if(m.from===me){
      o+='<button class="rxn-act" onclick="chatEditStart(\''+m.id+'\')">Edit</button>';
      o+='<button class="rxn-act del" onclick="chatDelete(\''+m.id+'\')">Delete</button>';
    }
  }
  o+='</div>';
  if(S._reactFor===m.id){
    o+='<div class="rxn-bar">';
    for(var k=0;k<CHAT_RXNS.length;k++)o+='<button onclick="chatReact(\''+m.id+'\',\''+CHAT_RXNS[k]+'\')">'+CHAT_RXNS[k]+'</button>';
    o+='</div>';
  }
  return o;
}
function chatReact(id,emoji){
  var m=CHAT.filter(function(x){return x.id===id;})[0];if(!m)return;
  m.reactions=m.reactions||{};
  var arr=m.reactions[emoji]||[],ix=arr.indexOf(S.persona);
  if(ix>=0)arr.splice(ix,1);else arr.push(S.persona);
  if(arr.length)m.reactions[emoji]=arr;else delete m.reactions[emoji];
  S._reactFor=null;S._msgActive=null;saveChat();
  var y=window.scrollY;render();window.scrollTo(0,y);
}
function chatToggleReactPicker(id){
  S._reactFor=(S._reactFor===id?null:id);
  var y=window.scrollY;render();window.scrollTo(0,y);
}
/* tap a bubble to reveal its react button; long-press opens the emoji bar
   directly (iOS-style). A fired long-press suppresses the trailing click. */
function chatTapMsg(id){
  if(S._lpFired){S._lpFired=false;return;}
  S._msgActive=(S._msgActive===id?null:id);S._reactFor=null;
  var y=window.scrollY;render();window.scrollTo(0,y);
}
function chatPressStart(ev,id){
  S._lpFired=false;
  try{if(S._lpTimer)clearTimeout(S._lpTimer);}catch(e){}
  S._lpTimer=setTimeout(function(){S._lpFired=true;chatLongPress(id);},420);
}
function chatPressEnd(){try{if(S._lpTimer){clearTimeout(S._lpTimer);S._lpTimer=null;}}catch(e){}}
function chatLongPress(id){
  S._msgActive=id;S._reactFor=id;
  try{if(navigator.vibrate)navigator.vibrate(8);}catch(e){}
  var y=window.scrollY;render();window.scrollTo(0,y);
}
/* tapping an attached planned-item card jumps to that day's plan */
function chatJumpRef(id){
  var m=CHAT.filter(function(x){return x.id===id;})[0];if(!m||!m.ref)return;
  var TD=tripDays();
  if(m.ref.day){for(var i=0;i<TD.length;i++)if(TD[i].date===m.ref.day){S.dayIdx=i;break;}}
  S.tab='home';S.planView='dayplan';S.open.itin=true;   /* ensure the Day Plan is expanded */
  render();
  /* scroll to and flash the exact item in the Day Plan */
  var key=encodeURIComponent(m.ref.label||'');
  setTimeout(function(){
    var row=document.querySelector('.t-row[data-dpkey="'+key+'"]');
    if(row){try{row.scrollIntoView({block:'center',behavior:'smooth'});}catch(e){row.scrollIntoView();}
      row.classList.add('dp-flash');setTimeout(function(){row.classList.remove('dp-flash');},1800);}
    else{toast('Jumped to '+m.ref.label);}
  },80);
}
/* edit / delete your own messages */
function chatEditStart(id){
  var m=CHAT.filter(function(x){return x.id===id;})[0];if(!m||m.from!==S.persona)return;
  S._editMsg=id;S._msgActive=null;S._reactFor=null;
  render();
  setTimeout(function(){var e=document.getElementById('edit-'+id);if(e){e.focus();e.setSelectionRange(e.value.length,e.value.length);}},40);
}
function chatEditCancel(){S._editMsg=null;render();}
function chatEditSave(id){
  var m=CHAT.filter(function(x){return x.id===id;})[0];if(!m||m.from!==S.persona){S._editMsg=null;render();return;}
  var e=document.getElementById('edit-'+id);var v=e?e.value.trim():'';
  if(!v&&!m.ref){chatDelete(id);return;}   /* cleared to empty (and no card) → treat as delete */
  if(v!==m.text){m.text=v;m.edited=true;saveChat();}
  S._editMsg=null;render();toast('Message updated');
}
function chatDelete(id){
  var m=CHAT.filter(function(x){return x.id===id;})[0];if(!m||m.from!==S.persona)return;
  if(!confirm('Delete this message?'))return;
  CHAT=CHAT.filter(function(x){return x.id!==id;});
  S._editMsg=null;S._msgActive=null;S._reactFor=null;saveChat();render();toast('Message deleted');
}
/* attach a planned item to the next message (the "reminder / focus" card) */
function chatAttach(){
  /* start with every day collapsed except the one currently being viewed */
  S._chatRefOpen={};var cur=tripDays()[S.dayIdx];if(cur)S._chatRefOpen[cur.date]=true;
  openSheet({type:'chatref'});
}
function chatRefDay(date){
  S._chatRefOpen=S._chatRefOpen||{};S._chatRefOpen[date]=!S._chatRefOpen[date];
  var host=document.getElementById('sheet-host');
  if(host&&S.sheet){host.innerHTML=renderSheet();var b=host.firstChild;if(b)b.classList.add('in');}
}
function chatClearRef(){S._chatRef=null;var y=window.scrollY;render();window.scrollTo(0,y);}
function chatPickRef(i,j){
  var d=tripDays()[i];if(!d)return;var e=dayPlanItems(d)[j];if(!e)return;
  S._chatRef={type:e.type,label:e.x+(e.t?' · '+e.t:''),day:d.date};
  closeSheet();if(S.tab==='chat')render();
}
function renderChatRefSheet(){
  var h='<div class="sheet-backdrop" onclick="if(event.target===this)closeSheet()"><div class="sheet">';
  h+='<div class="sheet-grip"></div><div class="sheet-title">Attach a planned item</div>';
  h+='<div class="body-empty" style="text-align:left;padding:0 2px 8px">Pick something from the plan to share as a reminder or focus.</div>';
  var TD=tripDays(),any=false,open=S._chatRefOpen||{};
  for(var i=0;i<TD.length;i++){var d=TD[i],items=dayPlanItems(d);if(!items.length)continue;any=true;
    var isOpen=!!open[d.date];
    h+='<button class="chatref-day'+(isOpen?' open':'')+'" onclick="chatRefDay(\''+d.date+'\')"><span>'+monOf(d.date)+' '+d.d+' · '+d.dl+'</span><span class="chatref-day-r">'+items.length+' <span class="chatref-chev">'+(isOpen?IC.chevUp:IC.chevd)+'</span></span></button>';
    if(isOpen)for(var j=0;j<items.length;j++){var e=items[j];
      h+='<button class="chatref-opt" onclick="chatPickRef('+i+','+j+')">'+refIcon(e.type)+'<span>'+esc(e.x)+(e.t?' · '+esc(e.t):'')+'</span></button>';
    }
  }
  if(!any)h+='<div class="body-empty">Nothing planned yet to attach.</div>';
  h+='</div></div>';
  return h;
}

/* ============================================================
   PACKING  (per-trip, per-person sections, privacy-aware)
   ============================================================ */
function packingBody(){
  var me=S.persona;var o='';
  if(listOversight())o+=packScopeToggle();
  if(listOversight()&&S.pkScope==='all')return o+packEveryoneView();
  o+=packSticky(me);
  if((PACKING[me]||[]).some(function(c){return c.items&&c.items.length;}))o+=pkToolbar(pkAnyDone(me));
  if(!pkHasStarted(me))o+=packStarter();
  o+=packingPerson(me);
  return o;
}
function packStarter(){
  var n=PACKING_TMPL[S.persona]?PACKING_TMPL[S.persona].reduce(function(a,c){return a+(c.items?c.items.length:0);},0):0;
  var o='<div class="card" style="padding:14px;margin-bottom:12px">';
  o+='<div class="tmpl-title" style="margin-bottom:4px">Start your '+esc(trip().name)+' packing list</div>';
  o+='<div class="tmpl-sub" style="margin-bottom:10px">Begin from your global template'+(n?' ('+n+' item'+(n===1?'':'s')+')':'')+' or start with a blank list.</div>';
  o+='<div style="display:flex;gap:8px">';
  if(n)o+='<button class="btn-primary" style="margin:0;flex:1" onclick="pkStartFromTemplate()">Use my template</button>';
  o+='<button class="btn-secondary" style="margin:0;flex:1" onclick="pkStartEmpty()">Start empty</button>';
  o+='</div></div>';
  return o;
}
function packScopeToggle(){
  var all=S.pkScope==='all';
  return '<div class="seg" style="margin-bottom:12px"><button class="seg-btn'+(all?'':' on')+'" onclick="setPkScope(\'mine\')">My list</button>'
    +'<button class="seg-btn'+(all?' on':'')+'" onclick="setPkScope(\'all\')">Everyone</button></div>';
}
function setPkScope(s){S.pkScope=s;S.pkForm=null;ADD.pk=null;ADD.psect=null;S._pksect=null;S.listWho=null;S.pkStoreFilter=null;refreshLists();}
/* hide-packed preference (device-local) + toggle, mirrors the to-do version */
function pkHideDone(){try{return localStorage.getItem('bt_pkHideDone')==='1';}catch(e){return false;}}
function pkToggleHideDone(){try{localStorage.setItem('bt_pkHideDone',pkHideDone()?'0':'1');}catch(e){}refreshLists();}
function pkAnyDone(pid){var any=false;(PACKING[pid]||[]).forEach(function(c){(c.items||[]).forEach(function(it){if(it.done)any=true;});});return any;}
function pkHideToggle(anyDone){if(!anyDone)return '';return '<div style="display:flex;justify-content:flex-end;margin:-2px 2px 8px"><button class="lens-btn'+(pkHideDone()?' on':'')+'" onclick="pkToggleHideDone()">'+(pkHideDone()?'Show packed':'Hide packed')+'</button></div>';}
/* storage filter (suitcase / on-person / locker) shown left of the hide button */
function pkSetStoreFilter(v){S.pkStoreFilter=(S.pkStoreFilter===v)?null:v;refreshLists();}
function pkToolbar(anyDone){
  var f=S.pkStoreFilter;
  var o='<div class="pk-toolbar">';
  o+='<button class="sfil'+(f==='bag'?' on':'')+'" onclick="pkSetStoreFilter(\'bag\')">Suitcase</button>';
  o+='<button class="sfil'+(f==='person'?' on':'')+'" onclick="pkSetStoreFilter(\'person\')">On me</button>';
  o+='<button class="sfil'+(f==='locker'?' on':'')+'" onclick="pkSetStoreFilter(\'locker\')">Locker</button>';
  if(anyDone){
    o+='<span class="pk-sep"></span>';
    o+='<button class="lens-btn'+(pkHideDone()?' on':'')+'" onclick="pkToggleHideDone()">'+(pkHideDone()?'Show packed':'Hide packed')+'</button>';
  }
  return o+'</div>';
}
function packEveryoneView(){
  var mem=tripMembers();
  var o='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Everyone\'s packing lists for '+esc(trip().name)+'. As the trip owner or an admin you can edit any item.</div>';
  o+=personFilterRow(mem);
  o+=pkToolbar(mem.some(function(pid){return pkAnyDone(pid);}));
  mem.forEach(function(pid){if(S.listWho&&pid!==S.listWho)return;o+=packingPerson(pid);});
  return o;
}
function packSticky(pid){
  var done=0,tot=0;(PACKING[pid]||[]).forEach(function(c){(c.items||[]).forEach(function(it){tot++;if(it.done)done++;});});
  var pct=tot?Math.round(done/tot*100):0;
  return '<div class="plan-sticky"><div class="prog-label">'+done+' of '+tot+' packed</div>'
    +'<div class="prog-outer"><div class="prog-inner" style="width:'+pct+'%"></div></div>'
    +'<div class="prog-actions"><button class="prog-btn blu" onclick="pkSaveAsTemplate()">Save as my template</button></div></div>';
}
function pbHead(pid,done,total){var p=person(pid);
  return '<div class="person-block-hd"><span class="pbdot" style="background:'+p.color+'">'+p.name[0]+'</span><span class="pbname">'+esc(p.name)+(pid===S.persona?' (you)':'')+'</span><span class="pbcount">'+done+'/'+total+'</span></div>';
}
function packingPerson(pid){
  var editable=pkCanList(pid);
  var owner=(pid===S.persona);                 /* private items show only to their owner */
  function shown(it){return owner||!it.priv;}
  var cats=PACKING[pid]||(PACKING[pid]=[]),done=0,tot=0;
  cats.forEach(function(c){c.items.forEach(function(it){if(shown(it)){tot++;if(it.done)done++;}});});
  var o='';
  if(listOversight()&&S.pkScope==='all')o+=pbHead(pid,done,tot);
  for(var c=0;c<cats.length;c++){var cat=cats[c],vis=cat.items.filter(shown),cd=vis.filter(function(x){return x.done;}).length;
    o+='<div class="card">';
    if(S._pksect===pid+'|'+c){
      o+='<div class="add-row" style="padding:10px 12px"><input id="psname-inp" class="add-inp" value="'+esc(cat.cat)+'" onkeydown="if(event.key===\'Enter\')pkSectRenameOk(\''+pid+'\','+c+');if(event.key===\'Escape\')pkSectRenameCancel()">';
      o+='<button class="add-ok" onclick="pkSectRenameOk(\''+pid+'\','+c+')">Save</button><button class="add-cancel" onclick="pkSectRenameCancel()">&times;</button></div>';
      o+=(S._delsect==='ds_'+pid+'_'+c)
        ?'<div style="display:flex;gap:8px;align-items:center;margin:0 12px 10px"><button class="del-confirm-btn" onclick="pkSectDel(\''+pid+'\','+c+')">Delete section &amp; its items?</button><button class="add-link" style="padding:0" onclick="pkSectDelCancel()">Keep</button></div>'
        :'<button class="add-link" style="color:#B91C1C;padding-left:12px" onclick="pkSectDel(\''+pid+'\','+c+')">Delete this section</button>';
    }else{
      o+='<div class="cat-hdr"><div class="cat-name">'+esc(cat.cat)+'</div><div style="display:flex;align-items:center;gap:8px"><div class="cat-count">'+cd+'/'+vis.length+'</div>';
      if(editable)o+='<button class="hdr-icon" style="width:26px;height:26px;background:#F3F1EC;color:#6B7280" onclick="pkSectRenameOpen(\''+pid+'\','+c+')">'+IC.pencil+'</button>';
      o+='</div></div>';
    }
    for(var j=0;j<cat.items.length;j++){
      if(!shown(cat.items[j]))continue;                /* hide private items from non-owners */
      var pkEditing=S.pkForm&&S.pkForm.pid===pid&&S.pkForm.c===c&&S.pkForm.i===j;
      if(pkHideDone()&&cat.items[j].done&&!pkEditing)continue;   /* hide packed */
      if(S.pkStoreFilter&&pkStore(cat.items[j])!==S.pkStoreFilter&&!pkEditing)continue;   /* storage filter */
      if(pkEditing){o+=pkItemRow(pid,c,j,true)+pkItemEditor(pid,c,j);continue;}
      o+=pkItemRow(pid,c,j);
    }
    if(ADD.pk===pid+'_'+c){
      o+='<div class="add-row"><input id="pk-inp" class="add-inp" placeholder="Item name…" onkeydown="if(event.key===\'Enter\')pkOk(\''+pid+'\','+c+');if(event.key===\'Escape\')pkCancel()">';
      o+='<button class="add-ok" onclick="pkOk(\''+pid+'\','+c+')">Add</button><button class="add-cancel" onclick="pkCancel()">&times;</button></div>';
    }else if(editable)o+='<button class="add-link" onclick="pkAdd(\''+pid+'\','+c+')">'+IC.plus+' Add item</button>';
    o+='</div>';
  }
  if(editable){
    if(ADD.psect===pid){
      o+='<div class="add-row"><input id="psect-inp" class="add-inp" placeholder="New section name…" onkeydown="if(event.key===\'Enter\')pkSectOk(\''+pid+'\');if(event.key===\'Escape\')pkSectCancel()">';
      o+='<button class="add-ok" onclick="pkSectOk(\''+pid+'\')">Add</button><button class="add-cancel" onclick="pkSectCancel()">&times;</button></div>';
    }else o+='<button class="add-link" onclick="pkSectAdd(\''+pid+'\')">'+IC.plus+' Add section</button>';
  }
  return o;
}
function pkItemRow(pid,c,j,expanded){
  var it=PACKING[pid][c].items[j],pend=S._delpk==='d_'+pid+'_'+c+'_'+j,can=pkCanItem(pid,it);
  var subs=[];
  if(it.by&&it.by!==pid&&person(it.by))subs.push('Added by '+esc(person(it.by).name));
  if(it.needBuy){var bs=(it.who&&it.who.length)?it.who.map(function(p){var pp=person(p);return pp?esc(pp.name):'';}).filter(Boolean).join(', '):(person(pid)?esc(person(pid).name):'');subs.push('Buy · '+bs);}
  if(it.priv)subs.push(IC.lock+' Hidden');
  var drag=pkCanList(pid)&&!expanded&&!pkHideDone()&&!S.pkStoreFilter&&(PACKING[pid][c].items.length>1);
  var o='<div class="pk-row'+(expanded?' expanded':'')+(drag?' dgrow':'')+'"'+(drag?' data-dg="pk|'+pid+'|'+c+'" data-di="'+j+'"':'')+'>';
  if(drag)o+=dgHandle();
  o+='<div class="chkbox'+(it.done?' on':'')+'" onclick="pkChk(\''+pid+'\','+c+','+j+')">'+(it.done?IC.checkw:'')+'</div>';
  o+='<div class="pk-name'+(it.done?' done':'')+'" onclick="pkChk(\''+pid+'\','+c+','+j+')">'+esc(it.n)+(subs.length?'<div class="pk-by">'+subs.join(' · ')+'</div>':'')+'</div>';
  var pst=pkStore(it);
  if(pst==='locker')o+='<span class="lkr-tag">Locker</span>';
  else if(pst==='person')o+='<span class="lkr-tag onme">On me</span>';
  else o+='<div class="qty-wrap"><button class="qty-btn" onclick="pkDec(\''+pid+'\','+c+','+j+')">&#8722;</button><span class="qty-num">'+(it.qty||0)+'</span><button class="qty-btn" onclick="pkInc(\''+pid+'\','+c+','+j+')">+</button></div>';
  if(expanded)o+='<button class="hdr-icon pk-edit-on" style="width:30px;height:30px;flex-shrink:0" title="Close" onclick="pkItemCancel()">'+IC.chevUp+'</button>';
  else if(can&&!pend)o+='<button class="hdr-icon" style="width:30px;height:30px;background:'+(it.needBuy?'#FEF3C7;color:#92400E':'#F3F1EC;color:#6B7280')+';flex-shrink:0" onclick="pkItemEdit(\''+pid+'\','+c+','+j+')">'+IC.pencil+'</button>';
  if(pend){
    o+='<button class="del-confirm-btn" onclick="pkDel(\''+pid+'\','+c+','+j+')">Remove?</button>';
    o+='<button class="del-btn" title="Keep" onclick="pkDelCancel()">&times;</button>';
  }else if(can){
    o+='<button class="del-btn" onclick="pkDel(\''+pid+'\','+c+','+j+')">&times;</button>';
  }
  o+='</div>';
  return o;
}
function pkItemEditor(pid,c,j){
  var it=PACKING[pid][c].items[j];
  var o='<div class="inline-editor pk-acc">';
  o+='<div class="field" style="margin:0"><label class="field-label">Item</label><input class="field-input" id="pki-name" value="'+esc(it.n)+'"></div>';
  var est=pkStore(it);
  o+='<div class="field" style="margin:0"><label class="field-label">Storage</label><div class="seg seg3">'
    +'<button class="seg-btn'+(est==='bag'?' on':'')+'" onclick="pkSetStore(\'bag\')">Suitcase</button>'
    +'<button class="seg-btn'+(est==='person'?' on':'')+'" onclick="pkSetStore(\'person\')">On Person</button>'
    +'<button class="seg-btn'+(est==='locker'?' on':'')+'" onclick="pkSetStore(\'locker\')">Locker</button></div></div>';
  o+='<div class="field" style="margin:0"><label class="field-label">Need to buy</label><div class="seg"><button class="seg-btn'+(!it.needBuy?' on':'')+'" onclick="pkFormNeed(false)">No</button><button class="seg-btn'+(it.needBuy?' on book':'')+'" onclick="pkFormNeed(true)">Need to buy</button></div></div>';
  if(it.needBuy)o+=pkBuyerField();
  o+='<div class="field" style="margin:0"><label class="field-label">Privacy</label><div class="seg"><button class="seg-btn'+(!it.priv?' on':'')+'" onclick="pkFormPriv(false)">Visible</button><button class="seg-btn'+(it.priv?' on book':'')+'" onclick="pkFormPriv(true)">'+IC.lock+' Hidden</button></div></div>';
  if(it.priv)o+='<div class="priv-note">Hidden from the trip owner and admins, and kept off the shared Need to Buy list. Only you can see it — handy for surprises.</div>';
  o+=notifyField('Packing');
  o+='<div style="display:flex;gap:8px"><button class="btn-primary" style="margin:0;flex:1" onclick="pkItemSave()">Save</button><button class="btn-secondary" style="margin:0;flex:1" onclick="pkItemCancel()">Cancel</button></div>';
  o+='</div>';
  return o;
}
function pkBuyerField(){
  var mem=tripMembers();
  var h='<div class="field" style="margin:0"><label class="field-label">Who buys it <span class="opt">(defaults to who it\'s for)</span></label><div class="whoselect">';
  for(var i=0;i<mem.length;i++){var p=person(mem[i]);if(!p)continue;var on=S._who&&S._who.has(p.id);
    h+='<div class="who-opt'+(on?' on':'')+'" onclick="toggleWho(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';
  }
  return h+'</div></div>';
}
/* ============================================================
   TO DO  (per-trip, assignable, privacy-aware)
   ============================================================ */
function listContext(){return '<div class="pg-sub" style="margin:-2px 0 12px">'+esc(trip().name)+'</div>';}
function scrTodo(){
  return screenShell('To Do List',listContext()+'<div id="todo-body">'+todoBody()+'</div>',null,null,'Done');
}
function todoBody(){
  var me=S.persona;
  var o='';
  /* admins & the trip owner get a lens toggle; everyone defaults to their own list */
  if(todoOversight())o+=todoScopeToggle();
  if(todoOversight()&&S.tdScope==='all')return o+todoEveryoneView();
  /* personal view — identical for every user */
  var mine=tdMine(me), assigned=tdAssignedTo(me);
  o+=todoSticky(mine.concat(assigned));
  o+=todoHideToggle(mine.concat(assigned).some(function(t){return t.done;}));
  if(!tdHasStarted(me))o+=todoStarter();
  var hide=tdHideDone();
  var mineV=hide?mine.filter(tdNotDone):mine, assignedV=hide?assigned.filter(tdNotDone):assigned;
  /* My to-dos */
  var adding=S.tdForm&&S.tdForm.id===null;
  o+='<div class="hub-section-label" style="margin-left:0">My to-dos</div>';
  o+='<div class="card" style="padding:6px 0 0">';
  if(!adding)o+='<button class="add-link" onclick="tdAddOpen()">'+IC.plus+' Add task</button>';   /* add sits ABOVE the list */
  if(!mineV.length&&!adding)o+='<div class="body-empty" style="text-align:left;padding:6px 12px">'+(hide&&mine.length?'All done — nothing outstanding.':'Nothing here yet.')+'</div>';
  var tdDrag=!hide&&!adding&&mine.length>1;   /* reorder only when full unfiltered list shown */
  for(var i=0;i<mineV.length;i++)o+=todoRowOrEditor(mineV[i],tdDrag?{group:'td',idx:i}:null);
  if(adding)o+=todoEditor(null);   /* new task opens at the BOTTOM (tdAddOpen scrolls to it) */
  o+='</div>';
  /* Assigned to me by others */
  if(assignedV.length){
    o+='<div class="hub-section-label" style="margin-left:0">Assigned to me</div>';
    o+='<div class="card" style="padding:6px 0 0">';
    for(var j=0;j<assignedV.length;j++)o+=todoRowOrEditor(assignedV[j]);
    o+='</div>';
  }
  return o;
}
/* admin lens: switch between your own list and everyone\'s */
function todoScopeToggle(){
  var all=S.tdScope==='all';
  var o='<div class="seg" style="margin-bottom:12px">';
  o+='<button class="seg-btn'+(all?'':' on')+'" onclick="setTdScope(\'mine\')">My list</button>';
  o+='<button class="seg-btn'+(all?' on':'')+'" onclick="setTdScope(\'all\')">Everyone</button>';
  o+='</div>';
  return o;
}
function setTdScope(s){S.tdScope=s;S.tdForm=null;S.listWho=null;refreshTodo();}
/* admin-only oversight: each person\'s list across the trip */
function todoEveryoneView(){
  var o='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Everyone\'s to-do lists for '+esc(trip().name)+'. As the trip owner or an admin you can check, edit or remove any item.</div>';
  var mem=tripMembers(),hide=tdHideDone(),anyDone=false;
  var blocks=[];
  for(var p=0;p<mem.length;p++){var pid=mem[p];
    /* a person's list = what they created PLUS what others assigned to them, so an
       item you assign to someone shows up under THEM here (not just under you) */
    var items=tdMine(pid).concat(tdAssignedTo(pid)).filter(tdCanSee);
    var done=items.filter(function(t){return t.done;}).length;
    if(done)anyDone=true;
    if(S.listWho&&pid!==S.listWho)continue;   /* individual filter */
    var shown=hide?items.filter(tdNotDone):items;
    var b=pbHead(pid,done,items.length);
    b+='<div class="card" style="padding:6px 0 0">';
    if(!shown.length)b+='<div class="body-empty" style="text-align:left;padding:6px 12px">'+(hide&&items.length?'All done.':'No items.')+'</div>';
    for(var k=0;k<shown.length;k++)b+=todoRowOrEditor(shown[k]);
    b+='</div>';
    blocks.push(b);
  }
  return o+personFilterRow(mem)+todoHideToggle(anyDone)+blocks.join('');
}
function todoSticky(items){
  var total=items.length,done=items.filter(function(t){return t.done;}).length;
  var pct=total?Math.round(done/total*100):0;
  var o='<div class="plan-sticky">';
  o+='<div class="prog-label">'+done+' of '+total+' done</div>';
  o+='<div class="prog-outer"><div class="prog-inner" style="width:'+pct+'%"></div></div>';
  o+='<div class="prog-actions"><button class="prog-btn blu" onclick="tdSaveAsTemplate()">Save as my template</button></div></div>';
  return o;
}
function todoStarter(){
  var n=(TODO_TMPL[S.persona]&&TODO_TMPL[S.persona].length)||0;
  var o='<div class="card" style="padding:14px;margin-bottom:12px">';
  o+='<div class="tmpl-title" style="margin-bottom:4px">Start your '+esc(trip().name)+' to-do list</div>';
  o+='<div class="tmpl-sub" style="margin-bottom:10px">Begin from your global template'+(n?' ('+n+' item'+(n===1?'':'s')+')':'')+' or start with a blank list.</div>';
  o+='<div style="display:flex;gap:8px">';
  if(n)o+='<button class="btn-primary" style="margin:0;flex:1" onclick="tdStartFromTemplate()">Use my template</button>';
  o+='<button class="btn-secondary" style="margin:0;flex:1" onclick="tdStartEmpty()">Start empty</button>';
  o+='</div></div>';
  return o;
}
function todoRowOrEditor(t,drag){
  if(S.tdForm&&S.tdForm.id===t.id)return todoRow(t,true)+todoEditor(t);
  return todoRow(t,false,drag);
}
function todoRow(t,expanded,drag){
  var me=S.persona;
  var canEdit=tdCanEdit(t), amAssignee=t.who&&t.who.indexOf(me)>=0;
  var pend=S._deltd==='tdrm_'+t.id;
  var sub=[];
  if(t.who&&t.who.length)sub.push('Assigned to '+t.who.map(function(p){var pp=person(p);return pp?esc(pp.name):'';}).filter(Boolean).join(', '));
  if(!todoOversight()&&t.by!==me){var c=person(t.by);sub.push('From '+(c?esc(c.name):'someone'));}
  if(t.priv)sub.push(IC.lock+' Hidden');
  var dg=drag&&!expanded;
  var o='<div class="pk-row'+(expanded?' expanded':'')+(dg?' dgrow':'')+'"'+(dg?' data-dg="'+drag.group+'" data-di="'+drag.idx+'"':'')+'>';
  if(dg)o+=dgHandle();
  o+='<div class="chkbox'+(t.done?' on':'')+'" onclick="tdToggle(\''+t.id+'\')">'+(t.done?IC.checkw:'')+'</div>';
  var meta='';
  if(t.when)meta+='<span class="td-when">'+esc(t.when)+'</span>';
  if(sub.length)meta+='<span class="pk-by">'+sub.join(' · ')+'</span>';
  o+='<div class="pk-name'+(t.done?' done':'')+'" onclick="tdToggle(\''+t.id+'\')">'+esc(t.n)+(meta?'<div class="td-meta">'+meta+'</div>':'')+'</div>';
  if(expanded){
    o+='<button class="hdr-icon pk-edit-on" style="width:30px;height:30px;flex-shrink:0" title="Close" onclick="tdCancelForm()">'+IC.chevUp+'</button>';
  }else if(canEdit){
    if(pend){
      o+='<button class="del-confirm-btn" onclick="tdRemove(\''+t.id+'\')">Remove?</button>';
      o+='<button class="del-btn" title="Keep" onclick="tdRemoveCancel()">&times;</button>';
    }else{
      o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="tdEdit(\''+t.id+'\')">'+IC.pencil+'</button>';
      o+='<button class="del-btn" onclick="tdRemove(\''+t.id+'\')">&times;</button>';
    }
  }else if(amAssignee){
    o+='<button class="na-btn" onclick="tdUnassignMe(\''+t.id+'\')">Remove me</button>';
  }
  o+='</div>';
  return o;
}
function todoEditor(item){
  var creator=item?item.by:S.persona;
  var o='<div class="inline-editor'+(item?' pk-acc':'')+'">';
  if(!item)o+='<div class="inline-editor-title">'+IC.pencil+' New task</div>';
  o+='<div class="field" style="margin:0"><label class="field-label">Task</label><input class="field-input" id="td-name" placeholder="e.g. Refill prescriptions" value="'+(item?esc(item.n):'')+'"></div>';
  o+='<div class="field" style="margin:0"><label class="field-label">When <span class="opt">(optional)</span></label><input class="field-input" id="td-when" placeholder="e.g. 14 days" value="'+(item&&item.when?esc(item.when):'')+'"></div>';
  o+=todoAssignField(creator);
  o+='<div class="field" style="margin:0"><label class="field-label">Privacy</label><div class="seg"><button class="seg-btn'+(!S._tdPriv?' on':'')+'" onclick="tdFormPriv(false)">Visible</button><button class="seg-btn'+(S._tdPriv?' on book':'')+'" onclick="tdFormPriv(true)">'+IC.lock+' Hidden</button></div></div>';
  if(S._tdPriv)o+='<div class="priv-note">Hidden from the trip owner and admins. Anyone you assign it to still sees it; otherwise it\'s just yours.</div>';
  o+=notifyField('To Do');
  o+='<div style="display:flex;gap:8px"><button class="btn-primary" style="margin:0;flex:1" onclick="tdSave()">Save</button><button class="btn-secondary" style="margin:0;flex:1" onclick="tdCancelForm()">Cancel</button></div>';
  o+='</div>';
  return o;
}
function todoAssignField(creator){
  var mem=tripMembers().filter(function(id){return id!==creator;});
  var h='<div class="field" style="margin:0"><label class="field-label">Assign to <span class="opt">(optional — also shows on their list)</span></label>';
  if(!mem.length){h+='<div class="body-empty" style="text-align:left;padding:2px 0">No one else on this trip to assign to.</div>';return h+'</div>';}
  h+='<div class="whoselect">';
  for(var i=0;i<mem.length;i++){var p=person(mem[i]);if(!p)continue;var on=S._who&&S._who.has(p.id);
    h+='<div class="who-opt'+(on?' on':'')+'" onclick="toggleWho(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';
  }
  return h+'</div></div>';
}

/* ============================================================
   NAV
   ============================================================ */
function renderNav(){
  var tabs=[['home',IC.home,'Agenda'],['plan',IC.plan,'Plan'],['lists',IC.list,'Lists'],['chat',IC.chat,'Chat']];
  if(isAdmin())tabs.push(['admin',IC.gear,'Admin']);   /* admin-only tab, far right */
  var h='';
  for(var i=0;i<tabs.length;i++){var on=S.tab===tabs[i][0];
    var cu=chatUnread();
    var badge=(tabs[i][0]==='chat'&&cu>0)?'<span class="nbadge">'+(cu>9?'9+':cu)+'</span>':'';
    h+='<button class="nbtn'+(on?' on':'')+'" onclick="go(\''+tabs[i][0]+'\')">'+tabs[i][1]+badge+'<span>'+tabs[i][2]+'</span>'+(on?'<div class="nbtn-dot"></div>':'')+'</button>';
  }
  document.getElementById('bnav').innerHTML=h;
}

/* ============================================================
   OVERLAY (sheets + slide-in screens)
   ============================================================ */
function renderOverlay(){
  document.getElementById('sheet-host').innerHTML = S.sheet?renderSheet():'';
  document.getElementById('screen-host').innerHTML = S.screen?renderScreen():'';
}

/* person-filter sheet — the rare "show only these specific people" picker */
function renderPfilterSheet(){
  var mem=tripMembers();
  var h='<div class="sheet-backdrop" onclick="if(event.target===this)closeSheet()"><div class="sheet">';
  h+='<div class="sheet-grip"></div><div class="sheet-title">Filter by person</div>';
  h+='<div class="body-empty" style="text-align:left;padding:0 2px 10px">Pick specific people to see only their items. Leave empty to use Mine / Everyone / Not&nbsp;mine.</div>';
  h+='<div class="whoselect" style="margin:2px 0">';
  for(var i=0;i<mem.length;i++){var p=person(mem[i]);if(!p)continue;var on=S.filter.has(p.id);
    h+='<div class="who-opt'+(on?' on':'')+'" onclick="togglePersonFilter(\''+p.id+'\')">'
      +'<span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)
      +'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';
  }
  h+='</div>';
  h+='<div style="display:flex;gap:8px;margin-top:14px">';
  h+='<button class="btn-secondary" style="margin:0;flex:1" onclick="clearPersonFilter()">Clear</button>';
  h+='<button class="btn-secondary green" style="margin:0;flex:1" onclick="closeSheet()">Done</button>';
  h+='</div></div></div>';
  return h;
}
/* trip switcher */
function renderSheet(){
  if(S.sheet.type==='pfilter')return renderPfilterSheet();
  if(S.sheet.type==='chatref')return renderChatRefSheet();
  if(S.sheet.type!=='trips')return '';
  var today=new Date().toISOString().slice(0,10);
  var h='<div class="sheet-backdrop" onclick="if(event.target===this)closeSheet()"><div class="sheet">';
  h+='<div class="sheet-grip"></div><div class="sheet-title">Your Trips</div>';
  if(canCreateTrip())h+='<button class="btn-secondary green" style="margin:4px 18px 8px;width:calc(100% - 36px)" onclick="closeSheet();openScreen({type:\'newtrip\'})">'+IC.plus+' Plan a new trip</button>';
  var vis=visibleTrips();
  if(!vis.length) h+='<div class="body-empty" style="text-align:left;padding:6px 2px 4px">No trips yet. '+(canCreateTrip()?'Tap “Plan a new trip” above.':'Ask your group\'s owner to add you to a trip.')+'</div>';
  var upcoming=vis.filter(function(t){return !t.end||t.end>=today;});
  var past=vis.filter(function(t){return t.end&&t.end<today;});
  var sections=[];
  if(upcoming.length)sections.push(['Upcoming',upcoming]);
  if(past.length)sections.push(['Past Trips',past]);
  for(var g=0;g<sections.length;g++){
    h+='<div class="sheet-seclabel">'+sections[g][0]+'</div>';
    var list=sections[g][1];
    for(var i=0;i<list.length;i++){var t=list[i],on=t.id===S.tripId;
      var mc=(t.members?t.members.length:0);
      var own=(t.by&&person(t.by))?person(t.by):null;
      h+='<div class="trip-row'+(on?' on':'')+'" onclick="switchTrip(\''+t.id+'\')">';
      h+='<div class="trip-bar" style="background:'+t.color+'"></div>';
      h+='<div class="trip-main"><div class="trip-name">'+esc(t.name)+'</div>';
      h+='<div class="trip-sub">'+esc(t.dates)+' · '+mc+' '+(mc===1?'person':'people')+(own?' · Owner: '+esc(own.name)+(own.id===S.persona?' (you)':''):'')+'</div></div>';
      if(canEditTrip(t))
        h+='<button class="hdr-icon" style="width:34px;height:34px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="event.stopPropagation();closeSheet();openScreen({type:\'tripedit\',tripId:\''+t.id+'\'})">'+IC.pencil+'</button>';
      if(on)h+='<span class="trip-status ts-sel">'+IC.check+'</span>';
      h+='</div>';
    }
  }
  h+='</div></div>';
  return h;
}

/* slide-in screen router */
function renderScreen(){
  var t=S.screen.type;
  /* editing an existing item you don\'t own → limited view (with self-removal) */
  var EDIT={adddining:1,llbook:1,addll:1,addflight:1,resortedit:1,showedit:1,predit:1,ticketedit:1,visedit:1,hoursedit:1,rbedit:1,stopedit:1};
  if(EDIT[t]){var _it=screenItem();if(_it&&!canManage(_it))return scrLimitedItem(_it);}
  if(t==='addflight') return scrAddFlight();
  if(t==='adddining') return scrAddDining();
  if(t==='llbook')    return scrLLBook();
  if(t==='addll')     return scrAddLL();
  if(t==='import')    return scrImport();
  if(t==='csvimport') return scrCsvImport();
  if(t==='newtrip')   return scrNewTrip();
  if(t==='persona')   return scrPersona();
  if(t==='signin')    return scrSignIn();
  if(t==='authwait')  return scrAuthWait();
  if(t==='claim')     return scrClaim();
  if(t==='noaccess')  return scrNoAccess();
  if(t==='parties')   return scrParties();
  if(t==='partyedit') return scrPartyEdit();
  if(t==='personas')  return scrPersonas();
  if(t==='owners')    return scrOwners();
  if(t==='tenants')   return scrTenants();
  if(t==='tenant')    return scrTenant();
  if(t==='personedit') return scrPersonEdit();
  if(t==='persondetails') return scrPersonDetails();
  if(t==='alltrips')  return scrAllTrips();
  if(t==='dayedit')   return scrDayEdit();
  if(t==='parksplan') return scrParksPlan();
  if(t==='hoursplan') return scrHoursPlan();
  if(t==='strategyedit') return scrStrategyEdit();
  if(t==='predit')    return scrPREdit();
  if(t==='ticketedit')return scrTicketEdit();
  if(t==='visedit')   return scrVisitEdit();
  if(t==='hoursedit') return scrHoursEdit();
  if(t==='rbedit')    return scrRebookEdit();
  if(t==='stopedit')  return scrStopEdit();
  if(t==='showedit')  return scrShowEdit();
  if(t==='resortedit')return scrResortEdit();
  if(t==='tripedit')  return scrTripEdit();
  if(t==='lists')     return scrLists();
  if(t==='packlist')  return scrPackList();
  if(t==='todolist')  return scrTodo();
  if(t==='todotmpl')  return scrTodoTmpl();
  if(t==='packtmpl')  return scrPackTmpl();
  if(t==='needbuy')   return scrNeedBuy();
  if(t==='section')   return scrSection();
  if(t==='notifs')    return scrNotifs();
  if(t==='backups')   return scrBackups();
  if(t==='backupview')return scrBackupView();
  return scrGeneric();
}
function scrNotifs(){
  var list=notifsFor(S.persona);
  if(!list.length){
    markNotifsRead(S.persona);
    var empty='<div class="body-empty" style="text-align:left;padding:10px 2px">No notifications yet. When someone adds you to a plan, a ride, a dining reservation or a list — or needs you to act on a booking — it shows up here.</div>';
    return screenShell('Notifications',empty,null,null,'Done');
  }
  var groups={},order=[];
  list.forEach(function(n){if(!groups[n.trip]){groups[n.trip]=[];order.push(n.trip);}groups[n.trip].push(n);});
  var body='';
  order.forEach(function(tid){
    var t=tripById(tid);
    body+='<div class="hub-section-label" style="margin-left:0">'+esc(t?t.name:'Trip')+'</div>';
    groups[tid].forEach(function(n){
      body+='<div class="notif-item'+(n.read?'':' unread')+'">';
      body+='<span class="notif-dot '+notifKindCls(n.kind)+'">'+notifKindMark(n.kind)+'</span>';
      body+='<div class="notif-main"><div class="notif-text">'+esc(n.text)+'</div>';
      body+='<div class="notif-meta">'+esc(n.cat)+' · '+agoText(n.time)+'</div></div></div>';
    });
  });
  body+='<button class="btn-danger-link" onclick="clearNotifs()">Clear all</button>';
  markNotifsRead(S.persona);   /* viewing the page marks them read */
  return screenShell('Notifications',body,null,null,'Done');
}
function scrLimitedItem(it){
  var resp=creatorOf(it,it.trip);
  var by=(resp&&person(resp))?person(resp).name:'someone';
  var assigned=Array.isArray(it.who)?(it.who.indexOf(S.persona)>=0):(it.who==='all');
  var cat=CAT_OF[S.screen.type]||'';
  var act=isActionCat(cat);
  var nm=it.name||it.ride||it.show||it.resort||it.x||(it.park&&PARKS[it.park]?PARKS[it.park].name:'')||'This item';
  var body='<div class="hub-section-label" style="margin-left:0">'+esc(typeof nm==='string'?nm:'Item')+'</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 14px">Added by <strong>'+esc(by)+'</strong>. Only they, the trip owner, or an admin can edit or delete it.</div>';
  if(assigned){
    body+='<button class="btn-secondary" onclick="removeMe()">Remove me from this</button>';
    body+='<div class="body-empty" style="text-align:left;padding:8px 2px 0;font-size:12px">Takes you off this item — it stays for everyone else.'+(act?' Because this is a real booking, '+esc(by)+' is notified so they can update the reservation.':'')+'</div>';
  }else if(it.who==='all'){
    body+='<div class="body-empty" style="text-align:left;padding:0 2px">This includes everyone on the trip, so you\'re already on it.</div>';
  }else{
    body+='<button class="btn-secondary green" onclick="joinMe()">Add me to this</button>';
    body+='<div class="body-empty" style="text-align:left;padding:8px 2px 0;font-size:12px">'+(act?'Adds you to the group and notifies <strong>'+esc(by)+'</strong> to update the actual reservation.':'Adds you in — anyone on the trip can join.')+'</div>';
  }
  return screenShell('View',body,null,null,'Done');
}
function screenShell(title,bodyHtml,saveLabel,saveAction,cancelLabel,footerHtml,cancelAction){
  var h='<div class="screen"><div class="screen-hd">';
  /* cancelLabel===false → no dismiss button (e.g. the forced choose-persona screen) */
  h+=(cancelLabel===false)?'<div style="min-width:60px"></div>':('<button class="sh-btn" onclick="'+(cancelAction||'closeScreen()')+'">'+(cancelLabel||'Cancel')+'</button>');
  h+='<div class="sh-title">'+esc(title)+'</div>';
  h+=saveAction?('<button class="sh-btn right save" onclick="'+saveAction+'">'+(saveLabel||'Save')+'</button>'):'<div style="min-width:60px"></div>';
  h+='</div><div class="screen-body">'+bodyHtml+'</div>';
  if(footerHtml) h+='<div class="screen-foot">'+footerHtml+'</div>';
  h+='</div>';
  return h;
}

/* WhoSelect (form) — uses transient set S._who */
function whoSelectField(preselected){
  var mem=tripMembers();
  if(!S._who){S._who=new Set(preselected==='all'||!preselected?mem:preselected);}
  var h='<div class="field"><label class="field-label">Who is this for? <span class="opt">(defaults to everyone on the trip)</span></label><div class="whoselect">';
  for(var i=0;i<mem.length;i++){var p=person(mem[i]);if(!p)continue;var on=S._who.has(p.id);
    h+='<div class="who-opt'+(on?' on':'')+'" onclick="toggleWho(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';
  }
  return h+'</div></div>';
}
function toggleWho(id){if(S._who.has(id))S._who.delete(id);else S._who.add(id);
  var host=document.getElementById('screen-host');var s=host&&host.firstChild;var inClass=s&&s.classList.contains('in');
  renderScreen_inplace();
}
function renderScreen_inplace(){renderScreen_inplace2();}

function dayOptions(sel){var h='',TD=tripDays();for(var i=0;i<TD.length;i++){var d=TD[i];h+='<option value="'+d.date+'"'+(d.date===sel?' selected':'')+'>'+monOf(d.date)+' '+d.d+' · '+d.dl+'</option>';}return h;}

/* Add Flight (with connecting leg) */
function scrAddFlight(){
  var edit=S.screen.edit?FLIGHTS.filter(function(f){return f.id===S.screen.edit;})[0]:null;
  var pre=edit?edit.who:'all';
  if(S._formInit!=='flt'){S._formStatus.ff=edit?edit.status:'planning';S._formInit='flt';}
  var st=S._formStatus.ff;
  var legs=S.formLegs;
  var body='';
  body+='<div class="field"><label class="field-label">Journey label <span class="opt">(optional)</span></label><input class="field-input" id="ff-label" placeholder="e.g. Outbound, Return — Nancy & Cian" value="'+(edit?esc(edit.label):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg">';
  body+='<button class="seg-btn'+(st==='planning'?' on':'')+'" onclick="pickStatus(\'ff\',\'planning\')">Planning</button>';
  body+='<button class="seg-btn'+(st==='booked'?' on book':'')+'" onclick="pickStatus(\'ff\',\'booked\')">Booked</button></div></div>';
  body+=whoSelectField(pre);
  body+=notifyField('Flight');
  body+='<div class="field"><label class="field-label">Appears on day</label><select class="field-select" id="ff-day">'+dayOptions((edit&&edit.day)||S.screen.day||'2026-07-14')+'</select></div>';
  for(var i=0;i<legs;i++){
    var lg=edit&&edit.legs[i]?edit.legs[i]:null;
    body+='<div class="field-group"><div class="field-group-title">Leg '+(i+1)+(i>0?' <span style="text-transform:none;font-weight:600;color:#B91C1C;cursor:pointer" onclick="removeLeg()">Remove</span>':'')+'</div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">Airline</label><input class="field-input" id="ff-l'+i+'-airline" placeholder="Southwest" value="'+(lg?esc(lg.airline):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Flight #</label><input class="field-input" id="ff-l'+i+'-num" placeholder="WN 4657" value="'+(lg?esc(lg.num):'')+'"></div></div>';
    body+='<div class="field"><label class="field-label">Confirmation code</label><input class="field-input" id="ff-l'+i+'-conf" placeholder="2X4F9K" value="'+(lg?esc(lg.conf):'')+'"></div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">From</label><input class="field-input" id="ff-l'+i+'-depApt" placeholder="BOS" value="'+(lg?esc(lg.depApt):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Depart</label>'+timeField('ff-l'+i+'-depTime',lg?lg.depTime:'')+'</div></div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">To</label><input class="field-input" id="ff-l'+i+'-arrApt" placeholder="MCO" value="'+(lg?esc(lg.arrApt):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Arrive</label>'+timeField('ff-l'+i+'-arrTime',lg?lg.arrTime:'')+'</div></div>';
    body+='</div>';
  }
  body+='<button class="add-connecting" onclick="addLeg()">'+IC.plus+' Add connecting leg</button>';
  if(edit) body+='<button class="btn-danger-link" onclick="delFlight(\''+edit.id+'\')">Delete this flight</button>';
  return screenShell(edit?'Edit Flight':'Add Flight',body,'Save','saveFlight()');
}
function addLeg(){S.formLegs=(S.formLegs||1)+1;renderScreen_inplace2();}
function removeLeg(){S.formLegs=Math.max(1,(S.formLegs||1)-1);renderScreen_inplace2();}
/* hard in-place screen re-render: rebuild from the data model with NO input
   snapshot/restore. Use after STRUCTURAL changes (insert/delete/reorder in a
   list) where restoring old values by id would mis-apply them to shifted rows
   — callers must persist current input values into the model first. */
function renderScreenHard(){
  if(!S.screen){render();return;}
  var host=document.getElementById('screen-host');
  var oldBody=host.querySelector?host.querySelector('.screen-body'):null;
  var scrollTop=oldBody?oldBody.scrollTop:0;
  host.innerHTML=renderScreen();
  var nb=host.querySelector?host.querySelector('.screen-body'):null;
  if(nb&&scrollTop)nb.scrollTop=scrollTop;
  var s=host.firstChild;if(s)s.classList.add('in');
}
/* ── Drag-to-reorder (pointer-based, works on touch) ───────────
   A row opts in with class "dgrow", data-dg=<group>, data-di=<index>, and a
   child .drag-handle. While dragging we live-move the row among its same-group
   siblings; on drop we read the new data-di order and hand it to a per-group
   reorder. Lists with active filters must NOT render handles (indices wouldn't
   cover every item). */
function dgHandle(group,idx){return '<span class="drag-handle" onpointerdown="dgDown(event)" title="Drag to reorder">'+IC.grip+'</span>';}
var DRAG=null;
function dgRows(group){return Array.prototype.slice.call(document.querySelectorAll('.dgrow[data-dg="'+group+'"]'));}
function dgDown(ev){
  var row=ev.target.closest?ev.target.closest('.dgrow'):null;if(!row)return;
  ev.preventDefault();
  DRAG={group:row.getAttribute('data-dg'),row:row};
  row.classList.add('dragging');
  try{ev.target.setPointerCapture&&ev.target.setPointerCapture(ev.pointerId);}catch(_){}
  document.addEventListener('pointermove',dgMove,{passive:false});
  document.addEventListener('pointerup',dgUp);
  document.addEventListener('pointercancel',dgUp);
}
function dgMove(ev){
  if(!DRAG)return;ev.preventDefault();
  var dragged=DRAG.row,y=ev.clientY,rows=dgRows(DRAG.group),ref=null;
  for(var i=0;i<rows.length;i++){var r=rows[i];if(r===dragged)continue;var rc=r.getBoundingClientRect();if(y<rc.top+rc.height/2){ref=r;break;}}
  if(ref){if(dragged.nextSibling!==ref)dragged.parentNode.insertBefore(dragged,ref);}
  else{var last=rows[rows.length-1];if(last&&last!==dragged)last.parentNode.insertBefore(dragged,last.nextSibling);}
}
function dgUp(){
  document.removeEventListener('pointermove',dgMove);
  document.removeEventListener('pointerup',dgUp);
  document.removeEventListener('pointercancel',dgUp);
  if(!DRAG)return;
  var group=DRAG.group;if(DRAG.row)DRAG.row.classList.remove('dragging');
  var order=dgRows(group).map(function(r){return parseInt(r.getAttribute('data-di'),10);});
  DRAG=null;
  dgApply(group,order);
}
function dgApply(group,order){
  S.pkForm=null;S.ptForm=null;S.ttForm=null;   /* close index-based editors so a shifted index can't mis-target */
  function permute(arr){var out=order.map(function(i){return arr[i];}).filter(function(x){return x!==undefined;});return (out.length===arr.length)?out:arr;}
  var p=group.split('|');
  if(p[0]==='pk'){var pid=p[1],c=+p[2];if(PACKING[pid]&&PACKING[pid][c]){PACKING[pid][c].items=permute(PACKING[pid][c].items);saveLists();refreshLists();}}
  else if(p[0]==='pt'){var c2=+p[1];if(PACKING_TMPL[S.persona]&&PACKING_TMPL[S.persona][c2]){PACKING_TMPL[S.persona][c2].items=permute(PACKING_TMPL[S.persona][c2].items);renderScreenHard();}}
  else if(p[0]==='tt'){TODO_TMPL[S.persona]=permute(TODO_TMPL[S.persona]||[]);renderScreenHard();}
  else if(p[0]==='td'){dgReorderTodoMine(order);}
}
/* reorder the current persona's own to-dos within TODO, keeping everything else */
function dgReorderTodoMine(order){
  var me=S.persona,tid=S.tripId,positions=[],mine=[];
  for(var i=0;i<TODO.length;i++){if(TODO[i].trip===tid&&TODO[i].by===me){positions.push(i);mine.push(TODO[i]);}}
  var reordered=order.map(function(k){return mine[k];}).filter(Boolean);
  if(reordered.length!==mine.length)return;
  for(var j=0;j<positions.length;j++)TODO[positions[j]]=reordered[j];
  saveTODO();refreshTodo();
}
function renderScreen_inplace2(){
  if(!S.screen){render();return;}
  var host=document.getElementById('screen-host');
  var snap={};
  var oldBody=host.querySelector?host.querySelector('.screen-body'):null;
  var scrollTop=oldBody?oldBody.scrollTop:0;
  if(host.querySelectorAll){var olds=host.querySelectorAll('input,select,textarea');for(var i=0;i<olds.length;i++){if(olds[i].id)snap[olds[i].id]=olds[i].value;}}
  host.innerHTML=renderScreen();
  if(host.querySelectorAll){var news=host.querySelectorAll('input,select,textarea');for(var j=0;j<news.length;j++){if(news[j].id&&(news[j].id in snap))news[j].value=snap[news[j].id];}}
  var newBody=host.querySelector?host.querySelector('.screen-body'):null;
  if(newBody&&scrollTop)newBody.scrollTop=scrollTop;   /* keep scroll across in-place re-renders */
  var s=host.firstChild;if(s)s.classList.add('in');
}
S._formStatus={};
function pickStatus(form,val){S._formStatus[form]=val;renderScreen_inplace2();}
function saveFlight(){
  var edit=S.screen.edit?FLIGHTS.filter(function(f){return f.id===S.screen.edit;})[0]:null;
  var dy=val('ff-day')||S.screen.day||'2026-07-14';
  var legs=[];
  for(var i=0;i<S.formLegs;i++){
    var ap=val('ff-l'+i+'-depApt'),aap=val('ff-l'+i+'-arrApt');
    legs.push({airline:val('ff-l'+i+'-airline'),num:val('ff-l'+i+'-num'),conf:val('ff-l'+i+'-conf'),
      depApt:ap,depCity:ap,depTime:val('ff-l'+i+'-depTime'),depDate:dy,
      arrApt:aap,arrCity:aap,arrTime:val('ff-l'+i+'-arrTime'),arrDate:dy});
  }
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'f'+Date.now(),trip:S.tripId,by:S.persona};
  rec.label=val('ff-label')||'Flight';rec.day=dy;rec.who=whoVal();
  rec.status=S._formStatus.ff||'planning';rec.legs=legs;
  if(!edit)FLIGHTS.push(rec);
  save('dtp_flights',FLIGHTS);afterWhoSave('Flight',rec,oldWho);S._who=null;toast('Flight saved');closeScreen();render();
}
function delFlight(id){
  var it=FLIGHTS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  for(var i=0;i<FLIGHTS.length;i++)if(FLIGHTS[i].id===id){FLIGHTS.splice(i,1);break;}
  save('dtp_flights',FLIGHTS);notifyDelete('Flight',it);toast('Flight removed');closeScreen();render();
}

/* Add Dining */
function scrAddDining(){
  var edit=S.screen.edit?DINING.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  if(S._formInit!=='din'){S._formStatus.dd=edit?edit.status:'want';S._formLoc=edit?edit.loc:'in';S._formInit='din';}
  var st=S._formStatus.dd,loc=S._formLoc,pre=edit?edit.who:'all';
  var meals=['Breakfast','Lunch','Dinner','Drinks','Snack'];
  var body='';
  body+='<div class="field"><label class="field-label">Restaurant</label><input class="field-input" id="dd-name" placeholder="e.g. Space 220" value="'+(edit?esc(edit.name):'')+'"></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Meal</label><select class="field-select" id="dd-meal">';
  for(var m=0;m<meals.length;m++)body+='<option'+((edit&&edit.meal===meals[m])||(!edit&&meals[m]==='Dinner')?' selected':'')+'>'+meals[m]+'</option>';
  body+='</select></div>';
  body+='<div class="field"><label class="field-label">Time</label>'+timeField('dd-time',edit?edit.time:'')+'</div></div>';
  body+='<div class="field"><label class="field-label">Status <span class="opt">(Reserved & Planned show on the Day Plan)</span></label><div class="seg">';
  body+='<button class="seg-btn'+(st==='want'?' on':'')+'" onclick="pickStatus(\'dd\',\'want\')">Want to Try</button>';
  body+='<button class="seg-btn'+(st==='planned'?' on':'')+'" onclick="pickStatus(\'dd\',\'planned\')">Planned</button>';
  body+='<button class="seg-btn'+(st==='reserved'?' on book':'')+'" onclick="pickStatus(\'dd\',\'reserved\')">Reserved</button></div></div>';
  if(st==='reserved') body+='<div class="field"><label class="field-label">Confirmation #</label><input class="field-input" id="dd-conf" placeholder="DR-118455" value="'+(edit&&edit.conf?esc(edit.conf):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Location</label><div class="seg"><button class="seg-btn'+(loc==='in'?' on':'')+'" onclick="pickLoc(\'in\')">In-Park</button><button class="seg-btn'+(loc==='off'?' on':'')+'" onclick="pickLoc(\'off\')">Non-Park</button></div></div>';
  if(loc==='in'){var _dy=(edit&&edit.day)||S.screen.day||'2026-07-15';body+='<div class="field"><label class="field-label">Which park</label><select class="field-select" id="dd-park">'+parkResOptions((edit&&edit.park)||dayPrimaryPark(_dy)||'mk')+'</select></div>';}
  body+=whoSelectField(pre);
  body+=notifyField('Dining');
  body+='<div class="field"><label class="field-label">Appears on day</label><select class="field-select" id="dd-day">'+dayOptions((edit&&edit.day)||S.screen.day||'2026-07-15')+'</select></div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delDining(\''+edit.id+'\')">Delete this reservation</button>';
  if(edit)body+=rsvpFormSection(edit);
  return screenShell(edit?'Edit Dining':'Add Dining',body,'Save','saveDining()');
}
function saveDining(){
  var edit=S.screen.edit?DINING.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var nm=val('dd-name');
  if(!nm){toast('Add a restaurant name');return;}
  var dy=val('dd-day')||S.screen.day||'2026-07-15';
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'d'+Date.now(),trip:S.tripId,by:S.persona};
  rec.day=dy;rec.meal=val('dd-meal')||'Dinner';rec.name=nm;rec.time=val('dd-time')||'TBD';
  rec.loc=S._formLoc||'in';rec.park=(S._formLoc==='in')?(val('dd-park')||dayPrimaryPark(dy)):null;
  rec.status=S._formStatus.dd||'want';rec.conf=val('dd-conf')||'';rec.who=whoVal();
  if(!edit)DINING.push(rec);
  save('dtp_dining',DINING);afterWhoSave('Dining',rec,oldWho);S._who=null;toast('Dining saved');closeScreen();render();
}
function delDining(id){
  var it=DINING.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  for(var i=0;i<DINING.length;i++)if(DINING[i].id===id){DINING.splice(i,1);break;}
  save('dtp_dining',DINING);notifyDelete('Dining',it);toast('Reservation removed');closeScreen();render();
}

/* LL: Planning → Booked */
function scrLLBook(){
  var l=LLS.filter(function(x){return x.id===S.screen.id;})[0];
  var body='';
  body+='<div class="field-group"><div class="field-group-title">Ride</div>';
  body+='<div style="display:flex;align-items:center;gap:10px"><div class="ll-ride" style="font-size:20px">'+esc(l.ride)+'</div><span class="ll-tag '+tagCls(l.tier)+'">'+tagLbl(l.tier)+'</span></div>';
  body+='<div class="ll-win" style="margin-top:8px">Planned window: '+esc(l.window)+'</div></div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg"><button class="seg-btn" onclick="toast(\'Already planning\')">Planning</button><button class="seg-btn on book">Booked</button></div></div>';
  body+='<div class="field"><label class="field-label">Confirmed return time</label>'+timeField('llb-time','')+'</div>';
  body+='<div class="field"><label class="field-label">Confirmation #</label><input class="field-input" id="llb-conf" placeholder="MP-00000"></div>';
  body+=whoSelectField(l.who);
  body+=notifyField('Lightning Lane');
  body+='<div class="body-empty" style="text-align:left;padding:4px 2px 0">Marking this booked switches it from a dashed planning card to a solid confirmed one across the Agenda and Overview.</div>';
  return screenShell('Update Lightning Lane',body,'Save','saveLLBook()');
}
function saveLLBook(){
  var l=LLS.filter(function(x){return x.id===S.screen.id;})[0];
  var tm=document.getElementById('llb-time'),cf=document.getElementById('llb-conf');
  l.status='booked';
  l.bookedTime=(tm&&tm.value.trim())||l.window.replace(/[~]/g,'').split('–')[0].trim();
  l.conf=(cf&&cf.value.trim())||'MP-'+Math.floor(10000+Math.random()*89999);
  var oldWho=l.who;
  if(S._who)l.who=whoVal();
  save('dtp_lls',LLS);afterWhoSave('Lightning Lane',l,oldWho);S._who=null;toast(l.ride+' booked');closeScreen();render();
}
function scrAddLL(){
  var edit=S.screen.edit?LLS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  if(S._formInit!=='ll'){S._formTier=edit?edit.tier:'sp';S._formStatus.ll=edit?edit.status:'planning';S._formInit='ll';}
  var tier=S._formTier,stt=S._formStatus.ll,pre=edit?edit.who:'all';
  var body='<div class="field"><label class="field-label">Ride</label><input class="field-input" id="ll-ride" placeholder="e.g. Peter Pan\'s Flight" value="'+(edit?esc(edit.ride):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Tier</label><div class="seg">';
  body+='<button class="seg-btn'+(tier==='sp'?' on':'')+'" onclick="pickTier(\'sp\')">SP</button>';
  body+='<button class="seg-btn'+(tier==='mp1'?' on':'')+'" onclick="pickTier(\'mp1\')">T1</button>';
  body+='<button class="seg-btn'+(tier==='mp2'?' on':'')+'" onclick="pickTier(\'mp2\')">T2</button></div></div>';
  body+='<div class="field"><label class="field-label">Status <span class="opt">(only Booked shows on the Day Plan)</span></label><div class="seg">';
  body+='<button class="seg-btn'+(stt==='planning'?' on':'')+'" onclick="pickStatus(\'ll\',\'planning\')">Planned</button>';
  body+='<button class="seg-btn'+(stt==='booked'?' on book':'')+'" onclick="pickStatus(\'ll\',\'booked\')">Booked</button></div></div>';
  body+='<div class="field"><label class="field-label">Planned window</label><input class="field-input" id="ll-window" placeholder="~3:00–4:00 PM" value="'+(edit?esc(edit.window):'')+'"></div>';
  if(stt==='booked'){
    body+='<div class="field"><label class="field-label">Confirmed return time</label>'+timeField('ll-btime',edit&&edit.bookedTime?edit.bookedTime:'')+'</div>';
    body+='<div class="field"><label class="field-label">Confirmation #</label><input class="field-input" id="ll-conf" placeholder="MP-44190" value="'+(edit&&edit.conf?esc(edit.conf):'')+'"></div>';
  }
  body+=whoSelectField(pre);
  body+=notifyField('Lightning Lane');
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="ll-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delLL(\''+edit.id+'\')">Delete this ride</button>';
  if(edit)body+=rsvpFormSection(edit);
  return screenShell(edit?'Edit Ride':'Add Ride',body,'Save','saveLL()');
}
function pickTier(v){S._formTier=v;renderScreen_inplace2();}
function saveLL(){
  var edit=S.screen.edit?LLS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var ride=val('ll-ride');
  if(!ride){toast('Add a ride name');return;}
  var dy=val('ll-day')||S.screen.day;
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'ll'+Date.now(),trip:S.tripId,by:S.persona,bookedTime:'',conf:'',bookDate:''};
  rec.day=dy;rec.park=dayPrimaryPark(dy);rec.ride=ride;
  rec.tier=S._formTier||'sp';rec.window=val('ll-window')||'~TBD';rec.who=whoVal();
  rec.status=S._formStatus.ll||'planning';
  if(rec.status==='booked'){
    rec.bookedTime=val('ll-btime')||(rec.window?rec.window.replace(/[~]/g,'').split('–')[0].trim():'');
    rec.conf=val('ll-conf')||rec.conf||'MP-'+Math.floor(10000+Math.random()*89999);
  }
  if(!edit)LLS.push(rec);
  save('dtp_lls',LLS);afterWhoSave('Lightning Lane',rec,oldWho);S._who=null;toast('Ride saved');closeScreen();render();
}
function delLL(id){
  var it=LLS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  confirmCritical('Lightning Lane',function(){
    for(var i=0;i<LLS.length;i++)if(LLS[i].id===id){LLS.splice(i,1);break;}
    save('dtp_lls',LLS);notifyDelete('Lightning Lane',it);toast('Ride removed');closeScreen();render();
  });
}

/* ============================================================
   AI IMPORT  (admin-only paste tool)
   You parse a confirmation with Claude (in the Claude app), Claude returns
   JSON in the format below, you paste it here, review, and save into the
   current trip. No server, no API key — Claude is the brain, this is the catcher.
   ============================================================ */
var IMPORT_PARKS={mk:'Magic Kingdom',ep:'EPCOT',hs:'Hollywood Studios',ak:'Animal Kingdom'};
/* the recipe we hand Claude so its JSON matches the app exactly */
function importPromptText(){
  return [
'You are turning Walt Disney World reservation and park-schedule details into JSON for my trip planner app.',
'Read the confirmation I paste next and reply with ONLY a JSON object, wrapped in a ```json code block (this keeps the quotes intact when I copy it), shaped like:',
'',
'```json',
'{ "items": [ ... ] }',
'```',
'',
'Each item has a "type" and these fields (use YYYY-MM-DD for all dates, omit anything you cannot find):',
'',
'• resort:    {"type":"resort","name":"","room":"","checkin":"","checkout":"","inTime":"4:00 PM","outTime":"11:00 AM","conf":"","status":"booked"}',
'• dining:    {"type":"dining","name":"","day":"","meal":"Breakfast|Lunch|Dinner|Drinks","time":"7:40 PM","park":"mk|ep|hs|ak (omit if not in a park)","loc":"in|off","conf":"","status":"reserved|want|planned"}',
'• lightning: {"type":"lightning","ride":"","day":"","park":"mk|ep|hs|ak","tier":"sp|mp1|mp2","status":"booked|planning","bookedTime":"9:45 AM","window":"10:00–10:30","conf":""}',
'   (tier: sp = Single/Individual Lightning Lane, mp1 = Multi Pass tier 1, mp2 = Multi Pass tier 2; window = the ride-time window if given)',
'• rebook:    {"type":"rebook","day":"","afterRide":"Jungle Cruise","text":"Buzz Lightyear"}',
'   (a ROLLING re-book: after you tap into the Multi Pass ride named in afterRide, book what is in text. afterRide MUST exactly match the "ride" of a lightning item above on the SAME day so they link up. List them in tap order. Omit afterRide for a standalone reminder. This is the "in-park rolling re-books — book each right after you tap the prior one" pattern.)',
'• parkres:   {"type":"parkres","day":"","park":"mk|ep|hs|ak","status":"booked|planning"}',
'• parkhours: {"type":"parkhours","day":"","park":"mk|ep|hs|ak","open":"9:00 AM","close":"10:00 PM","early":"8:30 AM","late":"11:00 PM","crowd":5}',
'   (early = Early Theme Park Entry start time for eligible resort guests; late = Extended Evening Hours / late close time — OMIT early and/or late if that park has none that day; crowd = expected crowd level 1-10, omit if unknown. One parkhours item per park per day.)',
'• show:      {"type":"show","name":"","day":"","time":"9:00 PM","park":"mk|ep|hs|ak (optional)","status":"attend|scheduled"}',
'• flight:    {"type":"flight","label":"Outbound|Return","day":"","status":"booked|planning","legs":[',
'     {"airline":"","num":"WN 4657","conf":"","depApt":"BOS","depCity":"Boston","depTime":"5:45 AM","depDate":"","arrApt":"MCO","arrCity":"Orlando","arrTime":"11:50 AM","arrDate":""} ]}',
'• day:       {"type":"day","day":"","headline":"Magic Kingdom","blurb":"short line under the headline","strategy":"The plan / verbiage for the day. Use blank lines to start a new paragraph.","tags":["Activate APs"],"alert":"optional heads-up"}',
'   (day-level VERBIAGE for one date — the strategy narrative, headline, blurb, tags and any alert. The first sentence of strategy shows as “The plan” on the Day Plan. One day item per date; it UPDATES the existing day, so omit any field you do not have.)',
'• todo:      {"type":"todo","text":"Airline online check-in","when":"24h before"}',
'   (a to-do / checklist task for the trip. when = optional timing label.)',
'• packing:   {"type":"packing","section":"Health","item":"Sunblock","qty":1,"needBuy":false}',
'   (a packing-list item, grouped under section. qty optional. needBuy:true flags it as “need to get”.)',
'',
'Status — default to "not booked yet" unless I clearly have it confirmed:',
'• Lightning Lane: "planning" until actually booked; "booked" only with a real return time/confirmation (omit bookedTime and conf until then).',
'• Flight: "planning" until ticketed; "booked" when confirmed.',
'• Resort / Park reservation: "booked" if there is a confirmation #/it is made; otherwise "planning".',
'• Dining: "reserved" ONLY with a confirmation #; "planned" = intend to book; "want" = wishlist.',
'• Show: "attend" = committed; "scheduled" = tentative.',
'',
'For dining, use loc:"in" with a park if it is inside a park, or loc:"off" (omit park) for resort / Disney Springs / Dolphin / Swan restaurants.',
'',
'Return one item per reservation (a Lightning Lane plan = many lightning items). If something is ambiguous, make your best guess and still include it.'
  ].join('\n');
}
function copyImportPrompt(){
  var t=importPromptText();
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(t).then(function(){toast('Instructions copied — paste them to Claude');},function(){toast('Copy failed — select the text manually');});
      return;
    }
  }catch(e){}
  toast('Copy not supported here');
}
/* tolerant JSON parse: normalises "smart" quotes (chat apps turn straight
   quotes curly when you copy plain text, which breaks JSON.parse), strips code
   fences, and grabs the first {...} block. */
function parseImportText(raw){
  if(!raw||!raw.trim())return null;
  var s=raw
    .replace(/[“”„‟″‶]/g,'"')   /* curly/smart double quotes → " */
    .replace(/[''‚‛′‵]/g,"'")   /* curly/smart single quotes → ' */
    .trim().replace(/^```(json)?/i,'').replace(/```$/,'').trim();
  try{return JSON.parse(s);}catch(e){}
  var a=s.indexOf('{'),b=s.lastIndexOf('}');
  if(a>=0&&b>a){try{return JSON.parse(s.slice(a,b+1));}catch(e2){}}
  return null;
}
function impId(p){return p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function impDate(d){return (typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d.trim()))?d.trim():'';}
function impPark(p){p=(p||'').toLowerCase();return IMPORT_PARKS[p]?p:'';}
function impDLabel(d){return (d&&/^\d{4}-\d{2}-\d{2}$/.test(d))?monOf(d)+' '+(+d.slice(8)):'';}
/* one-line summary for a built record — reused by build + the inline editor */
function importSummary(type,rec){
  if(!rec)return '';
  if(type==='Resort')return rec.name+(rec.room?' · '+rec.room:'')+(impDLabel(rec.checkin)?' · '+impDLabel(rec.checkin):'');
  if(type==='Dining')return rec.name+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'')+(rec.time?' · '+rec.time:'');
  if(type==='Lightning Lane')return rec.ride+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'')+' · '+tagShort(rec.tier);
  if(type==='Park reservation')return (IMPORT_PARKS[rec.park]||'?')+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'');
  if(type==='Park hours'){var hrs=rec.open?rec.open+(rec.close?'–'+rec.close:''):'';var ex=[];if(rec.early)ex.push('EE '+rec.early);if(rec.late)ex.push('Late '+rec.late);return (IMPORT_PARKS[rec.park]||'?')+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'')+(hrs?' · '+hrs:'')+(ex.length?' · '+ex.join(' · '):'');}
  if(type==='Re-book')return (rec.afterRide?'After '+rec.afterRide+' → ':'')+(rec.text||'')+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'');
  if(type==='Show')return rec.name+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'')+(rec.time?' · '+rec.time:'');
  if(type==='Flight'){var f=(rec.legs&&rec.legs[0])||{},l=(rec.legs&&rec.legs[rec.legs.length-1])||{};return rec.label+' · '+(f.depApt||'?')+' → '+(l.arrApt||'?')+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'');}
  if(type==='Day'){var lead=rec.visit||rec.blurb||(rec.strategy?firstSentence(rec.strategy):'')||'(notes)';return (impDLabel(rec.day)||'?')+' · '+lead;}
  if(type==='To Do')return (rec.n||'')+(rec.when?' · '+rec.when:'');
  if(type==='Packing')return (rec.section||'General')+' · '+(rec.n||'')+(rec.qty>1?' ×'+rec.qty:'');
  return '';
}
/* build one real record from a loose imported item → {type,rec,summary,error}.
   A record is always built (best-effort) so it stays editable; `error` is set
   when a required field is missing, and cleared once the user fills it in. */
var IMPORT_REQ_LBL={name:'a name',day:'a date',ride:'a ride',park:'a park',label:'a label'};
function finalizeImport(type,rec){
  var miss=(IMPORT_REQ[type]||[]).filter(function(k){return !rec[k];});
  var o={type:type,rec:rec,summary:importSummary(type,rec)};
  if(miss.length)o.error=type+' needs '+miss.map(function(k){return IMPORT_REQ_LBL[k]||k;}).join(' & ');
  return o;
}
function buildImportItem(it){
  if(!it||typeof it!=='object')return {type:'?',error:'Not a valid item'};
  var t=(it.type||'').toLowerCase(),tid=S.tripId;
  function base(extra){var o={id:impId(t[0]||'x'),trip:tid,who:'all'};for(var k in extra)o[k]=extra[k];return o;}
  if(t==='resort'){
    return finalizeImport('Resort',base({name:it.name?String(it.name):'',room:it.room||'',checkin:impDate(it.checkin),checkout:impDate(it.checkout),
      inTime:it.inTime||'4:00 PM',outTime:it.outTime||'11:00 AM',conf:it.conf||'',status:it.status||'booked'}));
  }
  if(t==='dining'){
    var rec2=base({name:it.name?String(it.name):'',day:impDate(it.day),meal:it.meal||'Dinner',time:it.time||'',
      loc:(it.loc==='off'?'off':'in'),status:it.status||'reserved',conf:it.conf||'',park:impPark(it.park)});
    return finalizeImport('Dining',rec2);
  }
  if(t==='lightning'||t==='ll'||t==='lightninglane'){
    var tier=({sp:'sp',mp1:'mp1',mp2:'mp2'})[(it.tier||'').toLowerCase()]||'mp1';
    return finalizeImport('Lightning Lane',base({ride:it.ride?String(it.ride):'',day:impDate(it.day),park:impPark(it.park),tier:tier,
      status:it.status==='booked'?'booked':'planning',window:it.window||'',bookedTime:it.bookedTime||'',conf:it.conf||'',bookDate:it.bookDate||''}));
  }
  if(t==='parkres'||t==='park reservation'){
    return finalizeImport('Park reservation',base({day:impDate(it.day),park:impPark(it.park),status:it.status||'booked'}));
  }
  if(t==='parkhours'||t==='hours'||t==='park hours'){
    /* park hours are a FACT about a park on a date — not assigned to anyone, so
       no `who` (which keeps them out of the notify picker). Shape mirrors the
       saveHours() record exactly. */
    var crowd=parseInt(it.crowd,10);
    return finalizeImport('Park hours',{id:impId('h'),trip:tid,park:impPark(it.park),day:impDate(it.day),
      open:it.open||'',close:it.close||'',early:it.early||'',late:it.late||'',
      crowd:(crowd>=1&&crowd<=10)?crowd:null});
  }
  if(t==='rebook'||t==='rolling'||t==='rollingrebook'||t==='re-book'){
    /* `after` (an LL id) is resolved from afterRide at SAVE time, once every
       Lightning Lane in the batch has its generated id — we match by ride name
       + day there. who:'all' so the roll shows for everyone in the Day Plan. */
    return finalizeImport('Re-book',base({day:impDate(it.day),text:it.text?String(it.text):'',
      after:'',afterRide:(it.afterRide||it.after||'')+''}));
  }
  if(t==='show'){
    return finalizeImport('Show',base({name:it.name?String(it.name):'',day:impDate(it.day),time:it.time||'',park:impPark(it.park),status:it.status||'attend'}));
  }
  if(t==='flight'){
    var legs=Array.isArray(it.legs)?it.legs:[];
    var cl=legs.map(function(l){return {airline:l.airline||'',num:l.num||'',conf:l.conf||'',
      depApt:l.depApt||'',depCity:l.depCity||'',depTime:l.depTime||'',depDate:impDate(l.depDate),
      arrApt:l.arrApt||'',arrCity:l.arrCity||'',arrTime:l.arrTime||'',arrDate:impDate(l.arrDate)};});
    var day=impDate(it.day)||(cl[0]&&cl[0].depDate)||'';
    var rec6=base({label:it.label||'Flight',day:day,status:it.status==='booked'?'booked':'planning',legs:cl});
    var o6=finalizeImport('Flight',rec6);
    if(!cl.length)o6.error='Flight needs at least one leg';
    return o6;
  }
  if(t==='day'||t==='strategy'||t==='dayplan'||t==='day plan'){
    /* day-level VERBIAGE: headline/blurb/strategy/tags/alert. Updates the
       existing day record at save time (dayByDate) — never pushes a new day.
       who:[] so the review screen shows no people badge. */
    var dtags=Array.isArray(it.tags)?it.tags:(it.tags?String(it.tags).split(','):[]);
    var recD={_kind:'day',trip:tid,who:[],day:impDate(it.day),
      visit:(it.headline||it.visit||'')+'',blurb:(it.blurb||'')+'',
      strategy:(it.strategy||it.text||it.notes||'')+'',
      tags:dtags.map(function(x){return String(x).trim();}).filter(Boolean),
      alert:(it.alert||'')+''};
    var oD=finalizeImport('Day',recD);
    if(!oD.error&&!recD.strategy&&!recD.blurb&&!recD.visit&&!recD.tags.length&&!recD.alert)oD.error='Day needs strategy or notes';
    return oD;
  }
  if(t==='todo'||t==='to-do'||t==='task'){
    var tdDone=it.done===true||it.done==='true'||/^done$/i.test(it.status||'');
    var recT={_kind:'todo',id:impId('td'),trip:tid,by:S.persona,who:[],priv:false,done:tdDone,
      n:(it.text||it.task||it.n||'')+'',when:(it.when||'')+''};
    var oT=finalizeImport('To Do',recT);
    if(!oT.error&&!recT.n)oT.error='To Do needs a task';
    return oT;
  }
  if(t==='packing'||t==='pack'){
    var pq=parseInt(it.qty,10);
    var pPerson=(it.store==='person'||it.onPerson===true||/^person$/i.test(it.store||''));
    var recP={_kind:'packing',trip:tid,who:[],section:(it.section||it.cat||'General')+'',
      n:(it.item||it.n||it.name||'')+'',qty:(pq>0?pq:1),store:pPerson?'person':'',
      l:it.l===true||it.checkOnly===true,needBuy:!!it.needBuy||!!it.need};
    var oP=finalizeImport('Packing',recP);
    if(!oP.error&&!recP.n)oP.error='Packing needs an item';
    return oP;
  }
  return {type:it.type||'?',error:'Unknown type "'+(it.type||'')+'"'};
}
/* non-blocking guard: does a built item\'s date fall outside the selected
   trip\'s range? Returns a friendly warning string, or '' if it fits / unknown. */
function importDateWarn(rec,type){
  var t=trip();if(!t||!t.start||!t.end||!rec)return '';
  var lo=t.start,hi=t.end;
  var d=(type==='Resort')?rec.checkin:rec.day;
  var d2=(type==='Resort')?rec.checkout:d;
  if(!d)return '';
  var overlaps=(d<=hi)&&((d2||d)>=lo);   /* item range overlaps trip range */
  if(overlaps)return '';
  return monOf(d)+' '+(+d.slice(8))+' is outside '+t.name+' ('+t.dates+') — wrong trip?';
}
/* parse + build everything from the textarea into S._importItems */
function importParse(){
  var raw=val('import-paste')||'';
  var data=parseImportText(raw);
  if(!data){toast('Couldn\'t read that — make sure it\'s the JSON Claude gave you');return;}
  var arr=Array.isArray(data)?data:(Array.isArray(data.items)?data.items:null);
  if(!arr||!arr.length){toast('No items found in that JSON');return;}
  /* self-heal: re-materialize the current trip's member snapshot from its live
     group membership so items assigned to "all" reach everyone currently in the
     group — including people added after the trip was first created. */
  var _ct=trip();if(_ct)(_ct.parties||[]).forEach(function(gid){refreshTripMembers(gid);});
  S._importItems=arr.map(buildImportItem);
  S._importItems.forEach(function(e){if(!e.error&&e.rec)e.warn=importDateWarn(e.rec,e.type);});
  S.importStep=2;renderScreen_inplace2();
}
/* commit the valid items into their collections */
function importSave(){
  var items=S._importItems||[],added=[];
  var M={'Resort':RESORTS,'Dining':DINING,'Lightning Lane':LLS,'Park reservation':PARKRES,'Park hours':PARKHOURS,'Re-book':REBOOKS,'Show':SHOWS,'Flight':FLIGHTS};
  /* resolve rolling re-books: link rec.after (an LL id) to the Lightning Lane
     matching afterRide + day. Index the batch's LLs (already carry ids) plus any
     already saved, so a re-book can follow a ride imported in the same paste. */
  var llKey=function(day,ride){return (day||'')+'|'+(ride||'').trim().toLowerCase();};
  var llIndex={};
  LLS.forEach(function(l){if(l.ride)llIndex[llKey(l.day,l.ride)]=l.id;});
  items.forEach(function(e){if(!e.error&&!e._removed&&e.type==='Lightning Lane'&&e.rec&&e.rec.ride)llIndex[llKey(e.rec.day,e.rec.ride)]=e.rec.id;});
  items.forEach(function(e){
    if(e.type==='Re-book'&&e.rec){
      if(e.rec.afterRide){var aid=llIndex[llKey(e.rec.day,e.rec.afterRide)];if(aid)e.rec.after=aid;}
      delete e.rec.afterRide;   /* helper field — not part of the stored record */
    }
  });
  var extra=0,touchedLists=false;
  items.forEach(function(e){
    if(e.error||e._removed||!e.rec)return;
    if(e.type==='Day'){
      var d=dayByDate(e.rec.day);if(!d)return;   /* date not in this trip — skip */
      if(e.rec.visit)d.visit=e.rec.visit;
      if(e.rec.blurb)d.blurb=e.rec.blurb;
      if(e.rec.strategy)d.strategy=e.rec.strategy;
      if(e.rec.alert)d.alert=e.rec.alert;
      if(e.rec.tags&&e.rec.tags.length){d.tags=(d.tags||[]).concat(e.rec.tags.filter(function(x){return (d.tags||[]).indexOf(x)<0;}));}
      extra++;return;
    }
    if(e.type==='To Do'){TODO.push(e.rec);tdMarkStarted(e.rec.by);touchedLists=true;extra++;return;}
    if(e.type==='Packing'){
      var pid=S.persona;if(!PACKING[pid])PACKING[pid]=[];
      var sec=null;for(var si=0;si<PACKING[pid].length;si++){if(PACKING[pid][si].cat===e.rec.section){sec=PACKING[pid][si];break;}}
      if(!sec){sec={cat:e.rec.section,items:[]};PACKING[pid].push(sec);}
      var stPerson=e.rec.store==='person';
      sec.items.push({n:e.rec.n,qty:(e.rec.l||stPerson)?0:(e.rec.qty||1),l:!!e.rec.l,store:stPerson?'person':'',done:false,needBuy:!!e.rec.needBuy,who:[]});
      pkMarkStarted(pid);touchedLists=true;extra++;return;
    }
    var coll=M[e.type];if(!coll)return;coll.push(e.rec);added.push(e);
  });
  persist();
  if(touchedLists)saveLists();   /* per-trip to-do + packing keys (synced) */
  try{autoBackup(true);}catch(e){}   /* capture the freshly imported data right away */
  S._importCount=added.length+extra;S.importStep=3;renderScreen_inplace2();
  importNotify(added);   /* notify the assigned people, exactly like a manual add */
}
/* fire notifications for a batch of just-imported items — one combined picker
   (active trips / opted in) instead of one per item. */
function importNotify(items){
  if(!items||!items.length){bumpBell();return;}
  var tid=S.tripId,plan={forced:[],optional:[]};
  items.forEach(function(e){
    if(!e.rec)return;
    var p=buildNotifPlan({trip:tid,cat:e.type,label:notifLabel(e.type,e.rec),item:e.rec,oldWho:[],newWho:e.rec.who,actor:S.persona});
    plan.forced=plan.forced.concat(p.forced);plan.optional=plan.optional.concat(p.optional);
  });
  if(!plan.forced.length&&!plan.optional.length){bumpBell();return;}
  var t=tripById(tid)||trip(),active=(t&&t.notifyByDefault);
  if(!active&&!S._notify){if(plan.forced.length)sendNotifPlan(plan.forced);bumpBell();return;}
  openNotifConfirm({actor:S.persona,trip:tid,cat:'Import',label:'these items',oldWho:[],newWho:[]},plan);
}
function importRemove(i){var e=(S._importItems||[])[i];if(e)e._removed=!e._removed;renderScreen_inplace2();}
function importReset(){S._importItems=null;S._importEdit=null;S.importStep=1;renderScreen_inplace2();}

/* ── CSV template (download → fill in Excel/Sheets → upload) ──
   Reuses the same builder + review screen as the JSON path. */
var IMPORT_CSV_COLS=['type','name','room','checkin','checkout','inTime','outTime','day','meal','time','park','loc','ride','tier','bookedTime','window','afterRide','text','label','airline','num','depApt','depCity','depTime','depDate','arrApt','arrCity','arrTime','arrDate','open','close','early','late','crowd','headline','blurb','strategy','tags','alert','when','section','item','needBuy','conf','status'];
function csvEsc(v){v=(v==null?'':String(v));return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}
function importCsvTemplate(){
  var rows=[IMPORT_CSV_COLS];
  /* example rows — replace or delete these before importing */
  var ex={
    resort:{type:'resort',name:"Disney\'s Pop Century",room:'Standard Room',checkin:'2026-07-14',checkout:'2026-07-16',conf:'A10293847',status:'booked'},
    dining:{type:'dining',name:'Space 220',day:'2026-07-15',meal:'Dinner',time:'6:45 PM',park:'ep',loc:'in',status:'reserved'},
    lightning:{type:'lightning',ride:'Rise of the Resistance',day:'2026-07-17',park:'hs',tier:'sp',status:'planning'},
    flight:{type:'flight',label:'Outbound',status:'booked',airline:'Southwest',num:'WN 4657',depApt:'BOS',depCity:'Boston',depTime:'5:45 AM',depDate:'2026-07-14',arrApt:'MCO',arrCity:'Orlando',arrTime:'11:50 AM',arrDate:'2026-07-14'}
  };
  ['resort','dining','lightning','flight'].forEach(function(k){
    rows.push(IMPORT_CSV_COLS.map(function(c){return csvEsc(ex[k][c]||'');}));
  });
  return rows.map(function(r){return r.join(',');}).join('\n');
}
function downloadFile(filename,text,mime,okMsg){
  try{
    var blob=new Blob([text],{type:(mime||'text/plain')+';charset=utf-8'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');a.href=url;a.download=filename;
    document.body.appendChild(a);a.click();
    setTimeout(function(){if(a.parentNode)a.parentNode.removeChild(a);URL.revokeObjectURL(url);},120);
    toast(okMsg||'Downloaded');
  }catch(e){toast('Download not supported here');}
}
function downloadCSV(filename,text){downloadFile(filename,text,'text/csv','Template downloaded');}
/* full backup of everything stored on this device — also the seed file for the
   eventual backend migration. Dumps every dtp_* key. */
function buildBackup(){
  persist();saveLists();   /* flush in-memory state first */
  var dump={app:'disney-trip-planner',dataVersion:DATA_VERSION,build:BUILD,exported:new Date().toISOString(),keys:{}};
  try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('dtp_')===0){
    try{dump.keys[k]=JSON.parse(localStorage.getItem(k));}catch(e){dump.keys[k]=localStorage.getItem(k);}
  }}}catch(e){}
  return dump;
}
function exportAllData(){
  if(!isAdmin()){toast('Admin only');return;}
  var d=buildBackup();
  downloadFile('disney-trip-backup-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(d,null,2),'application/json','Backup downloaded');
}
/* ── Automatic rolling local backups ──────────────────────────
   A safety net independent of the cloud. Every few minutes (and right after an
   import) we snapshot all data into ONE non-synced, wipe-surviving localStorage
   key. 'dtpbackups' deliberately does NOT start with 'dtp_' so syncable(),
   wipeLocalState() and the boot loader all ignore it — it survives sign-out,
   tenant switches and even "Start over", so a bad cloud merge or an accidental
   wipe can be rolled back from inside the app. */
var BACKUP_KEY='dtpbackups', BACKUP_MAX=12, BACKUP_MIN_MS=5*60*1000, BACKUP_MAX_BYTES=3500000;
function loadBackups(){try{var s=localStorage.getItem(BACKUP_KEY);if(s){var a=JSON.parse(s);if(Array.isArray(a))return a;}}catch(e){}return [];}
function saveBackups(a){
  try{localStorage.setItem(BACKUP_KEY,JSON.stringify(a));return;}catch(e){}
  while(a.length>1){a.shift();try{localStorage.setItem(BACKUP_KEY,JSON.stringify(a));return;}catch(e2){}}
}
/* raw dump of every data key (single-underscore dtp_*; skips dtp__ sync
   bookkeeping so a restore never corrupts timestamps/lastuid) */
function snapshotKeys(){
  var keys={};
  try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);
    if(k&&k.indexOf('dtp_')===0&&k.indexOf('dtp__')!==0){try{keys[k]=localStorage.getItem(k);}catch(e){}}
  }}catch(e){}
  return keys;
}
function backupSig(keys){var s='';var ks=Object.keys(keys).sort();for(var i=0;i<ks.length;i++)s+=ks[i]+':'+(keys[ks[i]]||'').length+';';return s;}
function autoBackup(force){
  try{
    if(window.CLOUD&&window.CLOUD.applyingRemote)return;     /* mid cloud-apply — unstable */
    var keys=snapshotKeys();
    if(!keys.dtp_trips)return;                               /* nothing worth keeping yet */
    var sig=backupSig(keys), list=loadBackups(), last=list[list.length-1], now=Date.now();
    if(!force&&last){
      if(last._sig===sig)return;                             /* unchanged since last snapshot */
      if(now-(last.ts||0)<BACKUP_MIN_MS)return;              /* too soon */
    }
    list.push({ts:now,iso:new Date(now).toISOString(),build:BUILD,wid:(window.CLOUD&&window.CLOUD.wid)||null,_sig:sig,keys:keys});
    while(list.length>BACKUP_MAX)list.shift();
    var blob=JSON.stringify(list);
    while(list.length>1&&blob.length>BACKUP_MAX_BYTES){list.shift();blob=JSON.stringify(list);}
    saveBackups(list);
  }catch(e){}
}
function backupWhen(b){try{return new Date(b.ts||b.iso).toLocaleString();}catch(e){return b.iso||'';}}
function backupSummary(b){
  function cnt(k){try{var a=JSON.parse((b.keys&&b.keys[k])||'[]');return Array.isArray(a)?a.length:0;}catch(e){return 0;}}
  function days(){var c=0;try{var ks=b.keys||{};Object.keys(ks).forEach(function(k){if(k==='dtp_days'||k.indexOf('dtp_days_')===0){var a=JSON.parse(ks[k]||'[]');for(var i=0;i<a.length;i++)if(a[i]&&a[i].strategy)c++;}});}catch(e){}return c;}
  return cnt('dtp_trips')+' trips · '+cnt('dtp_family')+' people · '+days()+' day strategies';
}
function backupCountLabel(){var n=loadBackups().length;return n?(n+' snapshot'+(n===1?'':'s')+' saved'):'Auto-saved snapshots';}
function snapshotNow(){autoBackup(true);if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();toast('Snapshot saved');}
function restoreBackup(idx){
  if(!isAdmin()&&!(window.CLOUD&&window.CLOUD.isSuper)){toast('Admin only');return;}
  var list=loadBackups(),b=list[idx];
  if(!b||!b.keys){toast('Backup not found');return;}
  if(!confirm('Restore the snapshot from '+backupWhen(b)+'?\n\nThis overwrites your current data with that snapshot and syncs it to the cloud.'))return;
  /* snapshot the CURRENT state first so a restore is itself undoable */
  autoBackup(true);
  try{
    Object.keys(b.keys).forEach(function(k){
      var raw=b.keys[k],val;
      try{val=JSON.parse(raw);}catch(e){val=raw;}
      save(k,val);   /* localStorage + cloud push with a fresh (winning) timestamp */
    });
  }catch(e){}
  /* reload selection + collections from the restored localStorage */
  try{S.persona=load('dtp_persona',S.persona);}catch(e){}
  try{S.partyId=load('dtp_partyId',S.partyId);}catch(e){}
  try{S.tripId=load('dtp_tripId',S.tripId);}catch(e){}
  try{rehydrate();}catch(e){}
  try{materializeAllDays();ensureActiveParty();ensureVisibleTrip();loadLists();}catch(e){}
  try{closeScreen();}catch(e){}
  S.tab='home';render();
  toast('Restored snapshot from '+backupWhen(b));
}
function scrBackups(){
  if(!isAdmin()&&!(window.CLOUD&&window.CLOUD.isSuper))return screenShell('Backups','<div class="body-empty" style="padding:24px 12px">This tool is admin-only.</div>',null,null,'Close');
  var list=loadBackups();
  var body='<div class="body-empty" style="text-align:left;padding:0 2px 12px;font-size:14px;color:var(--ink)">'
    +'Automatic local snapshots, taken as you make changes and kept on this device (the last '+BACKUP_MAX+'). Restore one to roll back a bad sync or an accidental change. <span style="white-space:nowrap">Build '+BUILD+'</span></div>';
  if(!list.length){
    body+='<div class="body-empty" style="text-align:left;padding:2px">No snapshots yet — they start saving automatically as you edit. Tap “Snapshot now” to take one immediately.</div>';
  }else{
    for(var ri=list.length-1;ri>=0;ri--){var b=list[ri];
      body+='<div class="ov-card" style="margin:0 0 8px"><div style="padding:12px 14px">'
        +'<div style="font-weight:700">'+esc(backupWhen(b))+'</div>'
        +'<div style="font-size:13px;color:var(--muted);margin-top:2px">'+esc(backupSummary(b))+' · Build '+esc(b.build||'?')+'</div>'
        +'<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">'
        +'<button class="btn-secondary" style="flex:1;min-width:130px" onclick="openScreen({type:\'backupview\',idx:'+ri+'})">View strategies</button>'
        +'<button class="ri-btn" style="flex:1;min-width:130px" onclick="restoreBackup('+ri+')">Restore snapshot</button>'
        +'</div></div></div>';
    }
  }
  body+='<button class="btn-secondary" onclick="snapshotNow()">Snapshot now</button>';
  return screenShell('Backups',body,null,null,'Close');
}
/* Non-destructive recovery: list every day strategy stored in one snapshot so a
   single lost day can be copied back without overwriting current data. */
function backupDays(b){
  var out=[];
  try{var ks=(b&&b.keys)||{};Object.keys(ks).forEach(function(k){
    if(k==='dtp_days'||k.indexOf('dtp_days_')===0){
      var a;try{a=JSON.parse(ks[k]||'[]');}catch(e){a=[];}
      if(Array.isArray(a))for(var i=0;i<a.length;i++){var d=a[i];if(d&&d.strategy)out.push(d);}
    }
  });}catch(e){}
  out.sort(function(x,y){return (x.date||'')<(y.date||'')?-1:(x.date||'')>(y.date||'')?1:0;});
  return out;
}
function scrBackupView(){
  if(!isAdmin()&&!(window.CLOUD&&window.CLOUD.isSuper))return screenShell('Snapshot','<div class="body-empty" style="padding:24px 12px">This tool is admin-only.</div>',null,null,'Close');
  var list=loadBackups(),b=list[S.screen.idx];
  if(!b)return screenShell('Snapshot','<div class="body-empty" style="padding:24px 12px">Snapshot not found.</div>',null,null,'Close');
  var days=backupDays(b);
  var body='<div class="body-empty" style="text-align:left;padding:0 2px 12px;font-size:14px;color:var(--ink)">'
    +'Day strategies saved in the snapshot from <strong>'+esc(backupWhen(b))+'</strong>. Copy any day\'s text and paste it back into that day\'s Strategy &amp; Notes editor — nothing here changes your current data.</div>';
  if(!days.length){
    body+='<div class="body-empty" style="text-align:left;padding:2px">No day strategies in this snapshot.</div>';
  }else{
    for(var i=0;i<days.length;i++){var d=days[i];
      var hd=(d.dl?d.dl+' ':'')+monOf(d.date)+' '+(d.d||d.date.slice(8))+', '+d.date.slice(0,4);
      body+='<div class="ov-card" style="margin:0 0 8px"><div style="padding:12px 14px">'
        +'<div style="font-weight:700;margin-bottom:6px">'+esc(hd)+'</div>'
        +'<textarea id="bv-'+i+'" readonly style="display:block;width:100%;box-sizing:border-box;height:120px;border:1px solid var(--border);border-radius:8px;padding:10px;font-size:15px;line-height:1.6;font-family:inherit;background:var(--cream);color:var(--ink)">'+esc(d.strategy)+'</textarea>'
        +'<button class="btn-secondary" style="margin-top:8px" onclick="copyBackupStrat('+i+')">Copy this text</button>'
        +'</div></div>';
    }
  }
  return screenShell('Snapshot strategies',body,null,null,'Back');
}
function copyBackupStrat(i){
  var ta=document.getElementById('bv-'+i);if(!ta)return;
  var t=ta.value;
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(t).then(function(){toast('Strategy copied — paste it into the day');},function(){fallbackSelect(ta);});
      return;
    }
  }catch(e){}
  fallbackSelect(ta);
}
function fallbackSelect(ta){
  try{ta.focus();ta.setSelectionRange(0,ta.value.length);var ok=document.execCommand&&document.execCommand('copy');toast(ok?'Strategy copied — paste it into the day':'Select the text above and copy it');}
  catch(e){toast('Select the text above and copy it');}
}
function importCsvDownload(){downloadCSV('trip-template.csv',importCsvTemplate());}
/* small RFC-ish CSV parser (handles quotes, commas, CRLF) → array of rows */
function parseCSV(text){
  var rows=[],row=[],cur='',q=false;
  text=String(text).replace(/\r\n/g,'\n').replace(/\r/g,'\n');
  for(var i=0;i<text.length;i++){var c=text[i];
    if(q){ if(c==='"'){ if(text[i+1]==='"'){cur+='"';i++;} else q=false; } else cur+=c; }
    else{ if(c==='"')q=true; else if(c===','){row.push(cur);cur='';} else if(c==='\n'){row.push(cur);rows.push(row);row=[];cur='';} else cur+=c; }
  }
  if(cur!==''||row.length){row.push(cur);rows.push(row);}
  return rows;
}
/* forgive common spreadsheet date formats → YYYY-MM-DD (impDate rejects the rest) */
function csvDate(v){
  if(!v)return '';v=String(v).trim();
  if(/^\d{4}-\d{2}-\d{2}$/.test(v))return v;
  var m=v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(m)return m[3]+'-'+('0'+m[1]).slice(-2)+'-'+('0'+m[2]).slice(-2);
  var m2=v.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);if(m2)return m2[1]+'-'+('0'+m2[2]).slice(-2)+'-'+('0'+m2[3]).slice(-2);
  return v;
}
/* a CSV row object → the loose shape buildImportItem expects */
function csvRowToItem(row){
  var t=(row.type||'').toLowerCase().trim();
  ['checkin','checkout','day','depDate','arrDate'].forEach(function(k){if(row[k])row[k]=csvDate(row[k]);});
  if(t==='flight'){
    return {type:'flight',label:row.label,day:row.day,status:row.status,legs:[{
      airline:row.airline,num:row.num,conf:row.conf,
      depApt:row.depApt,depCity:row.depCity,depTime:row.depTime,depDate:row.depDate,
      arrApt:row.arrApt,arrCity:row.arrCity,arrTime:row.arrTime,arrDate:row.arrDate}]};
  }
  row.type=t;return row;
}
function importCsvText(text){
  var rows=parseCSV(text);
  if(!rows.length){toast('That file looks empty');return;}
  var headers=rows[0].map(function(h){return h.trim();});
  var items=[];
  for(var i=1;i<rows.length;i++){
    var r=rows[i],obj={},blank=true;
    for(var j=0;j<headers.length;j++){var v=(r[j]==null?'':r[j]).trim();obj[headers[j]]=v;if(v)blank=false;}
    if(blank||!obj.type)continue;     /* skip empty / type-less rows */
    items.push(buildImportItem(csvRowToItem(obj)));
  }
  if(!items.length){toast('No rows with a type found');return;}
  S._importItems=items;
  S._importItems.forEach(function(e){if(!e.error&&e.rec)e.warn=importDateWarn(e.rec,e.type);});
  S.importStep=2;renderScreen_inplace2();
}
function importCsvPick(){var el=document.getElementById('import-csv');if(el)el.click();}
function importCsvFile(ev){
  var f=ev&&ev.target&&ev.target.files&&ev.target.files[0];if(!f)return;
  var r=new FileReader();r.onload=function(){importCsvText(r.result);};r.readAsText(f);
}

/* ── inline editing in the review screen ──────────────────── */
/* editable fields per type: [key,label,kind]  kind: text | date | [options] */
var IMPORT_FIELDS={
  Resort:[['name','Name','text'],['room','Room','text'],['checkin','Check-in','date'],['checkout','Check-out','date'],['conf','Confirmation #','text'],['status','Status',['booked','planning']]],
  Dining:[['name','Name','text'],['day','Date','date'],['time','Time','text'],['meal','Meal',['Breakfast','Lunch','Dinner','Drinks']],['loc','Location',['in','off']],['conf','Confirmation #','text'],['status','Status',['reserved','want','planned']]],
  'Lightning Lane':[['ride','Ride','text'],['day','Date','date'],['park','Park',['mk','ep','hs','ak']],['tier','Tier',['sp','mp1','mp2']],['status','Status',['booked','planning']],['bookedTime','Booked time','text'],['conf','Confirmation #','text']],
  'Park reservation':[['day','Date','date'],['park','Park',['mk','ep','hs','ak']],['status','Status',['booked','planning']]],
  Show:[['name','Name','text'],['day','Date','date'],['time','Time','text'],['park','Park',['mk','ep','hs','ak']],['status','Status',['attend','scheduled']]],
  Flight:[['label','Label','text'],['day','Date','date'],['status','Status',['booked','planning']]],
  Day:[['day','Date','date'],['visit','Headline','text'],['blurb','Blurb','text']],
  'To Do':[['n','Task','text'],['when','When','text']],
  Packing:[['section','Section','text'],['n','Item','text']]
};
/* required fields per type (re-checked after an edit) */
var IMPORT_REQ={Resort:['name'],Dining:['name','day'],'Lightning Lane':['ride','day'],'Park reservation':['park','day'],'Park hours':['park','day'],'Re-book':['text','day'],Show:['name','day'],Flight:['label']};
function importEditOpen(i){
  var e=(S._importItems||[])[i];if(!e||!e.rec)return;
  S._importEdit=i;
  /* seed the who-select from the item\'s current assignment (defaults to everyone) */
  S._who=new Set((e.rec.who==='all'||!e.rec.who)?tripMembers():e.rec.who);
  renderScreen_inplace2();
}
function importEditCancel(){S._importEdit=null;S._who=null;renderScreen_inplace2();}
function importEditApply(i){
  var e=(S._importItems||[])[i];if(!e||!e.rec){S._importEdit=null;S._who=null;renderScreen_inplace2();return;}
  (IMPORT_FIELDS[e.type]||[]).forEach(function(f){
    var k=f[0],kind=f[2],v=val('imf-'+i+'-'+k);
    if(kind==='date')e.rec[k]=impDate(v);
    else if(k==='park')e.rec[k]=impPark(v);
    else e.rec[k]=v;
  });
  /* assignment — same model as the manual editors (collapses a full roster to "all") */
  if(S._who)e.rec.who=collapseWho(tripMembers().filter(function(id){return S._who.has(id);}));
  /* re-validate + recompute summary/warning the same way the builder does */
  var fin=finalizeImport(e.type,e.rec);
  e.summary=fin.summary;
  if(fin.error)e.error=fin.error;else delete e.error;
  e.warn=e.error?'':importDateWarn(e.rec,e.type);
  S._importEdit=null;S._who=null;renderScreen_inplace2();
}
/* the edit panel for one item */
function importEditPanel(e,i){
  var specs=IMPORT_FIELDS[e.type]||[];
  var h='<div class="import-edit">';
  specs.forEach(function(f){
    var k=f[0],lbl=f[1],kind=f[2],cur=(e.rec&&e.rec[k]!=null)?e.rec[k]:'',id='imf-'+i+'-'+k;
    h+='<div class="field" style="margin-bottom:8px"><label class="field-label">'+lbl+'</label>';
    if(Array.isArray(kind)){
      h+='<select class="field-input" id="'+id+'">';
      kind.forEach(function(o){h+='<option value="'+o+'"'+(String(cur)===o?' selected':'')+'>'+o+'</option>';});
      h+='</select>';
    }else{
      h+='<input class="field-input" id="'+id+'"'+(kind==='date'?' type="date"':'')+' value="'+esc(cur)+'">';
    }
    h+='</div>';
  });
  /* people assignment — same who-select as the manual editors */
  h+=whoSelectField(e.rec.who);
  h+='<div style="display:flex;gap:8px"><button class="btn-secondary" style="margin:0;flex:1" onclick="importEditCancel()">Cancel</button>'
    +'<button class="btn-secondary green" style="margin:0;flex:1" onclick="importEditApply('+i+')">Done</button></div>';
  return h+'</div>';
}
/* AI Import — paste JSON from Claude */
function scrImport(){
  if(!isAdmin())return screenShell('AI Import','<div class="body-empty" style="padding:24px 12px">This tool is admin-only.</div>',null,null,'Close');
  if((S.importStep||1)>1)return importReviewScreen();
  var body='';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 12px;font-size:15px;color:var(--ink)">'
    +'Parse a confirmation with <strong>Claude</strong>, then paste the JSON it gives you here. Items are added to <strong>'+esc(trip().name)+'</strong>.</div>';
  body+='<div class="import-steps">'
    +'<div class="import-step"><span class="is-n">1</span>Copy the instructions and paste them to Claude, then add your email or screenshot.</div>'
    +'<div class="import-step"><span class="is-n">2</span>Claude replies with JSON. Copy it.</div>'
    +'<div class="import-step"><span class="is-n">3</span>Paste it below and review.</div></div>';
  body+='<button class="btn-secondary" onclick="copyImportPrompt()">'+IC.sparkles+' Copy instructions for Claude</button>';
  body+='<div class="body-empty" style="text-align:left;padding:8px 2px 0;font-size:12px">Tip: for repeated planning, set up a reusable <strong>Claude Project</strong> with these instructions — see <code>docs/claude-project-setup.md</code> in the repo. <span style="white-space:nowrap">Build '+BUILD+'</span></div>';
  body+='<div class="field" style="margin-top:14px"><label class="field-label">Paste Claude\'s JSON</label>'
    +'<textarea class="field-input" id="import-paste" rows="8" placeholder=\'{ "items": [ ... ] }\' style="font-family:monospace;font-size:13px;resize:vertical"></textarea></div>';
  body+='<button class="btn-primary" onclick="importParse()">Review items</button>';
  body+='<button class="btn-secondary" onclick="closeScreen()">Cancel</button>';
  return screenShell('AI Import',body,null,null,'Close');
}
/* CSV Import — download a template, fill it in a spreadsheet, upload */
function scrCsvImport(){
  if(!isAdmin())return screenShell('CSV Import','<div class="body-empty" style="padding:24px 12px">This tool is admin-only.</div>',null,null,'Close');
  if((S.importStep||1)>1)return importReviewScreen();
  var body='';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 12px;font-size:15px;color:var(--ink)">'
    +'Seed <strong>'+esc(trip().name)+'</strong> from a spreadsheet. Download the template, fill it in Excel or Google Sheets, then upload it.</div>';
  body+='<div class="import-steps">'
    +'<div class="import-step"><span class="is-n">1</span>Download the template and open it in Excel or Google Sheets.</div>'
    +'<div class="import-step"><span class="is-n">2</span>One row per item. Dates as YYYY-MM-DD. Replace the example rows.</div>'
    +'<div class="import-step"><span class="is-n">3</span>Upload it and review before saving.</div></div>';
  body+='<button class="btn-secondary" onclick="importCsvDownload()">'+IC.upload+' Download CSV template</button>';
  body+='<button class="btn-primary" onclick="importCsvPick()">'+IC.upload+' Upload filled CSV</button>';
  body+='<input type="file" id="import-csv" accept=".csv,text/csv" style="display:none" onchange="importCsvFile(event)">';
  body+='<div class="body-empty" style="text-align:left;padding:6px 2px 0;font-size:12px">Columns: type, name, day, time, park, tier, status, check-in/out, flight legs, etc. You\'ll review everything before it saves. <span style="white-space:nowrap">Build '+BUILD+'</span></div>';
  body+='<button class="btn-secondary" onclick="closeScreen()">Cancel</button>';
  return screenShell('CSV Import',body,null,null,'Close');
}
/* shared review + done screen, used by both AI Import and CSV Import */
function importReviewScreen(){
  var body='';
  if((S.importStep||1)===2){
    var items=S._importItems||[];
    var okN=items.filter(function(e){return !e.error&&!e._removed;}).length;
    body+='<div class="body-empty" style="text-align:left;padding:0 2px 12px;font-size:15px;color:var(--ink)"><strong>Here\'s what I found.</strong> Edit, remove, or assign people before saving.</div>';
    var anyWarn=false;
    for(var i=0;i<items.length;i++){var e=items[i];
      var editing=(S._importEdit===i);
      var hasErr=!!e.error,warned=!hasErr&&!!e.warn&&!e._removed;if(warned)anyWarn=true;
      var icCls=hasErr?'x':(e._removed?'x':(warned?'q':'ok')),icHtml=hasErr?'&times;':(e._removed?'&times;':(warned?'!':IC.checkw));
      body+='<div class="review-item'+(hasErr?' fail':(e._removed?' fail':(warned?' warn':'')))+'">'
        +'<span class="ri-ic '+icCls+'">'+icHtml+'</span>'
        +'<div class="ri-main"><div class="ri-type">'+esc(e.type)+'</div>'
        +'<div class="ri-val">'+esc(e.summary||e.error||'')+'</div>'
        +((!hasErr&&e.rec)?'<div style="margin-top:5px">'+whoStack(e.rec.who)+'</div>':'')
        +(hasErr?'<div class="ri-q">'+esc(e.error)+'</div>':(warned?'<div class="ri-q">'+esc(e.warn)+'</div>':''));
      if(editing){
        body+=importEditPanel(e,i);
      }else{
        body+='<div class="ri-actions">';
        if(e.rec)body+='<button class="ri-btn" onclick="importEditOpen('+i+')">Edit</button>';
        body+='<button class="ri-btn rm" onclick="importRemove('+i+')">'+(e._removed?'Keep':'Remove')+'</button></div>';
      }
      body+='</div></div>';
    }
    if(anyWarn)body+='<div class="body-empty" style="text-align:left;padding:2px 2px 10px;font-size:13px;color:#92400E">Items marked in amber fall outside this trip\'s dates. You can still add them, but double-check you\'re on the right trip.</div>';
    if(okN){
      var act=!!(trip()&&trip().notifyByDefault),on=!!S._notify;
      body+='<div class="field" style="margin-top:6px"><label class="field-label">Notifications</label>';
      body+='<div class="notify-row'+(on?' on':'')+'" onclick="notifToggle()"><span class="notify-check">'+(on?IC.checkw:'')+'</span>';
      body+='<div><div class="notify-lbl">Notify the people I assigned</div><div class="notify-sub">'+(act?'This trip notifies by default — you\'ll choose who to let know after saving.':'Switch on to tell the people on these items they\'ve been added.')+'</div></div></div></div>';
    }
    body+='<button class="btn-primary"'+(okN?'':' disabled style="opacity:.5"')+' onclick="importSave()">'+(okN?'Add '+okN+' item'+(okN===1?'':'s')+' to '+esc(trip().name):'Nothing to add')+'</button>';
    body+='<button class="btn-secondary" onclick="importReset()">Back</button>';
    return screenShell('Review Import',body,null,null,'Back');
  }
  var n=S._importCount||0;
  body+='<div style="text-align:center;padding:30px 10px"><div class="id-ic" style="margin:0 auto 14px;background:#DCFCE7;color:#15803D;width:64px;height:64px">'+IC.checks+'</div>';
  body+='<div class="pg-title" style="text-align:center">Saved</div><div class="pg-sub" style="text-align:center">'+n+' item'+(n===1?'':'s')+' added to '+esc(trip().name)+'.</div></div>';
  body+='<button class="btn-primary" onclick="S._importItems=null;closeScreen();render()">Done</button>';
  body+='<button class="btn-secondary" onclick="importReset()">Import more</button>';
  return screenShell('Import Complete',body,null,null,'Close');
}
function reviewItem(kind,type,val,extra){
  var cls=kind==='ok'?'':kind==='q'?' warn':' fail';
  var ic=kind==='ok'?'<span class="ri-ic ok">'+IC.checkw+'</span>':kind==='q'?'<span class="ri-ic q">?</span>':'<span class="ri-ic x">&times;</span>';
  var h='<div class="review-item'+cls+'">'+ic+'<div class="ri-main"><div class="ri-type">'+type+'</div><div class="ri-val">'+esc(val)+'</div>';
  if(extra) h+='<div class="ri-q">'+esc(extra)+'</div>';
  if(kind!=='x') h+='<div class="ri-actions"><button class="ri-btn">'+(kind==='q'?'Confirm':'Edit')+'</button><button class="ri-btn rm">Remove</button></div>';
  else h+='<div class="ri-actions"><button class="ri-btn">Try again</button></div>';
  return h+'</div></div>';
}

/* ── New Trip Wizard (Build 124) ─────────────────────────── */
function ntInit(){
  if(S._formInit==='newtrip')return;
  S._formInit='newtrip';
  S._ntFirstRun=!TRIPS.length;
  S._ntStep='trip';
  S._ntWhoMode=null;
  if(!S._ntCalYear){var _n=new Date();S._ntCalYear=_n.getFullYear();S._ntCalMonth=_n.getMonth();}
}
function ntCalPrev(){S._ntCalMonth--;if(S._ntCalMonth<0){S._ntCalMonth=11;S._ntCalYear--;}renderScreen_inplace2();}
function ntCalNext(){S._ntCalMonth++;if(S._ntCalMonth>11){S._ntCalMonth=0;S._ntCalYear++;}renderScreen_inplace2();}
function ntCalPick(d){
  if(!S._ntStart||(S._ntStart&&S._ntEnd)||d<S._ntStart){S._ntStart=d;S._ntEnd=null;}
  else if(d===S._ntStart){S._ntStart=null;S._ntEnd=null;}
  else{S._ntEnd=d;}
  renderScreen_inplace2();
}
/* generic range-picker calendar. Caller supplies the displayed year/month, the
   selected start/end, and the names of the prev/next/pick handlers — so the
   wizard and the trip editor share one renderer. */
function renderCalGrid(y,m,s,e,pickFn,prevFn,nextFn){
  var MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DN=['Su','Mo','Tu','We','Th','Fr','Sa'];
  var now=new Date(),todayStr=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  var out='<div style="margin:4px 0 8px">';
  out+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">';
  out+='<button class="btn-icon" onclick="'+prevFn+'()" style="font-size:20px;line-height:1;padding:2px 10px">‹</button>';
  out+='<span style="font-weight:600;font-size:15px">'+MN[m]+' '+y+'</span>';
  out+='<button class="btn-icon" onclick="'+nextFn+'()" style="font-size:20px;line-height:1;padding:2px 10px">›</button>';
  out+='</div>';
  out+='<div style="display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:3px">';
  DN.forEach(function(n){out+='<div style="text-align:center;font-size:11px;color:var(--muted);padding:2px 0">'+n+'</div>';});
  out+='</div>';
  out+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">';
  var first=new Date(y,m,1).getDay();
  for(var i=0;i<first;i++)out+='<div></div>';
  var dmax=new Date(y,m+1,0).getDate();
  for(var d=1;d<=dmax;d++){
    var ds=y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var isSel=ds===s||ds===e,inRng=!!(s&&e&&ds>s&&ds<e),isToday=ds===todayStr;
    var bg=isSel?'var(--ink)':inRng?'rgba(27,43,74,0.10)':'transparent';
    var col=isSel?'#fff':isToday?'var(--mk)':'inherit';
    out+='<div onclick="'+pickFn+'(\''+ds+'\')" style="text-align:center;padding:7px 1px;border-radius:'+(isSel?'50%':'5px')+';cursor:pointer;background:'+bg+';color:'+col+';font-weight:'+(isSel||isToday?'700':'400')+';font-size:14px">'+d+'</div>';
  }
  out+='</div>';
  out+='<div style="margin-top:8px;font-size:13px;color:var(--muted);text-align:center;min-height:18px">';
  if(s&&e)out+=monOf(s)+' '+Number(s.slice(8))+' – '+monOf(e)+' '+Number(e.slice(8))+', '+s.slice(0,4);
  else if(s)out+=monOf(s)+' '+Number(s.slice(8))+' — now tap your end date';
  else out+='Tap a start date';
  out+='</div></div>';
  return out;
}
function renderNtCal(){return renderCalGrid(S._ntCalYear,S._ntCalMonth,S._ntStart,S._ntEnd,'ntCalPick','ntCalPrev','ntCalNext');}
function ntGoToWho(){
  var nm=val('nt-name');if(!nm){toast('Give your trip a name');return;}
  S._ntTripName=nm;
  S._ntStep='who';renderScreen_inplace2();
}
function ntSelectWho(mode){S._ntWhoMode=mode;if(!mode)S._ntPartyId=null;renderScreen_inplace2();}
function ntPickParty(gid){S._ntPartyId=(S._ntPartyId===gid?null:gid);renderScreen_inplace2();}
function ntPeek(gid){S._ntExpandedParty=(S._ntExpandedParty===gid?null:gid);renderScreen_inplace2();}
function ntAddPerson(){S._ntPeopleCount=(S._ntPeopleCount||1)+1;renderScreen_inplace2();}
function ntRemovePerson(i){
  var people=ntReadPeople();people.splice(i,1);
  S._ntPeople=people;S._ntPeopleCount=Math.max(1,people.length);
  renderScreen_inplace2();
}
function ntReadPeople(){
  var arr=[],n=S._ntPeopleCount||1;
  for(var i=0;i<n;i++){var nm=val('nt-name-'+i),em=val('nt-email-'+i);if(nm||em)arr.push({name:nm||'',email:em||''});}
  return arr;
}
/* new-group path: name the group first, then add people */
function ntNewGroupName(){S._ntWhoMode='add';S._ntStep='group';renderScreen_inplace2();}
function ntGroupNameNext(){
  var nm=val('nt-gname');if(!nm){toast('Give your group a name');return;}
  S._ntGname=nm;S._ntStep='people';renderScreen_inplace2();
}
function ntBack(){
  if(S._ntStep==='notify'){
    if(S._ntTripId){
      TRIPS=TRIPS.filter(function(x){return x.id!==S._ntTripId;});
      DAYS=DAYS.filter(function(d){return d.trip!==S._ntTripId;});
      try{localStorage.removeItem('dtp_packing_'+S._ntTripId);localStorage.removeItem('dtp_todo_'+S._ntTripId);}catch(e){}
      save('dtp_trips',TRIPS);saveDays();S._ntTripId=null;S._members=null;
    }
    S._ntStep='who';S._ntWhoMode='existing';renderScreen_inplace2();return;
  }
  if(S._ntStep==='people'){S._ntPeople=ntReadPeople();S._ntPeopleCount=Math.max(1,(S._ntPeople||[]).length||1);S._ntStep='group';renderScreen_inplace2();return;}
  if(S._ntStep==='group'){S._ntStep='who';S._ntWhoMode=null;renderScreen_inplace2();return;}
  if(S._ntStep==='who'){S._ntStep='trip';S._ntWhoMode=null;renderScreen_inplace2();return;}
}
function ntMakeTrip(partyId,mem){
  var nm=S._ntTripName||'My Trip',col=PALETTE[TRIPS.length%PALETTE.length][0],id='t'+Date.now();
  var start=S._ntStart||'',end=S._ntEnd||'';
  var dates=(start&&end)?(monOf(start)+' '+(+start.slice(8))+' – '+monOf(end)+' '+(+end.slice(8))+', '+start.slice(0,4)):'Dates TBD';
  TRIPS.push({id:id,name:nm,sub:'Walt Disney World',notifyByDefault:false,start:start,end:end,dates:dates,color:col,members:mem,by:S.persona,parties:partyId?[partyId]:[]});
  genDays(id);var np={},nt=[];mem.forEach(function(pid){np[pid]=[];});
  save('dtp_packing_'+id,np);save('dtp_todo_'+id,nt);save('dtp_trips',TRIPS);saveDays();
  S._ntTripId=id;S._members=new Set(mem);
}
function ntCreateTripExisting(){
  if(!S._ntPartyId){toast('Pick a group first');return;}
  var mem=partyPeople(S._ntPartyId).map(function(p){return p.id;});
  if(mem.indexOf(S.persona)<0)mem.push(S.persona);
  if(window.CLOUD&&window.CLOUD.inParty&&!window.CLOUD.inParty()&&window.CLOUD.createParty){
    var pn=(partyById(S._ntPartyId)||{}).name||'My Group';
    window.CLOUD.createParty(pn).then(publishAllInvites).catch(function(e){toast(e&&e.message||'Could not save group to the cloud');});
  }
  ntMakeTrip(S._ntPartyId,mem);
  S._ntStep='notify';renderScreen_inplace2();
}
function ntCreateTripFromGroup(){
  var gname=S._ntGname||val('nt-gname');if(!gname){toast('Give your group a name');return;}
  var people=ntReadPeople(),gid='g'+Date.now();
  PARTIES.push({id:gid,name:gname,by:S.persona,color:PALETTE[PARTIES.length%PALETTE.length][0]});
  S._ntProvParty=gid;S._ntPartyId=gid;
  var me=person(S.persona);if(me&&Array.isArray(me.parties)&&me.parties.indexOf(gid)<0)me.parties.push(gid);
  var mem=[S.persona],added=[];
  people.forEach(function(p){
    if(!p.name)return;
    var pid='p'+Date.now()+Math.random().toString(36).slice(2,5);
    var used={};FAMILY.forEach(function(x){used[x.color]=1;});
    var col=PALETTE[FAMILY.length%PALETTE.length][0];
    for(var ci=0;ci<PALETTE.length;ci++)if(!used[PALETTE[ci][0]]){col=PALETTE[ci][0];break;}
    FAMILY.push({id:pid,name:p.name,email:p.email||'',color:col,admin:false,uid:null,parties:[gid]});
    ALL_IDS.push(pid);PACKING[pid]=[];mem.push(pid);added.push(pid);
  });
  save('dtp_family',FAMILY);saveParties();saveLists();
  if(window.CLOUD&&window.CLOUD.inParty&&!window.CLOUD.inParty()&&window.CLOUD.createParty)
    window.CLOUD.createParty(gname).then(publishAllInvites).catch(function(e){toast(e&&e.message||'Could not save group to the cloud');});
  ntMakeTrip(gid,mem);
  S._ntInvite=added;S._ntStep='invite';renderScreen_inplace2();
}
function ntCreateTripSkip(){
  /* retained for back-compat; the wizard no longer offers a "just me" shortcut
     that skips group creation. Creates no cloud workspace. */
  ntMakeTrip(null,[S.persona]);ntFinish(true);
}
function ntFinish(silent){
  var t=tripById(S._ntTripId),optIn=!silent&&S._notify;
  var partyId=S._ntPartyId||S._ntProvParty,id=S._ntTripId;
  saveLists();
  if(id){S.tripId=id;saveTripId();}
  if(partyId&&partyId!=='none'){S.partyId=partyId;savePartyId();}
  if(id)loadLists();
  S.dayIdx=0;S.open=defOpen();S.fmode='all';S.filter.clear();S.tab='plan';
  S._ntStep=null;S._ntWhoMode=null;S._ntPartyId=null;S._ntProvParty=null;
  S._ntTripId=null;S._ntFirstRun=false;S._members=null;S._formInit=null;
  S._ntPeople=null;S._ntInvite=null;S._ntExpandedParty=null;S._ntTripName=null;S._ntGname=null;S._ntStart=null;S._ntEnd=null;S._ntCalYear=null;S._ntCalMonth=null;
  S._freshTenant=false;
  closeScreen();render();
  if(t&&!silent)notifyMembership(t,[],t.members,optIn);
  if(!silent)toast('Trip created');
}
function ntCancel(){
  if(S._ntStep==='notify'||S._ntStep==='invite'){ntFinish(true);return;}
  if(S._ntProvParty){
    PARTIES=PARTIES.filter(function(x){return x.id!==S._ntProvParty;});
    FAMILY=FAMILY.filter(function(p){return !(p.parties&&p.parties.length===1&&p.parties[0]===S._ntProvParty&&!p.admin);});
    ALL_IDS=FAMILY.map(function(p){return p.id;});
    save('dtp_family',FAMILY);saveParties();saveLists();
  }
  if(S._ntTripId){
    TRIPS=TRIPS.filter(function(x){return x.id!==S._ntTripId;});
    DAYS=DAYS.filter(function(d){return d.trip!==S._ntTripId;});
    try{localStorage.removeItem('dtp_packing_'+S._ntTripId);localStorage.removeItem('dtp_todo_'+S._ntTripId);}catch(e){}
    save('dtp_trips',TRIPS);saveDays();
  }
  S._ntStep=null;S._ntWhoMode=null;S._ntPartyId=null;S._ntProvParty=null;
  S._ntTripId=null;S._ntFirstRun=false;S._members=null;S._formInit=null;
  S._ntPeople=null;S._ntInvite=null;S._ntExpandedParty=null;S._ntTripName=null;S._ntGname=null;S._ntStart=null;S._ntEnd=null;S._ntCalYear=null;S._ntCalMonth=null;
  S._freshTenant=false;
  closeScreen();
}
function scrNewTrip(){
  if(!canCreateTrip()){
    var nb='<div class="body-empty" style="text-align:left;padding:10px 2px;font-size:14px">'
      +'Only the tenant\'s admin can start new trips. Ask your tenant owner to add you to a trip and you\'ll see it here automatically.</div>';
    return screenShell('Plan a new trip',nb,null,null,'Close');
  }
  ntInit();
  var fr=S._ntFirstRun,body='';
  var cancelLabel=fr?null:'Cancel',cancelArg=fr?null:'ntCancel()';

  /* ── Step 1: Trip name + dates ── */
  if(S._ntStep==='trip'){
    if(fr)body+='<div style="padding:0 2px 16px"><div style="font-family:\'Fraunces\',Georgia,serif;font-size:22px;font-weight:700;color:var(--ink);margin-bottom:6px">Welcome!</div><div class="body-empty" style="padding:0;font-size:14px">Let\'s get your first trip on the books.</div></div>';
    body+='<div class="field"><label class="field-label">Trip name</label><input class="field-input" id="nt-name" placeholder="e.g. Disney World 2027" value="'+esc(S._ntTripName||'')+'"></div>';
    body+='<div class="field-label" style="margin:10px 0 2px">Dates <span style="opacity:.5;font-weight:400;font-size:12px">(optional)</span></div>';
    body+=renderNtCal();
    body+='<button class="btn-secondary green" onclick="ntGoToWho()">Next →</button>';
    if(fr)body+='<button class="btn-secondary" style="color:var(--muted);font-size:13px" onclick="wizSkip()">Skip — I\'ll set up manually</button>';
    return screenShell('Plan a Trip',body,null,null,cancelLabel,null,cancelArg);
  }

  /* ── Step 2: Who's coming? ── */
  if(S._ntStep==='who'){
    var tn=S._ntTripName||'your trip';
    body+='<div class="hub-section-label" style="margin-left:0">Who\'s coming on '+esc(tn)+'?</div>';

    if(!S._ntWhoMode){
      if(PARTIES.length)body+='<button class="btn-secondary" style="text-align:left;justify-content:flex-start" onclick="ntSelectWho(\'existing\')">Use an existing group</button>';
      body+='<button class="btn-secondary" style="text-align:left;justify-content:flex-start" onclick="ntNewGroupName()">Create a new group</button>';
      body+='<div class="body-empty" style="text-align:left;padding:8px 2px 0;font-size:12px;color:var(--muted)">Every trip belongs to a group — pick one you already have or make a new one. You can travel solo: just create a group with only yourself.</div>';
      body+='<button class="btn-secondary" onclick="ntBack()">← Back</button>';
      return screenShell('Plan a Trip',body,null,null,cancelLabel,null,cancelArg);
    }

    if(S._ntWhoMode==='existing'){
      body+='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:13px">Pick your group:</div>';
      for(var gi=0;gi<PARTIES.length;gi++){
        var gp=PARTIES[gi],sel=S._ntPartyId===gp.id;
        body+='<div class="hub-row'+(sel?' on':'')+'" onclick="ntPickParty(\''+gp.id+'\')" style="flex-wrap:wrap;gap:4px;cursor:pointer">';
        body+='<div class="hub-main"><div class="hub-title">'+esc(gp.name)+(sel?' ✓':'')+'</div></div>';
        body+='<button class="btn-secondary" style="margin:0;width:auto;padding:4px 10px;min-height:0;font-size:12px" onclick="event.stopPropagation();ntPeek(\''+gp.id+'\')">See who\'s in it</button>';
        body+='</div>';
        if(S._ntExpandedParty===gp.id){
          var mems=partyPeople(gp.id);
          body+='<div style="padding:4px 12px 10px;display:flex;flex-wrap:wrap;gap:6px">';
          for(var mi=0;mi<mems.length;mi++){var mp=mems[mi];
            body+='<span style="background:var(--cream);border-radius:99px;padding:3px 10px;font-size:13px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+mp.color+';margin-right:5px;vertical-align:middle"></span>'+esc(mp.name)+'</span>';}
          body+='</div>';
        }
      }
      body+='<div style="height:4px"></div>';
      body+='<button class="btn-secondary" onclick="ntSelectWho(null)">← All options</button>';
      return screenShell('Plan a Trip',body,S._ntPartyId?'Create trip →':null,S._ntPartyId?'ntCreateTripExisting()':null,cancelLabel,null,cancelArg);
    }

  }

  /* ── Step 3a: Name the new group (name first) ── */
  if(S._ntStep==='group'){
    body+='<div class="hub-section-label" style="margin-left:0">Name your group</div>';
    body+='<div class="field"><label class="field-label">What do you want to call this group?</label><input class="field-input" id="nt-gname" placeholder="e.g. Smith Family" autocomplete="off" value="'+esc(S._ntGname||'')+'"><div style="font-size:12px;color:var(--muted);margin-top:6px">A Group is a reusable list of people you can plan future trips with. You\'ll add people next.</div></div>';
    body+='<button class="btn-secondary" onclick="ntBack()">← Back</button>';
    return screenShell('Plan a Trip',body,'Next →','ntGroupNameNext()',cancelLabel,null,cancelArg);
  }

  /* ── Step 3b: Add people to the new group ── */
  if(S._ntStep==='people'){
    body+='<div class="hub-section-label" style="margin-left:0">Who\'s in '+esc(S._ntGname||'your group')+'?</div>';
    body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:13px">Add anyone else who\'s coming, or leave blank to travel solo.</div>';
    var pc=S._ntPeopleCount||1;
    for(var pi=0;pi<pc;pi++){
      var pre=(S._ntPeople&&S._ntPeople[pi])||{};
      body+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center">';
      body+='<input id="nt-name-'+pi+'" type="text" class="field-input" placeholder="First name" style="flex:1;margin:0" autocomplete="off" value="'+esc(pre.name||'')+'">';
      body+='<input id="nt-email-'+pi+'" type="email" class="field-input" placeholder="Email (optional)" style="flex:1.4;margin:0" autocomplete="off" value="'+esc(pre.email||'')+'">';
      if(pc>1)body+='<button class="btn-icon" onclick="ntRemovePerson('+pi+')" style="flex:none">×</button>';
      body+='</div>';
    }
    body+='<button class="btn-secondary" onclick="ntAddPerson()">+ Add another person</button>';
    body+='<button class="btn-secondary" onclick="ntBack()">← Back</button>';
    return screenShell('Plan a Trip',body,'Create trip →','ntCreateTripFromGroup()',cancelLabel,null,cancelArg);
  }

  /* ── Step: Invite the people you just added (add-people path) ── */
  if(S._ntStep==='invite'){
    var invP=(S._ntInvite||[]).map(function(id){return person(id);}).filter(Boolean);
    var invMail=invP.filter(function(p){return p.email;});
    body+='<div class="hub-section-label" style="margin-left:0">Invite your group</div>';
    body+='<div class="body-empty" style="text-align:left;padding:4px 2px 12px;font-size:13px">Your trip is saved. Send each person a personal link — they tap it, sign in, and land right in your trip. (No one is emailed automatically.)</div>';
    if(invMail.length>1){
      body+='<button class="btn-secondary green" onclick="emailInviteAll()">Email everyone with an address ('+invMail.length+')</button>';
      body+='<div style="height:6px"></div>';
    }
    for(var vi=0;vi<invP.length;vi++){var vp=invP[vi];
      body+='<div class="hub-row" style="cursor:default;flex-wrap:wrap;gap:6px">';
      body+='<div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(vp.name)+'</div>';
      body+='<div class="hub-sub">'+(vp.email?esc(vp.email):'no email — copy a link to share')+'</div></div>';
      body+='<button class="btn-secondary" style="margin:0;width:auto;padding:6px 10px;min-height:0;font-size:13px" onclick="copyInviteLink(\''+vp.id+'\')">Copy link</button>';
      if(vp.email)body+='<button class="btn-secondary" style="margin:0;width:auto;padding:6px 10px;min-height:0;font-size:13px" onclick="emailInviteLink(\''+vp.id+'\')">Email</button>';
      body+='</div>';
    }
    body+='<div class="body-empty" style="text-align:left;padding:10px 2px 0;font-size:12px;color:var(--muted)">You can always send these links later from Admin → People.</div>';
    return screenShell('Plan a Trip',body,'Done','ntFinish(true)',null,null,null);
  }

  /* ── Step 4: All set / notify (existing-group path only) ── */
  var party4=partyById(S._ntPartyId)||{},pname4=party4.name||'your group';
  var notJoined4=partyPeople(S._ntPartyId||'').filter(function(p){return !p.uid&&p.id!==S.persona;});
  var alreadyIn4=partyPeople(S._ntPartyId||'').filter(function(p){return !!p.uid&&p.id!==S.persona;});
  body+='<div class="hub-section-label" style="margin-left:0">Your trip is ready!</div>';
  if(!notJoined4.length){
    body+='<div class="body-empty" style="padding:4px 2px 14px;font-size:13px">Everyone in <strong>'+esc(pname4)+'</strong> already has the app — they\'ll see this trip as soon as you\'re done.</div>';
  }else{
    body+='<div class="body-empty" style="padding:4px 2px 10px;font-size:13px">These people don\'t have the app yet. Send them a link and they\'ll land right in your trip:</div>';
    for(var ii=0;ii<notJoined4.length;ii++){var ip=notJoined4[ii];
      body+='<div class="hub-row" style="cursor:default;flex-wrap:wrap;gap:6px">';
      body+='<div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(ip.name)+'</div>';
      body+='<div class="hub-sub">'+(ip.email?esc(ip.email):'no email on file — add from Admin → People')+'</div></div>';
      if(ip.email){
        body+='<button class="btn-secondary" style="margin:0;width:auto;padding:6px 10px;min-height:0;font-size:13px" onclick="copyInviteLink(\''+ip.id+'\')">Copy link</button>';
        body+='<button class="btn-secondary" style="margin:0;width:auto;padding:6px 10px;min-height:0;font-size:13px" onclick="emailInviteLink(\''+ip.id+'\')">Email</button>';
      }
      body+='</div>';
    }
  }
  if(alreadyIn4.length){
    body+='<div style="margin:10px 0 4px"><label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" id="nt-notify" '+(S._notify?'checked':'')+' onchange="S._notify=this.checked"> Notify '+esc(pname4)+' that a new trip is ready</label></div>';
  }
  body+='<button class="btn-secondary" onclick="ntBack()">← Change group</button>';
  return screenShell('Plan a Trip',body,'Done','ntFinish()',null,null,null);
}


/* ── Sign-in front door ──────────────────────────────────── */
function scrSignIn(){
  var body='<div style="text-align:center;padding:20px 6px 4px">';
  body+='<div style="font-family:\'Fraunces\',Georgia,serif;font-size:28px;font-weight:700;color:var(--ink)">Baseline Tap</div>';
  body+='<div class="body-empty" style="padding:10px 8px 18px">Sign in to load your trips. Use the same account on every device and everything stays in sync.</div></div>';
  body+='<div class="hub-section-label" style="margin-left:0">Sign in with Google</div>';
  body+='<button class="btn-secondary green" onclick="cloudGoogleSignIn()">Sign in with Google</button>';
  body+='<div class="body-empty" style="text-align:left;padding:6px 2px 0;font-size:12px;color:var(--muted)">A Google sign-in window will pop up. If your browser blocks pop-ups, allow it for this site.</div>';
  return screenShell('Sign in',body,null,null,false);
}
/* Locked "we're checking who you are" gate. Shown the instant sign-in completes
   and held until onCloudSynced routes the user to their real destination (home,
   wizard, claim, or noaccess). Without this, the brief window between sign-in
   and the first sync finishing flashed whatever stale screen happened to be
   underneath — including a hub that still offered "Join with a code", which
   was confusing for users who clearly don't have access. */
function scrAuthWait(){
  var body='<div style="text-align:center;padding:48px 8px 32px">';
  body+='<div style="font-family:\'Fraunces\',Georgia,serif;font-size:24px;font-weight:700;color:var(--ink)">Signing you in…</div>';
  body+='<div class="body-empty" style="padding:14px 6px 0">Loading your trips. This should only take a moment.</div></div>';
  return screenShell('',body,null,null,false);
}
/* The Firebase SDK loads in the background after the page paints, so window.CLOUD
   may not exist yet if someone clicks immediately. Guard rather than throw. */
function cloudGoogleSignIn(){
  if(!(window.CLOUD&&window.CLOUD.signInGoogle)){toast('Still connecting — try again in a moment');return;}
  window.CLOUD.signInGoogle().catch(function(e){toast(e.message||'Sign-in failed');});
}

/* ── Claim your persona (one time per account) ───────────── */
function scrClaim(){
  var email=(window.CLOUD&&window.CLOUD.user)?(window.CLOUD.user.email||''):'';
  var body='<div class="body-empty" style="text-align:left;padding:2px 2px 12px">Signed in'+(email?' as <strong>'+esc(email)+'</strong>':'')+'.</div>';
  body+='<div class="hub-section-label" style="margin-left:0">Joining someone\'s plan?</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:13px">Enter the invite code they gave you.</div>';
  body+='<div class="field"><input class="field-input" id="claim-code" placeholder="Invite code" style="text-transform:uppercase"></div>';
  body+='<button class="btn-secondary" onclick="cloudJoinParty(\'claim-code\')">Join with a code</button>';
  body+='<div class="hub-section-label" style="margin-left:0">Or pick who you are</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:13px">This links your sign-in to your name, so you go straight in next time.</div>';
  body+='<div class="whoselect" style="margin-bottom:16px">';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];
    var taken=p.uid&&p.uid!==cloudUid();
    body+='<div class="who-opt'+(taken?' disabled" style="opacity:.45':'" onclick="claimPersona(\''+p.id+'\')')+'"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+(p.admin?' · Admin':'')+(taken?' · taken':'')+'</div>';
  }
  body+='</div>';
  body+='<div class="hub-section-label" style="margin-left:0">Account</div>';
  body+='<button class="btn-secondary" onclick="window.CLOUD.signOut()">Sign in as someone else</button>';
  body+=recoveryEscapes();
  return screenShell('Who are you?',body,null,null,false);
}
/* escape hatches for a device stuck on a sign-in/claim/no-access loop */
function recoveryEscapes(){
  var h='<div class="hub-section-label" style="margin-left:0">Stuck?</div>';
  h+='<button class="btn-secondary" onclick="resetDevice()">Reset this device</button>';
  h+='<div class="body-empty" style="text-align:left;padding:4px 2px 0;font-size:12px">Clears this device\'s local copy and reloads from the cloud. Safe — your cloud data is untouched.</div>';
  if(window.CLOUD&&window.CLOUD.isSuper){
    h+='<button class="btn-danger-link" onclick="startOver()">Something\'s wrong — reset my account</button>';
    h+='<div class="body-empty" style="text-align:left;padding:0 2px 0;font-size:12px">Super-admin: wipes your own space and starts fresh with just you.</div>';
  }
  return h;
}
/* non-destructive: drop the local cache and reload (re-pulls from cloud) */
function resetDevice(){
  if(!confirm('Reset this device? Clears the local copy and reloads from the cloud. Your cloud data is not deleted.'))return;
  try{Object.keys(localStorage).forEach(function(k){if(k.indexOf('dtp_')===0)localStorage.removeItem(k);});}catch(e){}
  location.reload();
}

/* ── Not on the guest list (invite-only) ─────────────────── */
function scrNoAccess(){
  var email=(window.CLOUD&&window.CLOUD.user)?(window.CLOUD.user.email||''):'';
  var body='<div style="text-align:center;padding:24px 8px">';
  body+='<div style="font-family:\'Fraunces\',Georgia,serif;font-size:24px;font-weight:700">You\'re not on the guest list</div>';
  body+='<div class="body-empty" style="padding:12px 6px">'+(email?'Signed in as <strong>'+esc(email)+'</strong>. ':'')+'Baseline Tap is invite-only. Ask whoever invited you for your sign-in link, or have the admin add your email.</div></div>';
  body+='<button class="btn-secondary" onclick="window.CLOUD.signOut()">Sign in with a different account</button>';
  body+=recoveryEscapes();
  return screenShell('No access',body,null,null,false);
}

/* authorized-accounts allowlist (managed inside the Planning Party module) */
function ownerAdd(){
  var e=val('owner-email');if(!e){toast('Enter an email');return;}
  window.CLOUD.addOwner(e).then(function(){toast('Account authorized');return window.CLOUD.listOwners();}).then(function(a){S._owners=a;renderScreen_inplace2();}).catch(function(er){toast(er.message||'Could not add');});
}
function ownerRemove(e){
  if(!confirm('Remove access for '+e+'?'))return;
  window.CLOUD.removeOwner(e).then(function(){toast('Removed');return window.CLOUD.listOwners();}).then(function(a){S._owners=a;renderScreen_inplace2();}).catch(function(er){toast(er.message||'Could not remove');});
}

/* ── First-run setup wizard (new authorized owner) ───────── */
function wizOwnerName(){
  var u=window.CLOUD&&window.CLOUD.user;
  return (u&&u.displayName)||((u&&u.email)?u.email.split('@')[0]:'Me');
}
/* wipe the demo seed and stand up a clean account for this owner. No group is
   created here — the owner explicitly chooses or creates one in the wizard, and
   that action is what creates the cloud workspace (tenant). */
function resetToBlank(){
  FAMILY=[];TRIPS=[];DAYS=[];VISITS=[];PARKHOURS=[];DINING=[];LLS=[];SHOWS=[];FLIGHTS=[];RESORTS=[];PARKRES=[];TICKETS=[];REBOOKS=[];NOTIFS=[];CHAT=[];
  PARTIES=[];
  var oid='p'+Date.now();
  var owner={id:oid,name:wizOwnerName(),color:PALETTE[0][0],admin:true,parties:[],email:(window.CLOUD&&window.CLOUD.user&&window.CLOUD.user.email)||'',uid:cloudUid()};
  FAMILY.push(owner);ALL_IDS=[oid];
  S.persona=oid;S.partyId=null;S.tripId=null;PACKING={};TODO=[];
  /* drop every per-trip day record locally so loadDays() can't resurrect a
     wiped trip's days from a stale dtp_days_<id> key */
  try{for(var _i=localStorage.length-1;_i>=0;_i--){var _k=localStorage.key(_i);if(_k&&(_k==='dtp_days'||_k.indexOf('dtp_days_')===0))localStorage.removeItem(_k);}}catch(e){}
  persist();save('dtp_persona',oid);savePartyId();saveTripId();
}
function startWizard(){openScreen({type:'newtrip'});}
function wizSkip(){
  S._freshTenant=false;
  resetToBlank();
  closeScreen();S.tab='home';render();
}
function emailInviteLink(pid){
  var p=person(pid);if(!p)return;
  if(!(window.CLOUD&&window.CLOUD.inParty&&window.CLOUD.inParty())){toast('Start a group first');return;}
  var url=location.origin+location.pathname+'#join='+window.CLOUD.partyCode()+(pid?'&as='+encodeURIComponent(pid):'');
  var subj=encodeURIComponent('Join our trip on Baseline Tap');
  var bd=encodeURIComponent('Hi '+p.name+',\n\nI\'m planning our trip on Baseline Tap. Tap this link, sign in, and you\'ll be added automatically:\n\n'+url+'\n');
  location.href='mailto:'+encodeURIComponent(p.email||'')+'?subject='+subj+'&body='+bd;
}
/* one email to everyone with an address — a generic join link they each
   open and pick their own name (no per-person &as= in a shared message) */
function emailInviteAll(ids){
  if(!(window.CLOUD&&window.CLOUD.inParty&&window.CLOUD.inParty())){toast('Start a Group first (Account → Sync)');return;}
  var list=ids||S._ntInvite||[];
  var emails=list.map(function(id){return person(id);}).filter(function(p){return p&&p.email;}).map(function(p){return p.email;});
  if(!emails.length){toast('No email addresses to send to');return;}
  var url=location.origin+location.pathname+'#join='+window.CLOUD.partyCode();
  var subj=encodeURIComponent('Join our trip on Baseline Tap');
  var bd=encodeURIComponent('Hi,\n\nI\'m planning our trip on Baseline Tap. Tap this link, sign in, and pick your name to join:\n\n'+url+'\n');
  location.href='mailto:?bcc='+encodeURIComponent(emails.join(','))+'&subject='+subj+'&body='+bd;
}
/* ── Tenant management (shown on the Account screen) ─
   A user can belong to more than one tenant: their own (as admin) plus any
   tenant whose owner added them by email. The list comes from CLOUD.wids; the
   active one is CLOUD.wid. Tapping a non-active row in the switcher flips the
   active tenant and adopts its data. Authorized owners get a "Start another
   group" affordance below the list so they can spin up their own even while
   contributing to someone else's. */
function cloudSection(){
  if(!(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user))return '';
  var st=window.CLOUD.synced?'<span style="color:#16A34A;font-weight:600">syncing</span>':'connecting…';
  var h='<div class="hub-section-label" style="margin-left:0">Sync</div>';
  h+='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:13px">Signed in as <strong>'+esc(window.CLOUD.user.email||window.CLOUD.user.uid)+'</strong> · '+st+'.</div>';
  var wids=(window.CLOUD.wids||[]);
  if(wids.length){
    h+='<div class="hub-section-label" style="margin-left:0">Your tenants</div>';
    h+='<div id="tenant-list"><div class="body-empty" style="text-align:left;padding:0 2px 4px;font-size:12px">Loading…</div></div>';
    /* populate the list async (one workspace read per wid) */
    setTimeout(loadTenantList,0);
  }else{
    h+='<div class="hub-section-label" style="margin-left:0">Tenant</div>';
    h+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:13px">Name your tenant, then start it — others can join with a code.</div>';
    h+='<div class="field"><input class="field-input" id="party-name" placeholder="Tenant name (e.g. Smith Family)"></div>';
    h+='<button class="btn-secondary green" onclick="cloudCreateParty()">Start a Tenant</button>';
    h+='<div class="hub-section-label" style="margin-left:0">Join a tenant</div>';
    h+='<button class="btn-secondary" onclick="cloudJoinParty(\'cloud-join\')">Join with a code</button>';
    h+='<div class="field" style="margin-top:6px"><input class="field-input" id="cloud-join" placeholder="Enter an invite code" style="text-transform:uppercase"></div>';
  }
  /* Authorized owners who already have at least one tenant can create another
     one independently from here. First-time owners (wids.length===0) already
     have the "Start a Tenant" button in the no-tenant section above. */
  if(wids.length && window.CLOUD.isOwner){
    h+='<div class="hub-section-label" style="margin-left:0">New tenant</div>';
    h+='<div class="field"><input class="field-input" id="new-tenant-name" placeholder="Tenant name (e.g. Smith Family)"></div>';
    h+='<button class="btn-secondary green" onclick="cloudCreateNewTenant()">Create a new tenant</button>';
  }
  h+='<div class="hub-section-label" style="margin-left:0">Account</div>';
  h+='<button class="btn-secondary" onclick="cloudCheckInvites()">Check for new tenant invites</button>';
  h+='<button class="btn-secondary" onclick="cloudRefreshLocal()">Refresh from cloud</button>';
  h+='<button class="btn-secondary" onclick="logoutPersona()">Sign out</button>';
  return h;
}
/* An authorized owner who's currently a member of someone else's tenant
   creates their OWN separate workspace. C.createOwnTenant makes an EMPTY
   workspace, switches active onto it, and wipes the host tenant's local cache —
   it never writes the host's data anywhere. We then reload: the fresh-owner
   routing in onCloudSynced drops the user into the setup wizard for the new
   empty tenant. */
function cloudCreateOwnWorkspace(){
  var nm=val('own-ws-name');if(!nm){toast('Enter a name');return;}
  if(!(window.CLOUD&&window.CLOUD.createOwnTenant&&window.CLOUD.commitActive)){toast('Not signed in');return;}
  toast('Creating…');
  window.CLOUD.createOwnTenant(nm).then(function(){
    S._freshTenant=true;
    resetToBlank();
    S._seated=true;
    return window.CLOUD.commitActive();
  }).then(function(){
    publishAllInvites();
    toast('Workspace created');
    closeScreen();
    S.tab='home';
    openScreen({type:'newtrip'});   /* set up the first trip in the new tenant */
  }).catch(function(e){toast(e.message||'Could not create');});
}
/* manual trigger for autoJoinPendingInvite — useful when an owner just added
   our email and we don't want to sign out/in to pick it up, or when something
   went sideways and we want to retry. Surfaces the actual outcome (joined /
   already in / no invite / error) so the user knows what happened. */
/* Creates a brand-new empty tenant for an authorized owner who is already in
   one (or more) other tenants. Uses createOwnTenant which stops the listener
   and suppresses sync before any local writes, so the current tenant is never
   touched. After creation the app resets to a blank slate, commits it up into
   the new tenant, and drops into the trip wizard. */
function cloudCreateNewTenant(){
  if(!(window.CLOUD&&window.CLOUD.createOwnTenant&&window.CLOUD.commitActive)){toast('Not signed in');return;}
  var nm=val('new-tenant-name');if(!nm){toast('Enter a tenant name');return;}
  toast('Creating…');
  window.CLOUD.createOwnTenant(nm).then(function(){
    S._freshTenant=true;
    resetToBlank();
    S._seated=true;
    return window.CLOUD.commitActive();
  }).then(function(){
    publishAllInvites();
    toast('Tenant created');
    closeScreen();
    S.tab='home';
    openScreen({type:'newtrip'});
  }).catch(function(e){S._freshTenant=false;toast(e.message||'Could not create');});
}
function cloudCheckInvites(){
  if(!(window.CLOUD&&window.CLOUD.autoJoinPendingInvite)){toast('Not signed in');return;}
  toast('Checking…');
  window.CLOUD.autoJoinPendingInvite().then(function(r){
    if(!r){toast('No invite found');}
    else if(r.result==='joined')   toast('Added to '+(r.count===1?'a new tenant':r.count+' new tenants'));
    else if(r.result==='already')  toast('Already in '+(r.count===1?'that tenant':'all '+r.count+' invited tenants'));
    else if(r.result==='none')     toast('No pending invites for '+(window.CLOUD.user&&window.CLOUD.user.email||'this account'));
    else if(r.result==='error')    toast('Lookup failed: '+(r.error||'unknown'));
    /* always re-render so the tenant list reflects the LATEST C.wids — the
       list rendered earlier may have closed over a stale snapshot if it was
       loaded before sign-in's auto-join finished writing the profile. */
    if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();
  });
}
/* render the list of tenants the user belongs to into #tenant-list. Each row
   shows the name + a role hint (Active / Owner / Member) and switches to that
   tenant on tap. */
function loadTenantList(){
  if(!(window.CLOUD&&window.CLOUD.listMyTenants))return;
  try{console.log('[tenants] loadTenantList start, C.wids =',window.CLOUD.wids);}catch(e){}
  window.CLOUD.listMyTenants().then(function(list){
    try{console.log('[tenants] listMyTenants returned',list);}catch(e){}
    var el=document.getElementById('tenant-list');if(!el)return;
    if(!list.length){el.innerHTML='<div class="body-empty" style="text-align:left;padding:0 2px 4px;font-size:12px">No tenants yet.</div>';return;}
    /* Delete is only meaningful when the user has more than one tenant — the
       guard in cloudDeleteTenant refuses to delete the only one anyway, so
       showing the chip on a single-tenant row is just noise. */
    var canDelete=list.length>1;
    var chipBase='width:auto;margin:0;padding:7px 12px;font-size:12px;font-weight:600;border-radius:8px;cursor:pointer;flex-shrink:0';
    var html='';
    for(var i=0;i<list.length;i++){var t=list[i];
      var role=t.isActive?'Active · ':'';
      role+=t.isOwner?'You own this':'Member';
      var rowStyle=t.isActive?'background:#F0F9FF':'';
      var rowOnclick=t.isActive?'':' onclick="cloudSwitchTenant(\''+esc(t.wid)+'\')"';
      html+='<div class="hub-row" style="'+rowStyle+'"'+rowOnclick+'>'
        +'<div class="hub-main" style="pointer-events:none">'
        +'<div class="hub-title">'+esc(t.name)+'</div>'
        +'<div class="hub-sub">'+esc(role)+'</div>'
        +'</div>';
      if(t.isOwner && canDelete){
        html+='<button style="'+chipBase+';color:#B91C1C;background:#FEF2F2;border:1px solid #FCA5A5" onclick="event.stopPropagation();cloudDeleteTenant(\''+esc(t.wid)+'\')">Delete</button>';
      }
      html+='</div>';
    }
    el.innerHTML=html;
  }).catch(function(e){
    try{console.warn('[tenants] listMyTenants failed:',e&&e.message);}catch(_){}
    var el=document.getElementById('tenant-list');if(el)el.innerHTML='<div class="body-empty" style="text-align:left;padding:0 2px 4px;font-size:12px;color:#B91C1C">Could not load tenants.</div>';
  });
}
/* owner-deletes-their-own-tenant from the switcher. If they're deleting the
   ACTIVE tenant, switch to another in wids first (deleteMyTenant refuses to
   touch the active one to avoid yanking data out from under the live session).
   Then reload — wids changed and the active may have flipped. */
function cloudDeleteTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.deleteMyTenant))return;
  var t=(window.CLOUD.wids||[]).filter(function(w){return w===wid;})[0];
  if(!t){toast('Tenant not found');return;}
  if(!confirm('Permanently delete this tenant and ALL its data (groups, people, trips, lists)? This cannot be undone.'))return;
  toast('Deleting…');
  var isActive=window.CLOUD.wid===wid;
  var step=Promise.resolve();
  if(isActive){
    var next=(window.CLOUD.wids||[]).filter(function(w){return w!==wid;})[0]||null;
    if(!next){toast('You can\'t delete your only tenant');return;}
    /* mirror cloudSwitchTenant's persona clear so revalidateAfterSync doesn't
       evict us during the pre-delete switch */
    S.persona=null;S._seated=false;
    try{localStorage.removeItem('dtp_persona');}catch(e){}
    step=window.CLOUD.switchTenant(next);
  }
  step.then(function(){return window.CLOUD.deleteMyTenant(wid);})
    .then(function(){
      toast('Deleted');
      try{location.reload();}catch(e){if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}
    })
    .catch(function(e){toast(e.message||'Could not delete');});
}
/* switch the active tenant. Reloads after the adopt so the app re-inits from
   the new tenant's data cleanly (avoids in-memory leak across tenants).
   We MUST clear S.persona / S._seated / dtp_persona first: revalidateAfterSync
   runs inside rehydrate after the adopt and would otherwise see a persona that
   doesn't exist in the new tenant's family (and no by-uid match either, if we
   haven't claimed there before), then call leaveParty + revokeAccess — kicking
   us out of the tenant we just switched into. With persona cleared,
   revalidateAfterSync short-circuits; the reload's onCloudSynced re-claims via
   email matching (or by-uid match when switching back to a tenant we've
   already claimed in). */
function cloudSwitchTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.switchTenant))return;
  toast('Switching…');
  S.persona=null;S._seated=false;
  try{localStorage.removeItem('dtp_persona');}catch(e){}
  window.CLOUD.switchTenant(wid).then(function(){
    try{location.reload();}catch(e){if(typeof render==='function')render();}
  }).catch(function(e){toast(e.message||'Could not switch');});
}
/* manual hard re-pull — discards any in-memory drift and re-syncs from scratch */
function cloudRefreshLocal(){
  if(!(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.refreshLocal)){toast('Not signed in');return;}
  toast('Refreshing…');window.CLOUD.refreshLocal();
}
function cloudCreateParty(){
  var nm=val('party-name');if(!nm){toast('Enter a group name');return;}
  /* a "group" is a party inside the owner's tenant — add it locally so it
     actually appears (not an empty tenant), assign the owner to it, then ensure
     the cloud workspace exists so it syncs up. If a workspace already exists the
     new party just syncs via the normal push. */
  var gid='g'+Date.now();
  PARTIES.push({id:gid,name:nm,by:S.persona,color:PALETTE[PARTIES.length%PALETTE.length][0]});
  var me=person(S.persona);if(me){if(!Array.isArray(me.parties))me.parties=[];if(me.parties.indexOf(gid)<0)me.parties.push(gid);}
  S.partyId=gid;save('dtp_family',FAMILY);saveParties();savePartyId();
  var done=function(){toast('Group ready');if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();};
  if(window.CLOUD&&window.CLOUD.inParty&&!window.CLOUD.inParty()&&window.CLOUD.createParty){
    toast('Creating…');
    window.CLOUD.createParty(nm).then(function(){publishAllInvites();done();}).catch(function(e){toast(e.message||'Could not create');});
  }else done();
}
function cloudJoinParty(inputId){
  var code=val(inputId||'cloud-join');if(!code){toast('Enter a code');return;}
  toast('Joining…');
  window.CLOUD.joinParty(code).then(function(){toast('Joined the group');if(typeof onCloudSynced==='function')onCloudSynced();else if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not join');});
}
function cloudRenameParty(){
  var nm=val('party-rename');if(!nm){toast('Enter a name');return;}
  window.CLOUD.renameParty(nm).then(function(){toast('Renamed');if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not rename');});
}
function cloudLeaveParty(){
  if(!confirm('Leave this Group? Your device goes back to your own copy. The shared plan stays for everyone else.'))return;
  toast('Leaving…');
  window.CLOUD.leaveParty().then(function(){toast('Left the group');if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not leave');});
}
/* admin: a personal invite link — the invitee opens it, signs in, and is
   dropped straight into the party AS this person (no codes, no picking) */
function copyInviteLink(pid){
  if(!(window.CLOUD&&window.CLOUD.inParty&&window.CLOUD.inParty())){toast('Start a Group first (Account → Sync)');return;}
  var code=window.CLOUD.partyCode();
  var url=location.origin+location.pathname+'#join='+code+(pid?'&as='+encodeURIComponent(pid):'');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(function(){toast('Invite link copied');},function(){window.prompt('Copy this invite link:',url);});
  }else window.prompt('Copy this invite link:',url);
}

/* Persona switch (from the header). Two modes:
   - first run / signed out: a plain chooser, no account actions
   - signed in: switch persona, change your own PIN, or log out */
function scrPersona(){
  var signedIn=false;try{signedIn=!!localStorage.getItem('dtp_persona');}catch(e){}
  if(signedIn){
    /* account menu — no persona switching here; log out to become someone else */
    var me=person(S.persona);
    var body='<div class="hub-section-label" style="margin-left:0">Your account</div>';
    body+='<div class="body-empty" style="text-align:left;padding:0 2px 12px">You\'re '+esc(me?me.name:'')+(isAdmin()?' · Admin':'')+'.</div>';
    if(canCreateTrip())body+='<button class="btn-secondary green" onclick="openScreen({type:\'newtrip\'})">'+IC.plus+' Plan a new trip</button>';
    body+='<button class="btn-secondary" onclick="openScreen({type:\'persondetails\',pid:\''+S.persona+'\'})">My travel details</button>';
    body+=cloudSection();
    if(!(window.CLOUD&&window.CLOUD.enabled)){
      body+='<div class="hub-section-label" style="margin-left:0">Account</div>';
      body+='<button class="btn-secondary" onclick="logoutPersona()">Switch persona</button>';
    }
    body+='<div class="hub-section-label" style="margin-left:0">Device</div>';
    body+='<button class="btn-secondary" onclick="forceUpdate()">Force app update</button>';
    body+='<div class="body-empty" style="text-align:center;padding:14px 2px 0;font-size:12px">Baseline Tap · Build '+BUILD+'</div>';
    return screenShell('Account',body,null,null,'Done');
  }
  /* first run / after logout — choose who you are */
  var mem=ALL_IDS;
  var body='<div class="hub-section-label" style="margin-left:0">Choose your persona</div>';
  body+='<div class="whoselect" style="margin-bottom:16px">';
  for(var i=0;i<mem.length;i++){var p=person(mem[i]);if(!p)continue;
    body+='<div class="who-opt" onclick="setPersona(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+(p.admin?' · Admin':'')+'</div>';
  }
  body+='</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 12px">Your choice is stored on this device only — it personalises your packing list, to-dos and assignments.</div>';
  /* device recovery — reachable any time via Log out */
  body+='<div class="hub-section-label" style="margin-left:0">Device</div>';
  body+='<button class="btn-secondary" onclick="forceUpdate()">Force app update</button>';
  return screenShell('Choose Persona',body,null,null,false);
}

/* Manage personas — global add / rename / recolor / delete */
function colorOptions(sel){
  var h='';
  for(var i=0;i<PALETTE.length;i++)h+='<option value="'+PALETTE[i][0]+'"'+(PALETTE[i][0]===sel?' selected':'')+'>'+PALETTE[i][1]+'</option>';
  return h;
}
/* ── Planning Parties module — list of parties; tap to edit name + members ── */
function scrParties(){
  if(!isAdmin())return screenShell('Groups','<div class="body-empty" style="padding:24px 12px">Admin only — switch to an admin persona from the <strong>I am</strong> button.</div>',null,null,'Done');
  S._newParty=null;   /* back at the list → no pending add */
  var body='<div class="hub-section-label" style="margin-left:0">Groups</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">A group is any set of people who plan a trip together. Tap one to edit its name and members.</div>';
  for(var i=0;i<PARTIES.length;i++){var g=PARTIES[i];
    var np=partyPeople(g.id).length,nt=tripsInParty(g.id).length;
    body+='<button class="hub-row" onclick="openScreen({type:\'partyedit\',gid:\''+g.id+'\'})">'
      +'<div class="hub-icon" style="background:'+(g.color||'#6B4FA0')+'">'+IC.home+'</div>'
      +'<div class="hub-main"><div class="hub-title">'+esc(g.name)+'</div><div class="hub-sub">'+np+' '+(np===1?'person':'people')+' · '+nt+' '+(nt===1?'trip':'trips')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  return screenShell('Groups',body,null,null,'Done','<button class="sec-add" onclick="addParty()">Add group</button>');
}
function addParty(){var id='g'+Date.now();PARTIES.push({id:id,name:'New Group',by:S.persona,color:PALETTE[PARTIES.length%PALETTE.length][0]});saveParties();S._newParty=id;S._formInit=null;openScreen({type:'partyedit',gid:id});}
/* per-party editor: name + members (live) + the trips this party is on.
   Members and trip assignments commit immediately so you can tap through to a
   person\'s profile or a trip without losing them; the name uses Save. */
function scrPartyEdit(){
  if(!isAdmin())return screenShell('Edit Group','<div class="body-empty" style="padding:24px 12px">Admin only.</div>',null,null,'Done');
  var gid=(S.screen&&S.screen.gid),g=partyById(gid);
  if(!g)return screenShell('Edit Group','<div class="body-empty" style="padding:24px 12px">Group not found.</div>',null,null,'Done');
  var body='<div class="field"><label class="field-label">Group name</label><input class="field-input" id="pt-name" value="'+esc(g.name)+'"></div>';
  body+='<div class="field"><label class="field-label">Color</label><select class="field-select" id="pt-color">'+colorOptions(g.color)+'</select></div>';
  /* current members — tap a name to open their profile; Remove takes them out */
  var mem=partyPeople(gid);
  body+='<div class="hub-section-label" style="margin-left:0">Members ('+mem.length+')</div>';
  if(!mem.length)body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">No one in this group yet — add someone below.</div>';
  for(var i=0;i<mem.length;i++){var p=mem[i];
    body+='<div class="hub-row" style="padding-right:10px">'
      +'<button class="hub-main" style="background:none;border:0;text-align:left;padding:0;display:flex;align-items:center;gap:10px;flex:1;min-width:0" onclick="partyGotoPerson(\''+gid+'\',\''+p.id+'\')">'
      +'<span class="wdot" style="background:'+p.color+';flex-shrink:0">'+esc(p.name[0])+'</span>'
      +'<span style="min-width:0"><span class="hub-title" style="font-size:14px">'+esc(p.name)+(p.admin?' · Admin':'')+'</span></span></button>'
      +'<button class="btn-secondary" style="margin:0;width:auto;padding:6px 12px;min-height:0;flex-shrink:0" onclick="partyRemoveMember(\''+gid+'\',\''+p.id+'\')">Remove</button></div>';
  }
  /* add a member — pull someone from the roster, or create a brand-new person */
  var avail=FAMILY.filter(function(x){return !personInParty(x,gid);});
  body+='<div class="hub-section-label" style="margin-left:0">Add a member</div>';
  if(avail.length){
    body+='<div class="whoselect">';
    for(var j=0;j<avail.length;j++){var a=avail[j];
      body+='<div class="who-opt" onclick="partyAddMember(\''+gid+'\',\''+a.id+'\')"><span class="wdot" style="background:'+a.color+'">'+esc(a.name[0])+'</span>'+esc(a.name)+'<span class="wcheck">'+IC.plus+'</span></div>';
    }
    body+='</div>';
  }
  body+='<button class="btn-secondary" onclick="addPersonToParty(\''+gid+'\')">'+IC.plus+' New person</button>';
  /* trips assigned to this party */
  var trips=tripsInParty(gid);
  body+='<div class="hub-section-label" style="margin-left:0">Trips ('+trips.length+')</div>';
  if(!trips.length)body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">No trips assigned to this group yet.</div>';
  for(var k=0;k<trips.length;k++){var t=trips[k];var mc=(t.members||[]).length;
    body+='<button class="hub-row" onclick="partyGotoTrip(\''+gid+'\',\''+t.id+'\')"><div class="hub-icon" style="background:'+(t.color||'#0E7490')+'">'+IC.map+'</div>'
      +'<div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(t.name)+'</div><div class="hub-sub">'+esc(t.dates||'')+' · '+mc+' '+(mc===1?'person':'people')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  /* assign an existing trip to this party (one party per trip — this moves it) */
  var otherTrips=TRIPS.filter(function(tt){return !(tt.parties&&tt.parties.indexOf(gid)>=0);});
  if(otherTrips.length){
    body+='<div class="hub-section-label" style="margin-left:0">Add a trip to this group</div>';
    body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">Each trip belongs to one group — adding it here moves it from its current group.</div><div class="whoselect">';
    for(var m=0;m<otherTrips.length;m++){var ot=otherTrips[m],cur=partyById((ot.parties||[])[0]);
      body+='<div class="who-opt" onclick="tripSetParty(\''+ot.id+'\',\''+gid+'\')"><span class="wdot" style="background:'+(ot.color||'#0E7490')+'"></span>'+esc(ot.name)+(cur?' <span style="color:#9CA3AF;font-size:12px">(in '+esc(cur.name)+')</span>':'')+'<span class="wcheck">'+IC.plus+'</span></div>';
    }
    body+='</div>';
  }
  body+='<button class="btn-danger-link" onclick="partyDelete(\''+gid+'\')">Remove this group</button>';
  return screenShell('Edit '+esc(g.name),body,'Save','savePartyEdit(\''+gid+'\')','Cancel',null,'backToParties()');
}
/* persist the party name + color from the inputs (used on Save and before
   navigating away) */
function ptSaveName(gid){var g=partyById(gid);if(!g)return;var changed=false;
  var nm=val('pt-name');if(nm&&nm!==g.name){g.name=nm;changed=true;if(window.CLOUD&&S.partyId===gid&&window.CLOUD.renameParty)window.CLOUD.renameParty(nm).catch(function(){});}
  var cl=val('pt-color');if(cl&&cl!==g.color){g.color=cl;changed=true;}
  if(changed)saveParties();}
function partyAddMember(gid,pid){var p=person(pid);if(!p)return;if(!Array.isArray(p.parties))p.parties=[];if(p.parties.indexOf(gid)<0)p.parties.push(gid);save('dtp_family',FAMILY);refreshTripMembers(gid);renderScreen_inplace2();}
function partyRemoveMember(gid,pid){var p=person(pid);if(!p||!p.parties||p.parties.indexOf(gid)<0)return;if(p.parties.length<=1){toast('Everyone needs at least one group');return;}p.parties=p.parties.filter(function(x){return x!==gid;});save('dtp_family',FAMILY);refreshTripMembers(gid);renderScreen_inplace2();}
function partyGotoPerson(gid,pid){ptSaveName(gid);S._newParty=null;S._formInit=null;openScreen({type:'personedit',pid:pid});}
function partyGotoTrip(gid,tid){ptSaveName(gid);S._newParty=null;openTripPlanning(tid);}
function savePartyEdit(gid){var g=partyById(gid);if(!g){backToParties();return;}ptSaveName(gid);S._newParty=null;toast('Group saved');backToParties();}

/* ── cross-links: jump from a party/person/trip into the trip planning page ── */
function openTripPlanning(tid){
  var t=tripById(tid);if(!t)return;
  S.tripId=tid;saveTripId();
  if(t.parties&&t.parties[0]){S.partyId=t.parties[0];savePartyId();}
  ensureActiveParty();ensureVisibleTrip();
  closeScreen();S.tab='home';S.dayIdx=0;S.open=defOpen();S.fmode='all';S.filter.clear();render();
}
/* one party per trip: assigning here replaces the trip\'s party */
function tripSetParty(tid,gid){var t=tripById(tid);if(!t)return;t.parties=[gid];save('dtp_trips',TRIPS);toast('Trip moved');renderScreen_inplace2();}

/* ── Trips module (admin): every trip, regardless of active party ── */
function scrAllTrips(){
  if(!isAdmin())return screenShell('Trips','<div class="body-empty" style="padding:24px 12px">Admin only.</div>',null,null,'Done');
  var body='<div class="hub-section-label" style="margin-left:0">Trips</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Every trip in this tenant. Tap one to edit its name, dates, group and more.</div>';
  for(var i=0;i<TRIPS.length;i++){var t=TRIPS[i];var g=partyById((t.parties||[])[0]);var mc=(t.members||[]).length;
    var sub=(g?esc(g.name):'No group')+' · '+mc+' '+(mc===1?'person':'people')+(t.dates?' · '+esc(t.dates):'');
    body+='<button class="hub-row" onclick="openScreen({type:\'tripedit\',tripId:\''+t.id+'\'})"><div class="hub-icon" style="background:'+(t.color||'#0E7490')+'">'+IC.map+'</div>'
      +'<div class="hub-main"><div class="hub-title">'+esc(t.name)+'</div><div class="hub-sub">'+sub+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  return screenShell('Trips',body,null,null,'Done','<button class="sec-add" onclick="openScreen({type:\'newtrip\'})">Add trip</button>');
}
function partyDelete(gid){
  if(PARTIES.length<=1){toast('Keep at least one group');return;}
  var nt=tripsInParty(gid).length;
  if(nt){toast('Move its '+nt+' '+(nt===1?'trip':'trips')+' to another group first (trip editor)');return;}
  var g=partyById(gid);
  if(!confirm('Remove group “'+(g?g.name:'')+'”? People stay, just not in this group.'))return;
  var fallback=PARTIES.filter(function(x){return x.id!==gid;})[0].id;
  FAMILY.forEach(function(p){if(p.parties&&p.parties.indexOf(gid)>=0){p.parties=p.parties.filter(function(x){return x!==gid;});if(!p.parties.length)p.parties=[fallback];}});
  PARTIES=PARTIES.filter(function(x){return x.id!==gid;});
  if(S.partyId===gid)ensureActiveParty();
  save('dtp_parties',PARTIES);save('dtp_family',FAMILY);savePartyId();backToParties();
}
function backToParties(){
  if(S._newParty){var nid=S._newParty;S._newParty=null;
    if(partyById(nid)){PARTIES=PARTIES.filter(function(x){return x.id!==nid;});
      FAMILY.forEach(function(p){if(p.parties&&p.parties.indexOf(nid)>=0){p.parties=p.parties.filter(function(x){return x!==nid;});if(!p.parties.length&&PARTIES[0])p.parties=[PARTIES[0].id];}});
      save('dtp_parties',PARTIES);save('dtp_family',FAMILY);}}
  S._formInit=null;openScreen({type:'parties'});
}

/* ── People module — the roster of everyone on the trips ── */
function scrPersonas(){
  if(!isAdmin())return screenShell('People','<div class="body-empty" style="padding:24px 12px">Admin only — switch to an admin persona from the <strong>I am</strong> button.</div>',null,null,'Done');
  S._newPerson=null;   /* back at the list → no pending add */
  var body='<div class="hub-section-label" style="margin-left:0">People</div>';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];
    var bits=[];if(p.admin)bits.push('Admin');
    var pn=(p.parties||[]).length;bits.push(pn+' '+(pn===1?'group':'groups'));
    bits.push(p.uid?'signed in':'not joined');
    body+='<button class="hub-row" onclick="openScreen({type:\'personedit\',pid:\''+p.id+'\'})">'
      +'<div class="hub-icon" style="background:'+p.color+'">'+esc(p.name[0])+'</div>'
      +'<div class="hub-main"><div class="hub-title">'+esc(pfullname(p))+'</div><div class="hub-sub">'+bits.join(' · ')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  body+='<div class="body-empty" style="text-align:left;padding:10px 2px 0;font-size:12px">Tap a person to edit their details or copy their invite link. Trip membership is managed through groups.</div>';
  return screenShell('People',body,null,null,'Done','<button class="sec-add" onclick="addPersona()">Add person</button>');
}

/* ── Authorized Users module — who may sign in at all (super-admin) ── */
function openOwners(){
  S._owners=S._owners||[];openScreen({type:'owners'});
  if(window.CLOUD&&window.CLOUD.listOwners)window.CLOUD.listOwners().then(function(a){S._owners=a;if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not load');});
}
function scrOwners(){
  if(!(window.CLOUD&&window.CLOUD.isSuper))return screenShell('Authorized Users','<div class="body-empty" style="padding:24px 12px">Super-admin only.</div>',null,null,'Done');
  var owners=S._owners||[];
  var body='<div class="hub-section-label" style="margin-left:0">Authorized users</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:12px">Emails allowed to sign in. Anyone here (your kids included) can create their own Group and invite people. Everyone else in the world is blocked. You\'re always allowed.</div>';
  if(!owners.length)body+='<div class="body-empty" style="padding:8px 2px">No one added yet.</div>';
  for(var k=0;k<owners.length;k++)
    body+='<div class="hub-row" style="cursor:default;flex-direction:column;align-items:stretch;gap:8px">'
      +'<div class="hub-title" style="font-size:14px;word-break:break-all">'+esc(owners[k])+'</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:6px">'
        +'<button class="btn-secondary" style="margin:0;width:auto;padding:6px 10px;min-height:0" onclick="copyOwnerLink()">Copy link</button>'
        +'<button class="btn-secondary" style="margin:0;width:auto;padding:6px 10px;min-height:0" onclick="emailOwnerInvite(\''+esc(owners[k])+'\')">Email invite</button>'
        +'<button class="btn-secondary" style="margin:0;width:auto;padding:6px 10px;min-height:0" onclick="ownerRemove(\''+esc(owners[k])+'\')">Remove</button>'
      +'</div></div>';
  body+='<div class="hub-section-label" style="margin-left:0">Authorize a new user</div>';
  body+='<div class="field"><input class="field-input" id="owner-email" type="email" inputmode="email" placeholder="their@email.com"></div>';
  body+='<button class="btn-secondary green" onclick="ownerAdd()">Authorize</button>';
  body+='<div class="body-empty" style="text-align:left;padding:10px 2px 0;font-size:12px">They just open the app and sign in with this Google account — the setup wizard starts automatically. No invite code needed for owners.</div>';
  return screenShell('Authorized Users',body,null,null,'Done');
}
/* copy the plain app link to share any way you like (text, chat, etc.) */
function copyOwnerLink(){
  var url=location.origin+location.pathname;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(function(){toast('App link copied');},function(){window.prompt('Copy this link:',url);});
  }else window.prompt('Copy this link:',url);
}
/* email a new trip owner the app link + how to get in (they just sign in) */
function emailOwnerInvite(email){
  var url=location.origin+location.pathname;
  var subj=encodeURIComponent('Your Baseline Tap access');
  var bd=encodeURIComponent('You\'re set up on Baseline Tap.\n\nOpen this link and sign in with your Google account ('+email+'). Your trip setup starts automatically:\n\n'+url+'\n');
  location.href='mailto:'+encodeURIComponent(email)+'?subject='+subj+'&body='+bd;
}

/* ── Super-admin console: every tenant (family workspace) ── */
function openTenants(){
  if(!(window.CLOUD&&window.CLOUD.isSuper)){toast('Super-admin only');return;}
  S._tenants=null;openScreen({type:'tenants'});
  window.CLOUD.listWorkspaces().then(function(a){S._tenants=a;if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){S._tenants=[];toast(e.message||'Could not load');renderScreen_inplace2();});
}
function scrTenants(){
  if(!(window.CLOUD&&window.CLOUD.isSuper))return screenShell('All Tenants','<div class="body-empty" style="padding:24px 12px">Super-admin only.</div>',null,null,'Done');
  var body='<div class="hub-section-label" style="margin-left:0">Every tenant</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Each authorized owner has their own isolated space (a tenant). Tap one to see (and manage) their groups, people and trips.</div>';
  if(S._tenants===null){body+='<div class="body-empty" style="padding:8px 2px">Loading…</div>';return screenShell('All Tenants',body,null,null,'Done');}
  if(!S._tenants.length){body+='<div class="body-empty" style="padding:8px 2px">No tenants yet. They appear once an owner signs in and creates one.</div>';return screenShell('All Tenants',body,null,null,'Done');}
  for(var i=0;i<S._tenants.length;i++){var w=S._tenants[i];
    var title=w.ownerName||w.byEmail||w.name||'(unnamed)';
    var parts=[];if(w.parties&&w.parties.length)parts.push(w.parties.join(', '));
    if(w.byEmail)parts.push(w.byEmail);
    parts.push(w.memberCount+' '+(w.memberCount===1?'member':'members'));
    body+='<button class="hub-row" onclick="openTenant(\''+esc(w.wid)+'\')"><div class="hub-icon" style="background:#7C2D12">'+IC.home+'</div>'
      +'<div class="hub-main"><div class="hub-title">'+esc(title)+'</div><div class="hub-sub">'+esc(parts.join(' · '))+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  return screenShell('All Tenants',body,null,null,'Done');
}
function openTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.isSuper)){toast('Super-admin only');return;}
  S._tenantData=null;S._tenantWid=wid;
  var nm='';for(var i=0;i<(S._tenants||[]).length;i++)if(S._tenants[i].wid===wid)nm=S._tenants[i].ownerName||S._tenants[i].byEmail||S._tenants[i].name;
  S._tenantName=nm;openScreen({type:'tenant',wid:wid});
  window.CLOUD.readWorkspace(wid).then(function(map){S._tenantData=map;renderScreen_inplace2();}).catch(function(e){S._tenantData={};toast(e.message||'Could not load');renderScreen_inplace2();});
}
function scrTenant(){
  if(!(window.CLOUD&&window.CLOUD.isSuper))return screenShell('Family','<div class="body-empty" style="padding:24px 12px">Super-admin only.</div>',null,null,'Done');
  var d=S._tenantData, nm=S._tenantName||'Family';
  if(d===null)return screenShell(nm,'<div class="body-empty" style="padding:24px 12px">Loading…</div>',null,null,'Done');
  var parties=d.dtp_parties||[], fam=d.dtp_family||[], trips=d.dtp_trips||[];
  var body='<div class="body-empty" style="text-align:left;padding:2px 2px 8px;font-size:12px">Read-only view of this tenant\'s data. Use “Manage this tenant” to make changes.</div>';
  body+='<div class="hub-section-label" style="margin-left:0">Groups ('+parties.length+')</div>';
  for(var i=0;i<parties.length;i++)body+='<div class="hub-row" style="cursor:default"><div class="hub-icon" style="background:#6B4FA0">'+IC.home+'</div><div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(parties[i].name||'(unnamed)')+'</div></div></div>';
  body+='<div class="hub-section-label" style="margin-left:0">People ('+fam.length+')</div>';
  for(var j=0;j<fam.length;j++){var p=fam[j];var bits=[];if(p.admin)bits.push('Admin');if(p.email)bits.push(esc(p.email));bits.push(p.uid?'signed in':'not joined');
    body+='<div class="hub-row" style="cursor:default"><div class="hub-icon" style="background:'+(p.color||'#475569')+'">'+esc((p.name||'?')[0])+'</div><div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(pfullname(p)||'(unnamed)')+'</div><div class="hub-sub">'+bits.join(' · ')+'</div></div></div>';}
  body+='<div class="hub-section-label" style="margin-left:0">Trips ('+trips.length+')</div>';
  for(var k=0;k<trips.length;k++){var t=trips[k];var mc=(t.members||[]).length;
    body+='<div class="hub-row" style="cursor:default"><div class="hub-icon" style="background:'+(t.color||'#475569')+'">'+IC.map+'</div><div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(t.name||'(unnamed)')+'</div><div class="hub-sub">'+esc(t.dates||(t.start||'')+(t.end?' – '+t.end:''))+' · '+mc+' '+(mc===1?'person':'people')+'</div></div></div>';}
  var own=(window.CLOUD&&window.CLOUD.wid&&window.CLOUD.wid===S._tenantWid);
  /* one-time fix for stale tenant names (e.g. the old "Planning Party" default
     left over from previous builds). Inline field so iOS PWA doesn't suppress
     a window.prompt. */
  var curName=(function(){for(var z=0;z<(S._tenants||[]).length;z++)if(S._tenants[z].wid===S._tenantWid)return S._tenants[z].name||'';return '';})();
  body+='<div class="hub-section-label" style="margin-left:0">Tenant name</div>';
  body+='<div class="field"><input class="field-input" id="tenant-rename" value="'+esc(curName)+'" placeholder="Tenant name"></div>';
  body+='<button class="btn-secondary" onclick="superRenameTenant(\''+esc(S._tenantWid)+'\')">Save name</button>';
  body+='<div class="hub-section-label" style="margin-left:0">Danger zone</div>';
  if(own)body+='<div class="body-empty" style="text-align:left;padding:0 2px;font-size:12px">This is your own active space — manage it from your own account.</div>';
  else body+='<button class="btn-danger-link" onclick="deleteTenant(\''+esc(S._tenantWid)+'\')">Delete this tenant permanently</button>';
  return screenShell(nm,body,null,null,'Back','<button class="sec-add" onclick="enterTenant(\''+esc(S._tenantWid)+'\')">Manage this tenant</button>','openTenants()');
}
/* super-admin one-time rename for a stale tenant name (e.g. legacy defaults
   left over from older builds). Uses C.renameTenant which writes to the
   workspace doc; refreshes the tenants list so the new name shows everywhere. */
function superRenameTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.isSuper)){toast('Super-admin only');return;}
  if(!(window.CLOUD.renameTenant))return;
  var nm=val('tenant-rename');
  if(!nm){toast('Enter a name');return;}
  toast('Renaming…');
  window.CLOUD.renameTenant(wid,nm).then(function(){
    /* update cached tenants list so the title at the top + the parent screen
       both pick up the new name without a full reload */
    for(var i=0;i<(S._tenants||[]).length;i++)if(S._tenants[i].wid===wid)S._tenants[i].name=nm;
    S._tenantName=nm;
    toast('Renamed');
    if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();
  }).catch(function(e){toast(e.message||'Could not rename');});
}
/* super-admin: permanently remove an orphaned/unwanted tenant */
function deleteTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.isSuper)){toast('Super-admin only');return;}
  if(!confirm('Permanently delete this entire tenant and ALL its data (groups, people, trips, lists)? This cannot be undone.'))return;
  toast('Deleting…');
  window.CLOUD.deleteWorkspace(wid).then(function(){toast('Deleted');openTenants();}).catch(function(e){toast(e.message||'Could not delete');});
}
/* switch INTO a tenant to manage it (super-admin); banner offers Exit */
function enterTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.isSuper)){toast('Super-admin only');return;}
  if(!confirm('Manage this tenant? You\'ll be editing their live data. Your own data is untouched and you can Exit anytime.'))return;
  S._superSelf={persona:S.persona,partyId:S.partyId,tripId:S.tripId};
  toast('Loading…');
  window.CLOUD.enterWorkspace(wid).then(function(){
    /* act as one of their admins so permissions/UI resolve */
    var adm=FAMILY.filter(function(p){return p.admin;})[0]||FAMILY[0];
    if(adm){S.persona=adm.id;save('dtp_persona',adm.id);}
    ensureActiveParty();
    /* auto-pick one of their trips so the agenda/plan/lists tabs have content
       (otherwise every tab falls back to the "no trip" landing) */
    if(noTripSelected()){var vt=visibleTrips();S.tripId=(vt[0]&&vt[0].id)||null;saveTripId();}
    closeScreen();S.tab='home';render();toast('Managing '+partyLabel());
  }).catch(function(e){toast(e.message||'Could not open');});
}
function exitTenant(){
  toast('Returning…');
  window.CLOUD.exitWorkspace().then(function(){
    var s=S._superSelf||{};S._superSelf=null;
    if(s.persona&&person(s.persona)){S.persona=s.persona;save('dtp_persona',s.persona);}
    ensureActiveParty();if(s.partyId&&partyById(s.partyId)){S.partyId=s.partyId;savePartyId();}
    ensureVisibleTrip();if(s.tripId)S.tripId=s.tripId;
    S.tab='home';render();toast('Back to your own data');
  }).catch(function(e){toast(e.message||'Could not exit');});
}


/* shared travel-detail inputs (booking metadata) — used by both the self-service
   editor and the admin person editor. `pre` is the id prefix (pd / pe). */
function personTravelFields(p,pre,opts){
  var h='';
  /* the admin editor renders email up in its identity section, so it passes
     noEmail; the self-service editor renders it here. */
  if(!(opts&&opts.noEmail))
    h+='<div class="field"><label class="field-label">Email</label><input class="field-input" id="'+pre+'-email" type="email" inputmode="email" value="'+esc(p.email||'')+'" placeholder="name@example.com"></div>';
  /* The admin editor already shows First/Last name in its identity section, so it
     passes noName to avoid a duplicate pair. The self-service editor has no such
     section and renders them here. */
  if(!(opts&&opts.noName)){
    h+='<div class="field"><label class="field-label">First name <span class="opt">(as on ID)</span></label><input class="field-input" id="'+pre+'-first" value="'+esc(p.name||'')+'" placeholder="e.g. Nancy"></div>';
    h+='<div class="field"><label class="field-label">Last name <span class="opt">(as on ID)</span></label><input class="field-input" id="'+pre+'-last" value="'+esc(p.lastName||'')+'" placeholder="e.g. Smith"></div>';
  }
  h+='<div class="field"><label class="field-label">TSA PreCheck / Known Traveler #</label><input class="field-input" id="'+pre+'-ktn" inputmode="numeric" value="'+esc(p.ktn||'')+'"></div>';
  h+='<div class="field"><label class="field-label">Passport # <span class="opt">(international travel only)</span></label><input class="field-input" id="'+pre+'-passport" value="'+esc(p.passport||'')+'"></div>';
  h+='<div class="field"><label class="field-label">Frequent flyer numbers <span class="opt">(one per line)</span></label><textarea class="field-input" id="'+pre+'-ff" rows="3" style="resize:vertical" placeholder="e.g. Delta 1234567890">'+esc(p.frequentFlyer||'')+'</textarea></div>';
  return h;
}
function captureTravel(p,pre,opts){
  if(!p)return;
  p.email=val(pre+'-email');
  /* First name is the same field the wizard sets (p.name) — only overwrite when
     a value is given so clearing the box can't leave a person nameless. When the
     caller renders the name fields itself (noName), don't read them here. */
  if(!(opts&&opts.noName)){
    var _first=val(pre+'-first');if(_first)p.name=_first;
    p.lastName=val(pre+'-last');
  }
  p.fullName=((p.name||'')+' '+(p.lastName||'')).trim();   /* derived legal name */
  p.ktn=val(pre+'-ktn');p.passport=val(pre+'-passport');
  var ff=document.getElementById(pre+'-ff');p.frequentFlyer=(ff&&typeof ff.value==='string')?ff.value.trim():'';
}
/* Per-person travel details — self-service editor (account screen) */
function scrPersonDetails(){
  var pid=(S.screen&&S.screen.pid)||S.persona,p=person(pid);
  if(!p)return screenShell('Travel Details','<div class="body-empty" style="padding:24px 12px">Person not found.</div>',null,null,'Done');
  if(pid!==S.persona&&!isAdmin())return screenShell('Travel Details','<div class="body-empty" style="padding:24px 12px">You can only edit your own details.</div>',null,null,'Done');
  var body='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:13px">Used when booking flights and at check-in. Visible to you and admins.</div>';
  body+=personTravelFields(p,'pd');
  return screenShell((pid===S.persona?'My Travel Details':esc(p.name)+'\'s Travel Details'),body,'Save','savePersonDetails(\''+pid+'\')');
}
function savePersonDetails(pid){
  var p=person(pid);if(!p){closeScreen();return;}
  if(pid!==S.persona&&!isAdmin()){toast('You can only edit your own details');closeScreen();return;}
  var oldEmail=p.email;
  captureTravel(p,'pd');
  save('dtp_family',FAMILY);syncPersonInvite(p,oldEmail);toast('Travel details saved');closeScreen();render();
}

/* Full person editor (admin) — opened by tapping a person in Manage People.
   Identity + role + groups + PIN + travel details in one form. */
function scrPersonEdit(){
  if(!isAdmin())return screenShell('Edit Person','<div class="body-empty" style="padding:24px 12px">Admin only.</div>',null,null,'Done');
  var pid=(S.screen&&S.screen.pid),p=person(pid);
  if(!p)return screenShell('Edit Person','<div class="body-empty" style="padding:24px 12px">Person not found.</div>',null,null,'Done');
  if(S._formInit!=='person:'+pid){S._peAdmin=!!p.admin;S._peParties=new Set(p.parties||[]);S._formInit='person:'+pid;}
  var body='<div class="field"><label class="field-label">First name</label><input class="field-input" id="pe-name" value="'+esc(p.name)+'"></div>';
  body+='<div class="field"><label class="field-label">Last name <span class="opt">(as on ID)</span></label><input class="field-input" id="pe-last" value="'+esc(p.lastName||'')+'" placeholder="e.g. Smith"></div>';
  /* email + sign-in link — kept near the top with the person's identity */
  body+='<div class="field"><label class="field-label">Email</label><input class="field-input" id="pe-email" type="email" inputmode="email" value="'+esc(p.email||'')+'" placeholder="name@example.com"></div>';
  body+='<div class="field"><label class="field-label">Sign-in</label>';
  body+='<div style="display:flex;align-items:center;justify-content:space-between;font-size:14px">';
  body+='<span style="color:#6B7280">'+(p.uid?'Linked'+(p.email?' · '+esc(p.email):''):'Not yet joined')+'</span>';
  if(p.uid)body+='<button class="btn-secondary" style="margin:0;width:auto;padding:8px 14px;min-height:0" onclick="unclaimPersona(\''+pid+'\')">Unlink</button>';
  body+='</div>';
  if(!p.uid){
    body+='<div class="body-empty" style="text-align:left;padding:6px 2px 0;font-size:12px">'
      +(p.email?'When <strong>'+esc(p.email)+'</strong> signs in, they\'re matched to '+esc(p.name)+' automatically.'
               :'Add an email above so they\'re matched automatically at sign-in — or send an invite link.')+'</div>';
    if(window.CLOUD&&window.CLOUD.inParty&&window.CLOUD.inParty()){
      body+='<div style="display:flex;gap:8px;margin-top:8px">';
      body+='<button class="btn-secondary" style="margin:0;flex:1" onclick="copyInviteLink(\''+pid+'\')">Copy invite link</button>';
      if(p.email)body+='<button class="btn-secondary" style="margin:0;flex:1" onclick="emailInviteLink(\''+pid+'\')">Email invite</button>';
      body+='</div>';
    }
  }
  body+='</div>';
  body+='<div class="field"><label class="field-label">Color</label><select class="field-select" id="pe-color">'+colorOptions(p.color)+'</select></div>';
  /* role */
  body+='<div class="field"><label class="field-label">Role</label>';
  body+='<div class="notify-row'+(S._peAdmin?' on':'')+'" onclick="peToggleAdmin()"><span class="notify-check">'+(S._peAdmin?IC.checkw:'')+'</span><div><div class="notify-lbl">Admin</div><div class="notify-sub">Can manage people and every trip, and delete anything.</div></div></div></div>';
  /* planning parties this person belongs to — tap a party to add/remove (live) */
  body+='<div class="field"><label class="field-label">Groups</label>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">Tap a group to add or remove this person. They can be in several.</div>';
  body+='<div class="whoselect">';
  for(var gi=0;gi<PARTIES.length;gi++){var g=PARTIES[gi],on=S._peParties.has(g.id);
    body+='<div class="who-opt'+(on?' on':'')+'" onclick="peToggleParty(\''+g.id+'\')"><span class="wdot" style="background:'+(g.color||'#6B4FA0')+'">'+esc((g.name[0]||'').toUpperCase())+'</span>'+esc(g.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';}
  body+='</div></div>';
  /* trips this person is on (via their parties or direct membership) — tap to open */
  var ptrips=TRIPS.filter(function(t){return (t.members&&t.members.indexOf(pid)>=0)||(t.parties||[]).some(function(g2){return personInParty(p,g2);});});
  body+='<div class="hub-section-label" style="margin-left:0">Trips ('+ptrips.length+')</div>';
  if(!ptrips.length)body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">Not on any trips yet. Add them to a group that has trips.</div>';
  for(var ti=0;ti<ptrips.length;ti++){var pt=ptrips[ti];var pg=partyById((pt.parties||[])[0]);
    body+='<button class="hub-row" onclick="peGotoTrip(\''+pid+'\',\''+pt.id+'\')"><div class="hub-icon" style="background:'+(pt.color||'#0E7490')+'">'+IC.map+'</div>'
      +'<div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(pt.name)+'</div><div class="hub-sub">'+(pg?esc(pg.name):'No group')+(pt.dates?' · '+esc(pt.dates):'')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  /* travel details */
  body+='<div class="hub-section-label" style="margin-left:0">Travel details</div>';
  body+=personTravelFields(p,'pe',{noName:true,noEmail:true});
  body+='<button class="btn-danger-link" onclick="peDelete(\''+pid+'\')">Remove this person</button>';
  return screenShell('Edit '+esc(p.name),body,'Save','savePersonEdit(\''+pid+'\')','Cancel',null,'backToPeople()');
}
/* sub-editors return to their list, not all the way out to the Admin tab.
   A just-added record that was never saved (cancelled) is discarded here. */
function backToPeople(){
  if(S._newPerson){var nid=S._newPerson;S._newPerson=null;
    if(person(nid)){FAMILY=FAMILY.filter(function(x){return x.id!==nid;});ALL_IDS=FAMILY.map(function(p){return p.id;});delete PACKING[nid];save('dtp_family',FAMILY);saveLists();}}
  S._formInit=null;openScreen({type:'personas'});
}
function peToggleAdmin(){S._peAdmin=!S._peAdmin;renderScreen_inplace2();}
function peToggleParty(gid){
  var pid=(S.screen&&S.screen.pid),p=person(pid);
  if(!S._peParties)S._peParties=new Set((p&&p.parties)||[]);
  if(S._peParties.has(gid)){
    if(S._peParties.size<=1){toast('Everyone needs at least one group');return;}
    S._peParties.delete(gid);
  }else S._peParties.add(gid);
  /* commit live so membership sticks even if you navigate away to a trip */
  if(p){var gs=[];S._peParties.forEach(function(x){gs.push(x);});p.parties=gs;save('dtp_family',FAMILY);refreshTripMembers(gid);}
  renderScreen_inplace2();
}
/* commit the safe person fields then jump to a trip (so edits aren\'t lost) */
function peGotoTrip(pid,tid){var p=person(pid);if(p){var nm=val('pe-name');if(nm)p.name=nm;var c=document.getElementById('pe-color');if(c&&c.value)p.color=c.value;var gs=[];if(S._peParties)S._peParties.forEach(function(x){gs.push(x);});if(gs.length)p.parties=gs;captureTravel(p,'pe');S._newPerson=null;save('dtp_family',FAMILY);}openTripPlanning(tid);}
function savePersonEdit(pid){
  var p=person(pid);if(!p){closeScreen();return;}
  var oldParties=(p.parties||[]).slice();   /* capture BEFORE reassign so removed groups get refreshed too */
  var nm=val('pe-name');if(nm)p.name=nm;
  p.lastName=val('pe-last');
  var c=document.getElementById('pe-color');if(c&&c.value)p.color=c.value;
  /* admin — keep at least one admin */
  if(!S._peAdmin&&p.admin&&!FAMILY.filter(function(x){return x.admin&&x.id!==pid;}).length){toast('Keep at least one admin');return;}
  p.admin=!!S._peAdmin;
  /* parties — keep at least one */
  var gs=[];if(S._peParties)S._peParties.forEach(function(x){gs.push(x);});
  p.parties=gs.length?gs:[PARTIES[0].id];
  var oldEmail=p.email;
  captureTravel(p,'pe');
  ALL_IDS=FAMILY.map(function(x){return x.id;});
  S._newPerson=null;   /* committed */
  save('dtp_family',FAMILY);
  /* re-materialize the member snapshot of every trip in this person's groups so
     a newly-added person is counted on (and notified about) trips that already
     existed before they were added. peToggleParty only refreshes groups whose
     chip was tapped; a new person kept in their default group never triggered it. */
  var affected={};oldParties.concat(p.parties||[]).forEach(function(gid){if(gid)affected[gid]=1;});
  Object.keys(affected).forEach(function(gid){refreshTripMembers(gid);});
  syncPersonInvite(p,oldEmail);toast('Saved');
  backToPeople();
}
function peDelete(pid){
  var existed=!!person(pid);
  delPersona(pid);
  if(existed&&!person(pid))backToPeople();   /* removed → back to the people list */
}
function addPersona(){
  var used={};FAMILY.forEach(function(p){used[p.color]=1;});
  var col=PALETTE[FAMILY.length%PALETTE.length][0];
  for(var i=0;i<PALETTE.length;i++)if(!used[PALETTE[i][0]]){col=PALETTE[i][0];break;}
  var id='p'+Date.now();
  FAMILY.push({id:id,name:'New Person',color:col,parties:[S.partyId||(PARTIES[0]||{}).id]});
  ALL_IDS=FAMILY.map(function(p){return p.id;});
  PACKING[id]=[];
  save('dtp_family',FAMILY);saveLists();
  S._newPerson=id;   /* provisional until saved — cancelling discards it */
  S._formInit=null;openScreen({type:'personedit',pid:id});   /* jump straight into the new person\'s form */
}
/* create a new person already in a specific party (from the party page) */
function addPersonToParty(gid){
  if(partyById(gid))ptSaveName(gid);   /* keep any unsaved party-name edit */
  var used={};FAMILY.forEach(function(p){used[p.color]=1;});
  var col=PALETTE[FAMILY.length%PALETTE.length][0];
  for(var i=0;i<PALETTE.length;i++)if(!used[PALETTE[i][0]]){col=PALETTE[i][0];break;}
  var id='p'+Date.now();
  FAMILY.push({id:id,name:'New Person',color:col,parties:[gid||S.partyId||(PARTIES[0]||{}).id]});
  ALL_IDS=FAMILY.map(function(p){return p.id;});
  PACKING[id]=[];
  save('dtp_family',FAMILY);saveLists();
  S._newPerson=id;S._formInit=null;openScreen({type:'personedit',pid:id});
}
function delPersona(id){
  if(FAMILY.length<=1){toast('Keep at least one person');return;}
  var p=person(id);
  if(p&&p.admin&&!FAMILY.filter(function(x){return x.admin&&x.id!==id;}).length){toast('Make someone else an admin first');return;}
  if(!confirm('Remove '+(p?p.name:'this person')+'? They\'ll be taken off all trips and items.'))return;
  /* If this person was linked to a real account, removing them must also revoke
     that account's access to the shared workspace — otherwise they stay a member
     (keep write access) and just re-resolve to another seat on their device.
     Evict their cloud membership and clear any email invite so they can't
     auto-rejoin. The server rules enforce the boundary; this triggers it. */
  var goneUid=p&&p.uid, goneEmail=p&&p.email;
  if(window.CLOUD&&window.CLOUD.enabled){
    if(goneUid&&window.CLOUD.evictMember)window.CLOUD.evictMember(goneUid);
    if(goneEmail&&window.CLOUD.revokeInvite)window.CLOUD.revokeInvite(goneEmail);
  }
  FAMILY=FAMILY.filter(function(x){return x.id!==id;});
  ALL_IDS=FAMILY.map(function(x){return x.id;});
  delete PACKING[id];delete TODO_TMPL[id];delete PACKING_TMPL[id];saveTmpl();savePackTmpl();
  /* drop this person\'s to-do items and strip them from any assignments */
  TODO=TODO.filter(function(t){return t.by!==id;});
  TODO.forEach(function(t){if(t.who)t.who=t.who.filter(function(m){return m!==id;});});
  /* strip them from any packing buyer assignments on others' items */
  Object.keys(PACKING).forEach(function(o){(PACKING[o]||[]).forEach(function(c){(c.items||[]).forEach(function(it){if(it.who)it.who=it.who.filter(function(m){return m!==id;});});});});
  for(var i=0;i<TRIPS.length;i++)if(TRIPS[i].members)TRIPS[i].members=TRIPS[i].members.filter(function(m){return m!==id;});
  [DINING,LLS,FLIGHTS,RESORTS,SHOWS].forEach(function(coll){
    coll.forEach(function(it){if(Array.isArray(it.who)){it.who=it.who.filter(function(m){return m!==id;});if(!it.who.length)it.who='all';}});
  });
  if(S.persona===id){S.persona=FAMILY[0].id;save('dtp_persona',S.persona);}
  S.filter.delete(id);
  // pull from park-visit assignments too
  VISITS.forEach(function(v){if(Array.isArray(v.who)){v.who=v.who.filter(function(m){return m!==id;});if(!v.who.length)v.who='all';}});
  persist();saveLists();
  renderScreen_inplace2();
}

function pickTripParty(gid){S._tpartyId=gid;renderScreen_inplace2();}
/* jump from the trip editor to the selected planning party's editor to add or
   remove members (trip membership = party membership). */
function editTripMembers(){var gid=S._tpartyId||S.partyId;if(!gid){toast('Pick a group first');return;}S._formInit=null;openScreen({type:'partyedit',gid:gid});}

/* legacy packing list (kept for the old combined route, now unused) */
function listScreenBody(which){return renderFilter()+renderLists(which);}
function scrLists(){
  return screenShell('Packing', '<div id="lists-body">'+listScreenBody('packing')+'</div>', null, null, 'Done');
}
function scrPackList(){
  return screenShell('Packing List', listContext()+'<div id="lists-body">'+packingBody()+'</div>', null, null, 'Done');
}

/* trip-wide Need to Buy — shared shopping list, grouped by buyer */
function scrNeedBuy(){
  var entries=needBuyEntries();
  var body=listContext()+'<div class="body-empty" style="text-align:left;padding:0 2px 12px;font-size:16px;color:var(--ink)">Everything flagged <strong>Need to buy</strong>, grouped by who\'s buying. The whole group can see this list.</div>';
  if(!entries.length)return screenShell('Need to Buy',body+'<div class="body-empty">Nothing to buy right now. Flag a packing item “Need to buy” and it shows up here.</div>',null,null,'Done');
  var groups={},order=[];
  entries.forEach(function(e){var buyers=(e.it.who&&e.it.who.length)?e.it.who:[e.owner];buyers.forEach(function(b){if(!groups[b]){groups[b]=[];order.push(b);}groups[b].push(e);});});
  var hide=nbHideDone(),shownAny=false;
  body+=personFilterRow(tripMembers());
  body+=nbHideToggle();
  for(var g=0;g<order.length;g++){var b=order[g],p=person(b);
    if(S.listWho&&b!==S.listWho)continue;   /* individual filter */
    var gItems=hide?groups[b].filter(function(e){return !e.it.bought;}):groups[b];
    var rem=groups[b].filter(function(e){return !e.it.bought;}).length;
    if(!gItems.length)continue;
    shownAny=true;
    body+='<div class="person-block-hd"><span class="pbdot" style="background:'+(p?p.color:'#999')+'">'+(p?esc(p.name[0]):'?')+'</span><span class="pbname">'+(p?esc(p.name):'Someone')+(b===S.persona?' (you)':'')+' to buy</span><span class="pbcount">'+rem+'</span></div>';
    body+='<div class="card">';
    for(var i=0;i<gItems.length;i++){var e=gItems[i],fw=person(e.owner);
      var nbSt=pkStore(e.it),bought=!!e.it.bought;
      body+='<div class="pk-row">';
      body+='<div class="chkbox'+(bought?' on':'')+'" onclick="pkGotIt(\''+e.owner+'\','+e.ci+','+e.ii+')">'+(bought?IC.checkw:'')+'</div>';
      body+='<div class="pk-name'+(bought?' done':'')+'" onclick="pkGotIt(\''+e.owner+'\','+e.ci+','+e.ii+')">'+esc(e.it.n)+((e.it.qty&&nbSt==='bag')?' <span style="color:var(--muted);font-weight:600">×'+e.it.qty+'</span>':'')+'<div class="pk-by">For '+(fw?esc(fw.name):'?')+(nbSt==='locker'?' · Owners Locker':nbSt==='person'?' · On person':'')+'</div></div>';
      body+='</div>';
    }
    body+='</div>';
  }
  if(!shownAny)body+='<div class="body-empty">'+(hide?'Everything\'s bought. ':'')+(S.listWho?'Nothing for this person.':'Nothing to buy right now.')+'</div>';
  return screenShell('Need to Buy',body,null,null,'Done');
}

/* Global per-person To Do template — edited from the account page */
function scrTodoTmpl(){
  var me=person(S.persona);
  var list=TODO_TMPL[S.persona]||(TODO_TMPL[S.persona]=[]);
  var body='<div class="body-empty" style="text-align:left;padding:0 2px 14px;font-size:16px;color:var(--ink)">Your reusable to-do master, '+esc(me?me.name:'')+'. It\'s not tied to any trip — when you start a trip\'s to-do list you can load these in.</div>';
  body+='<div class="hub-section-label" style="margin-left:0">Template items</div>';
  body+='<div class="card" style="padding:6px 0 0">';
  if(S.ttForm==null)body+='<button class="add-link" onclick="ttAdd()">'+IC.plus+' Add template item</button>';
  if(!list.length&&S.ttForm==null)body+='<div class="body-empty" style="text-align:left;padding:6px 12px">No items yet — add a few above.</div>';
  for(var i=0;i<list.length;i++){
    if(S.ttForm===i)body+=ttRow(i,true)+ttEditor(i);
    else body+=ttRow(i,false);
  }
  body+='</div>';
  return screenShell('Global To Do Template',body,'Save','ttSave()');
}
function ttRow(i,expanded){
  var it=TODO_TMPL[S.persona][i],sub=[];
  if(it.when)sub.push(esc(it.when));
  if(it.priv)sub.push(IC.lock+' Hidden');
  var dg=!expanded&&(TODO_TMPL[S.persona]||[]).length>1;
  var o='<div class="pk-row'+(expanded?' expanded':'')+(dg?' dgrow':'')+'"'+(dg?' data-dg="tt" data-di="'+i+'"':'')+'>';
  if(dg)o+=dgHandle();
  o+='<div class="pk-name" onclick="ttEditOpen('+i+')">'+(it.n?esc(it.n):'<span style="color:var(--muted)">Untitled task</span>')+(sub.length?'<div class="pk-by">'+sub.join(' · ')+'</div>':'')+'</div>';
  if(expanded)o+='<button class="hdr-icon pk-edit-on" style="width:30px;height:30px;flex-shrink:0" title="Close" onclick="ttEditClose()">'+IC.chevUp+'</button>';
  else o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="ttEditOpen('+i+')">'+IC.pencil+'</button>';
  o+='<button class="del-btn" onclick="ttDel('+i+')">&times;</button>';
  return o+'</div>';
}
function ttEditor(i){
  var it=TODO_TMPL[S.persona][i];
  var o='<div class="inline-editor pk-acc">';
  o+='<div class="field" style="margin:0"><label class="field-label">Task</label><input class="field-input" id="tt-n" value="'+esc(it.n||'')+'" placeholder="e.g. Refill prescriptions"></div>';
  o+='<div class="field" style="margin:0"><label class="field-label">When <span class="opt">(optional)</span></label><input class="field-input" id="tt-w" value="'+esc(it.when||'')+'" placeholder="e.g. 14 days"></div>';
  o+='<div class="field" style="margin:0"><label class="field-label">Privacy</label><div class="seg"><button class="seg-btn'+(!S._ttPriv?' on':'')+'" onclick="ttFormPriv(false)">Visible</button><button class="seg-btn'+(S._ttPriv?' on book':'')+'" onclick="ttFormPriv(true)">'+IC.lock+' Hidden</button></div></div>';
  if(S._ttPriv)o+='<div class="priv-note">When loaded into a trip, this task starts hidden from the trip owner and admins.</div>';
  o+='<div style="display:flex;gap:8px"><button class="btn-primary" style="margin:0;flex:1" onclick="ttEditClose()">Done</button></div>';
  o+='</div>';
  return o;
}
/* capture the OPEN editor's fields into its template item */
function ttCaptureOpen(){
  if(S.ttForm==null)return;
  var it=TODO_TMPL[S.persona]&&TODO_TMPL[S.persona][S.ttForm];if(!it)return;
  var n=document.getElementById('tt-n'),w=document.getElementById('tt-w');
  if(n&&typeof n.value==='string')it.n=n.value.trim();
  if(w&&typeof w.value==='string')it.when=w.value.trim();
  it.priv=!!S._ttPriv;
}
function ttEditOpen(i){ttCaptureOpen();S.ttForm=i;S._ttPriv=!!(TODO_TMPL[S.persona][i]&&TODO_TMPL[S.persona][i].priv);renderScreenHard();setTimeout(function(){var e=document.getElementById('tt-n');if(e)e.focus({preventScroll:true});},50);}
function ttEditClose(){ttCaptureOpen();S.ttForm=null;renderScreenHard();}
function ttFormPriv(v){S._ttPriv=v;ttCaptureOpen();renderScreenHard();}
function ttAdd(){ttCaptureOpen();var l=(TODO_TMPL[S.persona]||(TODO_TMPL[S.persona]=[]));l.push({n:'',when:'',priv:false});S.ttForm=l.length-1;S._ttPriv=false;renderScreenHard();setTimeout(function(){var e=document.getElementById('tt-n');if(e){try{e.scrollIntoView({block:'center',behavior:'smooth'});}catch(_){}e.focus({preventScroll:true});}},60);}
function ttDel(i){ttCaptureOpen();TODO_TMPL[S.persona].splice(i,1);if(S.ttForm===i)S.ttForm=null;else if(S.ttForm!=null&&S.ttForm>i)S.ttForm--;renderScreenHard();}
function ttSave(){
  ttCaptureOpen();S.ttForm=null;
  TODO_TMPL[S.persona]=(TODO_TMPL[S.persona]||[]).filter(function(t){return t.n;});
  saveTmpl();toast('Template saved');closeScreen();render();
}

/* Global per-person Packing template — edited from the account page */
function scrPackTmpl(){
  var me=person(S.persona);
  var list=PACKING_TMPL[S.persona]||(PACKING_TMPL[S.persona]=[]);
  var body='<div class="body-empty" style="text-align:left;padding:0 2px 14px;font-size:16px;color:var(--ink)">Your reusable packing master, '+esc(me?me.name:'')+'. Organise it into your own sections — new trips can load it in.</div>';
  for(var c=0;c<list.length;c++){var cat=list[c];
    body+='<div class="card">';
    body+='<div class="add-row" style="padding:10px 12px"><input class="field-input" id="pt-s-'+c+'" style="flex:1;min-width:0;font-weight:700" value="'+esc(cat.cat)+'" placeholder="Section name"><button class="del-btn" onclick="ptSectDel('+c+')">&times;</button></div>';
    for(var i=0;i<cat.items.length;i++){
      if(S.ptForm&&S.ptForm.c===c&&S.ptForm.i===i)body+=ptItemRow(c,i,true)+ptItemEditor(c,i);
      else body+=ptItemRow(c,i,false);
    }
    body+='<button class="add-link" onclick="ptItemAdd('+c+')">'+IC.plus+' Add item</button>';
    body+='</div>';
  }
  body+='<button class="add-link" onclick="ptSectAdd()">'+IC.plus+' Add section</button>';
  return screenShell('Global Packing Template',body,'Save','ptSave()');
}
function ptItemRow(c,i,expanded){
  var it=PACKING_TMPL[S.persona][c].items[i],st=pkStore(it),sub=[];
  if(st==='locker')sub.push('Locker');else if(st==='person')sub.push('On me');else if(it.qty>1)sub.push('×'+it.qty);
  if(it.priv)sub.push(IC.lock+' Hidden');
  var dg=!expanded&&PACKING_TMPL[S.persona][c].items.length>1;
  var o='<div class="pk-row'+(expanded?' expanded':'')+(dg?' dgrow':'')+'"'+(dg?' data-dg="pt|'+c+'" data-di="'+i+'"':'')+'>';
  if(dg)o+=dgHandle();
  o+='<div class="pk-name" onclick="ptItemEditOpen('+c+','+i+')">'+(it.n?esc(it.n):'<span style="color:var(--muted)">Untitled item</span>')+(sub.length?'<div class="pk-by">'+sub.join(' · ')+'</div>':'')+'</div>';
  if(expanded)o+='<button class="hdr-icon pk-edit-on" style="width:30px;height:30px;flex-shrink:0" title="Close" onclick="ptItemClose()">'+IC.chevUp+'</button>';
  else o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="ptItemEditOpen('+c+','+i+')">'+IC.pencil+'</button>';
  o+='<button class="del-btn" onclick="ptItemDel('+c+','+i+')">&times;</button>';
  return o+'</div>';
}
function ptItemEditor(c,i){
  var it=PACKING_TMPL[S.persona][c].items[i];
  var o='<div class="inline-editor pk-acc">';
  o+='<div class="field" style="margin:0"><label class="field-label">Item</label><input class="field-input" id="pti-name" value="'+esc(it.n||'')+'" placeholder="e.g. Sunscreen"></div>';
  o+='<div class="field" style="margin:0"><label class="field-label">Storage</label><div class="seg seg3">'
    +'<button class="seg-btn'+(S._ptStore==='bag'?' on':'')+'" onclick="ptFormStore(\'bag\')">Suitcase</button>'
    +'<button class="seg-btn'+(S._ptStore==='person'?' on':'')+'" onclick="ptFormStore(\'person\')">On Person</button>'
    +'<button class="seg-btn'+(S._ptStore==='locker'?' on':'')+'" onclick="ptFormStore(\'locker\')">Locker</button></div></div>';
  if(S._ptStore==='bag')o+='<div class="field" style="margin:0"><label class="field-label">Quantity</label><input class="field-input" id="pti-qty" type="number" inputmode="numeric" value="'+(it.qty||1)+'"></div>';
  o+='<div class="field" style="margin:0"><label class="field-label">Privacy</label><div class="seg"><button class="seg-btn'+(!S._ptPriv?' on':'')+'" onclick="ptFormPriv(false)">Visible</button><button class="seg-btn'+(S._ptPriv?' on book':'')+'" onclick="ptFormPriv(true)">'+IC.lock+' Hidden</button></div></div>';
  if(S._ptPriv)o+='<div class="priv-note">When loaded into a trip, this item starts hidden from the trip owner and admins.</div>';
  o+='<div style="display:flex;gap:8px"><button class="btn-primary" style="margin:0;flex:1" onclick="ptItemClose()">Done</button></div>';
  return o+'</div>';
}
function ptCaptureSections(){var list=PACKING_TMPL[S.persona]||[];for(var c=0;c<list.length;c++){var s=document.getElementById('pt-s-'+c);if(s&&typeof s.value==='string')list[c].cat=s.value.trim();}}
function ptCaptureOpen(){
  ptCaptureSections();
  if(!S.ptForm)return;
  var col=PACKING_TMPL[S.persona]&&PACKING_TMPL[S.persona][S.ptForm.c];
  var it=col&&col.items[S.ptForm.i];if(!it)return;
  var n=document.getElementById('pti-name');if(n&&typeof n.value==='string')it.n=n.value.trim();
  it.store=(S._ptStore==='person')?'person':'';it.l=(S._ptStore==='locker');
  if(S._ptStore==='bag'){var q=document.getElementById('pti-qty');var v=q?parseInt(q.value,10):it.qty;it.qty=(isNaN(v)||v<1)?1:v;}else it.qty=0;
  it.priv=!!S._ptPriv;
}
function ptItemEditOpen(c,i){ptCaptureOpen();var it=PACKING_TMPL[S.persona][c].items[i];S.ptForm={c:c,i:i};S._ptStore=pkStore(it);S._ptPriv=!!it.priv;renderScreenHard();setTimeout(function(){var e=document.getElementById('pti-name');if(e)e.focus({preventScroll:true});},50);}
function ptItemClose(){ptCaptureOpen();S.ptForm=null;renderScreenHard();}
function ptFormStore(v){S._ptStore=v;ptCaptureOpen();renderScreenHard();}
function ptFormPriv(v){S._ptPriv=v;ptCaptureOpen();renderScreenHard();}
function ptSectAdd(){ptCaptureOpen();(PACKING_TMPL[S.persona]||(PACKING_TMPL[S.persona]=[])).push({cat:'New section',items:[]});renderScreenHard();}
function ptSectDel(c){ptCaptureOpen();PACKING_TMPL[S.persona].splice(c,1);if(S.ptForm&&S.ptForm.c===c)S.ptForm=null;else if(S.ptForm&&S.ptForm.c>c)S.ptForm.c--;renderScreenHard();}
function ptItemAdd(c){ptCaptureOpen();var items=PACKING_TMPL[S.persona][c].items;items.push({n:'',qty:1,l:false,store:'',priv:false});S.ptForm={c:c,i:items.length-1};S._ptStore='bag';S._ptPriv=false;renderScreenHard();setTimeout(function(){var e=document.getElementById('pti-name');if(e){try{e.scrollIntoView({block:'center',behavior:'smooth'});}catch(_){}e.focus({preventScroll:true});}},60);}
function ptItemDel(c,i){ptCaptureOpen();PACKING_TMPL[S.persona][c].items.splice(i,1);if(S.ptForm&&S.ptForm.c===c&&S.ptForm.i===i)S.ptForm=null;else if(S.ptForm&&S.ptForm.c===c&&S.ptForm.i>i)S.ptForm.i--;renderScreenHard();}
function ptSave(){
  ptCaptureOpen();S.ptForm=null;
  var list=(PACKING_TMPL[S.persona]||[]).map(function(cat){cat.items=(cat.items||[]).filter(function(it){return it.n;});return cat;}).filter(function(cat){return cat.cat;});
  PACKING_TMPL[S.persona]=list;
  savePackTmpl();toast('Packing template saved');closeScreen();render();
}

/* Generic section screen (Plan hub destinations) */
function scrSection(){
  var sec=S.screen.section;
  var map={
    addflight:['Flights',IC.plane,'var(--hd-flight)'], dining:['Dining',IC.fork,'var(--hd-din)'],
    ll:['Lightning Lanes',IC.bolt,'var(--hd-ll)'], resort:['Resort',IC.bed,'var(--hd-resort)'],
    shows:['Night Shows',IC.star,'var(--hd-show)'],
    tickets:['Park Tickets',IC.ticket,'#0F766E'],
    parkres:['Park Reservations',IC.ticket,'#0F5F73'], visits:['Park Visits',IC.map,'#3B7549'],
    hours:['Park Hours',IC.bolt,'#0F5F73']
  };
  var m=map[sec]||['Section',IC.route,'var(--ink)'];
  var owned=(sec!=='hours');   /* park hours have no per-item owner → no Mine/Everyone filter */
  function fnote(label){return '<div class="body-empty">No '+label+(filterActive()?' for the current filter':'')+' yet.</div>';}
  var body='',add='',TD=tripDays(),dft=(TD[1]||TD[0]||{date:''}).date;
  if(sec==='dining'){
    for(var i=0;i<TD.length;i++){var din=diningFor(TD[i].date).filter(function(x){return visible(x.who);});if(!din.length)continue;
      body+=dayHd(TD[i].date);for(var j=0;j<din.length;j++)body+='<div class="ov-card'+(isPlanningStatus(din[j].status)?' planning':'')+'">'+diningRow(din[j])+'</div>';}
    if(!body)body=fnote('dining');
    add='<button class="sec-add" onclick="openScreen({type:\'adddining\',day:\''+dft+'\'})">Add dining</button>';
  }else if(sec==='addflight'){
    for(var i2=0;i2<TD.length;i2++){var fl=flightsFor(TD[i2].date).filter(function(x){return visible(x.who);});if(!fl.length)continue;
      body+=dayHd(TD[i2].date);for(var j2=0;j2<fl.length;j2++)body+='<div class="ov-card'+(isPlanningStatus(fl[j2].status)?' planning':'')+'">'+flightJourney(fl[j2],dayByDate(TD[i2].date))+'</div>';}
    if(!body)body=fnote('flights');
    add='<button class="sec-add" onclick="openScreen({type:\'addflight\',day:\''+((TD[0]||{date:''}).date)+'\'})">Add flight</button>';
  }else if(sec==='ll'){
    var llbody='';
    for(var il=0;il<TD.length;il++){var lld=llFor(TD[il].date).filter(function(x){return visible(x.who);});if(!lld.length)continue;
      llbody+=dayHd(TD[il].date);
      for(var lj=0;lj<lld.length;lj++){var l=lld[lj];
        llbody+='<div class="ov-card'+(isPlanningStatus(l.status)?' planning':'')+'"><div class="item-row"><div style="flex:1;min-width:0"><div class="item-name">'+esc(l.ride)+' <span class="ll-tag '+tagCls(l.tier)+'">'+tagShort(l.tier)+'</span></div><div class="item-time">'+(l.status==='booked'?('Booked '+esc(l.bookedTime||'')):('Window '+esc(l.window)))+'</div>'+whoChips(l.who)+'</div>'+statusBadge(l.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'addll\',edit:\''+l.id+'\',day:\''+l.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    var allLL=LLS.filter(function(x){return x.trip===S.tripId&&visible(x.who);});
    body=llBookBanner(allLL)+(llbody||fnote('Lightning Lanes'));
    add='<button class="sec-add" onclick="openScreen({type:\'addll\',day:\''+dft+'\'})">Add ride</button>';
  }else if(sec==='resort'){
    var rsl=RESORTS.filter(function(r){return r.trip===S.tripId&&visible(r.who);});
    for(var ir=0;ir<rsl.length;ir++){var rr=rsl[ir];
      body+='<div class="ov-card'+(isPlanningStatus(rr.status)?' planning':'')+'"><div class="item-row"><div style="flex:1"><div class="item-name">'+esc(rr.name)+'</div><div class="item-time">'+esc(rr.room)+' · '+monOf(rr.checkin)+' '+(+rr.checkin.slice(8))+' → '+monOf(rr.checkout)+' '+(+rr.checkout.slice(8))+'</div></div>'
        +statusBadge(rr.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'resortedit\',edit:\''+rr.id+'\'})">'+IC.pencil+'</button></div></div>';
    }
    if(!rsl.length) body=fnote('resort stays');
    add='<button class="sec-add" onclick="openScreen({type:\'resortedit\'})">Add resort stay</button>';
  }else if(sec==='parkres'){
    for(var ip=0;ip<TD.length;ip++){var dp=TD[ip];var prl=parkResFor(dp.date).filter(function(p){return visible(p.who);});if(!prl.length)continue;
      body+=dayHd(dp.date);
      for(var pj=0;pj<prl.length;pj++){var prx=prl[pj],ppk=PARKS[prx.park];
        body+='<div class="ov-card'+(isPlanningStatus(prx.status)?' planning':'')+'"><div class="item-row"><span style="background:'+(ppk?ppk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="item-name">'+(ppk?esc(ppk.name):esc(prx.park))+'</div>'+whoChips(prx.who)+'</div>'+statusBadge(prx.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'predit\',edit:\''+prx.id+'\',day:\''+prx.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!body) body=fnote('park reservations');
    add='<button class="sec-add" onclick="openScreen({type:\'predit\',day:\''+dft+'\'})">Add park reservation</button>';
  }else if(sec==='visits'){
    for(var i3=0;i3<TD.length;i3++){var dvs=visitsFor(TD[i3].date).filter(function(v){return visible(v.who);});if(!dvs.length)continue;
      body+=dayHd(TD[i3].date);
      for(var vj=0;vj<dvs.length;vj++){var vv=dvs[vj],vpk=PARKS[vv.park];
        body+='<div class="ov-card"><div class="item-row"><span style="background:'+(vpk?vpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="item-name">'+(vpk?esc(vpk.name):esc(vv.park))+'</div><div class="item-time">'+timingLbl(vv.timing)+'</div>'+whoChips(vv.who)+'</div>'+(vj===0?'<span class="st-badge st-booked">Primary</span>':'<span class="st-badge st-todo">Hopper</span>')+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'visedit\',edit:\''+vv.id+'\',day:\''+vv.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!body) body=fnote('park visits');
    add='<button class="sec-add" onclick="openScreen({type:\'visedit\',day:\''+dft+'\'})">Add park visit</button>';
  }else if(sec==='hours'){
    var anyH=false;
    for(var i4=0;i4<TD.length;i4++){var dhs=parkHoursFor(TD[i4].date);if(!dhs.length)continue;anyH=true;
      body+=dayHd(TD[i4].date);
      for(var hj=0;hj<dhs.length;hj++){var hh=dhs[hj],hpk=PARKS[hh.park];
        body+='<div class="ov-card"><div class="item-row"><span style="background:'+(hpk?hpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="item-name">'+(hpk?esc(hpk.name):esc(hh.park))+'</div><div class="item-time">'+esc((hh.open||'—')+' – '+(hh.close||'—'))+(hh.early?' · Early '+esc(hh.early):'')+(hh.late?' · Late '+esc(hh.late):'')+'</div></div>'+crowdPill(hh.crowd)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'hoursedit\',edit:\''+hh.id+'\',day:\''+hh.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!anyH) body+='<div class="body-empty">No park hours yet.</div>';
    add='<button class="sec-add" onclick="openScreen({type:\'hoursedit\',day:\''+dft+'\'})">Add park hours</button>';
  }else if(sec==='shows'){
    if(SHOWS.some(function(s){return s.trip===S.tripId;}))
      body+='<button class="btn-secondary" style="margin:0 0 10px" onclick="autoAssignShowParks()">'+IC.sparkles+' Auto-assign parks by show name</button>';
    for(var ish=0;ish<TD.length;ish++){var shd=showsFor(TD[ish].date).filter(function(x){return visible(x.who);});if(!shd.length)continue;
      body+=dayHd(TD[ish].date);
      for(var sj=0;sj<shd.length;sj++){var sx=shd[sj],spk=sx.park&&PARKS[sx.park];
        body+='<div class="ov-card"><div class="item-row"><div style="flex:1;min-width:0"><div class="item-name">'+esc(sx.name)+'</div><div class="item-time">'+esc(sx.time||'TBD')+(spk?' · '+esc(spk.name):'')+'</div>'+whoChips(sx.who)+'</div>'+statusBadge(sx.status||'attend')+(spk?'<span class="inpark-badge" style="background:'+spk.color+';margin-left:8px">'+esc(spk.short)+'</span>':'')+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'showedit\',edit:\''+sx.id+'\',day:\''+sx.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!body)body=fnote('night shows');
    add='<button class="sec-add" onclick="openScreen({type:\'showedit\',day:\''+dft+'\'})">Add show</button>';
  }else if(sec==='tickets'){
    var tkl=TICKETS.filter(function(x){return x.trip===S.tripId&&visible(x.who);});
    for(var itk=0;itk<tkl.length;itk++){var tk=tkl[itk];
      body+='<div class="ov-card"><div class="item-row" style="padding:10px 12px"><div style="flex:1;min-width:0"><div class="item-name">'+esc(ticketLabel(tk))+'</div><div class="item-time">'+esc(ticketSub(tk))+'</div>'+whoChips(tk.who)+'</div>'+ticketBadge(tk)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'ticketedit\',edit:\''+tk.id+'\'})">'+IC.pencil+'</button></div></div>';
    }
    if(!tkl.length)body=fnote('park tickets');
    add='<button class="sec-add" onclick="openScreen({type:\'ticketedit\'})">Add park ticket</button>';
  }
  if(owned)body=renderFilter()+body;   /* Mine / Everyone / Not mine on ownership categories */
  return screenShell(m[0],body,null,null,'Done',add);
}
function scrGeneric(){return screenShell('Coming soon','<div class="body-empty">This section editor is part of the full build.</div>',null,null,'Done');}

/* ── shared form helpers ───────────────────────────────────── */
function val(id){var e=document.getElementById(id);return (e&&typeof e.value==='string')?e.value.trim():'';}
/* ── Time picker: hour / minute / AM-PM dropdowns ──────────────
   Renders three <select>s plus a hidden <input> carrying the original field id,
   so every existing val('<id>') reader keeps working. Selects write the
   composed "H:MM AM" string into the hidden input on change. */
function parseTime(v){
  if(!v)return null;var s=String(v).trim();
  var m=s.match(/^(\d{1,2})(?::(\d{2}))?\s*([AaPp][Mm])?/);
  if(!m)return null;
  var h=+m[1],mm=m[2]?+m[2]:0,ap=(m[3]||'').toUpperCase();
  if(!ap){ if(h>=13){ap='PM';} else if(h===12){ap='PM';} else if(h===0){ap='AM';} else {ap='AM';} }
  if(h===0)h=12; if(h>12)h-=12;
  if(mm>59)mm=0;
  return {h:h,m:mm,ap:ap};
}
function timeField(id,value){
  var p=parseTime(value);
  var o='<div class="timesel">';
  o+='<select class="field-select" id="'+id+'__h" onchange="tfSync(\''+id+'\')"><option value="">–</option>';
  for(var h=1;h<=12;h++)o+='<option value="'+h+'"'+(p&&p.h===h?' selected':'')+'>'+h+'</option>';
  o+='</select><span class="timesel-sep">:</span>';
  var ms=[];for(var mm=0;mm<60;mm+=5)ms.push(mm);
  if(p&&ms.indexOf(p.m)<0){ms.push(p.m);ms.sort(function(a,b){return a-b;});}
  o+='<select class="field-select" id="'+id+'__m" onchange="tfSync(\''+id+'\')">';
  for(var i=0;i<ms.length;i++){var mv=('0'+ms[i]).slice(-2);o+='<option value="'+mv+'"'+((p&&p.m===ms[i])||(!p&&ms[i]===0)?' selected':'')+'>'+mv+'</option>';}
  o+='</select>';
  o+='<select class="field-select" id="'+id+'__ap" onchange="tfSync(\''+id+'\')">';
  o+='<option value="AM"'+((p&&p.ap==='AM')||!p?' selected':'')+'>AM</option>';
  o+='<option value="PM"'+(p&&p.ap==='PM'?' selected':'')+'>PM</option></select>';
  o+='<input type="hidden" id="'+id+'" value="'+esc(value||'')+'">';
  o+='</div>';
  return o;
}
function tfSync(id){
  var h=document.getElementById(id+'__h'),m=document.getElementById(id+'__m'),ap=document.getElementById(id+'__ap'),hid=document.getElementById(id);
  if(!hid)return;
  hid.value=(h&&h.value)?(h.value+':'+((m&&m.value)||'00')+' '+((ap&&ap.value)||'AM')):'';
}
function whoVal(){
  var mem=tripMembers();
  if(!S._who||S._who.size===0||S._who.size>=mem.length)return 'all';
  return mem.filter(function(id){return S._who.has(id);});
}
function pickLoc(v){S._formLoc=v;renderScreen_inplace2();}
function parkOptions(sel,noneLabel){
  var h='';
  if(noneLabel)h+='<option value=""'+(!sel?' selected':'')+'>'+esc(noneLabel)+'</option>';
  var keys=Object.keys(PARKS);
  for(var i=0;i<keys.length;i++)h+='<option value="'+keys[i]+'"'+(keys[i]===sel?' selected':'')+'>'+esc(PARKS[keys[i]].name)+'</option>';
  return h;
}
function crowdOptions(sel){
  var h='<option value=""'+(sel==null?' selected':'')+'>Not set</option>';
  for(var i=1;i<=10;i++)h+='<option value="'+i+'"'+(sel===i?' selected':'')+'>'+i+' / 10'+(i<=3?' · Light':i<=6?' · Moderate':' · Heavy')+'</option>';
  return h;
}

/* ── Day details ───────────────────────────────────────────── */
function scrDayEdit(){
  var d=dayByDate(S.screen.day);if(!d)return scrGeneric();
  var body='<div class="hub-section-label" style="margin-left:0">'+monOf(d.date)+' '+d.d+' · '+d.dl+'</div>';
  body+='<div class="field"><label class="field-label">Day headline <span class="opt">(big text on the day — defaults to the park name)</span></label><input class="field-input" id="dy-visit" placeholder="'+esc(pkOf(d.date).name)+'" value="'+esc(d.visit||'')+'"></div>';
  body+='<div class="field"><label class="field-label">Short blurb <span class="opt">(small line under the headline)</span></label><input class="field-input" id="dy-blurb" placeholder="e.g. EPCOT all day" value="'+esc(d.blurb||'')+'"></div>';
  /* Tags — every pill (auto or custom) can be removed; add your own below */
  body+='<div class="field"><label class="field-label">Tags <span class="opt">(auto from your plans · tap × to remove any)</span></label>';
  var badges=dayBadges(d);
  if(badges.length){
    body+='<div class="tag-edit-wrap">';
    for(var bi=0;bi<badges.length;bi++) body+='<span class="tag-edit">'+esc(badges[bi])+'<button type="button" onclick="dayTagRemove('+bi+')" aria-label="Remove tag">&times;</button></span>';
    body+='</div>';
  }else body+='<div class="body-empty" style="text-align:left;padding:2px">No tags yet.</div>';
  if(d.hiddenTags&&d.hiddenTags.length){
    body+='<div class="tag-restore-wrap">Hidden: ';
    for(var hri=0;hri<d.hiddenTags.length;hri++) body+='<button type="button" class="tag-restore" onclick="dayTagRestore('+hri+')">+ '+esc(d.hiddenTags[hri])+'</button>';
    body+='</div>';
  }
  body+='<div class="tag-add-row"><input class="field-input" id="dy-newtag" placeholder="Add a custom tag" onkeydown="if(event.key===\'Enter\'){event.preventDefault();dayTagAdd();}"><button class="ri-btn" type="button" onclick="dayTagAdd()">Add</button></div>';
  body+='</div>';
  body+='<div class="field"><label class="field-label">Alert / heads-up <span class="opt">(optional)</span></label><textarea class="field-input" id="dy-alert" rows="3" placeholder="e.g. Storms likely 2–4 PM">'+esc(d.alert||'')+'</textarea></div>';
  body+='<div class="body-empty" style="text-align:left;padding:6px 2px 0">Park visits, reservations, hours &amp; tickets are now managed in <strong>Park Plan</strong> and <strong>Park Hours &amp; Crowds</strong> on the day (Daily Planning view).</div>';
  return screenShell('Edit Day',body,'Save','saveDay()');
}
function saveDay(){
  var d=dayByDate(S.screen.day);if(!d){closeScreen();return;}
  d.visit=val('dy-visit');
  d.blurb=val('dy-blurb');
  d.alert=val('dy-alert')||null;
  saveDays();toast('Day updated');closeScreen();render();
}
/* tag editing — tags live as auto-badges (suppressed via d.hiddenTags) plus
   custom entries in d.tags. Changes persist immediately and re-render in place. */
function dayTagRemove(i){
  var d=dayByDate(S.screen.day);if(!d)return;
  var label=dayBadges(d)[i];if(label==null)return;
  var ix=(d.tags||[]).indexOf(label);
  if(ix>=0){d.tags.splice(ix,1);}
  else{d.hiddenTags=d.hiddenTags||[];if(d.hiddenTags.indexOf(label)<0)d.hiddenTags.push(label);}
  saveDays();renderScreen_inplace2();
}
function dayTagRestore(i){
  var d=dayByDate(S.screen.day);if(!d||!d.hiddenTags)return;
  if(d.hiddenTags[i]==null)return;
  d.hiddenTags.splice(i,1);
  saveDays();renderScreen_inplace2();
}
function dayTagAdd(){
  var d=dayByDate(S.screen.day);if(!d)return;
  var v=val('dy-newtag');if(!v)return;
  d.tags=d.tags||[];
  if(dayBadges(d).indexOf(v)<0&&d.tags.indexOf(v)<0)d.tags.push(v);
  var inp=document.getElementById('dy-newtag');if(inp)inp.value='';
  saveDays();renderScreen_inplace2();
}
/* small reusable ticket indicator: green check+Tickets when a valid associated
   ticket exists for the visit, else a red question mark */
function visitTicketTag(v){
  var assoc=(v&&v.tickets)||[];
  var validIds={};ticketsFor(v.day).forEach(function(t){validIds[t.id]=1;});
  var hasValid=assoc.some(function(id){return validIds[id];});
  if(hasValid) return '<span class="cond-res"><span style="display:flex">'+IC.check+'</span> Tickets</span>';
  return '<span class="cond-noticket" title="No valid ticket linked to this visit"><span style="display:flex">'+IC.qmark+'</span> Tickets</span>';
}
/* Edit Parks Plan — park visits + park reservations (moved out of Edit Day) */
function scrParksPlan(){
  var d=dayByDate(S.screen.day);if(!d)return scrGeneric();
  var body='<div class="hub-section-label" style="margin-left:0">'+monOf(d.date)+' '+d.d+' · '+d.dl+'</div>';
  body+='<div class="field"><label class="field-label">Park visits <span class="opt">(tap to edit)</span></label>';
  body+='<button class="add-link solo" style="margin:0 0 6px" onclick="openScreen({type:\'visedit\',day:\''+d.date+'\'})">'+IC.plus+' Add park visit</button>';
  var vis=visitsFor(d.date);
  for(var vi=0;vi<vis.length;vi++){var vv=vis[vi],vpk=PARKS[vv.park];
    body+='<div class="ov-card" style="margin:0 0 8px"><div class="item-row" style="padding:10px 12px"><span style="background:'+(vpk?vpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="item-name">'+(vpk?esc(vpk.name):esc(vv.park))+'</div><div class="item-time">'+timingLbl(vv.timing)+(vv.earlyEntry?' · Early Entry':'')+(vv.eveningHours?' · Evening':'')+'</div>'+whoChips(vv.who)+'</div>'+visitTicketTag(vv)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'visedit\',edit:\''+vv.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
  }
  if(!vis.length) body+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No park visits planned.</div>';
  body+='</div>';
  body+='<div class="field"><label class="field-label">Park reservations <span class="opt">(tap to edit)</span></label>';
  body+='<button class="add-link solo" style="margin:0 0 6px" onclick="openScreen({type:\'predit\',day:\''+d.date+'\'})">'+IC.plus+' Add park reservation</button>';
  var prs=parkResFor(d.date);
  for(var pi=0;pi<prs.length;pi++){var pr=prs[pi],ppk=PARKS[pr.park];
    body+='<div class="ov-card'+(isPlanningStatus(pr.status)?' planning':'')+'" style="margin:0 0 8px"><div class="item-row" style="padding:10px 12px"><span style="background:'+(ppk?ppk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="item-name">'+(ppk?esc(ppk.name):esc(pr.park))+'</div>'+whoChips(pr.who)+'</div>'+statusBadge(pr.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'predit\',edit:\''+pr.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
  }
  if(!prs.length) body+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No park reservations.</div>';
  body+='</div>';
  return screenShell('Edit Parks Plan',body,null,null,'Done');
}
/* Edit Park Hours & Crowds — per-park hours list (moved out of Edit Day) */
function scrHoursPlan(){
  var d=dayByDate(S.screen.day);if(!d)return scrGeneric();
  var body='<div class="hub-section-label" style="margin-left:0">'+monOf(d.date)+' '+d.d+' · '+d.dl+'</div>';
  body+='<div class="field"><label class="field-label">Park hours & crowd <span class="opt">(per park — tap to edit)</span></label>';
  body+='<button class="add-link solo" style="margin:0 0 6px" onclick="openScreen({type:\'hoursedit\',day:\''+d.date+'\'})">'+IC.plus+' Add park hours</button>';
  var phl=parkHoursFor(d.date);
  for(var hi=0;hi<phl.length;hi++){var hh=phl[hi],hpk=PARKS[hh.park];
    body+='<div class="ov-card" style="margin:0 0 8px"><div class="item-row" style="padding:10px 12px"><span style="background:'+(hpk?hpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="item-name">'+(hpk?esc(hpk.name):esc(hh.park))+'</div><div class="item-time">'+esc((hh.open||'—')+' – '+(hh.close||'—'))+(hh.early?' · Early '+esc(hh.early):'')+(hh.late?' · Late '+esc(hh.late):'')+'</div></div>'+crowdPill(hh.crowd)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'hoursedit\',edit:\''+hh.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
  }
  if(!phl.length) body+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No park hours set for this day.</div>';
  body+='</div>';
  return screenShell('Edit Park Hours & Crowds',body,null,null,'Done');
}
function scrStrategyEdit(){
  var d=dayByDate(S.screen.day);if(!d)return scrGeneric();
  var MONFULL=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var WDFULL={Sun:'Sunday',Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Saturday'};
  var fullMonth=MONFULL[parseInt(d.date.slice(5,7),10)-1]||monOf(d.date);
  var fullDay=WDFULL[d.dl]||d.dl;
  var heading=fullDay+', '+fullMonth+' '+d.d+', '+d.date.slice(0,4)+' — Strategy & Notes';
  /* ontouchstart saves selection before iOS blurs the textarea; onmousedown prevents focus steal on desktop */
  function fmtBtn(fn,lbl,xtra){return '<button ontouchstart="stratSaveSel()" onmousedown="event.preventDefault()" onclick="stratFmt(\''+fn+'\')" style="'+(xtra||'font-weight:700')+';font-size:18px;min-width:50px;height:44px;border:1px solid var(--border);border-radius:8px;background:var(--card);cursor:pointer;font-family:inherit;color:var(--ink)">'+lbl+'</button>';}
  var body='<div style="display:block;width:100%">';
  body+='<div style="font-size:17px;font-weight:700;color:var(--ink);margin-bottom:14px">'+esc(heading)+'</div>';
  body+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">';
  body+=fmtBtn('bold','B');
  body+=fmtBtn('italic','I','font-style:italic;font-weight:700');
  body+=fmtBtn('bullet','•');
  body+='</div>';
  body+='<textarea id="strat-text" oninput="stratSaveSel()" onkeyup="stratSaveSel()" onclick="stratSaveSel()" style="display:block;width:100%;box-sizing:border-box;height:55vh;min-height:280px;border:1px solid var(--border);border-radius:10px;padding:14px;font-size:20px;line-height:1.75;font-family:inherit;background:var(--card);color:var(--ink);outline:none" placeholder="The plan for the day…">'+esc(d.strategy||'')+'</textarea>';
  body+='</div>';
  return screenShell('Day Strategy',body,'Save','saveStrategy()');
}
function stratSaveSel(){
  var ta=document.getElementById('strat-text');
  if(ta)S._stratSel={s:ta.selectionStart,e:ta.selectionEnd};
}
function saveStrategy(){
  var d=dayByDate(S.screen.day);if(!d){closeScreen();return;}
  var ta=document.getElementById('strat-text');
  /* data-loss guard: never let a missing textarea blank an existing strategy.
     If the field can't be read for any reason, bail without overwriting. */
  if(!ta){toast('Could not read the editor — nothing saved');closeScreen();return;}
  d.strategy=ta.value;
  saveDays();
  S.open.strat=true;
  toast('Strategy saved');closeScreen();render();
}
function stratFmt(type){
  var ta=document.getElementById('strat-text');if(!ta)return;
  /* use saved selection — iOS blurs the textarea before onclick fires, resetting selectionStart to 0 */
  var saved=S._stratSel||{s:0,e:0};
  var s=(ta===document.activeElement)?ta.selectionStart:saved.s;
  var e=(ta===document.activeElement)?ta.selectionEnd:saved.e;
  var v=ta.value,sel=v.substring(s,e);
  var before=v.substring(0,s),after=v.substring(e);
  if(type==='bold'){
    if(sel){ta.value=before+'**'+sel+'**'+after;ta.selectionStart=s+2;ta.selectionEnd=e+2;}
    else{ta.value=before+'****'+after;ta.selectionStart=s+2;ta.selectionEnd=s+2;}
  }else if(type==='italic'){
    if(sel){ta.value=before+'*'+sel+'*'+after;ta.selectionStart=s+1;ta.selectionEnd=e+1;}
    else{ta.value=before+'**'+after;ta.selectionStart=s+1;ta.selectionEnd=s+1;}
  }else if(type==='bullet'){
    var lineStart=v.lastIndexOf('\n',s-1)+1;
    var linePrefix=v.substring(lineStart,lineStart+2);
    if(linePrefix==='- '){ta.value=v.substring(0,lineStart)+v.substring(lineStart+2);ta.selectionStart=ta.selectionEnd=Math.max(lineStart,s-2);}
    else{ta.value=v.substring(0,lineStart)+'- '+v.substring(lineStart);ta.selectionStart=ta.selectionEnd=s+2;}
  }
  S._stratSel={s:ta.selectionStart,e:ta.selectionEnd};
  ta.focus();
}
function renderStrat(text){
  if(!text)return '';
  var paras=text.split('\n\n'),out='';
  for(var i=0;i<paras.length;i++){
    var lines=paras[i].split('\n');
    var hasBullet=lines.some(function(l){return /^- /.test(l);});
    var allBullet=hasBullet&&lines.every(function(l){return l===''||/^- /.test(l);});
    if(allBullet){
      out+='<ul style="margin:0 0 10px;padding-left:20px">';
      for(var j=0;j<lines.length;j++){if(/^- /.test(lines[j]))out+='<li>'+fmtInlineStrat(esc(lines[j].slice(2)))+'</li>';}
      out+='</ul>';
    }else{
      out+='<p>'+fmtInlineStrat(esc(paras[i]).replace(/\n/g,'<br>'))+'</p>';
    }
  }
  return out;
}
function fmtInlineStrat(s){
  return s.replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*\n]+)\*/g,'<em>$1</em>');
}

/* ── Park reservation (first-class item: park + day + people) ─ */
function parkResOptions(sel){
  var keys=['mk','ep','hs','ak'],h='';
  for(var i=0;i<keys.length;i++)h+='<option value="'+keys[i]+'"'+(keys[i]===sel?' selected':'')+'>'+esc(PARKS[keys[i]].name)+'</option>';
  return h;
}
function scrPREdit(){
  var edit=S.screen.edit?PARKRES.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  if(S._formInit!=='pr'){S._formStatus.pr=edit?edit.status:'booked';S._formInit='pr';}
  var st=S._formStatus.pr,pre=edit?edit.who:'all';
  var body='<div class="field"><label class="field-label">Park</label><select class="field-select" id="pr-park">'+parkResOptions(edit?edit.park:'mk')+'</select></div>';
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="pr-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg">';
  body+='<button class="seg-btn'+(st==='planning'?' on':'')+'" onclick="pickStatus(\'pr\',\'planning\')">Planning</button>';
  body+='<button class="seg-btn'+(st==='booked'?' on book':'')+'" onclick="pickStatus(\'pr\',\'booked\')">Booked</button></div></div>';
  body+=whoSelectField(pre);
  body+=notifyField('Park reservation');
  body+='<div class="body-empty" style="text-align:left;padding:2px 2px 0">Park reservations are items assigned to people and a day. They drive the Park Res. line on the Agenda and the Overview — change one here and it updates everywhere.</div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delPR(\''+edit.id+'\')">Delete this reservation</button>';
  return screenShell(edit?'Edit Park Reservation':'Add Park Reservation',body,'Save','savePR()');
}
function savePR(){
  var edit=S.screen.edit?PARKRES.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'pr'+Date.now(),trip:S.tripId,by:S.persona};
  rec.park=val('pr-park')||'mk';rec.day=val('pr-day')||S.screen.day;
  rec.status=S._formStatus.pr||'booked';rec.who=whoVal();
  if(!edit)PARKRES.push(rec);
  save('dtp_parkres',PARKRES);afterWhoSave('Park reservation',rec,oldWho);S._who=null;toast('Park reservation saved');closeScreen();render();
}
function delPR(id){
  var it=PARKRES.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  confirmCritical('park reservation',function(){
    for(var i=0;i<PARKRES.length;i++)if(PARKRES[i].id===id){PARKRES.splice(i,1);break;}
    save('dtp_parkres',PARKRES);notifyDelete('Park reservation',it);toast('Reservation removed');closeScreen();render();
  });
}

/* ── Park tickets (date-based admission or annual passes) ─────
   Two-level: category (date | ap). Date tickets carry a date range + base
   option (base / hopper / hopper-plus) and an optional Water Parks & Sports
   add-on. Annual passes carry a tier, activation date, auto expiration (+1yr)
   and an activated toggle. Park visits are managed separately (no auto-gen). */
var TICKET_BASES={base:'Base Ticket · 1 park per day',hopper:'Park Hopper · hop between parks same day',hopperplus:'Park Hopper Plus · hopping + water parks & sports'};
var TICKET_BASE_SHORT={base:'1 park/day',hopper:'Hopper',hopperplus:'Hopper Plus'};
/* WDW annual passes all INCLUDE Park Hopper admission (hop:true). */
var AP_TIERS={
  incredi:{name:'Incredi-Pass',elig:'Available nationwide',hop:true},
  sorcerer:{name:'Sorcerer Pass',elig:'Florida residents & DVC members',hop:true},
  pirate:{name:'Pirate Pass',elig:'Florida residents',hop:true},
  pixie:{name:'Pixie Dust Pass',elig:'Florida residents · weekday admission',hop:true}
};
function addOneYear(ds){if(!/^\d{4}-\d{2}-\d{2}$/.test(ds||''))return '';var p=ds.split('-');return (+p[0]+1)+'-'+p[1]+'-'+p[2];}
function fmtMD(ds){return /^\d{4}-\d{2}-\d{2}$/.test(ds||'')?(monOf(ds)+' '+(+ds.slice(8))):'';}
function ticketsFor(date){return TICKETS.filter(function(t){
  if(t.trip!==S.tripId)return false;
  if(t.category==='date')return !!(t.start&&t.end&&date>=t.start&&date<=t.end);
  return true;   /* annual pass — held for the whole trip */
});}
function ticketLabel(t){
  if(!t)return 'a ticket';
  if(t.category==='ap')return (AP_TIERS[t.tier]&&AP_TIERS[t.tier].name)||'Annual Pass';
  return (TICKET_BASE_SHORT[t.base]||'Ticket')+((t.waterSports&&t.base!=='hopperplus')?' + Water Parks & Sports':'');
}
function ticketSub(t){
  if(t.category==='ap')return t.activated?('Activated '+fmtMD(t.activation)+' · Expires '+fmtMD(t.expiration)):'Not activated yet';
  return fmtMD(t.start)+(t.end&&t.end!==t.start?(' – '+fmtMD(t.end)):'');
}
function ticketBadge(t){
  if(t.category==='ap')return t.activated?'<span class="st-badge st-booked">Active</span>':'<span class="st-badge st-todo">Inactive</span>';
  return '<span class="inpark-badge" style="background:#0F766E">'+esc(TICKET_BASE_SHORT[t.base]||'Ticket')+'</span>';
}
function ticketCard(tks,pk,date){
  var key='tickets';
  var o='<div class="card">';
  o+=cardHead(key,'#0F766E',pk.color,IC.ticket,'Park Tickets',tks.length+' ticket'+(tks.length>1?'s':''));
  if(S.open[key]){
    o+='<div class="card-body">';
    for(var i=0;i<tks.length;i++){var t=tks[i];
      o+='<div class="item-row" style="padding:10px 14px"><div style="flex:1;min-width:0"><div class="item-name">'+esc(ticketLabel(t))+'</div><div class="item-time">'+esc(ticketSub(t))+'</div>'+whoChips(t.who)+'</div>'+ticketBadge(t)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'ticketedit\',edit:\''+t.id+'\'})">'+IC.pencil+'</button></div>';
    }
    o+='<button class="add-link" onclick="openScreen({type:\'ticketedit\'})">'+IC.plus+' Add park ticket</button>';
    o+='</div>';
  }
  return o+'</div>';
}
function tkCat(v){S._tkCat=v;renderScreen_inplace2();}
function tkBase(v){S._tkBase=v;renderScreen_inplace2();}
function tkWP(v){S._tkWP=!!v;renderScreen_inplace2();}
function tkTier(v){S._tkTier=v;renderScreen_inplace2();}
function tkActivated(v){S._tkActivated=!!v;renderScreen_inplace2();}
function expDisplay(act){var x=addOneYear(act);return x?(fmtMD(x)+', '+x.slice(0,4)):'—';}
function expLine(act){var x=addOneYear(act);return x?('Expires '+expDisplay(act)+' · one year from activation'):'Pick an activation date to set the expiration.';}
function tkSyncExp(){S._tkAct=val('tk-activation');var e=document.getElementById('tk-exp');if(e)e.value=addOneYear(S._tkAct)||'';}
function scrTicketEdit(){
  var edit=S.screen.edit?TICKETS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  if(S._formInit!=='tk'){
    S._tkCat=edit?edit.category:'date';
    S._tkBase=(edit&&edit.base)?edit.base:'base';
    S._tkWP=!!(edit&&edit.waterSports);
    S._tkTier=(edit&&edit.tier)?edit.tier:'incredi';
    S._tkActivated=!!(edit&&edit.activated);
    S._tkAct=(edit&&edit.activation)||'';
    S._formInit='tk';
  }
  var t=trip(),pre=edit?edit.who:'all';
  var body='<div class="field"><label class="field-label">Ticket type</label><div class="seg">';
  body+='<button class="seg-btn'+(S._tkCat==='date'?' on':'')+'" onclick="tkCat(\'date\')">Date-based</button>';
  body+='<button class="seg-btn'+(S._tkCat==='ap'?' on book':'')+'" onclick="tkCat(\'ap\')">Annual Pass</button></div></div>';
  if(S._tkCat==='date'){
    body+='<div class="field-row"><div class="field"><label class="field-label">Start date</label><input type="date" class="field-input" id="tk-start" value="'+esc((edit&&edit.start)||(t&&t.start)||'')+'"></div>';
    body+='<div class="field"><label class="field-label">End date</label><input type="date" class="field-input" id="tk-end" value="'+esc((edit&&edit.end)||(t&&t.end)||'')+'"></div></div>';
    body+='<div class="field"><label class="field-label">Base option</label><div class="seg seg3">';
    body+='<button class="seg-btn'+(S._tkBase==='base'?' on':'')+'" onclick="tkBase(\'base\')">Base</button>';
    body+='<button class="seg-btn'+(S._tkBase==='hopper'?' on':'')+'" onclick="tkBase(\'hopper\')">Hopper</button>';
    body+='<button class="seg-btn'+(S._tkBase==='hopperplus'?' on':'')+'" onclick="tkBase(\'hopperplus\')">Hopper Plus</button></div>';
    body+='<div class="body-empty" style="text-align:left;padding:6px 2px 0">'+esc(TICKET_BASES[S._tkBase]||'')+'</div></div>';
    body+='<div class="field"><label class="field-label">Add-on</label>';
    if(S._tkBase==='hopperplus'){
      body+='<div class="notify-row on"><span class="notify-check">'+IC.checkw+'</span><div><div class="notify-lbl">Water Parks &amp; Sports</div><div class="notify-sub">Included with Park Hopper Plus.</div></div></div>';
    }else{
      body+='<div class="notify-row'+(S._tkWP?' on':'')+'" onclick="tkWP('+(S._tkWP?'false':'true')+')"><span class="notify-check">'+(S._tkWP?IC.checkw:'')+'</span><div><div class="notify-lbl">Water Parks &amp; Sports</div><div class="notify-sub">Optional add-on: the two water parks plus ESPN Wide World of Sports &amp; more.</div></div></div>';
    }
    body+='</div>';
  }else{
    body+='<div class="field"><label class="field-label">Pass tier</label>';
    ['incredi','sorcerer','pirate','pixie'].forEach(function(k){var tt=AP_TIERS[k],on=S._tkTier===k;
      body+='<div class="notify-row'+(on?' on':'')+'" style="margin-bottom:8px" onclick="tkTier(\''+k+'\')"><span class="notify-check">'+(on?IC.checkw:'')+'</span>'
        +'<div style="flex:1"><div class="notify-lbl">'+esc(tt.name)+'</div><div class="notify-sub">'+esc(tt.elig)+'</div></div>'
        +(tt.hop?'<span class="inpark-badge" style="background:#0F766E;align-self:center">Park Hopper</span>':'')+'</div>';
    });
    body+='</div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">Activation date</label><input type="date" class="field-input" id="tk-activation" value="'+esc(S._tkAct||'')+'" onchange="tkSyncExp()"></div>';
    body+='<div class="field"><label class="field-label">Expires</label><input type="date" class="field-input" id="tk-exp" value="'+esc(addOneYear(S._tkAct)||'')+'" readonly style="color:var(--muted)"></div></div>';
    body+='<div class="field"><label class="field-label">Status</label><div class="notify-row'+(S._tkActivated?' on':'')+'" onclick="tkActivated('+(S._tkActivated?'false':'true')+')"><span class="notify-check">'+(S._tkActivated?IC.checkw:'')+'</span><div><div class="notify-lbl">Pass activated</div><div class="notify-sub">Switch on once the pass has been activated in-park.</div></div></div></div>';
    body+='<div class="body-empty" style="text-align:left;padding:2px 2px 6px;color:#92400E"><strong>Reminder:</strong> Annual Pass holders still need a park reservation for every day they plan to enter a park.</div>';
  }
  body+=whoSelectField(pre);
  body+=notifyField('Park ticket');
  if(edit) body+='<button class="btn-danger-link" onclick="delTicket(\''+edit.id+'\')">Delete this ticket</button>';
  return screenShell(edit?'Edit Park Ticket':'Add Park Ticket',body,'Save','saveTicket()');
}
function saveTicket(){
  var edit=S.screen.edit?TICKETS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'tk'+Date.now(),trip:S.tripId,by:S.persona};
  rec.category=S._tkCat||'date';
  if(rec.category==='date'){
    var s=val('tk-start')||(trip()&&trip().start)||'',e=val('tk-end')||s;
    if(e&&s&&e<s){var tmp=e;e=s;s=tmp;}
    rec.start=s;rec.end=e;rec.base=S._tkBase||'base';
    rec.waterSports=(rec.base==='hopperplus')?true:!!S._tkWP;
    rec.tier=null;rec.activation=null;rec.expiration=null;rec.activated=false;
  }else{
    rec.tier=S._tkTier||'incredi';
    rec.activation=val('tk-activation')||'';
    rec.expiration=addOneYear(rec.activation);
    rec.activated=!!S._tkActivated;
    rec.start=null;rec.end=null;rec.base=null;rec.waterSports=false;
  }
  rec.who=whoVal();
  if(!edit)TICKETS.push(rec);
  save('dtp_tickets',TICKETS);afterWhoSave('Park ticket',rec,oldWho);
  S._who=null;S._formInit=null;toast('Park ticket saved');closeScreen();render();
}
function delTicket(id){
  var it=TICKETS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  confirmCritical('park ticket',function(){
    for(var i=0;i<TICKETS.length;i++)if(TICKETS[i].id===id){TICKETS.splice(i,1);break;}
    save('dtp_tickets',TICKETS);notifyDelete('Park ticket',it);toast('Ticket removed');closeScreen();render();
  });
}

/* ── Park visit (first-class item: park + day + people) ─────── */
function scrVisitEdit(){
  var edit=S.screen.edit?VISITS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var pre=edit?edit.who:'all';
  var tm=edit&&edit.timing?edit.timing:'day';
  var body='<div class="field"><label class="field-label">Park</label><select class="field-select" id="vs-park">'+parkResOptions(edit?edit.park:'mk')+'</select></div>';
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="vs-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  body+='<div class="field"><label class="field-label">Timing <span class="opt">(when you plan to be there)</span></label><select class="field-select" id="vs-timing">';
  ['morning','day','evening','late'].forEach(function(k){body+='<option value="'+k+'"'+(tm===k?' selected':'')+'>'+TIMING[k]+'</option>';});
  body+='</select></div>';
  body+=whoSelectField(pre);
  body+=notifyField('Park visit');
  /* inline park hours & crowd — prefilled from / saved to the Park Hours item */
  var eh=hoursFor(edit?edit.park:'mk',(edit&&edit.day)||S.screen.day)||{};
  body+='<div class="field-group"><div class="field-group-title">Park hours & crowd <span style="text-transform:none;font-weight:600;color:var(--muted)">(optional · saved as a Park Hours item)</span></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Opening</label>'+timeField('vh-open',eh.open||'')+'</div>';
  body+='<div class="field"><label class="field-label">Closing</label>'+timeField('vh-close',eh.close||'')+'</div></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Early Entry</label>'+timeField('vh-early',eh.early||'')+'</div>';
  body+='<div class="field"><label class="field-label">Extended / Late</label>'+timeField('vh-late',eh.late||'')+'</div></div>';
  body+='<div class="field"><label class="field-label">Expected crowd</label><select class="field-select" id="vh-crowd">'+crowdOptions(eh.crowd!=null?eh.crowd:null)+'</select></div></div>';
  /* extra-hours perks you actually plan to use — these drive the day's tags */
  body+='<div class="field"><label class="field-label">Extra hours you plan to use</label>';
  body+='<label class="chk-row"><input type="checkbox" id="vs-early"'+((edit&&edit.earlyEntry)?' checked':'')+'> Early Entry</label>';
  body+='<label class="chk-row"><input type="checkbox" id="vs-evening"'+((edit&&edit.eveningHours)?' checked':'')+'> Evening / Extended Hours</label>';
  body+='</div>';
  /* associate the park tickets that admit this visit — only tickets valid on the visit date */
  var vday=(edit&&edit.day)||S.screen.day;
  var validTks=ticketsFor(vday);
  body+='<div class="field"><label class="field-label">Park tickets for this visit <span class="opt">(tickets valid on '+esc(monOf(vday)+' '+(+vday.slice(8)))+')</span></label>';
  if(validTks.length){
    var assoc=(edit&&edit.tickets)||[];
    for(var ti=0;ti<validTks.length;ti++){var tk=validTks[ti];
      body+='<label class="chk-row"><input type="checkbox" class="vs-tk" value="'+tk.id+'"'+(assoc.indexOf(tk.id)>=0?' checked':'')+'><span style="flex:1;min-width:0">'+esc(ticketLabel(tk))+'</span><span class="chk-who">'+esc(whoNames(tk.who))+'</span></label>';
    }
  }else{
    body+='<div class="body-empty" style="text-align:left;padding:2px">No tickets valid on this date yet — add one in Park Hours &amp; Tickets first.</div>';
  }
  body+='</div>';
  body+='<div class="body-empty" style="text-align:left;padding:2px 2px 0">The first visit on a day is the primary park (sets the day\'s color and hero); add a second visit for a hopper / two-park day.</div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delVisit(\''+edit.id+'\')">Delete this visit</button>';
  return screenShell(edit?'Edit Park Visit':'Add Park Visit',body,'Save','saveVisit()');
}
function upsertHours(park,day,vals){
  var anything=vals.open||vals.close||vals.early||vals.late||(vals.crowd!=null);
  var ex=hoursFor(park,day);
  if(!anything){return;}
  if(ex){ex.open=vals.open;ex.close=vals.close;ex.early=vals.early;ex.late=vals.late;ex.crowd=vals.crowd;}
  else{PARKHOURS.push({id:'h'+Date.now(),trip:S.tripId,park:park,day:day,open:vals.open,close:vals.close,early:vals.early,late:vals.late,crowd:vals.crowd});}
  save('dtp_hours',PARKHOURS);
}
function saveVisit(){
  var edit=S.screen.edit?VISITS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'v'+Date.now(),trip:S.tripId,by:S.persona};
  rec.park=val('vs-park')||'mk';rec.day=val('vs-day')||S.screen.day;rec.timing=val('vs-timing')||'day';rec.who=whoVal();
  var _e=document.getElementById('vs-early'),_v=document.getElementById('vs-evening');
  rec.earlyEntry=!!(_e&&_e.checked);rec.eveningHours=!!(_v&&_v.checked);
  var _tks=[],_cbs=document.querySelectorAll('.vs-tk');for(var _i=0;_i<_cbs.length;_i++){if(_cbs[_i].checked)_tks.push(_cbs[_i].value);}
  rec.tickets=_tks;
  if(!edit)VISITS.push(rec);
  save('dtp_visits',VISITS);afterWhoSave('Park visit',rec,oldWho);
  var c=val('vh-crowd');
  upsertHours(rec.park,rec.day,{open:val('vh-open'),close:val('vh-close'),early:val('vh-early'),late:val('vh-late'),crowd:c?parseInt(c,10):null});
  S._who=null;toast('Park visit saved');closeScreen();render();
}
function delVisit(id){
  var it=VISITS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  for(var i=0;i<VISITS.length;i++)if(VISITS[i].id===id){VISITS.splice(i,1);break;}
  save('dtp_visits',VISITS);notifyDelete('Park visit',it);toast('Visit removed');closeScreen();render();
}

/* ── Park hours (first-class item: park + day + hours + crowd) ─ */
function scrHoursEdit(){
  var edit=S.screen.edit?PARKHOURS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var body='<div class="field"><label class="field-label">Park</label><select class="field-select" id="ph-park">'+parkResOptions(edit?edit.park:'mk')+'</select></div>';
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="ph-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Opening</label>'+timeField('ph-open',edit?edit.open||'':'')+'</div>';
  body+='<div class="field"><label class="field-label">Closing</label>'+timeField('ph-close',edit?edit.close||'':'')+'</div></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Early Entry <span class="opt">(opt)</span></label>'+timeField('ph-early',edit?edit.early||'':'')+'</div>';
  body+='<div class="field"><label class="field-label">Extended / Late <span class="opt">(opt)</span></label>'+timeField('ph-late',edit?edit.late||'':'')+'</div></div>';
  body+='<div class="field"><label class="field-label">Expected crowd</label><select class="field-select" id="ph-crowd">'+crowdOptions(edit?edit.crowd:null)+'</select></div>';
  body+='<div class="body-empty" style="text-align:left;padding:2px 2px 0">Park hours & crowd are facts about a park on a date — independent of whether you visit. On a two-park day, add hours for each park.</div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delHours(\''+edit.id+'\')">Delete these hours</button>';
  return screenShell(edit?'Edit Park Hours':'Add Park Hours',body,'Save','saveHours()');
}
function saveHours(){
  var edit=S.screen.edit?PARKHOURS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var rec=edit||{id:'h'+Date.now(),trip:S.tripId,by:S.persona};
  rec.park=val('ph-park')||'mk';rec.day=val('ph-day')||S.screen.day;
  rec.open=val('ph-open');rec.close=val('ph-close');rec.early=val('ph-early');rec.late=val('ph-late');
  var c=val('ph-crowd');rec.crowd=c?parseInt(c,10):null;
  if(!edit)PARKHOURS.push(rec);
  save('dtp_hours',PARKHOURS);toast('Park hours saved');closeScreen();render();
}
function delHours(id){
  var it=PARKHOURS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  for(var i=0;i<PARKHOURS.length;i++)if(PARKHOURS[i].id===id){PARKHOURS.splice(i,1);break;}
  save('dtp_hours',PARKHOURS);toast('Hours removed');closeScreen();render();
}

/* ── Day-plan stop ─────────────────────────────────────────── */
function scrStopEdit(){
  var d=dayByDate(S.screen.day);if(!d)return scrGeneric();
  var has=S.screen.idx!=null,it=has?d.itin[S.screen.idx]:null;
  if(S._formInit!=='stop'){S._stPriv=!!(it&&it.priv);S._formInit='stop';}
  var body='<div class="field"><label class="field-label">Time</label>'+timeField('st-time',it?it.t:'')+'</div>';
  body+='<div class="field"><label class="field-label">What\'s happening</label><input class="field-input" id="st-text" placeholder="e.g. Rope drop — Test Track" value="'+(it?esc(it.x):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Tag <span class="opt">(optional, e.g. Critical, Hop)</span></label><input class="field-input" id="st-crit" placeholder="Critical" value="'+(it&&it.crit?esc(it.crit):'')+'"></div>';
  body+=whoSelectField(it?it.who:'all');
  body+='<div class="field" style="margin:0"><label class="field-label">Privacy</label><div class="seg"><button class="seg-btn'+(!S._stPriv?' on':'')+'" onclick="stFormPriv(false)">Shared</button><button class="seg-btn'+(S._stPriv?' on book':'')+'" onclick="stFormPriv(true)">'+IC.lock+' Keep private</button></div></div>';
  if(S._stPriv)body+='<div class="priv-note">Only you see this stop on your Day Plan — no one else on the trip, not even admins.</div>';
  if(has&&it&&!it.priv) body+=rsvpFormSection(it);
  if(has) body+='<button class="btn-danger-link" onclick="delStop()">Delete this stop</button>';
  return screenShell(has?'Edit Stop':'Add Stop',body,'Save','saveStop()');
}
function stFormPriv(v){S._stPriv=v;renderScreen_inplace2();}
function saveStop(){
  var d=dayByDate(S.screen.day);if(!d){closeScreen();return;}
  var tx=val('st-text');if(!tx){toast('Add a description');return;}
  var prev=(S.screen.idx!=null)?d.itin[S.screen.idx]:null;
  var rec={t:val('st-time')||'TBD',x:tx,who:whoVal()};
  var cr=val('st-crit');if(cr)rec.crit=cr;
  rec.by=(prev&&prev.by)||S.persona;
  rec.priv=!!S._stPriv;
  if(prev&&prev.rsvp)rec.rsvp=prev.rsvp;   /* preserve attendance across edits */
  if(S.screen.idx!=null)d.itin[S.screen.idx]=rec; else d.itin.push(rec);
  saveDays();S._who=null;toast('Stop saved');closeScreen();render();
}
function delStop(){
  var d=dayByDate(S.screen.day);
  if(d&&S.screen.idx!=null){if(!ownOK(d.itin[S.screen.idx]))return;d.itin.splice(S.screen.idx,1);}
  saveDays();toast('Stop removed');closeScreen();render();
}

/* ── Rolling re-book (sequence-based LL item) ──────────────── */
function scrRebookEdit(){
  var edit=S.screen.edit?REBOOKS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var dy=(edit&&edit.day)||S.screen.day;
  var mps=llFor(dy).filter(function(l){return l.tier==='mp1'||l.tier==='mp2';});
  var afterSel=edit?edit.after:(mps[0]?mps[0].id:'');
  var body='<div class="field"><label class="field-label">After which Multi Pass</label><select class="field-select" id="rb-after">';
  body+='<option value=""'+(!afterSel?' selected':'')+'>— none —</option>';
  for(var i=0;i<mps.length;i++)body+='<option value="'+mps[i].id+'"'+(mps[i].id===afterSel?' selected':'')+'>'+esc(mps[i].ride)+' ('+tagShort(mps[i].tier)+(mps[i].status==='booked'?' · Booked':'')+')</option>';
  body+='</select></div>';
  body+='<div class="field"><label class="field-label">Then book / do</label><input class="field-input" id="rb-text" placeholder="e.g. Big Thunder Mountain" value="'+(edit?esc(edit.text):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="rb-day">'+dayOptions(dy)+'</select></div>';
  body+=whoSelectField(edit?edit.who:'all');
  body+='<div class="body-empty" style="text-align:left;padding:2px 2px 0">A rolling re-book follows a Multi Pass ride: it shows as the next line in the Day Plan right after that ride — but only once that ride is Booked.</div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delRebook(\''+edit.id+'\')">Delete this re-book</button>';
  return screenShell(edit?'Edit Re-book':'Add Re-book',body,'Save','saveRebook()');
}
function saveRebook(){
  var edit=S.screen.edit?REBOOKS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var tx=val('rb-text');if(!tx){toast('Add what to book next');return;}
  var rec=edit||{id:'rb'+Date.now(),trip:S.tripId,by:S.persona};
  rec.text=tx;rec.after=val('rb-after');rec.day=val('rb-day')||S.screen.day;rec.who=whoVal();
  if(!edit)REBOOKS.push(rec);
  save('dtp_rebooks',REBOOKS);S._who=null;toast('Re-book saved');closeScreen();render();
}
function delRebook(id){
  var it=REBOOKS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  for(var i=0;i<REBOOKS.length;i++)if(REBOOKS[i].id===id){REBOOKS.splice(i,1);break;}
  save('dtp_rebooks',REBOOKS);toast('Re-book removed');closeScreen();render();
}

/* ── Night show ────────────────────────────────────────────── */
function scrShowEdit(){
  var edit=S.screen.edit?SHOWS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  if(S._formInit!=='sh'){S._formStatus.sh=edit?(edit.status||'attend'):'attend';S._formInit='sh';}
  var st=S._formStatus.sh,pre=edit?edit.who:'all';
  var body='<div class="field"><label class="field-label">Show name</label><input class="field-input" id="sh-name" placeholder="e.g. Happily Ever After" value="'+(edit?esc(edit.name):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Time</label>'+timeField('sh-time',edit?edit.time:'')+'</div>';
  body+='<div class="field"><label class="field-label">Status <span class="opt">(only Attend shows on the Day Plan)</span></label><div class="seg">';
  body+='<button class="seg-btn'+(st==='scheduled'?' on':'')+'" onclick="pickStatus(\'sh\',\'scheduled\')">Scheduled</button>';
  body+='<button class="seg-btn'+(st==='attend'?' on book':'')+'" onclick="pickStatus(\'sh\',\'attend\')">Attend</button></div></div>';
  body+='<div class="field"><label class="field-label">Park <span class="opt">(optional)</span></label><select class="field-select" id="sh-park"><option value=""'+(!(edit&&edit.park)?' selected':'')+'>— No park —</option>'+parkResOptions(edit?edit.park:'')+'</select></div>';
  body+=whoSelectField(pre);
  body+=notifyField('Show');
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="sh-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delShow(\''+edit.id+'\')">Delete this show</button>';
  if(edit)body+=rsvpFormSection(edit);
  return screenShell(edit?'Edit Show':'Add Show',body,'Save','saveShow()');
}
function saveShow(){
  var edit=S.screen.edit?SHOWS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var nm=val('sh-name');if(!nm){toast('Add a show name');return;}
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'s'+Date.now(),trip:S.tripId,by:S.persona};
  rec.name=nm;rec.time=val('sh-time')||'TBD';rec.day=val('sh-day')||S.screen.day;rec.status=S._formStatus.sh||'attend';rec.park=val('sh-park')||'';rec.who=whoVal();
  if(!edit)SHOWS.push(rec);
  save('dtp_shows',SHOWS);afterWhoSave('Show',rec,oldWho);S._who=null;toast('Show saved');closeScreen();render();
}
function delShow(id){
  var it=SHOWS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  for(var i=0;i<SHOWS.length;i++)if(SHOWS[i].id===id){SHOWS.splice(i,1);break;}
  save('dtp_shows',SHOWS);notifyDelete('Show',it);toast('Show removed');closeScreen();render();
}

/* ── Resort stay ───────────────────────────────────────────── */
function scrResortEdit(){
  var edit=S.screen.edit?RESORTS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  if(S._formInit!=='rs'){S._formStatus.rs=edit?edit.status:'planning';S._formInit='rs';}
  var st=S._formStatus.rs,pre=edit?edit.who:'all';
  var body='<div class="field"><label class="field-label">Resort name</label><input class="field-input" id="rs-name" placeholder="Disney\'s Pop Century Resort" value="'+(edit?esc(edit.name):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Room type</label><input class="field-input" id="rs-room" placeholder="Standard Room · Pool View" value="'+(edit?esc(edit.room):'')+'"></div>';
  var _td=tripDays();var _d0=(_td[0]||{date:''}).date,_dN=(_td[_td.length-1]||{date:''}).date;
  body+='<div class="field-row"><div class="field"><label class="field-label">Check-in day</label><select class="field-select" id="rs-in">'+dayOptions(edit?edit.checkin:_d0)+'</select></div>';
  body+='<div class="field"><label class="field-label">Check-in time</label>'+timeField('rs-intime',edit&&edit.inTime?edit.inTime:'')+'</div></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Check-out day</label><select class="field-select" id="rs-out">'+dayOptions(edit?edit.checkout:_dN)+'</select></div>';
  body+='<div class="field"><label class="field-label">Check-out time</label>'+timeField('rs-outtime',edit&&edit.outTime?edit.outTime:'')+'</div></div>';
  body+='<div class="field"><label class="field-label">Confirmation #</label><input class="field-input" id="rs-conf" placeholder="A10293847" value="'+(edit&&edit.conf?esc(edit.conf):'')+'"></div>';
  var onp=(!edit)||edit.onProp!==false;   /* on Disney property by default */
  body+='<div class="field"><label class="chk-row"><input type="checkbox" id="rs-onprop"'+(onp?' checked':'')+'> On Disney property</label><div class="body-empty" style="text-align:left;padding:2px 2px 0">Drives Lightning Lane booking dates — resort guests book 7 days before check-in.</div></div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg">';
  body+='<button class="seg-btn'+(st==='planning'?' on':'')+'" onclick="pickStatus(\'rs\',\'planning\')">Planning</button>';
  body+='<button class="seg-btn'+(st==='booked'?' on book':'')+'" onclick="pickStatus(\'rs\',\'booked\')">Booked</button></div></div>';
  body+=whoSelectField(pre);
  body+=notifyField('Resort');
  if(edit) body+='<button class="btn-danger-link" onclick="delResort(\''+edit.id+'\')">Delete this stay</button>';
  return screenShell(edit?'Edit Resort':'Add Resort',body,'Save','saveResort()');
}
function saveResort(){
  var edit=S.screen.edit?RESORTS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var nm=val('rs-name');if(!nm){toast('Add a resort name');return;}
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'r'+Date.now(),trip:S.tripId,by:S.persona};
  rec.name=nm;rec.room=val('rs-room')||'Room';rec.checkin=val('rs-in');rec.checkout=val('rs-out');
  rec.inTime=val('rs-intime');rec.outTime=val('rs-outtime');
  var _op=document.getElementById('rs-onprop');rec.onProp=!_op||_op.checked;
  rec.conf=val('rs-conf')||'';rec.status=S._formStatus.rs||'planning';rec.who=whoVal();
  if(!edit)RESORTS.push(rec);
  save('dtp_resorts',RESORTS);afterWhoSave('Resort',rec,oldWho);S._who=null;toast('Resort saved');closeScreen();render();
}
function delResort(id){
  var it=RESORTS.filter(function(x){return x.id===id;})[0];if(!ownOK(it))return;
  confirmCritical('resort booking',function(){
    for(var i=0;i<RESORTS.length;i++)if(RESORTS[i].id===id){RESORTS.splice(i,1);break;}
    save('dtp_resorts',RESORTS);notifyDelete('Resort',it);toast('Stay removed');closeScreen();render();
  });
}

/* ── Trip name & dates ─────────────────────────────────────── */
function tripById(id){for(var i=0;i<TRIPS.length;i++)if(TRIPS[i].id===id)return TRIPS[i];return null;}
/* trip-editor date calendar — same range picker as the wizard, but collapsed
   to a summary line until the user taps it open. */
function teCalToggle(){
  S._teCalOpen=!S._teCalOpen;
  if(S._teCalOpen&&!S._teCalYear){
    if(S._teStart){S._teCalYear=+S._teStart.slice(0,4);S._teCalMonth=+S._teStart.slice(5,7)-1;}
    else{var _n=new Date();S._teCalYear=_n.getFullYear();S._teCalMonth=_n.getMonth();}
  }
  renderScreen_inplace2();
}
function teCalPrev(){S._teCalMonth--;if(S._teCalMonth<0){S._teCalMonth=11;S._teCalYear--;}renderScreen_inplace2();}
function teCalNext(){S._teCalMonth++;if(S._teCalMonth>11){S._teCalMonth=0;S._teCalYear++;}renderScreen_inplace2();}
function teCalPick(d){
  if(!S._teStart||(S._teStart&&S._teEnd)||d<S._teStart){S._teStart=d;S._teEnd=null;}
  else if(d===S._teStart){S._teStart=null;S._teEnd=null;}
  else{S._teEnd=d;}
  renderScreen_inplace2();
}
function teDatesLabel(){
  var s=S._teStart,e=S._teEnd;
  if(s&&e)return monOf(s)+' '+Number(s.slice(8))+' – '+monOf(e)+' '+Number(e.slice(8))+', '+s.slice(0,4);
  if(s)return monOf(s)+' '+Number(s.slice(8))+', '+s.slice(0,4)+' — tap to set end date';
  return 'Set trip dates';
}
function scrTripEdit(){
  var t=tripById(S.screen.tripId||S.tripId);if(!t)return scrGeneric();
  if(!canEditTrip(t)){
    var who=(t.by&&person(t.by))?person(t.by).name:'an admin';
    return screenShell('Trip','<div class="body-empty" style="text-align:left;padding:6px 2px">Only '+esc(who)+' or an admin can change this trip\'s name, dates and members.</div>',null,null,'Done');
  }
  if(S._formInit!=='trip'){S._formColor=t.color;S._formInit='trip';S._tpartyId=(t.parties&&t.parties[0])||S.partyId||(PARTIES[0]||{}).id;S._teStart=t.start||'';S._teEnd=t.end||'';S._teCalOpen=false;S._teCalYear=null;S._teCalMonth=null;S._notify=!!t.notifyByDefault;}
  var body='<div class="field"><label class="field-label">Trip name</label><input class="field-input" id="tr-name" value="'+esc(t.name)+'"></div>';
  body+='<div class="field"><label class="field-label">Dates</label>';
  if(S._teCalOpen){
    body+=renderCalGrid(S._teCalYear,S._teCalMonth,S._teStart,S._teEnd,'teCalPick','teCalPrev','teCalNext');
    body+='<button class="btn-secondary" onclick="teCalToggle()" style="margin-top:2px">Done</button>';
  }else{
    body+='<button class="field-input" onclick="teCalToggle()" style="text-align:left;cursor:pointer;background:#fff;display:flex;align-items:center;justify-content:space-between"><span'+(S._teStart?'':' style="color:var(--muted)"')+'>'+esc(teDatesLabel())+'</span>'+IC.cal+'</button>';
  }
  body+='</div>';
  body+='<div class="field"><label class="field-label">Notifications</label>';
  body+='<div class="notify-row'+(S._notify?' on':'')+'" onclick="notifToggle()"><span class="notify-check">'+(S._notify?IC.checkw:'')+'</span><div><div class="notify-lbl">Notify members of changes by default</div><div class="notify-sub">When on, you\'ll be prompted to choose who to notify whenever you save a change to this trip.</div></div></div></div>';
  body+='<div class="field"><label class="field-label">Color</label><select class="field-select" id="tr-color">'+colorOptions(S._formColor)+'</select></div>';
  if(isAdmin()){
    body+='<div class="field"><label class="field-label">Group <span class="opt">(members of this group will be on the trip)</span></label><div class="whoselect">';
    for(var gi=0;gi<PARTIES.length;gi++){var gg=PARTIES[gi],gon=(S._tpartyId===gg.id);
      body+='<div class="who-opt'+(gon?' on':'')+'" onclick="pickTripParty(\''+gg.id+'\')"><span class="wdot" style="background:'+(gg.color||'#6B4FA0')+'">'+esc((gg.name[0]||'').toUpperCase())+'</span>'+esc(gg.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';}
    body+='</div></div>';
  }
  var _memPid=S._tpartyId||S.partyId;
  var _memPpl=partyPeople(_memPid);
  body+='<div class="field"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><label class="field-label" style="margin:0">Trip Members</label>';
  if(isAdmin())body+='<button class="btn-secondary" style="margin:0;width:auto;padding:6px 12px;min-height:0;font-size:13px;flex-shrink:0" onclick="editTripMembers()">Edit members</button>';
  body+='</div>';
  body+='<div style="font-size:13px;color:var(--muted);margin:8px 0">All members of the selected group are on this trip.</div>';
  if(_memPpl.length){body+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:2px">';for(var _mi=0;_mi<_memPpl.length;_mi++){var _mp=_memPpl[_mi];body+='<span style="background:var(--cream);border-radius:99px;padding:3px 10px;font-size:13px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+_mp.color+';margin-right:5px;vertical-align:middle"></span>'+esc(_mp.name)+'</span>';}body+='</div>';}
  body+='</div>';
  var own=(t.by&&person(t.by))?person(t.by):null;
  body+='<div class="field"><label class="field-label">Trip owner</label>';
  if(own){
    body+='<div style="display:flex;align-items:center;gap:8px;padding:4px 0"><span class="wdot" style="background:'+own.color+'">'+esc(own.name[0])+'</span><strong>'+esc(own.name)+'</strong>'+(own.id===S.persona?' (you)':'')+'</div>';
    body+='<div class="body-empty" style="text-align:left;padding:2px 2px 0;font-size:12px">The owner organises this trip — they and any admin can edit it and see everyone\'s lists.</div>';
  }else{
    body+='<div class="body-empty" style="text-align:left;padding:2px 2px 0;font-size:12px">No owner recorded for this trip — only admins can manage it.</div>';
  }
  body+='</div>';
  body+='<button class="btn-danger-link" onclick="delTrip(\''+t.id+'\')">Delete this trip</button>';
  return screenShell('Edit Trip',body,'Save','saveTrip()');
}
function saveTrip(){
  var t=tripById(S.screen.tripId||S.tripId);if(!t){closeScreen();return;}
  if(!canEditTrip(t)){toast('Only the trip creator or an admin can edit this trip');closeScreen();return;}
  var nm=val('tr-name');if(nm)t.name=nm;
  var st=S._teStart||'',en=S._teEnd||'';
  if(st&&en){
    t.start=st;t.end=en;
    t.dates=monOf(st)+' '+(+st.slice(8))+' – '+monOf(en)+' '+(+en.slice(8))+', '+st.slice(0,4);
    reconcileDays(t.id);saveDays();
    if(t.id===S.tripId){S.dayIdx=0;S.open=defOpen();}
  }
  t.notifyByDefault=!!S._notify;
  var c=val('tr-color');if(c)t.color=c;
  var effectivePartyId=(isAdmin()&&S._tpartyId)?S._tpartyId:S.partyId;
  if(isAdmin()&&S._tpartyId){t.parties=[S._tpartyId];}
  var oldMem=(t.members||[]).slice();
  t.members=partyPeople(effectivePartyId).map(function(p){return p.id;});
  if(t.id===S.tripId){S.fmode='all';S.filter.clear();}
  save('dtp_trips',TRIPS);var optIn=S._notify;var newMem=t.members.slice();toast('Trip updated');closeScreen();render();
  notifyMembership(t,oldMem,newMem,optIn);
}
function delTrip(id){
  if(TRIPS.length<=1){toast('Keep at least one trip');return;}
  var t=tripById(id);
  if(!canEditTrip(t)){toast('Only the trip owner or an admin can delete a trip');return;}
  confirmCritical('trip (and everything in it)',function(){doDelTrip(id);});
}
function doDelTrip(id){
  TRIPS=TRIPS.filter(function(x){return x.id!==id;});
  // remove this trip\'s days and items
  function drop(coll){for(var i=coll.length-1;i>=0;i--)if(coll[i].trip===id)coll.splice(i,1);}
  [DAYS,VISITS,PARKHOURS,DINING,LLS,SHOWS,FLIGHTS,RESORTS,PARKRES,TICKETS,REBOOKS].forEach(drop);
  for(var c=CHAT.length-1;c>=0;c--)if(CHAT[c].trip===id)CHAT.splice(c,1);
  try{localStorage.removeItem('dtp_packing_'+id);localStorage.removeItem('dtp_todo_'+id);}catch(e){}
  save(daysKey(id),[]);   /* empty the deleted trip's day record so the deletion syncs out */
  if(S.tripId===id){S.dayIdx=0;S.open=defOpen();S.fmode='all';S.filter.clear();}
  ensureVisibleTrip();saveTripId();persist();toast('Trip deleted');closeScreen();render();
}

/* ============================================================
   MAIN RENDER
   ============================================================ */
/* no-trip landing — shown when nothing is selected (new persona, or just
   deleted the trip you were viewing). You leave it by picking/creating a trip. */
function renderNoTrip(){
  var has=hasVisibleTrip();
  var can=canCreateTrip();
  var o='<div class="notrip"><div class="notrip-art">'+IC.map+'</div>';
  o+='<div class="notrip-title">'+(has?'No trip selected':'No trips yet')+'</div>';
  o+='<div class="notrip-sub">'+(has
    ? 'Pick the trip you want to view'+(can?', or start planning a new one.':'.')
    : (can?'You\'re not part of any trips yet. Plan one to get started.':'You\'re not part of any trips yet. Ask your group\'s owner to add you to one.'))+'</div>';
  if(has)
    o+='<button class="btn-primary" onclick="openSheet({type:\'trips\'})">Choose a trip</button>';
  if(can)
    o+='<button class="btn-secondary'+(has?'':' green')+'" onclick="openScreen({type:\'newtrip\'})">'+IC.plus+' Plan a new trip</button>';
  o+='</div>';
  return o;
}
/* super-admin impersonation bar — shown while managing another family */
function impersonationBanner(){
  if(!(window.CLOUD&&window.CLOUD.adminWid))return '';
  return '<div style="background:#7C2D12;color:#fff;padding:calc(8px + env(safe-area-inset-top)) 12px 8px;display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:13px;font-weight:600;position:sticky;top:0;z-index:200">'
    +'<span style="flex:1;min-width:0">Managing '+esc(partyLabel())+' as super-admin</span>'
    +'<button onclick="exitTenant()" style="background:#fff;color:#7C2D12;border:0;border-radius:8px;padding:8px 16px;font-weight:700;flex-shrink:0">Exit</button></div>';
}
function render(){
  /* normalise stale/unauthorised tabs (Overview removed; Admin is admin-only) */
  if(S.tab==='overview'||(S.tab==='admin'&&!isAdmin()))S.tab='home';
  document.getElementById('header-host').innerHTML=impersonationBanner()+renderHeader();
  if(noTripSelected()){
    document.getElementById('strip-host').innerHTML='';
    document.getElementById('filter-host').innerHTML='';
    /* the Admin console (people/parties/trips) doesn\'t need a selected trip —
       keep it reachable so an empty tenant is still manageable */
    document.getElementById('app').innerHTML=(S.tab==='admin'&&isAdmin())?renderAdminHub():renderNoTrip();
    document.getElementById('app').style.padding='';
    renderNav();
    return;
  }
  document.getElementById('strip-host').innerHTML=renderStrip();
  document.getElementById('filter-host').innerHTML='';
  var o='';
  if(S.tab==='home') o=renderAgenda();
  else if(S.tab==='plan') o=renderPlanHub();
  else if(S.tab==='admin') o=renderAdminHub();
  else if(S.tab==='lists') o=renderListsHub();
  else if(S.tab==='chat') o=renderChat();
  document.getElementById('app').innerHTML=o;
  if(S.tab==='chat'){document.getElementById('app').style.padding='0';}
  else{document.getElementById('app').style.padding='';}
  renderNav();
}
materializeAllDays();
ensureActiveParty();
ensureVisibleTrip();
loadLists();
S.open=defOpen();
render();
/* automatic rolling backups: a first snapshot once data has settled, then a
   throttled check every minute (autoBackup itself skips if unchanged / too
   soon). A pure local safety net — see the backup engine above. */
try{
  setTimeout(function(){try{autoBackup();}catch(e){}},20000);
  setInterval(function(){try{autoBackup();}catch(e){}},60000);
}catch(e){}
/* an invite link (#join=CODE&as=PERSON) — stash it so onCloudSynced can act
   on it after sign-in, then strip it from the URL */
try{
  if(typeof location!=='undefined'&&location.hash&&location.hash.indexOf('join=')>=0){
    var _ip={};location.hash.replace(/^#/,'').split('&').forEach(function(kv){var a=kv.split('=');_ip[a[0]]=decodeURIComponent(a[1]||'');});
    if(_ip.join){
      S._invite={code:(_ip.join||'').toUpperCase(),as:_ip.as||null};
      try{localStorage.setItem('dtp_invite',JSON.stringify(S._invite));}catch(e){}
      try{if(history&&history.replaceState)history.replaceState(null,'',location.pathname+location.search);}catch(e){}
    }
  }
}catch(e){}

/* front door. cloud.js loads after this file (and pulls the Firebase SDK from a
   CDN first), so window.CLOUD may not exist for the first few ticks — and on a
   slow/throttled network that CDN can take MINUTES. We must not keep the page
   blank that whole time. The sign-in screen is pure HTML (it only touches
   window.CLOUD when a button is actually clicked), so we paint it IMMEDIATELY
   and let Firebase finish loading in the background. Once window.CLOUD is set we
   route definitively: signed-in users are moved off the gate by the auth
   callbacks (onCloudSynced); if Firebase turns out to be disabled entirely we
   fall back to the local persona chooser. */
var _bootTries=0;
function bootFrontDoor(){
  try{
    if(window.CLOUD){
      if(window.CLOUD.enabled){
        if(window.CLOUD.user)return;                          /* signed in → auth callbacks route */
        if(!(S.screen&&(S.screen.type==='signin'||S.screen.type==='claim')))
          openScreen({type:'signin'});
      }else if(!localStorage.getItem('dtp_persona')){
        openScreen({type:'persona'});                         /* no firebase at all → local mode */
      }
      return;   /* CLOUD resolved — stop polling */
    }
    /* CLOUD not loaded yet: show the sign-in gate NOW so a slow Firebase CDN
       can't leave the page blank, then keep polling so we can correct to the
       local persona chooser in the rare case Firebase is actually disabled. */
    if(!(S.screen&&(S.screen.type==='signin'||S.screen.type==='claim')))
      openScreen({type:'signin'});
    if(_bootTries++<200)setTimeout(bootFrontDoor,30);
  }catch(e){}
}
setTimeout(bootFrontDoor,0);
