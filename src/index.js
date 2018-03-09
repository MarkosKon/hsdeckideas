import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import FAQ from "./component/FAQ";
import NotFound from "./component/NotFound";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/FAQ" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
