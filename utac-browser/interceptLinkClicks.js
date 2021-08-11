const catchLinks = require("../catch-links");
const { Request } = require("../utac-core/WebApi");
const browserRequestHandler = require("./browserRequestHandler");
const navigate = require("./navigate");

let enableCatchLinks = null;

module.exports = function (enable) {
  if (!enableCatchLinks && enable) {
    console.log("Initialize link interception");
    enableCatchLinks = catchLinks(window, async (href) => {
      console.log("Intercepted link click on", href);

      // TODO laisser la possibilité de customiser ce comportement
      console.log("Set the wait cursor");
      document.body.style.cursor = "wait";

      const fetchRequest = new Request(href);
      const fetchResponse = await browserRequestHandler(fetchRequest);

      console.log(
        "Intercepted link click gives following response:",
        fetchResponse
      );

      // TODO laisser la possibilité de customiser ce comportement
      console.log("Remove the wait cursor");
      document.body.style.cursor = "default";

      await navigate(fetchResponse, false);
    });

    enableCatchLinks(true);
  } else {
    enableCatchLinks(enable);
  }
};
