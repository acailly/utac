const executeBodyScripts = require("./executeBodyScripts");

module.exports = async function (fetchResponse) {
  console.log("Replacing page content with fetch response content");

  const content = await fetchResponse.text();

  document.documentElement.innerHTML = content;

  // TODO Ajouter l'option morphdom
  // const morphdom = require("morphdom");
  //morphdom(document.documentElement, content);

  // The property innerHTML does not execute <script> tags,
  // we have to do it manually
  executeBodyScripts();
};
