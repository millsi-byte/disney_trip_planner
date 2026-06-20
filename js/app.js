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
function defOpen(){return {resort:true,flight:true,itin:true,ll:true,strat:true,din:true,shows:true};}
S.open = defOpen();

/* persistence */
function load(k,fb){try{var s=localStorage.getItem(k);if(s)return JSON.parse(s);}catch(e){}return fb;}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
PACKING = load('dtp_packing', PACKING);
TODO    = load('dtp_todo', TODO);
S.persona = load('dtp_persona', S.persona);

/* ── Helpers ───────────────────────────────────────────────── */
function person(id){for(var i=0;i<FAMILY.length;i++)if(FAMILY[i].id===id)return FAMILY[i];return null;}
function whoArr(who){return who==="all"?ALL_IDS.slice():who;}
function trip(){for(var i=0;i<TRIPS.length;i++)if(TRIPS[i].id===S.tripId)return TRIPS[i];return TRIPS[0];}
function day(){return DAYS[S.dayIdx];}
function fmtDay(ds){var d=DAYS_BY_DATE[ds];return d?("Jul "+d.d+" · "+d.dl):ds;}
var DAYS_BY_DATE={}; for(var _i=0;_i<DAYS.length;_i++)DAYS_BY_DATE[DAYS[_i].date]=DAYS[_i];

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
    booked:['st-booked','Booked'], planning:['st-planning','Planning'],
    reserved:['st-reserved','Reserved'], want:['st-want','Want to Try'],
    todo:['st-todo','To Do'], done:['st-done','Done'], na:['st-na','N/A']
  };
  var m=map[st]||['st-todo',st];
  var ic = (st==='booked'||st==='reserved'||st==='done')?'<span style="display:flex">'+IC.checkw+'</span>':'';
  return '<span class="st-badge '+m[0]+'">'+ic+m[1]+'</span>';
}
function isPlanningStatus(st){return st==='planning'||st==='want';}

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

/* queries */
function flightsFor(date){return FLIGHTS.filter(function(f){return f.day===date;});}
function diningFor(date){return DINING.filter(function(d){return d.day===date;});}
function llFor(date){return LLS.filter(function(l){return l.day===date;});}
function showsFor(date){return SHOWS.filter(function(s){return s.day===date;});}
function resortsFor(date){return RESORTS.filter(function(r){return date>=r.checkin&&date<=r.checkout;});}

/* ── Actions ───────────────────────────────────────────────── */
function go(tab){S.tab=tab;closeSheet();render();}
function selDay(i){S.dayIdx=i;S.open=defOpen();render();}
function toggleCard(k){S.open[k]=!S.open[k];render();}
function setPlan(p){S.plan=p;render();}
function setOv(v){S.ov=v;render();}
function toast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('in');clearTimeout(window._tt);window._tt=setTimeout(function(){t.classList.remove('in');},1900);}

function toggleFilter(id){
  if(id==="all"){S.filter.clear();}
  else{if(S.filter.has(id))S.filter.delete(id);else S.filter.add(id);}
  if(S.screen&&S.screen.type==='lists')refreshLists(); else render();
}

/* sheets */
function openSheet(def){S.sheet=def;renderOverlay();requestAnimationFrame(function(){var b=document.getElementById('sheet-host').firstChild;if(b)b.classList.add('in');});}
function closeSheet(){var host=document.getElementById('sheet-host');var b=host&&host.firstChild;if(b){b.classList.remove('in');setTimeout(function(){S.sheet=null;renderOverlay();},240);}else{S.sheet=null;renderOverlay();}}
function switchTrip(id){S.tripId=id;S.dayIdx=1;S.tab="home";S.open=defOpen();closeSheet();toast("Switched to "+trip().name);render();}

/* screens (slide-in) */
function openScreen(def){
  S.screen=def;S._who=null;S._formStatus={};S._delpk=null;S._deltd=null;
  if(def.type==='addflight'){S.formLegs=def.edit?((FLIGHTS.filter(function(f){return f.id===def.edit;})[0]||{legs:[0]}).legs.length):1;}
  else{S.formLegs=1;}
  renderOverlay();requestAnimationFrame(function(){var s=document.getElementById('screen-host').firstChild;if(s)s.classList.add('in');});
}
function closeScreen(){var host=document.getElementById('screen-host');var s=host&&host.firstChild;if(s){s.classList.remove('in');setTimeout(function(){S.screen=null;renderOverlay();},260);}else{S.screen=null;renderOverlay();}}

/* persona */
function setPersona(id){S.persona=id;save('dtp_persona',id);toast("You are "+person(id).name);render();closeScreen();}

/* packing / todo */
function pkPersons(){if(S.filter.size===0)return ALL_IDS.slice();return ALL_IDS.filter(function(id){return S.filter.has(id);});}
function refreshLists(){
  var b=document.getElementById('lists-body');
  if(b&&S.screen&&S.screen.type==='lists'){b.innerHTML=listScreenBody(S.screen.which);}
  else render();
}
function savePK(){save('dtp_packing',PACKING);}
function saveTD(){save('dtp_todo',TODO);}
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
  var h='<header class="hdr">';
  h+='<div class="hdr-app">DTP</div>';
  h+='<button class="hdr-trip" onclick="openSheet({type:\'trips\'})">';
  h+='<div class="hdr-trip-name">'+esc(t.name)+' '+IC.chevd+'</div>';
  h+='<div class="hdr-trip-sub">'+esc(t.dates)+'</div></button>';
  h+='<button class="hdr-icon" onclick="openScreen({type:\'settings\'})">'+IC.gear+'</button>';
  h+='</header>';
  return h;
}
function renderStrip(){
  if(S.tab!=='home')return '';
  var h='<div class="strip-wrap"><div class="strip">';
  for(var i=0;i<DAYS.length;i++){
    var d=DAYS[i],p=PARKS[d.park],p2=d.park2?PARKS[d.park2]:null;
    var bar='<div class="p-bar"><span style="background:'+p.color+'"></span>'+(p2?'<span style="background:'+p2.color+'"></span>':'')+'</div>';
    var code=p.short+(p2?'/'+p2.short:'');
    h+='<div class="dpill'+(i===S.dayIdx?' on':'')+'" onclick="selDay('+i+')">'
      +'<div class="p-day">'+d.dl+'</div><div class="p-date">'+d.d+'</div>'+bar
      +'<div class="p-pk">'+code+'</div></div>';
  }
  return h+'</div></div>';
}
function renderFilter(){
  var h='<div class="pfilter-wrap"><div class="pfilter">';
  h+='<div class="ppill all'+(S.filter.size===0?' on':'')+'" onclick="toggleFilter(\'all\')">All</div>';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i],on=S.filter.has(p.id);
    h+='<div class="ppill'+(on?' on':'')+'" onclick="toggleFilter(\''+p.id+'\')">'
      +'<span class="pdot" style="background:'+p.color+'">'+p.name[0]+'</span>'+esc(p.name)+'</div>';
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

function renderAgenda(){
  var d=day(),pk=PARKS[d.park],p2=d.park2?PARKS[d.park2]:null;
  var o='';

  /* Hero */
  o+='<div class="hero fadein">';
  o+='<div class="hero-body" style="background:'+pk.color+'">';
  o+='<div class="h-date">Jul '+d.d+' · '+({Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Saturday',Sun:'Sunday'}[d.dl])+'</div>';
  o+='<div class="h-park">'+pk.name+'</div>';
  if(p2) o+='<div class="h-park2"><span class="p2dot" style="background:'+p2.color+'"></span>then '+p2.name+' · evening</div>';
  o+='<div class="h-resort">'+esc(d.visit)+'</div>';
  o+='<div class="h-badges">';
  for(var b=0;b<d.badges.length;b++) o+='<span class="badge">'+esc(d.badges[b])+'</span>';
  o+='</div></div>';
  if(d.alert) o+='<div class="hero-alert">'+IC.warn+'<div class="hero-alert-txt">'+esc(d.alert)+'</div></div>';
  o+='</div>';

  /* Info bar */
  o+='<div class="info-bar">';
  o+='<div class="ib-cell"><div class="ib-lbl">Hours</div><div class="ib-val">'+esc(d.hours)+'</div></div>';
  o+='<div class="ib-cell"><div class="ib-lbl">Crowd</div><div class="ib-val">'+crowdPill(d.crowd)+'</div></div>';
  o+='<div class="ib-cell"><div class="ib-lbl">Park Res.</div><div class="ib-val">';
  if(d.parkRes){var rp=PARKS[d.parkRes];o+='<div class="ib-res"><span class="ib-res-dot" style="background:'+rp.color+'"></span><span style="color:'+rp.color+'">'+rp.short+'</span> '+IC.check+'</div>';}
  else{o+='<span style="color:var(--muted);font-weight:600;font-size:13px">None · Hopper</span>';}
  o+='</div></div></div>';

  /* Resort card(s) */
  var stays=resortsFor(d.date).filter(function(r){return visible(r.who);});
  for(var s=0;s<stays.length;s++) o+=resortCard(stays[s],d.date);

  /* Flights */
  var flts=flightsFor(d.date).filter(function(f){return visible(f.who);});
  if(flts.length||d.date==="2026-07-14"||d.date==="2026-07-19") o+=flightCard(flts,d);

  /* Day Plan */
  o+=dayPlanCard(d,pk);

  /* Lightning Lanes */
  var lls=llFor(d.date).filter(function(l){return visible(l.who);});
  if(lls.length) o+=llCard(lls,d,pk);

  /* Strategy */
  if(d.strategy) o+=stratCard(d,pk);

  /* Dining */
  var din=diningFor(d.date).filter(function(x){return visible(x.who);});
  o+=diningCard(din,pk,d.date);

  /* Shows */
  var sh=showsFor(d.date).filter(function(x){return visible(x.who);});
  if(sh.length) o+=showsCard(sh,pk);

  return o;
}

function resortCard(r,date){
  var key='resort_'+r.id;
  var flag = date===r.checkin?'<span class="resort-flag flag-in">'+IC.check+' Check-in today</span>'
           : date===r.checkout?'<span class="resort-flag flag-out">'+IC.warn+' Check-out today</span>':'';
  var o='<div class="card'+(isPlanningStatus(r.status)?' planning':'')+'">';
  o+=cardHead(key,'var(--hd-resort)',PARKS[day().park].color,IC.bed,'Resort',r.name,isPlanningStatus(r.status));
  if(S.open[key]){
    o+='<div class="card-body"><div class="resort-body">';
    o+='<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">';
    o+='<div><div class="resort-name">'+esc(r.name)+'</div><div class="resort-room">'+esc(r.room)+'</div></div>';
    o+='<div class="row-status">'+statusBadge(r.status)+'</div></div>';
    o+='<div class="resort-dates"><div class="rd-cell"><div class="rd-lbl">Check-in</div><div class="rd-day">Jul '+r.checkin.slice(8)+'</div><div class="rd-sub">'+fmtDay(r.checkin).split(' · ')[1]+' · 4:00 PM</div></div>';
    o+='<div class="rd-cell"><div class="rd-lbl">Check-out</div><div class="rd-day">Jul '+r.checkout.slice(8)+'</div><div class="rd-sub">'+fmtDay(r.checkout).split(' · ')[1]+' · 11:00 AM</div></div></div>';
    o+='<div class="resort-conf">Confirmation #'+esc(r.conf)+'</div>';
    o+=whoChips(r.who);
    if(flag) o+=flag;
    o+='</div></div>';
  }
  o+='</div>';
  return o;
}

function flightCard(flts,d){
  var key='flight', pk=PARKS[d.park];
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

function dayPlanCard(d,pk){
  var key='itin';
  var summary=d.strategy?firstSentence(d.strategy):null;
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-plan)',pk.color,IC.route,'Day Plan',d.itin.length+' stops');
  if(S.open[key]){
    o+='<div class="card-body">';
    if(summary) o+='<div class="plan-summary"><strong>The plan:</strong> '+esc(summary)+'</div>';
    for(var j=0;j<d.itin.length;j++){
      var it=d.itin[j],isFlight=isFlightRow(it);
      o+='<div class="t-row">';
      o+='<div class="t-time">'+esc(it.t)+'</div>';
      if(it.checkin){
        var rid=it.checkin==='r2out'?'r2':it.checkin;var rr=RESORTS.filter(function(x){return x.id===rid;})[0];
        o+='<div style="flex:1"><div class="t-text">'+esc(it.x)+'</div>';
        if(rr){o+='<div style="font-size:15px;font-weight:700;color:var(--ink);margin-top:3px">'+esc(rr.name)+'</div><div style="font-size:13px;color:var(--gold);font-weight:700">#'+esc(rr.conf)+'</div>';}
        o+='</div>';
      }else{
        o+='<div style="flex:1"><div class="t-text">'+pillify(esc(it.x))+'</div>';
      }
      var tags=[];
      if(isFlight) tags.push('<span class="t-tag t-tag-flight">'+IC.planexs+' Flight</span>');
      if(it.crit&&!isFlight) tags.push('<span class="t-tag t-tag-crit">'+esc(it.crit)+'</span>');
      if(tags.length) o+='<div class="t-tags">'+tags.join('')+'</div>';
      o+='</div></div>';
    }
    if(llFor(d.date).length){
      o+='<div class="ll-legend"><div class="ll-legend-item"><span class="ll-tag sp">SP</span> Single Pass</div>'
        +'<div class="ll-legend-item"><span class="ll-tag mp1">T1</span> Multi Pass T1</div>'
        +'<div class="ll-legend-item"><span class="ll-tag mp2">T2</span> Multi Pass T2</div></div>';
    }
    o+='<button class="add-link" onclick="toast(\'Add stop — opens the stop editor\')">'+IC.plus+' Add stop</button>';
    o+='</div>';
  }
  return o+'</div>';
}

function llCard(lls,d,pk){
  var key='ll';
  var planning=lls.filter(function(l){return l.status==='planning';}).length;
  var booked=lls.length-planning;
  var roll=ROLLING[d.date]||[];
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
      o+='<div class="ll-top"><div class="ll-ride">'+esc(l.ride)+' <span class="ll-tag '+tagCls(l.tier)+'">'+tagShort(l.tier)+'</span></div></div>';
      if(l.status==='booked'){
        o+='<div class="ll-win booked">'+IC.check+' Booked '+esc(l.bookedTime)+'</div>';
        if(l.conf) o+='<div class="ll-conf">Confirmation '+esc(l.conf)+'</div>';
      }else{
        o+='<div class="ll-win">Planned window: '+esc(l.window)+'</div>';
      }
      o+='<div class="ll-meta-row">'+statusBadge(l.status);
      if(l.status==='planning') o+='<button class="ri-btn" style="margin-left:auto" onclick="openScreen({type:\'llbook\',id:\''+l.id+'\'})">Mark as booked</button>';
      o+='</div></div>';
    }
    if(roll.length){
      o+='<div class="roll-hd">Rolling Re-books</div>';
      for(var r=0;r<roll.length;r++) o+='<div class="roll-row"><span class="roll-arr">'+IC.arr+'</span>'+esc(roll[r])+'</div>';
    }
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
  o+=(dn.loc==='in'&&dn.park)?'<span class="inpark-badge" style="background:'+PARKS[dn.park].color+'">In-Park</span>':'<span class="nonpark-badge">Off-Site</span>';
  o+='</div></div>';
  return o;
}
function showsCard(sh,pk){
  var key='shows';
  var o='<div class="card">';
  o+=cardHead(key,'var(--hd-show)',pk.color,IC.star,'Night Shows',sh.length+' show'+(sh.length>1?'s':''));
  if(S.open[key]){
    o+='<div class="card-body">';
    for(var i=0;i<sh.length;i++){var x=sh[i];
      o+='<div class="show-row"><div style="flex:1"><div class="show-name">'+esc(x.name)+'</div>'+(x.who!=='all'?whoChips(x.who):'')+'</div><div class="show-time">'+esc(x.time)+'</div></div>';
    }
    o+='<button class="add-link" onclick="toast(\'Add show — opens the show editor\')">'+IC.plus+' Add show</button>';
    o+='</div>';
  }
  return o+'</div>';
}

/* ============================================================
   PLAN HUB
   ============================================================ */
function renderPlanHub(){
  var o='<div class="pg-title">Plan</div><div class="pg-sub">Build out every part of '+esc(trip().name)+'.</div>';
  var rows=[
    ['Flights',IC.plane,'var(--hd-flight)',FLIGHTS.length+' journeys','addflight'],
    ['Dining',IC.fork,'var(--hd-din)',DINING.length+' reservations','dining'],
    ['Lightning Lanes',IC.bolt,'var(--hd-ll)',LLS.length+' rides','ll'],
    ['Resort',IC.bed,'var(--hd-resort)',RESORTS.length+' stays (split)','resort'],
    ['Park Reservations',IC.ticket,'#0F5F73',PARKRES.length+' confirmed','parkres'],
    ['Park Visits',IC.map,'#3B7549','6 days mapped','visits']
  ];
  o+='<div class="hub-section-label">Trip components</div>';
  for(var i=0;i<rows.length;i++) o+=hubRow(rows[i]);
  o+='<div class="hub-section-label">Per-person lists</div>';
  o+=hubRow(['Packing',IC.suitcase,'#92400E','5 lists','packing']);
  o+=hubRow(['To Do',IC.checks,'#166534','5 lists','todo']);
  o+='<div class="hub-section-label">Get started fast</div>';
  o+='<button class="hub-row" onclick="openScreen({type:\'import\'})"><div class="hub-icon" style="background:#1E40AF">'+IC.sparkles+'</div>'
    +'<div class="hub-main"><div class="hub-title">AI Import</div><div class="hub-sub">Pull details from emails, PDFs & spreadsheets</div></div><div class="chev">'+IC.chev+'</div></button>';
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
  var d=DAYS_BY_DATE[date],pk=PARKS[d.park];
  return '<div class="day-hd" style="background:'+pk.color+'"><div class="day-hd-name">'+pk.name+'</div><div class="day-hd-date">Jul '+d.d+' · '+d.dl+'</div></div>';
}
function ovDining(){
  var o='',any=false;
  for(var i=0;i<DAYS.length;i++){
    var din=diningFor(DAYS[i].date).filter(function(x){return visible(x.who);});
    if(!din.length)continue;any=true;
    o+=dayHd(DAYS[i].date);
    for(var j=0;j<din.length;j++){o+='<div class="ov-card'+(isPlanningStatus(din[j].status)?' planning':'')+'">'+diningRow(din[j])+'</div>';}
  }
  return any?o:'<div class="body-empty">No dining for the selected people.</div>';
}
function ovParkRes(){
  var o='<div class="ov-card">';
  for(var i=0;i<DAYS.length;i++){var d=DAYS[i];
    o+='<div class="din-row"><div style="display:flex;align-items:center;gap:9px;flex:1">';
    if(d.parkRes){var rp=PARKS[d.parkRes];
      o+='<span style="width:11px;height:11px;border-radius:50%;background:'+rp.color+';flex-shrink:0"></span>';
      o+='<div><div style="font-size:16px;font-weight:700;color:'+rp.color+'">'+rp.name+'</div><div style="font-size:12px;color:var(--muted)">Jul '+d.d+' · '+d.dl+'</div></div></div>';
      o+=statusBadge('booked');
    }else{
      o+='<span style="width:11px;height:11px;border-radius:50%;background:#D1D5DB;flex-shrink:0"></span>';
      o+='<div><div style="font-size:16px;font-weight:600;color:var(--muted)">No reservation · Hopper</div><div style="font-size:12px;color:var(--muted)">Jul '+d.d+' · '+d.dl+'</div></div></div>';
      o+='<span class="st-badge st-todo">Hopper</span>';
    }
    o+='</div>';
  }
  return o+'</div>';
}
function ovResort(){
  var o='<div class="ov-card"><div class="timeline">';
  for(var i=0;i<RESORTS.length;i++){var r=RESORTS[i];
    o+='<div class="tl-stay"><div class="tl-bar" style="background:'+(i===0?'#8C9BAA':PARKS.ep.color)+'"></div>';
    o+='<div style="flex:1"><div style="display:flex;justify-content:space-between;gap:8px"><div class="resort-name" style="font-size:17px">'+esc(r.name)+'</div>'+statusBadge(r.status)+'</div>';
    o+='<div class="resort-room">'+esc(r.room)+'</div>';
    o+='<div style="font-size:14px;color:var(--ink);font-weight:600;margin-top:6px">Jul '+r.checkin.slice(8)+' → Jul '+r.checkout.slice(8)+' · '+(parseInt(r.checkout.slice(8))-parseInt(r.checkin.slice(8)))+' nights</div>';
    o+='<div class="resort-conf">#'+esc(r.conf)+'</div></div></div>';
  }
  o+='</div></div>';
  o+='<div class="body-empty" style="text-align:left;padding:6px 4px">Split stay — Pop Century for the first two nights, then moving to the BoardWalk Villas (1-BR) for the rest of the trip.</div>';
  return o;
}
function ovLL(){
  var o='';
  for(var i=0;i<DAYS.length;i++){
    var lls=llFor(DAYS[i].date).filter(function(x){return visible(x.who);});
    if(!lls.length)continue;
    o+=dayHd(DAYS[i].date);
    o+='<div class="ov-card">';
    o+='<div class="ll-bookdate">'+IC.bolt+' Book '+esc(lls[0].bookDate)+'</div>';
    for(var j=0;j<lls.length;j++){var l=lls[j];
      o+='<div class="ll-row"><div class="ll-top"><div class="ll-ride">'+esc(l.ride)+' <span class="ll-tag '+tagCls(l.tier)+'">'+tagShort(l.tier)+'</span></div>'+statusBadge(l.status)+'</div>';
      o+='<div class="ll-win'+(l.status==='booked'?' booked':'')+'">'+(l.status==='booked'?(IC.check+' '+esc(l.bookedTime)):('Window: '+esc(l.window)))+'</div></div>';
    }
    o+='</div>';
  }
  return o||'<div class="body-empty">No Lightning Lanes for the selected people.</div>';
}
function ovFlights(){
  var o='',any=false;
  for(var i=0;i<DAYS.length;i++){
    var flts=flightsFor(DAYS[i].date).filter(function(x){return visible(x.who);});
    if(!flts.length)continue;any=true;
    o+=dayHd(DAYS[i].date);
    for(var j=0;j<flts.length;j++) o+='<div class="ov-card'+(isPlanningStatus(flts[j].status)?' planning':'')+'">'+flightJourney(flts[j],DAYS_BY_DATE[DAYS[i].date])+'</div>';
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
  for(var i=0;i<CHAT.length;i++){
    var m=CHAT[i],p=person(m.from),mine=m.from===me;
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
  CHAT.push({from:S.persona,text:e.value.trim(),time:'Now'});render();
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
    persons.forEach(function(pid){PACKING[pid].forEach(function(c){c.items.forEach(function(it){tot++;if(it.done)totDone++;});});});
    o+=listSticky('packing',totDone,tot);
    persons.forEach(function(pid){o+=packingPerson(pid);});
  }else{
    var td=0,tt=0;
    persons.forEach(function(pid){TODO[pid].forEach(function(t){if(!t.na){tt++;if(t.done)td++;}});});
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
  var cats=PACKING[pid],done=0,tot=0;
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
  var list=TODO[pid],done=list.filter(function(t){return t.done;}).length,tot=list.filter(function(t){return !t.na;}).length;
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
  var tabs=[['home',IC.home,'Home'],['plan',IC.plan,'Plan'],['overview',IC.grid,'Overview'],['chat',IC.chat,'Chat']];
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
      var sm=TRIP_SUMMARY[t.id];
      h+='<div class="trip-row'+(on?' on':'')+'" onclick="switchTrip(\''+t.id+'\')">';
      h+='<div class="trip-bar" style="background:'+t.color+'"></div>';
      h+='<div class="trip-main"><div class="trip-name'+(t.status==='archived'?' archived':'')+'">'+esc(t.name)+'</div>';
      h+='<div class="trip-sub">'+esc(t.dates)+' · '+esc((sm&&sm.resort)||t.sub)+'</div></div>';
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
  if(!S._who){S._who=new Set(preselected==='all'||!preselected?ALL_IDS:preselected);}
  var h='<div class="field"><label class="field-label">Who is this for? <span class="opt">(defaults to everyone)</span></label><div class="whoselect">';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i],on=S._who.has(p.id);
    h+='<div class="who-opt'+(on?' on':'')+'" onclick="toggleWho(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+p.name[0]+'</span>'+esc(p.name)+'<span class="wcheck">'+IC.checkw.replace('currentColor','#15803D')+'</span></div>';
  }
  return h+'</div></div>';
}
function toggleWho(id){if(S._who.has(id))S._who.delete(id);else S._who.add(id);
  var host=document.getElementById('screen-host');var s=host&&host.firstChild;var inClass=s&&s.classList.contains('in');
  renderScreen_inplace();
}
function renderScreen_inplace(){var host=document.getElementById('screen-host');host.innerHTML=renderScreen();var s=host.firstChild;if(s)s.classList.add('in');}

function dayOptions(sel){var h='';for(var i=0;i<DAYS.length;i++){var d=DAYS[i];h+='<option value="'+d.date+'"'+(d.date===sel?' selected':'')+'>Jul '+d.d+' · '+d.dl+' · '+PARKS[d.park].name+'</option>';}return h;}

/* Add Flight (with connecting leg) */
function scrAddFlight(){
  var edit=S.screen.edit?FLIGHTS.filter(function(f){return f.id===S.screen.edit;})[0]:null;
  var pre=edit?edit.who:'all';
  var legs=S.formLegs;
  var body='';
  body+='<div class="field"><label class="field-label">Journey label <span class="opt">(optional)</span></label><input class="field-input" id="ff-label" placeholder="e.g. Outbound, Return — Nancy & Cian" value="'+(edit?esc(edit.label):'')+'"></div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg">';
  body+='<button class="seg-btn'+((!edit||edit.status==='planning')?' on':'')+'" id="ff-st-plan" onclick="pickStatus(\'ff\',\'planning\')">Planning</button>';
  body+='<button class="seg-btn'+((edit&&edit.status==='booked')?' on book':'')+'" id="ff-st-book" onclick="pickStatus(\'ff\',\'booked\')">Booked</button></div></div>';
  body+=whoSelectField(pre);
  body+='<div class="field"><label class="field-label">Appears on day</label><select class="field-select" id="ff-day">'+dayOptions(S.screen.day||'2026-07-14')+'</select></div>';
  for(var i=0;i<legs;i++){
    var lg=edit&&edit.legs[i]?edit.legs[i]:null;
    body+='<div class="field-group"><div class="field-group-title">Leg '+(i+1)+(i>0?' <span style="text-transform:none;font-weight:600;color:#B91C1C;cursor:pointer" onclick="removeLeg()">Remove</span>':'')+'</div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">Airline</label><input class="field-input" placeholder="Southwest" value="'+(lg?esc(lg.airline):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Flight #</label><input class="field-input" placeholder="WN 4657" value="'+(lg?esc(lg.num):'')+'"></div></div>';
    body+='<div class="field"><label class="field-label">Confirmation code</label><input class="field-input" placeholder="2X4F9K" value="'+(lg?esc(lg.conf):'')+'"></div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">From</label><input class="field-input" placeholder="BOS" value="'+(lg?esc(lg.depApt):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Depart</label><input class="field-input" placeholder="5:45 AM" value="'+(lg?esc(lg.depTime):'')+'"></div></div>';
    body+='<div class="field-row"><div class="field"><label class="field-label">To</label><input class="field-input" placeholder="MCO" value="'+(lg?esc(lg.arrApt):'')+'"></div>';
    body+='<div class="field"><label class="field-label">Arrive</label><input class="field-input" placeholder="11:50 AM" value="'+(lg?esc(lg.arrTime):'')+'"></div></div>';
    body+='</div>';
  }
  body+='<button class="add-connecting" onclick="addLeg()">'+IC.plus+' Add connecting leg</button>';
  if(edit) body+='<button class="btn-danger-link" onclick="toast(\'Flight removed\');closeScreen()">Delete this flight</button>';
  return screenShell(edit?'Edit Flight':'Add Flight',body,'Save','saveFlight()');
}
function addLeg(){S.formLegs=(S.formLegs||1)+1;renderScreen_inplace2();}
function removeLeg(){S.formLegs=Math.max(1,(S.formLegs||1)-1);renderScreen_inplace2();}
function renderScreen_inplace2(){var host=document.getElementById('screen-host');host.innerHTML=renderScreen();var s=host.firstChild;if(s)s.classList.add('in');}
S._formStatus={};
function pickStatus(form,val){S._formStatus[form]=val;renderScreen_inplace2();}
function saveFlight(){toast('Flight saved');S._who=null;closeScreen();}

/* Add Dining */
function scrAddDining(){
  var body='';
  body+='<div class="field"><label class="field-label">Restaurant</label><input class="field-input" id="dd-name" placeholder="e.g. Space 220"></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Meal</label><select class="field-select"><option>Breakfast</option><option>Lunch</option><option selected>Dinner</option><option>Drinks</option><option>Snack</option></select></div>';
  body+='<div class="field"><label class="field-label">Time</label><input class="field-input" placeholder="6:45 PM"></div></div>';
  body+='<div class="field"><label class="field-label">Status</label><div class="seg">';
  body+='<button class="seg-btn on" onclick="pickStatus(\'dd\',\'want\')">Want to Try</button>';
  body+='<button class="seg-btn'+(S._formStatus.dd==='reserved'?' on book':'')+'" onclick="pickStatus(\'dd\',\'reserved\')">Reserved</button></div></div>';
  if(S._formStatus.dd==='reserved') body+='<div class="field"><label class="field-label">Confirmation #</label><input class="field-input" placeholder="DR-118455"></div>';
  body+='<div class="field"><label class="field-label">Location</label><div class="seg"><button class="seg-btn on" onclick="toast(\'In-Park\')">In-Park</button><button class="seg-btn" onclick="toast(\'Off-Site\')">Off-Site</button></div></div>';
  body+=whoSelectField('all');
  body+='<div class="field"><label class="field-label">Appears on day</label><select class="field-select">'+dayOptions(S.screen.day||'2026-07-15')+'</select></div>';
  return screenShell('Add Dining',body,'Save','saveDining()');
}
function saveDining(){
  var nm=document.getElementById('dd-name');
  if(nm&&nm.value.trim()){DINING.push({id:'d'+Date.now(),day:S.screen.day||'2026-07-15',meal:'Dinner',name:nm.value.trim(),time:'TBD',loc:'in',park:DAYS_BY_DATE[S.screen.day||'2026-07-15'].park,status:S._formStatus.dd==='reserved'?'reserved':'want',conf:'',who:'all'});}
  toast('Dining saved');S._who=null;S._formStatus.dd=null;closeScreen();render();
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
  return screenShell('Update Lightning Lane',body,'Mark Booked','saveLLBook()');
}
function saveLLBook(){
  var l=LLS.filter(function(x){return x.id===S.screen.id;})[0];
  var tm=document.getElementById('llb-time'),cf=document.getElementById('llb-conf');
  l.status='booked';
  l.bookedTime=(tm&&tm.value.trim())||l.window.replace(/[~]/g,'').split('–')[0].trim();
  l.conf=(cf&&cf.value.trim())||'MP-'+Math.floor(10000+Math.random()*89999);
  S._who=null;toast(l.ride+' booked');closeScreen();render();
}
function scrAddLL(){
  var body='<div class="field"><label class="field-label">Ride</label><input class="field-input" placeholder="e.g. Peter Pan\'s Flight"></div>';
  body+='<div class="field"><label class="field-label">Tier</label><div class="seg"><button class="seg-btn on">SP</button><button class="seg-btn">T1</button><button class="seg-btn">T2</button></div></div>';
  body+='<div class="field"><label class="field-label">Planned window</label><input class="field-input" placeholder="~3:00–4:00 PM"></div>';
  body+=whoSelectField('all');
  body+='<div class="field"><label class="field-label">Day</label><select class="field-select">'+dayOptions(S.screen.day)+'</select></div>';
  return screenShell('Add Ride',body,'Save','toast(\'Ride added\');closeScreen()');
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
  body+='<div class="field"><label class="field-label">Trip name</label><input class="field-input" placeholder="e.g. Thanksgiving 2026"></div>';
  body+='<div class="field-row"><div class="field"><label class="field-label">Start date</label><input class="field-input" placeholder="Nov 24, 2026"></div>';
  body+='<div class="field"><label class="field-label">End date</label><input class="field-input" placeholder="Nov 29, 2026"></div></div>';
  body+='<div class="hub-section-label" style="margin-left:0">Start from your template?</div>';
  body+=tmplCard('mine','My template','Last updated Oct 2025 · each person\'s packing & to-do pre-loaded',true);
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
function createTrip(){toast('Trip created from '+(S.newTmpl==='mine'?'your template':'blank')+'');closeScreen();}

/* Settings */
function scrSettings(){
  var body='<div class="hub-section-label" style="margin-left:0">I am…</div>';
  body+='<div class="whoselect" style="margin-bottom:16px">';
  for(var i=0;i<FAMILY.length;i++){var p=FAMILY[i],on=S.persona===p.id;
    body+='<div class="who-opt'+(on?' on':'')+'" onclick="setPersona(\''+p.id+'\')"><span class="wdot" style="background:'+p.color+'">'+p.name[0]+'</span>'+esc(p.name)+(p.admin?' · Admin':'')+'</div>';
  }
  body+='</div>';
  body+='<div class="body-empty" style="text-align:left;padding:0 2px 14px">Persona is stored on this device — no login. The admin (Scott) can edit park assignments, resort and dates; everyone can add and edit everything else.</div>';
  body+=hubRow(['Templates',IC.suitcase,'#92400E','Packing & to-do masters','tmpl']);
  body+=hubRow(['Family Members',IC.home,'#1C3A5E','5 people','family']);
  body+='<button class="btn-secondary" onclick="if(confirm(\'Reset all saved data on this device?\')){localStorage.clear();location.reload();}">Reset local data</button>';
  return screenShell('Settings',body,null,null,'Done');
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
    parkres:['Park Reservations',IC.ticket,'#0F5F73'], visits:['Park Visits',IC.map,'#3B7549']
  };
  var m=map[sec]||['Section',IC.route,'var(--ink)'];
  var body='';
  if(sec==='dining'){
    for(var i=0;i<DAYS.length;i++){var din=diningFor(DAYS[i].date);if(!din.length)continue;
      body+=dayHd(DAYS[i].date);for(var j=0;j<din.length;j++)body+='<div class="ov-card'+(isPlanningStatus(din[j].status)?' planning':'')+'">'+diningRow(din[j])+'</div>';}
    body+='<button class="btn-primary" onclick="openScreen({type:\'adddining\',day:\'2026-07-15\'})">'+'Add dining</button>';
  }else if(sec==='addflight'){
    for(var i2=0;i2<DAYS.length;i2++){var fl=flightsFor(DAYS[i2].date);if(!fl.length)continue;
      body+=dayHd(DAYS[i2].date);for(var j2=0;j2<fl.length;j2++)body+='<div class="ov-card'+(isPlanningStatus(fl[j2].status)?' planning':'')+'">'+flightJourney(fl[j2],DAYS_BY_DATE[DAYS[i2].date])+'</div>';}
    body+='<button class="btn-primary" onclick="openScreen({type:\'addflight\',day:\'2026-07-14\'})">Add flight</button>';
  }else if(sec==='ll'){
    body=ovLL();body+='<button class="btn-primary" onclick="openScreen({type:\'addll\',day:\'2026-07-16\'})">Add ride</button>';
  }else if(sec==='resort'){
    body=ovResort();body+='<button class="btn-primary" onclick="toast(\'Add resort stay\')">Add resort stay</button>';
  }else if(sec==='parkres'){
    body=ovParkRes();body+='<button class="btn-primary" onclick="toast(\'Add park reservation\')">Add reservation</button>';
  }else if(sec==='visits'){
    for(var i3=0;i3<DAYS.length;i3++){var d=DAYS[i3];
      body+='<div class="ov-card"><div class="din-row"><div style="flex:1"><div class="din-name">Jul '+d.d+' · '+d.dl+'</div><div class="din-time">'+esc(d.visit)+'</div></div>'
        +'<span class="inpark-badge" style="background:'+PARKS[d.park].color+'">'+PARKS[d.park].short+'</span>'+(d.park2?'<span class="inpark-badge" style="background:'+PARKS[d.park2].color+';margin-left:4px">'+PARKS[d.park2].short+'</span>':'')+'</div></div>';
    }
  }
  return screenShell(m[0],body,null,null,'Done');
}
function scrGeneric(){return screenShell('Coming soon','<div class="body-empty">This section editor is part of the full build.</div>',null,null,'Done');}

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
render();
