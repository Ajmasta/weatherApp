export const setLocationInput = (input) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_SEARCH_INPUT", data: input });
  };
};
const reducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_SEARCH": {
      return action.data;
    }
    case "CLEAR": {
      return action.data;
    }
    case "NEW_SEARCH_INPUT": {
      return action.data;
    }
    case "NEW_SEARCH_RESULTS": {
      return state;
    }
    default: {
      return state;
    }
  }
};
export default reducer;

// SLOCATION NAME  = LOCATIONS CLICKED ON, MAKE A NEW ACTION FOR SEARCHED LOCATIONS
