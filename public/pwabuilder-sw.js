// This is the "Offline copy of pages" service worker

const CACHE = "jaysoundcloud-pwa-v1";

const AUTOCACHE = [
  "/home.html",
  "/search.html",
  "/radio.html",
  "/premium.html",
  "/playlist.html",
  "/app.css",
  "/app.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(AUTOCACHE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE) {
            return caches.delete(key);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  
  // Skip cross-origin or API requests from offline cache-first strategy
  const url = new URL(event.request.url);
  if (url.origin !== location.origin || url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request).then(function (response) {
      if (response && response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(event.request).then(function (cached) {
        return cached || caches.match("/home.html");
      });
    })
  );
});
