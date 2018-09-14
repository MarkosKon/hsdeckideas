import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { injectGlobal } from "styled-components";
import Home from "./scenes/Home/Home";
import FAQ from "./scenes/FAQ/FAQ";
import NotFound from "./scenes/NotFound/NotFound";
import NewFeatures from "./scenes/NewFeatures/NewFeatures";

var sortBy = require("lodash.sortby");

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Lora|Open+Sans');
  html,
  body {
    font-family: 'Lora', serif;
    font-size: 16px;
    font-display: swap;
    height: 100%;
    width: 100%;
  }

  body {
    background-color: #7a7a7a;
  }

  main {
    min-height: 100%;
    margin-top: 15px;
  }

  main a {
    color: rgb(61, 61, 196);
    font-weight: bold;
    -webkit-transition: color 0.5s ease-in-out;
    -o-transition: color 0.5s ease-in-out;
    transition: color 0.5s ease-in-out;
  }

  main a:hover, 
  main a:focus, 
  main a:active {
    text-decoration: none;
    color: rgb(22, 22, 148);
  }

  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  h5,
  .h5,
  label {
    font-family: 'Open Sans', sans-serif;
    font-display: swap;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .btn-primary {
    transition: all 0.5s ease-in-out;
  }

  ::-moz-selection {
    background: rgb(255, 255, 79);
  }

  ::selection {
    background: rgb(255, 255, 79);
  }

  img::-moz-selection {
    color: white;
    background: transparent;
  }

  img::selection {
    color: white;
    background: transparent;
  }

  button:focus,
  a:focus {
    outline-color: rgb(235, 131, 3);
  }

  .not {
    display: none;
  }

  .card {
    background-color: beige;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 20px;
  }

  .card-title {
    padding-top: 10px;
  }

  .card-body {
    padding-top: 40px;
  }

  .common,
  .free {
    background-color: #7a7a7a;
  }

  .rare {
    background-color: blue;
  }

  .epic {
    background-color: purple;
  }

  .legendary {
    background-color: orangered;
  }

  .random {
    color: orange !important;
  }
  .tooltip-inner {
    font-size: 16px!important;
  }
  .popover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  .popover-header {
    margin-top: 0;
  }
  .list-popover {
    padding: 10px;
  }
  .list-latin {
    list-style-type: lower-latin;
  }

  .node {
    cursor: pointer;
  }

  .node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 3px;
  }

  .node text {
    font: 12px sans-serif;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 2px;
  }

  .ReactModal__Body--open {
    overflow-y: hidden;
  }

  .ReactModal__Overlay {
    overflow: auto;
  }

  .ReactModal__Content {
    opacity: 0;
  }

  .ReactModal__Content--after-open {
    opacity: 1;
    /* transition: opacity 300ms; */
  }

  .ReactModal__Content--before-close {
    opacity: 0;
  }
  .Select {
    width: 100%;
  }
`;

export default class App extends Component {
  constructor() {
    super();

    this.heroCodes = [274, 31, 637, 671, 813, 930, 1066, 893, 7];

    this.state = {
      dataVersion: 22, // REMEMBER TO CHANGE THIS WHENEVER WE CHANGE THE DATA. :)
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
      heroes: data[2].content,
      heroPowers: data[3].content,
      cards: data[0].content,
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
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
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
          <Route path="/FAQ" render={() => <FAQ />} />
          <Route path="/new-features" render={() => <NewFeatures />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    );
  }
}
