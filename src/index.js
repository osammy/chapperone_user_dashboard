import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import indexRoutes from "./routes/index.js";
import { store } from "./store";
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
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
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
