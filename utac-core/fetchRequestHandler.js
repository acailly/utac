const fetchRequestParams = require("./fetchRequestParams");
const routes = require("../app/routes");

module.exports = async function (fetchRequest) {
  console.log("New request!");

  const params = await fetchRequestParams(fetchRequest);

  const requestPath = new URL(fetchRequest.url).pathname;

  console.log(`${fetchRequest.method} ${fetchRequest.url}`);

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
