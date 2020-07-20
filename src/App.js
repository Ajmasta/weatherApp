import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setStartDate,
  setEndDate,
  getLocationID,
} from "./reducers/locationReducer";
import { getTodayDate } from "./reducers/todayDateReducer";

import Form from "./components/Form";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const date = new Date();
    dispatch(getTodayDate(date));
  });

  const locationName = useSelector((state) => state.location.name);
  const startDate = useSelector((state) => state.location.startDate);
  const endDate = useSelector((state) => state.location.endDate);
  const todayDate = useSelector((state) => state.todayDate);

  console.log(locationName);

  const getLocationID = async (name) => {
    const locationInfo = await fetch(
      `https://api.meteostat.net/v2/stations/search?query=${name}`,
      {
        method: "GET",
        headers: { "x-api-key": "U6jdEMaNKSp4RfvG2oYDc16KrTtzbHog" },
      }
    );
    const formattedInfo = await locationInfo.json();
    console.log("ID", formattedInfo);
    return formattedInfo;
  };

  const getWeatherInfo = async (startDate, endDate, location) => {
    let completeRequest = true;
    const stationID = await getLocationID(location)
      .then((response) => response.data[0].id)
      .catch((err) => {
        console.log(err);
      });
    console.log(stationID);
    if (!stationID) completeRequest = false;
    if (completeRequest) {
      const weatherInfo = await fetch(
        `https://api.meteostat.net/v2/stations/daily?station=${stationID}&start=${startDate}&end=${endDate}`,
        {
          method: "GET",
          headers: { "x-api-key": "U6jdEMaNKSp4RfvG2oYDc16KrTtzbHog" },
        }
      );
      const formattedInfo = await weatherInfo.json();
      console.log(formattedInfo.data);
    }
  };
  if (todayDate) getWeatherInfo(todayDate, todayDate);

  getLocationID("montreal");

  return (
    <div className="App">
      <body>
        <Form getWeatherInfo={getWeatherInfo} />
      </body>
    </div>
  );
};

export default App;
