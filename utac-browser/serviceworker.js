const OFFLINE_URL = "index.html";

// Declare filesToCache variable
self.importScripts("./utac/filesToCache.js");

// Declare serviceWorkerConfiguration variable
// TODO
// self.importScripts("./serviceworker-configuration.js");

// TODO
// const version = serviceWorkerConfiguration.applicationVersion;
const version = "0.0.0";

// TODO
// const baseURL = serviceWorkerConfiguration.baseURL;
// console.log("[service-worker] base URL is", baseURL);

const rootURL = location.href.slice(0, -"serviceworker.js".length);
console.log("[service-worker] root URL is", rootURL);

self.addEventListener("install", function (event) {
  console.log("[service-worker] installation");

  // Add all the ressources in the cache
  event.waitUntil(
    caches.open(version).then(function (cache) {
      console.log(
        "[service-worker] add following files to the cache:",
        filesToCache
      );

      return Promise.all(
        filesToCache.map((fileToCache) => {
          const fileToCacheLocation = `utac/${fileToCache}`;
          fetch(fileToCacheLocation).then(function (response) {
            if (!response.ok) {
              throw new Error("Cannot cache " + fileToCacheLocation);
            }
            return cache.put(fileToCache, response);
          });
        })
      );
    })
  );

  // Force this service worker to become the active service worker
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  console.log("[service-worker] activation");

  // Remove old caches
  console.log("[service-worker] clean old cache");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return !cacheName.startsWith(version);
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );

  // Set this service worker as clients' active service worker
  console.log("[service-worker] claim as active service worker");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", async function (event) {
  // TL;DR; Strategy: Cache falling back to app falling back the network

  console.log("[service-worker]", event.request.url, " - intercepted");

  event.respondWith(
    Promise.resolve(true)
      // Start searching in the cache...
      .then(() => {
        console.log(
          "[service-worker]",
          event.request.url,
          "- try to load from cache"
        );

        return caches.match(event.request);
      })
      .then((response) => {
        if (response) {
          console.log(
            "[service-worker]",
            event.request.url,
            "- loaded from cache!"
          );
          return response;
        }

        //... else look if it is an URL of an app page
        if (event.request.url.startsWith(rootURL)) {
          console.log(
            "[service-worker]",
            event.request.url,
            "- it seems to be an app page, try to load app entry point from cache"
          );
          return caches.match(`${rootURL}${OFFLINE_URL}`);
        }

        return null;
      })
      .then((response) => {
        if (response) {
          console.log(
            "[service-worker]",
            event.request.url,
            "- loaded from cache!"
          );
          return response;
        }

        //... else fallback to the network
        console.log(
          "[service-worker]",
          event.request.url,
          "- fallback to network"
        );
        return fetch(event.request);
      })
      .catch((e) => {
        console.log("[service-worker]", event.request.url, "- failed!");

        //... if this is an error in cors mode, retry with a CORS proxy
        if (event.request.mode === "cors") {
          console.log(
            "[service-worker]",
            event.request.url,
            " - retry with CORS proxy"
          );

          // TODO
          //   const corsProxifiedURL = `${serviceWorkerConfiguration.corsProxyURL}${event.request.url}`;
          const corsProxifiedURL = `https://acailly-cors-anywhere.herokuapp.com/${event.request.url}`;
          console.log(
            "[service-worker]",
            event.request.url,
            " - proxyfied URL:",
            corsProxifiedURL
          );

          // From https://stackoverflow.com/a/35421858
          const proxifiedRequest = new Request(corsProxifiedURL, {
            method: event.request.method,
            headers: event.request.headers,
            mode: event.request.mode,
            credentials: event.request.credentials,
            redirect: event.request.redirect,
          });

          return fetch(proxifiedRequest);
        }

        //... if this is an error in navigate mode, this is likely due to
        // a network failure, so we load the app landing page from the cache
        // (inspired from https://web.dev/offline-fallback-page/)
        if (event.request.mode === "navigate") {
          console.log(
            "[service-worker]",
            event.request.url,
            "- try to fallback to app offline landing page"
          );
          return caches.match(`${OFFLINE_URL}`);
        }

        //... else, just log error :-/
        console.error("[service-worker]", event.request.url, " - error:", e);
        throw e;
      })
  );
});
