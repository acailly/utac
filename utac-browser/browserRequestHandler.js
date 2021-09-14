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

function getBrowserRequestHandlerMode() {
  return browserRequestHandlerMode;
}

async function browserRequestHandler(fetchRequest) {
  let fetchResponse;
  if (browserRequestHandlerMode === BROWSER_REQUEST_HANDLER_MODE_FETCH) {
    // Handle the request with fetch()
    fetchResponse = await fetch(fetchRequest);
  } else if (
    browserRequestHandlerMode === BROWSER_REQUEST_HANDLER_MODE_BROWSER
  ) {
    // Handle the request directly in the browser
    const fetchRequestHandler = require("../utac-core/fetchRequestHandler");
    fetchResponse = await fetchRequestHandler(fetchRequest);

    // Hack: usually, fetch response url is automatically set when calling fetch()
    // Since we don't call fetch() in this mode, we have to set it manually
    // But this property is read only: https://developer.mozilla.org/en-US/docs/Web/API/Response/url
    // The following workaround is from: https://stackoverflow.com/a/57382543
    Object.defineProperty(fetchResponse, "url", { value: fetchRequest.url });

    // Hack: usually, redirections are automatically handled by the browser when using fetch()
    // Since we don't call fetch() in this mode, we have to handle it manually
    if (fetchResponse.status === 301 || fetchResponse.status === 302) {
      const redirectUrl = fetchResponse.headers.get("location");
      const redirectRequest = new Request(redirectUrl);
      const redirectResponse = await browserRequestHandler(redirectRequest);
      fetchResponse = redirectResponse;
    }
  }

  return fetchResponse;
}

module.exports = {
  browserRequestHandler,
  useBrowserRequestHandlerMode,
  getBrowserRequestHandlerMode,
  BROWSER_REQUEST_HANDLER_MODE_FETCH,
  BROWSER_REQUEST_HANDLER_MODE_BROWSER,
};
