const fs = require("fs").promises;
const ejs = require("ejs");
const isBrowser = require("./isBrowser");

async function render(templatePath, data) {
  const globalData = {
    // TODO baseUrl ?
  };

  const template = await readTemplate(templatePath);
  const html = await compileTemplate(template, data, globalData, "");
  return html;
}

async function readTemplate(templatePath) {
  let template;

  if (isBrowser()) {
    const response = await fetch(templatePath);
    template = await response.text();
  } else {
    template = await fs.readFile(templatePath, "utf8");
  }

  return template;
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
      const includedTemplate = await readTemplate(
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
