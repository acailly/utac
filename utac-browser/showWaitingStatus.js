// TODO EXTENSION laisser la possibilité de customiser ce comportement
module.exports = function (show) {
  if (show) {
    console.log("Show the wait status");
    document.body.style.cursor = "wait";
  } else {
    console.log("Hide the wait status");
    document.body.style.cursor = "default";
  }
};
