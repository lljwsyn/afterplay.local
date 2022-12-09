importScripts("/precache-manifest.d761fefa054b04bb64524230468615fd.js", "/workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v4.3.1"});
workbox.core.setCacheNameDetails({ prefix: "afterplay" });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


try {

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

} catch(e) {
    console.log('error', e)
}

// workbox.routing.registerRoute(
//     /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
//     new workbox.strategies.CacheFirst({
//         cacheName: 'images',
//     })
// );

workbox.routing.registerRoute(
  /^https:\/\/firebasestorage.googleapis.com\/v0\/b\/.*.appspot.com\/o\/games.*/,
  new workbox.strategies.CacheFirst({
      cacheName: 'games',
  })
);


addEventListener('message', messageEvent => {
    if (messageEvent.data.type === 'skipWaiting') {
        console.log('skip waiting from message');
        return skipWaiting();
    }
});
