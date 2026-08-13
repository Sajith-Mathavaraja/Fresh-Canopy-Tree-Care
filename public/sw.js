/**
 * FreshCanopy Tree Care - Service Worker
 * Strategy: Cache-First for static assets (/assets/*) with long-term storage.
 * This overrides GitHub Pages' short 10-minute Cache-Control header for
 * repeat visitors, providing instant loads from local cache.
 */

const CACHE_VERSION = 'v3';
const CACHE_NAME = `freshcanopy-static-${CACHE_VERSION}`;

// On install: take control immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// On activate: purge all old caches from previous versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('freshcanopy-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache-First for all Vite-hashed static assets (immutable, safe to cache forever)
  // These have content-hashed filenames so cache busting is automatic
  const isHashedAsset =
    url.pathname.includes('/assets/') &&
    (url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.webp') ||
      url.pathname.endsWith('.woff2') ||
      url.pathname.endsWith('.woff') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.svg'));

  if (isHashedAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) {
            // Serve from cache instantly — asset filenames are content-hashed
            // so this is always the correct, up-to-date version
            return cached;
          }
          // Not in cache yet: fetch, store with a 1-year max-age header override, return
          return fetch(event.request).then((response) => {
            if (response && response.status === 200) {
              // Clone the response and override cache headers before storing
              const headers = new Headers(response.headers);
              headers.set('Cache-Control', 'public, max-age=31536000, immutable');

              const cachedResponse = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers,
              });

              cache.put(event.request, cachedResponse.clone());
              return cachedResponse;
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // Network-First for HTML (always get fresh shell to pick up new SW versions)
  if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request)
      )
    );
  }
});
