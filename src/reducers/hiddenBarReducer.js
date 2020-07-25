export const setHidden = (hidden) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_HIDDEN", data: hidden });
  };
};

const reducer = (state = true, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case "NEW_HIDDEN": {
      return action.data;
    }
  }
};
export default reducer;
