const { Response, Headers } = require("../../utac-core/WebApi");
const renderWithEjs = require("../../utac-core/renderWithEjs");

module.exports = async ({}) => {
  const content = await renderWithEjs("app/home/home.html", {
    name: "World",
  });
  const headers = new Headers({ "Content-Type": "text/html" });
  const init = { status: 200, headers };
  return new Response(content, init);
};
