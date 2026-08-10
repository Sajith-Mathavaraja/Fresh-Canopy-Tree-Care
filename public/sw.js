const CACHE_NAME = 'freshcanopy-[HASH]';
const ASSETS_TO_CACHE = [
  './ strict-cache dense',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Cache static image assets & JS chunks with long-term cache strategy
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);

  // Apply cache-first for WebP images and static JS/CSS assets
  if (url.pathname.includes('/assets/') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
