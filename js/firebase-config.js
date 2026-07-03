/* Baseline Tap — Firebase project config.
   Safe to commit: the apiKey is public by design (not a secret). Access is
   controlled entirely by Firestore security rules, not by hiding this. */
var FIREBASE_CONFIG = {
  apiKey: "AIzaSyC1xaBoepKpSws0L-c-ksY5y6TxD8ySidw",
  authDomain: "disney-trip-planner-447d7.web.app",
  projectId: "disney-trip-planner-447d7",
  storageBucket: "disney-trip-planner-447d7.firebasestorage.app",
  messagingSenderId: "1017541221969",
  appId: "1:1017541221969:web:a496f13dd27c6dbfb7a270"
};
/* Preview channels (…--dev-<hash>.web.app) sign in with a POPUP instead of
   the redirect flow — see CLOUD.signInGoogle. Keeping the production
   authDomain here is deliberate: it's the origin Google already trusts, so
   preview sign-in needs zero console setup. (A same-origin authDomain
   override was tried first; it forces a per-channel OAuth-client
   registration in the Google Cloud console — not worth it.) */
function dtpIsPreviewHost(){
  try{return /^disney-trip-planner-447d7--[a-z0-9-]+\.web\.app$/.test(location.hostname);}catch(e){return false;}
}
