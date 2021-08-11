const nodeRequestToFetchRequest = require("./nodeRequestToFetchRequest");
const fetchResponseToNodeResponse = require("./fetchResponseToNodeResponse");
const fetchRequestHandler = require("../utac-core/fetchRequestHandler");

module.exports = async function (req, res) {
  const fetchRequest = await nodeRequestToFetchRequest(req);

  const fetchResponse = await fetchRequestHandler(fetchRequest);

  await fetchResponseToNodeResponse(fetchResponse, res);
  res.end();
};
