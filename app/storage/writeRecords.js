const path = require("path");
const writeRecordsToFile = require("../../utac-core/writeRecordsToFile");

module.exports = function (records) {
  writeRecordsToFile(path.join(__dirname, "..", "..", "data.txt"), records);
};
