class apiClient {
  constructor() {
    // search
    this.nextPage = 0;
    this.lastPage = 0;
    this.lastQuery = "";

    // currently playing
    this.nextCurrentlyPlayingPage = 0;
    this.lastCurrentlyPlayingPage = 0;
  }

  isEndSearch = (page = this.nextPage) => {
    return page > this.lastPage;
  }

  isEndCurrentlyPlaying = (page = this.nextCurrentlyPlayingPage) => {
    return page > this.lastCurrentlyPlayingPage;
  }

  search = async (query, page = this.nextPage) => {
    this.nextCurrentlyPlayingPage = 0;
    this.lastCurrentlyPlayingPage = 0;
    if (query !== this.lastQuery) {
      this.nextPage = 0;
      this.lastPage = 0;
      this.lastQuery = query;
      page = 0;
    }
    if (page !== 0 && this.isEndSearch(page)) {
      alert("No more movies available!");
      return;
    }
    try {
      const res = await fetch(`${client_env.apiUrl}/movies/search?query=${query}${page === 0 ? "" : `&page=${page}`}`);
      const data = await res.json();
      const currentPage = data.data.page;
      this.lastPage = data.data.total_pages;
      this.nextPage = currentPage + 1;
      return data;
    }
    catch (e) {
      console.error(e);
      alert("Could not fulfill request. Check console for more information.");
    }
  }

  currentlyPlaying = async (page = this.nextCurrentlyPlayingPage) => {
    this.nextPage = 0;
    this.lastPage = 0;
    this.lastQuery = "";
    if (page !== 0 && this.isEndCurrentlyPlaying(page)) {
      alert("No more movies available!");
      return;
    }
    try {
      const res = await fetch(`${client_env.apiUrl}/movies/currently_playing${page === 0 ? "" : `?page=${page}`}`);
      const data = await res.json();
      const currentPage = data.data.page;
      this.lastCurrentlyPlayingPage = data.data.total_pages;
      this.nextCurrentlyPlayingPage = currentPage + 1;
      return data;
    }
    catch (e) {
      console.error(e);
      alert("Could not fulfill request. Check console for more information.");
    }
  }
}

