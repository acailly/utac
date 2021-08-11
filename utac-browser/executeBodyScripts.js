function executeBodyScripts() {
  // The property innerHTML does not execute <script> tags,
  // we have to do it manually
  // See https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
  // This is a workaround from https://stackoverflow.com/a/20584396
  nodeScriptReplace(document.getElementsByTagName("body")[0]);
}

// From https://stackoverflow.com/a/20584396
function nodeScriptReplace(node) {
  if (nodeScriptIs(node) === true) {
    node.parentNode.replaceChild(nodeScriptClone(node), node);
  } else {
    var i = -1,
      children = node.childNodes;
    while (++i < children.length) {
      nodeScriptReplace(children[i]);
    }
  }

  return node;
}
function nodeScriptClone(node) {
  var script = document.createElement("script");
  script.text = node.innerHTML;

  var i = -1,
    attrs = node.attributes,
    attr;
  while (++i < attrs.length) {
    script.setAttribute((attr = attrs[i]).name, attr.value);
  }
  return script;
}
function nodeScriptIs(node) {
  return node.tagName === "SCRIPT";
}

module.exports = executeBodyScripts;
