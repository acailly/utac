const fs = require("fs").promises;

module.exports = async function (filePath) {
  const data = await fs.readFile(filePath, "utf8");

  const splitRegex = /^\r?\n|\r?\n\r?\n*\r?\n/;
  const records = data.split(splitRegex);

  return records;
};
