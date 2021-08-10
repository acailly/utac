const fs = require("fs");

module.exports = function (filePath) {
  const data = fs.readFileSync(filePath, "utf8");

  const splitRegex = /^\n|\n\n*\n/;
  const records = data.split(splitRegex);

  return records;
};
