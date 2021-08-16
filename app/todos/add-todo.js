const encodeurl = require("encodeurl");
const { Response, Headers } = require("../../utac-core/WebApi");
const readRecords = require("../storage/readRecords");
const writeRecords = require("../storage/writeRecords");

module.exports = async ({ request, params }) => {
  const newTodo = params.get("text");

  const todos = await readRecords();
  const newTodos = [...todos, newTodo];

  writeRecords(newTodos);

  // TODO QUESTION doit on proposer des utilitaires pour faciliter l'écriture de
  // requêtes ou réponses courantes, ici un redirect("back") ?
  const url =
    request.headers.get("Referrer") || request.headers.get("Referer") || "/";
  const headers = new Headers({ Location: encodeurl(url) });
  const init = { status: 302, headers };
  return new Response(null, init);
};
