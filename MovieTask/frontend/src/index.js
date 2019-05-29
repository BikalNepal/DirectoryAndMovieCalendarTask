import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import App from "./App";

const routing = (
  <Router>
    <Switch>
      <React.Fragment>
        <Route exact path="/" component={Main} />
        <Route path="/shows" component={App} />
      </React.Fragment>
    </Switch>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
