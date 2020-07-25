import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import stationData from "../stations";
import { setName } from "../reducers/locationReducer";
import { setHidden } from "../reducers/hiddenBarReducer";

const SearchResults = () => {
  const locationName = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();
  const shortNames = stationData.filter(
    (station) => station.name.en.length < 3
  );
  console.log("SHORT", shortNames);
  const stations = stationData.filter(
    (station) =>
      station.inventory.daily.start !== null ||
      station.inventory.hourly.start !== null
  );
  let stationsFound = [];
  if (locationName && locationName.length >= 3)
    stationsFound = stations.filter((station) =>
      station.name.en.toLowerCase().includes(locationName.toLowerCase())
    );

  if (stationsFound) {
    return stationsFound.map((station) => (
      <Link
        key={station.ID}
        onClick={() => {
          dispatch(setName(station.name.en));
          dispatch(setHidden(true));
          const suggestions = document.querySelector(".suggestions");
          setTimeout(() => suggestions.classList.add("trueHidden"), 100);
        }}
        to={`/station/${station.id}`}
      >
        <p className="searchList" key={station.ID}>
          {station.name.en}{" "}
        </p>
      </Link>
    ));
  } else {
    return null;
  }
};

export default SearchResults;

/* {station.inventory.daily.start !== null ? "Daily " : ""}
{station.inventory.hourly.start ? " Hourly" : ""}*/
