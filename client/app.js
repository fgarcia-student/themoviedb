const api = new apiClient();
const searchBar = document.getElementById("search");
searchBar.addEventListener("keydown", async (e) => {
  const enterPressed = e.keyCode === 13;
  if (enterPressed) {
    // search using given parameters
    const data = await api.search(e.target.value);
    displayResults(data);
  }
});

const mode = document.getElementById("mode");
mode.addEventListener("click", async (e) => {
  if (mode.value === "currentlyPlaying") {
    mode.value = "search";
    mode.innerText = "MODE: Search";
    searchBar.style.display = "block";
  } else {
    mode.value = "currentlyPlaying";
    mode.innerText = "MODE: Currently Playing";
    searchBar.style.display = "none";
    const data = await api.currentlyPlaying(0);
    displayResults(data);
  }

})

const prevPageBtn = document.getElementById("prev_page");
prevPageBtn.addEventListener("click", async (e) => {
  let data = {};
  nextPageBtn.disabled = false;
  if (mode.value === "currentlyPlaying") {
    data = await api.currentlyPlaying(api.nextCurrentlyPlayingPage - 2);
    if (api.nextCurrentlyPlayingPage - 2 <= 0) {
      prevPageBtn.disabled = true;
    }
  } else {
    data = await api.search(searchBar.value, api.nextPage - 2);
    if (api.nextPage - 2 <= 0) {
      prevPageBtn.disabled = true;
    }
  }
  displayResults(data);
});

const nextPageBtn = document.getElementById("next_page");
nextPageBtn.addEventListener("click", async (e) => {
  let data = {};
  prevPageBtn.disabled = false;
  if (mode.value === "currentlyPlaying") {
    data = await api.currentlyPlaying();
    if (api.isEndCurrentlyPlaying()) {
      nextPageBtn.disabled = true;
    }
  } else {
    data = await api.search(searchBar.value);
    if (api.isEndSearch()) {
      nextPageBtn.disabled = true;
    }
  }

  displayResults(data);
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displayResults(data) {
  if (!data) {
    return;
  }
  const resultsContainer = document.getElementById("results");
  removeAllChildNodes(resultsContainer);
  data.data.results.map((result) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.style.border = "1px solid black";
    movieCard.style.padding = "5px";
    movieCard.style.margin = "5px";

    const title = document.createElement("h2");
    title.innerText = result.title;

    const overview = document.createElement("h3");
    overview.innerText = result.overview;

    const releaseDate = document.createElement("h4");
    releaseDate.innerText = result.release_date;

    const voteAverage = document.createElement("h4");
    voteAverage.innerText = result.vote_average;

    const poster = document.createElement("img");
    let posterUrl = `${client_env.imageUrl}/w342${result.poster_path}`;
    if (!result.poster_path) {
      // use default image
      posterUrl = "";
    }
    poster.src = posterUrl;
    poster.style.width = "100%";

    movieCard.append(title, overview, releaseDate, voteAverage, poster);
    resultsContainer.appendChild(movieCard);
  })
}

// initial data 
api.currentlyPlaying().then(displayResults)