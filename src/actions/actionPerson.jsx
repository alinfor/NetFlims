export const fetchData = () => {
  return async dispatch => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=${import.meta.env.VITE_API_KEY}`
    );
    const responseData = await response.json();
    let people = responseData.results;
    // console.log(movies);
    dispatch({ type: "FETCH_DATA", data: people });
  };
};