/* ============================================================
   Baseline Tap — cloud layer (Firebase auth + data sync)
   Additive + guarded: if the Firebase SDK or config aren't present,
   window.CLOUD.enabled is false and the app runs exactly as before on
   localStorage.

   Two sync targets:
     • personal  → users/<uid>/kv        (your own devices, default)
     • family    → workspaces/<wid>/kv   (everyone who joined the code)
   The active target is the user's workspace id, stored on their profile
   (users/<uid>/meta/profile.wid) so all their devices follow the same one.
   Identity/selection keys stay device-local and are never synced.
   ============================================================ */
(function(){
  if(typeof firebase==='undefined'||typeof FIREBASE_CONFIG==='undefined'){
    window.CLOUD={enabled:false};
    return;
  }
  try{ firebase.initializeApp(FIREBASE_CONFIG); }catch(e){ /* already initialized */ }
  var auth=firebase.auth();
  /* Force Firestore to auto-detect long-polling. Its default WebChannel
     transport gets blocked by Edge/Safari tracking prevention and some
     incognito modes, so the very first read after sign-in hangs forever — and
     since the app only leaves the sign-in screen once that read returns, you
     end up authenticated but stuck behind the gate. Auto-detect falls back to
     long-polling when WebChannel is blocked. Must run before any other
     Firestore call. */
  try{ firebase.firestore().settings({experimentalAutoDetectLongPolling:true,merge:true}); }catch(e){}
  var C={enabled:true,user:null,ready:false,synced:false,applyingRemote:false,wid:null,wids:[],partyName:null,isSuper:false,isOwner:false,isMember:false,authUncertain:true,adminWid:null};
  var SUPER_EMAIL='millsi@gmail.com';   /* the one account that authorizes everyone else */
  function emailKey(e){return (e||'').trim().toLowerCase();}

  function db(){return firebase.firestore();}

  /* ── auth ──────────────────────────────────────────────── */
  C.signInGoogle=function(){
    var provider=new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'});
    /* Full-page redirect. Now that the app and authDomain are the same origin
       (both disney-trip-planner-447d7.web.app via Firebase Hosting), redirect's
       pending handshake is stored first-party and read back first-party on
       return — no cross-domain storage block. This is Firebase's recommended,
       most compatible flow: unlike signInWithPopup it doesn't relay its result
       through the hidden cross-origin auth iframe, which Edge/Safari tracking
       prevention stalls (popup completed but the result never reached the app,
       so a fresh browser looped straight back to the sign-in screen). We flag
       that a redirect is in flight so the next load collects the result. */
    /* Preview channels: the app origin differs from authDomain, so the
       redirect flow completes on the PRODUCTION origin and the result never
       reaches the preview page (silent bounce back to the login screen).
       The popup flow relays its result by messaging (SDK ≥10.9), which
       survives cross-origin, and Google already trusts the production
       authDomain — zero console setup. Production keeps the redirect flow
       (same-origin there, and popups historically stalled on Edge/Safari). */
    if(typeof dtpIsPreviewHost==='function'&&dtpIsPreviewHost()){
      return auth.signInWithPopup(provider).then(function(r){
        if(r&&r.user&&typeof toast==='function')toast('Signed in');
        return r;
      },function(e){
        if(typeof toast==='function')toast('Sign-in didn\'t complete ('+((e&&e.code)||'error')+') — if the popup was blocked, allow popups and retry, or test on a laptop browser');
        throw e;
      });
    }
    try{sessionStorage.setItem('dtp_redirecting','1');}catch(_){}
    return auth.signInWithRedirect(provider);
  };
  C.signOut=function(){return auth.signOut();};

  /* delete every synced data doc in the active space (a clean slate) —
     kv blobs AND per-item docs (items would otherwise resurrect on the
     next reconcile of any flagged collection) */
  C.wipe=function(){
    if(!C.user)return Promise.resolve();
    var col=kvCol();
    return col.get().then(function(snap){
      var dels=[];snap.forEach(function(d){dels.push(d.ref.delete());});
      return Promise.all(dels);
    }).then(function(){
      return itemsCol().get().then(function(snap){
        var dels=[];snap.forEach(function(d){dels.push(d.ref.delete());});
        return Promise.all(dels);
      }).catch(function(){});
    });
  };

  /* connectivity test: write a doc to your own space and read it back */
  C.ping=function(){
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    var ref=db().doc('users/'+C.user.uid+'/_diag/ping');
    var v='ok @ '+new Date().toLocaleTimeString();
    return ref.set({val:v,ts:Date.now()}).then(function(){return ref.get();}).then(function(s){return s.exists?s.data().val:'(missing)';});
  };

  /* ── Long-term backup mirror (per-account: users/<uid>/backups) ──────────
     Kept OUTSIDE the kv sync so big snapshots never bloat the synced doc, and
     covered by the existing users/<uid>/** rule (no rules change). One doc per
     snapshot avoids the 1 MiB single-doc limit. */
  C.saveBackup=function(id,obj){ if(!C.user)return Promise.resolve(false);
    return db().doc('users/'+C.user.uid+'/backups/'+id).set(obj).then(function(){return true;},function(){return false;}); };
  C.listBackups=function(){ if(!C.user)return Promise.resolve([]);
    return db().collection('users/'+C.user.uid+'/backups').get().then(function(snap){
      var a=[];snap.forEach(function(d){var x=d.data()||{};x.id=d.id;a.push(x);});
      a.sort(function(p,q){return (p.ts||0)-(q.ts||0);});return a;
    },function(){return [];}); };
  C.pruneBackups=function(keepIds){ if(!C.user)return Promise.resolve();
    var keep={};(keepIds||[]).forEach(function(i){keep[i]=1;});
    return db().collection('users/'+C.user.uid+'/backups').get().then(function(snap){
      var dels=[];snap.forEach(function(d){
        /* NEVER auto-delete a pinned cloud backup, regardless of what keepIds
           says. Root cause of "my pinned backup vanished from the cloud":
           keepIds was built ONLY from the daily-archive list, so a pinned
           manual snapshot (which lives in the separate rolling list) was
           deleted by the next day's archive mirror. The doc's own pinned flag
           is the final authority here — belt-and-suspenders with the caller
           now also including pinned ids in keepIds. */
        var x=d.data()||{};
        if(x.pinned)return;
        if(!keep[d.id])dels.push(d.ref.delete());
      });return Promise.all(dels);
    }).catch(function(){}); };
  /* delete ONE cloud backup by id — explicit user action only (never automatic) */
  C.deleteBackup=function(id){ if(!C.user||!id)return Promise.resolve(false);
    return db().doc('users/'+C.user.uid+'/backups/'+id).delete().then(function(){return true;},function(){return false;}); };

  /* ── sync engine ───────────────────────────────────────── */
  /* keys that must stay device-local */
  var LOCAL_ONLY={dtp_persona:1,dtp_tripId:1,dtp_partyId:1,dtp_chatseen:1,dtp_ver:1,dtp_wid:1,dtp_invite:1,dtp_adminWid:1};
  function syncable(k){return !!k&&k.indexOf('dtp_')===0&&k.indexOf('dtp__')!==0&&!LOCAL_ONLY[k];}
  /* the active key/value collection: family workspace if joined, else personal */
  /* the active key/value collection. adminWid (super-admin impersonation) wins,
     then the user's own party, else their personal space. */
  function kvCol(){var w=C.adminWid||C.wid;return w?db().collection('workspaces/'+w+'/kv'):db().collection('users/'+C.user.uid+'/kv');}
  function profileRef(){return db().doc('users/'+C.user.uid+'/meta/profile');}
  function loadTimes(){try{return JSON.parse(localStorage.getItem('dtp__synctimes')||'{}');}catch(e){return {};}}
  function saveTimes(t){try{localStorage.setItem('dtp__synctimes',JSON.stringify(t));}catch(e){}}
  function localKeys(){var a=[],i,k;for(i=0;i<localStorage.length;i++){k=localStorage.key(i);if(syncable(k))a.push(k);}return a;}
  /* Wipe ALL local app state. Used when a different account takes over this
     browser, so one account's data can never bleed into another's via merge.
     Keeps dtp__lastuid (the account marker) — everything else dtp_* goes. */
  function wipeLocalState(){
    try{
      var rm=[],i,k;
      for(i=0;i<localStorage.length;i++){k=localStorage.key(i);if(k&&k.indexOf('dtp_')===0&&k!=='dtp__lastuid')rm.push(k);}
      for(i=0;i<rm.length;i++){try{localStorage.removeItem(rm[i]);}catch(e){}}
    }catch(e){}
  }
  function doRehydrate(){
    C.applyingRemote=true;
    try{ if(typeof rehydrate==='function')rehydrate(); }catch(e){}
    C.applyingRemote=false;
  }
  function setLocalWid(w){C.wid=w||null;try{w?localStorage.setItem('dtp_wid',w):localStorage.removeItem('dtp_wid');}catch(e){}}
  /* keep both fields in sync: wids = every tenant this user belongs to, wid =
     the one they're actively looking at. Helpers update both with one write. */
  function addToWids(w){if(!w)return;if(C.wids.indexOf(w)<0)C.wids.push(w);}
  function removeFromWids(w){C.wids=C.wids.filter(function(x){return x!==w;});}
  function writeWidsProfile(extra){
    var p={wid:C.wid,wids:C.wids.slice()};
    if(extra)Object.keys(extra).forEach(function(k){p[k]=extra[k];});
    return profileRef().set(p,{merge:true}).catch(function(){});
  }
  /* Workspace join codes are the only secret protecting a tenant (the rules
     allow self-join by anyone holding the code), so they must be strong. The
     old Math.random().toString(36) version was predictable (non-crypto PRNG)
     and often SHORTER than 8 chars (toString(36) drops trailing zeros) —
     well under 41 bits. Now: crypto-random, 12 chars from an unambiguous
     30-symbol alphabet (no 0/O/1/I/L) ≈ 59 bits. Existing codes keep working;
     this only affects newly created tenants. */
  function newCode(){
    var AB='ABCDEFGHJKMNPQRSTUVWXYZ2345678',out='';
    try{
      var buf=new Uint32Array(12);crypto.getRandomValues(buf);
      for(var i=0;i<12;i++)out+=AB[buf[i]%AB.length];
      return out;
    }catch(e){ /* ancient browser fallback — still better than 8 chars */
      for(var j=0;j<12;j++)out+=AB[Math.floor(Math.random()*AB.length)];
      return out;
    }
  }

  /* mirror a single local save up to the active target.
     CRITICAL: record the local recency for EVERY genuine local write, even when
     we cannot push right now (signed out, or mid-reconcile with synced=false).
     If we only stamped the time on a successful push, an edit made during a
     sync gap would keep its OLD timestamp — so the next reconcile would see the
     cloud copy as "newer or equal" and silently overwrite the edit that never
     got pushed. Stamping it as the latest makes the merge push it up instead of
     clobbering it. The actual upload, when we can't do it now, is handled by the
     next reconcile (which re-pushes every key whose local ts beats the cloud). */
  C.push=function(k,v){
    if(C.applyingRemote||!syncable(k))return;   /* never re-stamp remote-applied writes */
    /* per-item mode: the blob is a local cache; sync the changed ITEMS instead.
       No kv timestamp is stamped — reconcile's shadow diff is the recovery
       path for edits made while offline/unsynced, not dtp__synctimes. */
    var col=itemModeKey(k);
    if(col){
      if(C.synced&&C.user&&Array.isArray(v))pushAllDirty(col,v);
      return;
    }
    var ts=Date.now();
    var times=loadTimes(); times[k]=ts; saveTimes(times);
    if(!C.synced||!C.user)return;               /* recency recorded; reconcile will upload it */
    _pushKey(k,JSON.stringify(v),ts,0);
  };
  /* Actually write one key to the cloud, with retry. The previous version was
     fire-and-forget and swallowed the async rejection, so a single failed write
     (transient network error, or the doc hitting Firestore's ~1 MB limit — most
     likely on the big dtp_days record) vanished silently while smaller records
     like dtp_dining went up fine. Now we retry transient failures a few times
     and record the last error so it's observable. A retry is skipped if a newer
     local write has already superseded this one (times[k] changed). */
  function _pushKey(k,vs,ts,attempt){
    try{
      kvCol().doc(k).set({v:vs,ts:ts}).then(function(){
        C._lastPushErr=null;
      },function(e){
        var t=loadTimes(); if((t[k]||0)!==ts) return;   /* superseded by a newer edit */
        if(attempt<3){ setTimeout(function(){ var t2=loadTimes(); if((t2[k]||0)===ts) _pushKey(k,vs,ts,attempt+1); }, 1500*(attempt+1)); }
        else { C._lastPushErr={key:k,msg:(e&&e.message)||'write failed',at:Date.now()}; console.warn('cloud push failed',k,e&&e.message); try{if(typeof onSyncPushFailed==='function')onSyncPushFailed(C._lastPushErr);}catch(_h){} }
      });
    }catch(e){ C._lastPushErr={key:k,msg:(e&&e.message)||'write threw',at:Date.now()}; console.warn('cloud push',k,e&&e.message); try{if(typeof onSyncPushFailed==='function')onSyncPushFailed(C._lastPushErr);}catch(_h){} }
  }
  /* AWAITED single-key push, for flows that must KNOW the write landed before
     moving on (backup restore). Unlike C.push (fire-and-forget), this returns a
     promise resolving true/false. `vs` is the already-serialized JSON string.
     The local recency stamp happens unconditionally, exactly like C.push, so
     even a failed upload is re-pushed by the next reconcile instead of losing
     to the stale cloud copy. */
  C.pushNow=function(k,vs){
    if(!syncable(k))return Promise.resolve(true);   /* nothing to sync — not a failure */
    /* per-item mode (restore path): the restore already wrote the blob to
       localStorage; diff it against the shadow and await every item push +
       tombstone, so the caller's durability guarantee holds per item. */
    var colN=itemModeKey(k);
    if(colN){
      if(!C.user)return Promise.resolve(false);
      var arr;try{arr=JSON.parse(vs);}catch(e){arr=null;}
      if(!Array.isArray(arr))return Promise.resolve(false);
      return pushAllDirty(colN,arr);
    }
    var ts=Date.now();
    var times=loadTimes(); times[k]=ts; saveTimes(times);
    if(!C.user)return Promise.resolve(false);
    return kvCol().doc(k).set({v:vs,ts:ts}).then(function(){C._lastPushErr=null;return true;},function(e){
      C._lastPushErr={key:k,msg:(e&&e.message)||'write failed',at:Date.now()};
      console.warn('cloud pushNow failed',k,e&&e.message);
      try{if(typeof onSyncPushFailed==='function')onSyncPushFailed(C._lastPushErr);}catch(_h){}
      return false;
    });
  };
  /* Suspend live sync (listener + pushes) around a bulk local mutation like a
     backup restore, so an in-flight remote snapshot can't interleave with (and
     partially overwrite) the keys being written. resumeSync() runs a full merge
     reconcile, which re-pushes anything whose local stamp is newest and then
     restarts the listener. */
  C.pauseSync=function(){ stopListener(); C.synced=false; };
  C.resumeSync=function(){ if(!C.user)return Promise.resolve(); return reconcile('merge').catch(function(e){ console.warn('resumeSync reconcile failed:',e&&e.message); }); };

  /* ══ Per-item sync engine (audit F-01 Tier B) ═══════════════════════════
     For flagged collections, the sync unit is ONE ITEM, not the whole blob:
     each item lives in its own doc at <space>/items/<col>__<id>, so two
     people editing DIFFERENT items can never overwrite each other. Only an
     edit to the literal same item in the same window is still last-write-
     wins — the accepted residual. The localStorage blob stays exactly as it
     is (app code and rehydrate() are unchanged); it just becomes a local
     cache instead of the thing that syncs.

     Per-collection flags live in <space>/meta/itemsync {dining:true,...} —
     read at every reconcile. Flag OFF (or unreadable, e.g. rules not yet
     deployed) = engine dormant, blob mode exactly as before. Old-build
     devices simply keep blob mode: they go stale on flagged collections but
     can never corrupt them (reconcile here skips flagged keys in kv).

     THE INVARIANT everything rests on: the shadow (dtp__itemshadow_<col>,
     device-local) holds the last CLOUD-CONFIRMED state of each item. Shadow
     entries are only ever updated by a confirmed push or an applied remote
     doc — never optimistically. "Local item differs from shadow" therefore
     means exactly "this device has an unsynced edit", and reconcile can
     always recompute what to push after any offline gap, crash, or failed
     write. Deletes are tombstones (del:true) so a stale offline copy can
     never resurrect a deleted item; a genuine EDIT beats a delete in both
     directions (family-friendly: content wins over absence). */
  var ITEM_COLS={dining:'dtp_dining',lls:'dtp_lls',shows:'dtp_shows',parades:'dtp_parades',flights:'dtp_flights',resorts:'dtp_resorts',parkres:'dtp_parkres',tickets:'dtp_tickets',passes:'dtp_passes',rebooks:'dtp_rebooks'};
  var KEY_TO_COL={}; Object.keys(ITEM_COLS).forEach(function(c){KEY_TO_COL[ITEM_COLS[c]]=c;});
  C._itemFlags={};
  C.itemCols=function(){return Object.keys(ITEM_COLS);};
  C.itemMode=function(col){return !!C._itemFlags[col];};
  function itemModeKey(k){var c=KEY_TO_COL[k];return (c&&C._itemFlags[c])?c:null;}
  function anyItemMode(){for(var c in C._itemFlags)if(C._itemFlags[c]&&ITEM_COLS[c])return true;return false;}
  function spacePath(){var w=C.adminWid||C.wid;return w?'workspaces/'+w:'users/'+C.user.uid;}
  function itemsCol(){return db().collection(spacePath()+'/items');}
  function itemDocRef(col,id){return db().doc(spacePath()+'/items/'+col+'__'+id);}
  function itemFlagsRef(){return db().doc(spacePath()+'/meta/itemsync');}
  function svTs(){try{return firebase.firestore.FieldValue.serverTimestamp();}catch(e){return Date.now();}}
  function tsMillis(x){if(!x)return 0;if(typeof x==='number')return x;if(typeof x.toMillis==='function'){try{return x.toMillis();}catch(e){return 0;}}return 0;}
  /* key-order-independent serialization — the equality test behind "dirty" */
  function stableSer(o){
    if(o===null||typeof o!=='object')return JSON.stringify(o);
    if(Array.isArray(o)){var a=[];for(var i=0;i<o.length;i++)a.push(stableSer(o[i]===undefined?null:o[i]));return '['+a.join(',')+']';}
    var ks=Object.keys(o).filter(function(k){return o[k]!==undefined;}).sort();
    return '{'+ks.map(function(k){return JSON.stringify(k)+':'+stableSer(o[k]);}).join(',')+'}';
  }
  function shadowKey(col){return 'dtp__itemshadow_'+col;}
  function loadShadow(col){try{return JSON.parse(localStorage.getItem(shadowKey(col))||'{}');}catch(e){return {};}}
  function saveShadow(col,s){try{localStorage.setItem(shadowKey(col),JSON.stringify(s));}catch(e){}}
  function readBlob(col){var a;try{a=JSON.parse(localStorage.getItem(ITEM_COLS[col])||'[]');}catch(e){a=[];}return Array.isArray(a)?a:[];}
  function writeBlobRemote(col,arr){C.applyingRemote=true;try{localStorage.setItem(ITEM_COLS[col],JSON.stringify(arr));}catch(e){}C.applyingRemote=false;}
  function newItemId(){
    var AB='abcdefghjkmnpqrstuvwxyz23456789',out='i'+Date.now().toString(36);
    try{var b=new Uint32Array(6);crypto.getRandomValues(b);for(var i=0;i<6;i++)out+=AB[b[i]%AB.length];}
    catch(e){out+=Math.random().toString(36).slice(2,8);}
    return out;
  }
  /* every synced item needs a stable id; backfill in place AND persist, so a
     reload can never re-assign fresh ids (which would fork duplicates) */
  function ensureItemIds(col,arr){
    var changed=false;
    for(var i=0;i<arr.length;i++){var it=arr[i];if(it&&typeof it==='object'&&!it.id){it.id=newItemId();changed=true;}}
    if(changed){try{localStorage.setItem(ITEM_COLS[col],JSON.stringify(arr));}catch(e){}}
    return arr;
  }
  function itemDocBody(col,it,del){
    return {col:col,trip:(it&&it.trip)||null,v:del?null:JSON.stringify(it),del:!!del,
            by:(C.user&&C.user.uid)||null,build:(typeof BUILD!=='undefined'?BUILD:null),ts:svTs()};
  }
  /* push ONE item, with retry; the shadow is updated ONLY on confirmation.
     A retry re-reads the live blob first and aborts if the item changed
     meanwhile (a newer save's own push supersedes this one). */
  function pushItemDoc(col,it,attempt){
    attempt=attempt||0;
    if(!C.user||!it||!it.id)return Promise.resolve(false);
    var s=stableSer(it);
    if(attempt>0){
      var cur=null,blob=readBlob(col);
      for(var i=0;i<blob.length;i++)if(blob[i]&&blob[i].id===it.id){cur=blob[i];break;}
      if(!cur||stableSer(cur)!==s)return Promise.resolve(false);   /* superseded */
    }
    return itemDocRef(col,it.id).set(itemDocBody(col,it,false)).then(function(){
      var sh=loadShadow(col);sh[it.id]=s;saveShadow(col,sh);
      C._lastPushErr=null;return true;
    },function(e){
      if(attempt<3)return new Promise(function(res){setTimeout(res,1500*(attempt+1));}).then(function(){return pushItemDoc(col,it,attempt+1);});
      C._lastPushErr={key:'item:'+col+'/'+it.id,msg:(e&&e.message)||'write failed',at:Date.now()};
      console.warn('item push failed',col,it.id,e&&e.message);
      try{if(typeof onSyncPushFailed==='function')onSyncPushFailed(C._lastPushErr);}catch(_h){}
      return false;
    });
  }
  function pushTombstone(col,id,trip,attempt){
    attempt=attempt||0;
    if(!C.user||!id)return Promise.resolve(false);
    if(attempt>0){
      var blob=readBlob(col);
      for(var i=0;i<blob.length;i++)if(blob[i]&&blob[i].id===id)return Promise.resolve(false);   /* re-added meanwhile */
    }
    return itemDocRef(col,id).set(itemDocBody(col,{id:id,trip:trip||null},true)).then(function(){
      var sh=loadShadow(col);delete sh[id];saveShadow(col,sh);
      C._lastPushErr=null;return true;
    },function(e){
      if(attempt<3)return new Promise(function(res){setTimeout(res,1500*(attempt+1));}).then(function(){return pushTombstone(col,id,trip,attempt+1);});
      C._lastPushErr={key:'item:'+col+'/'+id,msg:(e&&e.message)||'tombstone failed',at:Date.now()};
      try{if(typeof onSyncPushFailed==='function')onSyncPushFailed(C._lastPushErr);}catch(_h){}
      return false;
    });
  }
  /* diff the (just-saved) array against the shadow and push every unsynced
     edit + a tombstone for every locally-deleted id. Called by C.push on
     every save of a flagged key, and by pushNow (awaited) after a restore.
     Safe to call repeatedly — confirmed pushes clear their own dirtiness. */
  function pushAllDirty(col,arr){
    ensureItemIds(col,arr);
    var shadow=loadShadow(col),seen={},ops=[],i,it;
    for(i=0;i<arr.length;i++){
      it=arr[i];if(!it||!it.id)continue;seen[it.id]=1;
      if(shadow[it.id]!==stableSer(it))ops.push(pushItemDoc(col,it));
    }
    Object.keys(shadow).forEach(function(id){
      if(!seen[id]){
        var trip=null;try{trip=(JSON.parse(shadow[id])||{}).trip||null;}catch(e){}
        ops.push(pushTombstone(col,id,trip));
      }
    });
    return Promise.all(ops).then(function(rs){return rs.every(function(r){return r!==false;});});
  }
  /* apply remote item docs (listener or reconcile pull) into the local blob.
     Local-dirty items always win here and re-push; the cloud converges to
     whoever wrote last, and no unsynced local edit is ever discarded. */
  function applyItemDocs(docs){
    var byCol={},changedCols=0;
    docs.forEach(function(d){var x=d.data;if(x&&x.col&&C._itemFlags[x.col]&&ITEM_COLS[x.col])(byCol[x.col]=byCol[x.col]||[]).push(d);});
    Object.keys(byCol).forEach(function(col){
      var blob=readBlob(col),shadow=loadShadow(col),changed=false;
      byCol[col].forEach(function(d){
        var id=d.id.slice(col.length+2),x=d.data,idx=-1,i;
        for(i=0;i<blob.length;i++)if(blob[i]&&blob[i].id===id){idx=i;break;}
        var localDirty=idx>=0&&shadow[id]!==stableSer(blob[idx]);
        if(x.del){
          if(idx>=0){
            if(localDirty){pushItemDoc(col,blob[idx]);return;}   /* edit beats delete */
            blob.splice(idx,1);delete shadow[id];changed=true;
          }else if(shadow[id]){delete shadow[id];}
          return;
        }
        var rit;try{rit=JSON.parse(x.v);}catch(e){rit=null;}
        if(!rit||!rit.id)return;
        var rs=stableSer(rit);
        if(idx>=0){
          if(stableSer(blob[idx])===rs){shadow[id]=rs;return;}   /* already have it */
          if(localDirty){pushItemDoc(col,blob[idx]);return;}     /* local unsynced edit wins */
          blob[idx]=rit;shadow[id]=rs;changed=true;
        }else{
          if(shadow[id]===rs)return;      /* locally deleted, no remote edit since — deletion stands */
          blob.push(rit);shadow[id]=rs;changed=true;   /* new remote item, or remote edit resurrecting a local delete */
        }
      });
      saveShadow(col,shadow);
      if(changed){writeBlobRemote(col,blob);changedCols++;}
    });
    return changedCols>0;
  }
  /* full two-way item reconcile for every flagged collection — the offline/
     crash recovery path. merge: shadow-diff decides push vs pull per item.
     adopt: cloud wins entirely (blob rebuilt from live docs). */
  function reconcileItems(mode){
    if(!anyItemMode()||!C.user)return Promise.resolve();
    return itemsCol().get().then(function(snap){
      var byCol={};
      snap.forEach(function(d){var x=d.data()||{};if(x.col&&C._itemFlags[x.col]&&ITEM_COLS[x.col])(byCol[x.col]=byCol[x.col]||[]).push({id:d.id,data:x});});
      var ops=[];
      Object.keys(C._itemFlags).forEach(function(col){
        if(!C._itemFlags[col]||!ITEM_COLS[col])return;
        var docs=byCol[col]||[];
        if(mode==='adopt'){
          var arr=[],sh={};
          docs.forEach(function(d){
            if(d.data.del)return;
            var it;try{it=JSON.parse(d.data.v);}catch(e){return;}
            if(!it||!it.id)return;
            arr.push(it);sh[it.id]=stableSer(it);
          });
          writeBlobRemote(col,arr);saveShadow(col,sh);
          return;
        }
        var blob=readBlob(col);ensureItemIds(col,blob);
        /* FIRST CONTACT with a flagged collection (no shadow on this device):
           we cannot tell local blob differences from staleness — the blob was
           kv-synced until now and the item docs were migrated from the group's
           freshest merge. Remote wins per item; local-ONLY items (ids the
           cloud has never seen) still push, so nothing added offline during
           the transition window is lost. Nothing is tombstoned. */
        var virgin=null;try{virgin=localStorage.getItem(shadowKey(col))===null;}catch(e){virgin=false;}
        var shadow=loadShadow(col);
        var remote={};docs.forEach(function(d){remote[d.id.slice(col.length+2)]=d.data;});
        var out=[],outShadow={},seen={};
        blob.forEach(function(it){
          if(!it||!it.id)return;seen[it.id]=1;
          var ls=stableSer(it),r=remote[it.id],dirty=!virgin&&shadow[it.id]!==ls;
          if(!r){
            if(shadow[it.id]&&!dirty)return;   /* was synced, doc purged remotely — treat as delete */
            out.push(it);ops.push(pushItemDoc(col,it));return;   /* new/edited here, never uploaded */
          }
          if(r.del){
            if(dirty){out.push(it);ops.push(pushItemDoc(col,it));}   /* edit beats delete */
            return;
          }
          var rit;try{rit=JSON.parse(r.v);}catch(e){rit=null;}
          var rs=rit?stableSer(rit):null;
          if(dirty){
            out.push(it);
            if(shadow[it.id]!==undefined)outShadow[it.id]=shadow[it.id];   /* keep OLD confirmed state until push lands */
            if(ls!==rs)ops.push(pushItemDoc(col,it));
            else outShadow[it.id]=rs;   /* both sides made the identical edit */
            return;
          }
          if(rit){out.push(rit);outShadow[it.id]=rs;}   /* clean here → remote wins */
        });
        Object.keys(remote).forEach(function(id){
          if(seen[id])return;
          var r=remote[id];
          if(r.del)return;
          var rit;try{rit=JSON.parse(r.v);}catch(e){return;}
          if(!rit||!rit.id)return;
          var rs=stableSer(rit);
          if(shadow[id]){                       /* in shadow but not in blob = deleted locally since last sync */
            if(shadow[id]===rs){outShadow[id]=shadow[id];ops.push(pushTombstone(col,id,rit.trip||null));return;}
            out.push(rit);outShadow[id]=rs;return;   /* remote edited it meanwhile — edit beats delete */
          }
          out.push(rit);outShadow[id]=rs;       /* brand-new remote item */
        });
        writeBlobRemote(col,out);saveShadow(col,outShadow);
      });
      return Promise.all(ops);
    });
  }
  function loadItemFlags(){
    if(!C.user)return Promise.resolve();
    return itemFlagsRef().get().then(function(s){
      C._itemFlags=(s.exists&&s.data())||{};
    },function(){/* unreadable (rules not deployed / offline) → keep last known; dormant if none */});
  }
  /* ── turning a collection on: the migration ─────────────────────────────
     Writes one doc per existing blob item (batched), verifies count parity
     by re-reading, and only THEN sets the flag. Interrupted halfway = flag
     never set = every device stays in blob mode; re-running is idempotent
     (same ids, same docs). The kv blob is left retired-but-present. */
  C.enableItemSync=function(col){
    if(!ITEM_COLS[col])return Promise.reject(new Error('Unknown collection: '+col));
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    var blob=readBlob(col);ensureItemIds(col,blob);
    var live=blob.filter(function(it){return it&&it.id;});
    var batches=[],cur=db().batch(),n=0;
    live.forEach(function(it){
      cur.set(itemDocRef(col,it.id),itemDocBody(col,it,false));n++;
      if(n>=400){batches.push(cur);cur=db().batch();n=0;}
    });
    if(n)batches.push(cur);
    return batches.reduce(function(p,b){return p.then(function(){return b.commit();});},Promise.resolve())
      .then(function(){return itemsCol().get();})
      .then(function(snap){
        var have=0;snap.forEach(function(d){var x=d.data()||{};if(x.col===col&&!x.del)have++;});
        if(have<live.length)throw new Error('Parity check failed: '+have+' docs for '+live.length+' items — flag NOT set');
        var upd={};upd[col]=true;
        return itemFlagsRef().set(upd,{merge:true});
      })
      .then(function(){
        C._itemFlags[col]=true;
        var sh={};live.forEach(function(it){sh[it.id]=stableSer(it);});
        saveShadow(col,sh);
        stopListener();startListener();
        return live.length;
      });
  };
  /* turning a collection off: freshen the kv blob from local (it went stale
     while item mode owned the collection), then clear the flag. Item docs
     are left in place — harmless, and re-enabling reuses them. */
  C.disableItemSync=function(col){
    if(!ITEM_COLS[col])return Promise.reject(new Error('Unknown collection: '+col));
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    var upd={};upd[col]=false;
    return itemFlagsRef().set(upd,{merge:true}).then(function(){
      C._itemFlags[col]=false;
      try{localStorage.removeItem(shadowKey(col));}catch(e){}
      var vs=null;try{vs=localStorage.getItem(ITEM_COLS[col]);}catch(e){}
      return vs!=null?C.pushNow(ITEM_COLS[col],vs):true;
    });
  };
  /* tombstones older than maxAgeMs have done their job (every device that
     will ever sync has seen them) — clear them out. Called from the app's
     once-a-day housekeeping. */
  C.purgeTombstones=function(maxAgeMs){
    if(!C.user||!anyItemMode())return Promise.resolve(0);
    maxAgeMs=maxAgeMs||30*24*3600*1000;
    var now=Date.now();
    return itemsCol().get().then(function(snap){
      var dels=[];
      snap.forEach(function(d){
        var x=d.data()||{};if(!x.del)return;
        var t=tsMillis(x.ts);
        if(t&&(now-t)>maxAgeMs)dels.push(d.ref.delete());
      });
      return Promise.all(dels).then(function(){return dels.length;});
    }).catch(function(){return 0;});
  };

  /* sync the local store against the active target.
       mode 'merge'  → last-write-wins per key, both directions (device sync)
       mode 'adopt'  → the target wins entirely (joining a family space) */
  function reconcile(mode,attempt){
    attempt=attempt||0;
    C.synced=false; stopListener();
    var col=kvCol();
    /* flags first: everything below must know which keys are item-mode.
       Flagged keys are EXCLUDED from the kv phase in both directions — their
       kv blob is retired-but-present (never pulled over local, never pushed) —
       and handled per item by reconcileItems() afterward. */
    return loadItemFlags().then(function(){ return col.get(); }).then(function(snap){
      var times=loadTimes(), cloud={};
      snap.forEach(function(d){ if(syncable(d.id)&&!itemModeKey(d.id))cloud[d.id]=d.data(); });
      C.applyingRemote=true;
      if(mode==='adopt'){
        localKeys().forEach(function(k){ if(itemModeKey(k))return; if(!(k in cloud)){ try{localStorage.removeItem(k);}catch(e){} delete times[k]; } });
        Object.keys(cloud).forEach(function(k){ try{localStorage.setItem(k,cloud[k].v);}catch(e){} times[k]=cloud[k].ts||Date.now(); });
        C.applyingRemote=false; saveTimes(times);
        return Promise.resolve();
      }
      var union={}; localKeys().forEach(function(k){union[k]=1;}); Object.keys(cloud).forEach(function(k){union[k]=1;});
      var pushes=[];
      Object.keys(union).forEach(function(k){
        if(itemModeKey(k))return;
        var c=cloud[k], cts=c?(c.ts||0):0, lts=times[k]||0, local=localStorage.getItem(k);
        if(c && cts>=lts){ try{localStorage.setItem(k,c.v);}catch(e){} times[k]=cts; }
        else if(local!=null){ var ts=lts||Date.now(); times[k]=ts; pushes.push(col.doc(k).set({v:local,ts:ts})); }
      });
      C.applyingRemote=false; saveTimes(times);
      return Promise.all(pushes);
    }).then(function(){
      return reconcileItems(mode);
    }).then(function(){
      C.synced=true; doRehydrate(); startListener();
    }).catch(function(e){
      /* col.get() (or a push) rejecting — most likely a token not fully
         attached to outgoing requests yet right after sign-in (transient
         PERMISSION_DENIED), or a network blip — left C.synced false and no
         listener attached, silently, until the next full sign-in. Retry with
         backoff instead of leaving the device stuck looking "synced" in the
         UI (authwait already closed by then) but never actually reconciled. */
      try{console.warn('[DTP-WIPE] reconcile('+mode+') failed (attempt '+attempt+'):',e&&e.message,{wid:C.wid});}catch(e2){}
      if(attempt<5){
        return new Promise(function(res){ setTimeout(res,1000*(attempt+1)); }).then(function(){ return reconcile(mode,attempt+1); });
      }
      try{console.warn('[DTP-WIPE] reconcile('+mode+') gave up after '+attempt+' retries.');}catch(e2){}
      throw e;
    });
  }

  /* live updates from other devices / members on the active target */
  var unsub=null, unsubItems=null, rht=null;
  function scheduleRehydrate(){ clearTimeout(rht); rht=setTimeout(doRehydrate,150); }
  function startListener(){
    if(!unsub){
      unsub=kvCol().onSnapshot(function(snap){
        if(!C.synced)return;
        var times=loadTimes(), changed=false;
        snap.docChanges().forEach(function(ch){
          if(ch.type==='removed')return;
          var d=ch.doc;
          if(d.metadata.hasPendingWrites)return;          /* skip our own write echoing back */
          var k=d.id; if(!syncable(k)||itemModeKey(k))return;   /* item-mode keys never sync as blobs */
          var data=d.data(), cts=data.ts||0, lts=times[k]||0;
          if(cts>lts){
            C.applyingRemote=true; try{localStorage.setItem(k,data.v);}catch(e){} C.applyingRemote=false;
            times[k]=cts; changed=true;
          }
        });
        if(changed){ saveTimes(times); scheduleRehydrate(); }
      },function(e){ console.warn('cloud listen',e&&e.message); });
    }
    if(!unsubItems&&anyItemMode()){
      unsubItems=itemsCol().onSnapshot(function(snap){
        if(!C.synced)return;
        var docs=[];
        snap.docChanges().forEach(function(ch){
          if(ch.type==='removed')return;
          var d=ch.doc;
          if(d.metadata.hasPendingWrites)return;          /* our own item write echoing back */
          docs.push({id:d.id,data:d.data()||{}});
        });
        if(docs.length&&applyItemDocs(docs))scheduleRehydrate();
      },function(e){ console.warn('item listen',e&&e.message); });
    }
  }
  function stopListener(){
    if(unsub){ try{unsub();}catch(e){} unsub=null; }
    if(unsubItems){ try{unsubItems();}catch(e){} unsubItems=null; }
  }

  /* ── planning party (shared workspace) ─────────────────── */
  C.inParty=function(){return !!C.wid;};
  C.partyCode=function(){return C.wid||null;};
  /* may this signed-in user use the app at all? super-admin, an allowlisted
     owner, or a current member of their active workspace. Re-evaluated on every
     sign-in by startSync so revoked users are locked out next time. */
  C.authorized=function(){return !!(C.isSuper||C.isOwner||C.isMember);};

  /* create a NEW tenant and switch onto it. An authorized owner may have more
     than one (e.g. they own their own AND contribute to someone else's); each
     create adds a new entry to wids and flips the active wid to the new one.
     The dedupe guard remains for fast double-taps. */
  C._creating=null;
  C.createParty=function(name){
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    if(C._creating)return C._creating;
    var wid=newCode(), nm=(name||'My Group');
    /* the tenant's stable label = the owner's display name (not the party name) */
    var tn=null;
    try{var fam=JSON.parse(localStorage.getItem('dtp_family')||'[]');var a=fam.filter(function(p){return p.admin;})[0]||fam[0];if(a&&a.name)tn=a.name+(a.lastName?' '+a.lastName:'');}catch(e){}
    if(!tn)tn=(C.user.email||'').split('@')[0]||null;
    var wref=db().doc('workspaces/'+wid);
    C._creating = wref.set({name:nm,tenantName:tn,by:C.user.uid,byEmail:C.user.email||null,createdAt:Date.now()})
      .then(function(){ return wref.collection('members').doc(C.user.uid).set({email:C.user.email||null,joinedAt:Date.now()}); })
      .then(function(){ C.isMember=true; setLocalWid(wid); C.partyName=nm; addToWids(wid); return writeWidsProfile(); })
      .then(function(){ return reconcile('merge'); })   /* push your data up into the new party */
      .then(function(){ C._creating=null; return wid; }, function(e){ C._creating=null; throw e; });
    return C._creating;
  };

  /* create a brand-new EMPTY tenant for an account currently sitting in SOMEONE
     ELSE's tenant. Unlike createParty it must NOT push the host tenant's data
     into the new workspace (that copy-up is what spawned duplicate tenants). So
     it stops the listener and leaves sync SUPPRESSED (C.synced=false): it just
     creates an empty workspace + our membership and switches the active wid.
     The caller then seeds a blank owner locally (resetToBlank — no pushes fire
     while suppressed) and calls commitActive() to push that blank slate up into
     the new tenant and resume live sync. The host tenant is never written to. */
  C.createOwnTenant=function(name){
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    if(C._creating)return C._creating;
    var wid=newCode(), nm=(name||'My Group');
    var tn=(C.user.email||'').split('@')[0]||null;
    var wref=db().doc('workspaces/'+wid);
    stopListener();
    C.synced=false;                       /* hard-stop any C.push while we switch + seed */
    C._creating = wref.set({name:nm,tenantName:tn,by:C.user.uid,byEmail:C.user.email||null,createdAt:Date.now()})
      .then(function(){ return wref.collection('members').doc(C.user.uid).set({email:C.user.email||null,joinedAt:Date.now()}); })
      .then(function(){
        C.isMember=true;
        /* clear ALL host-tenant local cache (data + stale synctimes) so the
           seed-and-commit that follows starts from nothing — wipeLocalState
           drops dtp_wid too, so re-set it right after. */
        wipeLocalState();
        setLocalWid(wid); C.partyName=nm; addToWids(wid);
        return writeWidsProfile();
      })
      .then(function(){ C._creating=null; return wid; }, function(e){ C._creating=null; C.synced=true; throw e; });
    return C._creating;
  };
  /* resume sync on the active tenant, pushing whatever's in local up into it.
     Used right after createOwnTenant + a local reset to commit the fresh blank
     slate into the new (empty) workspace. */
  C.commitActive=function(){ return reconcile('merge'); };

  /* Detach the ACTIVE session from the current tenant WITHOUT leaving it: the
     cloud membership and the in-memory wids list stay intact, so the host tenant
     still appears in the switcher. Used when an authorized owner who is only a
     GUEST in someone else's tenant taps "Plan a New Trip" — we drop the active
     wid to null and suppress sync so the wizard runs TENANT-LESS, and its own
     createParty() then spins up a brand-new tenant named after the group they
     create (exactly like a first-time owner). The host tenant is never written
     to: C.synced=false gates every C.push, and wipeLocalState clears the host's
     local cache so the wizard starts from a clean slate. */
  C.detachActive=function(){
    stopListener();
    C.synced=false;
    wipeLocalState();
    C.wid=null;
    try{localStorage.removeItem('dtp_wid');}catch(e){}
    C.partyName=null;
    return Promise.resolve();
  };

  /* join an existing party by code and adopt its data */
  C.joinParty=function(code){
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    code=(code||'').trim().toUpperCase();
    if(!code)return Promise.reject(new Error('Enter a code'));
    var wref=db().doc('workspaces/'+code);
    return wref.get().then(function(s){
      if(!s.exists)throw new Error('No group with that code');
      C.partyName=s.data().name||null;
      return wref.collection('members').doc(C.user.uid).set({email:C.user.email||null,joinedAt:Date.now()});
    }).then(function(){ C.isMember=true; setLocalWid(code); addToWids(code); return writeWidsProfile(); })
      .then(function(){ return reconcile('adopt'); })   /* take on the party's data */
      .then(function(){ return code; });
  };

  /* rename the party you're in */
  C.renameParty=function(name){
    if(!C.user||!C.wid)return Promise.reject(new Error('Not in a group'));
    name=(name||'').trim();if(!name)return Promise.reject(new Error('Enter a name'));
    return db().doc('workspaces/'+C.wid).set({name:name},{merge:true}).then(function(){ C.partyName=name; return name; });
  };
  /* rename ANY tenant the user is a member of, by wid — not just the active one.
     Used by the tenant switcher's Rename chip so an owner can rename a tenant
     without first switching into it. Server rules permit any workspace member
     to update the doc, so we don't need a separate auth check here. */
  C.renameTenant=function(wid,name){
    if(!C.user||!wid)return Promise.reject(new Error('Sign in first'));
    name=(name||'').trim();
    if(!name)return Promise.reject(new Error('Enter a name'));
    return db().doc('workspaces/'+wid).set({name:name},{merge:true}).then(function(){
      if(wid===C.wid)C.partyName=name;
      return name;
    });
  };

  /* leave the active tenant. Removes the membership, drops it from wids, and
     auto-switches to another tenant in the list (or to no tenant if it was the
     last one — in which case the device returns to its personal copy). */
  C.leaveParty=function(){
    if(!C.user||!C.wid)return Promise.resolve();
    var wid=C.wid;
    return db().doc('workspaces/'+wid).collection('members').doc(C.user.uid).delete().catch(function(){})
      .then(function(){
        removeFromWids(wid);
        var next=C.wids[0]||null;
        setLocalWid(next); C.partyName=null;
        return writeWidsProfile();
      })
      .then(function(){
        if(C.wid)return db().doc('workspaces/'+C.wid).get().then(function(s){if(s.exists)C.partyName=s.data().name||null;}).catch(function(){});
      })
      .then(function(){ return reconcile('adopt'); });
  };

  /* ── email invite index (auto-join by email) ─────────────
     An email may have invites from MULTIPLE tenants at once (the same person can
     belong to several groups, with a different persona in each). Stored as a
     subcollection so each tenant owns one doc and can't stomp another's invite:
       invitesByEmail/<email>/from/<wid> → {persona, by, at}
     The signed-in account lists every invite for its own email; for each one
     it's not already a member of, it self-joins (autoJoinPendingInvite). */
  C.publishInvite=function(email,persona){
    if(!C.user||!C.wid)return Promise.resolve();
    email=emailKey(email); if(!email)return Promise.resolve();
    return db().doc('invitesByEmail/'+email+'/from/'+C.wid)
      .set({persona:persona||null,by:C.user.email||null,at:Date.now()})
      .catch(function(){});
  };
  /* clear an invite from OUR tenant for this email. The subcollection model
     means we only ever touch our own subdoc — no chance of stomping another
     owner's invite for the same email. */
  C.revokeInvite=function(email){
    if(!C.user)return Promise.resolve();
    email=emailKey(email); if(!email)return Promise.resolve();
    var w=C.adminWid||C.wid;
    if(!w)return Promise.resolve();
    return db().doc('invitesByEmail/'+email+'/from/'+w).delete().catch(function(){});
  };
  /* owner/super: remove a member from the active workspace so they lose access to
     the shared data. The server rules are the real boundary — this is what
     actually enforces "I removed them" (deleting the person record alone left
     their membership, and thus their write access, intact). */
  C.evictMember=function(uid){
    var w=C.adminWid||C.wid;
    if(!C.user||!w||!uid)return Promise.resolve();
    return db().doc('workspaces/'+w+'/members/'+uid).delete().catch(function(){});
  };
  /* manual "refresh from cloud" — drop any stale local cache and pull the
     authoritative tenant data back in. Useful when an account suspects its
     view is out of date (other devices reflect changes this one doesn't). A
     hard reload is the simplest, most reliable reset — sync runs fresh on
     boot and any divergence between local memory and cloud disappears. */
  C.refreshLocal=function(){
    try{location.reload();}catch(e){}
    return Promise.resolve();
  };

  /* every invite for the signed-in account's email, across all inviting tenants */
  C.findInvites=function(){
    if(!C.user||!C.user.email)return Promise.resolve([]);
    return db().collection('invitesByEmail/'+emailKey(C.user.email)+'/from').get()
      .then(function(snap){
        var arr=[];snap.forEach(function(d){var v=d.data()||{};arr.push({wid:d.id,persona:v.persona||null,by:v.by||null,at:v.at||0});});
        return arr;
      }).catch(function(){return [];});
  };
  /* one invite (the most recently published) — used by tryEmailInvite for the
     unauthorized-first-sign-in path where we just pick a tenant to land them in */
  C.findInvite=function(){
    return C.findInvites().then(function(arr){
      arr.sort(function(a,b){return (b.at||0)-(a.at||0);});
      return arr[0]||null;
    });
  };

  /* ── multi-tenant: list of tenants this user belongs to, with a switcher ─
     Each entry comes back with the wid, current display name, an active flag,
     and whether the user owns it (they're the creator). Used by the account
     screen to render the tenant list and the switch buttons. */
  C.listMyTenants=function(){
    if(!C.user||!C.wids||!C.wids.length)return Promise.resolve([]);
    var active=C.wid;
    return Promise.all(C.wids.map(function(w){
      return db().doc('workspaces/'+w).get().then(function(s){
        var d=(s.exists&&s.data())||{};
        return {wid:w,name:d.name||'(unnamed)',by:d.by||null,isActive:w===active,isOwner:d.by===C.user.uid};
      }).catch(function(){return {wid:w,name:'(unknown)',isActive:w===active,isOwner:false};});
    }));
  };

  /* switch the active tenant — flip wid + adopt that tenant's data locally */
  C.switchTenant=function(wid){
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    if(!wid||C.wids.indexOf(wid)<0)return Promise.reject(new Error('Not a member of that group'));
    if(wid===C.wid)return Promise.resolve();
    stopListener();
    setLocalWid(wid); C.partyName=null;
    return db().doc('workspaces/'+wid).get().then(function(s){
      if(s.exists)C.partyName=s.data().name||null;
      return writeWidsProfile();
    }).then(function(){
      return db().doc('workspaces/'+wid+'/members/'+C.user.uid).get().then(function(m){
        C.isMember=m.exists;
      }).catch(function(){});
    }).then(function(){ return reconcile('adopt'); });
  };

  /* silently auto-join a pending email invite (for an authorized owner who's
     already in their own tenant). Adds the new tenant to wids but does NOT
     switch active — they keep seeing whatever they were on, and the new
     tenant shows up in the switcher next time they open Account. Returns the
     wid if newly joined, null otherwise. */
  C.autoJoinPendingInvite=function(){
    if(!C.user||!C.findInvites)return Promise.resolve({result:'none'});
    return C.findInvites().then(function(invites){
      try{console.log('[autoJoin] invites for',C.user.email,'→',invites,'wids',C.wids);}catch(e){}
      if(!invites.length)return {result:'none'};
      /* keep only invites for tenants we're not already a member of */
      var pending=invites.filter(function(inv){return inv.wid && C.wids.indexOf(inv.wid)<0;});
      if(!pending.length)return {result:'already',count:invites.length};
      /* self-join each pending tenant in parallel */
      var joins=pending.map(function(inv){
        return db().doc('workspaces/'+inv.wid+'/members/'+C.user.uid)
          .set({email:C.user.email||null,joinedAt:Date.now()})
          .then(function(){addToWids(inv.wid);return inv.wid;})
          .catch(function(e){try{console.warn('[autoJoin] join failed for',inv.wid,':',e&&e.message);}catch(_){}return null;});
      });
      return Promise.all(joins).then(function(wids){
        var joined=wids.filter(Boolean);
        if(!joined.length)return {result:'error',error:'all joins failed'};
        return writeWidsProfile().then(function(){
          try{console.log('[autoJoin] joined',joined,'wids now',C.wids);}catch(e){}
          return {result:'joined',wids:joined,count:joined.length};
        });
      });
    }).catch(function(e){
      try{console.warn('[autoJoin] failed:',e&&e.message);}catch(_){}
      return {result:'error',error:e&&e.message};
    });
  };

  window.CLOUD=C;

  /* Detach this account from any workspace and stop impersonating, returning it
     to its own personal space — and null the wid in the CLOUD profile so the
     next sign-in's startSync can't read a stale workspace id back and re-pull
     its data. Used when a fresh authorized owner is found sitting on a leftover
     workspace (e.g. demo data from earlier testing). Does NOT delete the
     workspace's own data; it just stops following it. */
  C.startFresh=function(){
    stopListener();
    C.adminWid=null; try{localStorage.removeItem('dtp_adminWid');}catch(e){}
    setLocalWid(null); C.partyName=null;
    if(!C.user)return Promise.resolve();
    /* clear the wids list too — startFresh is the "demo-seed owner, no real
       data" reset, so there's nothing meaningful to preserve in the tenant
       list either. */
    C.wids=[];
    return writeWidsProfile();
  };

  /* ── access control (invite-only) ──────────────────────── */
  C.isSuperAdmin=function(){return emailKey(C.user&&C.user.email)===SUPER_EMAIL;};
  /* the authorized-owner allowlist (only the super-admin can edit it) */
  C.listOwners=function(){return db().collection('owners').get().then(function(s){var a=[];s.forEach(function(d){a.push(d.id);});return a.sort();});};
  C.addOwner=function(email){email=emailKey(email);if(!email)return Promise.reject(new Error('Enter an email'));return db().doc('owners/'+email).set({by:C.user.email||null,at:Date.now()}).then(function(){return email;});};
  C.removeOwner=function(email){email=emailKey(email);return db().doc('owners/'+email).delete();};

  /* ── super-admin console (cross-tenant) ────────────────── */
  /* every workspace (tenant), with owner email + member count */
  C.listWorkspaces=function(){
    if(!C.isSuper)return Promise.reject(new Error('Super-admin only'));
    return db().collection('workspaces').get().then(function(snap){
      var jobs=[];
      snap.forEach(function(d){
        var w=d.data()||{};
        jobs.push(Promise.all([
          d.ref.collection('members').get(),
          d.ref.collection('kv').doc('dtp_family').get(),
          d.ref.collection('kv').doc('dtp_parties').get()
        ]).then(function(res){
          var ms=res[0];
          var owner=w.byEmail||null;
          ms.forEach(function(m){if(m.id===w.by&&m.data().email)owner=m.data().email;});
          var fam=[],parties=[];
          try{if(res[1].exists)fam=JSON.parse(res[1].data().v)||[];}catch(e){}
          try{if(res[2].exists)parties=JSON.parse(res[2].data().v)||[];}catch(e){}
          /* prefer the owner's full name composed from live family data so the
             tenant label isn't stuck on a first-name-only value captured at
             creation; fall back to the stored tenantName, then the email. */
          var ownerName=null;
          var a=fam.filter(function(p){return p.admin;})[0]||fam[0];
          if(a&&a.name)ownerName=a.name+(a.lastName?' '+a.lastName:'');
          if(!ownerName)ownerName=w.tenantName||null;
          if(!ownerName&&owner)ownerName=owner.split('@')[0];
          var partyNames=parties.map(function(g){return g&&g.name;}).filter(Boolean);
          return {wid:d.id,name:w.name||'(unnamed)',ownerName:ownerName||'(unnamed)',by:w.by||null,byEmail:owner,parties:partyNames,memberCount:ms.size,createdAt:w.createdAt||0};
        }).catch(function(){return {wid:d.id,name:w.name||'(unnamed)',ownerName:w.tenantName||(w.byEmail||'').split('@')[0]||'(unnamed)',by:w.by||null,byEmail:w.byEmail||null,parties:[],memberCount:0,createdAt:w.createdAt||0};}));
      });
      return Promise.all(jobs).then(function(list){return list.sort(function(a,b){return (b.createdAt||0)-(a.createdAt||0);});});
    });
  };
  /* read-only snapshot of a tenant's data (parsed key→value map) */
  C.readWorkspace=function(wid){
    if(!C.isSuper)return Promise.reject(new Error('Super-admin only'));
    return db().collection('workspaces/'+wid+'/kv').get().then(function(snap){
      var out={};
      snap.forEach(function(d){var v=d.data().v;try{out[d.id]=JSON.parse(v);}catch(e){out[d.id]=v;}});
      return out;
    });
  };
  /* switch INTO a tenant to manage it — no profile.wid change, no membership */
  C.enterWorkspace=function(wid){
    if(!C.isSuper)return Promise.reject(new Error('Super-admin only'));
    stopListener();C.adminWid=wid;
    try{localStorage.setItem('dtp_adminWid',wid);}catch(e){}   /* survive a restart → crash-safe */
    return reconcile('adopt');   /* loads tenant data locally + rehydrates + restarts listener */
  };
  /* switch back to the super's own space */
  C.exitWorkspace=function(){
    stopListener();C.adminWid=null;
    try{localStorage.removeItem('dtp_adminWid');}catch(e){}
    return reconcile('adopt');
  };
  /* permanently delete a tenant workspace (kv + members + doc). Super-admin only,
     and never the super's own active space. */
  C.deleteWorkspace=function(wid){
    if(!C.isSuper)return Promise.reject(new Error('Super-admin only'));
    if(wid&&wid===C.wid)return Promise.reject(new Error('That\'s your own active space'));
    var base=db().doc('workspaces/'+wid);
    var delAll=function(col){return base.collection(col).get().then(function(s){return Promise.all(s.docs.map(function(d){return d.ref.delete();}));});};
    return delAll('kv').then(function(){return delAll('members');}).then(function(){return base.delete();});
  };
  /* an owner deletes a tenant they created themselves. Refuses if the user is
     not the creator (and not super), and refuses on the active tenant — the
     caller must switch off it first to avoid operating on the data being
     removed. On success, prunes wids locally and writes profile. */
  C.deleteMyTenant=function(wid){
    if(!C.user||!wid)return Promise.reject(new Error('Sign in first'));
    if(wid===C.wid)return Promise.reject(new Error('Switch to a different group first'));
    var base=db().doc('workspaces/'+wid);
    return base.get().then(function(s){
      if(!s.exists)throw new Error('Group not found');
      var d=s.data()||{};
      if(d.by!==C.user.uid&&!C.isSuper)throw new Error('Only the group\'s creator can delete it');
      var delAll=function(col){return base.collection(col).get().then(function(ss){return Promise.all(ss.docs.map(function(dd){return dd.ref.delete();}));});};
      return delAll('kv').then(function(){return delAll('members');}).then(function(){return base.delete();});
    }).then(function(){
      removeFromWids(wid);
      return writeWidsProfile();
    });
  };

  /* read the user's chosen party + their access level, then sync */
  function startSync(){
    /* Account isolation on a shared browser. If a DIFFERENT account signed in
       last time, the synced data left in localStorage belongs to them — clear it
       before syncing, otherwise merge would push the previous owner's groups and
       people up into THIS account's space (that's how the test user ended up
       seeing "The Mills Family"). After wiping, this account's data is pulled
       fresh from the cloud. Same account again → no wipe, normal device sync. */
    try{
      var lastUid=localStorage.getItem('dtp__lastuid');
      if(C.user&&lastUid&&lastUid!==C.user.uid){ wipeLocalState(); C.adminWid=null; C.wid=null; C.wids=[]; C.partyName=null; }
      if(C.user)localStorage.setItem('dtp__lastuid',C.user.uid);
    }catch(e){}
    /* read both fields: wid = the user's ACTIVE tenant, wids = every tenant
       they belong to. Existing profiles only have wid — backfill wids from it
       so old accounts work without a migration step. */
    return profileRef().get().then(function(s){
      var d=(s.exists&&s.data())||{};
      C.wid=d.wid||null;
      C.wids=Array.isArray(d.wids)?d.wids.slice():(d.wid?[d.wid]:[]);
      /* If the active wid isn't in the list (legacy profile or write race), add
         it so the membership/eviction checks below process it. */
      if(C.wid&&C.wids.indexOf(C.wid)<0)C.wids.push(C.wid);
      setLocalWid(C.wid);
    }).catch(function(){
      /* CRITICAL: a transient failure reading the profile doc (network blip,
         token still refreshing right after sign-in) must NOT look identical to
         "this account genuinely has no workspace yet" — every other read in
         this function already fails safe (keeps the user in) for exactly that
         reason; this was the one place that failed closed instead. Sign-out
         already nulls the in-memory C.wid, so on the very next sign-in this
         read is the ONLY thing standing between "resume normally" and
         onCloudSynced()'s new-owner branch treating !inParty() (=!C.wid) as
         "no tenant yet" and calling resetToBlank() — wiping the whole device
         over one dropped read. Fall back to the wid this device last knew
         locally (untouched by sign-out, only the in-memory C.wid is nulled)
         instead of null, so a hiccup here resumes the existing workspace
         instead of looking like a first-time owner. */
      var fallback=null; try{fallback=localStorage.getItem('dtp_wid');}catch(e){}
      C.wid=fallback||null; C.wids=fallback?[fallback]:[];
    })
      .then(function(){
        /* Validate every wid in the user's tenant list. Two kinds of garbage to
           clean up here: workspaces that no longer exist on the server (tenant
           was deleted), and workspaces we used to be a member of but the owner
           has since evicted us from. Both get pruned. The active wid is recorded
           as evicted/missing so the next step can flip to a still-valid tenant
           (or to no tenant) without showing stale data. */
        if(!C.wids.length){C.partyName=null;return;}
        var info={};
        var checks=C.wids.map(function(w){
          return Promise.all([
            db().doc('workspaces/'+w).get().catch(function(){return null;}),
            (C.isSuperAdmin&&C.isSuperAdmin())
              ? Promise.resolve({exists:true})
              : db().doc('workspaces/'+w+'/members/'+C.user.uid).get().catch(function(){return null;})
          ]).then(function(rs){
            var ws=rs[0], mem=rs[1];
            info[w]={
              exists: ws ? ws.exists : true,        /* on read error, fail-safe = keep */
              isMember: mem ? mem.exists : true,    /* on read error, fail-safe = keep */
              name: (ws&&ws.exists)?(ws.data().name||null):null
            };
          });
        });
        return Promise.all(checks).then(function(){
          var validWids=C.wids.filter(function(w){return info[w].exists && info[w].isMember;});
          if(C.wid && info[C.wid] && info[C.wid].exists && info[C.wid].isMember){
            C.partyName=info[C.wid].name;
          }else{
            C.partyName=null;
          }
          if(validWids.length===C.wids.length)return;
          /* prune evicted/missing tenants from the list */
          var lostActive=!!C.wid && validWids.indexOf(C.wid)<0;
          C.wids=validWids;
          if(lostActive){
            /* Active tenant got pulled out from under us. Switch to whichever is
               left (deterministic — first remaining), or to no tenant. Wipe
               local synced state because the in-memory copy is the OLD tenant's
               data — without this it would push into whatever space we land on
               next and bleed across tenants. */
            try{console.warn('[DTP-WIPE] wids-validation: wipeLocalState() about to run — active wid lost.',{activeWid:C.wid,priorWids:C.wids.concat([C.wid]),validWids:validWids,info:info});}catch(e){}
            wipeLocalState();
            var next=C.wids[0]||null;
            setLocalWid(next); C.partyName=null;
            if(next && info[next]) C.partyName=info[next].name;
          }
          return writeWidsProfile().then(function(){
            /* If the active wid was lost and there's no replacement, reload so
               the app re-inits cleanly into its "no tenant" routing (an
               allowlisted owner → setup wizard, an unauthorized user → noaccess). */
            if(lostActive && !C.wid){try{location.reload();}catch(e){}}
          });
        });
      })
      .then(function(){
        /* Authorization on EVERY sign-in. authorized = super-admin, allowlisted
           owner, or current member of the active tenant. isMember is derived
           from the validation pass above (set true if the active wid survived
           the prune). authUncertain stays true on any read failure — a network
           hiccup must not lock out a legit user; the server rules are the real
           data boundary. */
        C.isSuper=C.isSuperAdmin();
        C.isOwner=false; C.authUncertain=true;
        C.isMember = !!C.wid;                /* surviving wid implies membership */
        if(C.isSuper){C.isOwner=true;C.authUncertain=false;return;}
        return db().doc('owners/'+emailKey(C.user.email)).get().then(function(d){
          C.isOwner=d.exists; C.authUncertain=false;
        }).catch(function(){C.authUncertain=true;});
      })
      .then(function(){
        /* crash-safety: if we force-quit mid-impersonation, dtp_adminWid is set.
           Don't resume into the other family — discard their leftover local data
           and pull our OWN space (adopt is pull-only, so it can never push their
           data into our cloud). Normal startup uses merge. */
        var stranded=null;try{stranded=localStorage.getItem('dtp_adminWid');}catch(e){}
        if(stranded){try{localStorage.removeItem('dtp_adminWid');}catch(e){}C.adminWid=null;return reconcile('adopt');}
        /* STALE-DATA GUARD: if we're entering a tenant but this device holds NO
           local trip data for it, PULL ONLY (adopt). A device with nothing local
           must never push its blank/default state up and clobber a tenant that
           another member has been filling in — that is how one fresh sign-in can
           wipe shared data. A device that already holds data uses merge, where
           per-key timestamps keep genuine offline edits (see CLOUD.push). */
        var hasLocal=false;
        try{var tj=localStorage.getItem('dtp_trips');hasLocal=!!tj&&((JSON.parse(tj)||[]).length>0);}catch(e){hasLocal=false;}
        if(C.wid&&!hasLocal)return reconcile('adopt');
        return reconcile('merge');
      });
  }

  /* reflect auth state in the UI and drive sync on/off */
  var _firstAuthResolve=true;   /* see the authwait lock below */
  auth.onAuthStateChanged(function(u){
    C.user=u; C.ready=true;
    if(u){
      /* Set isSuper synchronously from the user's email — this is a plain string
         comparison that never touches Firestore, so it can never fail or be delayed.
         If startSync() later rejects (blocked transport, permission error) before
         reaching its own isSuper assignment, the flag is already correct here and
         onCloudSynced will route the user in correctly. Without this, a Firestore
         failure before the isSuper assignment left the super-admin with isSuper=false
         and they bounced back to the login screen every time. */
      C.isSuper=C.isSuperAdmin();
      if(C.isSuper) C.isOwner=true;
      /* Lock the UI behind a "Signing you in…" gate until onCloudSynced routes
         this account to its real destination — otherwise the gap between auth
         resolving and the first sync finishing flashed whatever stale screen
         was underneath (sometimes the account hub with "Join with a code",
         which is misleading for users who clearly don't have access).
         On the FIRST auth resolution of this page load, force the gate open
         UNCONDITIONALLY — overriding whatever screen the user already tapped
         into. Before this point everything on screen (and anything they could
         have saved by interacting with it) is built from this device's local
         cache, which may be the unverified demo seed; the only safe move is to
         freeze input the moment we know a real sign-in is in flight, not just
         when the screen happens to already be empty/signin. Later re-resolves
         (e.g. a token refresh on an already-synced session) keep the narrower
         check so an active user mid-screen isn't yanked out from under
         themselves for no reason. */
      try{
        if(window.S&&typeof openScreen==='function'&&(_firstAuthResolve||!S.screen||S.screen.type==='signin'))
          openScreen({type:'authwait'});
      }catch(e){}
      _firstAuthResolve=false;
      /* Route the user in whether or not the first sync succeeds. The app is
         local-first and the super-admin/owner check is just an email lookup —
         a stumbling Firestore read (blocked transport, transient permission
         error) must NOT trap a signed-in user on the login screen. onCloudSynced
         runs either way; sync retries on its own afterward. */
      startSync().catch(function(e){ console.warn('initial cloud sync deferred:',e&&e.message); }).then(function(){
        try{ if(typeof onCloudSynced==='function')onCloudSynced(); }catch(e){}
        try{ if(window.S&&S.screen&&typeof renderScreen_inplace2==='function')renderScreen_inplace2(); }catch(e){}
      });
    }else{
      stopListener(); C.synced=false; C.wid=null;
      try{ if(typeof onCloudSignedOut==='function')onCloudSignedOut(); }catch(e){}
    }
    try{ if(typeof render==='function')render(); }catch(e){}
    try{ if(window.S&&S.screen&&typeof renderScreen_inplace2==='function')renderScreen_inplace2(); }catch(e){}
  });
  /* Finish a redirect-based Google sign-in ONLY if we actually left via one.
     getRedirectResult() spins up Firebase's cross-origin auth helper iframe;
     Edge/Safari tracking-prevention can stall that iframe for minutes, hanging
     the whole page on a spinner before it times out. Since we sign in by popup
     by default (which never needs this), we skip it on normal loads and call it
     only when our redirect fallback set the flag. onAuthStateChanged still
     restores already-signed-in users from local IndexedDB without the iframe. */
  var _cameFromRedirect=false;
  try{_cameFromRedirect=sessionStorage.getItem('dtp_redirecting')==='1';}catch(_){}
  if(_cameFromRedirect&&auth.getRedirectResult){
    try{sessionStorage.removeItem('dtp_redirecting');}catch(_){}
    auth.getRedirectResult().then(function(r){
      if(r&&r.user&&typeof toast==='function')toast('Signed in');
    }).catch(function(e){
      console.warn('redirect sign-in:',e&&e.message);
      if(typeof toast==='function')toast(e&&e.message||'Sign-in failed');
    });
  }
})();
