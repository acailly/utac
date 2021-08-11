const { Response } = require("../utac-core/WebApi");

const supportsPushState = require("./supports-push-state");
const navigate = require("./navigate");

async function onPopstate(event) {
  const eventUrl = event.state ? event.state.url : null;
  const url = eventUrl || window.location.href;
  const fetchResponse = new Response(url);
  await navigate(fetchResponse, true);
}

module.exports = function (enable) {
  if (enable && supportsPushState) {
    window.addEventListener("popstate", onPopstate, false);
  } else if (!enable) {
    window.removeEventListener("popstate", onPopstate, false);
  }
};
