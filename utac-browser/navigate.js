const replacePageContent = require("./replacePageContent");
const supportsPushState = require("./supports-push-state");

module.exports = async function (fetchResponse, replace) {
  const url = fetchResponse.url;

  console.log("Navigating to", url);
  if (supportsPushState) {
    window.history[replace ? "replaceState" : "pushState"]({ url }, null, url);
  }

  await replacePageContent(fetchResponse);
};
