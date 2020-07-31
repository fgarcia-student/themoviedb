const api = apiClient();
const searchBar = document.getElementById("search");
searchBar.addEventListener("keydown", async (e) => {
  const enterPressed = e.keyCode === 13;
  if (enterPressed) {
    // search using given parameters
    const data = await api.search(e.target.value);
    displayResults(data);
  }
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displayResults(data) {
  const resultsContainer = document.getElementById("results");
  removeAllChildNodes(resultsContainer);
  data.data.results.map((result) => {
    const movieCard = document.createElement("div");

    const title = document.createElement("h2");
    title.innerText = result.title;

    const overview = document.createElement("h3");
    overview.innerText = result.overview;

    const releaseDate = document.createElement("h4");
    releaseDate.innerText = result.release_date;

    const voteAverage = document.createElement("h4");
    voteAverage.innerText = result.vote_average;

    const poster = document.createElement("img");
    let posterUrl = `${client_env.imageUrl}/w500${result.poster_path}`;
    if (!result.poster_path) {
      // use default image
      posterUrl = "";
    }
    poster.src = posterUrl;

    movieCard.append(title, overview, releaseDate, voteAverage, poster);
    resultsContainer.appendChild(movieCard);
  })
}