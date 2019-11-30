// import 'promise-polyfill/src/polyfill';
// import 'whatwg-fetch';
import sortBy from 'lodash.sortby';

const cachedData = {
  cards: JSON.parse(localStorage.getItem('cards')),
  userCards: JSON.parse(localStorage.getItem('user-cards')),
  archetypes: JSON.parse(localStorage.getItem('archetypes')),
  heroes: JSON.parse(localStorage.getItem('heroes')),
  heroPowers: JSON.parse(localStorage.getItem('hero-powers')),
  extraDeckWideFilters: JSON.parse(localStorage.getItem('extra-deck-wide-filters')),
};
const cachedVersion = parseInt(localStorage.getItem('version'), 10);
const dataVersion = 34;

const checkDataField = field => !!(field && field.length > 0);
// eslint-disable-next-line compat/compat
const downloadData = Object.values(cachedData)
  .map(checkDataField)
  .some(e => e === false);

if (downloadData || cachedVersion !== dataVersion) {
  window.cachedData = fetch('/resources/data/data.json')
    .then(res => res.json())
    .then((data) => {
      const [cards, archetypes, heroes, heroPowers, extraDeckWideFilters] = data.map(
        e => e.content,
      );
      const sortedCards = sortBy(cards, 'name');
      localStorage.setItem('version', dataVersion);
      localStorage.setItem('cards', JSON.stringify(sortedCards));
      localStorage.setItem('user-cards', JSON.stringify(sortedCards));
      localStorage.setItem('archetypes', JSON.stringify(sortBy(archetypes, 'name')));
      localStorage.setItem('heroes', JSON.stringify(heroes));
      localStorage.setItem('hero-powers', JSON.stringify(heroPowers));
      localStorage.setItem(
        'extra-deck-wide-filters',
        JSON.stringify(sortBy(extraDeckWideFilters, ['group'])),
      );
      return {
        cards: sortedCards,
        userCards: sortedCards,
        archetypes,
        heroes,
        heroPowers,
        extraDeckWideFilters,
      };
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log({ err }));
} else {
  // eslint-disable-next-line compat/compat
  window.cachedData = Promise.resolve(false);
}
