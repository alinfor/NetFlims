export const fetchScrollSeries = (pageIndex) => {
  return async dispatch => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${import.meta.env.VITE_API_KEY}&page=${pageIndex}`
    );
    const responseData = await response.json();
    let series = responseData.results;
    dispatch({ type: "FETCH_SERIES_SCROLL", series });
  };
};