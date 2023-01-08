import bodyParser, { json } from "body-parser";
import express from "express";
import "dotenv/config";
import { toJson, toEncryptedKey, toCarFile } from "./scripts/utilities";

const app = express();

const PORT = process.env.PORT;

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/reg", async (req, res) => {
  try {
    let jsondata = toJson(req.data);
    toEncryptedKey(jsondata);
    toCarFile();
  } catch (err) {
    console.log(err);
  }
  res.render("confirmed");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
