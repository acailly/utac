const replacePageContent = require("./replacePageContent");
const supportsPushState = require("./supports-push-state");

module.exports = async function (fetchResponse, replace) {
  // TODO CHECK Gérer 404
  // TODO CHECK Gérer redirections 302 etc.

  const url = fetchResponse.url;

  console.log("Navigating to", url);
  if (supportsPushState) {
    window.history[replace ? "replaceState" : "pushState"]({ url }, null, url);
  }

  // TODO L'URL n'a pas l'air de changer...

  await replacePageContent(fetchResponse);
};
