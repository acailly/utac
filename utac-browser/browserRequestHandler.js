// Fetch the request
// - a server must be present to respond to this fetch
const BROWSER_REQUEST_HANDLER_MODE_FETCH = "BROWSER_REQUEST_HANDLER_MODE_FETCH";

// Call the request handler directly in the browser
// - allow client side application
// - allow offline application in combination to serviceworkers
const BROWSER_REQUEST_HANDLER_MODE_BROWSER =
  "BROWSER_REQUEST_HANDLER_MODE_BROWSER";

let browserRequestHandlerMode = BROWSER_REQUEST_HANDLER_MODE_FETCH;

function useBrowserRequestHandlerMode(newBrowserRequestHandlerMode) {
  browserRequestHandlerMode = newBrowserRequestHandlerMode;
}

async function browserRequestHandler(fetchRequest) {
  let fetchResponse;
  if (browserRequestHandlerMode === BROWSER_REQUEST_HANDLER_MODE_FETCH) {
    fetchResponse = await fetch(fetchRequest);
  } else if (
    browserRequestHandlerMode === BROWSER_REQUEST_HANDLER_MODE_BROWSER
  ) {
    const fetchRequestHandler = require("../utac-core/fetchRequestHandler");
    fetchResponse = await fetchRequestHandler(fetchRequest);
  }

  return fetchResponse;
}

module.exports = {
  browserRequestHandler,
  useBrowserRequestHandlerMode,
  BROWSER_REQUEST_HANDLER_MODE_FETCH,
  BROWSER_REQUEST_HANDLER_MODE_BROWSER,
};
