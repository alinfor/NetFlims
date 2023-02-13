export const initMovies = () => {
    return async dispatch => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}&page=1`
      );
      const responseData = await response.json();
      let movies = responseData.results;
      dispatch({ type: "INIT_MOVIES", movies });
    };
  };