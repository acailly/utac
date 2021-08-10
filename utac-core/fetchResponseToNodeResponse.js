// https://nodejs.org/api/http.html
// https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
module.exports = async function (fetchResponse, nodeResponse) {
  const headers = {};
  fetchResponse.headers.forEach(function (val, key) {
    // TODO Est ce que ca gère bien les headers à valeur multiple ?
    headers[key] = val;
  });
  nodeResponse.writeHead(
    fetchResponse.status,
    fetchResponse.statusText,
    headers
  );
  // TODO est ce que text() gère bien les cas où le body est un form data ou du json ?
  const fetchResponseText = await fetchResponse.text();
  nodeResponse.write(fetchResponseText);
};
