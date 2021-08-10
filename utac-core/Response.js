const isBrowser = require("./isBrowser");

// https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
// https://github.com/node-fetch/node-fetch#class-response
module.exports = isBrowser() ? Response : require("node-fetch").Response;
