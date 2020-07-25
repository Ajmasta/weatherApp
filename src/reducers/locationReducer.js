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
export const setId = (id) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_ID", data: id });
  };
};
const reducer = (state = { name: [], id: [] }, action) => {
  switch (action.type) {
    case "NEW_NAME": {
      let newName = state.name.concat(action.data);
      newName = newName.filter((a, i) => newName.indexOf(a) === i);
      return {
        name: newName,
        startDate: state.startDate,
        id: state.id,
        endDate: state.endDate,
      };
    }
    case "NEW_START_DATE": {
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
    case "NEW_ID": {
      let newId = state.id.concat(action.data);
      newId = newId.filter((a, i) => newId.indexOf(a) === i);
      return {
        endDate: state.endDate,
        name: state.name,
        startDate: state.startDate,
        id: newId,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
