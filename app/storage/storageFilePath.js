// TODO PARAMS extraire le storage dans un module utac-xxx ?
const path = require("path");

const fileName = "data.txt";

let filePath = fileName;

// TODO PARAMS Rendre le fichier paramétrable
if (typeof __dirname !== "undefined") {
  filePath = path.join(__dirname, "..", "..", fileName);
} else {
  // Add a '/' in front of the data filename
  filePath = `/${fileName}`;
}

module.exports = filePath;
