const path = require("path");
const readRecordsFromFile = require("../../utac-core/readRecordsFromFile");

module.exports = function () {
  const records = readRecordsFromFile(
    path.join(__dirname, "..", "..", "data.txt")
  );
  return records;
};
