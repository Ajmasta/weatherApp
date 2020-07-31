import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { setNavigationPath } from "../reducers/navigationReducer";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SecondNavBar from "./secondNavBar";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { setHidden } from "../reducers/hiddenBarReducer";
import { setLocationInput } from "../reducers/searchReducer";
const NavigationBar = () => {
  let [doubletap, setDoubletap] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const dispatch = useDispatch();
  const locationName = useSelector((state) => state.location.name);
  const locationId = useSelector((state) => state.location.id);
  const idRegex = /[A-Z0-9]+/;
  const locationPath = useLocation();

  const currentPage = locationPath.pathname !== "/" ? "info" : "home";

  const locationArray = [];
  locationId.forEach((id, i) =>
    locationArray.push({ name: locationName[i], id })
  );
  dispatch(setNavigationPath(locationPath.pathname));
  const selectedId = locationPath.pathname.match(idRegex);

  return (
    <Navbar className="NaviBar" bg="primary" variant="dark" sticky="top">
      <Navbar.Brand>
        <Link to="/"></Link>
      </Navbar.Brand>

      <Navbar
        sticky="top"
        className={locationName.length === 0 ? "secondNavBar " : "secondNavBar"}
      >
        {" "}
        <Nav className="selectedPlaces">
          {locationArray.map((location) => (
            <Nav
              key={location.id}
              className={
                selectedId && selectedId[0] === location.id
                  ? "selected individualPlaces"
                  : "individualPlaces"
              }
            >
              <OverlayTrigger
                placement="bottom-end"
                delay={{ show: 50, hide: 0 }}
                overlay={
                  <Tooltip
                    placement="top-end"
                    id={`Tooltip-name`}
                    className="tooltip"
                  >
                    {doubletap ? "Double-Click again to delete" : location.name}
                  </Tooltip>
                }
              >
                <Link
                  to={
                    currentPage === "infos"
                      ? `${location.id}`
                      : `/station/${location.id}`
                  }
                  onBlur={() => {
                    setDoubletap(false);
                    document.querySelector(".held") &&
                      document.querySelector(".held").classList.remove("held");
                  }}
                >
                  {" "}
                  {location.name.length < 5
                    ? location.name
                    : location.name.slice(0, 5)}
                </Link>
              </OverlayTrigger>
            </Nav>
          ))}
          <IconButton
            color="primary"
            onClick={() => {
              setSearchClicked("true");
              dispatch(setHidden(true));
              if (document.querySelector("#search-input"))
                document.querySelector("#search-input").focus();
              dispatch(setLocationInput(""));
            }}
          >
            <AddIcon />
          </IconButton>
        </Nav>
      </Navbar>
      <SecondNavBar
        searchClicked={searchClicked}
        setSearchClicked={setSearchClicked}
        key={locationName}
        className="lastNavBar"
      />
    </Navbar>
  );
};

export default NavigationBar;
// <Nav.Link href="/">Home</Nav.Link>
