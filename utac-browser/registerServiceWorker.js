let serviceWorkerRegistration = null;

function listenControllerChange() {
  // This fires when the service worker controlling this page
  // changes, eg a new worker has skipped waiting and become
  // the new active worker.
  console.log("[service-worker] service worker has been updated!");
}

function registerServiceWorker() {
  console.log("[service-worker] start registration");
  navigator.serviceWorker
    .register("./serviceworker.js")
    .then((registration) => {
      serviceWorkerRegistration = registration;
      console.log("[service-worker] registered!");
    })
    .catch((error) => {
      console.error("[service-worker] error during registration", error);
    });

  navigator.serviceWorker.addEventListener(
    "controllerchange",
    listenControllerChange
  );
}

function unregisterServiceWorker() {
  navigator.serviceWorker.removeEventListener(
    "controllerchange",
    listenControllerChange
  );

  if (serviceWorkerRegistration) {
    console.log("[service-worker] start unregistration");
    serviceWorkerRegistration
      .unregister()
      .then(function (unregistrationSuccess) {
        if (unregistrationSuccess) {
          console.log("[service-worker] service worker has been unregistered!");
          serviceWorkerRegistration = null;
        } else {
          console.error("[service-worker] error during unregistration");
        }
      });
  }
}

module.exports = function (enable) {
  if (enable) {
    registerServiceWorker();
  } else {
    unregisterServiceWorker();
  }
};
