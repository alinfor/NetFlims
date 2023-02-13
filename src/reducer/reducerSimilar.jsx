
const initialState = [];

export const reducerSimilar = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIE_SIMILAR":
      // console.log(action);
      return action.movies;
    default:
      return state;
  }
};
