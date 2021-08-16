const fs = require("fs").promises;

module.exports = async function (filePath) {
  const data = await fs.readFile(filePath, "utf8");

  // TODO N'a pas l'air d'être cross platform à cause des caractères de fin de ligne CRLF / LF
  const splitRegex = /^\n|\n\n*\n/;
  const records = data.split(splitRegex);

  return records;
};
