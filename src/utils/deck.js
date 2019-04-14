import { encode } from 'deckstrings';
// import cloneDeep from 'lodash.clonedeep';

import {
  byCostAndName, byName, removeArrayElement, getRandom,
} from 'some-utils';
import getLastStep from './history';
import {
  getSize,
  hasPriorities,
  hasDeckWideFilters,
  chooseInterestingCard,
  getCardsForFilters,
  cardSatisfiesFilters,
  resetQuantity,
  removeSubset,
  getCard,
} from './card';
import {
  computeMax, fieldEquals, fieldGreaterThan, fieldLessThan,
} from './object';

const partial = require('lodash.partial');

// compare-object-field methods.
const sizeLessThan = fieldLessThan('size');
const sizeLessThan30 = sizeLessThan(30);
const sizeLessThan11 = sizeLessThan(11);

const sizeGreaterThan = fieldGreaterThan('size');
const sizeGreaterThan16 = sizeGreaterThan(16);
const sizeGreaterThan29 = sizeGreaterThan(29);
const costsMoreThan7 = fieldGreaterThan('cost')(7);

const sizeEquals = fieldEquals('size');
const rarityEquals = fieldEquals('rarity');
const sizeEquals29 = sizeEquals(29);
const isHighlander = fieldEquals('isHighlander')(true);
const isCommon = rarityEquals('COMMON');
const isRare = rarityEquals('RARE');
const isEpic = rarityEquals('EPIC');
const isLegendary = rarityEquals('LEGENDARY');

const createBarCharDataForCost = (chartData, card) => {
  // eslint-disable-next-line no-param-reassign
  if (costsMoreThan7(card)) chartData[7].cardCount += card.quantity;
  // eslint-disable-next-line no-param-reassign
  else chartData[card.cost].cardCount += card.quantity;
  return chartData;
};
const createInitalBarChartData = () => ['0', '1', '2', '3', '4', '5', '6', '7+'].map(item => ({
  manaCost: item,
  cardCount: 0,
}));
// prettier-ignore
export const getManaCurveChartData = deck => deck.cards && deck.cards
  .reduce(createBarCharDataForCost, createInitalBarChartData());

export const getDeckCode = (deck, heroCode, format) => encode({
  cards: deck.cards.map(card => [card.dbfId, card.quantity]),
  heroes: [heroCode],
  format: format === 'Standard' ? 2 : 1,
});

/* eslint-disable no-nested-ternary */
const calculateDust = (sum, card) => (isCommon(card)
  ? sum + 40 * card.quantity
  : isRare(card)
    ? sum + 100 * card.quantity
    : isEpic(card)
      ? sum + 400 * card.quantity
      : isLegendary(card)
        ? sum + 1600
        : sum);
/* eslint-enable no-nested-ternary */

const calculateScore = (sum, card) => sum + card.rating * card.quantity;
export const getTotalDust = deck => deck.cards.reduce(calculateDust, 0);

export const getDeckScore = deck => deck.cards.reduce(calculateScore, 0);

export const initializeDeck = ({
  heroName, heroPower, archetype, isCompetitive,
}) => ({
  cards: [],
  hero: heroName,
  heroPower,
  isHighlander: false,
  archetype,
  isCompetitive,
  totalDust: 0,
  score: 0,
  size: 0,
  history: {
    steps: [],
    totalPrioritiesExamined: {},
    totalDeckFiltersExamined: {},
  },
});

export const message = {
  default: 'In this step the priorities come from the origin card(s).',
  defaultPlusArchetype: `In this step the priorities come from the origin card(s) and from the
    archetype you selected.`,
  noAvailableCards: `Yeah.. really smart choices congratulations... There are no available
    cards to fill the deck.`,
  deckWideFilters: `In this step the origin card(s) have deck wide filters. In this case
    we'll limit the available card pool according to the filters and remove the inappropriate
    cards from the deck. Finally we'll proceed with the priorities (if any).`,
  noOriginCards: `We don't have 'origin' cards for this step. This happens when the cards
    don't have any priorities or when the priorities of the cards added are already satisfied
    or when we don't have cards for the priority. So because we are still at the start
    (the deck size is less or equal to 10 cards) we continue by adding an additional
    'interesting' card.`,
  archetypeChosenNoPriorities: `The origin cards for this step
  don't have priorities and we have already added an archetype. In this case we proceed by adding
  some completely random good cards`,
  dontHaveCards: "We don't have cards for this priority.",
  deckIsFull: 'The deck is full. Any remaining priorities will not be processed.',
  deckIsOversatisfied: "We won't add cards for this priority because the deck over-satisfies it.",
  otherCardsSelected: ' You also selected some cards without priorities.',
  archetypeIn: archetypeName => `The following priorities come from the archetype that better represents the deck we have so
    far, which is the ${archetypeName} archetype. We do that when the cards from the previous
    step don't have any new priorities and the deck size is more that 10 cards. This can also happen
    when the cards from the previous step have priorities but deck is already at least 17 cards deep.
    We do that because at that point we want to stop adding synergy and start adding vital cards.`,
  notAddingWeAlreadyHave: cardCount => `We decided against adding extra cards because we already have in the deck
    ${cardCount} cards that meet those requirements.`,
  successfullyAdded: (
    cardsAdded,
    availableCards,
    deckCards,
  ) => `We chose ${cardsAdded} card(s) in total from a pool of ${availableCards} different card(s).
    In the deck we had ${deckCards} cards that met those requirements.`,
};

export const initializeStep = (originCards, deck) => ({
  extra: message.default,
  sizeBefore: getSize(deck.cards),
  originCards,
  totalAddedCards: [],
  deckWideFilters: [],
  priorities: [],
  prioritiesInfo: [],
});

export const calculateCardQuantity = (deck, card, otherCase) => {
  const check = isHighlander(deck) || sizeEquals29(deck) || isLegendary(card);
  if (otherCase !== undefined) return check || otherCase ? 1 : 2;
  return check ? 1 : 2;
};

const calculateCardsToAdd = (cardsAdded, interestingCard) => {
  const numberOfCardsAddedSoFar = getSize(cardsAdded);
  if (numberOfCardsAddedSoFar < 28) cardsAdded.push(interestingCard);
  else if (numberOfCardsAddedSoFar === 29) {
    interestingCard.quantity = 1;
    cardsAdded.push(interestingCard);
  }
  return cardsAdded;
};

export const addInterestingCards = (deck, interestingCards) => {
  interestingCards = resetQuantity(interestingCards);
  if (getSize(interestingCards) > 30) {
    interestingCards = interestingCards.reduce(calculateCardsToAdd, []);
  }
  deck.cards = deck.cards.concat(interestingCards);
  deck.size = getSize(deck.cards);
  deck.history.steps.push(initializeStep(interestingCards, deck));
};

export const addOtherCards = (deck, currentStep, otherCards) => {
  const addedOtherCards = [];
  currentStep.extra += message.otherCardsSelected;
  currentStep.otherCards = true;
  let i = 0;
  while (sizeLessThan30(deck) && i < otherCards.length) {
    const card = otherCards[i];
    card.quantity = calculateCardQuantity(deck, card);
    deck.cards.push(card);
    deck.size += card.quantity;
    addedOtherCards.push(card);
    i += 1;
  }
  return addedOtherCards;
};

export const getActiveVersion = card => card.versions[card.activeVersion];

// const getRandomVersion = versions => versions[getRandom(0, versions.length - 1)];

const toPriorities = (priorities, card) => priorities.concat(getActiveVersion(card).priorities);
const isPriorityExamined = (deck, priority) => deck.history.totalPrioritiesExamined[priority.id];
/**
 * This method takes as input the deck and returns an array of priorities extracted
 * from the deck's cards. It does not return priorities that have already been examined.
 * @param {Object} deck
 */
export const obtainPriorities = deck => deck.cards
  .filter(hasPriorities)
  .reduce(toPriorities, [])
  .filter(priority => !isPriorityExamined(deck, priority));

/**
 * This method checks if a deck satisfies a priority. If it does
 * returns true else returns how many cards the deck contains that satisfy
 * the priority. It is different from getCardsForFilters because it takes
 * into account the hero power.
 * @param {Object} deck
 * @param {Object} priority
 */
export const deckSatisfiesPriority = (deck, priority) => {
  let cardCount = getSize(getCardsForFilters(deck.cards, priority.filters, false));
  if (cardSatisfiesFilters(deck.heroPower, priority.filters, false)) {
    cardCount += 2;
  }
  if (cardCount >= priority.maxCards) return true;
  return cardCount;
};

const toInfo = priority => ({
  priority,
  priorityAddedCards: [],
  extra: 'Priority not processed',
});

/**
 * This is a helper method that transforms an array of priorities to
 * an array of info for those priorities. The info contain an initial
 * state where later on we change it.
 * @param {Array} priorities
 */
export const getInfoFromPriorities = priorities => priorities.map(toInfo);

const toDeckWideFilters = (filters, card) => filters.concat(card.deckFilters);
const isFilterExamined = (deck, filter) => {
  if (!deck.history.totalDeckFiltersExamined[filter.id]) {
    deck.history.totalDeckFiltersExamined[filter.id] = filter;
    return false;
  }
  return true;
};
export const obtainDeckWideFilters = deck => deck.cards
  .filter(hasDeckWideFilters)
  .reduce(toDeckWideFilters, [])
  .filter(filter => !isFilterExamined(deck, filter));

export const toCardCount = (priority, deck) => {
  const cardCount = deckSatisfiesPriority(deck, priority);
  if (cardCount === true) return priority.maxCards;
  return cardCount;
};
const toStats = (archetype, deck) => ({
  archetype,
  cardCount: archetype.priorities
    .map(priority => toCardCount(priority, deck))
    .reduce((totalCount, count) => (totalCount + count), 0),
});

export const computeMaxCount = partial(computeMax, 'cardCount');
/**
 * This method takes as input the deck and the available archetypes
 * and returns which archetype better represents the deck. This is
 * determined by the total number of cards that satisfy each archetype
 * priority.
 * @param {*} deck
 * @param {*} archetypes
 */
export const getClosestArchetype = (deck, archetypes) => {
  const archetypeStats = archetypes.map(archetype => toStats(archetype, deck));

  const max = archetypeStats.reduce(computeMaxCount, 0);

  if (max === 0) return archetypes[getRandom(0, archetypes.length - 1)];

  const mostSatisfiedArchetypes = archetypeStats.filter(stat => stat.cardCount === max);
  if (mostSatisfiedArchetypes.length > 1) {
    return mostSatisfiedArchetypes[getRandom(0, mostSatisfiedArchetypes.length - 1)].archetype;
  }
  return mostSatisfiedArchetypes[0].archetype;
};

/**
 * This method finishes the deck randomly, from a pool
 * of "good" cards for the selected class. It doesn't
 * check their priorities or deck wide filters.
 * @param {Object} deck
 * @param {Array} availableCards
 */
export const completeDeckRandomly = (deck, availableCards) => {
  availableCards = removeSubset(availableCards, deck.cards);

  while (sizeLessThan30(deck) && availableCards.length > 0) {
    let cardToPut = getCard(availableCards, deck.isCompetitive);
    removeArrayElement(availableCards, cardToPut);
    cardToPut.quantity = calculateCardQuantity(deck, cardToPut);
    cardToPut = {
      ...cardToPut,
      isRandom: true,
      isFrom: 'Random',
    };
    deck.cards.push(cardToPut);
    deck.size += cardToPut.quantity;
  }
  return deck;
};

export const calculateHowManyCardsToPut = (
  deckSize,
  totalDeckCardsThatSatisfyPriority,
  priority,
) => {
  const freeSlots = 30 - deckSize;

  let minNumberOfCardsToPut = priority.minCards - totalDeckCardsThatSatisfyPriority;
  if (minNumberOfCardsToPut < 0) minNumberOfCardsToPut = 0;

  const maxNumberOfCardsToPut = priority.maxCards - totalDeckCardsThatSatisfyPriority;

  let numberOfCardsToPut;
  if (freeSlots < minNumberOfCardsToPut) numberOfCardsToPut = freeSlots;
  else if (freeSlots < maxNumberOfCardsToPut) {
    numberOfCardsToPut = getRandom(minNumberOfCardsToPut, freeSlots);
  } else {
    numberOfCardsToPut = getRandom(minNumberOfCardsToPut, maxNumberOfCardsToPut);
  }

  return numberOfCardsToPut;
};

// Each priority inside a step.
export const addCardsForPriority = (
  availableCards,
  deck,
  priority,
  totalDeckCardsThatSatisfyPriority,
) => {
  const currentStep = getLastStep(deck);
  const currentPriorityInfo = currentStep.prioritiesInfo.find(info => info.priority === priority);

  let availableCardsThatSatisfyPriority = getCardsForFilters(
    availableCards,
    priority.filters,
    false,
  );
  // remove the deck cards from the available cards.
  availableCardsThatSatisfyPriority = removeSubset(availableCardsThatSatisfyPriority, deck.cards);
  if (availableCardsThatSatisfyPriority.length === 0) {
    currentPriorityInfo.extra = message.dontHaveCards;
    return deck;
  }

  let numberOfCardsWeWantToAdd = calculateHowManyCardsToPut(
    deck.size,
    totalDeckCardsThatSatisfyPriority,
    priority,
  );
  const cardsWeAdded = [];

  while (numberOfCardsWeWantToAdd > 0 && availableCardsThatSatisfyPriority.length > 0) {
    const cardToPut = getCard(availableCardsThatSatisfyPriority, deck.isCompetitive);
    removeArrayElement(availableCardsThatSatisfyPriority, cardToPut);
    cardToPut.quantity = calculateCardQuantity(deck, cardToPut, numberOfCardsWeWantToAdd < 2);
    numberOfCardsWeWantToAdd -= cardToPut.quantity;
    cardsWeAdded.push(cardToPut);
  }

  deck.cards = deck.cards.concat(cardsWeAdded);
  deck.size = getSize(deck.cards);

  // 3. History object manipulations.
  if (cardsWeAdded.length === 0) {
    currentPriorityInfo.extra = message.notAddingWeAlreadyHave(totalDeckCardsThatSatisfyPriority);
  } else {
    currentPriorityInfo.extra = message.successfullyAdded(
      getSize(cardsWeAdded),
      availableCardsThatSatisfyPriority.length,
      totalDeckCardsThatSatisfyPriority,
    );
  }
  currentPriorityInfo.priorityAddedCards = cardsWeAdded;
  currentStep.totalAddedCards = currentStep.totalAddedCards.concat(cardsWeAdded);

  return deck;
};

// Each step.
export const completeDeckByPriorities = (deck, availableCards, priorities) => {
  const currentStep = getLastStep(deck);

  // For each priority...
  // eslint-disable-next-line no-restricted-syntax
  for (const priority of priorities) {
    const currentPriorityInfo = currentStep.prioritiesInfo.find(info => info.priority === priority);

    // Just make an entry for checking if we reviewed that priority
    // (extract priorities method does that), do not add more info.
    deck.history.totalPrioritiesExamined[priority.id] = priority;

    if (sizeGreaterThan29(deck)) {
      currentPriorityInfo.extra = message.deckIsFull;
      break;
    }
    // Keep in mind that deckSatisfiesPriority method returns TRUE if the number
    // of cards the deck has for that particular priority is equal of higher to the max.
    // If it's smaller returns how many card it needs.
    const dSatisfiesPriority = deckSatisfiesPriority(deck, priority);
    if (sizeLessThan30(deck) && dSatisfiesPriority !== true) {
      deck = addCardsForPriority(availableCards, deck, priority, dSatisfiesPriority);
    } else currentPriorityInfo.extra = message.deckIsOversatisfied;
  }
  return deck;
};

/**
 * The main method of the file.
 * @param {Array} availableCards
 * @param {Object} archetype
 * @param {Array} archetypes
 * @param {Array} interestingCards
 * @param {Array} otherCards
 */
export const getDeck = (
  deck,
  availableCards,
  archetypes,
  interestingCards,
  otherCards,
  extraDeckWideFilters,
) => {
  let firstTime = true;
  let addedArchetypePriorities = false;

  if (extraDeckWideFilters.length > 0) {
    availableCards = getCardsForFilters(availableCards, extraDeckWideFilters, true);
  }

  // interesting cards.
  addInterestingCards(
    deck,
    interestingCards || [chooseInterestingCard(availableCards, deck.cards)],
  );

  let currentStep = getLastStep(deck);

  // other cards.
  currentStep.otherCards = otherCards ? addOtherCards(deck, currentStep, otherCards) : [];

  currentStep.priorities = obtainPriorities(deck);

  // archetype
  if (deck.archetype !== 'Random') {
    currentStep.priorities = currentStep.priorities.concat(deck.archetype.priorities);
    addedArchetypePriorities = true;
    currentStep.extra = message.defaultPlusArchetype;
  }
  currentStep.prioritiesInfo = getInfoFromPriorities(currentStep.priorities);

  // 2. The loop.
  let continueLooping = true;
  let numberOfSteps = 0;
  // each iteration is a step (completeDeckByPriorities).
  while (sizeLessThan30(deck) && continueLooping && numberOfSteps < 20) {
    // first iteration stuff.
    if (firstTime) firstTime = false;
    else {
      currentStep = getLastStep(deck);
      // Priorities.
      currentStep.priorities = obtainPriorities(deck);
      currentStep.prioritiesInfo = getInfoFromPriorities(currentStep.priorities);
    }

    // Deck wide FILTERS.
    // Show somewhere in the deck that we added extra filters.
    currentStep.deckWideFilters = obtainDeckWideFilters(deck);
    if (currentStep.deckWideFilters.length > 0) {
      availableCards = getCardsForFilters(availableCards, currentStep.deckWideFilters, false); // A.
      const remainingDeckCards = getCardsForFilters(deck.cards, currentStep.deckWideFilters, false);
      if (availableCards.length === 0) {
        currentStep.extra = message.noAvailableCards;
        break;
      }
      currentStep.cardsRemoved = removeSubset(deck.cards, remainingDeckCards);
      deck.cards = remainingDeckCards;
      deck.size = getSize(deck.cards);
      currentStep.extra = message.deckWideFilters;
      // Check if filter is highlander.
      if (currentStep.deckWideFilters.find(f => f.operation === 'HIGHLANDER')) {
        deck.isHighlander = true;
        deck.cards = resetQuantity(deck.cards, true);
        deck.size = getSize(deck.cards);
      }
    }

    // Choose an interesting card.
    if (sizeLessThan11(deck) && currentStep.priorities.length === 0) {
      const anInterestingCard = chooseInterestingCard(availableCards, deck.cards);
      anInterestingCard.quantity = calculateCardQuantity(deck, anInterestingCard);
      currentStep.totalAddedCards = [anInterestingCard];
      currentStep.extra = message.noOriginCards;
      deck.cards.push(anInterestingCard);
      deck.size = getSize(deck.cards);
      deck.history.steps.push(initializeStep([anInterestingCard], deck));
      numberOfSteps += 1;
      continue;
    }

    // Stop if we have already chosen an archetype and we don't have priorities.
    if (addedArchetypePriorities && currentStep.priorities.length === 0) {
      currentStep.extra = message.archetypeChosenNoPriorities;
      continueLooping = false;
      continue;
    }

    // Choose an archetype.
    if (
      !addedArchetypePriorities
      && (currentStep.priorities.length === 0 || sizeGreaterThan16(deck))
    ) {
      // Analyze the deck and add the closest archetype's priorities.
      addedArchetypePriorities = true;
      deck.archetype = getClosestArchetype(deck, archetypes);
      currentStep.priorities = deck.archetype.priorities;
      currentStep.prioritiesInfo = getInfoFromPriorities(currentStep.priorities);
      currentStep.extra = message.archetypeIn(deck.archetype.name);
    }

    deck = completeDeckByPriorities(deck, availableCards, currentStep.priorities);
    if (sizeLessThan30(deck)) {
      deck.history.steps.push(initializeStep(currentStep.totalAddedCards, deck));
    }
    // TODO when errors stop do here the priority - priorityinfo extraction.
    // Note if we do that here we will have to drop the "continue"'s also.

    numberOfSteps += 1;
  }

  deck = completeDeckRandomly(deck, availableCards);

  deck.totalDust = getTotalDust(deck);
  deck.score = getDeckScore(deck);
  deck.cards.sort(byCostAndName);

  return deck;
};

/**
 * Used only in tests atm.
 * @param {*} deck
 */
export const hasDuplicates = deck => deck.cards.sort(byName).reduce((result, card, i, cards) => {
  if (i === cards.length - 1) return result;
  return !!(card.name === cards[i + 1].name || result);
}, false);

const idEquals = (priority, priorityId) => priority.id === priorityId;
export const versionsToPriorities = (priorities, version) => priorities.concat(version.priorities);
/**
 * This method is used by the getDendrogramData method and by the History component.
 * It assumes that each card priority has a unique id.
 * @param {Object} deck
 * @param {String} priorityId
 */
export const getCardThatRequestedPriority = (deck, priorityId) => deck.cards.find(
  card => hasPriorities(card)
      && card.versions.reduce(versionsToPriorities, []).find(p => idEquals(p, priorityId)),
);
