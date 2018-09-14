import { getRandom } from "some-utils";
import { computeMax } from "./object";

var get = require("lodash.get");
var partial = require('lodash.partial');


export const getSize = cards => cards && cards.reduce(calculateQuantity, 0);

const calculateQuantity = (sum, card) => sum + card.quantity;

export const getCard = (cards, isCompetitive) => isCompetitive ? getBestCard(cards) : getRandomCard(cards);

export const getRandomCard = cards => cards[getRandom(0, cards.length - 1)];

export const getBestCard = cards => {
  const maxRating = cards.reduce(computeMaxRating, 0);
  const bestCards = cards.filter(c => c.rating === maxRating);
  return bestCards[getRandom(0, bestCards.length - 1)];
};

export const computeMaxRating = partial(computeMax, "rating");

export const isCardInteresting = (card) => hasPriorities(card) || hasDeckWideFilters(card);
export const hasPriorities = card => card.versions;
export const hasDeckWideFilters = card => card.deckFilters;

export const chooseInterestingCard = (availableCards, deckCards) => {
  const interestingCards = 
    availableCards
      .filter(card => isCardInteresting(card) && !cardExists(deckCards, card));
  return interestingCards[getRandom(0, interestingCards.length - 1)];
};

//  Note: The possibility of adding a card once e.g. the "Loot hoarder" for card draw
//  and then wanting to add the "Loot hoarder" again as a 2 drop or as a random good card is not covered here.
//  The possibility anyway is really small, we feel it doesn't matter much.
export const cardExists = (cards, card) => cards.find(c => c.name === card.name);

export const findCardByName = (cards, name) => cards.find(c => c.name === name);
export const findCardsByNames = (cards, names) => cards.filter(c => names.includes(c.name));

export const removeSubset = (array, subset) => array.reduce((result, item) => 
  !cardExists(subset, item) ? result.concat(item) : result, []);

export const resetToNoRandom = cards => {
  cards.forEach(c => c.isRandom = false);
  return cards;
};

export const resetQuantity = (cards, isHighlander) => 
  isHighlander
    ? cards.map(c => ({ ...c, quantity: 1}) )
    : cards.map(c => ({...c, quantity: c.rarity === "LEGENDARY" ? 1 : 2}))

export const getAvailableCards = (cardDb, heroName, format, isInteresting) => {
  const expansionLimit = format === "Standard" ? 9 : 0;

  let availableCards = cardDb.filter(
    card =>
      (card.cardClass.includes("NEUTRAL") ||
        card.cardClass.includes(heroName.toUpperCase())) &&
      card.set >= expansionLimit
  );

  if (isInteresting === true) {
    availableCards = availableCards.filter(isCardInteresting);
  } else if (isInteresting === false) {
    availableCards = availableCards.filter(c => !isCardInteresting(c));
  }

  return availableCards;
};

// This method is similar to getAvailableCards but it is used
// in a later stage and assumes that the cards are ALREADY FILTERED
//  by hero and format.
export const getCardsForFilters = (filteredCards, filters, breakIfOneFilterIsTrue) =>
  filteredCards.filter(card =>
    cardSatisfiesFilters(card, filters, breakIfOneFilterIsTrue) ||
    filters.find(f => f.initiatorName && f.initiatorName === card.name) // This check is for the princes.
  );

export const cardSatisfiesFilters = (card, filters, breakIfOneFilterIsTrue) => {
  let satisfiesFilters;
  for (const filter of filters) {
    satisfiesFilters = false; 
    if (get(card, filter.property) === undefined) {
      satisfiesFilters = false;
      break;
    }
    satisfiesFilters = cardSatisfiesFilter(card, filter);
    if (satisfiesFilters === breakIfOneFilterIsTrue) 
      break;
  }
  return satisfiesFilters;
};

export const cardSatisfiesFilter = (card, filter) => {
  switch (filter.operation) {
    case "EQUALS":
      const cardPropertyValue = get(card, filter.property);
      if (
        cardPropertyValue === filter.minValue ||
        cardPropertyValue === "ALL"
      ) 
        return true;
      return false;
    case "NOT_EQUALS":
      if (get(card, filter.property) !== filter.minValue) 
        return true; 
      return false;
    case "GREATER_THAN":
      if (get(card, filter.property) > filter.minValue) 
        return true;
      return false;
    case "LESS_THAN":
      if (get(card, filter.property) < filter.minValue) 
        return true;
      return false;
    case "INCLUDES":
      if (get(card, filter.property).includes(filter.minValue)) 
        return true;
      return false;
    case "NOT_INCLUDES":
      if (!get(card, filter.property).includes(filter.minValue)) 
        return true;
      return false;
    case "IS_INCLUDED_IN":
      if (filter.minValue.includes(get(card, filter.property))) 
        return true;
      return false;
    case "NOT_INCLUDED_IN":
      if (!filter.minValue.includes(get(card, filter.property))) 
        return true;
      return false;
    case "MATCH":
      if (get(card, filter.property).match(new RegExp(filter.minValue, "gi"))) 
        return true;
      return false;
    case "NOT_MATCH":
      if (!get(card, filter.property).match(new RegExp(filter.minValue, "gi"))) 
        return true;
      return false;
    case "MATCH_CASE_SENSITIVE":
      if (get(card, filter.property).match(new RegExp(filter.minValue, "g"))) 
        return true;
      return false;
    case "IS_EVEN":
      if (get(card, filter.property) % 2 === 0) 
        return true;
      return false;
    case "IS_ODD":
      if (get(card, filter.property) % 2 !== 0) 
        return true;
      return false;
    case "HIGH_HEALTH_MINION": // The most proper way for this would be to add HIGH_HEALTH as extra in minions.
      if (
        get(card, "type") === "MINION" &&
        get(card, "attack") / get(card, "health") <= 0.66
      ) 
        return true;
      return false;
    case "HIGHLANDER":
      return true;
    default:
      return false;
  }
}