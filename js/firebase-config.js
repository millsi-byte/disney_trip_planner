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
/* Preview channels (…--dev-<hash>.web.app): the redirect sign-in handshake
   only survives when the auth handler runs on the SAME origin as the app —
   with the production authDomain, Google finishes the sign-in on the live
   site's origin and the preview page can never read the result (bounced
   back to the login screen). Hosting serves the /__/auth/* helpers on every
   channel domain, so pointing authDomain at ourselves fixes it. Production
   is untouched: there location.hostname === the configured authDomain.
   ONE-TIME console prerequisite per channel domain (documented in
   DEVELOPMENT.md): add it to the OAuth client's authorized JS origins +
   redirect URIs, or Google refuses with redirect_uri_mismatch. */
try{
  if(/^disney-trip-planner-447d7--[a-z0-9-]+\.web\.app$/.test(location.hostname))
    FIREBASE_CONFIG.authDomain=location.hostname;
}catch(e){}
