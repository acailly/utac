const path = require("path");
const express = require("express");
const nodeRequestHandler = require("./utac-node/nodeRequestHandler");

const port = 5678;

const app = express();

app.use(express.static(path.join(__dirname, "app", "public")));

app.all("*", nodeRequestHandler);

app.listen(port, () => {
  console.log("APP STARTED ON PORT", port, `: http://localhost:${port}`);
});
