const express = require("express");
const geoip = require('geoip-lite');
const movieManager = require("../managers/movieManager");

const getCurrentlyPlayingMovies = async (req, res) => {
  const geo = geoip.lookup(req.ip);
  const locale = req.locale;
  const page = req.query.page || 1; // Default to page 1
  // geo will be undefined for localhost (127.0.0.1 / ::1)
  const region = geo ? geo.country : "US"; // Default to United states
  const data = await movieManager.getCurrentlyPlayingMovies(locale, page, region);
  res.status(200).send({data});
};

const getMoviesBasedOnQuery = async (req, res) => {
  res.status(200).send({message: "getMoviesBasedOnQuery"});
};

const movieController = express.Router();
movieController.get("/currently_playing", getCurrentlyPlayingMovies);
movieController.get("/search", getMoviesBasedOnQuery);

module.exports = { movieController };
