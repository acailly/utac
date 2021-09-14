const interceptLinkClicks = require("./interceptLinkClicks");
const interceptPopstateEvents = require("./interceptPopstateEvents");
const interceptFormSubmit = require("./interceptFormSubmit");
const interceptLocalPostFetch = require("./interceptLocalPostFetch");
const registerServiceWorker = require("./registerServiceWorker");
const {
  useBrowserRequestHandlerMode,
  getBrowserRequestHandlerMode,
  BROWSER_REQUEST_HANDLER_MODE_FETCH,
  BROWSER_REQUEST_HANDLER_MODE_BROWSER,
} = require("./browserRequestHandler");

let enabled = false;

function utacEnhance(enable) {
  enabled = enable;

  console.log("UTAC enhancement is", enabled ? "enabled" : "disabled");

  interceptPopstateEvents(enabled);
  interceptLinkClicks(enabled);
  interceptFormSubmit(enabled);
}

function utacIsEnhancementEnabled() {
  return enabled;
}

function utacIsFullBrowserModeEnabled() {
  return (
    getBrowserRequestHandlerMode() === BROWSER_REQUEST_HANDLER_MODE_BROWSER
  );
}

function utacUseFullBrowserMode(browserMode) {
  console.log(
    "UTAC full browser mode is",
    browserMode ? "enabled" : "disabled"
  );

  if (browserMode) {
    useBrowserRequestHandlerMode(BROWSER_REQUEST_HANDLER_MODE_BROWSER);
  } else {
    useBrowserRequestHandlerMode(BROWSER_REQUEST_HANDLER_MODE_FETCH);
  }

  interceptLocalPostFetch(browserMode);
  registerServiceWorker(browserMode);
}

window.utacEnhance = utacEnhance;
window.utacIsEnhancementEnabled = utacIsEnhancementEnabled;
window.utacIsFullBrowserModeEnabled = utacIsFullBrowserModeEnabled;
window.utacUseFullBrowserMode = utacUseFullBrowserMode;

module.exports = {
  utacIsEnhancementEnabled,
  utacEnhance,
  utacIsFullBrowserModeEnabled,
  utacUseFullBrowserMode,
};
