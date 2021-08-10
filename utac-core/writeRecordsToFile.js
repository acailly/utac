const fs = require("fs");

module.exports = function (filePath, records) {
  const data = records.join("\n\n");

  fs.writeFileSync(filePath, data, "utf8");
};
