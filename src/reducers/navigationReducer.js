export const setNavigationPath = (location) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_NAVIGATION", data: location });
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_NAVIGATION": {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
