export const fetchSimilar = (movie_id,media_type) => {
    return async dispatch => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${movie_id}/similar?api_key=${import.meta.env.VITE_API_KEY}`
      );
      const responseData = await response.json();
      let movies = responseData.results;
      dispatch({ type: "FETCH_MOVIE_SIMILAR", movies });
    };
  };
  