const express = require("express");
const geoip = require('geoip-lite');
const movieManager = require("../managers/movieManager");

const getCurrentlyPlayingMovies = async (req, res) => {
  const geo = geoip.lookup(req.ip);
  const locale = req.locale;
  const page = req.query.page || 1; // Default to page 1
  // geo will be undefined for localhost (127.0.0.1 / ::1)
  const region = geo ? geo.country : "US"; // Default to United states
  try {
    const data = await movieManager.getCurrentlyPlayingMovies({locale, page, region});
    res.status(200).send({data});
  } catch (e) {
    res.status(500).send({err: e});
  }
};

const getMoviesBasedOnQuery = async (req, res) => {
  const geo = geoip.lookup(req.ip);
  const locale = req.locale;
  const page = req.query.page || 1; // Default to page 1
  // geo will be undefined for localhost (127.0.0.1 / ::1)
  const region = geo ? geo.country : "US"; // Default to United states
  const includeAdult = process.env.INCLUDE_ADULT === 1; // hmmmmmmmmmmmm
  const query = req.query.query;
  if (!query) {
    res.status(400).send({err: "You must provide a search term"});
  }
  try {
    const data = await movieManager.getMoviesBasedOnQuery({locale, page, region, includeAdult, query});
    res.status(200).send({data});
  } catch (e) {
    res.status(500).send({err: e});
  }
};

const movieController = express.Router();
movieController.get("/currently_playing", getCurrentlyPlayingMovies);
movieController.get("/search", getMoviesBasedOnQuery);

module.exports = { movieController };
