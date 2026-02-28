/* eslint-env serviceworker */
const CACHE = 'resume-v4';
const BASE = new URL('./', self.location.href).href;

const PRECACHE = [
  BASE, BASE + 'index.html', BASE + 'print/', BASE + 'print/index.html',
  BASE + 'assets/profile.jpg', BASE + 'assets/profile.png',
  BASE + 'css/main.css', BASE + 'js/main.js', BASE + 'manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('php/') || e.request.url.includes('csrf')) return;
  if (!e.request.url.startsWith(BASE)) return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        const clone = res.clone();
        if (res.ok && (e.request.destination === 'document' || e.request.destination === ''))
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        return res;
      });
    })
  );
});
