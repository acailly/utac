const { Request, Headers } = require("../utac-core/WebApi");
const { browserRequestHandler } = require("./browserRequestHandler");
const showWaitingStatus = require("./showWaitingStatus");
const navigate = require("./navigate");

async function onFormSubmit(event) {
  event.preventDefault();

  console.log("Intercepted form submit");

  showWaitingStatus(true);

  const form = event.target;

  let url = form.action;

  const method = form.method;
  const init = {
    method,
  };

  const hasBody =
    method.toUpperCase() !== "GET" && method.toUpperCase() !== "HEAD";
  if (hasBody) {
    // If we pass new FormData(form) to Request, it will be a "multipart/form-data" content type
    // If we pass new URLSearchParams(new FormData(form)) to Request, it will be a "application/x-www-form-urlencoded" content type
    init.body = new URLSearchParams(new FormData(form));
  } else {
    const parsedURL = new URL(url);
    const queryParams = new URLSearchParams(new FormData(form));
    parsedURL.search = queryParams;
    url = parsedURL.href;
  }

  const fetchRequest = new Request(url, init);

  const fetchResponse = await browserRequestHandler(fetchRequest);

  console.log(
    "Intercepted form submit gives following response:",
    fetchResponse
  );

  showWaitingStatus(false);

  await navigate(fetchResponse, false);
}

module.exports = function (enable) {
  if (enable) {
    window.addEventListener("submit", onFormSubmit, true);
  } else {
    window.removeEventListener("submit", onFormSubmit, true);
  }
};
