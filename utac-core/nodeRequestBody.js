module.exports = async function (nodeRequest) {
  const hasBody = nodeRequest.method !== "GET" && nodeRequest.method !== "HEAD";

  if (hasBody) {
    // Inspired from https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
    const buffers = [];
    for await (const chunk of nodeRequest) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    return data;
  }

  return null;
};
