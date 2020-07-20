import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setName, setStartDate, setEndDate } from "../reducers/locationReducer";

const Form = ({ getWeatherInfo }) => {
  const dispatch = useDispatch();
  const locationName = useSelector((state) => state.location.name);
  const startDate = useSelector((state) => state.location.startDate);
  const endDate = useSelector((state) => state.location.endDate);

  const handleNameChange = (e) => {
    return dispatch(setName(e.target.value));
  };
  const handleStartDateChange = (e) => {
    return dispatch(setStartDate(e.target.value));
  };
  const handleEndDateChange = (e) => {
    return dispatch(setEndDate(e.target.value));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getWeatherInfo(startDate, endDate, locationName);
      }}
    >
      <input name="location" onChange={handleNameChange} />
      Start date:{" "}
      <input
        type="date"
        name="startDate"
        onChange={handleStartDateChange}
      ></input>
      End Date:{" "}
      <input type="date" name="endDate" onChange={handleEndDateChange}></input>
      <button info="submit">Submit</button>
    </form>
  );
};

export default Form;
