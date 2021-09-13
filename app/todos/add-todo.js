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

  // We need to check both .referrer property and referrer headers because:
  // - it seems impossible to manually set the referrer headers in browser Fetch API, but we can set .referrer property
  // - node-fetch doesn't support .referrer property, but it can set referrer headers
  const url =
    request.referrer ||
    request.headers.get("Referrer") ||
    request.headers.get("Referer") ||
    "/";
  const headers = new Headers({ Location: encodeurl(url) });
  const init = { status: 302, headers };
  return new Response(null, init);
};
