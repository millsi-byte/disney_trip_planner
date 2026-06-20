/* ============================================================
   Disney Trip Planner — App
   Vanilla JS. Global handlers (matches the prototype's style).
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
  sparkles:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></svg>',
  warn:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  checkw:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  arr:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  pencil:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
  back:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  send:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  upload:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>'
};

/* ── State ─────────────────────────────────────────────────── */
var S = {
  tripId:"jul26",
  tab:"home",
  dayIdx:1,            // default to first real park day
  filter:new Set(),    // empty = All
  open:{},             // collapsible card state per key
  plan:"packing",      // packing | todo
  ov:"dining",         // overview sub-view
  persona:"scott",     // current persona (who am I)
  screen:null,         // slide-in screen def
  sheet:null,          // bottom sheet def
  importStep:1,
  newTmpl:"mine",
  formLegs:1
};
function defOpen(){return {flight:true,itin:true,ll:true,strat:false,din:true,shows:true};}
S.open = defOpen();

/* persistence */
function load(k,fb){try{var s=localStorage.getItem(k);if(s)return JSON.parse(s);}catch(e){}return fb;}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

/* schema guard — when the saved-data shape changes, bump this so old
   localStorage is cleared instead of breaking the app */
var DATA_VERSION='10';
var BUILD='20';   /* bumped each deploy — shown in Settings to spot stale caches */
var PALETTE=[['#2563EB','Blue'],['#DB2777','Pink'],['#16A34A','Green'],['#EA580C','Orange'],['#7C3AED','Purple'],['#0891B2','Teal'],['#CA8A04','Gold'],['#DC2626','Red'],['#4F46E5','Indigo'],['#0D9488','Emerald'],['#9333EA','Violet'],['#475569','Slate']];
try{
  if(localStorage.getItem('dtp_ver')!==DATA_VERSION){
    Object.keys(localStorage).forEach(function(k){if(k.indexOf('dtp_')===0)localStorage.removeItem(k);});
    localStorage.setItem('dtp_ver',DATA_VERSION);
  }
}catch(e){}

/* keep the seed lists so new trips can start from a template */
var PACKING_SEED=PACKING, TODO_SEED=TODO;

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
S.persona = load('dtp_persona', S.persona);

/* every planning item belongs to a trip — default seed items to jul26 */
function tagTrip(coll){for(var i=0;i<coll.length;i++)if(!coll[i].trip)coll[i].trip='jul26';}
[DAYS,VISITS,PARKHOURS,DINING,LLS,SHOWS,FLIGHTS,RESORTS,PARKRES,REBOOKS].forEach(tagTrip);
for(var _c=0;_c<CHAT.length;_c++)if(!CHAT[_c].trip)CHAT[_c].trip='jul26';

/* per-trip packing / to-do (PACKING/TODO hold the active trip's lists) */
function listKey(base){return 'dtp_'+base+'_'+S.tripId;}
function loadLists(){
  PACKING=load(listKey('packing'),null)||(S.tripId==='jul26'?PACKING_SEED:{});
  TODO=load(listKey('todo'),null)||(S.tripId==='jul26'?TODO_SEED:{});
  ensureLists();
}
function ensureLists(){tripMembers().forEach(function(id){if(!PACKING[id])PACKING[id]=[];if(!TODO[id])TODO[id]=[];});}
function saveLists(){save(listKey('packing'),PACKING);save(listKey('todo'),TODO);}

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
  save('dtp_parkres',PARKRES);save('dtp_rebooks',REBOOKS);save('dtp_trips',TRIPS);save('dtp_family',FAMILY);
}

/* ── Helpers ───────────────────────────────────────────────── */
function person(id){for(var i=0;i<FAMILY.length;i++)if(FAMILY[i].id===id)return FAMILY[i];return null;}
function trip(){for(var i=0;i<TRIPS.length;i++)if(TRIPS[i].id===S.tripId)return TRIPS[i];return TRIPS[0];}
/* personas assigned to the current trip (drives filters + who-select) */
function tripMembers(){var t=trip();return (t&&t.members&&t.members.length)?t.members.filter(function(id){return !!person(id);}):ALL_IDS.slice();}
function whoArr(who){return who==="all"?tripMembers():who;}
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function monOf(ds){return MON[parseInt(ds.slice(5,7),10)-1]||'';}
function tripDays(){return DAYS.filter(function(d){return d.trip===S.tripId;}).sort(function(a,b){return a.date<b.date?-1:a.date>b.date?1:0;});}
function day(){var ds=tripDays();return ds[S.dayIdx]||ds[0]||null;}
function dayByDate(ds){for(var i=0;i<DAYS.length;i++)if(DAYS[i].trip===S.tripId&&DAYS[i].date===ds)return DAYS[i];return null;}
function fmtDay(ds){var d=dayByDate(ds);return d?(monOf(ds)+" "+d.d+" · "+d.dl):ds;}
/* park visits — first-class items that drive each day's park */
function visitsFor(ds){return VISITS.filter(function(v){return v.trip===S.tripId&&v.day===ds;});}
function dayPrimaryPark(ds){var vs=visitsFor(ds).filter(function(v){return visible(v.who);});if(!vs.length)vs=visitsFor(ds);return vs.length?vs[0].park:null;}
function pkOf(ds){var p=dayPrimaryPark(ds);return (p&&PARKS[p])?PARKS[p]:PARKS.trv;}
/* park hours (a park-on-a-date fact: open/close/early/late + crowd) */
function parkHoursFor(ds){return PARKHOURS.filter(function(h){return h.trip===S.tripId&&h.day===ds;});}
function hoursFor(park,ds){var l=parkHoursFor(ds);for(var i=0;i<l.length;i++)if(l[i].park===park)return l[i];return null;}
var TIMING={morning:'Morning',day:'Day',evening:'Evening',late:'Late'};
function timingLbl(t){return TIMING[t]||'Day';}

/* person-filter visibility */
function visible(who){
  if(S.filter.size===0) return true;       // All
  if(who==="all") return true;             // everyone-items always show
  for(var i=0;i<who.length;i++) if(S.filter.has(who[i])) return true;
  return false;
}
function esc(s){return (s==null?"":String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

/* who display */
function whoChips(who){
  if(who==="all") return '<span class="who-all">'+IC.check.replace('#16a34a','#6B7280')+' Everyone</span>';
  var h='<div class="who-chips">';
  for(var i=0;i<who.length;i++){var p=person(who[i]);if(!p)continue;
    h+='<span class="who-chip"><span class="wdot" style="background:'+p.color+'">'+p.name[0]+'</span>'+esc(p.name)+'</span>';}
  return h+'</div>';
}
function whoStack(who){
  var ids=who==="all"?ALL_IDS:who;
  if(who==="all") return '<span class="who-all">Everyone</span>';
  var h='<div class="who-stack">';
  for(var i=0;i<ids.length;i++){var p=person(ids[i]);if(!p)continue;
    h+='<span class="wdot" style="background:'+p.color+'" title="'+esc(p.name)+'">'+p.name[0]+'</span>';}
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
function setOv(v){S.ov=v;render();}
function toast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('in');clearTimeout(window._tt);window._tt=setTimeout(function(){t.classList.remove('in');},1900);}
/* unregister the service worker + drop caches, then reload — escapes a stale cache */
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

function toggleFilter(id){
  if(id==="all"){S.filter.clear();}
  else{if(S.filter.has(id))S.filter.delete(id);else S.filter.add(id);}
  if(S.screen&&S.screen.type==='lists')refreshLists(); else render();
}

/* sheets */
function openSheet(def){S.sheet=def;renderOverlay();requestAnimationFrame(function(){var b=document.getElementById('sheet-host').firstChild;if(b)b.classList.add('in');});}
function closeSheet(){var host=document.getElementById('sheet-host');var b=host&&host.firstChild;if(b){b.classList.remove('in');setTimeout(function(){S.sheet=null;renderOverlay();},240);}else{S.sheet=null;renderOverlay();}}
function switchTrip(id){saveLists();S.tripId=id;loadLists();S.dayIdx=0;S.tab="home";S.open=defOpen();S.filter.clear();closeSheet();toast("Switched to "+trip().name);render();}

/* screens (slide-in) */
function openScreen(def){
  S.screen=def;S._who=null;S._formStatus={};S._delpk=null;S._deltd=null;
  S._formLoc=null;S._formTier=null;S._formInit=null;S._members=null;S._formColor=null;
  if(def.type==='addflight'){S.formLegs=def.edit?((FLIGHTS.filter(function(f){return f.id===def.edit;})[0]||{legs:[0]}).legs.length):1;}
  else{S.formLegs=1;}
  renderOverlay();requestAnimationFrame(function(){var s=document.getElementById('screen-host').firstChild;if(s)s.classList.add('in');});
}
function closeScreen(){var host=document.getElementById('screen-host');var s=host&&host.firstChild;if(s){s.classList.remove('in');setTimeout(function(){S.screen=null;renderOverlay();},260);}else{S.screen=null;renderOverlay();}}

/* persona */
function setPersona(id){S.persona=id;save('dtp_persona',id);toast("You are "+person(id).name);render();closeScreen();}

/* packing / todo */
function pkPersons(){var mem=tripMembers();if(S.filter.size===0)return mem.slice();return mem.filter(function(id){return S.filter.has(id);});}
function refreshLists(){
  var b=document.getElementById('lists-body');
  if(b&&S.screen&&S.screen.type==='lists'){b.innerHTML=listScreenBody(S.screen.which);}
  else render();
}
function savePK(){saveLists();}
function saveTD(){saveLists();}
function pkChk(pid,c,i){PACKING[pid][c].items[i].done=!PACKING[pid][c].items[i].done;savePK();refreshLists();}
function pkInc(pid,c,i){PACKING[pid][c].items[i].qty++;savePK();refreshLists();}
function pkDec(pid,c,i){var it=PACKING[pid][c].items[i];if(it.qty>0)it.qty--;savePK();refreshLists();}
function pkDel(pid,c,i){var k='d_'+pid+'_'+c+'_'+i;if(S._delpk===k){PACKING[pid][c].items.splice(i,1);S._delpk=null;savePK();}else{S._delpk=k;}refreshLists();}
var ADD={};
function pkAdd(pid,c){ADD.pk=pid+'_'+c;refreshLists();setTimeout(function(){var e=document.getElementById('pk-inp');if(e)e.focus();},40);}
function pkOk(pid,c){var e=document.getElementById('pk-inp');if(!e||!e.value.trim())return;var it={n:e.value.trim(),qty:1,l:false,done:false};if(pid!==S.persona)it.by=S.persona;PACKING[pid][c].items.push(it);ADD.pk=null;savePK();refreshLists();}
function pkCancel(){ADD.pk=null;refreshLists();}
function tdChk(pid,i){var t=TODO[pid][i];if(!t.na){t.done=!t.done;saveTD();refreshLists();}}
function tdNa(pid,i){var t=TODO[pid][i];t.na=!t.na;if(t.na)t.done=false;saveTD();refreshLists();}
function tdDel(pid,i){var k='td_'+pid+'_'+i;if(S._deltd===k){TODO[pid].splice(i,1);S._deltd=null;saveTD();}else{S._deltd=k;}refreshLists();}
function tdAdd(pid){ADD.td=pid;refreshLists();setTimeout(function(){var e=document.getElementById('td-inp');if(e)e.focus();},40);}
function tdOk(pid){var e=document.getElementById('td-inp');if(!e||!e.value.trim())return;TODO[pid].push({n:e.value.trim(),when:'',done:false,na:false});ADD.td=null;saveTD();refreshLists();}
function tdCancel(){ADD.td=null;refreshLists();}

/* ============================================================
   HEADER + STRIP + FILTER
   ============================================================ */
function renderHeader(){
  var t=trip();
  var me=person(S.persona)||FAMILY[0];
  var h='<header class="hdr">';
  h+='<button class="hdr-trip left" onclick="openSheet({type:\'trips\'})">';
  h+='<div class="hdr-trip-name">'+esc(t.name)+' '+IC.chevd+'</div>';
  h+='<div class="hdr-trip-sub">'+esc(t.dates)+'</div></button>';
  h+='<button class="hdr-iam" onclick="openScreen({type:\'persona\'})">';
  h+='<span class="iam-lbl">I am</span>';
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
  var h='<div class="pfilter-wrap"><div class="pfilter">';
  h+='<span class="pfilter-lbl">Filter by:</span>';
  h+='<div class="ppill all'+(S.filter.size===0?' on':'')+'" onclick="toggleFilter(\'all\')">All</div>';
  var mem=tripMembers();
  for(var i=0;i<mem.length;i++){var p=person(mem[i]);if(!p)continue;var on=S.filter.has(p.id);
    h+='<div class="ppill'+(on?' on':'')+'" onclick="toggleFilter(\''+p.id+'\')">'
      +'<span class="pdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'</div>';
  }
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
/* badges derived from the day's items (+ any custom one-off tags) */
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
      o+='<div class="body-empty">No flights for this day'+(S.filter.size?' for the selected people':'')+'.</div>';
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
      if(e.who&&e.who!=='all') o+=whoStack(e.who);
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
      o+='<div class="roll-row"><span class="roll-arr">'+IC.arr+'</span><span style="flex:1">'+esc(rebookText(rb))+(rb.who!=='all'?' '+whoStack(rb.who):'')+'</span>'
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
    if(!din.length) o+='<div class="body-empty">No dining'+(S.filter.size?' for the selected people':'')+' on this day.</div>';
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
  if(dn.who!=='all') o+=whoChips(dn.who);
  o+='</div>';
  o+='<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">';
  o+=statusBadge(dn.status);
  o+=(dn.loc==='in'&&dn.park)?'<span class="inpark-badge" style="background:'+PARKS[dn.park].color+'">In-Park</span>':'<span class="nonpark-badge">Non-Park</span>';
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
    if(!sh.length) o+='<div class="body-empty">No shows'+(S.filter.size?' for the selected people':'')+' on this day.</div>';
    for(var i=0;i<sh.length;i++){var x=sh[i];
      o+='<div class="show-row"><div style="flex:1"><div class="show-name">'+esc(x.name)+'</div><div style="display:flex;align-items:center;gap:6px;margin-top:4px">'+statusBadge(x.status||'attend')+(x.who!=='all'?whoChips(x.who):'')+'</div></div><div class="show-time">'+esc(x.time)+'</div>';
      o+='<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;flex-shrink:0;margin-left:8px" onclick="openScreen({type:\'showedit\',edit:\''+x.id+'\',day:\''+x.day+'\'})">'+IC.pencil+'</button></div>';
    }
    o+='<button class="add-link" onclick="openScreen({type:\'showedit\',day:\''+date+'\'})">'+IC.plus+' Add show</button>';
    o+='</div>';
  }
  return o+'</div>';
}

/* ============================================================
   PLAN HUB
   ============================================================ */
function renderPlanHub(){
  var o='<div class="pg-title">Plan</div><div class="pg-sub">Build out every part of '+esc(trip().name)+'.</div>';
  var tid=S.tripId;
  function cnt(coll){var n=0;for(var i=0;i<coll.length;i++)if(coll[i].trip===tid)n++;return n;}
  var nMem=tripMembers().length;
  var rows=[
    ['Flights',IC.plane,'var(--hd-flight)',cnt(FLIGHTS)+' journeys','addflight'],
    ['Dining',IC.fork,'var(--hd-din)',cnt(DINING)+' reservations','dining'],
    ['Lightning Lanes',IC.bolt,'var(--hd-ll)',cnt(LLS)+' rides','ll'],
    ['Resort',IC.bed,'var(--hd-resort)',cnt(RESORTS)+' stays','resort'],
    ['Park Reservations',IC.ticket,'#0F5F73',cnt(PARKRES)+' reservations','parkres'],
    ['Park Visits',IC.map,'#3B7549',cnt(VISITS)+' visits','visits'],
    ['Park Hours',IC.bolt,'#0F5F73',cnt(PARKHOURS)+' set','hours']
  ];
  o+='<div class="hub-section-label">Trip components</div>';
  for(var i=0;i<rows.length;i++) o+=hubRow(rows[i]);
  o+='<div class="hub-section-label">Per-person lists</div>';
  o+=hubRow(['Packing',IC.suitcase,'#92400E',nMem+' lists','packing']);
  o+=hubRow(['To Do',IC.checks,'#166534',nMem+' lists','todo']);
  o+='<div class="hub-section-label">Get started fast</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'import\'})"><div class="hub-icon" style="background:#1E40AF">'+IC.sparkles+'</div>'
    +'<div class="hub-main"><div class="hub-title">AI Import</div><div class="hub-sub">Pull details from emails, PDFs & spreadsheets</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<div class="hub-section-label">Trip & settings</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'tripedit\'})"><div class="hub-icon" style="background:#6B4FA0">'+IC.pencil+'</div>'
    +'<div class="hub-main"><div class="hub-title">Edit trip name & dates</div><div class="hub-sub">'+esc(trip().dates)+'</div></div><div class="chev">'+IC.chev+'</div></button>';
  o+='<button class="hub-row" onclick="openScreen({type:\'settings\'})"><div class="hub-icon" style="background:#1C3A5E">'+IC.gear+'</div>'
    +'<div class="hub-main"><div class="hub-title">Settings</div><div class="hub-sub">Personas & templates</div></div><div class="chev">'+IC.chev+'</div></button>';
  return o;
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
  if(section==='packing'||section==='todo'){openScreen({type:'lists',which:section});return;}
  if(section==='templates'){openScreen({type:'templates'});return;}
  if(section==='personas'){openScreen({type:'personas'});return;}
  openScreen({type:'section',section:section});
}

/* ============================================================
   OVERVIEW
   ============================================================ */
function renderOverview(){
  var o='<div class="pg-title">Overview</div><div class="pg-sub">Everything across the trip, in day order.</div>';
  var views=[['dining','All Dining'],['parkres','Park Reservations'],['resort','Resort'],['ll','Lightning Lanes'],['flights','Flights']];
  o+='<div class="ov-toggle"><div class="seg">';
  for(var i=0;i<views.length;i++) o+='<button class="seg-btn'+(S.ov===views[i][0]?' on':'')+'" onclick="setOv(\''+views[i][0]+'\')">'+views[i][1]+'</button>';
  o+='</div></div>';
  if(S.ov==='dining') o+=ovDining();
  else if(S.ov==='parkres') o+=ovParkRes();
  else if(S.ov==='resort') o+=ovResort();
  else if(S.ov==='ll') o+=ovLL();
  else o+=ovFlights();
  return o;
}
function dayHd(date){
  var d=dayByDate(date),pk=pkOf(date);
  return '<div class="day-hd" style="background:'+pk.color+'"><div class="day-hd-name">'+pk.name+'</div><div class="day-hd-date">'+monOf(date)+' '+(d?d.d:(+date.slice(8)))+(d?' · '+d.dl:'')+'</div></div>';
}
function ovDining(){
  var o='',any=false,TD=tripDays();
  for(var i=0;i<TD.length;i++){
    var din=diningFor(TD[i].date).filter(function(x){return visible(x.who);});
    if(!din.length)continue;any=true;
    o+=dayHd(TD[i].date);
    for(var j=0;j<din.length;j++){o+='<div class="ov-card'+(isPlanningStatus(din[j].status)?' planning':'')+'">'+diningRow(din[j])+'</div>';}
  }
  return any?o:'<div class="body-empty">No dining for the selected people.</div>';
}
function ovParkRes(){
  var o='',any=false,TD=tripDays();
  for(var i=0;i<TD.length;i++){
    var prl=parkResFor(TD[i].date).filter(function(p){return visible(p.who);});
    if(!prl.length)continue;any=true;
    o+=dayHd(TD[i].date);
    o+='<div class="ov-card">';
    for(var j=0;j<prl.length;j++){var pr=prl[j],ppk=PARKS[pr.park];
      o+='<div class="din-row"><span style="width:12px;height:12px;border-radius:50%;background:'+(ppk?ppk.color:'#999')+';flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name" style="color:'+(ppk?ppk.color:'#333')+'">'+(ppk?esc(ppk.name):esc(pr.park))+'</div>'+(pr.who!=='all'?whoChips(pr.who):'')+'</div>'+statusBadge(pr.status)+'</div>';
    }
    o+='</div>';
  }
  return any?o:'<div class="body-empty">No park reservations'+(S.filter.size?' for the selected people':'')+'. These days are Park Hopper.</div>';
}
function ovResort(){
  var rs=RESORTS.filter(function(r){return r.trip===S.tripId&&visible(r.who);});
  if(!rs.length)return '<div class="body-empty">No resort stays'+(S.filter.size?' for the selected people':'')+' yet.</div>';
  rs.sort(function(a,b){return a.checkin<b.checkin?-1:1;});
  var o='<div class="ov-card"><div class="timeline">';
  for(var i=0;i<rs.length;i++){var r=rs[i];
    var nights=Math.max(0,Math.round((Date.parse(r.checkout)-Date.parse(r.checkin))/86400000));
    o+='<div class="tl-stay"><div class="tl-bar" style="background:'+PALETTE[i%PALETTE.length][0]+'"></div>';
    o+='<div style="flex:1"><div style="display:flex;justify-content:space-between;gap:8px"><div class="resort-name" style="font-size:17px">'+esc(r.name)+'</div>'+statusBadge(r.status)+'</div>';
    o+='<div class="resort-room">'+esc(r.room)+'</div>';
    o+='<div style="font-size:14px;color:var(--ink);font-weight:600;margin-top:6px">'+monOf(r.checkin)+' '+(+r.checkin.slice(8))+' → '+monOf(r.checkout)+' '+(+r.checkout.slice(8))+' · '+nights+' night'+(nights===1?'':'s')+'</div>';
    o+='<div class="resort-conf">#'+esc(r.conf)+'</div></div></div>';
  }
  o+='</div></div>';
  return o;
}
function ovLL(){
  var o='',TD=tripDays();
  for(var i=0;i<TD.length;i++){
    var lls=llFor(TD[i].date).filter(function(x){return visible(x.who);});
    if(!lls.length)continue;
    o+=dayHd(TD[i].date);
    o+='<div class="ov-card">';
    o+='<div class="ll-bookdate">'+IC.bolt+' Book '+esc(lls[0].bookDate)+'</div>';
    for(var j=0;j<lls.length;j++){var l=lls[j];
      o+='<div class="ll-row"><div class="ll-top"><div class="ll-ride">'+esc(l.ride)+' <span class="ll-tag '+tagCls(l.tier)+'">'+tagShort(l.tier)+'</span></div>'+statusBadge(l.status)+'</div>';
      o+='<div class="ll-win'+(l.status==='booked'?' booked':'')+'">'+(l.status==='booked'?(IC.check+' '+esc(l.bookedTime)):('Window: '+esc(l.window)))+'</div>'+whoStack(l.who)+'</div>';
    }
    o+='</div>';
  }
  return o||'<div class="body-empty">No Lightning Lanes for the selected people.</div>';
}
function ovFlights(){
  var o='',any=false,TD=tripDays();
  for(var i=0;i<TD.length;i++){
    var flts=flightsFor(TD[i].date).filter(function(x){return visible(x.who);});
    if(!flts.length)continue;any=true;
    o+=dayHd(TD[i].date);
    for(var j=0;j<flts.length;j++) o+='<div class="ov-card'+(isPlanningStatus(flts[j].status)?' planning':'')+'">'+flightJourney(flts[j],dayByDate(TD[i].date))+'</div>';
  }
  return any?o:'<div class="body-empty">No flights for the selected people.</div>';
}

/* ============================================================
   CHAT
   ============================================================ */
function renderChat(){
  var me=S.persona;
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
  CHAT.push({from:S.persona,text:e.value.trim(),time:'Now',trip:S.tripId});render();
  setTimeout(function(){var w=document.getElementById('chatwrap');if(w)window.scrollTo(0,document.body.scrollHeight);},30);
}

/* ============================================================
   PACKING / TO DO  (per-person, person-filter aware)
   ============================================================ */
function renderLists(which){
  var persons=pkPersons();
  var o='';
  if(which==='packing'){
    var totDone=0,tot=0;
    persons.forEach(function(pid){(PACKING[pid]||[]).forEach(function(c){c.items.forEach(function(it){tot++;if(it.done)totDone++;});});});
    o+=listSticky('packing',totDone,tot);
    persons.forEach(function(pid){o+=packingPerson(pid);});
  }else{
    var td=0,tt=0;
    persons.forEach(function(pid){(TODO[pid]||[]).forEach(function(t){if(!t.na){tt++;if(t.done)td++;}});});
    o+=listSticky('todo',td,tt);
    persons.forEach(function(pid){o+=todoPerson(pid);});
  }
  return o;
}
function listSticky(which,done,total){
  var pct=total?Math.round(done/total*100):0;
  var o='<div class="plan-sticky">';
  o+='<div class="seg"><button class="seg-btn'+(which==='packing'?' on':'')+'" onclick="openScreen({type:\'lists\',which:\'packing\'})">Packing</button>';
  o+='<button class="seg-btn'+(which==='todo'?' on':'')+'" onclick="openScreen({type:\'lists\',which:\'todo\'})">To Do</button></div>';
  o+='<div class="prog-label">'+done+' of '+total+(which==='packing'?' packed':' done')+'</div>';
  o+='<div class="prog-outer"><div class="prog-inner" style="width:'+pct+'%"></div></div>';
  o+='<div class="prog-actions"><button class="prog-btn blu" onclick="toast(\'Saved to your master template\')">Save as Template</button>';
  o+='<button class="prog-btn" onclick="toast(\'Reset from template\')">Reset</button></div></div>';
  return o;
}
function pbHead(pid,done,total){var p=person(pid);
  return '<div class="person-block-hd"><span class="pbdot" style="background:'+p.color+'">'+p.name[0]+'</span><span class="pbname">'+esc(p.name)+(pid===S.persona?' (you)':'')+'</span><span class="pbcount">'+done+'/'+total+'</span></div>';
}
function packingPerson(pid){
  var cats=PACKING[pid]||(PACKING[pid]=[]),done=0,tot=0;
  cats.forEach(function(c){c.items.forEach(function(it){tot++;if(it.done)done++;});});
  var o=pbHead(pid,done,tot);
  for(var c=0;c<cats.length;c++){var cat=cats[c],cd=cat.items.filter(function(x){return x.done;}).length;
    o+='<div class="card"><div class="cat-hdr"><div class="cat-name">'+esc(cat.cat)+'</div><div class="cat-count">'+cd+'/'+cat.items.length+'</div></div>';
    for(var j=0;j<cat.items.length;j++){var it=cat.items[j],pend=S._delpk==='d_'+pid+'_'+c+'_'+j;
      o+='<div class="pk-row">';
      o+='<div class="chkbox'+(it.done?' on':'')+'" onclick="pkChk(\''+pid+'\','+c+','+j+')">'+(it.done?IC.checkw:'')+'</div>';
      o+='<div class="pk-name'+(it.done?' done':'')+'" onclick="pkChk(\''+pid+'\','+c+','+j+')">'+esc(it.n)+(it.by?'<div class="pk-by">Added by '+esc(person(it.by).name)+'</div>':'')+'</div>';
      if(it.l) o+='<span class="lkr-tag">Locker</span>';
      else o+='<div class="qty-wrap"><button class="qty-btn" onclick="pkDec(\''+pid+'\','+c+','+j+')">&#8722;</button><span class="qty-num">'+it.qty+'</span><button class="qty-btn" onclick="pkInc(\''+pid+'\','+c+','+j+')">+</button></div>';
      o+=pend?'<button class="del-confirm-btn" onclick="pkDel(\''+pid+'\','+c+','+j+')">Remove?</button>':'<button class="del-btn" onclick="pkDel(\''+pid+'\','+c+','+j+')">&times;</button>';
      o+='</div>';
    }
    if(ADD.pk===pid+'_'+c){
      o+='<div class="add-row"><input id="pk-inp" class="add-inp" placeholder="Item name…" onkeydown="if(event.key===\'Enter\')pkOk(\''+pid+'\','+c+');if(event.key===\'Escape\')pkCancel()">';
      o+='<button class="add-ok" onclick="pkOk(\''+pid+'\','+c+')">Add</button><button class="add-cancel" onclick="pkCancel()">&times;</button></div>';
    }else o+='<button class="add-link" onclick="pkAdd(\''+pid+'\','+c+')">'+IC.plus+' Add item</button>';
    o+='</div>';
  }
  return o;
}
function todoPerson(pid){
  var list=TODO[pid]||(TODO[pid]=[]),done=list.filter(function(t){return t.done;}).length,tot=list.filter(function(t){return !t.na;}).length;
  var o=pbHead(pid,done,tot)+'<div class="card">';
  for(var j=0;j<list.length;j++){var t=list[j],pend=S._deltd==='td_'+pid+'_'+j;
    o+='<div class="pk-row">';
    o+='<div class="chkbox'+(t.done||t.na?' on':'')+'" onclick="tdChk(\''+pid+'\','+j+')" style="cursor:'+(t.na?'default':'pointer')+';'+(t.na?'background:#E5E7EB;border-color:#E5E7EB':'')+'">'+(t.done?IC.checkw:t.na?'<span style="color:#9CA3AF;font-weight:700">–</span>':'')+'</div>';
    o+='<div class="pk-name'+(t.done?' done':'')+'" onclick="tdChk(\''+pid+'\','+j+')" style="cursor:'+(t.na?'default':'pointer')+';opacity:'+(t.na?'.45':'1')+'">'+esc(t.n)+'</div>';
    if(t.when) o+='<div class="td-when">'+esc(t.when)+'</div>';
    o+='<button class="na-btn'+(t.na?' active':'')+'" onclick="tdNa(\''+pid+'\','+j+')">N/A</button>';
    o+=pend?'<button class="del-confirm-btn" onclick="tdDel(\''+pid+'\','+j+')">Remove?</button>':'<button class="del-btn" onclick="tdDel(\''+pid+'\','+j+')">&times;</button>';
    o+='</div>';
  }
  if(ADD.td===pid){
    o+='<div class="add-row"><input id="td-inp" class="add-inp" placeholder="Task name…" onkeydown="if(event.key===\'Enter\')tdOk(\''+pid+'\');if(event.key===\'Escape\')tdCancel()">';
    o+='<button class="add-ok" onclick="tdOk(\''+pid+'\')">Add</button><button class="add-cancel" onclick="tdCancel()">&times;</button></div>';
  }else o+='<button class="add-link" onclick="tdAdd(\''+pid+'\')">'+IC.plus+' Add task</button>';
  return o+'</div>';
}

/* ============================================================
   NAV
   ============================================================ */
function renderNav(){
  var tabs=[['home',IC.home,'Agenda'],['overview',IC.grid,'Overview'],['plan',IC.plan,'Plan'],['chat',IC.chat,'Chat']];
  var h='';
  for(var i=0;i<tabs.length;i++){var on=S.tab===tabs[i][0];
    var badge=tabs[i][0]==='chat'?'<span class="nbadge">2</span>':'';
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

/* trip switcher */
function renderSheet(){
  if(S.sheet.type!=='trips')return '';
  var groups=[['active','Active'],['planning','Planning'],['archived','Archived']];
  var h='<div class="sheet-backdrop" onclick="if(event.target===this)closeSheet()"><div class="sheet">';
  h+='<div class="sheet-grip"></div><div class="sheet-title">Your Trips</div>';
  for(var g=0;g<groups.length;g++){
    var list=TRIPS.filter(function(t){return t.status===groups[g][0];});
    if(!list.length)continue;
    h+='<div class="sheet-seclabel">'+groups[g][1]+'</div>';
    for(var i=0;i<list.length;i++){var t=list[i],on=t.id===S.tripId;
      var mc=(t.members?t.members.length:0);
      h+='<div class="trip-row'+(on?' on':'')+'" onclick="switchTrip(\''+t.id+'\')">';
      h+='<div class="trip-bar" style="background:'+t.color+'"></div>';
      h+='<div class="trip-main"><div class="trip-name'+(t.status==='archived'?' archived':'')+'">'+esc(t.name)+'</div>';
      h+='<div class="trip-sub">'+esc(t.dates)+' · '+mc+' '+(mc===1?'person':'people')+'</div></div>';
      h+='<button class="hdr-icon" style="width:34px;height:34px;background:#F3F1EC;color:#6B7280;flex-shrink:0" onclick="event.stopPropagation();closeSheet();openScreen({type:\'tripedit\',tripId:\''+t.id+'\'})">'+IC.pencil+'</button>';
      h+='<span class="trip-status ts-'+t.status+'">'+(on?'Current':t.status)+'</span></div>';
    }
  }
  h+='<button class="sheet-new" onclick="closeSheet();openScreen({type:\'newtrip\'})">'+IC.plus+' New trip</button>';
  h+='</div></div>';
  return h;
}

/* slide-in screen router */
function renderScreen(){
  var t=S.screen.type;
  if(t==='addflight') return scrAddFlight();
  if(t==='adddining') return scrAddDining();
  if(t==='llbook')    return scrLLBook();
  if(t==='addll')     return scrAddLL();
  if(t==='import')    return scrImport();
  if(t==='newtrip')   return scrNewTrip();
  if(t==='settings')  return scrSettings();
  if(t==='persona')   return scrPersona();
  if(t==='personas')  return scrPersonas();
  if(t==='templates') return scrTemplates();
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
  if(t==='section')   return scrSection();
  return scrGeneric();
}
function screenShell(title,bodyHtml,saveLabel,saveAction,cancelLabel){
  var h='<div class="screen"><div class="screen-hd">';
  h+='<button class="sh-btn" onclick="closeScreen()">'+(cancelLabel||'Cancel')+'</button>';
  h+='<div class="sh-title">'+esc(title)+'</div>';
  h+=saveAction?('<button class="sh-btn right save" onclick="'+saveAction+'">'+(saveLabel||'Save')+'</button>'):'<div style="min-width:60px"></div>';
  h+='</div><div class="screen-body">'+bodyHtml+'</div></div>';
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
function renderScreen_inplace(){var host=document.getElementById('screen-host');host.innerHTML=renderScreen();var s=host.firstChild;if(s)s.classList.add('in');}

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
function renderScreen_inplace2(){if(!S.screen){render();return;}var host=document.getElementById('screen-host');host.innerHTML=renderScreen();var s=host.firstChild;if(s)s.classList.add('in');}
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
  var rec=edit||{id:'f'+Date.now(),trip:S.tripId};
  rec.label=val('ff-label')||'Flight';rec.day=dy;rec.who=whoVal();
  rec.status=S._formStatus.ff||'planning';rec.legs=legs;
  if(!edit)FLIGHTS.push(rec);
  save('dtp_flights',FLIGHTS);S._who=null;toast('Flight saved');closeScreen();render();
}
function delFlight(id){
  for(var i=0;i<FLIGHTS.length;i++)if(FLIGHTS[i].id===id){FLIGHTS.splice(i,1);break;}
  save('dtp_flights',FLIGHTS);toast('Flight removed');closeScreen();render();
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
  body+=whoSelectField(pre);
  body+='<div class="field"><label class="field-label">Appears on day</label><select class="field-select" id="dd-day">'+dayOptions((edit&&edit.day)||S.screen.day||'2026-07-15')+'</select></div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delDining(\''+edit.id+'\')">Delete this reservation</button>';
  return screenShell(edit?'Edit Dining':'Add Dining',body,'Save','saveDining()');
}
function saveDining(){
  var edit=S.screen.edit?DINING.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var nm=val('dd-name');
  if(!nm){toast('Add a restaurant name');return;}
  var dy=val('dd-day')||S.screen.day||'2026-07-15';
  var rec=edit||{id:'d'+Date.now(),trip:S.tripId};
  rec.day=dy;rec.meal=val('dd-meal')||'Dinner';rec.name=nm;rec.time=val('dd-time')||'TBD';
  rec.loc=S._formLoc||'in';rec.park=(S._formLoc==='in')?dayPrimaryPark(dy):null;
  rec.status=S._formStatus.dd||'want';rec.conf=val('dd-conf')||'';rec.who=whoVal();
  if(!edit)DINING.push(rec);
  save('dtp_dining',DINING);S._who=null;toast('Dining saved');closeScreen();render();
}
function delDining(id){
  for(var i=0;i<DINING.length;i++)if(DINING[i].id===id){DINING.splice(i,1);break;}
  save('dtp_dining',DINING);toast('Reservation removed');closeScreen();render();
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
  body+='<div class="body-empty" style="text-align:left;padding:4px 2px 0">Marking this booked switches it from a dashed planning card to a solid confirmed one across the Agenda and Overview.</div>';
  return screenShell('Update Lightning Lane',body,'Save','saveLLBook()');
}
function saveLLBook(){
  var l=LLS.filter(function(x){return x.id===S.screen.id;})[0];
  var tm=document.getElementById('llb-time'),cf=document.getElementById('llb-conf');
  l.status='booked';
  l.bookedTime=(tm&&tm.value.trim())||l.window.replace(/[~]/g,'').split('–')[0].trim();
  l.conf=(cf&&cf.value.trim())||'MP-'+Math.floor(10000+Math.random()*89999);
  if(S._who)l.who=whoVal();
  save('dtp_lls',LLS);S._who=null;toast(l.ride+' booked');closeScreen();render();
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
  var rec=edit||{id:'ll'+Date.now(),trip:S.tripId,bookedTime:'',conf:'',bookDate:''};
  rec.day=dy;rec.park=dayPrimaryPark(dy);rec.ride=ride;
  rec.tier=S._formTier||'sp';rec.window=val('ll-window')||'~TBD';rec.who=whoVal();
  rec.status=S._formStatus.ll||'planning';
  if(rec.status==='booked'){
    rec.bookedTime=val('ll-btime')||(rec.window?rec.window.replace(/[~]/g,'').split('–')[0].trim():'');
    rec.conf=val('ll-conf')||rec.conf||'MP-'+Math.floor(10000+Math.random()*89999);
  }
  if(!rec.bookDate)rec.bookDate=monOf(dy)+' '+(+dy.slice(8))+' @ 7:00 AM';
  if(!edit)LLS.push(rec);
  save('dtp_lls',LLS);S._who=null;toast('Ride saved');closeScreen();render();
}
function delLL(id){
  for(var i=0;i<LLS.length;i++)if(LLS[i].id===id){LLS.splice(i,1);break;}
  save('dtp_lls',LLS);toast('Ride removed');closeScreen();render();
}

/* AI Import */
function scrImport(){
  var step=S.importStep;
  var body='';
  if(step===1){
    body+='<div class="import-drop"><div class="id-ic">'+IC.upload+'</div><div class="id-title">Import trip details</div>';
    body+='<div class="id-sub">Drop a file or tap to upload. We\'ll read it and pull out flights, dining, resort and more.</div>';
    body+='<div class="import-accept"><span>Email screenshots</span><span>.xlsx / .csv</span><span>PDF confirmations</span><span>Photos</span></div></div>';
    body+='<button class="btn-primary" onclick="S.importStep=2;renderScreen_inplace2()">Upload sample files</button>';
    body+='<button class="btn-secondary" onclick="closeScreen()">Cancel</button>';
    return screenShell('AI Import',body,null,null,'Close');
  }
  if(step===2){
    body+='<div class="body-empty" style="text-align:left;padding:0 2px 12px;font-size:16px;color:var(--ink)"><strong>Here\'s what I found.</strong> Confirm, edit, or remove each item before saving.</div>';
    body+=reviewItem('ok','Resort','Disney\'s BoardWalk Villas · 1-Bedroom Villa');
    body+=reviewItem('ok','Dates','Check-in Jul 14 · Check-out Jul 19');
    body+=reviewItem('ok','Confirmation','#619078381899');
    body+=reviewItem('ok','Flight','SW 4657 · BOS → MCO · Jul 14 · 5:45 AM → 11:50 AM');
    body+=reviewItem('q','Dining','"Brown Derby"',' — did you mean The Hollywood Brown Derby?');
    body+=reviewItem('x','File','attachment.pdf',' — couldn\'t read this one');
    body+='<button class="btn-primary" onclick="S.importStep=3;renderScreen_inplace2()">Add 5 items</button>';
    return screenShell('Review Import',body,null,null,'Back');
  }
  body+='<div style="text-align:center;padding:30px 10px"><div class="id-ic" style="margin:0 auto 14px;background:#DCFCE7;color:#15803D;width:64px;height:64px">'+IC.checks+'</div>';
  body+='<div class="pg-title" style="text-align:center">Saved</div><div class="pg-sub" style="text-align:center">5 items added to '+esc(trip().name)+'.</div></div>';
  body+=reviewItem('ok','Added','Resort, dates, confirmation, 1 flight & 1 dining');
  body+='<button class="btn-primary" onclick="closeScreen();toast(\'Imported into trip\')">Done</button>';
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

/* New Trip */
function scrNewTrip(){
  var body='';
  body+='<div class="field"><label class="field-label">Trip name</label><input class="field-input" id="nt-name" placeholder="e.g. Thanksgiving 2026"></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Start date</label><input class="field-input" type="date" id="nt-start"></div>';
  body+='<div class="field"><label class="field-label">End date</label><input class="field-input" type="date" id="nt-end"></div></div>';
  body+=memberSelectField(ALL_IDS);
  body+='<div class="hub-section-label" style="margin-left:0">Start from your template?</div>';
  body+=tmplCard('mine','My template','Each person\'s packing & to-do pre-loaded',true);
  body+=tmplCard('blank','Blank trip','Start completely fresh',false);
  body+='<button class="btn-primary" onclick="createTrip()">Create trip</button>';
  body+='<button class="btn-secondary" onclick="closeScreen();openScreen({type:\'import\'})">Import details from a file instead</button>';
  return screenShell('New Trip',body,null,null,'Cancel');
}
function tmplCard(id,title,sub,people){
  var on=S.newTmpl===id;
  var h='<div class="tmpl-card'+(on?' on':'')+'" onclick="S.newTmpl=\''+id+'\';renderScreen_inplace2()"><div class="tmpl-radio"></div>';
  h+='<div class="tmpl-main"><div class="tmpl-title">'+title+'</div><div class="tmpl-sub">'+sub+'</div>';
  if(people){h+='<div class="tmpl-people">';for(var i=0;i<FAMILY.length;i++)h+='<span class="wdot" style="width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;background:'+FAMILY[i].color+'">'+FAMILY[i].name[0]+'</span>';h+='</div>';}
  return h+'</div></div>';
}
function createTrip(){
  var nm=val('nt-name')||'New Trip';
  var start=val('nt-start'),end=val('nt-end');
  var mem=S._members?ALL_IDS.filter(function(id){return S._members.has(id);}):ALL_IDS.slice();
  if(!mem.length)mem=ALL_IDS.slice();
  var col=PALETTE[TRIPS.length%PALETTE.length][0];
  var id='t'+Date.now();
  var dates=(start&&end)?(monOf(start)+' '+(+start.slice(8))+' – '+monOf(end)+' '+(+end.slice(8))+', '+start.slice(0,4)):'Dates TBD';
  TRIPS.push({id:id,name:nm,sub:'Walt Disney World',status:'planning',start:start||'',end:end||'',dates:dates,color:col,members:mem});
  genDays(id);
  var np={},nt={};
  mem.forEach(function(pid){np[pid]=(S.newTmpl==='mine'&&PACKING_SEED[pid])?JSON.parse(JSON.stringify(PACKING_SEED[pid])):[];nt[pid]=(S.newTmpl==='mine'&&TODO_SEED[pid])?JSON.parse(JSON.stringify(TODO_SEED[pid])):[];});
  save('dtp_packing_'+id,np);save('dtp_todo_'+id,nt);
  save('dtp_trips',TRIPS);save('dtp_days',DAYS);S._members=null;
  toast('Trip created'+(S.newTmpl==='mine'?' from your template':''));
  closeScreen();render();
}

/* Settings */
function scrSettings(){
  var body='<div class="hub-section-label" style="margin-left:0">About personas</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 14px">Switch who you are anytime from the <strong>I am</strong> button in the header — your choice is stored on this device, no login. The admin can edit park assignments, resort and dates; everyone can add and edit everything else.</div>';
  body+=hubRow(['Templates',IC.suitcase,'#92400E','Packing & to-do masters','templates']);
  body+=hubRow(['Persona',IC.home,'#1C3A5E',FAMILY.length+' people','personas']);
  body+='<button class="btn-secondary" onclick="if(confirm(\'Reset all saved data on this device?\')){localStorage.clear();location.reload();}">Reset local data</button>';
  body+='<button class="btn-secondary" onclick="forceUpdate()">Force app update</button>';
  body+='<div class="body-empty" style="text-align:center;padding:14px 2px 0;font-size:12px">Build '+BUILD+'</div>';
  return screenShell('Settings',body,null,null,'Done');
}

/* Persona switch (from the header) */
function scrPersona(){
  var mem=tripMembers();
  var body='<div class="hub-section-label" style="margin-left:0">Who are you on '+esc(trip().name)+'?</div>';
  body+='<div class="whoselect" style="margin-bottom:16px">';
  for(var i=0;i<mem.length;i++){var p=person(mem[i]);if(!p)continue;var on=S.persona===p.id;
    body+='<div class="who-opt'+(on?' on':'')+'" onclick="setPersona(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+(p.admin?' · Admin':'')+(on?'<span class="wcheck" style="display:flex">'+IC.checkw.replace('currentColor','#15803D')+'</span>':'')+'</div>';
  }
  body+='</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 12px">Personalises your packing list, to-dos, and what the family thread highlights. Stored on this device only.</div>';
  body+='<button class="hub-row" onclick="openScreen({type:\'personas\'})"><div class="hub-icon" style="background:#1C3A5E">'+IC.home+'</div>'
    +'<div class="hub-main"><div class="hub-title">Manage people</div><div class="hub-sub">Add, rename, recolor or remove personas</div></div><div class="chev">'+IC.chev+'</div></button>';
  return screenShell('Switch Persona',body,null,null,'Done');
}

/* Manage personas — global add / rename / recolor / delete */
function colorOptions(sel){
  var h='';
  for(var i=0;i<PALETTE.length;i++)h+='<option value="'+PALETTE[i][0]+'"'+(PALETTE[i][0]===sel?' selected':'')+'>'+PALETTE[i][1]+'</option>';
  return h;
}
function scrPersonas(){
  var body='<div class="hub-section-label" style="margin-left:0">All personas</div>';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];
    body+='<div class="field-group" style="margin-bottom:10px">';
    body+='<div class="field-row" style="align-items:flex-end;gap:8px">';
    body+='<span class="pdot" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;background:'+p.color+';flex-shrink:0;margin-bottom:7px">'+esc(p.name[0])+'</span>';
    body+='<div class="field" style="flex:2;margin:0"><label class="field-label">Name</label><input class="field-input" id="pn-'+p.id+'" value="'+esc(p.name)+'"></div>';
    body+='<div class="field" style="flex:1;margin:0"><label class="field-label">Color</label><select class="field-select" id="pc-'+p.id+'">'+colorOptions(p.color)+'</select></div>';
    body+='</div>';
    body+='<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">';
    body+=p.admin?'<span class="st-badge st-booked">Admin</span>':'<span></span>';
    body+='<button style="color:#B91C1C;font-size:14px;font-weight:600;background:none;border:none;cursor:pointer;padding:4px 2px" onclick="delPersona(\''+p.id+'\')">Remove</button>';
    body+='</div></div>';
  }
  body+='<button class="sheet-new" style="margin:6px 0 0;width:100%" onclick="addPersona()">'+IC.plus+' Add person</button>';
  body+='<div class="body-empty" style="text-align:left;padding:10px 2px 0">Personas are global — assign them to any trip from the trip editor (tap the trip name in the header). Names and colors update everywhere: filters, assignments and chat.</div>';
  return screenShell('Manage People',body,'Save','savePersonas()');
}
function capturePersonas(){
  for(var i=0;i<FAMILY.length;i++){
    var n=document.getElementById('pn-'+FAMILY[i].id),c=document.getElementById('pc-'+FAMILY[i].id);
    if(n&&n.value&&n.value.trim())FAMILY[i].name=n.value.trim();
    if(c&&c.value)FAMILY[i].color=c.value;
  }
}
function savePersonas(){capturePersonas();save('dtp_family',FAMILY);toast('People updated');closeScreen();render();}
function addPersona(){
  capturePersonas();
  var used={};FAMILY.forEach(function(p){used[p.color]=1;});
  var col=PALETTE[FAMILY.length%PALETTE.length][0];
  for(var i=0;i<PALETTE.length;i++)if(!used[PALETTE[i][0]]){col=PALETTE[i][0];break;}
  var id='p'+Date.now();
  FAMILY.push({id:id,name:'New Person',color:col});
  ALL_IDS=FAMILY.map(function(p){return p.id;});
  PACKING[id]=[];TODO[id]=[];
  save('dtp_family',FAMILY);saveLists();
  renderScreen_inplace2();
}
function delPersona(id){
  if(FAMILY.length<=1){toast('Keep at least one person');return;}
  var p=person(id);
  if(!confirm('Remove '+(p?p.name:'this person')+'? They\'ll be taken off all trips and items.'))return;
  capturePersonas();
  FAMILY=FAMILY.filter(function(x){return x.id!==id;});
  ALL_IDS=FAMILY.map(function(x){return x.id;});
  delete PACKING[id];delete TODO[id];
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

/* Trip member picker (assign global personas to a trip) */
function memberSelectField(pre){
  if(!S._members){S._members=new Set(pre&&pre.length?pre:ALL_IDS);}
  var h='<div class="field"><label class="field-label">People on this trip <span class="opt">(drives filters & assignments)</span></label><div class="whoselect">';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i],on=S._members.has(p.id);
    h+='<div class="who-opt'+(on?' on':'')+'" onclick="toggleMember(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+esc(p.name[0])+'</span>'+esc(p.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';
  }
  return h+'</div></div>';
}
function toggleMember(id){if(!S._members)S._members=new Set();if(S._members.has(id))S._members.delete(id);else S._members.add(id);renderScreen_inplace2();}

/* Templates */
function scrTemplates(){
  var body='<div class="body-empty" style="text-align:left;padding:0 2px 14px;font-size:16px;color:var(--ink)">Your master lists. New trips can start pre-loaded with each person\'s packing and to-do items so you\'re never building from scratch.</div>';
  body+='<div class="hub-section-label" style="margin-left:0">Per-person masters</div>';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i];
    var pk=PACKING[p.id]?PACKING[p.id].reduce(function(n,c){return n+c.items.length;},0):0;
    var td=TODO[p.id]?TODO[p.id].length:0;
    body+='<div class="hub-row" style="cursor:default"><div class="hub-icon" style="background:'+p.color+'">'+esc(p.name[0])+'</div>';
    body+='<div class="hub-main"><div class="hub-title">'+esc(p.name)+'</div><div class="hub-sub">'+pk+' packing · '+td+' to-do items</div></div></div>';
  }
  body+='<button class="btn-primary" onclick="toast(\'Current lists saved as your master template\')">Save current lists as template</button>';
  body+='<div class="body-empty" style="text-align:left;padding:8px 2px 0">When you create a new trip and choose “My template,” these lists are copied in for each person.</div>';
  return screenShell('Templates',body,null,null,'Done');
}

/* Per-person lists as a full screen (from Plan hub / Settings) */
function listScreenBody(which){return renderFilter()+renderLists(which);}
function scrLists(){
  return screenShell(S.screen.which==='packing'?'Packing':'To Do', '<div id="lists-body">'+listScreenBody(S.screen.which)+'</div>', null, null, 'Done');
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
  var body='',TD=tripDays(),dft=(TD[1]||TD[0]||{date:''}).date;
  if(sec==='dining'){
    for(var i=0;i<TD.length;i++){var din=diningFor(TD[i].date);if(!din.length)continue;
      body+=dayHd(TD[i].date);for(var j=0;j<din.length;j++)body+='<div class="ov-card'+(isPlanningStatus(din[j].status)?' planning':'')+'">'+diningRow(din[j])+'</div>';}
    body+='<button class="btn-primary" onclick="openScreen({type:\'adddining\',day:\''+dft+'\'})">Add dining</button>';
  }else if(sec==='addflight'){
    for(var i2=0;i2<TD.length;i2++){var fl=flightsFor(TD[i2].date);if(!fl.length)continue;
      body+=dayHd(TD[i2].date);for(var j2=0;j2<fl.length;j2++)body+='<div class="ov-card'+(isPlanningStatus(fl[j2].status)?' planning':'')+'">'+flightJourney(fl[j2],dayByDate(TD[i2].date))+'</div>';}
    body+='<button class="btn-primary" onclick="openScreen({type:\'addflight\',day:\''+((TD[0]||{date:''}).date)+'\'})">Add flight</button>';
  }else if(sec==='ll'){
    var anyLL=false;
    for(var il=0;il<TD.length;il++){var lld=llFor(TD[il].date);if(!lld.length)continue;anyLL=true;
      body+=dayHd(TD[il].date);
      for(var lj=0;lj<lld.length;lj++){var l=lld[lj];
        body+='<div class="ov-card'+(isPlanningStatus(l.status)?' planning':'')+'"><div class="din-row"><div style="flex:1;min-width:0"><div class="din-name">'+esc(l.ride)+' <span class="ll-tag '+tagCls(l.tier)+'">'+tagShort(l.tier)+'</span></div><div class="din-time">'+(l.status==='booked'?('Booked '+esc(l.bookedTime||'')):('Window '+esc(l.window)))+'</div>'+(l.who!=='all'?whoChips(l.who):'')+'</div>'+statusBadge(l.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'addll\',edit:\''+l.id+'\',day:\''+l.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!anyLL) body+='<div class="body-empty">No Lightning Lanes yet.</div>';
    body+='<button class="btn-primary" onclick="openScreen({type:\'addll\',day:\''+dft+'\'})">Add ride</button>';
  }else if(sec==='resort'){
    var rsl=RESORTS.filter(function(r){return r.trip===S.tripId;});
    for(var ir=0;ir<rsl.length;ir++){var rr=rsl[ir];
      body+='<div class="ov-card'+(isPlanningStatus(rr.status)?' planning':'')+'"><div class="din-row"><div style="flex:1"><div class="din-name">'+esc(rr.name)+'</div><div class="din-time">'+esc(rr.room)+' · '+monOf(rr.checkin)+' '+(+rr.checkin.slice(8))+' → '+monOf(rr.checkout)+' '+(+rr.checkout.slice(8))+'</div></div>'
        +statusBadge(rr.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'resortedit\',edit:\''+rr.id+'\'})">'+IC.pencil+'</button></div></div>';
    }
    if(!rsl.length) body+='<div class="body-empty">No resort stays yet.</div>';
    body+='<button class="btn-primary" onclick="openScreen({type:\'resortedit\'})">Add resort stay</button>';
  }else if(sec==='parkres'){
    var anyPR=false;
    for(var ip=0;ip<TD.length;ip++){var dp=TD[ip];var prl=parkResFor(dp.date);if(!prl.length)continue;anyPR=true;
      body+=dayHd(dp.date);
      for(var pj=0;pj<prl.length;pj++){var prx=prl[pj],ppk=PARKS[prx.park];
        body+='<div class="ov-card'+(isPlanningStatus(prx.status)?' planning':'')+'"><div class="din-row"><span style="background:'+(ppk?ppk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(ppk?esc(ppk.name):esc(prx.park))+'</div>'+(prx.who!=='all'?whoChips(prx.who):'<div class="din-time">Everyone</div>')+'</div>'+statusBadge(prx.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'predit\',edit:\''+prx.id+'\',day:\''+prx.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!anyPR) body+='<div class="body-empty">No park reservations yet.</div>';
    body+='<button class="btn-primary" onclick="openScreen({type:\'predit\',day:\''+dft+'\'})">Add park reservation</button>';
  }else if(sec==='visits'){
    var anyV=false;
    for(var i3=0;i3<TD.length;i3++){var dvs=visitsFor(TD[i3].date);if(!dvs.length)continue;anyV=true;
      body+=dayHd(TD[i3].date);
      for(var vj=0;vj<dvs.length;vj++){var vv=dvs[vj],vpk=PARKS[vv.park];
        body+='<div class="ov-card"><div class="din-row"><span style="background:'+(vpk?vpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(vpk?esc(vpk.name):esc(vv.park))+'</div><div class="din-time">'+timingLbl(vv.timing)+(vv.who==='all'?' · Everyone':'')+'</div>'+(vv.who!=='all'?whoChips(vv.who):'')+'</div>'+(vj===0?'<span class="st-badge st-booked">Primary</span>':'<span class="st-badge st-todo">Hopper</span>')+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'visedit\',edit:\''+vv.id+'\',day:\''+vv.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!anyV) body+='<div class="body-empty">No park visits yet.</div>';
    body+='<button class="btn-primary" onclick="openScreen({type:\'visedit\',day:\''+dft+'\'})">Add park visit</button>';
  }else if(sec==='hours'){
    var anyH=false;
    for(var i4=0;i4<TD.length;i4++){var dhs=parkHoursFor(TD[i4].date);if(!dhs.length)continue;anyH=true;
      body+=dayHd(TD[i4].date);
      for(var hj=0;hj<dhs.length;hj++){var hh=dhs[hj],hpk=PARKS[hh.park];
        body+='<div class="ov-card"><div class="din-row"><span style="background:'+(hpk?hpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(hpk?esc(hpk.name):esc(hh.park))+'</div><div class="din-time">'+esc((hh.open||'—')+' – '+(hh.close||'—'))+(hh.early?' · Early '+esc(hh.early):'')+(hh.late?' · Late '+esc(hh.late):'')+'</div></div>'+crowdPill(hh.crowd)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'hoursedit\',edit:\''+hh.id+'\',day:\''+hh.day+'\'})">'+IC.pencil+'</button></div></div>';
      }
    }
    if(!anyH) body+='<div class="body-empty">No park hours yet.</div>';
    body+='<button class="btn-primary" onclick="openScreen({type:\'hoursedit\',day:\''+dft+'\'})">Add park hours</button>';
  }
  return screenShell(m[0],body,null,null,'Done');
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
    body+='<div class="ov-card" style="margin:0 0 8px"><div class="din-row" style="padding:10px 12px"><span style="background:'+(vpk?vpk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(vpk?esc(vpk.name):esc(vv.park))+'</div><div class="din-time">'+timingLbl(vv.timing)+(vv.who==='all'?' · Everyone':'')+'</div>'+(vv.who!=='all'?whoChips(vv.who):'')+'</div>'+(vi===0?'<span class="st-badge st-booked">Primary</span>':'<span class="st-badge st-todo">Hopper</span>')+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'visedit\',edit:\''+vv.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
  }
  if(!vis.length) body+='<div class="body-empty" style="text-align:left;padding:2px 2px 4px">No park visit — travel / rest day.</div>';
  body+='<button class="add-link" style="margin-top:0" onclick="openScreen({type:\'visedit\',day:\''+d.date+'\'})">'+IC.plus+' Add park visit</button>';
  body+='</div>';
  body+='<div class="field"><label class="field-label">Park reservations <span class="opt">(assigned items — tap to edit)</span></label>';
  var prs=parkResFor(d.date);
  for(var pi=0;pi<prs.length;pi++){var pr=prs[pi],ppk=PARKS[pr.park];
    body+='<div class="ov-card'+(isPlanningStatus(pr.status)?' planning':'')+'" style="margin:0 0 8px"><div class="din-row" style="padding:10px 12px"><span style="background:'+(ppk?ppk.color:'#999')+';width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:5px"></span><div style="flex:1;min-width:0"><div class="din-name">'+(ppk?esc(ppk.name):esc(pr.park))+'</div>'+(pr.who!=='all'?whoChips(pr.who):'<div class="din-time">Everyone</div>')+'</div>'+statusBadge(pr.status)+'<button class="hdr-icon" style="width:30px;height:30px;background:#F3F1EC;color:#6B7280;margin-left:8px" onclick="openScreen({type:\'predit\',edit:\''+pr.id+'\',day:\''+d.date+'\'})">'+IC.pencil+'</button></div></div>';
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
  body+='<div class="body-empty" style="text-align:left;padding:2px 2px 0">Park reservations are items assigned to people and a day. They drive the Park Res. line on the Agenda and the Overview — change one here and it updates everywhere.</div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delPR(\''+edit.id+'\')">Delete this reservation</button>';
  return screenShell(edit?'Edit Park Reservation':'Add Park Reservation',body,'Save','savePR()');
}
function savePR(){
  var edit=S.screen.edit?PARKRES.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var rec=edit||{id:'pr'+Date.now(),trip:S.tripId};
  rec.park=val('pr-park')||'mk';rec.day=val('pr-day')||S.screen.day;
  rec.status=S._formStatus.pr||'booked';rec.who=whoVal();
  if(!edit)PARKRES.push(rec);
  save('dtp_parkres',PARKRES);S._who=null;toast('Park reservation saved');closeScreen();render();
}
function delPR(id){
  for(var i=0;i<PARKRES.length;i++)if(PARKRES[i].id===id){PARKRES.splice(i,1);break;}
  save('dtp_parkres',PARKRES);toast('Reservation removed');closeScreen();render();
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
  var rec=edit||{id:'v'+Date.now(),trip:S.tripId};
  rec.park=val('vs-park')||'mk';rec.day=val('vs-day')||S.screen.day;rec.timing=val('vs-timing')||'day';rec.who=whoVal();
  if(!edit)VISITS.push(rec);
  save('dtp_visits',VISITS);
  var c=val('vh-crowd');
  upsertHours(rec.park,rec.day,{open:val('vh-open'),close:val('vh-close'),early:val('vh-early'),late:val('vh-late'),crowd:c?parseInt(c,10):null});
  S._who=null;toast('Park visit saved');closeScreen();render();
}
function delVisit(id){
  for(var i=0;i<VISITS.length;i++)if(VISITS[i].id===id){VISITS.splice(i,1);break;}
  save('dtp_visits',VISITS);toast('Visit removed');closeScreen();render();
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
  var rec=edit||{id:'h'+Date.now(),trip:S.tripId};
  rec.park=val('ph-park')||'mk';rec.day=val('ph-day')||S.screen.day;
  rec.open=val('ph-open');rec.close=val('ph-close');rec.early=val('ph-early');rec.late=val('ph-late');
  var c=val('ph-crowd');rec.crowd=c?parseInt(c,10):null;
  if(!edit)PARKHOURS.push(rec);
  save('dtp_hours',PARKHOURS);toast('Park hours saved');closeScreen();render();
}
function delHours(id){
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
  if(S.screen.idx!=null)d.itin[S.screen.idx]=rec; else d.itin.push(rec);
  save('dtp_days',DAYS);S._who=null;toast('Stop saved');closeScreen();render();
}
function delStop(){
  var d=dayByDate(S.screen.day);
  if(d&&S.screen.idx!=null)d.itin.splice(S.screen.idx,1);
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
  var rec=edit||{id:'rb'+Date.now(),trip:S.tripId};
  rec.text=tx;rec.after=val('rb-after');rec.day=val('rb-day')||S.screen.day;rec.who=whoVal();
  if(!edit)REBOOKS.push(rec);
  save('dtp_rebooks',REBOOKS);S._who=null;toast('Re-book saved');closeScreen();render();
}
function delRebook(id){
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
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select" id="sh-day">'+dayOptions((edit&&edit.day)||S.screen.day)+'</select></div>';
  if(edit) body+='<button class="btn-danger-link" onclick="delShow(\''+edit.id+'\')">Delete this show</button>';
  return screenShell(edit?'Edit Show':'Add Show',body,'Save','saveShow()');
}
function saveShow(){
  var edit=S.screen.edit?SHOWS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var nm=val('sh-name');if(!nm){toast('Add a show name');return;}
  var rec=edit||{id:'s'+Date.now(),trip:S.tripId};
  rec.name=nm;rec.time=val('sh-time')||'TBD';rec.day=val('sh-day')||S.screen.day;rec.status=S._formStatus.sh||'attend';rec.who=whoVal();
  if(!edit)SHOWS.push(rec);
  save('dtp_shows',SHOWS);S._who=null;toast('Show saved');closeScreen();render();
}
function delShow(id){
  for(var i=0;i<SHOWS.length;i++)if(SHOWS[i].id===id){SHOWS.splice(i,1);break;}
  save('dtp_shows',SHOWS);toast('Show removed');closeScreen();render();
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
  if(edit) body+='<button class="btn-danger-link" onclick="delResort(\''+edit.id+'\')">Delete this stay</button>';
  return screenShell(edit?'Edit Resort':'Add Resort',body,'Save','saveResort()');
}
function saveResort(){
  var edit=S.screen.edit?RESORTS.filter(function(x){return x.id===S.screen.edit;})[0]:null;
  var nm=val('rs-name');if(!nm){toast('Add a resort name');return;}
  var rec=edit||{id:'r'+Date.now(),trip:S.tripId};
  rec.name=nm;rec.room=val('rs-room')||'Room';rec.checkin=val('rs-in');rec.checkout=val('rs-out');
  rec.inTime=val('rs-intime');rec.outTime=val('rs-outtime');
  rec.conf=val('rs-conf')||'';rec.status=S._formStatus.rs||'planning';rec.who=whoVal();
  if(!edit)RESORTS.push(rec);
  save('dtp_resorts',RESORTS);S._who=null;toast('Resort saved');closeScreen();render();
}
function delResort(id){
  for(var i=0;i<RESORTS.length;i++)if(RESORTS[i].id===id){RESORTS.splice(i,1);break;}
  save('dtp_resorts',RESORTS);toast('Stay removed');closeScreen();render();
}

/* ── Trip name & dates ─────────────────────────────────────── */
function tripById(id){for(var i=0;i<TRIPS.length;i++)if(TRIPS[i].id===id)return TRIPS[i];return null;}
function scrTripEdit(){
  var t=tripById(S.screen.tripId||S.tripId);if(!t)return scrGeneric();
  if(S._formInit!=='trip'){S._formStatus.tr=t.status;S._formColor=t.color;S._formInit='trip';}
  var body='<div class="field"><label class="field-label">Trip name</label><input class="field-input" id="tr-name" value="'+esc(t.name)+'"></div>';
  body+='<div class="field"><label class="field-label">Destination <span class="opt">(optional)</span></label><input class="field-input" id="tr-sub" value="'+esc(t.sub||'')+'"></div>';
  body+='<div class="field"><label class="field-label">Dates <span class="opt">(as shown in the header)</span></label><input class="field-input" id="tr-dates" value="'+esc(t.dates)+'"></div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg">';
  body+='<button class="seg-btn'+(S._formStatus.tr==='active'?' on book':'')+'" onclick="pickStatus(\'tr\',\'active\')">Active</button>';
  body+='<button class="seg-btn'+(S._formStatus.tr==='planning'?' on':'')+'" onclick="pickStatus(\'tr\',\'planning\')">Planning</button>';
  body+='<button class="seg-btn'+(S._formStatus.tr==='archived'?' on':'')+'" onclick="pickStatus(\'tr\',\'archived\')">Archived</button></div></div>';
  body+='<div class="field"><label class="field-label">Color</label><select class="field-select" id="tr-color">'+colorOptions(S._formColor)+'</select></div>';
  body+=memberSelectField(t.members);
  body+='<button class="btn-danger-link" onclick="delTrip(\''+t.id+'\')">Delete this trip</button>';
  return screenShell('Edit Trip',body,'Save','saveTrip()');
}
function saveTrip(){
  var t=tripById(S.screen.tripId||S.tripId);if(!t){closeScreen();return;}
  var nm=val('tr-name');if(nm)t.name=nm;
  t.sub=val('tr-sub');
  var dt=val('tr-dates');if(dt)t.dates=dt;
  t.status=S._formStatus.tr||t.status;
  var c=val('tr-color');if(c)t.color=c;
  t.members=S._members?ALL_IDS.filter(function(id){return S._members.has(id);}):t.members;
  if(!t.members||!t.members.length)t.members=ALL_IDS.slice();
  if(t.status==='active')for(var j=0;j<TRIPS.length;j++)if(TRIPS[j].id!==t.id&&TRIPS[j].status==='active')TRIPS[j].status='planning';
  if(t.id===S.tripId)S.filter.clear();
  save('dtp_trips',TRIPS);S._members=null;toast('Trip updated');closeScreen();render();
}
function delTrip(id){
  if(TRIPS.length<=1){toast('Keep at least one trip');return;}
  var t=tripById(id);
  if(!confirm('Delete '+(t?t.name:'this trip')+'? Its days and items are removed too. This can\'t be undone.'))return;
  TRIPS=TRIPS.filter(function(x){return x.id!==id;});
  // remove this trip's days and items
  function drop(coll){for(var i=coll.length-1;i>=0;i--)if(coll[i].trip===id)coll.splice(i,1);}
  [DAYS,VISITS,PARKHOURS,DINING,LLS,SHOWS,FLIGHTS,RESORTS,PARKRES,REBOOKS].forEach(drop);
  for(var c=CHAT.length-1;c>=0;c--)if(CHAT[c].trip===id)CHAT.splice(c,1);
  try{localStorage.removeItem('dtp_packing_'+id);localStorage.removeItem('dtp_todo_'+id);}catch(e){}
  if(S.tripId===id){S.tripId=TRIPS[0].id;loadLists();S.dayIdx=0;S.open=defOpen();S.filter.clear();}
  persist();S._members=null;toast('Trip deleted');closeScreen();render();
}

/* ============================================================
   MAIN RENDER
   ============================================================ */
function render(){
  document.getElementById('header-host').innerHTML=renderHeader();
  document.getElementById('strip-host').innerHTML=renderStrip();
  document.getElementById('filter-host').innerHTML=(S.tab==='home'||S.tab==='overview')?renderFilter():'';
  var o='';
  if(S.tab==='home') o=renderAgenda();
  else if(S.tab==='plan') o=renderPlanHub();
  else if(S.tab==='overview') o=renderOverview();
  else if(S.tab==='chat') o=renderChat();
  document.getElementById('app').innerHTML=o;
  if(S.tab==='chat'){document.getElementById('app').style.padding='0';}
  else{document.getElementById('app').style.padding='';}
  renderNav();
}
materializeAllDays();
loadLists();
S.open=defOpen();
render();
