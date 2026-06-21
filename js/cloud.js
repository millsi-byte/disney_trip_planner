/* ============================================================
   Baseline Tap — cloud layer (Firebase auth + data sync)
   Additive + guarded: if the Firebase SDK or config aren't present,
   window.CLOUD.enabled is false and the app runs exactly as before on
   localStorage. When signed in, every shared dtp_* key is mirrored to
   Firestore under users/<uid>/kv and kept live across this account's
   devices. Identity/selection keys stay device-local.
   ============================================================ */
(function(){
  if(typeof firebase==='undefined'||typeof FIREBASE_CONFIG==='undefined'){
    window.CLOUD={enabled:false};
    return;
  }
  try{ firebase.initializeApp(FIREBASE_CONFIG); }catch(e){ /* already initialized */ }
  var auth=firebase.auth();
  var C={enabled:true,user:null,ready:false,synced:false,applyingRemote:false};

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
    var ref=firebase.firestore().doc('users/'+C.user.uid+'/_diag/ping');
    var v='ok @ '+new Date().toLocaleTimeString();
    return ref.set({val:v,ts:Date.now()}).then(function(){return ref.get();}).then(function(s){return s.exists?s.data().val:'(missing)';});
  };

  /* ── sync engine ───────────────────────────────────────── */
  /* keys that must stay device-local (who's logged in, which trip/group is
     open on THIS device, read-receipts, schema guard, sync bookkeeping) */
  var LOCAL_ONLY={dtp_persona:1,dtp_tripId:1,dtp_groupId:1,dtp_chatseen:1,dtp_emailForSignIn:1,dtp_ver:1};
  function syncable(k){return !!k&&k.indexOf('dtp_')===0&&k.indexOf('dtp__')!==0&&!LOCAL_ONLY[k];}
  function kvCol(){return firebase.firestore().collection('users/'+C.user.uid+'/kv');}
  function loadTimes(){try{return JSON.parse(localStorage.getItem('dtp__synctimes')||'{}');}catch(e){return {};}}
  function saveTimes(t){try{localStorage.setItem('dtp__synctimes',JSON.stringify(t));}catch(e){}}
  function doRehydrate(){
    C.applyingRemote=true;
    try{ if(typeof rehydrate==='function')rehydrate(); }catch(e){}
    C.applyingRemote=false;
  }

  /* mirror a single local save up to the cloud (no-op until reconciled) */
  C.push=function(k,v){
    if(!C.synced||!C.user||C.applyingRemote||!syncable(k))return;
    var ts=Date.now();
    var times=loadTimes(); times[k]=ts; saveTimes(times);
    try{ kvCol().doc(k).set({v:JSON.stringify(v),ts:ts}); }catch(e){ console.warn('cloud push',k,e&&e.message); }
  };

  /* first pass after sign-in: merge local <-> cloud (last-write-wins per key) */
  function reconcile(){
    C.synced=false;
    var col=kvCol();
    return col.get().then(function(snap){
      var times=loadTimes(), cloud={};
      snap.forEach(function(d){ if(syncable(d.id))cloud[d.id]=d.data(); });
      var union={}, i, k;
      for(i=0;i<localStorage.length;i++){ k=localStorage.key(i); if(syncable(k))union[k]=1; }
      Object.keys(cloud).forEach(function(k){union[k]=1;});
      var pushes=[];
      C.applyingRemote=true;
      Object.keys(union).forEach(function(k){
        var c=cloud[k], cts=c?(c.ts||0):0, lts=times[k]||0;
        var local=localStorage.getItem(k);
        if(c && cts>=lts){
          try{localStorage.setItem(k,c.v);}catch(e){}   /* c.v is already a JSON string */
          times[k]=cts;
        }else if(local!=null){
          var ts=lts||Date.now(); times[k]=ts;
          pushes.push(col.doc(k).set({v:local,ts:ts}));
        }
      });
      C.applyingRemote=false;
      saveTimes(times);
      return Promise.all(pushes);
    }).then(function(){
      C.synced=true;
      doRehydrate();
      startListener();
    });
  }

  /* live updates from this account's other devices */
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
          C.applyingRemote=true;
          try{localStorage.setItem(k,data.v);}catch(e){}
          C.applyingRemote=false;
          times[k]=cts; changed=true;
        }
      });
      if(changed){ saveTimes(times); scheduleRehydrate(); }
    },function(e){ console.warn('cloud listen',e&&e.message); });
  }
  function stopListener(){ if(unsub){ try{unsub();}catch(e){} unsub=null; } }

  window.CLOUD=C;

  /* reflect auth state in the UI and drive sync on/off */
  auth.onAuthStateChanged(function(u){
    C.user=u; C.ready=true;
    if(u){
      reconcile().then(function(){
        try{ if(typeof toast==='function')toast('Cloud sync on'); }catch(e){}
        try{ if(window.S&&S.screen&&typeof renderScreen_inplace2==='function')renderScreen_inplace2(); }catch(e){}
      }).catch(function(e){ console.warn('cloud reconcile',e&&e.message); });
    }else{
      stopListener(); C.synced=false;
    }
    try{ if(typeof render==='function')render(); }catch(e){}
    try{ if(window.S&&S.screen&&typeof renderScreen_inplace2==='function')renderScreen_inplace2(); }catch(e){}
    try{ if(u&&typeof toast==='function')toast('Signed in as '+(u.email||'cloud')); }catch(e){}
  });
  /* finish an email-link sign-in if the page was opened from one */
  C.completeEmailLink().then(function(r){
    if(r&&typeof toast==='function')toast('Signed in');
  }).catch(function(e){ console.warn('email-link sign-in:',e&&e.message); });
})();
