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
  var C={enabled:true,user:null,ready:false,synced:false,applyingRemote:false,wid:null,partyName:null,isSuper:false,isOwner:false,adminWid:null};
  var SUPER_EMAIL='millsi@gmail.com';   /* the one account that authorizes everyone else */
  function emailKey(e){return (e||'').trim().toLowerCase();}

  function db(){return firebase.firestore();}

  /* ── auth ──────────────────────────────────────────────── */
  C.signInGoogle=function(){
    var provider=new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'});
    /* Popup-first. Our app is served from github.io while authDomain is
       firebaseapp.com, so signInWithRedirect's return trip must read its pending
       handshake from firebaseapp.com storage — a third-party context that
       Chrome's storage partitioning and Safari's ITP now block. The result:
       getRedirectResult() comes back empty and a fresh browser loops back to the
       sign-in screen forever (browsers that already authenticated keep working
       because their token persists first-party in our own IndexedDB).
       signInWithPopup completes the whole OAuth exchange inside a first-party
       window, so it doesn't need that blocked cross-domain read. Fall back to a
       full-page redirect only when the popup is physically unavailable (blocked,
       or an embedded webview that can't open one). */
    return auth.signInWithPopup(provider).catch(function(e){
      var code=(e&&e.code)||'';
      if(code==='auth/popup-blocked'||code==='auth/operation-not-supported-in-this-environment'||code==='auth/cancelled-popup-request')
        return auth.signInWithRedirect(provider);
      throw e;   /* popup-closed-by-user etc. → surface to the caller */
    });
  };
  C.sendEmailLink=function(email){
    var settings={url:location.href.split('#')[0],handleCodeInApp:true};
    return auth.sendSignInLinkToEmail(email,settings).then(function(){
      try{localStorage.setItem('dtp_emailForSignIn',email);}catch(e){}
    });
  };
  C.completeEmailLink=function(){
    if(!auth.isSignInWithEmailLink||!auth.isSignInWithEmailLink(location.href))return Promise.resolve(null);
    var email=null;try{email=localStorage.getItem('dtp_emailForSignIn');}catch(e){}
    if(!email)email=window.prompt('Confirm your email to finish signing in');
    if(!email)return Promise.resolve(null);
    return auth.signInWithEmailLink(email,location.href).then(function(r){
      try{localStorage.removeItem('dtp_emailForSignIn');}catch(e){}
      return r;
    });
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

  /* ── sync engine ───────────────────────────────────────── */
  /* keys that must stay device-local */
  var LOCAL_ONLY={dtp_persona:1,dtp_tripId:1,dtp_partyId:1,dtp_chatseen:1,dtp_emailForSignIn:1,dtp_ver:1,dtp_wid:1,dtp_invite:1,dtp_adminWid:1};
  function syncable(k){return !!k&&k.indexOf('dtp_')===0&&k.indexOf('dtp__')!==0&&!LOCAL_ONLY[k];}
  /* the active key/value collection: family workspace if joined, else personal */
  /* the active key/value collection. adminWid (super-admin impersonation) wins,
     then the user's own party, else their personal space. */
  function kvCol(){var w=C.adminWid||C.wid;return w?db().collection('workspaces/'+w+'/kv'):db().collection('users/'+C.user.uid+'/kv');}
  function profileRef(){return db().doc('users/'+C.user.uid+'/meta/profile');}
  function loadTimes(){try{return JSON.parse(localStorage.getItem('dtp__synctimes')||'{}');}catch(e){return {};}}
  function saveTimes(t){try{localStorage.setItem('dtp__synctimes',JSON.stringify(t));}catch(e){}}
  function localKeys(){var a=[],i,k;for(i=0;i<localStorage.length;i++){k=localStorage.key(i);if(syncable(k))a.push(k);}return a;}
  function doRehydrate(){
    C.applyingRemote=true;
    try{ if(typeof rehydrate==='function')rehydrate(); }catch(e){}
    C.applyingRemote=false;
  }
  function setLocalWid(w){C.wid=w||null;try{w?localStorage.setItem('dtp_wid',w):localStorage.removeItem('dtp_wid');}catch(e){}}
  function newCode(){return (Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)).toUpperCase();}

  /* mirror a single local save up to the active target (no-op until reconciled) */
  C.push=function(k,v){
    if(!C.synced||!C.user||C.applyingRemote||!syncable(k))return;
    var ts=Date.now();
    var times=loadTimes(); times[k]=ts; saveTimes(times);
    try{ kvCol().doc(k).set({v:JSON.stringify(v),ts:ts}); }catch(e){ console.warn('cloud push',k,e&&e.message); }
  };

  /* sync the local store against the active target.
       mode 'merge'  → last-write-wins per key, both directions (device sync)
       mode 'adopt'  → the target wins entirely (joining a family space) */
  function reconcile(mode){
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

  /* create a party from your current data and switch onto it */
  C.createParty=function(name){
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    var wid=newCode(), nm=(name||'My Group');
    /* the tenant's stable label = the owner's display name (not the party name) */
    var tn=null;
    try{var fam=JSON.parse(localStorage.getItem('dtp_family')||'[]');var a=fam.filter(function(p){return p.admin;})[0]||fam[0];if(a&&a.name)tn=a.name+(a.lastName?' '+a.lastName:'');}catch(e){}
    if(!tn)tn=(C.user.email||'').split('@')[0]||null;
    var wref=db().doc('workspaces/'+wid);
    return wref.set({name:nm,tenantName:tn,by:C.user.uid,byEmail:C.user.email||null,createdAt:Date.now()})
      .then(function(){ return wref.collection('members').doc(C.user.uid).set({email:C.user.email||null,joinedAt:Date.now()}); })
      .then(function(){ setLocalWid(wid); C.partyName=nm; return profileRef().set({wid:wid},{merge:true}); })
      .then(function(){ return reconcile('merge'); })   /* push your data up into the new party */
      .then(function(){ return wid; });
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
    }).then(function(){ setLocalWid(code); return profileRef().set({wid:code},{merge:true}); })
      .then(function(){ return reconcile('adopt'); })   /* take on the party's data */
      .then(function(){ return code; });
  };

  /* rename the party you're in */
  C.renameParty=function(name){
    if(!C.user||!C.wid)return Promise.reject(new Error('Not in a group'));
    name=(name||'').trim();if(!name)return Promise.reject(new Error('Enter a name'));
    return db().doc('workspaces/'+C.wid).set({name:name},{merge:true}).then(function(){ C.partyName=name; return name; });
  };

  /* leave the party; your device returns to your personal copy */
  C.leaveParty=function(){
    if(!C.user||!C.wid)return Promise.resolve();
    var wid=C.wid;
    return db().doc('workspaces/'+wid).collection('members').doc(C.user.uid).delete().catch(function(){})
      .then(function(){ setLocalWid(null); C.partyName=null; return profileRef().set({wid:null},{merge:true}); })
      .then(function(){ return reconcile('adopt'); });   /* re-adopt personal space */
  };

  window.CLOUD=C;

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

  /* read the user's chosen party + their access level, then sync */
  function startSync(){
    return profileRef().get().then(function(s){
      C.wid=(s.exists&&s.data().wid)||null;
      setLocalWid(C.wid);
    }).catch(function(){ C.wid=null; })
      .then(function(){
        if(!C.wid){C.partyName=null;return;}
        return db().doc('workspaces/'+C.wid).get().then(function(w){C.partyName=(w.exists&&w.data().name)||null;}).catch(function(){});
      })
      .then(function(){
        C.isSuper=C.isSuperAdmin();
        if(C.isSuper){C.isOwner=true;return;}
        return db().doc('owners/'+emailKey(C.user.email)).get().then(function(d){C.isOwner=d.exists;}).catch(function(){C.isOwner=false;});
      })
      .then(function(){
        /* crash-safety: if we force-quit mid-impersonation, dtp_adminWid is set.
           Don't resume into the other family — discard their leftover local data
           and pull our OWN space (adopt is pull-only, so it can never push their
           data into our cloud). Normal startup uses merge. */
        var stranded=null;try{stranded=localStorage.getItem('dtp_adminWid');}catch(e){}
        if(stranded){try{localStorage.removeItem('dtp_adminWid');}catch(e){}C.adminWid=null;return reconcile('adopt');}
        return reconcile('merge');
      });
  }

  /* reflect auth state in the UI and drive sync on/off */
  auth.onAuthStateChanged(function(u){
    C.user=u; C.ready=true;
    if(u){
      startSync().then(function(){
        try{ if(typeof onCloudSynced==='function')onCloudSynced(); }catch(e){}
        try{ if(window.S&&S.screen&&typeof renderScreen_inplace2==='function')renderScreen_inplace2(); }catch(e){}
      }).catch(function(e){ console.warn('cloud sync',e&&e.message); });
    }else{
      stopListener(); C.synced=false; C.wid=null;
      try{ if(typeof onCloudSignedOut==='function')onCloudSignedOut(); }catch(e){}
    }
    try{ if(typeof render==='function')render(); }catch(e){}
    try{ if(window.S&&S.screen&&typeof renderScreen_inplace2==='function')renderScreen_inplace2(); }catch(e){}
  });
  /* finish a redirect-based Google sign-in if we just came back from one
     (onAuthStateChanged also fires, but this surfaces any redirect error) */
  if(auth.getRedirectResult){
    auth.getRedirectResult().then(function(r){
      if(r&&r.user&&typeof toast==='function')toast('Signed in');
    }).catch(function(e){
      console.warn('redirect sign-in:',e&&e.message);
      if(typeof toast==='function')toast(e&&e.message||'Sign-in failed');
    });
  }
  /* finish an email-link sign-in if the page was opened from one */
  C.completeEmailLink().then(function(r){
    if(r&&typeof toast==='function')toast('Signed in');
  }).catch(function(e){ console.warn('email-link sign-in:',e&&e.message); });
})();
