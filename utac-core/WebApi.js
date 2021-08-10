const isBrowser = require("./isBrowser");

let WebApi;
if (isBrowser()) {
  // https://developer.mozilla.org/en-US/docs/Web/API/
  WebApi = window;
} else {
  // https://github.com/node-fetch/node-fetch
  WebApi = require("node-fetch");
}

module.exports = WebApi;
