const readRecordsFromFile = require("../../utac-core/readRecordsFromFile");
const storageFilePath = require("./storageFilePath");
const fileExists = require("./fileExists");

module.exports = async function () {
  if (await fileExists(storageFilePath)) {
    const records = await readRecordsFromFile(storageFilePath);
    return records;
  }

  return [];
};
