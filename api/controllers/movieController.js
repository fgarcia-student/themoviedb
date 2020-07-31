const express = require("express");
const movieManager = require("../managers/movieManager");

const getCurrentlyPlayingMovies = async (req, res) => {
  const locale = req.locale;
  const page = req.query.page || 1;
  const data = await movieManager.getCurrentlyPlayingMovies(locale, page);
  res.status(200).send({data});
};

const getMoviesBasedOnQuery = async (req, res) => {
  res.status(200).send({message: "getMoviesBasedOnQuery"});
};

const movieController = express.Router();
movieController.get("/currently_playing", getCurrentlyPlayingMovies);
movieController.get("/search", getMoviesBasedOnQuery);

module.exports = { movieController };
