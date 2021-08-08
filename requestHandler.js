const routes = require("./routes");

module.exports = async function (req, res) {
  console.log("New request!");

  const requestPath = req.path;
  console.log("Path is", requestPath);

  // TODO si c'est un GET, récupérer les queryparams
  // TODO si c'est un POST, récupérer les form-data
  const params = {};

  const routeHandler = routes[requestPath];
  if (routeHandler) {
    const routeResponse = await routeHandler({ params });
    const headers = {};
    routeResponse.headers.forEach(function (val, key) {
      // TODO Est ce que ca gère bien les headers à valeur multiple ?
      headers[key] = val;
    });
    res.writeHead(routeResponse.status, routeResponse.statusText, headers);
    // TODO est ce que text() gère bien les cas où le body est un form data ou du json ?
    const routeResponseText = await routeResponse.text();
    res.write(routeResponseText);
    res.end();
  } else {
    res.status(404).send("Error: Route not found!");
  }
};
