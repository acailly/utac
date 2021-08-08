const Response = require("./Response");
const Headers = require("./Headers");

module.exports = ({}) => {
  const content =
    "<!DOCTYPE html><h1>Hello World!</h1><a href='/login'>Connexion</a>";
  const headers = new Headers({ "Content-Type": "text/html" });
  const init = { status: 200, headers };
  return new Response(content, init);
};
