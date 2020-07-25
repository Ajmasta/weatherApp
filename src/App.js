import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { getTodayDate } from "./reducers/todayDateReducer";

import Info from "./components/Info";

import NavigationBar from "./components/navBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

const App = () => {
  const dispatch = useDispatch();
  const pathName = useSelector((state) => state.navigation);
  useEffect(() => {
    const date = new Date();
    dispatch(getTodayDate(date));
  }, [dispatch]);
  return (
    <Paper elevation={5}>
      <div className="App">
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/station/:id">
              <Info key={pathName} />
            </Route>
            <Route path="/">
              <body>
                <div className="home3">
                  <p>
                    Start searching for locations now by clicking the search
                    icon above{" "}
                  </p>
                  <img
                    id="searchImage"
                    alt="search logo"
                    src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png"
                  ></img>
                </div>
                <div className="home1">
                  <p> We offer historical weather data using Plotly graphs.</p>
                  <img
                    id="plotly"
                    alt="plotly logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Plotly-logo-01-square.png/1024px-Plotly-logo-01-square.png"
                  ></img>
                </div>
                <div className="home2">
                  <img
                    id="meteostat"
                    alt="meteostat logo"
                    src="https://www.meteostat.net/logo.svg"
                  ></img>
                  <p>
                    Using Meteostat's data and a UI designed for mobile, we
                    makes it easy to compare various locations.{" "}
                  </p>
                </div>
              </body>
            </Route>
          </Switch>
        </Router>
      </div>
    </Paper>
  );
};

export default App;
