const { Response } = require("./WebApi");
const fetchRequestParams = require("./fetchRequestParams");
// TODO PARAMS Passer les routes en paramètres
const routes = require("../app/routes");

module.exports = async function (fetchRequest) {
  const params = await fetchRequestParams(fetchRequest);

  const requestPath = new URL(fetchRequest.url).pathname;

  const isRequestInitiatedByUser =
    fetchRequest.headers.get("Sec-Fetch-User") === "?1";
  if (isRequestInitiatedByUser) {
    if (fetchRequest.method.toUpperCase() === "GET") {
      console.log(`👀 ${fetchRequest.url}`);
    } else {
      console.log(`🔨 ${fetchRequest.url}`);
    }
  }

  // DEBUG show all requests
  // console.log(`${fetchRequest.method} ${fetchRequest.url}`);
  // DEBUG : Show headers in console
  // console.log("Headers:");
  // for (var header of fetchRequest.headers.entries()) {
  //   console.log("* " + header[0] + ": " + header[1]);
  // }

  const routeHandler = routes[requestPath];
  if (routeHandler) {
    const fetchResponse = await routeHandler({ request: fetchRequest, params });
    return fetchResponse;
  } else {
    const init = { status: 404, statusText: "Error: Route not found!" };
    const fetchResponse = new Response(null, init);
    return fetchResponse;
  }
};
