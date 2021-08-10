const path = require("path");
const express = require("express");
const requestHandler = require("./utac-core/requestHandler");

const port = 5678;

const app = express();

app.use(express.static(path.join(__dirname, "app", "public")));

app.all("*", requestHandler);

app.listen(port, () => {
  console.log("APP STARTED ON PORT", port, `: http://localhost:${port}`);
});
