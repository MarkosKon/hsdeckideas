// @flow
import { encode } from 'deckstrings';
import cloneDeep from 'lodash.clonedeep';
import { byCostAndName, removeArrayElement, getRandom } from 'some-utils';

import getLastStep from './history';
import {
  getSize,
  hasPriorities,
  hasDeckWideFilters,
  chooseInterestingCard,
  getCardsForFilters,
  cardSatisfiesFilters,
  initializeQuantity,
  removeSubset,
  getCard,
  isCardInteresting,
} from './card';
import {
  computeMax, fieldEquals, fieldGreaterThan, fieldLessThan,
} from './object';
import type {
  Deck, Card, Archetype, Step, Priority, Filter,
} from '../types';

const partial = require('lodash.partial');

// compare-object-field methods.
const sizeLessThan = fieldLessThan('size');
const sizeLessThan30 = sizeLessThan(30);
const sizeLessThan11 = sizeLessThan(11);

const sizeGreaterThan = fieldGreaterThan('size');
const sizeGreaterThan15 = sizeGreaterThan(15);
const sizeGreaterThan23 = sizeGreaterThan(23);
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

const createBarCharDataForCost = (chartData: Object, card: Card): Object => {
  // eslint-disable-next-line no-param-reassign
  if (costsMoreThan7(card)) chartData[7].cardCount += card.quantity;
  // eslint-disable-next-line no-param-reassign
  else chartData[card.cost].cardCount += card.quantity;
  return chartData;
};
const createInitialBarChartData = () => ['0', '1', '2', '3', '4', '5', '6', '7+'].map(item => ({
  manaCost: item,
  cardCount: 0,
}));
const getManaCurveChartData = (deck: Deck): Object => {
  if (deck.cards) return deck.cards.reduce(createBarCharDataForCost, createInitialBarChartData());
  return [];
};

const getDeckCode = (deck: Deck, heroCode: string, format: string): string => encode({
  cards: deck.cards.map(card => [card.dbfId, card.quantity]),
  heroes: [heroCode],
  format: format === 'Standard' ? 2 : 1,
});

const calculateDust = (totalDust: number, card: Card): number => {
  if (isCommon(card)) return totalDust + 40 * card.quantity;
  if (isRare(card)) return totalDust + 100 * card.quantity;
  if (isEpic(card)) return totalDust + 400 * card.quantity;
  if (isLegendary(card)) return totalDust + 1600;
  return totalDust;
};

const calculateScore = (sum: number, card: Card): number => sum + card.rating * card.quantity;
const getTotalDust = (deck: Deck): number => deck.cards.reduce(calculateDust, 0);

const getDeckScore = (deck: Deck): number => deck.cards.reduce(calculateScore, 0);

const initializeDeck = ({
  heroName,
  heroPower,
  archetype,
  isCompetitive,
}: {
  heroName: string,
  heroPower: Object,
  archetype: Archetype,
  isCompetitive: boolean,
}): Deck => ({
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

const message = {
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

const initializeStep = (originCards: Array<Card>, deck: Deck): Step => ({
  extra: message.default,
  sizeBefore: getSize(deck.cards),
  originCards,
  otherCards: [],
  totalAddedCards: [],
  deckWideFilters: [],
  priorities: [],
  prioritiesInfo: [],
});

const calculateCardQuantity = (deck: Deck, card: Card, otherCase: boolean = false): number => {
  const shouldBe1 = isHighlander(deck) || sizeEquals29(deck) || isLegendary(card);
  return shouldBe1 || otherCase ? 1 : 2;
};

const calculateCardsToAdd = (cardsAdded: Array<Card>, interestingCard: Card): Array<Card> => {
  const numberOfCardsAdded = getSize(cardsAdded);
  if (numberOfCardsAdded < 28) cardsAdded.push(interestingCard);
  else if (numberOfCardsAdded === 29) {
    cardsAdded.push({ ...interestingCard, quantity: 1 });
  }
  return cardsAdded;
};

const addInterestingCards = (deck: Deck, interestingCards: Array<Card>): Deck => {
  const deckCopy = cloneDeep(deck);
  const interestingCardsWithQuantity = initializeQuantity(interestingCards);

  deckCopy.cards = getSize(interestingCardsWithQuantity) > 30
    ? interestingCardsWithQuantity.reduce(calculateCardsToAdd, [])
    : deckCopy.cards.concat(interestingCardsWithQuantity);
  deckCopy.size = getSize(deckCopy.cards);
  deckCopy.history.steps.push(initializeStep(interestingCardsWithQuantity, deckCopy));
  return deckCopy;
};

const addOtherCards = (deck: Deck, currentStep: Step, otherCards: Array<Card>): Array<Card> => {
  const addedOtherCards = [];

  // eslint-disable-next-line no-param-reassign
  currentStep.extra += message.otherCardsSelected;
  let i = 0;
  while (sizeLessThan30(deck) && i < otherCards.length) {
    const card = otherCards[i];
    card.quantity = calculateCardQuantity(deck, card);
    deck.cards.push(card);
    // eslint-disable-next-line no-param-reassign
    deck.size += card.quantity;
    addedOtherCards.push(card);
    i += 1;
  }
  return addedOtherCards;
};

const getActiveVersion = (card: Card): Object => card.versions[card.activeVersion];

// Note: Right now we're using this only to add some relevant cards in
// the deck. If we want to use it everywhere we need a way to know
// if the user selected a specific version or not. I don't really care
// so I leave it as is.
const getRandomVersion = (card: Card): Object => {
  const { versions } = card;
  const randomVersion = versions[getRandom(0, versions.length - 1)];
  return randomVersion;
};

const toPriorities = (priorities: Array<Priority>, card: Card): Array<Priority> => {
  return priorities.concat(getActiveVersion(card).priorities);
};
const isPriorityExamined = (deck: Deck, priority: Priority): boolean => {
  return deck.history.totalPrioritiesExamined[priority.id];
};
/**
 * This method takes as input the deck and returns an array of priorities extracted
 * from the deck's cards. It does not return priorities that have already been examined.
 */
const obtainPriorities = (deck: Deck): Array<Priority> => deck.cards
  .filter(hasPriorities)
  .reduce(toPriorities, [])
  .filter(priority => !isPriorityExamined(deck, priority));

/**
 * This method checks if a deck satisfies a priority. If it does
 * returns true else returns how many cards the deck contains that satisfy
 * the priority. It is different from getCardsForFilters because it takes
 * into account the hero power.
 */
const deckSatisfiesPriority = (deck: Deck, priority: Priority): true | number => {
  let cardCount = getSize(getCardsForFilters(deck.cards, priority.filters, false));
  if (cardSatisfiesFilters(deck.heroPower, priority.filters, false)) {
    cardCount += 2;
  }
  if (cardCount >= priority.maxCards) return true;
  return cardCount;
};

const toInfo = (priority: Priority): Object => ({
  priority,
  priorityAddedCards: [],
  extra: 'Priority not processed',
});

const getInfoFromPriorities = (priorities: Array<Priority>): Object => priorities.map(toInfo);

const toDeckWideFilters = (filters: Array<Filter>, card: Card): Object => {
  return filters.concat(card.deckFilters);
};
const isFilterExamined = (deck: Deck, filter: Filter): boolean => {
  const totalFiltersExamined = deck.history.totalDeckFiltersExamined;
  if (!totalFiltersExamined[filter.id]) {
    totalFiltersExamined[filter.id] = filter;
    return false;
  }
  return true;
};
const obtainDeckWideFilters = (deck: Deck): Object => deck.cards
  .filter(hasDeckWideFilters)
  .reduce(toDeckWideFilters, [])
  .filter(filter => !isFilterExamined(deck, filter));

const toCardCount = (priority: Priority, deck: Deck): number => {
  const cardCount = deckSatisfiesPriority(deck, priority);
  if (cardCount === true) return priority.maxCards;
  return cardCount;
};
const toStats = (archetype: Archetype, deck: Deck): Object => ({
  archetype,
  cardCount: archetype.priorities
    .map(priority => toCardCount(priority, deck))
    .reduce((totalCount, count) => totalCount + count, 0),
});

const computeMaxCount = partial(computeMax, 'cardCount');
/**
 * This method takes as input the deck and the available archetypes
 * and returns which archetype better represents the deck. This is
 * determined by the total number of cards that satisfy each archetype
 * priority.
 */
const getClosestArchetype = (deck: Deck, archetypes: Array<Archetype>): Archetype => {
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
 */
const completeDeckRandomly = (deck: Deck, availableCards: Array<Card>): Deck => {
  const deckCopy = cloneDeep(deck);
  const cardPool = removeSubset(availableCards, deckCopy.cards);

  while (sizeLessThan30(deckCopy) && cardPool.length > 0) {
    let cardToPut = getCard(cardPool, deckCopy.isCompetitive);
    removeArrayElement(cardPool, cardToPut);
    cardToPut.quantity = calculateCardQuantity(deckCopy, cardToPut);
    cardToPut = {
      ...cardToPut,
      isRandom: true,
      isFrom: 'Random',
    };
    deckCopy.cards.push(cardToPut);
    deckCopy.size += cardToPut.quantity;
  }
  return deckCopy;
};

const calculateHowManyCardsToPut = (
  deckSize: number,
  totalDeckCardsThatSatisfyPriority: number,
  priority: Priority,
): number => {
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

const cardFitsInDeck = (deck: Deck, card: Card): boolean => {
  const { priorities } = getRandomVersion(card);
  const prioritiesSatisfied = priorities.reduce((verdict, priority) => {
    if (verdict === false) return false;
    const satisfiesPriority = typeof deckSatisfiesPriority(deck, priority) !== 'number';
    return satisfiesPriority;
  }, true);
  return prioritiesSatisfied;
};

const sortDescByScore = (a: Card, b: Card): number => {
  const calculateMaxCards = (sum, { maxCards }) => sum + maxCards;
  const totalCardsA = getRandomVersion(a).priorities.reduce(calculateMaxCards, 0);
  const scoreA = (a.rating / 2) * totalCardsA;
  const totalCardsB = getRandomVersion(b).priorities.reduce(calculateMaxCards, 0);
  const scoreB = (b.rating / 2) * totalCardsB;
  if (scoreA - scoreB < 0) return 1;
  if (scoreA - scoreB > 0) return -1;
  return 0;
};

const addRelevantCards = ({
  deck,
  cardPool,
  number,
}: {
  deck: Deck,
  cardPool: Array<Card>,
  number: number,
}): Deck => {
  const deckCopy = cloneDeep(deck);
  // const lastStep = getLastStep(deck);

  const interestingCards = cardPool.filter(isCardInteresting);
  const fittingCardPool = interestingCards.filter(partial(cardFitsInDeck, deckCopy), true);
  const sorted = removeSubset(fittingCardPool, deck.cards).sort(sortDescByScore);
  const availableSpots = 30 - deck.size;
  const howManyToPut = availableSpots < number ? availableSpots : number;
  // maybe use getCard method here?
  const different = sorted.slice(0, howManyToPut);
  let added = 0;
  different.forEach((card) => {
    if (added < howManyToPut) {
      const quantity = calculateCardQuantity(deckCopy, card);
      const correctQuantity = quantity + added > howManyToPut ? 1 : quantity;
      deckCopy.cards = deckCopy.cards.concat({ ...card, quantity: correctQuantity });
      deckCopy.size += correctQuantity;
      removeArrayElement(cardPool, card);
      // TODO: add the history (report) stuff here.
      added += correctQuantity;
      // console.log(added, correctQuantity, card.name);
    }
  });
  // console.log(different, availableSpots, howManyToPut);
  return deckCopy;
};

// Each priority inside a step.
const addCardsForPriority = (
  availableCards: Array<Card>,
  deck: Deck,
  priority: Priority,
  totalDeckCardsThatSatisfyPriority: number,
): Deck => {
  const currentStep = getLastStep(deck);
  // Flow complains that we don't handle the undefined case for find.
  // As a workaround I added the "|| {}" at the end. Is that case important?
  const currentPriorityInfo = currentStep.prioritiesInfo.find((info) => {
    return info.priority === priority;
  }) || {};

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

  // eslint-disable-next-line no-param-reassign
  deck.cards = deck.cards.concat(cardsWeAdded);
  // eslint-disable-next-line no-param-reassign
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
const completeDeckByPriorities = (
  deck: Deck,
  availableCards: Array<Card>,
  priorities: Array<Priority>,
): Deck => {
  const currentStep = getLastStep(deck);

  // For each priority...
  // eslint-disable-next-line no-restricted-syntax
  for (const priority of priorities) {
    // Flow complains that we don't handle the undefined case for find.
    // As a workaround I added the "|| {}" at the end. Is that case important?
    const currentPriorityInfo = currentStep.prioritiesInfo.find((info) => {
      return info.priority === priority;
    }) || {};

    // Just make an entry for checking if we reviewed that priority
    // (extract priorities method does that), do not add more info.
    // eslint-disable-next-line no-param-reassign
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
      // eslint-disable-next-line no-param-reassign
      deck = addCardsForPriority(availableCards, deck, priority, dSatisfiesPriority);
    } else currentPriorityInfo.extra = message.deckIsOversatisfied;
  }
  return deck;
};

/**
 *  Some notes on the algorithm.
 * - The history (report) and the deck should be different objects.
 *   The available card pool also. 3 Reducers maybe?
 * - We could avoid many methods with well-tested utility methods from lodash.
 *   For example, removeSubset method.
 */
const getDeck = ({
  initialDeck,
  availableCards,
  archetypes,
  interestingCards,
  otherCards,
  extraDeckWideFilters = [],
}: {
  initialDeck: Deck,
  availableCards: Array<Card>,
  archetypes: Array<Archetype>,
  interestingCards: Array<Card>,
  otherCards: Array<Card>,
  extraDeckWideFilters: Object,
}): Deck => {
  let firstTime = true;
  let addedArchetypePriorities = false;
  let cardPool = cloneDeep(availableCards);
  let deck = cloneDeep(initialDeck);

  if (extraDeckWideFilters.length > 0) {
    cardPool = getCardsForFilters(cardPool, extraDeckWideFilters, true);
  }

  try {
    deck = addInterestingCards(
      deck,
      interestingCards || [chooseInterestingCard(cardPool, deck.cards)],
    );
  } catch (err) {
    // Recover when we don't have any interesting cards.
    console.log({ err });
    deck.history.steps.push(initializeStep([], deck));
    deck = completeDeckRandomly(deck, cardPool);
    if (typeof deck.archetype === 'string') deck.archetype = getClosestArchetype(deck, archetypes);
    deck.totalDust = getTotalDust(deck);
    deck.score = getDeckScore(deck);
    deck.cards.sort(byCostAndName);
    return deck;
  }

  let currentStep = getLastStep(deck);

  if (otherCards) currentStep.otherCards = addOtherCards(deck, currentStep, otherCards);

  currentStep.priorities = obtainPriorities(deck);

  if (deck.archetype !== 'Random') {
    currentStep.priorities = currentStep.priorities.concat(deck.archetype.priorities);
    addedArchetypePriorities = true;
    currentStep.extra = message.defaultPlusArchetype;
  }
  currentStep.prioritiesInfo = getInfoFromPriorities(currentStep.priorities);

  let continueLooping = true;
  let numberOfSteps = 0; // avoid infinite loop.
  // Each iteration is a step (completeDeckByPriorities).
  while (sizeLessThan30(deck) && continueLooping && numberOfSteps < 20) {
    if (firstTime) firstTime = false;
    else {
      currentStep = getLastStep(deck);
      currentStep.priorities = obtainPriorities(deck);
      currentStep.prioritiesInfo = getInfoFromPriorities(currentStep.priorities);
    }

    // Deck wide FILTERS.
    // TODO: Show somewhere in the report (history) that we added extra filters.
    currentStep.deckWideFilters = obtainDeckWideFilters(deck);
    if (currentStep.deckWideFilters.length > 0) {
      cardPool = getCardsForFilters(cardPool, currentStep.deckWideFilters, false);
      const remainingDeckCards = getCardsForFilters(deck.cards, currentStep.deckWideFilters, false);
      if (cardPool.length === 0) {
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
        deck.cards = initializeQuantity(deck.cards, { isHighlander: true });
        deck.size = getSize(deck.cards);
      }
    }

    if (currentStep.priorities.length === 0) {
      // Choose an additional "interesting" card.
      if (sizeLessThan11(deck)) {
        const anInterestingCard = chooseInterestingCard(cardPool, deck.cards);
        anInterestingCard.quantity = calculateCardQuantity(deck, anInterestingCard);
        currentStep.totalAddedCards = [anInterestingCard];
        currentStep.extra = message.noOriginCards;
        deck.cards.push(anInterestingCard);
        deck.size = getSize(deck.cards);
        deck.history.steps.push(initializeStep([anInterestingCard], deck));
        numberOfSteps += 1;
        // eslint-disable-next-line no-continue
        continue;
      }

      // STOP if we already chose an archetype.
      if (addedArchetypePriorities) {
        currentStep.extra = message.archetypeChosenNoPriorities;
        continueLooping = false;
        // eslint-disable-next-line no-continue
        continue;
      }

      // Pick an archetype if we haven't yet or if the deck is near completion (> 23 cards).
      if (!addedArchetypePriorities || sizeGreaterThan23(deck)) {
        // Analyze the deck and add the closest archetype's priorities.
        addedArchetypePriorities = true;
        deck.archetype = getClosestArchetype(deck, archetypes);
        currentStep.priorities = deck.archetype.priorities;
        currentStep.prioritiesInfo = getInfoFromPriorities(currentStep.priorities);
        currentStep.extra = message.archetypeIn(deck.archetype.name);
      }

      // Note: If we add the archetype we'll then add the relevant cards without
      // adding the cards need by the archetype. No big deal. We can solve it
      // if we add the cards at the begging maybe.

      // If the size is greater than 15 add some, let's say 6, fitting cards.
      if (sizeGreaterThan15(deck)) deck = addRelevantCards({ deck, cardPool, number: 6 });
    }

    // Do the work.
    deck = completeDeckByPriorities(deck, cardPool, currentStep.priorities);
    if (sizeLessThan30(deck)) {
      deck.history.steps.push(initializeStep(currentStep.totalAddedCards, deck));
    }
    numberOfSteps += 1;
    // After a year the following comment doesn't make much sense to me but I leave it:

    // TODO: when errors stop do here the priority - priorityinfo extraction.
    // Note if we do that here we will have to drop the "continue"'s also.
  }

  deck = completeDeckRandomly(deck, cardPool);

  // In other words, if it's 'Random'. I'm sorry Flowjs.
  if (typeof deck.archetype === 'string') deck.archetype = getClosestArchetype(deck, archetypes);

  deck.totalDust = getTotalDust(deck);
  deck.score = getDeckScore(deck);
  deck.cards.sort(byCostAndName);

  return deck;
};

const idEquals = (priority: Priority, priorityId: string): boolean => priority.id === priorityId;
const versionsToPriorities = (priorities: Array<Priority>, version: Object): Array<Priority> => {
  return priorities.concat(version.priorities);
};
/**
 * This method is used by the getDendrogramData method and the History component.
 * It assumes that each card priority has a unique id.
 */
const getCardThatRequestedPriority = (deck: Deck, priorityId: string): Card | void => {
  return deck.cards.find(
    card => hasPriorities(card)
      && card.versions.reduce(versionsToPriorities, []).find(p => idEquals(p, priorityId)),
  );
};

// we export them because we want to test them.
export {
  getTotalDust,
  getDeckScore,
  initializeStep,
  calculateCardQuantity,
  addOtherCards,
  obtainPriorities,
  deckSatisfiesPriority,
  getInfoFromPriorities,
  obtainDeckWideFilters,
  toCardCount,
  computeMaxCount,
  getClosestArchetype,
  completeDeckRandomly,
  calculateHowManyCardsToPut,
};

// we export them because they are used in other files
export {
  getManaCurveChartData,
  getDeckCode,
  initializeDeck,
  getDeck,
  getCardThatRequestedPriority,
  versionsToPriorities,
};
