const fs = require("fs");
const ejs = require("ejs");

async function render(templatePath, data) {
  const globalData = {
    // TODO baseUrl ?
  };

  const template = readTemplate(templatePath);
  const html = await compileTemplate(template, data, globalData, "");
  return html;
}

// TODO Faire marcher dans le browser
function readTemplate(templatePath) {
  return fs.readFileSync(templatePath, "utf8");
}

async function compileTemplate(
  template,
  data,
  globalData,
  relativeIncludePath
) {
  const templateData = { ...data, ...globalData };
  const compiledTemplate = ejs.compile(template, {
    client: true,
    async: true,
  });
  const html = await compiledTemplate(
    templateData,
    null,
    async (includedTemplatePath, includedTemplateData) => {
      const includedTemplate = readTemplate(
        `${relativeIncludePath}${includedTemplatePath}`
      );
      let childRelativeIncludePath = relativeIncludePath || "";
      if (includedTemplatePath && includedTemplatePath.indexOf("/") !== -1) {
        const splittedPath = includedTemplatePath.split("/");
        const childDirectory = splittedPath.slice(0, -1).join("/");
        childRelativeIncludePath = `${childRelativeIncludePath}${childDirectory}/`;
      }
      return await compileTemplate(
        includedTemplate,
        includedTemplateData,
        globalData,
        childRelativeIncludePath
      );
    }
  );
  return html;
}

module.exports = render;
