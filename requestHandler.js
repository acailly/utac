const routes = require("./routes");

module.exports = function (req, res) {
  console.log("New request!");

  const requestPath = req.path;
  console.log("Path is", requestPath);

  // TODO si c'est un GET, récupérer les queryparams
  // TODO si c'est un POST, récupérer les form-data
  const params = {};

  const routeHandler = routes[requestPath];
  if (routeHandler) {
    const routeResponse = routeHandler({ params });
    // TODO Comment convertir cette Response au format Node/Express ??
  } else {
    //TODO return 404
    console.log("Error: Route not found!");
  }
};
