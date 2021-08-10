const Response = require("../../utac-core/Response");
const Headers = require("../../utac-core/Headers");
const renderWithEjs = require("../../utac-core/renderWithEjs");

module.exports = async ({}) => {
  const content = await renderWithEjs("app/list-todos/list-todos.html");
  const headers = new Headers({ "Content-Type": "text/html" });
  const init = { status: 200, headers };
  return new Response(content, init);
};
