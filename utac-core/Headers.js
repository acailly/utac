const isBrowser = require("./isBrowser");

// https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers
// https://github.com/node-fetch/node-fetch#class-headers
module.exports = isBrowser() ? Headers : require("node-fetch").Headers;
