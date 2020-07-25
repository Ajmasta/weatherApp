export const setExpandedTab = (panel) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_PANEL", data: panel });
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case "NEW_PANEL": {
      return action.data;
    }
  }
};

export default reducer;
