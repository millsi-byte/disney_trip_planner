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
  var C={enabled:true,user:null,ready:false,synced:false,applyingRemote:false,wid:null,partyName:null,isSuper:false,isOwner:false};
  var SUPER_EMAIL='millsi@gmail.com';   /* the one account that authorizes everyone else */
  function emailKey(e){return (e||'').trim().toLowerCase();}

  function db(){return firebase.firestore();}

  /* ── auth ──────────────────────────────────────────────── */
  C.signInGoogle=function(){
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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

  /* connectivity test: write a doc to your own space and read it back */
  C.ping=function(){
    if(!C.user)return Promise.reject(new Error('Sign in first'));
    var ref=db().doc('users/'+C.user.uid+'/_diag/ping');
    var v='ok @ '+new Date().toLocaleTimeString();
    return ref.set({val:v,ts:Date.now()}).then(function(){return ref.get();}).then(function(s){return s.exists?s.data().val:'(missing)';});
  };

  /* ── sync engine ───────────────────────────────────────── */
  /* keys that must stay device-local */
  var LOCAL_ONLY={dtp_persona:1,dtp_tripId:1,dtp_partyId:1,dtp_chatseen:1,dtp_emailForSignIn:1,dtp_ver:1,dtp_wid:1,dtp_invite:1};
  function syncable(k){return !!k&&k.indexOf('dtp_')===0&&k.indexOf('dtp__')!==0&&!LOCAL_ONLY[k];}
  /* the active key/value collection: family workspace if joined, else personal */
  function kvCol(){return C.wid?db().collection('workspaces/'+C.wid+'/kv'):db().collection('users/'+C.user.uid+'/kv');}
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
    var wid=newCode(), nm=(name||'Planning Party');
    var wref=db().doc('workspaces/'+wid);
    return wref.set({name:nm,by:C.user.uid,createdAt:Date.now()})
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
      if(!s.exists)throw new Error('No party with that code');
      C.partyName=s.data().name||null;
      return wref.collection('members').doc(C.user.uid).set({email:C.user.email||null,joinedAt:Date.now()});
    }).then(function(){ setLocalWid(code); return profileRef().set({wid:code},{merge:true}); })
      .then(function(){ return reconcile('adopt'); })   /* take on the party's data */
      .then(function(){ return code; });
  };

  /* rename the party you're in */
  C.renameParty=function(name){
    if(!C.user||!C.wid)return Promise.reject(new Error('Not in a party'));
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
      .then(function(){ return reconcile('merge'); });
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
  /* finish an email-link sign-in if the page was opened from one */
  C.completeEmailLink().then(function(r){
    if(r&&typeof toast==='function')toast('Signed in');
  }).catch(function(e){ console.warn('email-link sign-in:',e&&e.message); });
})();
