const interceptLinkClicks = require("./interceptLinkClicks");
const interceptPopstateEvents = require("./interceptPopstateEvents");

let enabled = false;

function utacEnhance(enable) {
  enabled = enable;

  console.log("UTAC enhancement is", enabled ? "enabled" : "disabled");

  interceptPopstateEvents(enabled);
  interceptLinkClicks(enabled);
}

function isUtacEnhancementEnabled() {
  return enabled;
}

window.utacEnhance = utacEnhance;
window.isUtacEnhancementEnabled = isUtacEnhancementEnabled;

module.exports = { isUtacEnhancementEnabled, utacEnhance };
