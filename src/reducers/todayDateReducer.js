export const getTodayDate = (date) => {
  return async (dispatch) => {
    const formatDate = (date) => {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) month = "0" + (date.getMonth() + 1);
      if (day < 10) day = "0" + date.getDate();
      const finalDate = { year: date.getFullYear(), month, day };
      return finalDate;
    };
    let formatted_date =
      formatDate(date).year +
      "-" +
      formatDate(date).month +
      "-" +
      formatDate(date).day;
    dispatch({ type: "TODAY_DATE", data: formatted_date });
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case "TODAY_DATE": {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
