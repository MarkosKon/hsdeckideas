import { encode } from "deckstrings";
import { getRandom } from "./random";
import { removeArrayElement } from "./removeArrayElement";

/**
 * A.
 * This function returns the mana curve for a deck. The mana curve is a simple
 * array of numbers that is used in a chart.
 * @param {*} deck
 */
export const getManaCurve = deck => {
  const iResult = deck.cards.reduce((stats, card) => {
    if (stats.hasOwnProperty(card.cost)) {
      stats[card.cost] = stats[card.cost] + 1 * card.quantity;
    } else {
      stats[card.cost] = 1 * card.quantity;
    }
    return stats;
  }, {});
  const result = [];
  for (let i = 0; i < 26; i++) {
    if (iResult.hasOwnProperty(i)) {
      if (i > 7) {
        result[7] += iResult[i];
      } else {
        result[i] = iResult[i];
      }
    } else {
      result[i] = 0;
    }
  }
  return result;
};

/**
 * B.
 * This function gets a deck, the heroCode and the format and
 * returns the deck code by using the deckstrings library.
 */
export const getDeckCode = (deck, heroCode, format) => {
  let deckForCode = {
    cards: deck.cards.map(card => [card.dbfId, card.quantity]),
    heroes: [heroCode],
    format: format === "Standard" ? 2 : 1
  };
  return encode(deckForCode);
};

/**
 * C.
 * This function returns a deck, mainly for the Overview component.
 * This is the main public function of the class. The other functions
 * are used as private methods.
 * @param {*} cardDb
 * @param {*} cardsBefore
 * @param {*} format
 * @param {*} heroName
 * @param {*} archetype
 */
export const getDeck = (cardDb, cardsBefore, format, heroName, archetype) => {
  // 1. Construct an initial deck object with the cards that come from the
  //    selected archetype, theme and flavor.
  let deck = {
    cards: cardsBefore,
    hero: heroName,
    totalDust: 0
  };

  // A stupid workaround for mutating cards state (we add isRandom, isSuperRandom, quantity).
  deck.cards.forEach(c => {
    if (c.isRandom && c.isRandom === true) {
      c.isRandom = false;
    }
    if (c.isSuperRandom && c.isSuperRandom === true) {
      c.isSuperRandom = false;
    }
  });

  // 2. Complete the deck based on the selected archetype.
  deck = completeDeckByPriorities(deck, cardDb, archetype, format);

  // 3. If the deck is still incomplete complete the deck with
  //    completely random good cards.
  const deckSize = getDeckSize(deck.cards);
  if (deckSize < 30) {
    deck = completeDeckRandomly(deck, cardDb, format);
  }

  // 4. Add the total dust and the score to the deck object.
  deck.totalDust = getTotalDust(deck);
  deck.score = getDeckScore(deck);

  // 5. Sort the cards inside the deck.
  deck.cards.sort((a, b) => {
    if (a.cost > b.cost) {
      return 1;
    } else if (a.cost < b.cost) {
      return -1;
    }

    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    } else {
      return 0;
    }
  });

  return deck;
};

/**
 * This method finishes the deck completely randomly, from a pool
 * of "good" cards for the selected class.
 * @param {*} deck
 * @param {*} cardDb
 * @param {*} format
 */
const completeDeckRandomly = (deck, cardDb, format) => {
  // 1. Find how many cards are in the deck.
  let deckLenght = getDeckSize(deck.cards);

  // 2. Find the available cards for the selected hero
  const availableCards = getAvailableCardsForClass(deck, cardDb, format, 0);

  let randomCards = [];
  // 3. Populate the deck.
  while (deckLenght < 30) {
    const cardToPut = getBestCard(availableCards);
    // console.log("---------- the best card i chose: ", cardToPut);
    const legOr29 = cardToPut.rarity === "LEGENDARY" || deckLenght === 29;
    if (!cardExists(deck.cards, cardToPut)) {
      cardToPut.quantity = legOr29 ? 1 : 2;
      cardToPut.isSuperRandom = true;
      cardToPut.isRandom = false;
      cardToPut.isFrom = "Random";
      deck.cards.push(cardToPut);
      randomCards.push(cardToPut);
    } else {
      continue;
    }
    if (legOr29) {
      deckLenght++;
    } else {
      deckLenght += 2;
    }
  }

  // console.log("Cards added randomly: ", randomCards);
  return deck;
};

/**
 * This method completes the deck base on the archetype priorities object.
 * @param {*} deck
 * @param {*} cardDb
 * @param {*} archetype
 * @param {*} format
 */
const completeDeckByPriorities = (deck, cardDb, archetype, format) => {
  // 1. Find the available cards for the selected hero
  const availableCards = getAvailableCardsForClass(deck, cardDb, format, 0);
  // let counter = 1;
  // console.log(`Deck archetype: ${archetype.name}`);
  for (let p of archetype.priorities) {
    // console.log(
    //   `${counter}) Priority:
    //     card type:   ${p.cardType}
    //     ${p.cardTypeExtra ? `card extra: ${p.cardTypeExtra} ${p.cardCost ? ` +++ cost: ${p.cardCost.operation} ${p.cardCost.value}` : ""}` : `cost: ${p.cardCost.operation} ${p.cardCost.value}`}
    //     min-max:     [${p.minCards}-${p.maxCards}]`
    // );
    const deckSize = getDeckSize(deck.cards);
    // console.log("The deck size right now is ", deckSize);
    if (deckSize >= 30) {
      // console.log("Deck is full. Breaking from loop.");
      break;
    }
    // I'am putting it in a variable because i use it 2 times.
    const dSatsPrty = deckSatisfiesPriority(deck, p);
    if (deckSize < 30 && dSatsPrty !== true) {
      deck = addCardsByPriority(availableCards, deck, p, dSatsPrty);
    }
    // counter++;
  }
  return deck;
};

/**
 * This function gets a deck, a card array and the selected format
 * and returns an array of cards that are available to the selected
 * class. The cards are obviously filtered by the selected format.
 * Those cards are also considered "good" cards.
 * @param {*} deck
 * @param {*} cardDb
 * @param {*} format
 */
const getAvailableCardsForClass = (deck, cardDb, format, minRating) => {
  const expansionLimit = format === "Standard" ? 5 : 0;
  return cardDb.filter(card => {
    if (
      (card.cardClass.includes("NEUTRAL") ||
        card.cardClass.includes(deck.hero.toUpperCase())) &&
      card.rating >= minRating &&
      card.set >= expansionLimit
    ) {
      return card;
    }
    return null;
  });
};

/**
 * This method checks if a deck satisfies an archetype priority. If it does
 * returns true else returns how many cards the deck contains that satisfy
 * the priority.
 * @param {*} deck
 * @param {*} priority
 */
const deckSatisfiesPriority = (deck, priority) => {
  let deckPriorityCards = getDeckSize(
    getCardsForPriority(deck.cards, priority)
  );
  // console.log(
  //   "\tIn the deck: ",
  //   deckPriorityCards,
  //   getCardsForPriority(deck.cards, priority)
  // );
  if (deckPriorityCards >= priority.maxCards) {
    // console.log("\tThe deck OVER-SATIFIES this priority.");
    return true;
  } else if (deckPriorityCards >= priority.minCards) {
    // console.log("\t-----------The deck SATIFIES this priority, but we MAY put more cards.");
  }
  return deckPriorityCards;
};

/**
 *
 * @param {*} cardDb
 * @param {*} deck
 * @param {*} priority
 * @param {*} priorityCardsAlreadyIn
 */
const addCardsByPriority = (cardDb, deck, priority, priorityCardsAlreadyIn) => {
  // 1. Get the cards for the selected priority. If we don't have
  //    cards for that priority return the deck and exit.
  let priorityCards = getCardsForPriority(cardDb, priority);
  // console.log("\tIn the db. ", priorityCards);
  if (priorityCards.length === 0) {
    // console.log("\tDON'T HAVE CARDS for this priority.", priorityCards);
    return deck;
  }

  // 2. Find the free slots in the deck. Based on these and the
  //    priority min and max cards find out how many card we will
  //    put in the deck (cardsToPut variable).
  const freeSlots = 30 - getDeckSize(deck.cards);
  let minCards = priority.minCards - priorityCardsAlreadyIn;
  if (minCards < 0) {
    minCards = 0;
  }
  const maxCards = priority.maxCards - priorityCardsAlreadyIn;
  let cardsToPut;
  let cardsByPriority = [];
  if (freeSlots < minCards) {
    cardsToPut = freeSlots;
  } else if (freeSlots < maxCards) {
    cardsToPut = getRandom(minCards, freeSlots);
  } else {
    cardsToPut = getRandom(minCards, maxCards);
  }
  // console.log(cardsToPut);

  // 4. We add cards while cards to put is 1 or greater and
  //    the database contains cards that satisfy the priority.
  //    For each successful addition we reduce cardsToPut and
  //    priorityCards.
  while (cardsToPut > 0 && priorityCards.length > 0) {
    let cardToPut = getBestCard(priorityCards);
    // console.log("---------- the best card i chose: ", cardToPut);
    removeArrayElement(priorityCards, cardToPut);
    if (!cardExists(deck.cards, cardToPut)) {
      cardToPut.isRandom = true;
      cardToPut.isSuperRandom = false;
      cardToPut.isFrom = priority.id;
    } else {
      continue;
    }
    if (cardsToPut < 2 || cardToPut.rarity === "LEGENDARY") {
      cardToPut.quantity = 1;
      cardsToPut--;
    } else {
      cardToPut.quantity = 2;
      cardsToPut -= 2;
    }
    cardsByPriority.push(cardToPut);
  }
  // console.log("\tCards ADDED: ", cardsByPriority);
  deck.cards = deck.cards.concat(cardsByPriority);
  return deck;
};

/**
 * This method gets a card array and an archetype priority and returns
 * the cards that satisfy the priority.
 * @param {*} cards
 * @param {*} priority
 */
export const getCardsForPriority = (cards, priority) => {
  return cards.filter(
    card =>
      priority.cardType.includes(card.type) && // 1.
      (priority.cardTypeExtra // 2. IF
        ? card.extra &&
          card.extra.includes(priority.cardTypeExtra) &&
          (priority.cardCost ? evaluateCardCost(priority.cardCost, card) : true)
        : priority.cardCost && evaluateCardCost(priority.cardCost, card)) // 2. ELSE
  );
};

/**
 * This method checks if a card exists in a card array. If does returns
 * the card. The possibility of adding a card once e.g. Loot hoarder for card draw
 * and then wanting to add loot hoarder again as a 2 drop or as a random good card is not covered here.
 * The possibility anyway is really small, it doesn't matter.
 * @param {*} cards
 * @param {*} card
 */
const cardExists = (cards, card) => {
  return cards.find(c => c.name === card.name);
};

const evaluateCardCost = (priorityCost, card) => {
  if (priorityCost.operation === "EQUALS") {
    return card.cost === priorityCost.value;
  } else if (priorityCost.operation === "GREATER_THAN") {
    return card.cost > priorityCost.value;
  }
};

/**
 * This method returns size of a deck.
 * @param {*} deck
 */
const getDeckSize = cards => {
  return cards.reduce((initial, card) => initial + card.quantity, 0);
};

/**
 * This method returns the total dust number of a deck.
 * @param {*} deck
 */
const getTotalDust = deck => {
  return deck.cards.reduce((cp, cc) => {
    switch (cc.rarity) {
      case "COMMON":
        cp += 40 * cc.quantity;
        break;
      case "RARE":
        cp += 100 * cc.quantity;
        break;
      case "EPIC":
        cp += 400 * cc.quantity;
        break;
      case "LEGENDARY":
        cp += 1600;
        break;
      default:
        break;
    }
    return cp;
  }, 0);
};

const getDeckScore = deck => {
  return deck.cards.reduce((cp, cc) => (cp += cc.rating * cc.quantity), 0);
};

const getBestCard = cards => {
  const firstBestCard = cards[0];
  const bestCards = cards.filter(c => c.rating === firstBestCard.rating);
  // console.log("----------the best cards: ", bestCards);
  return bestCards[getRandom(0, bestCards.length - 1)];
};
