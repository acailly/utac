const path = require("path");
const express = require("express");
const nodeRequestHandler = require("./utac-node/nodeRequestHandler");
const { nextTick } = require("process");

const port = 5678;

const app = express();

app.use(express.static(path.join(__dirname, "app", "public")));

// DEBUG ajoute 1 seconde de latence
app.use(async function (req, res, next) {
  console.log("Waiting for 1 seconds");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  next();
});

app.all("*", nodeRequestHandler);

app.listen(port, () => {
  console.log("APP STARTED ON PORT", port, `: http://localhost:${port}`);
});
