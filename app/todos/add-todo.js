const encodeurl = require("encodeurl");
const { Response, Headers } = require("../../utac-core/WebApi");
const readRecords = require("../storage/readRecords");
const writeRecords = require("../storage/writeRecords");

module.exports = async ({ request, params }) => {
  const newTodo = params.get("text");

  const todos = readRecords();
  const newTodos = [...todos, newTodo];

  writeRecords(newTodos);

  const url =
    request.headers.get("Referrer") || request.headers.get("Referer") || "/";
  const headers = new Headers({ Location: encodeurl(url) });
  const init = { status: 302, headers };
  return new Response(null, init);
};
