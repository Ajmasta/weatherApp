export const setName = (name) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_NAME", data: name });
  };
};
export const setStartDate = (date) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_START_DATE", data: date });
  };
};
export const setEndDate = (date) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_END_DATE", data: date });
  };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_NAME": {
      return {
        name: action.data,
        startDate: state.startDate,
        id: state.id,
        endDate: state.endDate,
      };
    }
    case "NEW_START_DATE": {
      console.log(state);
      return {
        name: state.name,
        startDate: action.data,
        id: state.id,
        endDate: state.endDate,
      };
    }
    case "NEW_END_DATE": {
      return {
        endDate: action.data,
        name: state.name,
        startDate: state.startDate,
        id: state.id,
      };
    }
    case "LOCATION_ID": {
      return {
        endDate: state.endDate,
        name: state.name,
        startDate: state.startDate,
        id: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
