/* Baseline Tap — service worker
   Network-first so new versions show up on the next load; cache is the
   offline fallback only. */
var CACHE = 'dtp-v182';
var ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/data.js',
  './js/app.js',
  './js/firebase-config.js',
  './js/cloud.js',
  './manifest.json',
  /* Self-hosted Firebase SDK — precached so sign-in never waits on (or is
     blocked by) the Google CDN. */
  './vendor/firebase/firebase-app-compat.js',
  './vendor/firebase/firebase-auth-compat.js',
  './vendor/firebase/firebase-firestore-compat.js'
];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  /* Only ever handle our OWN static files. Anything cross-origin — Firestore's
     API (firestore.googleapis.com), the Firebase SDK CDN, Google Fonts, the
     auth endpoints — must pass straight through to the network untouched.
     Intercepting Firestore's request stream broke its auth/transport, so the
     first sync failed with "Missing or insufficient permissions" and the app
     never got past the sign-in screen. */
  if(url.origin !== self.location.origin) return;
  /* Never touch Firebase's reserved auth/handshake routes either. On Firebase
     Hosting the app and authDomain share one origin, so /__/auth/iframe and
     /__/auth/handler are same-origin and would otherwise be caught here. Our
     network-first + index.html fallback would hand back the app HTML instead of
     the real handler, corrupting the OAuth handshake. Let the browser fetch it. */
  if(url.pathname.indexOf('/__/') === 0) return;
  e.respondWith(
    fetch(e.request).then(function(res){
      if(res && res.status === 200 && res.type === 'basic'){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      }
      return res;
    }).catch(function(){
      return caches.match(e.request).then(function(hit){
        return hit || caches.match('./index.html');
      });
    })
  );
});
