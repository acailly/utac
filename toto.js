const Response = require("./Response");

module.exports = ({}) => {
  const content = "Hello World!";
  var init = { status: 200 };
  return new Response(content, init);
};
