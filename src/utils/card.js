// @flow
import { getRandom } from 'some-utils';
import { computeMax } from './object';
import type { CardType, FilterType } from '../types';

const get = require('lodash.get');
const partial = require('lodash.partial');

const computeMaxRating = partial(computeMax, 'rating');
const calculateQuantity = (sum: number, card: CardType): number => sum + card.quantity;
const getSize = (cards: Array<CardType>) => cards && cards.reduce(calculateQuantity, 0);

const getRandomCard = (cards: Array<CardType>): CardType => {
  return cards[getRandom(0, cards.length - 1)];
};
const getBestCard = (cards: Array<CardType>): CardType => {
  const maxRating = cards.reduce(computeMaxRating, 0);
  const bestCards = cards.filter(c => c.rating === maxRating);
  return bestCards[getRandom(0, bestCards.length - 1)];
};
const getCard = (cards: Array<CardType>, isCompetitive: boolean): CardType => {
  if (isCompetitive) return getBestCard(cards);
  return getRandomCard(cards);
};

const hasPriorities = (card: CardType): boolean => card.versions;
const hasDeckWideFilters = (card: CardType): boolean => !!card.deckFilters;
const isCardInteresting = (card: CardType): boolean => {
  return hasPriorities(card) || hasDeckWideFilters(card);
};

// Note: The possibility of adding a card once e.g. the "Loot hoarder" for card draw
// and then wanting to add the "Loot hoarder" again as a 2 drop or as a
// random good card is not covered here.
//  The possibility anyway is really small, we feel it doesn't matter much.
const cardExists = (cards: Array<CardType>, card: CardType): boolean => {
  const cardResult = cards.find(c => c.name === card.name);
  if (!cardResult) return false;
  return true;
};

const chooseInterestingCard = (
  availableCards: Array<CardType>,
  deckCards: Array<CardType>,
): CardType => {
  const interestingCards = availableCards.filter(
    card => isCardInteresting(card) && !cardExists(deckCards, card),
  );
  return interestingCards[getRandom(0, interestingCards.length - 1)];
};

const removeSubset = (array: Array<CardType>, subset: Array<CardType>): Array<CardType> => {
  return array.reduce(
    (result, item) => (!cardExists(subset, item) ? result.concat(item) : result),
    [],
  );
};

const initializeQuantity = (cards: Array<CardType>, options: Object = {}): Array<CardType> => {
  const { isHighlander } = options;
  if (isHighlander) return cards.map(card => ({ ...card, quantity: 1 }));
  return cards.map(card => ({ ...card, quantity: card.rarity === 'LEGENDARY' ? 1 : 2 }));
};

const getAvailableCards = (
  cardDb: Array<CardType>,
  heroName: string,
  format: string,
  isInteresting: boolean,
): Array<CardType> => {
  const expansionLimit = format === 'Standard' ? 12 : 0;

  let availableCards = cardDb.filter(
    card => (card.cardClass.includes('NEUTRAL') || card.cardClass.includes(heroName.toUpperCase()))
      && card.set >= expansionLimit,
  );

  if (isInteresting === true) {
    availableCards = availableCards.filter(isCardInteresting);
  } else if (isInteresting === false) {
    availableCards = availableCards.filter(c => !isCardInteresting(c));
  }

  return availableCards;
};

const cardSatisfiesFilter = (card: CardType, filter: FilterType): boolean => {
  switch (filter.operation) {
    case 'EQUALS': {
      const cardPropertyValue = get(card, filter.property);
      if (cardPropertyValue === filter.minValue || cardPropertyValue === 'ALL') {
        return true;
      }
      return false;
    }
    case 'NOT_EQUALS':
      if (get(card, filter.property) !== filter.minValue) return true;
      return false;
    case 'GREATER_THAN':
      if (get(card, filter.property) > filter.minValue) return true;
      return false;
    case 'LESS_THAN':
      if (get(card, filter.property) < filter.minValue) return true;
      return false;
    case 'INCLUDES':
      if (get(card, filter.property).includes(filter.minValue)) return true;
      return false;
    case 'NOT_INCLUDES':
      if (!get(card, filter.property).includes(filter.minValue)) return true;
      return false;
    case 'IS_INCLUDED_IN':
      if (typeof filter.minValue === 'number') return false;
      if (filter.minValue.includes(get(card, filter.property))) return true;
      return false;
    case 'NOT_INCLUDED_IN':
      if (typeof filter.minValue === 'number') return false;
      if (!filter.minValue.includes(get(card, filter.property))) return true;
      return false;
    case 'MATCH':
      if (get(card, filter.property).match(new RegExp(filter.minValue.toString(), 'gi'))) return true;
      return false;
    case 'NOT_MATCH':
      if (!get(card, filter.property).match(new RegExp(filter.minValue.toString(), 'gi'))) return true;
      return false;
    case 'MATCH_CASE_SENSITIVE':
      if (get(card, filter.property).match(new RegExp(filter.minValue.toString(), 'g'))) return true;
      return false;
    case 'IS_EVEN':
      if (get(card, filter.property) % 2 === 0) return true;
      return false;
    case 'IS_ODD':
      if (get(card, filter.property) % 2 !== 0) return true;
      return false;
    case 'HIGH_HEALTH_MINION': // The most proper way for this would be to add HIGH_HEALTH as extra in minions.
      if (get(card, 'type') === 'MINION' && get(card, 'attack') / get(card, 'health') <= 0.66) {
        return true;
      }
      return false;
    case 'HIGHLANDER':
      return true;
    case 'IS_UNDEFINED':
      if (get(card, filter.property) === undefined) return true;
      return false;
    default:
      return false;
  }
};

const cardSatisfiesFilters = (
  card: CardType,
  filters: Array<FilterType>,
  breakIfOneFilterIsTrue: boolean,
): boolean => {
  let satisfiesFilters = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const filter of filters) {
    satisfiesFilters = false;
    if (get(card, filter.property) === undefined && filter.operation !== 'IS_UNDEFINED') {
      satisfiesFilters = false;
      break;
    }
    satisfiesFilters = cardSatisfiesFilter(card, filter);
    if (satisfiesFilters === breakIfOneFilterIsTrue) break;
  }
  return satisfiesFilters;
};

// This method is similar to getAvailableCards but it is used
// in a later stage and assumes that the cards are ALREADY FILTERED
//  by hero and format.
const getCardsForFilters = (
  filteredCards: Array<CardType>,
  filters: Array<FilterType>,
  breakIfOneFilterIsTrue: boolean,
): Array<CardType> => {
  return filteredCards.filter(
    card => cardSatisfiesFilters(card, filters, breakIfOneFilterIsTrue)
      // This following check is for the princes.
      || filters.find(f => f.initiatorName && f.initiatorName === card.name),
  );
};

// we export them because we want to test them.
export { getBestCard, isCardInteresting, cardExists };

// we export them because they are used in other files
export {
  getSize,
  getCard,
  hasPriorities,
  hasDeckWideFilters,
  chooseInterestingCard,
  removeSubset,
  initializeQuantity,
  getAvailableCards,
  cardSatisfiesFilter,
  cardSatisfiesFilters,
  getCardsForFilters,
};
