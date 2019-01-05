import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import Loadable from "react-loadable";
import "normalize.css";

import GlobalStyle from "./AppGlobalStyle";
import Loading from "./components/Loading/Loading";

const LoadableHome = Loadable({
  loader: () => import("./scenes/Home/Home"),
  loading: Loading
});
const LoadableFAQ = Loadable({
  loader: () => import("./scenes/FAQ/FAQ"),
  loading: Loading
});
const LoadableNotFound = Loadable({
  loader: () => import("./scenes/NotFound/NotFound"),
  loading: Loading
});
const LoadableNewFeatures = Loadable({
  loader: () => import("./scenes/NewFeatures/NewFeatures"),
  loading: Loading
});

var sortBy = require("lodash.sortby");

export default class App extends Component {
  constructor() {
    super();

    this.heroCodes = [274, 31, 637, 671, 813, 930, 1066, 893, 7];

    this.state = {
      dataVersion: 26, // REMEMBER TO CHANGE THIS WHENEVER WE CHANGE THE DATA. :)
      errorMessage: null,
      // External data.
      cards: [],
      heroes: [],
      heroPowers: [],
      archetypes: [],
      extraDeckWideFilters: []
    };
  }

  componentDidMount() {
    document.getElementsByClassName("loader-wrapper")[0].remove();
    if (process.env.NODE_ENV === "production")
      ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY);
    const cachedData = localStorage.getItem("data");
    const cachedVersion = parseInt(localStorage.getItem("version"), 10);
    if (cachedData && cachedVersion === this.state.dataVersion)
      this.setData(JSON.parse(cachedData));
    else this.fetchData();
  }

  fetchData() {
    fetch("/resources/data/data.json")
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("version", this.state.dataVersion);
        this.setData(data);
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  setData(data) {
    this.setState({
      cards: data[0].content,
      heroes: data[2].content,
      heroPowers: data[3].content,
      archetypes: sortBy(data[1].content, "name"),
      extraDeckWideFilters: sortBy(data[4].content, ["group"])
    });
  }

  render() {
    const {
      cards,
      heroes,
      heroPowers,
      archetypes,
      extraDeckWideFilters,
      errorMessage
    } = this.state;
    return (
      <>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <LoadableHome
                  cards={cards}
                  heroes={heroes}
                  heroPowers={heroPowers}
                  heroCodes={this.heroCodes}
                  archetypes={archetypes}
                  extraDeckWideFilters={extraDeckWideFilters}
                  errorMessage={errorMessage}
                />
              )}
            />
            <Route path="/FAQ" render={() => <LoadableFAQ />} />
            <Route
              path="/new-features"
              render={() => <LoadableNewFeatures />}
            />
            <Route render={() => <LoadableNotFound />} />
          </Switch>
        </Router>
      </>
    );
  }
}
