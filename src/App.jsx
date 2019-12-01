import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import Loadable from 'react-loadable';

import { useLocalStorage } from './hooks/useLocalStorage';
import GlobalStyle from './AppGlobalStyle';
import Loading from './components/Loading/Loading';
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
const LoadableEditData = Loadable({
  loader: () => import(/* webpackChunkName: "editdatA" */ './scenes/EditData/EditData'),
  loading: Loading,
});

const App = () => {
  const heroCodes = [274, 31, 637, 671, 813, 930, 1066, 893, 7];

  const [cards, setCards] = useLocalStorage('cards', []);
  const [userCards, setUserCards] = useLocalStorage('user-cards', []);
  const [archetypes, setΑrchetypes] = useLocalStorage('archetypes', []);
  const [heroes, setΗeroes] = useLocalStorage('heroes', []);
  const [heroPowers, setΗeroPowers] = useLocalStorage('hero-powers', []);
  const [extraDeckWideFilters, setΕxtraDeckWideFilters] = useLocalStorage(
    'extra-deck-wide-filters',
    [],
  );

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY);
    }
    window.cachedData.then((data) => {
      if (data) {
        setCards(data.cards);
        setUserCards(data.userCards);
        setΑrchetypes(data.archetypes);
        setΗeroes(data.heroes);
        setΗeroPowers(data.heroPowers);
        setΕxtraDeckWideFilters(data.extraDeckWideFilters);
      }
    });
  }, []);

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
                cards={userCards}
                heroes={heroes}
                heroPowers={heroPowers}
                heroCodes={heroCodes}
                archetypes={archetypes}
                extraDeckWideFilters={extraDeckWideFilters}
              />
            )}
          />
          <Route
            path="/edit-data/"
            render={() => (
              <LoadableEditData cards={cards} userCards={userCards} setUserCards={setUserCards} />
            )}
          />
          <Route path="/faq/" render={() => <LoadableFAQ />} />
          <Route render={() => <LoadableNotFound />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
