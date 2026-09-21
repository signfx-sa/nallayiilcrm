/**
 * Telecalling CRM - PWA Offline & Performance Service Worker
 * Engineered by Brand.B
 */
const CACHE_NAME = 'telecalling-crm-cache-v2';
const STATIC_ASSETS = [
  './',
  './login.html',
  './mobile.html',
  './index.html',
  './styles.css',
  './menus.css',
  './configuration.css',
  './team.css',
  './crm-config.js',
  './app.js',
  './favicon.svg',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    // API calls bypass cache (always fresh network data)
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
