const CACHE_NAME = 'oromo-dict-v1';
const ASSETS = [
  '/Oromo-dictionary-/',
  '/Oromo-dictionary-/index.html',
  '/Oromo-dictionary-/manifest.json'
];

// Install Service Worker and cache files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
