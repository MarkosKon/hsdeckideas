import { getRandom } from "./random";
import { computeMax } from "./objectUtils";

var get = require("lodash.get");
var partial = require('lodash.partial');

/**
 * This method takes as argument an array of cards and calculates
 * many there are including duplicates.
 * @param {Array} cards
 */
export const getSize = cards => cards && cards.reduce(calculateQuantity, 0);

const calculateQuantity = (sum, card) => sum + card.quantity;

/**
 * This method chooses a random best card from a pool of cards.
 * @param {Array} cards
 */
export const getBestCard = cards => {
  const maxRating = cards.reduce(computeMaxRating, 0);
  const bestCards = cards.filter(c => c.rating === maxRating);
  // console.log("----------the best cards: ", bestCards, bestCards.length);
  return bestCards[getRandom(0, bestCards.length - 1)];
};
export const computeMaxRating = partial(computeMax, "rating");

export const isCardInteresting = (card) => hasPriorities(card) || hasDeckWideFilters(card);
export const hasPriorities = card => card.priorities;
export const hasDeckWideFilters = card => card.deckFilters;

/**
 * This method chooses an interesting card (a card that has priorities) from
 * the card database according to the selected format and hero. Also it excludes
 * the cards that are already in the deck.
 * @param {Array} cardDb
 * @param {Object} deck
 */
export const chooseInterestingCard = (availableCards, deckCards) => {
  const interestingCards = 
    availableCards
      .filter(card => isCardInteresting(card) && !cardExists(deckCards, card));
  return interestingCards[getRandom(0, interestingCards.length - 1)];
};

/**
 * This method checks if a card exists in a card array. If it does, returns
 * the card.
 * (Note: The possibility of adding a card once e.g. the "Loot hoarder" for card draw
 * and then wanting to add the "Loot hoarder" again as a 2 drop or as a random good card is not covered here.
 * The possibility anyway is really small, we feel it doesn't matter much).
 * @param {*} cards
 * @param {*} card
 */
export const cardExists = (cards, card) => cards.find(c => c.name === card.name);

export const removeSubset = (array, subset) => array.reduce((result, item) => 
  !cardExists(subset, item) ? result.concat(item) : result, []);

export const resetToNoRandom = cards => {
  cards.forEach(c => c.isRandom = false);
  return cards;
};

/**
 * @param {Array} cards 
 * @param {Boolean} isHighlander 
 */
export const resetQuantity = (cards, isHighlander) => 
  isHighlander
    ? cards.map(c => ({ ...c, quantity: 1}) )
    : cards.map(c => ({...c, quantity: c.rarity === "LEGENDARY" ? 1 : 2}))

/**
 * his function gets a card array, the selected format
 * and the selected hero and the isInteresting flag
 * and returns the available cards. The isInteresting
 * flag is true returns cards that have priorities or
 * deck wide filters.
 * @param {Array} cardDb 
 * @param {String} heroName 
 * @param {String} format 
 * @param {Boolean} isInteresting 
 */
export const getAvailableCards = (cardDb, heroName, format, isInteresting) => {
  const expansionLimit = format === "Standard" ? 8 : 0;

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

/**
 * This method is similar to getAvailableCards but it is used
 * in a later stage and assumes that the cards are ALREADY FILTERED
 * by hero and format.
 * @param {*} cards
 * @param {*} priority
 */
export const getCardsForFilters = (filteredCards, filters) => {
  return filteredCards.filter(card =>
    cardSatisfiesFilters(card, filters) || 
    filters.find(f => f.initiatorName && f.initiatorName === card.name) // This check is for the princes.
  );
};

export const cardSatisfiesFilters = (card, filters) => {
  let satisfiesFilters;
  for (const filter of filters) {
    satisfiesFilters = false; // The result starts as false for each filter.
    // If the card does not have the filter property as a property,
    // the result is false and break from loop.
    if (get(card, filter.property) === undefined) {
      // console.log("%cDANGER", "color: red; font-size: x-large", filter.property, card);
      satisfiesFilters = false;
      break;
    }
    switch (filter.operation) {
      case "EQUALS":
        const cardPropertyValue = get(card, filter.property);
        if (
          cardPropertyValue === filter.minValue ||
          cardPropertyValue === "ALL"
        ) {
          // Nightmare Amalgam check.
          satisfiesFilters = true;
        }
        break;
      case "NOT_EQUALS":
        if (get(card, filter.property) !== filter.minValue) {
          satisfiesFilters = true;
        }
        break;
      case "GREATER_THAN":
        if (get(card, filter.property) > filter.minValue) {
          satisfiesFilters = true;
        }
        break;
      case "LESS_THAN":
        if (get(card, filter.property) < filter.minValue) {
          satisfiesFilters = true;
        }
        break;
      case "INCLUDES":
        if (get(card, filter.property).includes(filter.minValue)) {
          satisfiesFilters = true;
        }
        break;
      case "NOT_INCLUDES":
        if (!get(card, filter.property).includes(filter.minValue)) {
          satisfiesFilters = true;
        }
        break;
      case "IS_INCLUDED_IN":
        if (filter.minValue.includes(get(card, filter.property))) {
          satisfiesFilters = true;
        }
        break;
      case "NOT_INCLUDED_IN":
        if (!filter.minValue.includes(get(card, filter.property))) {
          satisfiesFilters = true;
        }
        break;
      case "MATCH":
        if (
          get(card, filter.property).match(new RegExp(filter.minValue, "gi"))
        ) {
          satisfiesFilters = true;
        }
        break;
      case "NOT_MATCH":
        if (
          !get(card, filter.property).match(new RegExp(filter.minValue, "gi"))
        ) {
          satisfiesFilters = true;
        }
        break;
      case "MATCH_CASE_SENSITIVE":
        if (
          get(card, filter.property).match(new RegExp(filter.minValue, "g"))
        ) {
          satisfiesFilters = true;
        }
        break;
      case "IS_EVEN":
        if (get(card, filter.property) % 2 === 0) {
          satisfiesFilters = true;
        }
        break;
      case "IS_ODD":
        if (get(card, filter.property) % 2 !== 0) {
          satisfiesFilters = true;
        }
        break;
      case "HIGH_HEALTH_MINION": // The most proper way for this would be to add HIGH_HEALTH as extra in minions.
        if (
          get(card, "type") === "MINION" &&
          get(card, "attack") / get(card, "health") <= 0.66
        ) {
          satisfiesFilters = true;
        }
        break;
      case "HIGHLANDER":
        satisfiesFilters = true;
        break;
      default:
        satisfiesFilters = false;
        break;
    }
    if (satisfiesFilters === false) {
      break;
    }
  }
  return satisfiesFilters;
};
