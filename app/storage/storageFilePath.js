// TODO PARAMS extraire le storage dans un module utac-xxx ?
const path = require("path");

const fileName = "data.txt";

let filePath = fileName;

if (typeof __dirname !== "undefined") {
  filePath = path.join(__dirname, "..", "..", fileName);
}

module.exports = filePath;
