import { encode } from "deckstrings";
import { getRandom } from "./random";
import { byCostAndName } from "./sort";
import { removeArrayElement } from "./arrayUtils";
import { getLastStep } from "./historyUtils";
import {
  getSize,
  getBestCard,
  hasPriorities,
  hasDeckWideFilters,
  cardExists,
  chooseInterestingCard,
  getAvailableCards,
  getCardsForFilters,
  cardSatisfiesFilters,
  // resetToNoRandom,
  resetQuantity,
  removeSubset,
} from "./cardUtils";
import { computeMax } from "./objectUtils";

var partial = require('lodash.partial');

/**
 * This function returns the mana curve for a deck. The mana curve is a simple
 * array of numbers that is used in a chart.
 * @param {Object} deck
 */
export const getManaCurve = deck => deck.cards && deck.cards.reduce(createStatsForCost, [0, 0, 0, 0, 0, 0, 0, 0]);

/**
 * 
 * @param {Array} stats 
 * @param {Object} card 
 */
const createStatsForCost = (stats, card) => {
  if (costsMoreThan7(card)) 
    stats[7] += card.quantity;
  else 
    stats[card.cost] += card.quantity;
    
  return stats;
};

const costsMoreThan7 = card => card.cost > 7;

/**
 * * This function gets a deck, the heroCode and the format and
 * returns the deck code by using the deckstrings library.
 * @param {Object} deck 
 * @param {Number} heroCode 
 * @param {String} format 
 */
export const getDeckCode = (deck, heroCode, format) => {
  return encode({
    cards: deck.cards.map(card => [card.dbfId, card.quantity]),
    heroes: [heroCode],
    format: format === "Standard" ? 2 : 1
  });
};

/**
 * This method returns the total dust of the cards
 * of a deck.
 * @param {Object} deck
 */
export const getTotalDust = deck => deck.cards.reduce(calculateDust, 0);

/**
 * @param {Number} sum 
 * @param {Object} card 
 */
const calculateDust = (sum, card) => {
  switch (card.rarity) {
    case "COMMON":
      sum += 40 * card.quantity;
      break;
    case "RARE":
      sum += 100 * card.quantity;
      break;
    case "EPIC":
      sum += 400 * card.quantity;
      break;
    case "LEGENDARY":
      sum += 1600;
      break;
    default:
      break;
  }
  return sum;
};

/**
 * This method returns a sum of all the ratings of the
 * cards a deck includes.
 * @param {Object} deck
 */
export const getDeckScore = deck => deck.cards.reduce(calculateScore, 0);

/**
 * @param {Number} sum The sum of the card ratings so far
 * @param {Object} card The card
 */
const calculateScore = (sum, card) => sum += card.rating * card.quantity;

export const initializeDeck = (heroName, heroPower) => ({
  cards: [],
  hero: heroName,
  heroPower: heroPower,
  totalDust: 0,
  score: 0,
  history: {
    steps: [],
    totalPrioritiesExamined: {},
    totalDeckFiltersExamined: {}
  },
  size: 0
});

export const initializeStep = (originCards) => ({
  originCards: originCards,
  extra: message["default"],
  totalAddedCards: []
});

// TODO Θα μπορούσες να βάλεις τα step messages σε ενα object και 
// να φτιάξεις μια μέθοδο που να κάνει create step. Για να ξεδιαλύνει λίγο
// το πεδίο.

export const message = {
  default: "In this step the priorities come from the origin card(s).",
  defaultPlus: "In this step the priorities come from the origin card(s) and" + 
    " from the archetype you selected.",
  noAvailableCards: "Yeah.. really smart choices congratulations... " +
    "There are no available cards to fill the deck.",
  deckWideFilters: "In this step the origin card(s) have deck wide filters. In " +
    "this case we'll limit the available card pool according to the filters and remove " +
    "the inappropriate cards from the deck. Finally we'll proceed with the priorities " +
    "(if any).",
  noOriginCards: "We don't have 'origin' cards for this step. This happens when the cards " +
    "don't have any priorities or when the priorities of the cards added are already satisfied " +
    "or when we don't have cards for the priority. So because we are still at the start " +
    "(the deck size is less or equal to 10 cards) we continue by adding an additional " +
    "'interesting' card.",
  archetypeIn: (archetypeName) =>
    "The following priorities come from the archetype that better represents the deck we have so " +
    "far, which is the " + archetypeName + " archetype. We do that when the cards from the previous " +
    "step don't have any new priorities and the deck size is more that 10 cards. This can also happen " +
    "when the cards from the previous step have priorities but deck is already at least 17 cards deep. " +
    "We do that because at that point we want to stop adding synergy and start adding vital cards."
};

/**
 * The main method of the file.
 * @param {Array} cardDb 
 * @param {String} heroName 
 * @param {Object} heroPower 
 * @param {String} format 
 * @param {Object} archetype 
 * @param {Array} archetypes 
 * @param {Array} ics 
 * @param {Array} otherCards 
 */
export const getDeck = (cardDb, heroName, heroPower, format, archetype, archetypes, ics, otherCards ) => {
  // Find the available cards for the selected hero
  let availableCards = getAvailableCards(cardDb, heroName, format);
  let firstTime = true;
  let deck = initializeDeck(heroName, heroPower);

  // 1. Starting priorities, prepare for the initial step.
  let stepPriorities;
  let stepDeckWideFilters;
  let addedArchetypePriorities = false;
  let isHighlander = false;

  let interestingCards = ics === null ? [chooseInterestingCard(availableCards, deck.cards)] : ics;
  interestingCards = resetQuantity(interestingCards);
  deck.cards = deck.cards.concat(interestingCards);
  let step = initializeStep(interestingCards);

  // Other cards check for deck size.
  let deckSize = getSize(deck.cards);
  step.otherCards = otherCards ? addOtherCards(deck, deckSize, step, otherCards) : [];

  stepPriorities = extractPriorities(deck);

  if (archetype !== "Random") {
    deck.archetype = archetype;
    stepPriorities = stepPriorities.concat(archetype.priorities);
    addedArchetypePriorities = true;
    step.extra = message["defaultPlus"];
  }
  step.prioritiesInfo = getInfoFromPriorities(stepPriorities);

  // 2. The loop.
  deckSize = getSize(deck.cards);
  let stop = false;
  let customMessage = null;
  let executionNumber = 0;
  deck.history.steps.push(step);
  // each iteration is a step (completeDeckByPriorities).
  while (deckSize < 30 && !stop && executionNumber < 20) {
    // first iteration stuff.
    if (firstTime) 
      firstTime = false;
     else {
      deck.history.steps.push({
        extra:
          customMessage === null
            ? message["default"]
            : customMessage
      });
      customMessage = null;
    }

    // Check for deck wide filters.
    stepDeckWideFilters = extractDeckWideFilters(deck);
    if (stepDeckWideFilters.length > 0) {
      availableCards = getCardsForFilters(availableCards, stepDeckWideFilters); // A.
      let remainingDeckCards = getCardsForFilters(
        deck.cards,
        stepDeckWideFilters
      ); // B.
      let lastStep = getLastStep(deck);
      if (availableCards.length === 0) {
        lastStep.extra = message["noAvailableCards"];
        break;
      }
      lastStep.cardsRemoved = removeSubset(deck.cards, remainingDeckCards);
      deck.cards = remainingDeckCards;
      lastStep.extra = message["deckWideFilters"];
      // Check if filter is highlander.
      if (stepDeckWideFilters.find(f => f.operation === "HIGHLANDER")) {
        isHighlander = true;
        deck.cards = resetQuantity(deck.cards, true);
      }
    }

    deck = completeDeckByPriorities(deck, availableCards, stepPriorities, isHighlander);
    stepPriorities = extractPriorities(deck);
    deckSize = getSize(deck.cards);

    if (deckSize <= 10 && stepPriorities.length === 0) {
      const anInterestingCard = chooseInterestingCard(
        availableCards,
        deck.cards
      );
      anInterestingCard.quantity =
        anInterestingCard.rarity === "LEGENDARY" || isHighlander === true
          ? 1
          : 2; 
      deck.cards.push(anInterestingCard);
      deck.history.steps.push({
        extra: message["noOriginCards"],
        originCards: [],
        prioritiesInfo: [],
        totalAddedCards: [anInterestingCard]
      });
      stepPriorities = extractPriorities(deck);
      deckSize = getSize(deck.cards);
      executionNumber++;
      continue;
    }

    if (
      !addedArchetypePriorities &&
      (stepPriorities.length <= 0 || deckSize >= 17)
    ) {
      // Analyze the deck and add the closest archetype's priorities.
      addedArchetypePriorities = true;
      deck.archetype = getClosestArchetype(deck, archetypes);
      stepPriorities = deck.archetype.priorities;
      customMessage = message.archetypeIn(deck.archetype.name);
    }
    if (stepPriorities.length <= 0 && addedArchetypePriorities) 
      stop = true;
    
    executionNumber++;
  } // end of while loop.

  // a fix for mutating state :D
  // * now have the state as props in App component so i don't need that.
  // deck.cards = resetToNoRandom(deck.cards);

  // 3. Complete the deck with total random cards if not full.
  deck = completeDeckRandomly(deck, availableCards);

  // 4. Some statistics.
  deck.totalDust = getTotalDust(deck);
  deck.score = getDeckScore(deck);
  deck.size = getSize(deck.cards);

  // 5. Sort by cost and then by name.
  deck.cards.sort(byCostAndName);

  return deck;
};

/**
 * This method finishes the deck randomly, from a pool
 * of "good" cards for the selected class. It doesn't 
 * check their priorities or deck wide filters.
 * @param {*} deck
 * @param {*} cardDb
 */
export const completeDeckRandomly = (deck, availableCards, isHighlander) => {
  let deckLength = getSize(deck.cards);
  availableCards = removeSubset(availableCards, deck.cards);

  while (deckLength < 30 && availableCards.length > 0) {
    let cardToPut = getBestCard(availableCards);
    removeArrayElement(availableCards, cardToPut);
    const legOrHighOr29 =
      cardToPut.rarity === "LEGENDARY" ||
      deckLength === 29 ||
      isHighlander === true;
    cardToPut = {
      ...cardToPut,
      quantity: legOrHighOr29 ? 1 : 2,
      isRandom: true,
      isFrom: "Random"
    };
    deck.cards.push(cardToPut);
    deckLength = legOrHighOr29 ? ++deckLength : deckLength +=2 
  }
  return deck;
};

// Step scope.
export const completeDeckByPriorities = (deck, availableCards, priorities, isHighlander) => {
  let currentStep = getLastStep(deck);
  if (!currentStep.originCards && deck.cards.length > 0 && !currentStep.otherCards) {
    currentStep.originCards = deck.history.steps[deck.history.steps.length - 2].totalAddedCards;
    currentStep.totalAddedCards = [];
    currentStep.prioritiesInfo = getInfoFromPriorities(priorities);
  }

  // 2. For each priority...
  for (let p of priorities) {
    let currentPriorityInfo 
      = currentStep.prioritiesInfo.find(i => i.priority === p);

    // Just make an entry for checking if we reviewed that priority
    // (extract priorities method does that), do not add more info.
    deck.history.totalPrioritiesExamined[p.id] = p;

    const deckSize = getSize(deck.cards);
    if (deckSize >= 30) {
      currentPriorityInfo.extra = `The deck is full. Any remaining priorities will not be processed.`;
      break;
    }
    // I'am putting it in a variable because i use it 2 times.
    const dSatsPrty = deckSatisfiesPriority(deck, p);
    if (deckSize < 30 && dSatsPrty !== true) 
      deck = addCardsByPriority(availableCards, deck, p, dSatsPrty, isHighlander);
     else 
      currentPriorityInfo.extra = `We won't add cards for this priority because the deck over-satisfies it.`;
  }
  return deck;
};

// Each priority inside the step scope.
export const addCardsByPriority = (availableCards, deck, priority, priorityCardsAlreadyIn, isHighlander) => {
  let currentStep = getLastStep(deck);
  let currentPriorityInfo
    = currentStep.prioritiesInfo.find(i => i.priority === priority);

  // 1. Get the cards for the selected priority. If we don't have
  //    cards for that priority return the deck and exit.
  let priorityCards = getCardsForFilters(availableCards, priority.filters);
  if (priorityCards.length === 0) {
    currentPriorityInfo.extra = "We don't have cards for this priority.";
    return deck;
  }

  // 2. Find the free slots in the deck. Based on these and the
  //    priority min and max cards find out how many card we will
  //    put in the deck (cardsToPut variable).
  const freeSlots = 30 - getSize(deck.cards);
  let minCards = priority.minCards - priorityCardsAlreadyIn;
  if (minCards < 0) 
    minCards = 0;
  
  const maxCards = priority.maxCards - priorityCardsAlreadyIn;
  let cardsToPut;
  let cardsByPriority = [];
  if (freeSlots < minCards)
    cardsToPut = freeSlots;
  else if (freeSlots < maxCards)
    cardsToPut = getRandom(minCards, freeSlots);
  else
    cardsToPut = getRandom(minCards, maxCards); 

  // cardsToPut =
  //   freeSlots < minCards
  //     ? cardsToPut = freeSlots
  //     : freeSlots < maxCards
  //       ? cardsToPut = getRandom(minCards, freeSlots)
  //       : cardsToPut = getRandom(minCards, maxCards) 

  // 4. We add cards while cards to put is 1 or greater and
  //    the database contains cards that satisfy the priority.
  //    For each successful addition we reduce cardsToPut and
  //    priorityCards.
  const availableCardsNumber = priorityCards.length;
  while (cardsToPut > 0 && priorityCards.length > 0) {
    let cardToPut = getBestCard(priorityCards);
    removeArrayElement(priorityCards, cardToPut);
    if (cardExists(deck.cards, cardToPut)) 
      continue;
    if (cardsToPut < 2 || cardToPut.rarity === "LEGENDARY" || isHighlander === true) {
      cardToPut.quantity = 1;
      cardsToPut--;
    } else {
      cardToPut.quantity = 2;
      cardsToPut -= 2;
    }
    cardsByPriority.push(cardToPut);
  }

  deck.cards = deck.cards.concat(cardsByPriority);

  if (cardsByPriority.length === 0) 
    currentPriorityInfo.extra 
      = `We have in the deck ${priorityCardsAlreadyIn} cards that meet those 
      requirements and we decided to put ${cardsToPut} cards from a pool of 
      ${availableCardsNumber} different cards.`;
   else 
    currentPriorityInfo.extra 
      = `We chose ${getSize(cardsByPriority)} card(s) in total from a pool of 
      ${availableCardsNumber} different card(s). In the deck we had 
      ${priorityCardsAlreadyIn} cards that met those requirements.`;

  currentPriorityInfo.priorityAddedCards = cardsByPriority;
  currentStep.totalAddedCards 
    = currentStep.totalAddedCards.concat(cardsByPriority);

  return deck;
};

/**
 * This method takes as input the deck and the available archetypes
 * and returns which archetype better represents the deck. This is
 * determined by the total number of cards that satisfy each archetype
 * priority. 
 * @param {*} deck
 * @param {*} archetypes
 */
export const getClosestArchetype = (deck, archetypes) => {
  let archetypeStats = archetypes.map(archetype => toStats(archetype, deck));
        
  const max = archetypeStats.reduce(computeMaxCount, 0);

  if (max === 0)
    return archetypes[getRandom(0, archetypes.length - 1)];
  
  const mostSatisfiedArchetypes = archetypeStats.filter(stat => stat.cardCount === max);
  if(mostSatisfiedArchetypes.length > 1)
    return mostSatisfiedArchetypes[getRandom(0, mostSatisfiedArchetypes.length - 1)].archetype;
  return mostSatisfiedArchetypes[0].archetype;
};

const toStats = (archetype, deck) => ({
  archetype: archetype,
  cardCount:  
    archetype.priorities
      .map(priority => toCardCount(priority, deck))
      .reduce((totalCount, count) => totalCount += count, 0)
});

export const toCardCount = (priority, deck) => {
    const cardCount = deckSatisfiesPriority(deck, priority);
    if(cardCount === true)
      return priority.maxCards;
    return cardCount;
};
  
export const computeMaxCount = partial(computeMax, "cardCount");

/**
 * This method checks if a deck satisfies a priority. If it does
 * returns true else returns how many cards the deck contains that satisfy
 * the priority. It is different from getCardsForFilters because it takes
 * into account the hero power.
 * @param {Object} deck
 * @param {Object} priority
 */
export const deckSatisfiesPriority = (deck, priority) => {
  let cardCount = getSize(getCardsForFilters(deck.cards, priority.filters));
  if (cardSatisfiesFilters(deck.heroPower, priority.filters)) 
    cardCount += 2;
  if (cardCount >= priority.maxCards) 
    return true;
  return cardCount;
};

/**
 * This method is used by the getDendrogramData method and by the History component.
 * It assumes that each card priority has a unique id.
 * @param {Object} deck 
 * @param {String} priorityId 
 */
export const getCardThatRequestedPriority = (deck, priorityId) => {
  return deck.cards
    .find(card => hasPriorities(card) && card.priorities.find(p => idEquals(p, priorityId)));
};

const idEquals = (priority, priorityId) => priority.id === priorityId;


/**
 * This method takes as input the deck and returns an array of priorities extracted
 * from the deck's cards. It does not return priorities that have already been examined.
 * @param {Object} deck
 */
export const extractPriorities = deck =>
  deck.cards
    .filter(hasPriorities)
    .reduce(toPriorities, [])
    .filter(priority => !isPriorityExamined(deck, priority));

const toPriorities = (priorities, card) => priorities.concat(card.priorities);
const isPriorityExamined = (deck, priority) => deck.history.totalPrioritiesExamined[priority.id];

export const extractDeckWideFilters = deck => 
  deck.cards
    .filter(hasDeckWideFilters)
    .reduce(toDeckWideFilters, [])
    .filter(filter => !isFilterExamined(deck, filter));

const toDeckWideFilters = (filters, card) => filters.concat(card.deckFilters);
const isFilterExamined = (deck, filter) => {
  if (!deck.history.totalDeckFiltersExamined[filter.id]) {
    deck.history.totalDeckFiltersExamined[filter.id] = filter;
    return false;
  }
  return true;
}

/**
 * This is a helper method that transforms an array of priorities to
 * an array of info for those priorities. The info contain an initial
 * state where later on we change it.
 * @param {Array} priorities
 */
export const getInfoFromPriorities = priorities => priorities.map(toInfo);

const toInfo = priority => ({priority: priority, priorityAddedCards: [], extra: "Priority not processed"});

export const addOtherCards = (deck, deckSize, currentStep, otherCards) => {
  let addedOtherCards = [];
  currentStep.extra += " You also selected some cards without priorities.";
  currentStep.otherCards = true; 
  let i = 0;
  while (deckSize < 29 && i < otherCards.length) {
    let card = otherCards[i];
    card.quantity = deckSize === 28 || card.rarity === "LEGENDARY" ? 1 : 2;
    deck.cards.push(card);
    addedOtherCards.push(card);
    deckSize += card.quantity;
    i++;
  }
  return addedOtherCards;
};

// D3 dendrogram data extraction.

export const getDendrogramData = deck => {
  let returnArray 
    = deck.history.steps
        .reduce((array, step) => {
          if (step.prioritiesInfo.length > 0) {
            let arrayPart = step.prioritiesInfo.reduce((piarray, pi) => {
              // the priority info's
              let object = {};
              if (pi.priorityAddedCards.length > 0)
                object.children
                  = pi.priorityAddedCards.map(c => `${c.name} (${c.quantity})`);
              else
                object.children = [];

              let originCard = getCardThatRequestedPriority(deck, pi.priority.id);
              if (originCard === undefined)
                object.name = `${deck.archetype.name} archetype`;
              else
                object.name = `${originCard.name} (${originCard.quantity})`;
              piarray.push(object);
              return piarray;
            }, []);
            array = array.concat(arrayPart);
          }
          return array;
        }, [])
        .reduce((array, i) => {
          let existingItem = array.find(ai => ai.name === i.name);
          if (existingItem === undefined)
            array.push(i);
          else
            existingItem.children = existingItem.children.concat(i.children);
          return array;
        }, []);
  let node = getParentNode(returnArray);
  node = makeTreeObject(returnArray, node);
  return node;
};

export const makeTreeObject = (array, parentNode) => {
  let toAppend = [];
  parentNode.children.forEach(c => {
    let hasChildren = array.find(i => i.name === c);
    if (hasChildren)
      toAppend.push(makeTreeObject(array, hasChildren));
    else
      toAppend.push({ name: c });
  });
  parentNode.children = toAppend;
  return parentNode;
};

export const getParentNode = array => {
  let node = {
    name: "start",
    children: []
  };

  let childrenArray = [];
  array.forEach(i => (childrenArray = childrenArray.concat(i.children)));

  array.forEach(i => {
    if (childrenArray.indexOf(i.name) === -1) 
      node.children.push(i.name);
  });
  return node;
};
