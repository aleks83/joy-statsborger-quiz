const CACHE = 'statsborger-v2';
const ASSETS = [
  '/joy-statsborger-quiz/',
  '/joy-statsborger-quiz/index.html',
  '/joy-statsborger-quiz/manifest.json',
  '/joy-statsborger-quiz/icon-192.png',
  '/joy-statsborger-quiz/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
