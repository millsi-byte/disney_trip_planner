/* ============================================================
   Baseline Tap — cloud layer (Firebase auth, slice 1)
   Additive + guarded: if the Firebase SDK or config aren't present,
   window.CLOUD.enabled is false and the app runs exactly as before on
   localStorage. No data sync yet — this slice only proves sign-in works.
   ============================================================ */
(function(){
  if(typeof firebase==='undefined'||typeof FIREBASE_CONFIG==='undefined'){
    window.CLOUD={enabled:false};
    return;
  }
  try{ firebase.initializeApp(FIREBASE_CONFIG); }catch(e){ /* already initialized */ }
  var auth=firebase.auth();
  var C={enabled:true,user:null,ready:false};

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

  window.CLOUD=C;

  /* reflect auth state in the UI */
  auth.onAuthStateChanged(function(u){
    C.user=u;C.ready=true;
    try{ if(typeof render==='function')render(); }catch(e){}
    try{ if(window.S&&S.screen&&typeof renderScreen_inplace2==='function')renderScreen_inplace2(); }catch(e){}
    try{ if(u&&typeof toast==='function')toast('Signed in as '+(u.email||'cloud')); }catch(e){}
  });
  /* finish an email-link sign-in if the page was opened from one */
  C.completeEmailLink().then(function(r){
    if(r&&typeof toast==='function')toast('Signed in');
  }).catch(function(e){ console.warn('email-link sign-in:',e&&e.message); });
})();
