import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./state/reducers";

// import { HashRouter as Router, Route, Switch } from "react-router-dom";

// import "./index.css";
// import App from "./App";

import reportWebVitals from "./reportWebVitals";
import indexRoutes from "./routes/index.js";
import "antd/dist/antd.css";
import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider
    store={createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)))}
  >
    <React.StrictMode>
      <Router>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                exact={prop.exact}
                path={prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
