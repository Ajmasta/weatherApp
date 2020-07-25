export const setInfos = (infos) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_INFO", data: infos });
  };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_INFO": {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
