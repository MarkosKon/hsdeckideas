import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Transition } from 'react-spring';
import ReactGA from 'react-ga';
import Loadable from 'react-loadable';

import GlobalStyle from './AppGlobalStyle';
import Loading from './components/Loading/Loading';
import Alert from './components/Alert/Alert';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: "home", webpackPreload: true */ './scenes/Home/Home'),
  loading: Loading,
});
const LoadableFAQ = Loadable({
  loader: () => import(/* webpackChunkName: "faq", webpackPreload: true */ './scenes/FAQ/FAQ'),
  loading: Loading,
});
const LoadableNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notfound", webpackPreload: true */ './scenes/NotFound/NotFound'),
  loading: Loading,
});
const LoadableNewFeatures = Loadable({
  loader: () => import(/* webpackChunkName: "newfeatures", webpackPreload: true */ './scenes/NewFeatures/NewFeatures'),
  loading: Loading,
});

const sortBy = require('lodash.sortby');

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
      extraDeckWideFilters: [],
    };
  }

  componentDidMount() {
    const { dataVersion } = this.state;

    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY);
    }

    const cachedData = localStorage.getItem('data');
    const cachedVersion = parseInt(localStorage.getItem('version'), 10);
    if (cachedData && cachedVersion === dataVersion) this.setData(JSON.parse(cachedData));
    else this.fetchData();
  }

  setData(data) {
    this.setState({
      cards: data[0].content,
      heroes: data[2].content,
      heroPowers: data[3].content,
      archetypes: sortBy(data[1].content, 'name'),
      extraDeckWideFilters: sortBy(data[4].content, ['group']),
    });
  }

  fetchData() {
    const { dataVersion } = this.state;
    fetch('/resources/data/data.json')
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('version', dataVersion);
        this.setData(data);
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    const {
      cards,
      heroes,
      heroPowers,
      archetypes,
      extraDeckWideFilters,
      errorMessage,
    } = this.state;
    return (
      <>
        <GlobalStyle />
        <Transition
          items={errorMessage}
          from={{ transform: 'translateY(-100px)' }}
          enter={{ transform: 'translateY(0)' }}
          leave={{ transform: 'translateY(-100px)' }}
        >
          {toggle => toggle
            && (style => (
              <Alert
                message={errorMessage}
                callback={() => this.setState({ errorMessage: '' })}
                timeout={10000}
                style={style}
              />
            ))
          }
        </Transition>
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
                />
              )}
            />
            <Route path="/faq/" render={() => <LoadableFAQ />} />
            <Route path="/new-features/" render={() => <LoadableNewFeatures />} />
            <Route render={() => <LoadableNotFound />} />
          </Switch>
        </Router>
      </>
    );
  }
}
