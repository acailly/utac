const fs = require("fs").promises;

module.exports = async function (filePath, records) {
  const data = records.join("\n\n");

  await fs.writeFile(filePath, data, "utf8");
};
