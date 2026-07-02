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
    try{sessionStorage.setItem('dtp_redirecting','1');}catch(_){}
    return auth.signInWithRedirect(provider);
  };
  C.signOut=function(){return auth.signOut();};

  /* delete every synced data doc in the active space (a clean slate) */
  C.wipe=function(){
    if(!C.user)return Promise.resolve();
    var col=kvCol();
    return col.get().then(function(snap){
      var dels=[];snap.forEach(function(d){dels.push(d.ref.delete());});
      return Promise.all(dels);
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

  /* sync the local store against the active target.
       mode 'merge'  → last-write-wins per key, both directions (device sync)
       mode 'adopt'  → the target wins entirely (joining a family space) */
  function reconcile(mode,attempt){
    attempt=attempt||0;
    C.synced=false; stopListener();
    var col=kvCol();
    return col.get().then(function(snap){
      var times=loadTimes(), cloud={};
      snap.forEach(function(d){ if(syncable(d.id))cloud[d.id]=d.data(); });
      C.applyingRemote=true;
      if(mode==='adopt'){
        localKeys().forEach(function(k){ if(!(k in cloud)){ try{localStorage.removeItem(k);}catch(e){} delete times[k]; } });
        Object.keys(cloud).forEach(function(k){ try{localStorage.setItem(k,cloud[k].v);}catch(e){} times[k]=cloud[k].ts||Date.now(); });
        C.applyingRemote=false; saveTimes(times);
        return Promise.resolve();
      }
      var union={}; localKeys().forEach(function(k){union[k]=1;}); Object.keys(cloud).forEach(function(k){union[k]=1;});
      var pushes=[];
      Object.keys(union).forEach(function(k){
        var c=cloud[k], cts=c?(c.ts||0):0, lts=times[k]||0, local=localStorage.getItem(k);
        if(c && cts>=lts){ try{localStorage.setItem(k,c.v);}catch(e){} times[k]=cts; }
        else if(local!=null){ var ts=lts||Date.now(); times[k]=ts; pushes.push(col.doc(k).set({v:local,ts:ts})); }
      });
      C.applyingRemote=false; saveTimes(times);
      return Promise.all(pushes);
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
  var unsub=null, rht=null;
  function scheduleRehydrate(){ clearTimeout(rht); rht=setTimeout(doRehydrate,150); }
  function startListener(){
    if(unsub)return;
    unsub=kvCol().onSnapshot(function(snap){
      if(!C.synced)return;
      var times=loadTimes(), changed=false;
      snap.docChanges().forEach(function(ch){
        if(ch.type==='removed')return;
        var d=ch.doc;
        if(d.metadata.hasPendingWrites)return;          /* skip our own write echoing back */
        var k=d.id; if(!syncable(k))return;
        var data=d.data(), cts=data.ts||0, lts=times[k]||0;
        if(cts>lts){
          C.applyingRemote=true; try{localStorage.setItem(k,data.v);}catch(e){} C.applyingRemote=false;
          times[k]=cts; changed=true;
        }
      });
      if(changed){ saveTimes(times); scheduleRehydrate(); }
    },function(e){ console.warn('cloud listen',e&&e.message); });
  }
  function stopListener(){ if(unsub){ try{unsub();}catch(e){} unsub=null; } }

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
