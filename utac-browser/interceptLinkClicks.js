const catchLinks = require("../catch-links");
const { Request } = require("../utac-core/WebApi");
const { browserRequestHandler } = require("./browserRequestHandler");
const showWaitingStatus = require("./showWaitingStatus");
const navigate = require("./navigate");

let enableCatchLinks = null;

module.exports = function (enable) {
  if (!enableCatchLinks && enable) {
    console.log("Initialize link interception");
    enableCatchLinks = catchLinks(window, async (href) => {
      console.log("Intercepted link click on", href);

      showWaitingStatus(true);

      const fetchRequest = new Request(href);
      const fetchResponse = await browserRequestHandler(fetchRequest);

      console.log(
        "Intercepted link click gives following response:",
        fetchResponse
      );

      showWaitingStatus(false);

      await navigate(fetchResponse, false);
    });

    enableCatchLinks(true);
  } else {
    enableCatchLinks(enable);
  }
};
