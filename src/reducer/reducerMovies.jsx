import _, { clone } from "lodash";

const initialState = [];

export const reducerMovies = (state = initialState, action) => {
  const cloneState = _.cloneDeep(state);
  switch (action.type) {
    case "INIT_MOVIES":
      return action.movies;
    case "FETCH_MOVIE_SCROLL":
      // To track all id's that already exist to compare them with the new id's in the action.movies array
      let ids = [];
      for (let movie of cloneState) {
        ids.push(movie.id);
      }

      action.movies.map((item) => {
        if (!ids.includes(item.id)) {
          cloneState.push(item);
        }
      });
      return cloneState;
    default:
      return state;
  }
};
