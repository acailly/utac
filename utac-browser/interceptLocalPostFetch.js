// TODO QUESTION on n'intercepte que les POST pour ne pas interférer avec
// les GET vers les fichiers .html, y a t'il un autre moyen de différencier
// les deux qui pourrait permettre de gérer les GET ?

const url = require("url");

const { Request } = require("../utac-core/WebApi");
const { browserRequestHandler } = require("./browserRequestHandler");

let originalFetch = null;

function monkeyPatchFetch() {
  originalFetch = window.fetch;
  window.fetch = (function (originalFetch) {
    return async function (path, config) {
      // Only local POST requests are handled
      if (config && config.method === "POST") {
        const parsedURL = url.parse(path);
        if (!parsedURL.host || parsedURL.host === window.location.host) {
          const init = {
            method: config && config.method ? config.method : "GET",
          };
          if (config && config.body) {
            init.body = config.body;
          }
          const fetchRequest = new Request(parsedURL.href, init);
          const fetchResponse = await browserRequestHandler(fetchRequest);
          return fetchResponse;
        }
      }

      //... other requests are handled as usual
      const originalFetchResponse = await originalFetch(path, config);
      return originalFetchResponse;
    };
  })(window.fetch);
}

function restoreOriginalFetch() {
  if (originalFetch) {
    window.fetch = originalFetch;
    originalFetch = null;
  }
}

module.exports = function (enable) {
  if (enable) {
    monkeyPatchFetch();
  } else {
    restoreOriginalFetch();
  }
};
