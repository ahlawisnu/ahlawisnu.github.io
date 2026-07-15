---
layout: null
permalink: /sw.js
---
const CACHE_VERSION = 'v{{ site.time | date: "%Y%m%d%H%M" }}';
const CACHE_NAME = '{{ site.title | slugify }}-' + CACHE_VERSION;

const ASSETS = [
  '{{ "/" | relative_url }}',
  '{{ "/assets/css/style.css" | relative_url }}',
  '{{ "/assets/js/main.js" | relative_url }}'
];

// ✅ Install: Cache assets utama
self.addEventListener('install', event => {
  console.log('[SW] Installing version:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching assets');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()) // ✅ Activate immediately
  );
});

// ✅ Activate: Hapus cache lama
self.addEventListener('activate', event => {
  console.log('[SW] Activating version:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // ✅ Take control immediately
  );
});

// ✅ Fetch: Network-first strategy untuk HTML, cache-first untuk assets
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // ✅ HTML pages: Network-first (selalu cek update)
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache dengan response terbaru
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback ke cache jika offline
          return caches.match(event.request).then(response => {
            return response || caches.match('{{ "/" | relative_url }}');
          });
        })
    );
    return;
  }

  // ✅ Assets (CSS, JS, images): Cache-first dengan stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cache immediately
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Update cache di background
        if (networkResponse.ok) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        console.log('[SW] Fetch failed for:', event.request.url);
      });

      // Return cache atau network response
      return cachedResponse || fetchPromise;
    })
  );
});

// ✅ Listen message dari client untuk force update
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
