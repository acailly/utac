const writeRecordsToFile = require("../../utac-core/writeRecordsToFile");
const storageFilePath = require("./storageFilePath");

module.exports = function (records) {
  writeRecordsToFile(storageFilePath, records);
};
