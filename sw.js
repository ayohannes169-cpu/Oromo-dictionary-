const CACHE_NAME = 'oromo-dict-v10'; 
// Changed from v1 to v2 to trigger the update
const ASSETS = [
  '/Oromo-dictionary-/',
  '/Oromo-dictionary-/index.html',
  '/Oromo-dictionary-/manifest.json',
  '/Oromo-dictionary-/logo.png',
  '/Oromo-dictionary-/icon-192.png',
  '/Oromo-dictionary-/10.jpg'
];
// Install Service Worker and cache files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate: Delete old caches when the version changes
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
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
