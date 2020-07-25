import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../reducers/locationReducer";
import Navbar from "react-bootstrap/Navbar";
import { setInfos } from "../reducers/infoReducer";
import DateRangeIcon from "@material-ui/icons/DateRange";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import TimelineIcon from "@material-ui/icons/Timeline";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import TabList from "@material-ui/lab/TabList";
import TabContext from "@material-ui/lab/TabContext";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import { setMode, setType, setBarMode } from "../reducers/plotReducer";
import { Link, useLocation } from "react-router-dom";
import PaletteSharpIcon from "@material-ui/icons/PaletteSharp";
import { setMarker } from "../reducers/plotReducer";
import CancelSharpIcon from "@material-ui/icons/CancelSharp";
import SearchIcon from "@material-ui/icons/Search";

import Form from "./Form";
const SecondNavBar = ({ searchClicked, setSearchClicked }) => {
  const [hidden, setHidden] = useState(true);
  const [iconClicked, setIconClicked] = useState("");
  const [tabNumber, setTabNumber] = useState("2");
  const [radioValue, setRadioValue] = useState("1");
  const [markersChecked, setMarkersChecked] = useState(true);
  const [linesChecked, setLinesChecked] = useState(true);
  const markerNames = useSelector((state) => state.markerNames);
  const marker = useSelector((state) => state.plot.marker);
  const marker1 = useSelector((state) => state.plot.marker1);
  const marker2 = useSelector((state) => state.plot.marker2);

  const dispatch = useDispatch();
  let startDate = useSelector((state) => state.location.startDate);
  let endDate = useSelector((state) => state.location.endDate);
  const locationName = useSelector((state) => state.location.name);
  const idRegex = /[A-Z0-9]+/;
  const locationPath = useLocation();
  const selectedId = locationPath.pathname.match(idRegex);
  useEffect(() => {
    let newMode = "";
    if (linesChecked && markersChecked) newMode = "markers+lines";
    if (linesChecked && !markersChecked) newMode = "lines";
    if (!linesChecked && markersChecked) newMode = "markers";

    if (linesChecked || markersChecked) dispatch(setType("scatter"));
    dispatch(setMode(newMode));
  }, [dispatch, linesChecked, markersChecked]);

  const handleStartDateChange = (e) => {
    dispatch(setInfos(null));
    return dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e) => {
    dispatch(setInfos(null));
    return dispatch(setEndDate(e.target.value));
  };

  const todayDate = useSelector((state) => state.todayDate);
  if (!startDate) dispatch(setStartDate(todayDate.lastWeek));
  if (!endDate) endDate = dispatch(setEndDate(todayDate.today));
  const handleTabChange = (event, value) => {
    setTabNumber(value);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    dispatch(setType("bar"));
    if (event.target.value === "1") dispatch(setBarMode("group"));
    if (event.target.value === "2") dispatch(setBarMode("stack"));
  };

  const handleDisplay = (hidden) => {
    if (!hidden && iconClicked === "Date") {
      return (
        <>
          <span className="dateSpan flex">
            <form
              className="changeDateForm"
              onSubmit={(e) => {
                e.preventDefault();
                setHidden(true);
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
              setHidden(true);
            }}
          >
            <CancelSharpIcon />
          </IconButton>
        </>
      );
    } else if (!hidden && iconClicked === "Graph") {
      return (
        <>
          <TabContext
            indicatorColor="primary"
            value={tabNumber}
            expanded={tabNumber}
          >
            <TabList
              expanded={tabNumber}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              className="graphSlider"
            >
              <Tab
                onClick={() => dispatch(setType("bar"))}
                label={<EqualizerIcon />}
                value="1"
              />
              <Tab
                indicatorColor="primary"
                onClick={() => dispatch(setType("scatter"))}
                label={<ShowChartIcon />}
                value="2"
              />
            </TabList>

            <TabPanel className="barsTab" value="1">
              {" "}
              <label for="grouped">Group</label>
              <Radio
                name="grouped"
                value="1"
                color="secondary"
                onChange={handleRadioChange}
                checked={radioValue === "1"}
                size="small"
              />
              <label for="stacked">Stack</label>
              <Radio
                name="stacked"
                value="2"
                color="secondary"
                onChange={handleRadioChange}
                checked={radioValue === "2"}
                size="small"
              />
            </TabPanel>
            <TabPanel className="scatterTab" value="2">
              <label for="markers">Markers</label>
              <Checkbox
                checked={markersChecked}
                className="checkboxes"
                color="secondary"
                onChange={() => setMarkersChecked(!markersChecked)}
                name="markers"
                value="1"
              />{" "}
              <label for="lines">Lines</label>{" "}
              <Checkbox
                checked={linesChecked}
                className="checkboxes"
                color="secondary"
                onChange={() => setLinesChecked(!linesChecked)}
                name="lines"
                value="2"
              />
            </TabPanel>
          </TabContext>

          <IconButton
            onClick={() => {
              setIconClicked("");
              setHidden(true);
            }}
          >
            <CancelSharpIcon />
          </IconButton>
        </>
      ); //chart types: Radio Button(bar, stacked bar) Xheckbox(scatter, lines+scatter) Checkbox Bar vs Scatter
    } else if (!hidden && iconClicked === "Palette") {
      return (
        <>
          <span className="colorTab">
            {markerNames.one ? (
              <>
                <label for="data1">{markerNames.one}</label>
                <input
                  name="data1"
                  type="color"
                  defaultValue={marker.color}
                  onChange={(e) => {
                    dispatch(setMarker(e.target.value, "1"));
                  }}
                />
              </>
            ) : (
              ""
            )}
            {markerNames.two ? (
              <>
                <label for="data2">{markerNames.two}</label>
                <input
                  name="data2"
                  type="color"
                  value={marker1.color}
                  onChange={(e) => {
                    dispatch(setMarker(e.target.value, "2"));
                  }}
                />
              </>
            ) : (
              ""
            )}
            {markerNames.three ? (
              <>
                <label for="data3"> {markerNames.three}</label>
                <input
                  name="data3"
                  type="color"
                  defaultValue={marker2.color}
                  onChange={(e) => {
                    dispatch(setMarker(e.target.value, "3"));
                  }}
                />
              </>
            ) : (
              ""
            )}
          </span>
          <IconButton onClick={() => setHidden(true)}>
            <CancelSharpIcon />
          </IconButton>
        </>
      );
    } else if ((!hidden && iconClicked === "Search") || searchClicked) {
      return (
        <>
          <span className="searchSpan Flex">
            <Form setSearchClicked={setSearchClicked} />
          </span>
          <IconButton
            onClick={() => {
              setHidden(!hidden);
              setIconClicked("Date");
            }}
          >
            <DateRangeIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setHidden(!hidden);
              setIconClicked("Graph");
            }}
          >
            <TimelineIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setHidden(!hidden);
              setIconClicked("Palette");
            }}
          >
            <PaletteSharpIcon />
          </IconButton>
        </>
      );
    } else {
      return (
        <>
          <span className="searchSpan">
            <IconButton
              onClick={() => {
                setHidden(!hidden);
                setIconClicked("Search");
              }}
            >
              <SearchIcon />
            </IconButton>
          </span>

          <IconButton
            onClick={() => {
              setHidden(!hidden);
              setIconClicked("Date");
            }}
          >
            <DateRangeIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              setHidden(!hidden);
              setIconClicked("Graph");
            }}
          >
            <TimelineIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setHidden(!hidden);
              setIconClicked("Palette");
            }}
          >
            <PaletteSharpIcon />
          </IconButton>
        </>
      );
    }
  };

  return (
    <Navbar
      className={locationName.length < 1 ? "thirdNavBar" : "thirdNavBar"}
      sticky="top"
    >
      {handleDisplay(hidden)}
    </Navbar>
  );
};

export default SecondNavBar;
//<Link to={`${locationPath.pathname}`}>  </Link>
