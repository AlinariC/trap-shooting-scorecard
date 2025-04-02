self.addEventListener("install", event => {
    console.log("Service Worker installed");
    event.waitUntil(
      caches.open("trap-cache").then(cache => {
        return cache.addAll([
          "index.html",
          "style.css",
          "script.js",
          "roster.html",
          "results.html",
          "logo.jpg"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });