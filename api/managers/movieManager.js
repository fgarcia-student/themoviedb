const axios = require("axios").default;

const getCurrentlyPlayingMovies = async (locale, page, region) => {
  const url = process.env.ROOT_URL;
  const apiKey = process.env.API_KEY;
  const res = await axios.get(`${url}/movie/now_playing?api_key=${apiKey}&language=${locale}&page=${page}&region=${region}`);
  return res.data;
}

module.exports = {
  getCurrentlyPlayingMovies,
}