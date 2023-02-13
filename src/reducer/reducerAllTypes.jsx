const initialState = [];

export const reducerAllTypes = (state = initialState, action) => {

  switch (action.type) {
    case "FETCH_ALL_TYPES":
      return action.allTypes;
    default:
      return state;
  }
};
