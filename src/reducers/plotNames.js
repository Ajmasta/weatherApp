export const setMarkerNames = (name, number) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_MARKER_NAME", data: name, number });
  };
};
export const reducer = (
  state = {
    one: "Data 1",
    two: "Data 2",
    three: "Data 3",
  },
  action
) => {
  switch (action.type) {
    case "NEW_MARKER_NAME": {
      switch (action.number) {
        case "1": {
          return {
            one: action.data,
            two: state.two,
            three: state.three,
          };
        }
        case "2": {
          return {
            one: state.one,
            two: action.data,
            three: state.three,
          };
        }
        case "3": {
          return {
            one: state.one,
            two: state.two,
            three: action.data,
          };
        }
        default: {
          return state;
        }
      }
    }
    default: {
      return state;
    }
  }
};
export default reducer;
