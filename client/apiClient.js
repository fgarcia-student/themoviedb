function apiClient() {
  // search
  let nextPage = 0;
  let lastPage = 0;
  let lastQuery = "";

  // currently playing
  let nextCurrentlyPlayingPage = 0;
  let lastCurrentlyPlayingPage = 0;
  return {
    search: async (query, page = nextPage) => {
      if (query !== lastQuery) {
        nextPage = 0;
        lastPage = 0;
        lastQuery = query;
        page = 0;
      }
      if (page !== 0 && page > lastPage) {
        alert("No more movies available!");
        return;
      }
      try {
        const res = await fetch(`${client_env.apiUrl}/movies/search?query=${query}${page === 0 ? "" :`&page=${page}`}`)
        const data = await res.json();
        const currentPage = data.data.page;
        lastPage = data.data.total_pages;
        nextPage = currentPage + 1;
        return data;
      } catch (e) {
        console.error(e);
        alert("Could not fulfill request. Check console for more information.");
      }
    },
    currentlyPlaying: async (page = nextCurrentlyPlayingPage) => {
      if (page !== 0 && page > lastCurrentlyPlayingPage) {
        alert("No more movies available!");
        return;
      }
      try {
        const res = await fetch(`${client_env.apiUrl}/movies/currently_playing${page === 0 ? "" :`?page=${page}`}`)
        const data = await res.json();
        const currentPage = data.data.page;
        lastCurrentlyPlayingPage = data.data.total_pages;
        nextCurrentlyPlayingPage = currentPage + 1;
        return data;
      } catch (e) {
        console.error(e);
        alert("Could not fulfill request. Check console for more information.");
      }
    } 
  }
}

