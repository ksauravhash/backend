import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";
import {
  toJson,
  toEncryptedKey,
  toCarFile,
  storeNFT,
} from "./scripts/utilities.js";

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
    let jsondata = toJson(req.body);
    toEncryptedKey(jsondata);
    toCarFile();
    let data = await storeNFT();
    res.render("confirmed", {
      data: {
        info: `Your file is at ${data}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
  res.render("confirmed", "Failed");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
