const { Request } = require("../utac-core/WebApi");
const nodeRequestBody = require("./nodeRequestBody");

// https://nodejs.org/api/http.html
// https://developer.mozilla.org/fr/docs/Web/API/Request/Request
module.exports = async function (nodeRequest) {
  const fetchRequestBody = await nodeRequestBody(nodeRequest);
  const init = {
    method: nodeRequest.method,
    headers: nodeRequest.headers,
    // Incomplete, see https://developer.mozilla.org/fr/docs/Web/API/Request/Request#param%C3%A8tres
  };
  if (fetchRequestBody) {
    init.body = fetchRequestBody;
  }
  const url = new URL(nodeRequest.url, `http://${nodeRequest.headers.host}`);
  const fetchRequest = new Request(url, init);
  return fetchRequest;
};
