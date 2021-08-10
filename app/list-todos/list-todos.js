const Response = require("../../Response");
const Headers = require("../../Headers");
const renderWithEjs = require("../../renderWithEjs");

module.exports = async ({}) => {
  const content = await renderWithEjs("app/list-todos/list-todos.html");
  const headers = new Headers({ "Content-Type": "text/html" });
  const init = { status: 200, headers };
  return new Response(content, init);
};
