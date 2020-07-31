export const getTodayDate = (date) => {
  return async (dispatch) => {
    const previousDates = (date, time) => {
      let lastWeek = new Date(date - time * 24 * 60 * 60 * 1000);
      return lastWeek;
    };
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

    let lastWeekFormatted =
      formatDate(previousDates(date, 7)).year +
      "-" +
      formatDate(previousDates(date, 7)).month +
      "-" +
      formatDate(previousDates(date, 7)).day;

    let lastMonthFormatted =
      formatDate(previousDates(date, 30)).year +
      "-" +
      formatDate(previousDates(date, 30)).month +
      "-" +
      formatDate(previousDates(date, 30)).day;
    let lastYearFormatted =
      formatDate(previousDates(date, 365)).year +
      "-" +
      formatDate(previousDates(date, 365)).month +
      "-" +
      formatDate(previousDates(date, 365)).day;
    let lastThreeDaysFormatted =
      formatDate(previousDates(date, 3)).year +
      "-" +
      formatDate(previousDates(date, 3)).month +
      "-" +
      formatDate(previousDates(date, 3)).day;
    console.log(lastYearFormatted);
    dispatch({
      type: "TODAY_DATE",
      data: {
        formatted_date,
        lastWeekFormatted,
        lastMonthFormatted,
        lastYearFormatted,
        lastThreeDaysFormatted,
      },
    });
  };
};

const reducer = (state = { today: "", lastWeek: "" }, action) => {
  switch (action.type) {
    case "TODAY_DATE": {
      let dates = {};
      dates.today = action.data.formatted_date;
      dates.lastWeek = action.data.lastWeekFormatted;
      dates.lastMonth = action.data.lastMonthFormatted;
      dates.lastYear = action.data.lastYearFormatted;
      dates.threeDays = action.data.lastThreeDaysFormatted;
      return dates;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
