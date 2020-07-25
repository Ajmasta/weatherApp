import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationInput } from "../reducers/searchReducer";
import SearchResults from "./searchResults";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

const SearchInput = ({ setSearchClicked }) => {
  let currentSearch = useSelector((state) => state.searchResults);
  let checked = currentSearch.length >= 3 ? true : false;
  const dispatch = useDispatch();
  const handleNameChange = (e) => {
    e.preventDefault();

    return dispatch(setLocationInput(e.target.value));
  };
  const handleBlur = () => {
    const suggestions = document.querySelector(".suggestions");
    setTimeout(() => suggestions.classList.add("trueHidden"), 100);
    setSearchClicked(false);
  };
  const handleFocus = () => {
    const suggestions = document.querySelector(".suggestions");
    suggestions.classList.remove("trueHidden");
  };
  return (
    <form class="searchForm">
      <Input
        value={currentSearch}
        autoFocus
        autoComplete="off"
        id="search-input"
        name="location"
        startAdornment={
          <InputAdornment>
            <SearchIcon className="searchIcon" />
          </InputAdornment>
        }
        onChange={handleNameChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      <div className="suggestions collapsed" key={currentSearch}>
        <SearchResults key={currentSearch} />
      </div>
    </form>
  );
};

export default SearchInput;
