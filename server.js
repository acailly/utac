const express = require("express");
const requestHandler = require("./requestHandler");

const port = 5678;

const app = express();

app.all("*", requestHandler);

app.listen(port, () => {
  console.log("APP STARTED ON PORT", port, `: http://localhost:${port}`);
});
