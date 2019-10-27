import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Transition } from 'react-spring';
import ReactGA from 'react-ga';
import Loadable from 'react-loadable';
import sortBy from 'lodash.sortby';

import GlobalStyle from './AppGlobalStyle';
import Loading from './components/Loading/Loading';
import Alert from './components/Alert/Alert';
import 'microtip/microtip.css';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './scenes/Home/Home'),
  loading: Loading,
});
const LoadableFAQ = Loadable({
  loader: () => import(/* webpackChunkName: "faq" */ './scenes/FAQ/FAQ'),
  loading: Loading,
});
const LoadableNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notfound" */ './scenes/NotFound/NotFound'),
  loading: Loading,
});
const LoadableNewFeatures = Loadable({
  loader: () => import(/* webpackChunkName: "newfeatures" */ './scenes/NewFeatures/NewFeatures'),
  loading: Loading,
});

const App = () => {
  const heroCodes = [274, 31, 637, 671, 813, 930, 1066, 893, 7];

  const [errorMessage, setErrorMessage] = useState(null);
  const [state, setState] = useState({
    cards: [],
    heroes: [],
    heroPowers: [],
    archetypes: [],
    extraDeckWideFilters: [],
  });
  const {
    cards, heroes, heroPowers, archetypes, extraDeckWideFilters,
  } = state;

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY);
    }
    window.cachedData.then((data) => {
      setState({
        cards: data[0].content,
        heroes: data[2].content,
        heroPowers: data[3].content,
        archetypes: sortBy(data[1].content, 'name'),
        extraDeckWideFilters: sortBy(data[4].content, ['group']),
      });
    });
  }, []);

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
              callback={() => setErrorMessage('')}
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
                heroCodes={heroCodes}
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
};

export default App;
