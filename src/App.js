import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/hsideas.css";
import Home from "./scenes/Home/Home";
import FAQ from "./scenes/FAQ/FAQ";
import NotFound from "./scenes/NotFound/NotFound";

var sortBy = require("lodash.sortby");

export default class App extends Component {
  constructor() {
    super();

    this.heroCodes = [274, 31, 637, 671, 813, 930, 1066, 893, 7];

    this.state = {
      serverUrl: `${window.location.protocol === "https:" ? "https" : "http"}://localhost:3000`,
      dataVersion: 13, 
      errorMessage: null,
      // External data.
      cards: [],
      heroes: [],
      heroPowers: [],
      archetypes: []
    };
  }

  componentDidMount() {
    const cachedData = localStorage.getItem("data");
    const cachedVersion = parseInt(localStorage.getItem("version"), 10);
    if (cachedData && cachedVersion === this.state.dataVersion)
      this.setData(JSON.parse(cachedData));
    else this.fetchData();
  }

  fetchData() {
    fetch(this.state.serverUrl + "/resources/data/data.json")
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("version", this.state.dataVersion);
        this.setData(data);
      })
      .catch(error => this.setState({errorMessage: error.message}));
  }

  setData(data) {
    const cards = data[0].content;
    this.setState({
      heroes: data[2].content,
      heroPowers: data[3].content,
      cards: cards,
      archetypes: sortBy(data[1].content, "name")
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => 
              <Home
                cards={this.state.cards}
                heroes={this.state.heroes}
                heroPowers={this.state.heroPowers}
                heroCodes={this.heroCodes}
                archetypes={this.state.archetypes}
                errorMessage={this.state.errorMessage}
              />
            }
          />
          <Route path="/FAQ" render={() => <FAQ />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    );
  }
}
