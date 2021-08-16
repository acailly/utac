const interceptLinkClicks = require("./interceptLinkClicks");
const interceptPopstateEvents = require("./interceptPopstateEvents");
const interceptFormSubmit = require("./interceptFormSubmit");
const registerServiceWorker = require("./registerServiceWorker");
const {
  useBrowserRequestHandlerMode,
  BROWSER_REQUEST_HANDLER_MODE_FETCH,
  BROWSER_REQUEST_HANDLER_MODE_BROWSER,
} = require("./browserRequestHandler");

let enabled = false;

function utacEnhance(enable) {
  enabled = enable;

  console.log("UTAC enhancement is", enabled ? "enabled" : "disabled");

  useBrowserRequestHandlerMode(BROWSER_REQUEST_HANDLER_MODE_BROWSER);

  interceptPopstateEvents(enabled);
  interceptLinkClicks(enabled);
  interceptFormSubmit(enabled);
  registerServiceWorker(enabled);
}

function isUtacEnhancementEnabled() {
  return enabled;
}

window.utacEnhance = utacEnhance;
window.isUtacEnhancementEnabled = isUtacEnhancementEnabled;

module.exports = { isUtacEnhancementEnabled, utacEnhance };
