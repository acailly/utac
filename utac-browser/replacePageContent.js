const executeBodyScripts = require("./executeBodyScripts");

module.exports = async function (fetchResponse) {
  console.log("Replacing page content with fetch response content");

  const content = await fetchResponse.text();

  document.documentElement.innerHTML = content;

  // TODO EXTENSION Ajouter l'option morphdom
  // https://github.com/patrick-steele-idem/morphdom
  // const morphdom = require("morphdom");
  //morphdom(document.documentElement, content);

  // TODO EXTENSION Ajouter l'option nanomorph
  // https://github.com/choojs/nanomorph

  // The property innerHTML does not execute <script> tags,
  // we have to do it manually
  executeBodyScripts();
};
