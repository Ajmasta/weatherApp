import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../reducers/locationReducer";
import { setInfos } from "../reducers/infoReducer";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import CancelSharpIcon from "@material-ui/icons/CancelSharp";

import { setHidden } from "../reducers/hiddenBarReducer";
const DateTab = ({ startDate, endDate, todayDate }) => {
  const dispatch = useDispatch();

  const handleStartDateChange = (e) => {
    dispatch(setInfos(null));
    return dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e) => {
    dispatch(setInfos(null));
    return dispatch(setEndDate(e.target.value));
  };

  return (
    <>
      <span className="dateSpan flex">
        <form
          className="changeDateForm"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(setHidden(true));
          }}
        >
          <TextField
            className="dateInput"
            type="date"
            name="startDate"
            label="Start Date"
            onChange={handleStartDateChange}
            inputProps={{ max: endDate }}
            defaultValue={startDate}
          />

          {"   "}
          <TextField
            className="dateInput"
            type="date"
            placeholder={todayDate}
            inputProps={{ max: todayDate }}
            defaultValue={endDate}
            name="endDate"
            label="End Date"
            onChange={handleEndDateChange}
          />
        </form>
      </span>
      <IconButton
        onClick={() => {
          dispatch(setHidden(true));
        }}
      >
        <CancelSharpIcon />
      </IconButton>
    </>
  );
};

export default DateTab;
