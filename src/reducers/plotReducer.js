export const setMode = (mode) => {
  return async (dispatch) => {
    dispatch({ type: "MODE_CHANGE", data: mode });
  };
};
export const setBarMode = (barmode) => {
  return async (dispatch) => {
    dispatch({ type: "BARMODE_CHANGE", data: barmode });
  };
};

export const setType = (type) => {
  return async (dispatch) => {
    dispatch({ type: "TYPE_CHANGE", data: type });
  };
};
export const setMarker = (color, number) => {
  return async (dispatch) => {
    dispatch({ type: "MARKER_CHANGE", data: color, number });
  };
};

export const reducer = (
  state = {
    mode: "lines",
    type: "scatter",
    marker: { color: "#e83c11" },
    marker1: { color: "#2812ce" },
    marker2: { color: "#d41c1c" },
  },
  action
) => {
  switch (action.type) {
    case "MODE_CHANGE": {
      return {
        mode: action.data,
        type: state.type,
        marker: state.marker,
        marker1: state.marker1,
        marker2: state.marker2,
        barmode: state.barmode,
      };
    }
    case "TYPE_CHANGE": {
      return {
        mode: state.mode,
        type: action.data,
        marker: state.marker,
        marker1: state.marker1,
        marker2: state.marker2,
        barmode: state.barmode,
      };
    }
    case "BARMODE_CHANGE": {
      return {
        mode: state.mode,
        type: state.type,
        marker: state.marker,
        marker1: state.marker1,
        marker2: state.marker2,
        barmode: action.data,
        markerNames: state.markerNames,
      };
    }
    case "MARKER_CHANGE": {
      switch (action.number) {
        case "1": {
          return {
            mode: state.mode,
            type: state.type,
            marker: { color: action.data },
            marker1: state.marker1,
            marker2: state.marker2,
            barmode: state.barmode,
          };
        }
        case "2": {
          return {
            mode: state.mode,
            type: state.type,
            marker: state.marker,
            marker1: { color: action.data },
            marker2: state.marker2,
            barmode: state.barmode,
          };
        }
        case "3": {
          return {
            mode: state.mode,
            type: state.type,
            marker: state.marker,
            marker1: state.marker1,
            marker2: { color: action.data },
            barmode: state.barmode,
          };
        }
        default:
          return state;
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
