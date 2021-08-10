const nodeRequestToFetchRequest = require("./nodeRequestToFetchRequest");
const fetchResponseToNodeResponse = require("./fetchResponseToNodeResponse");
const fetchRequestParams = require("./fetchRequestParams");
const routes = require("../app/routes");

module.exports = async function (req, res) {
  console.log("New request!");

  const fetchRequest = await nodeRequestToFetchRequest(req);
  const params = await fetchRequestParams(fetchRequest);

  const requestPath = new URL(fetchRequest.url).pathname;

  console.log(`${fetchRequest.method} ${fetchRequest.url}`);

  const routeHandler = routes[requestPath];
  if (routeHandler) {
    const routeResponse = await routeHandler({ request: fetchRequest, params });
    await fetchResponseToNodeResponse(routeResponse, res);
    res.end();
  } else {
    res.status(404).send("Error: Route not found!");
  }
};
