import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import locationReducer from "./reducers/locationReducer";
import todayDateReducer from "./reducers/todayDateReducer";

const reducer = combineReducers({
  location: locationReducer,
  todayDate: todayDateReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
