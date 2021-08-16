const { Response, Headers } = require("../../utac-core/WebApi");
const renderWithEjs = require("../../utac-core/renderWithEjs");
const readRecords = require("../storage/readRecords");

module.exports = async ({}) => {
  const todos = await readRecords();

  const content = await renderWithEjs("app/todos/list-todos.html", {
    todos,
  });
  const headers = new Headers({ "Content-Type": "text/html" });
  const init = { status: 200, headers };
  return new Response(content, init);
};
