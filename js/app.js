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
  checkw:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  arr:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  lock:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  pencil:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
  back:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  send:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  upload:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  bell:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
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
var BUILD='136';   /* bumped each deploy — shown in Settings to spot stale caches */
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
      return {cat:c.cat, items:(c.items||[]).map(function(it){return {n:it.n,qty:it.qty,l:!!it.l};})};
    });
  });
  return o;
}
var PACKING_TMPL = load('dtp_pack_tmpl', stripPackTmpl(PACKING_SEED));
function savePackTmpl(){save('dtp_pack_tmpl',PACKING_TMPL);}

FAMILY  = load('dtp_family', FAMILY);
ALL_IDS = FAMILY.map(function(p){return p.id;});
DAYS    = load('dtp_days', DAYS);
VISITS  = load('dtp_visits', VISITS);
PARKHOURS = load('dtp_hours', PARKHOURS);
DINING  = load('dtp_dining', DINING);
LLS     = load('dtp_lls', LLS);
SHOWS   = load('dtp_shows', SHOWS);
FLIGHTS = load('dtp_flights', FLIGHTS);
RESORTS = load('dtp_resorts', RESORTS);
PARKRES = load('dtp_parkres', PARKRES);
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
  var _pa=(FAMILY.filter(function(p){return p.admin;})[0]||FAMILY[0]||{}).id||null;
  PARTIES=[{id:'g1',name:'My Planning Party',by:_pa}];
}
/* every person & trip belongs to >=1 party (migrate legacy .groups). Must run
   on first load AND after every cloud pull, since synced records may predate
   the parties field — otherwise visibleTrips would wall them all out. */
function ensurePartyTags(){
  if(!PARTIES||!PARTIES.length){
    var _legacy=load('dtp_groups',null);
    if(_legacy&&_legacy.length)PARTIES=_legacy;
    else{var _pa=(FAMILY.filter(function(p){return p.admin;})[0]||FAMILY[0]||{}).id||null;PARTIES=[{id:'g1',name:'My Planning Party',by:_pa}];}
  }
  var pid=PARTIES[0].id;
  /* parties carry a color too (like people and trips) — backfill any missing
     one from the shared palette so existing data picks up a stable color. */
  for(var pc=0;pc<PARTIES.length;pc++){if(!PARTIES[pc].color)PARTIES[pc].color=PALETTE[pc%PALETTE.length][0];}
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];
    if(!Array.isArray(p.parties)||!p.parties.length)p.parties=(Array.isArray(p.groups)&&p.groups.length)?p.groups.slice():[pid];
    /* split legacy single-field full legal name into first (p.name) + last name.
       Everything after the first token becomes the last name so middle names
       aren't dropped; p.name (the casual first name) is left untouched. */
    if(p.lastName===undefined&&p.fullName){var _sp=String(p.fullName).trim().split(/\s+/);p.lastName=_sp.length>1?_sp.slice(1).join(' '):'';}}
  for(var j=0;j<TRIPS.length;j++){var t=TRIPS[j];
    if(!Array.isArray(t.parties)||!t.parties.length)t.parties=(Array.isArray(t.groups)&&t.groups.length)?t.groups.slice():[pid];}
}
ensurePartyTags();
function saveParties(){save('dtp_parties',PARTIES);}
S.partyId = load('dtp_partyId', PARTIES[0].id);   /* active party context */
function savePartyId(){save('dtp_partyId',S.partyId);}

/* every planning item belongs to a trip — default seed items to jul26 */
function tagTrip(coll){for(var i=0;i<coll.length;i++)if(!coll[i].trip)coll[i].trip='jul26';}
[DAYS,VISITS,PARKHOURS,DINING,LLS,SHOWS,FLIGHTS,RESORTS,PARKRES,REBOOKS].forEach(tagTrip);
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
  if(changed)save('dtp_days',DAYS);
}

/* collection savers */
function persist(){
  save('dtp_days',DAYS);save('dtp_visits',VISITS);save('dtp_hours',PARKHOURS);save('dtp_dining',DINING);save('dtp_lls',LLS);
  save('dtp_shows',SHOWS);save('dtp_flights',FLIGHTS);save('dtp_resorts',RESORTS);
  save('dtp_parkres',PARKRES);save('dtp_rebooks',REBOOKS);save('dtp_trips',TRIPS);save('dtp_family',FAMILY);save('dtp_parties',PARTIES);save('dtp_chat',CHAT);
}

/* re-read every synced collection from localStorage into the in-memory globals.
   Called after a cloud pull (sign-in reconcile or a realtime update) so the UI
   reflects data that arrived from another device. Identity/selection keys
   (persona, tripId) stay device-local and are intentionally not touched. */
function rehydrate(){
  TODO_TMPL=load('dtp_todo_tmpl',TODO_TMPL);
  PACKING_TMPL=load('dtp_pack_tmpl',PACKING_TMPL);
  FAMILY=load('dtp_family',FAMILY); ALL_IDS=FAMILY.map(function(p){return p.id;});
  DAYS=load('dtp_days',DAYS); VISITS=load('dtp_visits',VISITS); PARKHOURS=load('dtp_hours',PARKHOURS);
  DINING=load('dtp_dining',DINING); LLS=load('dtp_lls',LLS); SHOWS=load('dtp_shows',SHOWS);
  FLIGHTS=load('dtp_flights',FLIGHTS); RESORTS=load('dtp_resorts',RESORTS); PARKRES=load('dtp_parkres',PARKRES);
  REBOOKS=load('dtp_rebooks',REBOOKS); TRIPS=load('dtp_trips',TRIPS); NOTIFS=load('dtp_notifs',NOTIFS);
  PARTIES=load('dtp_parties',PARTIES)||PARTIES; CHAT=load('dtp_chat',CHAT);
  try{ensurePartyTags();}catch(e){}   /* re-tag records that arrived without a party */
  try{ensureActiveParty();}catch(e){}
  try{ensureVisibleTrip();}catch(e){}
  try{loadLists();}catch(e){}
  try{render();}catch(e){}
}

/* ── Helpers ───────────────────────────────────────────────── */
function person(id){for(var i=0;i<FAMILY.length;i++)if(FAMILY[i].id===id)return FAMILY[i];return null;}
/* ── Planning Parties ── (active-party context scopes what you see) */
function partyById(id){for(var i=0;i<PARTIES.length;i++)if(PARTIES[i].id===id)return PARTIES[i];return null;}
function personInParty(p,pid){return !!(p&&p.parties&&p.parties.indexOf(pid)>=0);}
function partyPeople(pid){pid=pid||S.partyId;return FAMILY.filter(function(p){return personInParty(p,pid);});}
function tripsInParty(pid){return TRIPS.filter(function(t){return t.parties&&t.parties.indexOf(pid)>=0;});}
function visibleParties(){if(isAdmin())return PARTIES.slice();var me=person(S.persona);return PARTIES.filter(function(g){return personInParty(me,g.id);});}
function activeParty(){return partyById(S.partyId)||visibleParties()[0]||PARTIES[0]||null;}
/* the human label for the current party — prefers the in-app name over the
   cloud workspace name (which can be a stale "Planning Party" default) */
function partyLabel(){var g=activeParty();return (g&&g.name)||(window.CLOUD&&window.CLOUD.partyName)||'Planning Party';}
function ensureActiveParty(){var vg=visibleParties();if(!vg.length){S.partyId=(PARTIES[0]||{}).id||null;return;}for(var i=0;i<vg.length;i++)if(vg[i].id===S.partyId)return;S.partyId=vg[0].id;}
function switchParty(pid){if(pid===S.partyId){closeSheet();return;}S.partyId=pid;savePartyId();ensureVisibleTrip();S.dayIdx=0;S.open=defOpen();S.fmode='all';S.filter.clear();closeSheet();toast('Party: '+((partyById(pid)||{}).name||''));render();}
function trip(){for(var i=0;i<TRIPS.length;i++)if(TRIPS[i].id===S.tripId)return TRIPS[i];return visibleTrips()[0]||TRIPS[0];}
/* trips the current persona may see: within the active party; admins see all of
   it, others only trips they own or are a member of (owning always wins) */
/* a trip belongs to the active party (an untagged trip shows everywhere so
   data never silently disappears) */
function visibleTrips(){
  if(isAdmin())return TRIPS.slice();
  return TRIPS.filter(function(t){
    if(t.by&&t.by===S.persona)return true;
    return t.members&&t.members.indexOf(S.persona)>=0;
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
/* validate the active selection without auto-jumping into another trip. A valid,
   visible selection is kept; anything else is blanked so render() shows the
   no-trip landing and the user purposely picks the trip they want. */
function ensureVisibleTrip(){ if(noTripSelected())S.tripId=null; }
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
function whoStack(who){
  who=collapseWho(who);
  if(who==="all"||!who) return '<span class="who-all">Everyone</span>';
  if(!who.length) return '';
  var h='<div class="who-stack">';
  for(var i=0;i<who.length;i++){var p=person(who[i]);if(!p)continue;
    h+='<span class="wdot" style="background:'+p.color+'" title="'+esc(p.name)+'">'+esc(p.name[0])+'</span>';}
  return h+'</div>';
}

/* status badge */
function statusBadge(st){
  var map={
    booked:['st-booked','Booked'], planning:['st-planning','Planned'],
    reserved:['st-reserved','Reserved'], planned:['st-planned','Planned'], want:['st-want','Want to Try'],
    attend:['st-booked','Attend'], scheduled:['st-todo','Scheduled'],
    todo:['st-todo','To Do'], done:['st-done','Done'], na:['st-na','N/A']
  };
  var m=map[st]||['st-todo',st];
  var ic = (st==='booked'||st==='reserved'||st==='done'||st==='attend')?'<span style="display:flex">'+IC.checkw+'</span>':'';
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
  var M={adddining:DINING,llbook:LLS,addll:LLS,addflight:FLIGHTS,resortedit:RESORTS,showedit:SHOWS,predit:PARKRES,visedit:VISITS,hoursedit:PARKHOURS,rbedit:REBOOKS};
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
   gated by trip status (planning = silent unless opted in; active = prompt)
   ============================================================ */
var ACTION_CATS={Dining:1,'Lightning Lane':1,'Park reservation':1};
function isActionCat(c){return !!ACTION_CATS[c];}
/* screen type → notification category (drives self-leave from plan items) */
var CAT_OF={adddining:'Dining',llbook:'Lightning Lane',addll:'Lightning Lane',predit:'Park reservation',
  showedit:'Show',addflight:'Flight',resortedit:'Resort',visedit:'Park visit'};

function pname(id){var p=person(id);return p?p.name:'Someone';}
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
  if(cat==='Show')return it.name||'a show';
  if(cat==='Flight')return it.label||'a flight';
  if(cat==='Resort')return it.name||'a resort stay';
  if(cat==='Park visit')return (it.park&&PARKS[it.park]?PARKS[it.park].name:'a park')+' visit';
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
  var active=(t&&t.status==='active');
  if(!active&&!o.optIn){ if(plan.forced.length)sendNotifPlan(plan.forced); bumpBell(); return; }
  openNotifConfirm(o,plan);
}
function tripMembersFor(tid){var t=tripById(tid)||trip();return (t&&t.members&&t.members.length)?t.members.slice():tripMembers();}

/* the notification we\'d deliver a given recipient for this change */
function notifForRecipient(id,o){
  var b=(S._notifById||{})[id];if(b)return b;
  /* someone the actor chose to also tell — a plain heads-up */
  var who=pname(o.actor),text,kind='change';
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
  var t=tripById(tid)||trip(),active=(t&&t.status==='active');
  if(!active&&!S._notify)return;          /* planning: silent unless opted in */
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
  var active=(tripObj.status==='active');
  if(!active&&!optIn)return;             /* planning: silent unless opted in */
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
function notifKindCls(k){return (k==='action'||k==='left')?'nk-act':k==='removed'?'nk-rm':'nk-add';}
function notifKindMark(k){return (k==='action'||k==='left')?IC.warn:k==='removed'?'<span style="font-weight:800">–</span>':IC.checkw;}
function notifDefault(){return !!(trip()&&trip().status==='active');}
function notifToggle(){S._notify=!S._notify;renderScreen_inplace2();}
/* the in-editor notify control (appended after the who-select) */
function notifyField(cat){
  var active=!!(trip()&&trip().status==='active'),on=!!S._notify;
  var h='<div class="field"><label class="field-label">Notifications</label>';
  h+='<div class="notify-row'+(on?' on':'')+'" onclick="notifToggle()"><span class="notify-check">'+(on?IC.checkw:'')+'</span>';
  if(active){
    h+='<div><div class="notify-lbl">Notify people when I save</div><div class="notify-sub">This trip is active — tick to choose who to let know when you save.</div></div></div>';
  }else{
    h+='<div><div class="notify-lbl">Notify people of this change</div><div class="notify-sub">This trip is still planning, so changes stay silent unless you switch this on.</div></div></div>';
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

/* queries — all scoped to the current trip */
function flightsFor(date){return FLIGHTS.filter(function(f){return f.trip===S.tripId&&f.day===date;});}
function diningFor(date){return DINING.filter(function(d){return d.trip===S.tripId&&d.day===date;});}
function llFor(date){return LLS.filter(function(l){return l.trip===S.tripId&&l.day===date;});}
function showsFor(date){return SHOWS.filter(function(s){return s.trip===S.tripId&&s.day===date;});}
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
  toast('Updating…');
  var done=function(){location.reload();};
  try{
    var jobs=[];
    if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations){
      jobs.push(navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.unregister();}));}));
    }
    if(window.caches&&caches.keys){
      jobs.push(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k);}));}));
    }
    Promise.all(jobs).then(done,done);
  }catch(e){done();}
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
  S.screen=def;S._who=null;S._formStatus={};S._delpk=null;S._deltd=null;S.tdForm=null;S.tdScope='mine';S._tdPriv=false;
  S.pkForm=null;S.pkScope='mine';S._delsect=null;S._pksect=null;ADD.psect=null;
  S._formLoc=null;S._formTier=null;S._formInit=null;S._formColor=null;
  S._notify=notifDefault();
  if(def.type==='newtrip'){S._notify=true;S._formInit=null;S._ntStep=null;S._ntPartyId=null;S._ntWhoMode=null;S._ntProvParty=null;S._ntTripId=null;S._ntFirstRun=false;S._ntPeople=null;S._ntInvite=null;S._ntPeopleCount=1;S._ntExpandedParty=null;S._ntTripName=null;S._ntStart=null;S._ntEnd=null;S._ntCalYear=null;S._ntCalMonth=null;}
  else if(def.type==='tripedit'){var _et=tripById(def.tripId);S._notify=!!(_et&&_et.status==='active');}
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
  /* 1. already linked → straight in */
  var mine=personaForUid(uid);
  if(mine){
    S.persona=mine.id;save('dtp_persona',mine.id);
    ensureActiveParty();ensureVisibleTrip();
    if(S.screen&&(S.screen.type==='signin'||S.screen.type==='claim'))closeScreen();
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
    if(window.CLOUD.inParty&&window.CLOUD.inParty())
      openScreen({type:'claim'});      /* returning owner whose seat isn\'t linked → pick */
    else
      openScreen({type:'newtrip'});     /* authorized new owner → guided setup */
  }else{
    openScreen({type:'noaccess'});     /* not on the guest list */
  }
}
/* called by cloud.js when there\'s no signed-in cloud user */
function onCloudSignedOut(){
  try{localStorage.removeItem('dtp_persona');}catch(e){}
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
  S.persona=id;save('dtp_persona',id);
  ensureActiveParty();ensureVisibleTrip();
  closeScreen();
  /* if you brought your own data and aren\'t sharing yet, spin up a party so
     you get a code to invite others — no separate "create" step needed */
  if(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user&&window.CLOUD.inParty&&!window.CLOUD.inParty()){
    window.CLOUD.createParty('Planning Party').then(function(){toast('You are '+p.name);render();}).catch(function(){toast('You are '+p.name);render();});
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
  if(b&&S.screen&&S.screen.type==='packlist'){b.innerHTML=packingBody();return;}
  if(b&&S.screen&&S.screen.type==='lists'){b.innerHTML=listScreenBody('packing');return;}
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
function needBuyCount(){return needBuyEntries().length;}
function pkGotIt(owner,ci,ii){var it=PACKING[owner]&&PACKING[owner][ci]&&PACKING[owner][ci].items[ii];if(!it)return;
  var buyers=(it.who&&it.who.length)?it.who:[owner];
  if(!(buyers.indexOf(S.persona)>=0||owner===S.persona||listOversight())){toast('Only the buyer, the owner or an admin can do this');return;}
  it.needBuy=false;saveLists();toast('Marked as bought');
  if(S.screen&&S.screen.type==='needbuy'){var h=document.getElementById('screen-host');if(h){h.innerHTML=renderScreen();var s=h.firstChild;if(s)s.classList.add('in');}}else render();
}
/* packing: per-trip per-person "has started" flag + template seeding */
function pkStartKey(){return 'dtp_packstart_'+S.tripId;}
function pkStartedSet(){return load(pkStartKey(),[]);}
function pkHasStarted(pid){pid=pid||S.persona;
  if(PACKING[pid]&&PACKING[pid].some(function(c){return c.items&&c.items.length;}))return true;
  return pkStartedSet().indexOf(pid)>=0;}
function pkMarkStarted(pid){pid=pid||S.persona;var s=pkStartedSet();if(s.indexOf(pid)<0){s.push(pid);save(pkStartKey(),s);}}
function pkStartFromTemplate(){
  var t=PACKING_TMPL[S.persona];
  PACKING[S.persona]=t?t.map(function(c){return {cat:c.cat,items:(c.items||[]).map(function(it){return {n:it.n,qty:it.qty,l:!!it.l,done:false,needBuy:false,who:[]};})};}):[];
  pkMarkStarted(S.persona);saveLists();toast(t&&t.length?'Loaded your template':'Your template is empty');refreshLists();
}
function pkStartEmpty(){if(!PACKING[S.persona])PACKING[S.persona]=[];pkMarkStarted(S.persona);refreshLists();}
function pkSaveAsTemplate(){
  PACKING_TMPL[S.persona]=(PACKING[S.persona]||[]).map(function(c){return {cat:c.cat,items:(c.items||[]).map(function(it){return {n:it.n,qty:it.qty,l:!!it.l};})};});
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
function tdCanEdit(t){return !!t&&(t.by===S.persona||todoOversight());}
function tdCanCheck(t){return !!t&&(t.by===S.persona||todoOversight()||(t.who&&t.who.indexOf(S.persona)>=0));}
/* per-trip per-person "has started a list" flag (so we can offer template / blank) */
function tdStartKey(){return 'dtp_todostart_'+S.tripId;}
function tdStartedSet(){return load(tdStartKey(),[]);}
function tdHasStarted(pid){pid=pid||S.persona;
  if(tdMine(pid).length||tdAssignedTo(pid).length)return true;
  return tdStartedSet().indexOf(pid)>=0;}
function tdMarkStarted(pid){pid=pid||S.persona;var s=tdStartedSet();if(s.indexOf(pid)<0){s.push(pid);save(tdStartKey(),s);}}

function refreshTodo(){var b=document.getElementById('todo-body');if(b&&S.screen&&S.screen.type==='todolist')b.innerHTML=todoBody();else render();}

function tdToggle(id){var t=tdById(id);if(!t)return;if(!tdCanCheck(t)){toast('Only the creator, an assignee or an admin can check this');return;}t.done=!t.done;saveTODO();refreshTodo();}
function tdAddOpen(){S.tdForm={id:null};S._who=new Set();S._tdPriv=false;S._notify=notifDefault();refreshTodo();}
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
  for(var i=0;i<tmpl.length;i++)TODO.push({id:'td'+Date.now()+'_'+i,trip:S.tripId,by:S.persona,done:false,n:tmpl[i].n,when:tmpl[i].when||'',who:[]});
  tdMarkStarted(S.persona);saveTODO();toast(tmpl.length?'Loaded your template':'Your template is empty');refreshTodo();
}
function tdStartEmpty(){tdMarkStarted(S.persona);refreshTodo();}
function tdSaveAsTemplate(){
  var mine=tdMine(S.persona);
  TODO_TMPL[S.persona]=mine.map(function(t){return {n:t.n,when:t.when||''};});
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
    return '<div class="cond"><span class="cond-dot" style="background:'+PARKS.trv.color+'"></span><div style="flex:1"><div class="cond-pk">No park visit</div><div class="cond-hours" style="color:var(--muted)">Travel / rest day</div></div></div>';
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
/* badges derived from the day\'s items (+ any custom one-off tags) */
function dayBadges(d){
  var date=d.date,out=[],vis=function(w){return visible(w);};
  if(flightsFor(date).filter(function(f){return vis(f.who);}).length) out.push('Travel Day');
  var anyIn=false,anyOut=false;
  for(var i=0;i<RESORTS.length;i++){var r=RESORTS[i];if(r.trip===S.tripId&&vis(r.who)){if(r.checkin===date)anyIn=true;if(r.checkout===date)anyOut=true;}}
  if(anyIn) out.push('Check-in');
  if(anyOut) out.push('Check-out');
  if(visitsFor(date).filter(function(v){return vis(v.who);}).length>=2) out.push('Park Hopper');
  if(parkResFor(date).filter(function(p){return vis(p.who);}).length) out.push('Park Reservation');
  if(parkHoursFor(date).some(function(h){return h.early;})) out.push('Early Entry');
  var lls=llFor(date).filter(function(l){return vis(l.who);});
  if(lls.some(function(l){return l.tier==='sp';})) out.push('Single Pass Day');
  if(lls.some(function(l){return l.tier==='mp1'||l.tier==='mp2';})) out.push('Multi Pass Day');
  var TD=tripDays();
  if(TD.length&&TD[TD.length-1].date===date) out.push('Last Day');
  if(d.tags&&d.tags.length) out=out.concat(d.tags);
  return out;
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
  o+='<div class="h-date">'+monOf(d.date)+' '+d.d+' · '+(WDF[d.dl]||d.dl)+'</div>';
  o+='<div class="h-park">'+esc(d.visit||pk.name)+'</div>';
  if(p2&&!d.visit) o+='<div class="h-park2"><span class="p2dot" style="background:'+p2.color+'"></span>then '+p2.name+' · '+timingLbl(sec.timing).toLowerCase()+'</div>';
  if(d.blurb) o+='<div class="h-resort">'+esc(d.blurb)+'</div>';
  var bdg=dayBadges(d);
  o+='<div class="h-badges">';
  for(var b=0;b<bdg.length;b++) o+='<span class="badge">'+esc(bdg[b])+'</span>';
  o+='</div></div>';
  if(d.alert) o+='<div class="hero-alert">'+IC.warn+'<div class="hero-alert-txt">'+esc(d.alert)+'</div></div>';
  o+='</div>';

  /* Per-park conditions (hours + crowd + reservation per park visited) */
  o+=dayConditions(d);
  o+='<button class="add-link" style="margin:2px 0 6px" onclick="openScreen({type:\'dayedit\',day:\''+d.date+'\'})">'+IC.pencil+' Edit day details</button>';

  /* Order: Strategy · Flights · Resort · Dining · Night Shows · Lightning Lanes · Day Plan */
  if(d.strategy) o+=stratCard(d,pk);

  var flts=flightsFor(d.date).filter(function(f){return visible(f.who);});
  if(flts.length) o+=flightCard(flts,d);

  var stays=resortsFor(d.date).filter(function(r){return visible(r.who)&&(r.checkin===d.date||r.checkout===d.date);});
  for(var s=0;s<stays.length;s++) o+=resortCard(stays[s],d.date);

  var din=diningFor(d.date).filter(function(x){return visible(x.who);});
  o+=diningCard(din,pk,d.date);

  var sh=showsFor(d.date).filter(function(x){return visible(x.who);});
  o+=showsCard(sh,pk,d.date);

  var lls=llFor(d.date).filter(function(l){return visible(l.who);});
  if(lls.length) o+=llCard(lls,d,pk);

  o+=dayPlanCard(d,pk);

  return o;
}

function resortCard(r,date){
  var key='resort_'+r.id;
  if(!(key in S.open)) S.open[key]=true;
  var flag = date===r.checkin?'<span class="resort-flag flag-in">'+IC.check+' Check-in today</span>'
           : date===r.checkout?'<span class="resort-flag flag-out">'+IC.warn+' Check-out today</span>':'';
  var o='<div class="card'+(isPlanningStatus(r.status)?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-resort)',pkOf(date).color,IC.bed,'Resort',r.name,isPlanningStatus(r.status));
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
  o+=cardHead(key,'var(--hd-flight)',pk.color,IC.plane,'Flights',sub,allPlanning);
  if(S.open[key]){
    o+='<div class="card-body">';
    if(!flts.length){
      o+='<div class="body-empty">No flights for this day'+(filterActive()?' for the current filter':'')+'.</div>';
    }
    for(var i=0;i<flts.length;i++) o+=flightJourney(flts[i],d);
    o+='<button class="add-link" onclick="openScreen({type:\'addflight\',day:\''+d.date+'\'})">'+IC.plus+' Add flight</button>';
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
  diningFor(date).forEach(function(dn){if(dn.status==='reserved'||dn.status==='planned')out.push({t:dn.time,x:dn.meal+' — '+dn.name,type:'dining',who:dn.who,dstatus:dn.status,soft:dn.status==='planned'});});
  showsFor(date).forEach(function(s){if((s.status||'attend')==='attend')out.push({t:s.time,x:s.name,type:'show',who:s.who});});
  llFor(date).forEach(function(l){var bk=l.status==='booked';out.push({t:bk?(l.bookedTime||l.window):l.window,x:l.ride+' ('+tagShort(l.tier)+')',type:'ll',who:l.who,ref:l.id,soft:!bk});});
  (d.itin||[]).forEach(function(it,idx){out.push({t:it.t,x:it.x,type:'manual',who:it.who||'all',crit:it.crit,idx:idx});});
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
  var map={flight:['Flight','#1B2B4A'],dining:['Dining','#7C2D12'],show:['Show','#4C1D95'],ll:['Lightning Lane','#92400E'],resort:['Resort','#1C3A5E'],rebook:['Re-book','#B45309']};
  var m=map[t];return m?'<span class="t-tag" style="background:'+m[1]+';color:#fff">'+m[0]+'</span>':'';
}
function dayPlanCard(d,pk){
  var key='itin';
  var summary=d.strategy?firstSentence(d.strategy):null;
  var items=dayPlanItems(d);
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-plan)',pk.color,IC.route,'Day Plan',items.length+' stops');
  if(S.open[key]){
    o+='<div class="card-body">';
    if(summary) o+='<div class="plan-summary"><strong>The plan:</strong> '+esc(summary)+'</div>';
    for(var j=0;j<items.length;j++){
      var e=items[j];
      o+='<div class="t-row'+(e.soft?' t-soft':'')+'">';
      o+='<div class="t-time">'+esc(e.t)+'</div>';
      o+='<div style="flex:1"><div class="t-text">'+pillify(esc(e.x))+'</div>';
      o+=whoStack(e.who);
      var tags=[];
      var chip=planChip(e.type);if(chip)tags.push(chip);
      if(e.soft) tags.push('<span class="t-tag" style="background:transparent;color:#92724A;border:1.5px dashed #C9A45E">Planned</span>');
      if(e.type==='dining'&&e.dstatus==='reserved') tags.push('<span class="t-tag" style="background:#DCFCE7;color:#15803D">Reserved</span>');
      if(e.type==='ll'&&!e.soft) tags.push('<span class="t-tag" style="background:#DCFCE7;color:#15803D">Booked</span>');
      if(e.crit) tags.push('<span class="t-tag t-tag-crit">'+esc(e.crit)+'</span>');
      if(tags.length) o+='<div class="t-tags">'+tags.join('')+'</div>';
      o+='</div>';
      if(e.type==='manual') o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0;align-self:flex-start" onclick="openScreen({type:\'stopedit\',day:\''+d.date+'\',idx:'+e.idx+'})">'+IC.pencil+'</button>';
      o+='</div>';
    }
    if(llFor(d.date).length){
      o+='<div class="ll-legend"><div class="ll-legend-item"><span class="ll-tag sp">SP</span> Single Pass</div>'
        +'<div class="ll-legend-item"><span class="ll-tag mp1">T1</span> Multi Pass T1</div>'
        +'<div class="ll-legend-item"><span class="ll-tag mp2">T2</span> Multi Pass T2</div></div>';
    }
    o+='<button class="add-link" onclick="openScreen({type:\'stopedit\',day:\''+d.date+'\'})">'+IC.plus+' Add stop</button>';
    o+='</div>';
  }
  return o+'</div>';
}

function llCard(lls,d,pk){
  var key='ll';
  var planning=lls.filter(function(l){return l.status==='planning';}).length;
  var booked=lls.length-planning;
  var roll=rebooksFor(d.date).filter(function(r){return visible(r.who);});
  var anyPlan=planning>0;
  var o='<div class="card'+(anyPlan?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-ll)',pk.color,IC.bolt,'Lightning Lanes',booked+' booked · '+planning+' planning'+(roll.length?' · '+roll.length+' rolling':''),anyPlan);
  if(S.open[key]){
    o+='<div class="card-body">';
    o+='<div class="ll-legend"><div class="ll-legend-item"><span class="ll-tag sp">SP</span> Single Pass</div>'
      +'<div class="ll-legend-item"><span class="ll-tag mp1">T1</span> Multi Pass T1</div>'
      +'<div class="ll-legend-item"><span class="ll-tag mp2">T2</span> Multi Pass T2</div></div>';
    o+='<div class="ll-bookdate">'+IC.bolt+' Book '+esc(lls[0].bookDate)+'</div>';
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
      o+='</div>';
    }
    o+='<div class="roll-hd">Rolling Re-books</div>';
    for(var r=0;r<roll.length;r++){var rb=roll[r];
      o+='<div class="roll-row"><span class="roll-arr">'+IC.arr+'</span><span style="flex:1">'+esc(rebookText(rb))+' '+whoStack(rb.who)+'</span>'
        +'<button class="hdr-icon" style="width:26px;height:26px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="openScreen({type:\'rbedit\',edit:\''+rb.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div>';
    }
    if(!roll.length) o+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No rolling re-books yet.</div>';
    o+='<button class="add-link" onclick="openScreen({type:\'rbedit\',day:\''+d.date+'\'})">'+IC.plus+' Add rolling re-book</button>';
    o+='<button class="add-link" onclick="openScreen({type:\'addll\',day:\''+d.date+'\'})">'+IC.plus+' Add ride</button>';
    o+='</div>';
  }
  return o+'</div>';
}

function stratCard(d,pk){
  var key='strat';
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-strat)',pk.color,IC.book,'Strategy & Notes','Tap to read');
  if(S.open[key]){
    var ps=d.strategy.split('\n\n');
    o+='<div class="card-body"><div class="strategy-body">';
    for(var p=0;p<ps.length;p++) o+='<p>'+esc(ps[p])+'</p>';
    o+='</div></div>';
  }
  return o+'</div>';
}

function diningCard(din,pk,date){
  var key='din';
  var anyPlan=din.some(function(x){return isPlanningStatus(x.status);});
  var o='<div class="card'+(anyPlan?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-din)',pk.color,IC.fork,'Dining',din.length?(din.length+' in plan'):'Nothing yet',anyPlan);
  if(S.open[key]){
    o+='<div class="card-body">';
    if(!din.length) o+='<div class="body-empty">No dining'+(filterActive()?' for the current filter':'')+' on this day.</div>';
    for(var i=0;i<din.length;i++) o+=diningRow(din[i]);
    o+='<button class="add-link" onclick="openScreen({type:\'adddining\',day:\''+date+'\'})">'+IC.plus+' Add dining</button>';
    o+='</div>';
  }
  return o+'</div>';
}
function diningRow(dn){
  var o='<div class="din-row">';
  o+='<div class="meal">'+esc(dn.meal)+'</div>';
  o+='<div style="flex:1;min-width:0"><div class="din-name">'+esc(dn.name)+'</div><div class="din-time">'+esc(dn.time)+'</div>';
  if(dn.status==='reserved'&&dn.conf&&dn.conf!=='walk-up') o+='<div class="din-conf">Confirmation '+esc(dn.conf)+'</div>';
  o+=whoChips(dn.who);
  o+='</div>';
  o+='<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">';
  o+=statusBadge(dn.status);
  o+=(dn.loc==='in'&&dn.park&&PARKS[dn.park])?'<span class="inpark-badge" style="background:'+PARKS[dn.park].color+'">'+esc(PARKS[dn.park].short)+'</span>':(dn.loc==='in'?'<span class="inpark-badge" style="background:#8C9BAA">In-Park</span>':'<span class="nonpark-badge">Non-Park</span>');
  o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280" onclick="openScreen({type:\'adddining\',edit:\''+dn.id+'\',day:\''+dn.day+'\'})">'+IC.pencil+'</button>';
  o+='</div></div>';
  return o;
}
function showsCard(sh,pk,date){
  var key='shows';
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-show)',pk.color,IC.star,'Night Shows',sh.length?(sh.length+' show'+(sh.length>1?'s':'')):'Nothing yet');
  if(S.open[key]){
    o+='<div class="card-body">';
    if(!sh.length) o+='<div class="body-empty">No shows'+(filterActive()?' for the current filter':'')+' on this day.</div>';
    for(var i=0;i<sh.length;i++){var x=sh[i];
      o+='<div class="show-row"><div style="flex:1"><div class="show-name">'+esc(x.name)+'</div><div style="display:flex;align-items:center;gap:6px;margin-top:4px">'+statusBadge(x.status||'attend')+whoChips(x.who)+'</div></div><div class="show-time">'+esc(x.time)+'</div>';
      o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0;margin-left:8px" onclick="openScreen({type:\'showedit\',edit:\''+x.id+'\',day:\''+x.day+'\'})">'+IC.pencil+'</button></div>';
    }
    o+='<button class="add-link" onclick="openScreen({type:\'showedit\',day:\''+date+'\'})">'+IC.plus+' Add show</button>';
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
    ['Resort',IC.bed,'var(--hd-resort)',cnt(RESORTS)+' stays','resort'],
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
  o+='<div class="hub-section-label">Import</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'import\'})"><div class="hub-icon" style="background:#1E40AF">'+IC.sparkles+'</div>'
    +'<div class="hub-main"><div class="hub-title">AI Import</div><div class="hub-sub">Paste structured details from Claude</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'csvimport\'})"><div class="hub-icon" style="background:#0F766E">'+IC.upload+'</div>'
    +'<div class="hub-main"><div class="hub-title">CSV Import</div><div class="hub-sub">Seed a trip from a spreadsheet</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<div class="hub-section-label">Manage</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'parties\'})"><div class="hub-icon" style="background:#6B4FA0">'+IC.home+'</div>'
    +'<div class="hub-main"><div class="hub-title">Planning Parties</div><div class="hub-sub">'+PARTIES.length+' '+(PARTIES.length===1?'party':'parties')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'personas\'})"><div class="hub-icon" style="background:#1C3A5E">'+IC.users+'</div>'
    +'<div class="hub-main"><div class="hub-title">People</div><div class="hub-sub">'+FAMILY.length+' '+(FAMILY.length===1?'person':'people')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'alltrips\'})"><div class="hub-icon" style="background:#0E7490">'+IC.map+'</div>'
    +'<div class="hub-main"><div class="hub-title">Trips</div><div class="hub-sub">'+TRIPS.length+' '+(TRIPS.length===1?'trip':'trips')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  if(window.CLOUD&&window.CLOUD.isSuper){
    o+='<div class="hub-section-label">Super Admin</div>';
    o+='<button class="hub-row" onclick="openTenants()"><div class="hub-icon" style="background:#7C2D12">'+IC.grid+'</div>'
      +'<div class="hub-main"><div class="hub-title">All Tenants</div><div class="hub-sub">Every owner\'s parties, people & trips</div></div><div class="chev">'+IC.chev+'</div></button>';
    o+='<button class="hub-row" onclick="openOwners()"><div class="hub-icon" style="background:#0F766E">'+IC.users+'</div>'
      +'<div class="hub-main"><div class="hub-title">Authorized Users</div><div class="hub-sub">Who may sign in to the app</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  o+='<div class="hub-section-label">Data</div>';
  o+='<button class="hub-row" onclick="exportAllData()"><div class="hub-icon" style="background:#475569">'+IC.upload+'</div>'
    +'<div class="hub-main"><div class="hub-title">Export / Backup</div><div class="hub-sub">Download all data as JSON</div></div><div class="chev">'+IC.chev+'</div></button>';
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
  h+='<div class="chat-asof">Family thread · '+esc(trip().name)+'</div>';
  var lastDay=null;
  var msgs=CHAT.filter(function(m){return m.trip===S.tripId;});
  if(!msgs.length) h+='<div class="body-empty" style="margin-top:20px">No messages yet for this trip.</div>';
  for(var i=0;i<msgs.length;i++){
    var m=msgs[i],p=person(m.from),mine=m.from===me;
    if(m.day&&m.day!==lastDay){lastDay=m.day;h+='<div class="chat-day"><span>'+fmtDay(m.day)+'</span></div>';}
    h+='<div class="msg'+(mine?' me':'')+'">';
    h+='<div class="msg-av" style="background:'+p.color+'">'+p.name[0]+'</div>';
    h+='<div class="msg-col">';
    if(!mine) h+='<div class="msg-name">'+esc(p.name)+'</div>';
    h+='<div class="msg-bubble">';
    if(m.ref) h+='<div class="msg-ref" onclick="toast(\'Jumps to: '+esc(m.ref.label)+'\')">'+refIcon(m.ref.type)+esc(m.ref.label)+'</div>';
    h+=esc(m.text)+'</div>';
    h+='<div class="msg-time">'+esc(m.time)+'</div>';
    h+='</div></div>';
  }
  h+='</div>';
  h+='<div class="chat-bar"><input class="chat-input" id="chat-inp" placeholder="Message the family…" onkeydown="if(event.key===\'Enter\')sendChat()">';
  h+='<button class="chat-send" onclick="sendChat()">'+IC.send+'</button></div>';
  return h;
}
function refIcon(t){var i=t==='dining'?IC.fork:t==='flight'?IC.planexs:t==='show'?IC.star:IC.route;return '<span style="display:flex">'+i+'</span>';}
function sendChat(){var e=document.getElementById('chat-inp');if(!e||!e.value.trim())return;
  CHAT.push({id:'c'+Date.now()+'_'+Math.random().toString(36).slice(2,6),from:S.persona,text:e.value.trim(),time:'Now',ts:Date.now(),trip:S.tripId});
  saveChat();render();
  setTimeout(function(){var w=document.getElementById('chatwrap');if(w)window.scrollTo(0,document.body.scrollHeight);},30);
}

/* ============================================================
   PACKING  (per-trip, per-person sections, privacy-aware)
   ============================================================ */
function packingBody(){
  var me=S.persona;var o='';
  if(listOversight())o+=packScopeToggle();
  if(listOversight()&&S.pkScope==='all')return o+packEveryoneView();
  o+=packSticky(me);
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
function setPkScope(s){S.pkScope=s;S.pkForm=null;ADD.pk=null;ADD.psect=null;S._pksect=null;refreshLists();}
function packEveryoneView(){
  var o='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Everyone\'s packing lists for '+esc(trip().name)+'. As the trip owner or an admin you can edit any item.</div>';
  tripMembers().forEach(function(pid){o+=packingPerson(pid);});
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
      if(S.pkForm&&S.pkForm.pid===pid&&S.pkForm.c===c&&S.pkForm.i===j){o+=pkItemEditor(pid,c,j);continue;}
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
function pkItemRow(pid,c,j){
  var it=PACKING[pid][c].items[j],pend=S._delpk==='d_'+pid+'_'+c+'_'+j,can=pkCanItem(pid,it);
  var subs=[];
  if(it.by&&it.by!==pid&&person(it.by))subs.push('Added by '+esc(person(it.by).name));
  if(it.needBuy){var bs=(it.who&&it.who.length)?it.who.map(function(p){var pp=person(p);return pp?esc(pp.name):'';}).filter(Boolean).join(', '):(person(pid)?esc(person(pid).name):'');subs.push('Buy · '+bs);}
  if(it.priv)subs.push(IC.lock+' Hidden');
  var o='<div class="pk-row">';
  o+='<div class="chkbox'+(it.done?' on':'')+'" onclick="pkChk(\''+pid+'\','+c+','+j+')">'+(it.done?IC.checkw:'')+'</div>';
  o+='<div class="pk-name'+(it.done?' done':'')+'" onclick="pkChk(\''+pid+'\','+c+','+j+')">'+esc(it.n)+(subs.length?'<div class="pk-by">'+subs.join(' · ')+'</div>':'')+'</div>';
  if(it.l)o+='<span class="lkr-tag">Locker</span>';
  else o+='<div class="qty-wrap"><button class="qty-btn" onclick="pkDec(\''+pid+'\','+c+','+j+')">&#8722;</button><span class="qty-num">'+(it.qty||0)+'</span><button class="qty-btn" onclick="pkInc(\''+pid+'\','+c+','+j+')">+</button></div>';
  if(can&&!pend)o+='<button class="hdr-icon" style="width:30px;height:30px;background:'+(it.needBuy?'#FEF3C7;color:#92400E':'#F3F1EC;color:#6B7280')+';flex-shrink:0" onclick="pkItemEdit(\''+pid+'\','+c+','+j+')">'+IC.pencil+'</button>';
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
  var o='<div class="inline-editor">';
  o+='<div class="inline-editor-title">'+IC.pencil+' Edit item</div>';
  o+='<div class="field" style="margin:0"><label class="field-label">Item</label><input class="field-input" id="pki-name" value="'+esc(it.n)+'"></div>';
  o+='<div class="field" style="margin:0"><label class="field-label">Storage</label><div class="seg"><button class="seg-btn'+(!it.l?' on':'')+'" onclick="pkFormStore(false)">Suitcase</button><button class="seg-btn'+(it.l?' on':'')+'" onclick="pkFormStore(true)">Owners Locker</button></div></div>';
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
  if(!tdHasStarted(me))o+=todoStarter();
  /* My to-dos */
  o+='<div class="hub-section-label" style="margin-left:0">My to-dos</div>';
  o+='<div class="card" style="padding:6px 0 0">';
  if(S.tdForm&&S.tdForm.id===null)o+=todoEditor(null);
  if(!mine.length&&!(S.tdForm&&S.tdForm.id===null))o+='<div class="body-empty" style="text-align:left;padding:6px 12px">Nothing here yet.</div>';
  for(var i=0;i<mine.length;i++)o+=todoRowOrEditor(mine[i]);
  if(!S.tdForm)o+='<button class="add-link" onclick="tdAddOpen()">'+IC.plus+' Add task</button>';
  o+='</div>';
  /* Assigned to me by others */
  if(assigned.length){
    o+='<div class="hub-section-label" style="margin-left:0">Assigned to me</div>';
    o+='<div class="card" style="padding:6px 0 0">';
    for(var j=0;j<assigned.length;j++)o+=todoRowOrEditor(assigned[j]);
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
function setTdScope(s){S.tdScope=s;S.tdForm=null;refreshTodo();}
/* admin-only oversight: each person\'s list across the trip */
function todoEveryoneView(){
  var o='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Everyone\'s to-do lists for '+esc(trip().name)+'. As the trip owner or an admin you can check, edit or remove any item.</div>';
  var mem=tripMembers();
  for(var p=0;p<mem.length;p++){var pid=mem[p];
    var items=tdMine(pid).filter(tdCanSee);   /* hide others' private items from oversight */
    var done=items.filter(function(t){return t.done;}).length;
    o+=pbHead(pid,done,items.length);
    o+='<div class="card" style="padding:6px 0 0">';
    if(!items.length)o+='<div class="body-empty" style="text-align:left;padding:6px 12px">No items.</div>';
    for(var k=0;k<items.length;k++)o+=todoRowOrEditor(items[k]);
    o+='</div>';
  }
  return o;
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
function todoRowOrEditor(t){
  if(S.tdForm&&S.tdForm.id===t.id)return todoEditor(t);
  return todoRow(t);
}
function todoRow(t){
  var me=S.persona;
  var canEdit=tdCanEdit(t), amAssignee=t.who&&t.who.indexOf(me)>=0;
  var pend=S._deltd==='tdrm_'+t.id;
  var sub=[];
  if(t.who&&t.who.length)sub.push('Assigned to '+t.who.map(function(p){var pp=person(p);return pp?esc(pp.name):'';}).filter(Boolean).join(', '));
  if(!todoOversight()&&t.by!==me){var c=person(t.by);sub.push('From '+(c?esc(c.name):'someone'));}
  if(t.priv)sub.push(IC.lock+' Hidden');
  var o='<div class="pk-row">';
  o+='<div class="chkbox'+(t.done?' on':'')+'" onclick="tdToggle(\''+t.id+'\')">'+(t.done?IC.checkw:'')+'</div>';
  o+='<div class="pk-name'+(t.done?' done':'')+'" onclick="tdToggle(\''+t.id+'\')">'+esc(t.n)+(sub.length?'<div class="pk-by">'+sub.join(' · ')+'</div>':'')+'</div>';
  if(t.when)o+='<div class="td-when">'+esc(t.when)+'</div>';
  if(canEdit){
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
  var o='<div class="inline-editor">';
  o+='<div class="inline-editor-title">'+IC.pencil+' '+(item?'Edit task':'New task')+'</div>';
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
  if(S.sheet.type!=='trips')return '';
  var groups=[['active','Active'],['planning','Planning'],['archived','Archived']];
  var h='<div class="sheet-backdrop" onclick="if(event.target===this)closeSheet()"><div class="sheet">';
  h+='<div class="sheet-grip"></div><div class="sheet-title">Your Trips</div>';
  h+='<button class="btn-secondary green" style="margin:4px 18px 8px;width:calc(100% - 36px)" onclick="closeSheet();openScreen({type:\'newtrip\'})">'+IC.plus+' Plan a new trip</button>';
  var vis=visibleTrips();
  if(!vis.length) h+='<div class="body-empty" style="text-align:left;padding:6px 2px 4px">No trips yet. '+(isAdmin()?'Tap “Plan a new trip” above.':'Ask an admin to add you to a trip.')+'</div>';
  for(var g=0;g<groups.length;g++){
    var list=vis.filter(function(t){return t.status===groups[g][0];});
    if(!list.length)continue;
    h+='<div class="sheet-seclabel">'+groups[g][1]+'</div>';
    for(var i=0;i<list.length;i++){var t=list[i],on=t.id===S.tripId;
      var mc=(t.members?t.members.length:0);
      var own=(t.by&&person(t.by))?person(t.by):null;
      h+='<div class="trip-row'+(on?' on':'')+'" onclick="switchTrip(\''+t.id+'\')">';
      h+='<div class="trip-bar" style="background:'+t.color+'"></div>';
      h+='<div class="trip-main"><div class="trip-name'+(t.status==='archived'?' archived':'')+'">'+esc(t.name)+'</div>';
      h+='<div class="trip-sub">'+esc(t.dates)+' · '+mc+' '+(mc===1?'person':'people')+(own?' · Owner: '+esc(own.name)+(own.id===S.persona?' (you)':''):'')+'</div></div>';
      if(canEditTrip(t))
        h+='<button class="hdr-icon" style="width:34px;height:34px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="event.stopPropagation();closeSheet();openScreen({type:\'tripedit\',tripId:\''+t.id+'\'})">'+IC.pencil+'</button>';
      h+='<span class="trip-status ts-'+t.status+'">'+(on?'Current':t.status)+'</span></div>';
    }
  }
  h+='</div></div>';
  return h;
}

/* slide-in screen router */
function renderScreen(){
  var t=S.screen.type;
  /* editing an existing item you don\'t own → limited view (with self-removal) */
  var EDIT={adddining:1,llbook:1,addll:1,addflight:1,resortedit:1,showedit:1,predit:1,visedit:1,hoursedit:1,rbedit:1,stopedit:1};
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
  if(t==='predit')    return scrPREdit();
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
    body+='<div class="field"><label class="field-label">Depart</label><input class="field-input" id="ff-l'+i+'-depTime" placeholder="5:45 AM" value="'+(lg?esc(lg.depTime):'')+'"></div></div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">To</label><input class="field-input" id="ff-l'+i+'-arrApt" placeholder="MCO" value="'+(lg?esc(lg.arrApt):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Arrive</label><input class="field-input" id="ff-l'+i+'-arrTime" placeholder="11:50 AM" value="'+(lg?esc(lg.arrTime):'')+'"></div></div>';
    body+='</div>';
  }
  body+='<button class="add-connecting" onclick="addLeg()">'+IC.plus+' Add connecting leg</button>';
  if(edit) body+='<button class="btn-danger-link" onclick="delFlight(\''+edit.id+'\')">Delete this flight</button>';
  return screenShell(edit?'Edit Flight':'Add Flight',body,'Save','saveFlight()');
}
function addLeg(){S.formLegs=(S.formLegs||1)+1;renderScreen_inplace2();}
function removeLeg(){S.formLegs=Math.max(1,(S.formLegs||1)-1);renderScreen_inplace2();}
function renderScreen_inplace2(){
  if(!S.screen){render();return;}
  var host=document.getElementById('screen-host');
  var snap={};
  if(host.querySelectorAll){var olds=host.querySelectorAll('input,select,textarea');for(var i=0;i<olds.length;i++){if(olds[i].id)snap[olds[i].id]=olds[i].value;}}
  host.innerHTML=renderScreen();
  if(host.querySelectorAll){var news=host.querySelectorAll('input,select,textarea');for(var j=0;j<news.length;j++){if(news[j].id&&(news[j].id in snap))news[j].value=snap[news[j].id];}}
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
  body+='<div class="field"><label class="field-label">Time</label><input class="field-input" id="dd-time" placeholder="6:45 PM" value="'+(edit?esc(edit.time):'')+'"></div></div>';
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
  body+='<div class="field"><label class="field-label">Confirmed return time</label><input class="field-input" id="llb-time" placeholder="e.g. 1:25 PM" value=""></div>';
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
    body+='<div class="field"><label class="field-label">Confirmed return time</label><input class="field-input" id="ll-btime" placeholder="1:25 PM" value="'+(edit&&edit.bookedTime?esc(edit.bookedTime):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Confirmation #</label><input class="field-input" id="ll-conf" placeholder="MP-44190" value="'+(edit&&edit.conf?esc(edit.conf):'')+'"></div>';
  }
  body+=whoSelectField(pre);
  body+=notifyField('Lightning Lane');
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="ll-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delLL(\''+edit.id+'\')">Delete this ride</button>';
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
  if(!rec.bookDate)rec.bookDate=monOf(dy)+' '+(+dy.slice(8))+' @ 7:00 AM';
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
'You are turning Walt Disney World reservation details into JSON for my trip planner app.',
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
'• lightning: {"type":"lightning","ride":"","day":"","park":"mk|ep|hs|ak","tier":"sp|mp1|mp2","status":"booked|planning","bookedTime":"9:45 AM","conf":""}',
'   (tier: sp = Single/Individual Lightning Lane, mp1 = Multi Pass tier 1, mp2 = Multi Pass tier 2)',
'• parkres:   {"type":"parkres","day":"","park":"mk|ep|hs|ak","status":"booked|planning"}',
'• show:      {"type":"show","name":"","day":"","time":"9:00 PM","status":"attend|scheduled"}',
'• flight:    {"type":"flight","label":"Outbound|Return","day":"","status":"booked|planning","legs":[',
'     {"airline":"","num":"WN 4657","conf":"","depApt":"BOS","depCity":"Boston","depTime":"5:45 AM","depDate":"","arrApt":"MCO","arrCity":"Orlando","arrTime":"11:50 AM","arrDate":""} ]}',
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
  if(type==='Show')return rec.name+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'')+(rec.time?' · '+rec.time:'');
  if(type==='Flight'){var f=(rec.legs&&rec.legs[0])||{},l=(rec.legs&&rec.legs[rec.legs.length-1])||{};return rec.label+' · '+(f.depApt||'?')+' → '+(l.arrApt||'?')+(impDLabel(rec.day)?' · '+impDLabel(rec.day):'');}
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
  if(t==='show'){
    return finalizeImport('Show',base({name:it.name?String(it.name):'',day:impDate(it.day),time:it.time||'',status:it.status||'attend'}));
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
  S._importItems=arr.map(buildImportItem);
  S._importItems.forEach(function(e){if(!e.error&&e.rec)e.warn=importDateWarn(e.rec,e.type);});
  S.importStep=2;renderScreen_inplace2();
}
/* commit the valid items into their collections */
function importSave(){
  var items=S._importItems||[],added=[];
  var M={'Resort':RESORTS,'Dining':DINING,'Lightning Lane':LLS,'Park reservation':PARKRES,'Show':SHOWS,'Flight':FLIGHTS};
  items.forEach(function(e){
    if(e.error||e._removed||!e.rec)return;
    var coll=M[e.type];if(!coll)return;coll.push(e.rec);added.push(e);
  });
  persist();
  S._importCount=added.length;S.importStep=3;renderScreen_inplace2();
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
  var t=tripById(tid)||trip(),active=(t&&t.status==='active');
  if(!active&&!S._notify){if(plan.forced.length)sendNotifPlan(plan.forced);bumpBell();return;}
  openNotifConfirm({actor:S.persona,trip:tid,cat:'Import',label:'these items',oldWho:[],newWho:[]},plan);
}
function importRemove(i){var e=(S._importItems||[])[i];if(e)e._removed=!e._removed;renderScreen_inplace2();}
function importReset(){S._importItems=null;S._importEdit=null;S.importStep=1;renderScreen_inplace2();}

/* ── CSV template (download → fill in Excel/Sheets → upload) ──
   Reuses the same builder + review screen as the JSON path. */
var IMPORT_CSV_COLS=['type','name','room','checkin','checkout','inTime','outTime','day','meal','time','park','loc','ride','tier','bookedTime','label','airline','num','depApt','depCity','depTime','depDate','arrApt','arrCity','arrTime','arrDate','conf','status'];
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
  Show:[['name','Name','text'],['day','Date','date'],['time','Time','text'],['status','Status',['attend','scheduled']]],
  Flight:[['label','Label','text'],['day','Date','date'],['status','Status',['booked','planning']]]
};
/* required fields per type (re-checked after an edit) */
var IMPORT_REQ={Resort:['name'],Dining:['name','day'],'Lightning Lane':['ride','day'],'Park reservation':['park','day'],Show:['name','day'],Flight:['label']};
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
      var act=!!(trip()&&trip().status==='active'),on=!!S._notify;
      body+='<div class="field" style="margin-top:6px"><label class="field-label">Notifications</label>';
      body+='<div class="notify-row'+(on?' on':'')+'" onclick="notifToggle()"><span class="notify-check">'+(on?IC.checkw:'')+'</span>';
      body+='<div><div class="notify-lbl">Notify the people I assigned</div><div class="notify-sub">'+(act?'This trip is active — you\'ll choose who to let know after saving.':'Tell the people on these items they\'ve been added.')+'</div></div></div></div>';
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
function ntGoToGroup(){
  var people=ntReadPeople();
  if(!people.length||!people[0].name){toast('Add at least one name');return;}
  S._ntPeople=people;S._ntStep='group';renderScreen_inplace2();
}
function ntBack(){
  if(S._ntStep==='notify'){
    if(S._ntTripId){
      TRIPS=TRIPS.filter(function(x){return x.id!==S._ntTripId;});
      DAYS=DAYS.filter(function(d){return d.trip!==S._ntTripId;});
      try{localStorage.removeItem('dtp_packing_'+S._ntTripId);localStorage.removeItem('dtp_todo_'+S._ntTripId);}catch(e){}
      save('dtp_trips',TRIPS);save('dtp_days',DAYS);S._ntTripId=null;S._members=null;
    }
    S._ntStep='who';S._ntWhoMode='existing';renderScreen_inplace2();return;
  }
  if(S._ntStep==='group'){S._ntPeopleCount=S._ntPeople?S._ntPeople.length:1;S._ntStep='who';renderScreen_inplace2();return;}
  if(S._ntStep==='who'){S._ntStep='trip';S._ntWhoMode=null;renderScreen_inplace2();return;}
}
function ntMakeTrip(partyId,mem){
  var nm=S._ntTripName||'My Trip',col=PALETTE[TRIPS.length%PALETTE.length][0],id='t'+Date.now();
  var start=S._ntStart||'',end=S._ntEnd||'';
  var dates=(start&&end)?(monOf(start)+' '+(+start.slice(8))+' – '+monOf(end)+' '+(+end.slice(8))+', '+start.slice(0,4)):'Dates TBD';
  TRIPS.push({id:id,name:nm,sub:'Walt Disney World',status:'planning',start:start,end:end,dates:dates,color:col,members:mem,by:S.persona,parties:partyId?[partyId]:[]});
  genDays(id);var np={},nt=[];mem.forEach(function(pid){np[pid]=[];});
  save('dtp_packing_'+id,np);save('dtp_todo_'+id,nt);save('dtp_trips',TRIPS);save('dtp_days',DAYS);
  S._ntTripId=id;S._members=new Set(mem);
}
function ntCreateTripExisting(){
  if(!S._ntPartyId){toast('Pick a group first');return;}
  var mem=partyPeople(S._ntPartyId).map(function(p){return p.id;});
  if(mem.indexOf(S.persona)<0)mem.push(S.persona);
  ntMakeTrip(S._ntPartyId,mem);
  S._ntStep='notify';renderScreen_inplace2();
}
function ntCreateTripFromGroup(){
  var gname=val('nt-gname');if(!gname){toast('Give your group a name');return;}
  var people=S._ntPeople||[],gid='g'+Date.now();
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
    window.CLOUD.createParty(gname).catch(function(){});
  ntMakeTrip(gid,mem);
  S._ntInvite=added;S._ntStep='invite';renderScreen_inplace2();
}
function ntCreateTripSkip(){
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
  S._ntPeople=null;S._ntInvite=null;S._ntExpandedParty=null;S._ntTripName=null;S._ntStart=null;S._ntEnd=null;S._ntCalYear=null;S._ntCalMonth=null;
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
    save('dtp_trips',TRIPS);save('dtp_days',DAYS);
  }
  S._ntStep=null;S._ntWhoMode=null;S._ntPartyId=null;S._ntProvParty=null;
  S._ntTripId=null;S._ntFirstRun=false;S._members=null;S._formInit=null;
  S._ntPeople=null;S._ntInvite=null;S._ntExpandedParty=null;S._ntTripName=null;S._ntStart=null;S._ntEnd=null;S._ntCalYear=null;S._ntCalMonth=null;
  closeScreen();
}
function scrNewTrip(){
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
      body+='<button class="btn-secondary" style="text-align:left;justify-content:flex-start" onclick="ntSelectWho(\'add\')">Add people now</button>';
      body+='<button class="btn-secondary" style="text-align:left;justify-content:flex-start;color:var(--muted)" onclick="ntCreateTripSkip()">Just me — I\'ll add people later</button>';
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

    if(S._ntWhoMode==='add'){
      body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:13px">Enter everyone who\'s coming:</div>';
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
      body+='<button class="btn-secondary" onclick="ntSelectWho(null)">← All options</button>';
      return screenShell('Plan a Trip',body,'Next →','ntGoToGroup()',cancelLabel,null,cancelArg);
    }
  }

  /* ── Step 3: Name the group (add-people path only) ── */
  if(S._ntStep==='group'){
    var ppl=S._ntPeople||[];
    body+='<div class="hub-section-label" style="margin-left:0">One more thing…</div>';
    if(ppl.length){
      body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:13px">You\'re going with:</div>';
      body+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">';
      ppl.forEach(function(p){if(p.name)body+='<span style="background:var(--cream);border-radius:99px;padding:3px 10px;font-size:13px">'+esc(p.name)+'</span>';});
      body+='</div>';
    }
    body+='<div class="field"><label class="field-label">What do you want to call this group?</label><input class="field-input" id="nt-gname" placeholder="e.g. Smith Family" autocomplete="off"><div style="font-size:12px;color:var(--muted);margin-top:6px">This group becomes your Planning Party — a reusable list of travel companions you can use for future trips.</div></div>';
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
  /* Email-link first: it works in every browser, including private/incognito
     windows, because the link returns to this site directly (no third-party
     cookies). Google sign-in is offered too but can\'t complete in incognito
     on this host — the email link is the reliable path there. */
  body+='<div class="hub-section-label" style="margin-left:0">Sign in with your email</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:13px">We\'ll email you a one-tap sign-in link. Works in any browser, including private windows.</div>';
  body+='<div class="field"><input class="field-input" id="cloud-email" type="email" inputmode="email" placeholder="you@email.com"></div>';
  body+='<button class="btn-secondary green" onclick="cloudEmailLink()">Email me a sign-in link</button>';
  body+='<div class="hub-section-label" style="margin-left:0">Or use Google</div>';
  body+='<button class="btn-secondary" onclick="window.CLOUD.signInGoogle().catch(function(e){toast(e.message||\'Sign-in failed\')})">Sign in with Google</button>';
  body+='<div class="body-empty" style="text-align:left;padding:6px 2px 0;font-size:12px;color:var(--muted)">In a private/incognito window, Google sign-in may not finish — use the email link above instead.</div>';
  return screenShell('Sign in',body,null,null,false);
}
function cloudEmailLink(){
  var v=val('cloud-email');if(!v){toast('Enter your email');return;}
  window.CLOUD.sendEmailLink(v).then(function(){toast('Link sent — check your email');}).catch(function(e){toast(e.message||'Could not send link');});
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
/* wipe the demo seed and stand up a clean account for this owner */
function resetToBlank(){
  FAMILY=[];TRIPS=[];DAYS=[];VISITS=[];PARKHOURS=[];DINING=[];LLS=[];SHOWS=[];FLIGHTS=[];RESORTS=[];PARKRES=[];REBOOKS=[];NOTIFS=[];CHAT=[];
  var gid='g1';PARTIES=[{id:gid,name:'My Planning Party',by:null}];
  var oid='p'+Date.now();
  var owner={id:oid,name:wizOwnerName(),color:PALETTE[0][0],admin:true,parties:[gid],email:(window.CLOUD&&window.CLOUD.user&&window.CLOUD.user.email)||'',uid:cloudUid()};
  FAMILY.push(owner);ALL_IDS=[oid];PARTIES[0].by=oid;
  S.persona=oid;S.partyId=gid;S.tripId=null;PACKING={};TODO=[];
  persist();save('dtp_persona',oid);savePartyId();saveTripId();
}
function startWizard(){openScreen({type:'newtrip'});}
function wizSkip(){
  resetToBlank();
  var done=function(){closeScreen();S.tab='home';render();};
  if(window.CLOUD&&window.CLOUD.inParty&&!window.CLOUD.inParty()&&window.CLOUD.createParty){window.CLOUD.createParty('My Planning Party').then(done,done);}
  else done();
}
function emailInviteLink(pid){
  var p=person(pid);if(!p)return;
  if(!(window.CLOUD&&window.CLOUD.inParty&&window.CLOUD.inParty())){toast('Start a party first');return;}
  var url=location.origin+location.pathname+'#join='+window.CLOUD.partyCode()+(pid?'&as='+encodeURIComponent(pid):'');
  var subj=encodeURIComponent('Join our trip on Baseline Tap');
  var bd=encodeURIComponent('Hi '+p.name+',\n\nI\'m planning our trip on Baseline Tap. Tap this link, sign in, and you\'ll be added automatically:\n\n'+url+'\n');
  location.href='mailto:'+encodeURIComponent(p.email||'')+'?subject='+subj+'&body='+bd;
}
/* one email to everyone with an address — a generic join link they each
   open and pick their own name (no per-person &as= in a shared message) */
function emailInviteAll(ids){
  if(!(window.CLOUD&&window.CLOUD.inParty&&window.CLOUD.inParty())){toast('Start a Planning Party first (Account → Sync)');return;}
  var list=ids||S._ntInvite||[];
  var emails=list.map(function(id){return person(id);}).filter(function(p){return p&&p.email;}).map(function(p){return p.email;});
  if(!emails.length){toast('No email addresses to send to');return;}
  var url=location.origin+location.pathname+'#join='+window.CLOUD.partyCode();
  var subj=encodeURIComponent('Join our trip on Baseline Tap');
  var bd=encodeURIComponent('Hi,\n\nI\'m planning our trip on Baseline Tap. Tap this link, sign in, and pick your name to join:\n\n'+url+'\n');
  location.href='mailto:?bcc='+encodeURIComponent(emails.join(','))+'&subject='+subj+'&body='+bd;
}
/* ── Planning Party management (shown on the Account screen) ─ */
function cloudSection(){
  if(!(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user))return '';
  var st=window.CLOUD.synced?'<span style="color:#16A34A;font-weight:600">syncing</span>':'connecting…';
  var h='<div class="hub-section-label" style="margin-left:0">Sync</div>';
  h+='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:13px">Signed in as <strong>'+esc(window.CLOUD.user.email||window.CLOUD.user.uid)+'</strong> · '+st+'.</div>';
  if(window.CLOUD.inParty&&window.CLOUD.inParty()){
    h+='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:13px">In <strong>'+esc(partyLabel())+'</strong>.'+(isAdmin()?' Manage it in <strong>Admin → Planning Parties</strong>.':'')+'</div>';
  }else{
    h+='<div class="hub-section-label" style="margin-left:0">Planning Party</div>';
    h+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:13px">Start a Planning Party to invite others, or join one with a code.</div>';
    h+='<button class="btn-secondary green" onclick="cloudCreateParty()">Start a Planning Party</button>';
    h+='<div class="hub-section-label" style="margin-left:0">Join a party</div>';
    h+='<button class="btn-secondary" onclick="cloudJoinParty(\'cloud-join\')">Join with a code</button>';
    h+='<div class="field" style="margin-top:6px"><input class="field-input" id="cloud-join" placeholder="Enter an invite code" style="text-transform:uppercase"></div>';
  }
  h+='<div class="hub-section-label" style="margin-left:0">Account</div>';
  h+='<button class="btn-secondary" onclick="logoutPersona()">Sign out</button>';
  return h;
}
function cloudCreateParty(){
  var nm=val('party-name')||'Planning Party';
  toast('Creating…');
  window.CLOUD.createParty(nm).then(function(){toast('Planning Party ready');if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not create');});
}
function cloudJoinParty(inputId){
  var code=val(inputId||'cloud-join');if(!code){toast('Enter a code');return;}
  toast('Joining…');
  window.CLOUD.joinParty(code).then(function(){toast('Joined the party');if(typeof onCloudSynced==='function')onCloudSynced();else if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not join');});
}
function cloudRenameParty(){
  var nm=val('party-rename');if(!nm){toast('Enter a name');return;}
  window.CLOUD.renameParty(nm).then(function(){toast('Renamed');if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not rename');});
}
function cloudLeaveParty(){
  if(!confirm('Leave this Planning Party? Your device goes back to your own copy. The shared plan stays for everyone else.'))return;
  toast('Leaving…');
  window.CLOUD.leaveParty().then(function(){toast('Left the party');if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();}).catch(function(e){toast(e.message||'Could not leave');});
}
/* admin: a personal invite link — the invitee opens it, signs in, and is
   dropped straight into the party AS this person (no codes, no picking) */
function copyInviteLink(pid){
  if(!(window.CLOUD&&window.CLOUD.inParty&&window.CLOUD.inParty())){toast('Start a Planning Party first (Account → Sync)');return;}
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
    body+='<button class="btn-secondary green" onclick="openScreen({type:\'newtrip\'})">'+IC.plus+' Plan a new trip</button>';
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
  if(!isAdmin())return screenShell('Planning Parties','<div class="body-empty" style="padding:24px 12px">Admin only — switch to an admin persona from the <strong>I am</strong> button.</div>',null,null,'Done');
  S._newParty=null;   /* back at the list → no pending add */
  var body='<div class="hub-section-label" style="margin-left:0">Planning Parties</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">A party is a family or household that plans together. Tap one to edit its name and members.</div>';
  for(var i=0;i<PARTIES.length;i++){var g=PARTIES[i];
    var np=partyPeople(g.id).length,nt=tripsInParty(g.id).length;
    body+='<button class="hub-row" onclick="openScreen({type:\'partyedit\',gid:\''+g.id+'\'})">'
      +'<div class="hub-icon" style="background:'+(g.color||'#6B4FA0')+'">'+IC.home+'</div>'
      +'<div class="hub-main"><div class="hub-title">'+esc(g.name)+(g.id===S.partyId?' · active':'')+'</div><div class="hub-sub">'+np+' '+(np===1?'person':'people')+' · '+nt+' '+(nt===1?'trip':'trips')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  return screenShell('Planning Parties',body,null,null,'Done','<button class="sec-add" onclick="addParty()">Add party</button>');
}
function addParty(){var id='g'+Date.now();PARTIES.push({id:id,name:'New Party',by:S.persona,color:PALETTE[PARTIES.length%PALETTE.length][0]});saveParties();S._newParty=id;S._formInit=null;openScreen({type:'partyedit',gid:id});}
/* per-party editor: name + members (live) + the trips this party is on.
   Members and trip assignments commit immediately so you can tap through to a
   person\'s profile or a trip without losing them; the name uses Save. */
function scrPartyEdit(){
  if(!isAdmin())return screenShell('Edit Party','<div class="body-empty" style="padding:24px 12px">Admin only.</div>',null,null,'Done');
  var gid=(S.screen&&S.screen.gid),g=partyById(gid);
  if(!g)return screenShell('Edit Party','<div class="body-empty" style="padding:24px 12px">Party not found.</div>',null,null,'Done');
  var body='<div class="field"><label class="field-label">Party name</label><input class="field-input" id="pt-name" value="'+esc(g.name)+'"></div>';
  body+='<div class="field"><label class="field-label">Color</label><select class="field-select" id="pt-color">'+colorOptions(g.color)+'</select></div>';
  /* current members — tap a name to open their profile; Remove takes them out */
  var mem=partyPeople(gid);
  body+='<div class="hub-section-label" style="margin-left:0">Members ('+mem.length+')</div>';
  if(!mem.length)body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">No one in this party yet — add someone below.</div>';
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
  if(!trips.length)body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">No trips assigned to this party yet.</div>';
  for(var k=0;k<trips.length;k++){var t=trips[k];var mc=(t.members||[]).length;
    body+='<button class="hub-row" onclick="partyGotoTrip(\''+gid+'\',\''+t.id+'\')"><div class="hub-icon" style="background:'+(t.color||'#0E7490')+'">'+IC.map+'</div>'
      +'<div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(t.name)+'</div><div class="hub-sub">'+esc(t.dates||'')+' · '+mc+' '+(mc===1?'person':'people')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  /* assign an existing trip to this party (one party per trip — this moves it) */
  var otherTrips=TRIPS.filter(function(tt){return !(tt.parties&&tt.parties.indexOf(gid)>=0);});
  if(otherTrips.length){
    body+='<div class="hub-section-label" style="margin-left:0">Add a trip to this party</div>';
    body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">Each trip belongs to one party — adding it here moves it from its current party.</div><div class="whoselect">';
    for(var m=0;m<otherTrips.length;m++){var ot=otherTrips[m],cur=partyById((ot.parties||[])[0]);
      body+='<div class="who-opt" onclick="tripSetParty(\''+ot.id+'\',\''+gid+'\')"><span class="wdot" style="background:'+(ot.color||'#0E7490')+'"></span>'+esc(ot.name)+(cur?' <span style="color:#9CA3AF;font-size:12px">(in '+esc(cur.name)+')</span>':'')+'<span class="wcheck">'+IC.plus+'</span></div>';
    }
    body+='</div>';
  }
  body+='<button class="btn-danger-link" onclick="partyDelete(\''+gid+'\')">Remove this party</button>';
  return screenShell('Edit '+esc(g.name),body,'Save','savePartyEdit(\''+gid+'\')','Cancel',null,'backToParties()');
}
/* persist the party name + color from the inputs (used on Save and before
   navigating away) */
function ptSaveName(gid){var g=partyById(gid);if(!g)return;var changed=false;
  var nm=val('pt-name');if(nm&&nm!==g.name){g.name=nm;changed=true;if(window.CLOUD&&S.partyId===gid&&window.CLOUD.renameParty)window.CLOUD.renameParty(nm).catch(function(){});}
  var cl=val('pt-color');if(cl&&cl!==g.color){g.color=cl;changed=true;}
  if(changed)saveParties();}
function partyAddMember(gid,pid){var p=person(pid);if(!p)return;if(!Array.isArray(p.parties))p.parties=[];if(p.parties.indexOf(gid)<0)p.parties.push(gid);save('dtp_family',FAMILY);renderScreen_inplace2();}
function partyRemoveMember(gid,pid){var p=person(pid);if(!p||!p.parties||p.parties.indexOf(gid)<0)return;if(p.parties.length<=1){toast('Everyone needs at least one party');return;}p.parties=p.parties.filter(function(x){return x!==gid;});save('dtp_family',FAMILY);renderScreen_inplace2();}
function partyGotoPerson(gid,pid){ptSaveName(gid);S._newParty=null;S._formInit=null;openScreen({type:'personedit',pid:pid});}
function partyGotoTrip(gid,tid){ptSaveName(gid);S._newParty=null;openTripPlanning(tid);}
function savePartyEdit(gid){var g=partyById(gid);if(!g){backToParties();return;}ptSaveName(gid);S._newParty=null;toast('Party saved');backToParties();}

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
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Every trip in this tenant. Tap one to edit its name, dates, planning party and more.</div>';
  for(var i=0;i<TRIPS.length;i++){var t=TRIPS[i];var g=partyById((t.parties||[])[0]);var mc=(t.members||[]).length;
    var sub=(g?esc(g.name):'No party')+' · '+mc+' '+(mc===1?'person':'people')+(t.dates?' · '+esc(t.dates):'');
    body+='<button class="hub-row" onclick="openScreen({type:\'tripedit\',tripId:\''+t.id+'\'})"><div class="hub-icon" style="background:'+(t.color||'#0E7490')+'">'+IC.map+'</div>'
      +'<div class="hub-main"><div class="hub-title">'+esc(t.name)+'</div><div class="hub-sub">'+sub+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  return screenShell('Trips',body,null,null,'Done','<button class="sec-add" onclick="openScreen({type:\'newtrip\'})">Add trip</button>');
}
function partyDelete(gid){
  if(PARTIES.length<=1){toast('Keep at least one party');return;}
  var nt=tripsInParty(gid).length;
  if(nt){toast('Move its '+nt+' '+(nt===1?'trip':'trips')+' to another party first (trip editor)');return;}
  var g=partyById(gid);
  if(!confirm('Remove party “'+(g?g.name:'')+'”? People stay, just not in this party.'))return;
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
    var pn=(p.parties||[]).length;bits.push(pn+' '+(pn===1?'party':'parties'));
    bits.push(p.uid?'signed in':'not joined');
    body+='<button class="hub-row" onclick="openScreen({type:\'personedit\',pid:\''+p.id+'\'})">'
      +'<div class="hub-icon" style="background:'+p.color+'">'+esc(p.name[0])+'</div>'
      +'<div class="hub-main"><div class="hub-title">'+esc(pfullname(p))+'</div><div class="hub-sub">'+bits.join(' · ')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  }
  body+='<div class="body-empty" style="text-align:left;padding:10px 2px 0;font-size:12px">Tap a person to edit their details or copy their invite link. Trip membership is managed through planning parties.</div>';
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
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 10px;font-size:12px">Emails allowed to sign in. Anyone here (your kids included) can create their own Planning Party and invite people. Everyone else in the world is blocked. You\'re always allowed.</div>';
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
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 8px;font-size:12px">Each authorized owner has their own isolated space (a tenant). Tap one to see (and manage) their parties, people and trips.</div>';
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
  var body='<div class="body-empty" style="text-align:left;padding:2px 2px 8px;font-size:12px">Read-only view of this family\'s data. Use “Manage this family” to make changes.</div>';
  body+='<div class="hub-section-label" style="margin-left:0">Planning Parties ('+parties.length+')</div>';
  for(var i=0;i<parties.length;i++)body+='<div class="hub-row" style="cursor:default"><div class="hub-icon" style="background:#6B4FA0">'+IC.home+'</div><div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(parties[i].name||'(unnamed)')+'</div></div></div>';
  body+='<div class="hub-section-label" style="margin-left:0">People ('+fam.length+')</div>';
  for(var j=0;j<fam.length;j++){var p=fam[j];var bits=[];if(p.admin)bits.push('Admin');if(p.email)bits.push(esc(p.email));bits.push(p.uid?'signed in':'not joined');
    body+='<div class="hub-row" style="cursor:default"><div class="hub-icon" style="background:'+(p.color||'#475569')+'">'+esc((p.name||'?')[0])+'</div><div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(p.name||'(unnamed)')+'</div><div class="hub-sub">'+bits.join(' · ')+'</div></div></div>';}
  body+='<div class="hub-section-label" style="margin-left:0">Trips ('+trips.length+')</div>';
  for(var k=0;k<trips.length;k++){var t=trips[k];var mc=(t.members||[]).length;
    body+='<div class="hub-row" style="cursor:default"><div class="hub-icon" style="background:'+(t.color||'#475569')+'">'+IC.map+'</div><div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(t.name||'(unnamed)')+'</div><div class="hub-sub">'+esc(t.dates||(t.start||'')+(t.end?' – '+t.end:''))+' · '+mc+' '+(mc===1?'person':'people')+'</div></div></div>';}
  var own=(window.CLOUD&&window.CLOUD.wid&&window.CLOUD.wid===S._tenantWid);
  body+='<div class="hub-section-label" style="margin-left:0">Danger zone</div>';
  if(own)body+='<div class="body-empty" style="text-align:left;padding:0 2px;font-size:12px">This is your own active space — manage it from your own account.</div>';
  else body+='<button class="btn-danger-link" onclick="deleteTenant(\''+esc(S._tenantWid)+'\')">Delete this family space permanently</button>';
  return screenShell(nm,body,null,null,'Back','<button class="sec-add" onclick="enterTenant(\''+esc(S._tenantWid)+'\')">Manage this family</button>','openTenants()');
}
/* super-admin: permanently remove an orphaned/unwanted tenant */
function deleteTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.isSuper)){toast('Super-admin only');return;}
  if(!confirm('Permanently delete this entire family space and ALL its data (parties, people, trips, lists)? This cannot be undone.'))return;
  toast('Deleting…');
  window.CLOUD.deleteWorkspace(wid).then(function(){toast('Deleted');openTenants();}).catch(function(e){toast(e.message||'Could not delete');});
}
/* switch INTO a tenant to manage it (super-admin); banner offers Exit */
function enterTenant(wid){
  if(!(window.CLOUD&&window.CLOUD.isSuper)){toast('Super-admin only');return;}
  if(!confirm('Manage this family? You\'ll be editing their live data. Your own data is untouched and you can Exit anytime.'))return;
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
    h+='<div class="field"><label class="field-label">Last name <span class="opt">(as on ID)</span></label><input class="field-input" id="'+pre+'-last" value="'+esc(p.lastName||'')+'" placeholder="e.g. Mills"></div>';
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
  captureTravel(p,'pd');
  save('dtp_family',FAMILY);toast('Travel details saved');closeScreen();render();
}

/* Full person editor (admin) — opened by tapping a person in Manage People.
   Identity + role + groups + PIN + travel details in one form. */
function scrPersonEdit(){
  if(!isAdmin())return screenShell('Edit Person','<div class="body-empty" style="padding:24px 12px">Admin only.</div>',null,null,'Done');
  var pid=(S.screen&&S.screen.pid),p=person(pid);
  if(!p)return screenShell('Edit Person','<div class="body-empty" style="padding:24px 12px">Person not found.</div>',null,null,'Done');
  if(S._formInit!=='person:'+pid){S._peAdmin=!!p.admin;S._peParties=new Set(p.parties||[]);S._formInit='person:'+pid;}
  var body='<div class="field"><label class="field-label">First name</label><input class="field-input" id="pe-name" value="'+esc(p.name)+'"></div>';
  body+='<div class="field"><label class="field-label">Last name <span class="opt">(as on ID)</span></label><input class="field-input" id="pe-last" value="'+esc(p.lastName||'')+'" placeholder="e.g. Mills"></div>';
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
  body+='<div class="field"><label class="field-label">Planning Parties</label>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">Tap a party to add or remove this person. They can be in several.</div>';
  body+='<div class="whoselect">';
  for(var gi=0;gi<PARTIES.length;gi++){var g=PARTIES[gi],on=S._peParties.has(g.id);
    body+='<div class="who-opt'+(on?' on':'')+'" onclick="peToggleParty(\''+g.id+'\')"><span class="wdot" style="background:'+(g.color||'#6B4FA0')+'">'+esc((g.name[0]||'').toUpperCase())+'</span>'+esc(g.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';}
  body+='</div></div>';
  /* trips this person is on (via their parties or direct membership) — tap to open */
  var ptrips=TRIPS.filter(function(t){return (t.members&&t.members.indexOf(pid)>=0)||(t.parties||[]).some(function(g2){return personInParty(p,g2);});});
  body+='<div class="hub-section-label" style="margin-left:0">Trips ('+ptrips.length+')</div>';
  if(!ptrips.length)body+='<div class="body-empty" style="text-align:left;padding:0 2px 6px;font-size:12px">Not on any trips yet. Add them to a party that has trips.</div>';
  for(var ti=0;ti<ptrips.length;ti++){var pt=ptrips[ti];var pg=partyById((pt.parties||[])[0]);
    body+='<button class="hub-row" onclick="peGotoTrip(\''+pid+'\',\''+pt.id+'\')"><div class="hub-icon" style="background:'+(pt.color||'#0E7490')+'">'+IC.map+'</div>'
      +'<div class="hub-main"><div class="hub-title" style="font-size:14px">'+esc(pt.name)+'</div><div class="hub-sub">'+(pg?esc(pg.name):'No party')+(pt.dates?' · '+esc(pt.dates):'')+'</div></div><div class="chev">'+IC.chev+'</div></button>';
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
    if(S._peParties.size<=1){toast('Everyone needs at least one party');return;}
    S._peParties.delete(gid);
  }else S._peParties.add(gid);
  /* commit live so membership sticks even if you navigate away to a trip */
  if(p){var gs=[];S._peParties.forEach(function(x){gs.push(x);});p.parties=gs;save('dtp_family',FAMILY);}
  renderScreen_inplace2();
}
/* commit the safe person fields then jump to a trip (so edits aren\'t lost) */
function peGotoTrip(pid,tid){var p=person(pid);if(p){var nm=val('pe-name');if(nm)p.name=nm;var c=document.getElementById('pe-color');if(c&&c.value)p.color=c.value;var gs=[];if(S._peParties)S._peParties.forEach(function(x){gs.push(x);});if(gs.length)p.parties=gs;captureTravel(p,'pe');S._newPerson=null;save('dtp_family',FAMILY);}openTripPlanning(tid);}
function savePersonEdit(pid){
  var p=person(pid);if(!p){closeScreen();return;}
  var nm=val('pe-name');if(nm)p.name=nm;
  p.lastName=val('pe-last');
  var c=document.getElementById('pe-color');if(c&&c.value)p.color=c.value;
  /* admin — keep at least one admin */
  if(!S._peAdmin&&p.admin&&!FAMILY.filter(function(x){return x.admin&&x.id!==pid;}).length){toast('Keep at least one admin');return;}
  p.admin=!!S._peAdmin;
  /* parties — keep at least one */
  var gs=[];if(S._peParties)S._peParties.forEach(function(x){gs.push(x);});
  p.parties=gs.length?gs:[PARTIES[0].id];
  captureTravel(p,'pe');
  ALL_IDS=FAMILY.map(function(x){return x.id;});
  S._newPerson=null;   /* committed */
  save('dtp_family',FAMILY);toast('Saved');
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
function editTripMembers(){var gid=S._tpartyId||S.partyId;if(!gid){toast('Pick a planning party first');return;}S._formInit=null;openScreen({type:'partyedit',gid:gid});}

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
  for(var g=0;g<order.length;g++){var b=order[g],p=person(b);
    body+='<div class="person-block-hd"><span class="pbdot" style="background:'+(p?p.color:'#999')+'">'+(p?esc(p.name[0]):'?')+'</span><span class="pbname">'+(p?esc(p.name):'Someone')+(b===S.persona?' (you)':'')+' to buy</span><span class="pbcount">'+groups[b].length+'</span></div>';
    body+='<div class="card">';
    for(var i=0;i<groups[b].length;i++){var e=groups[b][i],fw=person(e.owner);
      var canGot=(e.it.who&&e.it.who.indexOf(S.persona)>=0)||e.owner===S.persona||b===S.persona||listOversight();
      body+='<div class="pk-row"><div style="flex:1;min-width:0"><div class="pk-name">'+esc(e.it.n)+((e.it.qty&&!e.it.l)?' <span style="color:var(--muted);font-weight:600">×'+e.it.qty+'</span>':'')+'</div>';
      body+='<div class="pk-by">For '+(fw?esc(fw.name):'?')+(e.it.l?' · Owners Locker':'')+'</div></div>';
      if(canGot)body+='<button class="ri-btn" onclick="pkGotIt(\''+e.owner+'\','+e.ci+','+e.ii+')">Got it</button>';
      body+='</div>';
    }
    body+='</div>';
  }
  return screenShell('Need to Buy',body,null,null,'Done');
}

/* Global per-person To Do template — edited from the account page */
function scrTodoTmpl(){
  var me=person(S.persona);
  var list=TODO_TMPL[S.persona]||(TODO_TMPL[S.persona]=[]);
  var body='<div class="body-empty" style="text-align:left;padding:0 2px 14px;font-size:16px;color:var(--ink)">Your reusable to-do master, '+esc(me?me.name:'')+'. It\'s not tied to any trip — when you start a trip\'s to-do list you can load these in.</div>';
  body+='<div class="hub-section-label" style="margin-left:0">Template items</div>';
  body+='<div class="card" style="padding:6px 0 0">';
  if(!list.length)body+='<div class="body-empty" style="text-align:left;padding:6px 12px">No items yet — add a few below.</div>';
  for(var i=0;i<list.length;i++){
    body+='<div class="pk-row">';
    body+='<input class="field-input" id="tt-n-'+i+'" style="flex:2;min-width:0" value="'+esc(list[i].n)+'" placeholder="Task">';
    body+='<input class="field-input" id="tt-w-'+i+'" style="flex:1;min-width:0;max-width:120px" value="'+esc(list[i].when||'')+'" placeholder="When">';
    body+='<button class="del-btn" onclick="ttDel('+i+')">&times;</button>';
    body+='</div>';
  }
  body+='<button class="add-link" onclick="ttAdd()">'+IC.plus+' Add template item</button>';
  body+='</div>';
  return screenShell('Global To Do Template',body,'Save','ttSave()');
}
function ttCapture(){
  var list=TODO_TMPL[S.persona]||[];
  for(var i=0;i<list.length;i++){
    var n=document.getElementById('tt-n-'+i),w=document.getElementById('tt-w-'+i);
    if(n&&typeof n.value==='string')list[i].n=n.value.trim();
    if(w&&typeof w.value==='string')list[i].when=w.value.trim();
  }
  TODO_TMPL[S.persona]=list;
}
function ttAdd(){ttCapture();(TODO_TMPL[S.persona]||(TODO_TMPL[S.persona]=[])).push({n:'',when:''});renderScreen_inplace2();}
function ttDel(i){ttCapture();TODO_TMPL[S.persona].splice(i,1);renderScreen_inplace2();}
function ttSave(){
  ttCapture();
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
    for(var i=0;i<cat.items.length;i++){var it=cat.items[i];
      body+='<div class="pk-row">';
      body+='<input class="field-input" id="pt-n-'+c+'-'+i+'" style="flex:2;min-width:0" value="'+esc(it.n)+'" placeholder="Item">';
      body+='<input class="field-input" id="pt-q-'+c+'-'+i+'" type="number" inputmode="numeric" style="width:54px;flex:0 0 auto" value="'+(it.l?0:(it.qty||1))+'">';
      body+='<button class="na-btn'+(it.l?' active':'')+'" onclick="ptLock('+c+','+i+')">Locker</button>';
      body+='<button class="del-btn" onclick="ptItemDel('+c+','+i+')">&times;</button>';
      body+='</div>';
    }
    body+='<button class="add-link" onclick="ptItemAdd('+c+')">'+IC.plus+' Add item</button>';
    body+='</div>';
  }
  body+='<button class="add-link" onclick="ptSectAdd()">'+IC.plus+' Add section</button>';
  return screenShell('Global Packing Template',body,'Save','ptSave()');
}
function ptCapture(){
  var list=PACKING_TMPL[S.persona]||[];
  for(var c=0;c<list.length;c++){
    var s=document.getElementById('pt-s-'+c);if(s&&typeof s.value==='string')list[c].cat=s.value.trim();
    for(var i=0;i<list[c].items.length;i++){
      var n=document.getElementById('pt-n-'+c+'-'+i),q=document.getElementById('pt-q-'+c+'-'+i);
      if(n&&typeof n.value==='string')list[c].items[i].n=n.value.trim();
      if(q&&typeof q.value==='string'){var v=parseInt(q.value,10);list[c].items[i].qty=isNaN(v)?(list[c].items[i].l?0:1):v;}
    }
  }
  PACKING_TMPL[S.persona]=list;
}
function ptSectAdd(){ptCapture();(PACKING_TMPL[S.persona]||(PACKING_TMPL[S.persona]=[])).push({cat:'New section',items:[]});renderScreen_inplace2();}
function ptSectDel(c){ptCapture();PACKING_TMPL[S.persona].splice(c,1);renderScreen_inplace2();}
function ptItemAdd(c){ptCapture();PACKING_TMPL[S.persona][c].items.push({n:'',qty:1,l:false});renderScreen_inplace2();}
function ptItemDel(c,i){ptCapture();PACKING_TMPL[S.persona][c].items.splice(i,1);renderScreen_inplace2();}
function ptLock(c,i){ptCapture();var it=PACKING_TMPL[S.persona][c].items[i];it.l=!it.l;if(it.l)it.qty=0;else if(!it.qty)it.qty=1;renderScreen_inplace2();}
function ptSave(){
  ptCapture();
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
    for(var il=0;il<TD.length;il++){var lld=llFor(TD[il].date).filter(function(x){return visible(x.who);});if(!lld.length)continue;
      body+=dayHd(TD[il].date);
      for(var lj=0;lj<lld.length;lj++){var l=lld[lj];
        body+='<div class="ov-card'+(isPlanningStatus(l.status)?' planning':'')+'"><div class="din-row"><div style="flex:1;min-width:0"><div class="din-name">'+esc(l.ride)+' <span class="ll-tag '+tagCls(l.tier)+'">'+tagShort(l.tier)+'</span></div><div class="din-time">'+(l.status==='booked'?('Booked '+esc(l.bookedTime||'')):('Window '+esc(l.window)))+'</div>'+whoChips(l.who)+'</div>'+statusBadge(l.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'addll\',edit:\''+l.id+'\',day:\''+l.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!body)body=fnote('Lightning Lanes');
    add='<button class="sec-add" onclick="openScreen({type:\'addll\',day:\''+dft+'\'})">Add ride</button>';
  }else if(sec==='resort'){
    var rsl=RESORTS.filter(function(r){return r.trip===S.tripId&&visible(r.who);});
    for(var ir=0;ir<rsl.length;ir++){var rr=rsl[ir];
      body+='<div class="ov-card'+(isPlanningStatus(rr.status)?' planning':'')+'"><div class="din-row"><div style="flex:1"><div class="din-name">'+esc(rr.name)+'</div><div class="din-time">'+esc(rr.room)+' · '+monOf(rr.checkin)+' '+(+rr.checkin.slice(8))+' → '+monOf(rr.checkout)+' '+(+rr.checkout.slice(8))+'</div></div>'
        +statusBadge(rr.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'resortedit\',edit:\''+rr.id+'\'})">'+IC.pencil+'</button></div></div>';
    }
    if(!rsl.length) body=fnote('resort stays');
    add='<button class="sec-add" onclick="openScreen({type:\'resortedit\'})">Add resort stay</button>';
  }else if(sec==='parkres'){
    for(var ip=0;ip<TD.length;ip++){var dp=TD[ip];var prl=parkResFor(dp.date).filter(function(p){return visible(p.who);});if(!prl.length)continue;
      body+=dayHd(dp.date);
      for(var pj=0;pj<prl.length;pj++){var prx=prl[pj],ppk=PARKS[prx.park];
        body+='<div class="ov-card'+(isPlanningStatus(prx.status)?' planning':'')+'"><div class="din-row"><span style="background:'+(ppk?ppk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(ppk?esc(ppk.name):esc(prx.park))+'</div>'+whoChips(prx.who)+'</div>'+statusBadge(prx.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'predit\',edit:\''+prx.id+'\',day:\''+prx.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!body) body=fnote('park reservations');
    add='<button class="sec-add" onclick="openScreen({type:\'predit\',day:\''+dft+'\'})">Add park reservation</button>';
  }else if(sec==='visits'){
    for(var i3=0;i3<TD.length;i3++){var dvs=visitsFor(TD[i3].date).filter(function(v){return visible(v.who);});if(!dvs.length)continue;
      body+=dayHd(TD[i3].date);
      for(var vj=0;vj<dvs.length;vj++){var vv=dvs[vj],vpk=PARKS[vv.park];
        body+='<div class="ov-card"><div class="din-row"><span style="background:'+(vpk?vpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(vpk?esc(vpk.name):esc(vv.park))+'</div><div class="din-time">'+timingLbl(vv.timing)+'</div>'+whoChips(vv.who)+'</div>'+(vj===0?'<span class="st-badge st-booked">Primary</span>':'<span class="st-badge st-todo">Hopper</span>')+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'visedit\',edit:\''+vv.id+'\',day:\''+vv.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!body) body=fnote('park visits');
    add='<button class="sec-add" onclick="openScreen({type:\'visedit\',day:\''+dft+'\'})">Add park visit</button>';
  }else if(sec==='hours'){
    var anyH=false;
    for(var i4=0;i4<TD.length;i4++){var dhs=parkHoursFor(TD[i4].date);if(!dhs.length)continue;anyH=true;
      body+=dayHd(TD[i4].date);
      for(var hj=0;hj<dhs.length;hj++){var hh=dhs[hj],hpk=PARKS[hh.park];
        body+='<div class="ov-card"><div class="din-row"><span style="background:'+(hpk?hpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(hpk?esc(hpk.name):esc(hh.park))+'</div><div class="din-time">'+esc((hh.open||'—')+' – '+(hh.close||'—'))+(hh.early?' · Early '+esc(hh.early):'')+(hh.late?' · Late '+esc(hh.late):'')+'</div></div>'+crowdPill(hh.crowd)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'hoursedit\',edit:\''+hh.id+'\',day:\''+hh.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!anyH) body+='<div class="body-empty">No park hours yet.</div>';
    add='<button class="sec-add" onclick="openScreen({type:\'hoursedit\',day:\''+dft+'\'})">Add park hours</button>';
  }
  if(owned)body=renderFilter()+body;   /* Mine / Everyone / Not mine on ownership categories */
  return screenShell(m[0],body,null,null,'Done',add);
}
function scrGeneric(){return screenShell('Coming soon','<div class="body-empty">This section editor is part of the full build.</div>',null,null,'Done');}

/* ── shared form helpers ───────────────────────────────────── */
function val(id){var e=document.getElementById(id);return (e&&typeof e.value==='string')?e.value.trim():'';}
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
  body+='<div class="field"><label class="field-label">Park visits <span class="opt">(assigned items — tap to edit)</span></label>';
  var vis=visitsFor(d.date);
  for(var vi=0;vi<vis.length;vi++){var vv=vis[vi],vpk=PARKS[vv.park];
    body+='<div class="ov-card" style="margin:0 0 8px"><div class="din-row" style="padding:10px 12px"><span style="background:'+(vpk?vpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(vpk?esc(vpk.name):esc(vv.park))+'</div><div class="din-time">'+timingLbl(vv.timing)+'</div>'+whoChips(vv.who)+'</div>'+(vi===0?'<span class="st-badge st-booked">Primary</span>':'<span class="st-badge st-todo">Hopper</span>')+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'visedit\',edit:\''+vv.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
  }
  if(!vis.length) body+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No park visit — travel / rest day.</div>';
  body+='<button class="add-link" style="margin-top:0" onclick="openScreen({type:\'visedit\',day:\''+d.date+'\'})">'+IC.plus+' Add park visit</button>';
  body+='</div>';
  body+='<div class="field"><label class="field-label">Park reservations <span class="opt">(assigned items — tap to edit)</span></label>';
  var prs=parkResFor(d.date);
  for(var pi=0;pi<prs.length;pi++){var pr=prs[pi],ppk=PARKS[pr.park];
    body+='<div class="ov-card'+(isPlanningStatus(pr.status)?' planning':'')+'" style="margin:0 0 8px"><div class="din-row" style="padding:10px 12px"><span style="background:'+(ppk?ppk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(ppk?esc(ppk.name):esc(pr.park))+'</div>'+whoChips(pr.who)+'</div>'+statusBadge(pr.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'predit\',edit:\''+pr.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
  }
  if(!prs.length) body+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No park reservation — Hopper day.</div>';
  body+='<button class="add-link" style="margin-top:0" onclick="openScreen({type:\'predit\',day:\''+d.date+'\'})">'+IC.plus+' Add park reservation</button>';
  body+='</div>';
  body+='<div class="field"><label class="field-label">Park hours & crowd <span class="opt">(per park — tap to edit)</span></label>';
  var phl=parkHoursFor(d.date);
  for(var hi=0;hi<phl.length;hi++){var hh=phl[hi],hpk=PARKS[hh.park];
    body+='<div class="ov-card" style="margin:0 0 8px"><div class="din-row" style="padding:10px 12px"><span style="background:'+(hpk?hpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(hpk?esc(hpk.name):esc(hh.park))+'</div><div class="din-time">'+esc((hh.open||'—')+' – '+(hh.close||'—'))+(hh.early?' · Early '+esc(hh.early):'')+(hh.late?' · Late '+esc(hh.late):'')+'</div></div>'+crowdPill(hh.crowd)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'hoursedit\',edit:\''+hh.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
  }
  if(!phl.length) body+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No park hours set for this day.</div>';
  body+='<button class="add-link" style="margin-top:0" onclick="openScreen({type:\'hoursedit\',day:\''+d.date+'\'})">'+IC.plus+' Add park hours</button>';
  body+='</div>';
  body+='<div class="field"><label class="field-label">Day headline <span class="opt">(big text on the day — defaults to the park name)</span></label><input class="field-input" id="dy-visit" placeholder="'+esc(pkOf(d.date).name)+'" value="'+esc(d.visit||'')+'"></div>';
  body+='<div class="field"><label class="field-label">Short blurb <span class="opt">(small line under the headline)</span></label><input class="field-input" id="dy-blurb" placeholder="e.g. EPCOT all day" value="'+esc(d.blurb||'')+'"></div>';
  body+='<div class="field"><label class="field-label">Custom tags <span class="opt">(comma-separated · most pills are auto from your items)</span></label><input class="field-input" id="dy-tags" placeholder="e.g. Activate APs" value="'+esc((d.tags||[]).join(', '))+'"></div>';
  body+='<div class="field"><label class="field-label">Alert / heads-up <span class="opt">(optional)</span></label><textarea class="field-input" id="dy-alert" rows="3" placeholder="e.g. Storms likely 2–4 PM">'+esc(d.alert||'')+'</textarea></div>';
  body+='<div class="field"><label class="field-label">Strategy & notes <span class="opt">(first sentence shows as “The plan” on the Day Plan)</span></label><textarea class="field-input" id="dy-strat" rows="6" placeholder="The plan for the day… (blank lines start a new paragraph)">'+esc(d.strategy||'')+'</textarea></div>';
  return screenShell('Edit Day',body,'Save','saveDay()');
}
function saveDay(){
  var d=dayByDate(S.screen.day);if(!d){closeScreen();return;}
  d.visit=val('dy-visit');
  d.blurb=val('dy-blurb');
  d.tags=val('dy-tags').split(',').map(function(s){return s.trim();}).filter(function(s){return s;});
  d.alert=val('dy-alert')||null;
  d.strategy=val('dy-strat');
  save('dtp_days',DAYS);toast('Day updated');closeScreen();render();
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
  body+='<div class="field-row"><div class="field"><label class="field-label">Opening</label><input class="field-input" id="vh-open" placeholder="8:30 AM" value="'+esc(eh.open||'')+'"></div>';
  body+='<div class="field"><label class="field-label">Closing</label><input class="field-input" id="vh-close" placeholder="9:00 PM" value="'+esc(eh.close||'')+'"></div></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Early Entry</label><input class="field-input" id="vh-early" placeholder="8:00 AM" value="'+esc(eh.early||'')+'"></div>';
  body+='<div class="field"><label class="field-label">Extended / Late</label><input class="field-input" id="vh-late" placeholder="11:00 PM" value="'+esc(eh.late||'')+'"></div></div>';
  body+='<div class="field"><label class="field-label">Expected crowd</label><select class="field-select" id="vh-crowd">'+crowdOptions(eh.crowd!=null?eh.crowd:null)+'</select></div></div>';
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
  body+='<div class="field-row"><div class="field"><label class="field-label">Opening</label><input class="field-input" id="ph-open" placeholder="8:30 AM" value="'+(edit?esc(edit.open||''):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Closing</label><input class="field-input" id="ph-close" placeholder="9:00 PM" value="'+(edit?esc(edit.close||''):'')+'"></div></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Early Entry <span class="opt">(opt)</span></label><input class="field-input" id="ph-early" placeholder="8:00 AM" value="'+(edit?esc(edit.early||''):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Extended / Late <span class="opt">(opt)</span></label><input class="field-input" id="ph-late" placeholder="11:00 PM" value="'+(edit?esc(edit.late||''):'')+'"></div></div>';
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
  var body='<div class="field"><label class="field-label">Time</label><input class="field-input" id="st-time" placeholder="9:30 AM" value="'+(it?esc(it.t):'')+'"></div>';
  body+='<div class="field"><label class="field-label">What\'s happening</label><input class="field-input" id="st-text" placeholder="e.g. Rope drop — Test Track" value="'+(it?esc(it.x):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Tag <span class="opt">(optional, e.g. Critical, Hop)</span></label><input class="field-input" id="st-crit" placeholder="Critical" value="'+(it&&it.crit?esc(it.crit):'')+'"></div>';
  body+=whoSelectField(it?it.who:'all');
  if(has) body+='<button class="btn-danger-link" onclick="delStop()">Delete this stop</button>';
  return screenShell(has?'Edit Stop':'Add Stop',body,'Save','saveStop()');
}
function saveStop(){
  var d=dayByDate(S.screen.day);if(!d){closeScreen();return;}
  var tx=val('st-text');if(!tx){toast('Add a description');return;}
  var rec={t:val('st-time')||'TBD',x:tx,who:whoVal()};
  var cr=val('st-crit');if(cr)rec.crit=cr;
  rec.by=(S.screen.idx!=null&&d.itin[S.screen.idx]&&d.itin[S.screen.idx].by)||S.persona;
  if(S.screen.idx!=null)d.itin[S.screen.idx]=rec; else d.itin.push(rec);
  save('dtp_days',DAYS);S._who=null;toast('Stop saved');closeScreen();render();
}
function delStop(){
  var d=dayByDate(S.screen.day);
  if(d&&S.screen.idx!=null){if(!ownOK(d.itin[S.screen.idx]))return;d.itin.splice(S.screen.idx,1);}
  save('dtp_days',DAYS);toast('Stop removed');closeScreen();render();
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
  body+='<div class="field"><label class="field-label">Time</label><input class="field-input" id="sh-time" placeholder="9:00 PM" value="'+(edit?esc(edit.time):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Status <span class="opt">(only Attend shows on the Day Plan)</span></label><div class="seg">';
  body+='<button class="seg-btn'+(st==='scheduled'?' on':'')+'" onclick="pickStatus(\'sh\',\'scheduled\')">Scheduled</button>';
  body+='<button class="seg-btn'+(st==='attend'?' on book':'')+'" onclick="pickStatus(\'sh\',\'attend\')">Attend</button></div></div>';
  body+=whoSelectField(pre);
  body+=notifyField('Show');
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="sh-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delShow(\''+edit.id+'\')">Delete this show</button>';
  return screenShell(edit?'Edit Show':'Add Show',body,'Save','saveShow()');
}
function saveShow(){
  var edit=S.screen.edit?SHOWS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var nm=val('sh-name');if(!nm){toast('Add a show name');return;}
  var oldWho=edit?edit.who:[];
  var rec=edit||{id:'s'+Date.now(),trip:S.tripId,by:S.persona};
  rec.name=nm;rec.time=val('sh-time')||'TBD';rec.day=val('sh-day')||S.screen.day;rec.status=S._formStatus.sh||'attend';rec.who=whoVal();
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
  body+='<div class="field"><label class="field-label">Check-in time</label><input class="field-input" id="rs-intime" placeholder="4:00 PM" value="'+(edit&&edit.inTime?esc(edit.inTime):'')+'"></div></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Check-out day</label><select class="field-select" id="rs-out">'+dayOptions(edit?edit.checkout:_dN)+'</select></div>';
  body+='<div class="field"><label class="field-label">Check-out time</label><input class="field-input" id="rs-outtime" placeholder="11:00 AM" value="'+(edit&&edit.outTime?esc(edit.outTime):'')+'"></div></div>';
  body+='<div class="field"><label class="field-label">Confirmation #</label><input class="field-input" id="rs-conf" placeholder="A10293847" value="'+(edit&&edit.conf?esc(edit.conf):'')+'"></div>';
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
  if(S._formInit!=='trip'){S._formStatus.tr=t.status;S._formColor=t.color;S._formInit='trip';S._tpartyId=(t.parties&&t.parties[0])||S.partyId||(PARTIES[0]||{}).id;S._teStart=t.start||'';S._teEnd=t.end||'';S._teCalOpen=false;S._teCalYear=null;S._teCalMonth=null;}
  var body='<div class="field"><label class="field-label">Trip name</label><input class="field-input" id="tr-name" value="'+esc(t.name)+'"></div>';
  body+='<div class="field"><label class="field-label">Dates</label>';
  if(S._teCalOpen){
    body+=renderCalGrid(S._teCalYear,S._teCalMonth,S._teStart,S._teEnd,'teCalPick','teCalPrev','teCalNext');
    body+='<button class="btn-secondary" onclick="teCalToggle()" style="margin-top:2px">Done</button>';
  }else{
    body+='<button class="field-input" onclick="teCalToggle()" style="text-align:left;cursor:pointer;background:#fff;display:flex;align-items:center;justify-content:space-between"><span'+(S._teStart?'':' style="color:var(--muted)"')+'>'+esc(teDatesLabel())+'</span>'+IC.cal+'</button>';
  }
  body+='</div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg">';
  body+='<button class="seg-btn'+(S._formStatus.tr==='active'?' on book':'')+'" onclick="pickStatus(\'tr\',\'active\')">Active</button>';
  body+='<button class="seg-btn'+(S._formStatus.tr==='planning'?' on':'')+'" onclick="pickStatus(\'tr\',\'planning\')">Planning</button>';
  body+='<button class="seg-btn'+(S._formStatus.tr==='archived'?' on':'')+'" onclick="pickStatus(\'tr\',\'archived\')">Archived</button></div>';
  body+='<div class="body-empty" style="text-align:left;padding:8px 2px 0;font-size:12px"><strong>Active</strong> is the trip you\'re currently focused on — it shows up first and drives the home screen. Only one trip is active at a time. <strong>Planning</strong> is an upcoming trip you\'re still building out. <strong>Archived</strong> is a past or cancelled trip, kept for reference but tucked out of the way.</div></div>';
  body+='<div class="field"><label class="field-label">Color</label><select class="field-select" id="tr-color">'+colorOptions(S._formColor)+'</select></div>';
  if(isAdmin()){
    body+='<div class="field"><label class="field-label">Planning Party <span class="opt">(members of this party will be on the trip)</span></label><div class="whoselect">';
    for(var gi=0;gi<PARTIES.length;gi++){var gg=PARTIES[gi],gon=(S._tpartyId===gg.id);
      body+='<div class="who-opt'+(gon?' on':'')+'" onclick="pickTripParty(\''+gg.id+'\')"><span class="wdot" style="background:'+(gg.color||'#6B4FA0')+'">'+esc((gg.name[0]||'').toUpperCase())+'</span>'+esc(gg.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';}
    body+='</div></div>';
  }
  var _memPid=S._tpartyId||S.partyId;
  var _memPpl=partyPeople(_memPid);
  body+='<div class="field"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><label class="field-label" style="margin:0">Trip Members</label>';
  if(isAdmin())body+='<button class="btn-secondary" style="margin:0;width:auto;padding:6px 12px;min-height:0;font-size:13px;flex-shrink:0" onclick="editTripMembers()">Edit members</button>';
  body+='</div>';
  body+='<div style="font-size:13px;color:var(--muted);margin:8px 0">All members of the selected planning party are on this trip.</div>';
  if(_memPpl.length){body+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:2px">';for(var _mi=0;_mi<_memPpl.length;_mi++){var _mp=_memPpl[_mi];body+='<span style="background:var(--cream);border-radius:99px;padding:3px 10px;font-size:13px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+_mp.color+';margin-right:5px;vertical-align:middle"></span>'+esc(_mp.name)+'</span>';}body+='</div>';}
  body+='</div>';
  body+='<div class="field"><label class="field-label">Notifications</label>';
  body+='<div class="notify-row'+(S._notify?' on':'')+'" onclick="notifToggle()"><span class="notify-check">'+(S._notify?IC.checkw:'')+'</span><div><div class="notify-lbl">Notify members of changes</div><div class="notify-sub">'+(t.status==='active'?'You\'ll choose who to tell about anyone added or removed.':'This trip is still planning — switch on to notify people you add or remove.')+'</div></div></div></div>';
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
    reconcileDays(t.id);save('dtp_days',DAYS);
    if(t.id===S.tripId){S.dayIdx=0;S.open=defOpen();}
  }
  t.status=S._formStatus.tr||t.status;
  var c=val('tr-color');if(c)t.color=c;
  var effectivePartyId=(isAdmin()&&S._tpartyId)?S._tpartyId:S.partyId;
  if(isAdmin()&&S._tpartyId){t.parties=[S._tpartyId];}
  var oldMem=(t.members||[]).slice();
  t.members=partyPeople(effectivePartyId).map(function(p){return p.id;});
  if(t.status==='active')for(var j=0;j<TRIPS.length;j++)if(TRIPS[j].id!==t.id&&TRIPS[j].status==='active')TRIPS[j].status='planning';
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
  [DAYS,VISITS,PARKHOURS,DINING,LLS,SHOWS,FLIGHTS,RESORTS,PARKRES,REBOOKS].forEach(drop);
  for(var c=CHAT.length-1;c>=0;c--)if(CHAT[c].trip===id)CHAT.splice(c,1);
  try{localStorage.removeItem('dtp_packing_'+id);localStorage.removeItem('dtp_todo_'+id);}catch(e){}
  if(S.tripId===id){
    /* deleting the trip you\'re viewing drops you to the no-trip landing — don\'t
       silently teleport into another trip; the user purposely picks the next one */
    S.tripId=null;S.dayIdx=0;S.open=defOpen();S.fmode='all';S.filter.clear();
  }
  ensureVisibleTrip();saveTripId();persist();toast('Trip deleted');closeScreen();render();
}

/* ============================================================
   MAIN RENDER
   ============================================================ */
/* no-trip landing — shown when nothing is selected (new persona, or just
   deleted the trip you were viewing). You leave it by picking/creating a trip. */
function renderNoTrip(){
  var has=hasVisibleTrip();
  var o='<div class="notrip"><div class="notrip-art">'+IC.map+'</div>';
  o+='<div class="notrip-title">'+(has?'No trip selected':'No trips yet')+'</div>';
  o+='<div class="notrip-sub">'+(has
    ? 'Pick the trip you want to view, or start planning a new one.'
    : 'You\'re not part of any trips yet. Plan one to get started.')+'</div>';
  if(has)
    o+='<button class="btn-primary" onclick="openSheet({type:\'trips\'})">Choose a trip</button>';
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
  document.getElementById('filter-host').innerHTML=(S.tab==='home')?renderFilter():'';
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
   CDN first), so window.CLOUD may not exist for the first few ticks. We must NOT
   guess in that window — falling through to the legacy persona chooser is what
   made the old "who are you?" screen flash before sign-in. So: if cloud is
   enabled, the auth callbacks (onCloudSynced/onCloudSignedOut) drive the screen
   and we only show the Sign-in gate until they fire; if cloud is explicitly
   disabled we use the local persona chooser; if window.CLOUD isn't set yet we
   wait and retry rather than rendering anything. */
var _bootTries=0;
function bootFrontDoor(){
  try{
    if(!window.CLOUD){if(_bootTries++<200)setTimeout(bootFrontDoor,30);return;}   /* cloud.js not ready — wait (capped) */
    if(window.CLOUD.enabled){
      if(window.CLOUD.user)return;                            /* signed in → auth callbacks route */
      if(!(S.screen&&(S.screen.type==='signin'||S.screen.type==='claim')))
        openScreen({type:'signin'});
    }else if(!localStorage.getItem('dtp_persona')){
      openScreen({type:'persona'});                           /* no firebase at all → local mode */
    }
  }catch(e){}
}
setTimeout(bootFrontDoor,0);
