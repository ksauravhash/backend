const express = require("express");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
