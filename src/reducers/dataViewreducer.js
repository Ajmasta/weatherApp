export const setDataView = (view) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_DATAVIEW", data: view });
  };
};

const reducer = (state = "daily", action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case "NEW_DATAVIEW": {
      return action.data;
    }
  }
};
export default reducer;
