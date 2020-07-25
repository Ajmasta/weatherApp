import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setId,
  setStartDate,
  setEndDate,
} from "../reducers/locationReducer";
import stationData from "../stations.json";
import { useLocation } from "react-router-dom";
import PlotDrawer from "./Plot";

import { setMarkerNames } from "../reducers/plotNames";

import { setExpandedTab } from "../reducers/expandedTabreducer";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import { setDataView } from "../reducers/dataViewreducer";
import { setInfos } from "../reducers/infoReducer";

import Paper from "@material-ui/core/Paper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";

const Info = () => {
  const dataView = useSelector((state) => state.dataView);
  const { promiseInProgress } = usePromiseTracker();
  const expanded = useSelector((state) => state.expandedTab);
  const infos = useSelector((state) => state.infos);
  const [graphType, setGraphType] = useState("temp");
  const todayDate = useSelector((state) => state.todayDate);

  let startDate = useSelector((state) => state.location.startDate);
  let endDate = useSelector((state) => state.location.endDate);
  const [id, setParamId] = useState(useParams().id);

  const pageLocation = useLocation();
  const dispatch = useDispatch();
  const [station, setStation] = useState(
    stationData.find((station) => station.id === id)
  );
  const hourlyDisabled = station.inventory.hourly.start === null ? true : false;
  const dailyDisabled = station.inventory.daily.start === null ? true : false;
  dispatch(setName(station.name.en));
  dispatch(setId(station.id));

  if (dailyDisabled && dataView === "daily") dispatch(setDataView("hourly"));

  let infoFormatted = [];

  useEffect(() => {
    const setAllMarkers = () => {
      let [yName, y1Name, y2Name] = "";
      if (dataView === "daily") {
        if (graphType === "temp") {
          yName = "Average";
          y1Name = "Min";
          y2Name = "Max";
        } else if (graphType === "prcp") {
          yName = "Precipitations";
          y1Name = "Snow";
          y2Name = null;
        }
      } else if (dataView === "hourly") {
        if (graphType === "temp") {
          yName = "Temperature";
          y1Name = "Dewpoint";
          y2Name = null;
        } else if (graphType === "prcp") {
          yName = "Rel. Humidity";
          y1Name = null;
          y2Name = null;
        }
      }
      dispatch(setMarkerNames(yName, "1"));
      dispatch(setMarkerNames(y1Name, "2"));
      dispatch(setMarkerNames(y2Name, "3"));
    };
    setAllMarkers();
  }, [graphType, dataView, infos, dispatch]);

  const getWeatherInfo = async (startDate, endDate, stationID, type) => {
    if (type === "daily") {
      const weatherInfo = await trackPromise(
        fetch(
          `https://api.meteostat.net/v2/stations/daily?station=${stationID}&start=${startDate}&end=${endDate}`,
          {
            method: "GET",
            headers: { "x-api-key": "U6jdEMaNKSp4RfvG2oYDc16KrTtzbHog" },
          }
        )
      );
      const formattedInfo = await trackPromise(weatherInfo.json());

      return formattedInfo.data;
    } else if (type === "hourly") {
      const weatherInfo = await trackPromise(
        fetch(
          `https://api.meteostat.net/v2/stations/hourly?station=${stationID}&start=${startDate}&end=${endDate}`,
          {
            method: "GET",
            headers: { "x-api-key": "U6jdEMaNKSp4RfvG2oYDc16KrTtzbHog" },
          }
        )
      );

      const formattedInfo = await trackPromise(weatherInfo.json());

      return formattedInfo.data;
    }
  };
  useEffect(() => {
    dispatch(setInfos(null));
    setStation(stationData.find((station) => station.id === id));
  }, [dispatch, id, pageLocation]);

  useEffect(() => {
    if (!infos) {
      getWeatherInfo(startDate, endDate, id, dataView)
        .catch((err) => "")
        .then((value) => {
          if (value) infoFormatted = [...value];
          if (infoFormatted.length > 0) dispatch(setInfos(infoFormatted));
        });
    }
  }, [startDate, endDate, infos, id, dataView, graphType]);

  return (
    <Paper elevation={0}>
      <div className="infos">
        <ToggleButtonGroup type="checkbox" value={dataView} size="sm">
          <ToggleButton
            disabled={hourlyDisabled}
            onClick={() => {
              if (!hourlyDisabled) {
                dispatch(setDataView("hourly"));
                if (document.querySelector(".clickedDate"))
                  document
                    .querySelector(".clickedDate")
                    .classList.remove("clickedDate");
                dispatch(setInfos(null));
              }
            }}
            value={"hourly"}
          >
            Hourly
          </ToggleButton>

          <ToggleButton
            disabled={dailyDisabled}
            value={"daily"}
            onClick={(e) => {
              if (!dailyDisabled) {
                dispatch(setDataView("daily"));
                if (document.querySelector(".clickedDate"))
                  document
                    .querySelector(".clickedDate")
                    .classList.remove("clickedDate");
                dispatch(setInfos(null));
              }
            }}
          >
            Daily
          </ToggleButton>
        </ToggleButtonGroup>

        <div>
          <h2>{station.name.en}</h2>
          <h3 id="dateInfos">
            {startDate !== endDate
              ? `From ${startDate} to ${endDate}`
              : `${startDate}`}
          </h3>
          <div className="infoCards">
            <span
              className="infoCard"
              name={dataView === "daily" ? "Week" : "Today"}
              onClick={(e) => {
                if (document.querySelector(".clickedDate"))
                  document
                    .querySelector(".clickedDate")
                    .classList.remove("clickedDate");
                e.target.classList.add("clickedDate");
                dataView === "daily"
                  ? dispatch(setStartDate(todayDate.lastWeek))
                  : dispatch(setStartDate(todayDate.today));
                if (expanded === "") dispatch(setExpandedTab("panel1"));
                dispatch(setInfos(null));
              }}
            >
              {dataView === "daily" ? "Week" : "Today"}
            </span>

            <span
              value={dataView === "daily" ? "Month" : "3 Days "}
              onClick={(e) => {
                if (document.querySelector(".clickedDate"))
                  document
                    .querySelector(".clickedDate")
                    .classList.remove("clickedDate");
                e.target.classList.add("clickedDate");

                dataView === "daily"
                  ? dispatch(setStartDate(todayDate.lastMonth))
                  : dispatch(setStartDate(todayDate.threeDays));
                dispatch(setEndDate(todayDate.today));
                if (expanded === "") dispatch(setExpandedTab("panel1"));
                dispatch(setInfos(null));
              }}
              className="infoCard"
            >
              {dataView === "daily" ? "Month" : "3 Days "}
            </span>
            <span
              name={dataView === "daily" ? "Year" : "Week"}
              onClick={(e) => {
                if (document.querySelector(".clickedDate"))
                  document
                    .querySelector(".clickedDate")
                    .classList.remove("clickedDate");
                e.target.classList.add("clickedDate");
                dataView === "daily"
                  ? dispatch(setStartDate(todayDate.lastYear))
                  : dispatch(setStartDate(todayDate.lastWeek));
                dispatch(setEndDate(todayDate.today));
                if (expanded === "") dispatch(setExpandedTab("panel1"));
                dispatch(setInfos(null));
              }}
              className="infoCard"
            >
              {dataView === "daily" ? "Year" : "Week"}
            </span>
          </div>
          <div>
            <div className="accordionBlock">
              <Accordion expanded={expanded === "panel1"}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={
                    expanded === "panel1"
                      ? "panel1a-header expanded"
                      : "panel1a-header"
                  }
                  onClick={() => {
                    setGraphType("temp");

                    if (expanded === "panel1") dispatch(setExpandedTab(""));
                    if (expanded === "panel2")
                      dispatch(setExpandedTab("panel1"));
                    if (expanded === "") dispatch(setExpandedTab("panel1"));
                  }}
                >
                  Temperature
                </AccordionSummary>

                <AccordionDetails className="accordion">
                  {" "}
                  {infos ? (
                    <PlotDrawer
                      dataView={dataView}
                      key={infos}
                      plotName={"Temperature"}
                    />
                  ) : promiseInProgress ? (
                    <CircularProgress />
                  ) : dataView === "daily" ? (
                    "No Results. Sometimes there is no data. Make sure your request is not more than 370 days. "
                  ) : (
                    "No Results. Sometimes there is no data. Make sure your request is not more than 240 hours (10 days). "
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === "panel2"}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id={
                    expanded === "panel2"
                      ? "panel2a-header expanded"
                      : "panel2a-header"
                  }
                  onClick={() => {
                    setGraphType("prcp");
                    if (expanded === "panel1")
                      dispatch(setExpandedTab("panel2"));
                    if (expanded === "panel2") dispatch(setExpandedTab(""));
                    if (expanded === "") dispatch(setExpandedTab("panel2"));
                  }}
                >
                  {dataView === "daily"
                    ? "Precipitations"
                    : "Relative Humidity"}
                </AccordionSummary>
                <AccordionDetails className="accordion">
                  {" "}
                  {infos ? (
                    <PlotDrawer
                      dataView={dataView}
                      key={infos}
                      plotName={
                        dataView === "daily"
                          ? "Precipitations"
                          : "Relative Humidity"
                      }
                    />
                  ) : promiseInProgress ? (
                    <CircularProgress />
                  ) : dataView === "daily" ? (
                    "No Results. Sometimes there is no data, but make sure your request is not more than 370 days. "
                  ) : (
                    "No Results. Sometimes there is no data, but make sure your request is not more than 240 hours (10 days). "
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Info;
//MAKE HOURLY DAILY A REDUX STATE SO ITS GLOBAL
