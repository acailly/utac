const { Request } = require("../utac-core/WebApi");

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
    // Redirections are handled by the browser in this mode
    fetchResponse = await fetch(fetchRequest);
  } else if (
    browserRequestHandlerMode === BROWSER_REQUEST_HANDLER_MODE_BROWSER
  ) {
    const fetchRequestHandler = require("../utac-core/fetchRequestHandler");
    fetchResponse = await fetchRequestHandler(fetchRequest);

    // Redirections are handled manually in this mode
    if (fetchResponse.status === 301 || fetchResponse.status === 302) {
      const redirectUrl = fetchResponse.headers.get("location");

      const redirectRequestInit = {
        method: "GET",
      };
      const redirectRequest = new Request(redirectUrl, redirectRequestInit);

      const redirectResponse = await browserRequestHandler(redirectRequest);
      fetchResponse = redirectResponse;
    }
  }

  return fetchResponse;
}

module.exports = {
  browserRequestHandler,
  useBrowserRequestHandlerMode,
  BROWSER_REQUEST_HANDLER_MODE_FETCH,
  BROWSER_REQUEST_HANDLER_MODE_BROWSER,
};
