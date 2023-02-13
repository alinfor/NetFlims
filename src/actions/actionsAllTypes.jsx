
export const fetchAllTypes = () => {
  return async dispatch => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&page=5`);
    const responseAll = await response.json();
    let allTypes = responseAll.results;
    dispatch({ type: "FETCH_ALL_TYPES", allTypes });
  };
};