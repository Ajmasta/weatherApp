import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import locationReducer from "./reducers/locationReducer";
import todayDateReducer from "./reducers/todayDateReducer";
import searchReducer from "./reducers/searchReducer";
import navigationReducer from "./reducers/navigationReducer";
import infoReducer from "./reducers/infoReducer";
import plotReducer from "./reducers/plotReducer";
import plotNames from "./reducers/plotNames";
import tabExpandedReducer from "./reducers/expandedTabreducer";
import dataViewReducer from "./reducers/dataViewreducer";
const reducer = combineReducers({
  location: locationReducer,
  todayDate: todayDateReducer,
  searchResults: searchReducer,
  navigation: navigationReducer,
  infos: infoReducer,
  plot: plotReducer,
  markerNames: plotNames,
  expandedTab: tabExpandedReducer,
  dataView: dataViewReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
