const express = require("express");
const path = require("path");

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
