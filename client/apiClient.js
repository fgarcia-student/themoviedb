function apiClient() {
  let nextPage = 0;
  let lastPage = 0;
  let lastQuery = "";
  return {
    search: async (query) => {
      if (query !== lastQuery) {
        nextPage = 0;
        lastPage = 0;
        lastQuery = query;
      }
      if (nextPage !== 0 && nextPage > lastPage) {
        alert("No more movies available!");
        return;
      }
      try {
        console.log({lastQuery, lastPage, nextPage})
        const res = await fetch(`${client_env.apiUrl}/movies/search?query=${query}${nextPage === 0 ? "" :`&page=${nextPage}`}`)
        const data = await res.json();
        const currentPage = data.data.page;
        lastPage = data.data.total_pages;
        nextPage = currentPage + 1;
        console.log(data);
      } catch (e) {
        console.error(e);
        alert("Could not fulfill request. Check console for more information.");
      }
    }
  }
}
