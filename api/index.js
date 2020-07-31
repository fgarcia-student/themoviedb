require("dotenv").config();
const express = require("express");
const cors = require("cors");
const locale = require("locale");
const langs = require("langs");
const supportedLangs = new locale.Locales(langs.codes("1")); // ISO 639-1

const { movieController } = require("./controllers/movieController");

const app = express();
const port = process.env.PORT || 8080; // default port to listen

app
  // middleware
  .use(locale(supportedLangs, "en")) // default to english locale
  .use(cors())
  // routes
  .use("/movies", movieController)
  // start the Express server
  .listen(port);
