module.exports = async function (fetchRequest) {
  if (fetchRequest.method === "GET") {
    const url = new URL(fetchRequest.url);
    const params = new URLSearchParams(url.search);
    return params;
  } else if (fetchRequest.method === "POST") {
    // Handling of "application/x-www-form-urlencoded" content-type

    // Inspired from https://github.com/node-fetch/node-fetch/issues/857#issuecomment-638954525
    const text = await fetchRequest.text();
    const params = new URLSearchParams(text);

    // TODO Gérer application/json
    // TODO Gérer multipart/form-data
    // S'inspirer de :
    // - https://github.com/expressjs/body-parser
    // - https://javascript.plainenglish.io/parsing-post-data-3-different-ways-in-node-js-e39d9d11ba8

    return params;
  }

  return new URLSearchParams();
};
