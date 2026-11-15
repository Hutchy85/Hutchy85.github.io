const CACHE_NAME = 'sleeper-build-v1';
const APP_SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png'
];
// These are the same libraries already referenced by the original HTML.
// They are cached on first install so the tracker can start without a signal.
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await Promise.all(CDN_ASSETS.map(async url => {
      try {
        const response = await fetch(url, { mode: 'cors', cache: 'reload' });
        if (response.ok) await cache.put(url, response);
      } catch (error) {
        // If a CDN is temporarily unavailable, the online page can still load it later.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('sleeper-build-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const isOurApp = url.origin === self.location.origin;
  const isKnownCDN = CDN_ASSETS.some(asset => request.url.startsWith(asset));
  if (!isOurApp && !isKnownCDN) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: false }) || await cache.match(request.url);
    if (cached) {
      // Refresh in the background when online, while immediately serving the cached copy.
      fetch(request).then(response => {
        if (response && response.ok) cache.put(request, response.clone());
      }).catch(() => {});
      return cached;
    }
    try {
      const response = await fetch(request);
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        return (await cache.match('./index.html')) || new Response('You are offline. Open Sleeper Build once while connected to finish setting it up.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
      return new Response('', { status: 503, statusText: 'Offline asset unavailable' });
    }
  })());
});
