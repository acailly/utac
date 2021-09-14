const executeBodyScripts = require("./executeBodyScripts");

module.exports = async function (fetchResponse) {
  console.log("Replacing page content with fetch response content");

  const content = await fetchResponse.text();

  // TODO QUESTION comment choisir parmi les options ?

  // OPTION 1 : no dependency
  // document.documentElement.innerHTML = content;

  // OPTION 2 : morphdom
  const morphdom = require("morphdom");
  morphdom(document.documentElement, content);

  // OPTION 3 : nanomorph
  // TODO EXTENSION Ajouter l'option nanomorph
  // https://github.com/choojs/nanomorph

  // The property innerHTML does not execute <script> tags,
  // we have to do it manually
  executeBodyScripts();
};
