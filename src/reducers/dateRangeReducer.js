export const setDateRange = (name) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_DATERANGE", data: name });
  };
};

const reducer = (state = "dateRange1", action) => {
  switch (action.type) {
    case "NEW_DATERANGE": {
      return action.data;
    }
    default:
      return state;
  }
};

export default reducer;
