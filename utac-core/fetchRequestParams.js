module.exports = async function (fetchRequest) {
  if (fetchRequest.method === "GET") {
    const url = new URL(fetchRequest.url);
    const params = new URLSearchParams(url.search);
    return params;
  } else if (fetchRequest.method === "POST") {
    // Inspired from https://github.com/node-fetch/node-fetch/issues/857#issuecomment-638954525
    const text = await fetchRequest.text();
    const params = new URLSearchParams(text);
    return params;
  }

  return new URLSearchParams();
};
