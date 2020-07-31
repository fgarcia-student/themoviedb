function apiClient() {
  let nextPage = 0;
  let lastPage = 0;
  let lastQuery = "";
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
        console.log({lastQuery, lastPage, nextPage})
        console.log(data);
      } catch (e) {
        console.error(e);
        alert("Could not fulfill request. Check console for more information.");
      }
    }
  }
}
