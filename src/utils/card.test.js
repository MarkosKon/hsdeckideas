import {
  getSize,
  getBestCard,
  chooseInterestingCard,
  cardExists,
  getAvailableCards,
  initializeQuantity,
} from './card';
import { versionsToPriorities } from './deck';

// Data init.
const data = require('../../public/resources/data/data.json');

const cards = data[0].content;

const resetToNoRandom = (inputCards) => {
  inputCards.forEach((card) => {
    // eslint-disable-next-line no-param-reassign
    card.isRandom = false;
  });
  return inputCards;
};

// getSize tests.
it('getSize test #1: Checks if returns the expected deck size', () => {
  const deck = {
    cards: [
      { quantity: 2 },
      { quantity: 1 },
      { quantity: 1 },
      { quantity: 2 },
      { quantity: 2 },
      { quantity: 2 },
      { quantity: 2 },
      { quantity: 1 },
    ],
  };
  const result = getSize(deck.cards);
  expect(result).toEqual(13);
});

it('getSize test #2: Checks if returns the expected deck size', () => {
  const deck = {
    cards: [
      { quantity: 1 },
      { quantity: 2 },
      { quantity: 3 },
      { quantity: 4 },
      { quantity: 4 },
      { quantity: 3 },
      { quantity: 2 },
      { quantity: 1 },
    ],
  };
  const result = getSize(deck.cards);
  expect(result).toEqual(20);
});

it('getSize test #3: Checks if returns 0 for deck with no cards', () => {
  const deck = {
    cards: [],
  };
  const result = getSize(deck.cards);
  expect(result).toEqual(0);
});

it('getSize test #4: Checks if returns undefined for deck with cards property', () => {
  const deck = {};
  const result = getSize(deck.cards);
  expect(result).toEqual(undefined);
});

it('getSize test #5: Checks if returns NaN for deck with a card with NaN value in quantity', () => {
  const deck = {
    cards: [{ quantity: 1 }, { quantity: NaN }, { quantity: 3 }],
  };
  const result = getSize(deck.cards);
  expect(result).toEqual(NaN);
});

it('getSize test #6: Checks if returns NaN for deck with a card with no quantity property', () => {
  const deck = {
    cards: [{ quantity: 1 }, {}, { quantity: 3 }],
  };
  const result = getSize(deck.cards);
  expect(result).toEqual(NaN);
});

// chooseInterestingCard tests.
it('chooseInterestingCard test #1: Checks if returns a not null interesting card', () => {
  const deckCards = [];
  const result = chooseInterestingCard(cards, deckCards);
  expect(result).not.toBeNull();
});

it('chooseInterestingCard test #2: Checks if returns a not undefined interesting card', () => {
  const deckCards = [];
  const result = chooseInterestingCard(cards, deckCards);
  expect(result).not.toBeUndefined();
});

it('chooseInterestingCard test #3: Checks if picks an interesting card that already exists in the deck.', () => {
  // interesting cards.
  const countessAshmore = cards.find(c => c.name === 'Countess Ashmore');
  const fungalmancer = cards.find(c => c.name === 'Fungalmancer');
  // non interesting cards.
  const abomination = cards.find(c => c.name === 'Abomination');
  const chillwindYeti = cards.find(c => c.name === 'Chillwind Yeti');

  const availableCards = [countessAshmore, fungalmancer, abomination, chillwindYeti];
  const deckCards = [fungalmancer, abomination, chillwindYeti];

  const result = chooseInterestingCard(availableCards, deckCards);
  expect(result).toEqual(countessAshmore);
});

it('chooseInterestingCard test #4: Checks if picks an interesting card that already exists in the deck and is the only option.', () => {
  // interesting cards.
  const fungalmancer = cards.find(c => c.name === 'Fungalmancer');
  // non interesting cards.
  const abomination = cards.find(c => c.name === 'Abomination');
  const chillwindYeti = cards.find(c => c.name === 'Chillwind Yeti');

  const availableCards = [fungalmancer, abomination, chillwindYeti];
  const deckCards = availableCards;

  const result = chooseInterestingCard(availableCards, deckCards);
  expect(result).toEqual(undefined);
});

it('chooseInterestingCard test #5: Checks if returns undefined if there are no interesting cards', () => {
  const availableCards = [];
  const deckCards = [];
  const result = chooseInterestingCard(availableCards, deckCards);
  expect(result).toEqual(undefined);
});

// getBestCard tests
it('getBestCard test #1: Checks if returns a rating 4 card from the whole card db.', () => {
  const result = getBestCard(cards);
  expect(result.rating).toEqual(4);
});

it('getBestCard test #2: Checks if returns undefined from an empty card collection', () => {
  const result = getBestCard([]);
  expect(result).toEqual(undefined);
});

it('getBestCard test #3: Checks if returns the highest rated card', () => {
  const cardSet = [
    { rating: 3 },
    { rating: -1 },
    { rating: 2 },
    { rating: 4 },
    { rating: 4 },
    { rating: 1 },
  ];
  const result = getBestCard(cardSet);
  expect(result).toEqual({ rating: 4 });
});

it('getBestCard test #4: Checks if returns the highest rated card', () => {
  const cardSet = [
    { rating: 3 },
    { rating: -1 },
    { rating: 2 },
    { rating: 4 },
    { rating: '1' },
    { rating: 5 },
  ];
  const result = getBestCard(cardSet);
  expect(result).toEqual({ rating: 5 });
});

it('getBestCard test #5: Checks if returns the highest rated card', () => {
  const cardSet = [{ rating: 3 }];
  const result = getBestCard(cardSet);
  expect(result).toEqual({ rating: 3 });
});

it('getBestCard test #6: Checks if returns one of the highest rated cards', () => {
  const cardSet = [
    { rating: 3 },
    { rating: 1 },
    { rating: 2 },
    { rating: 4, name: 'Card 1' },
    { rating: 4, name: 'Card 2' },
    { rating: 1 },
  ];
  const result = getBestCard(cardSet);
  expect(result.name).not.toBeFalsy();
});

// resetToNoRandom tests.
it('resetToNoRandom test #1: Checks if resets the random property of the cards to false.', () => {
  const cardSet = [
    { isRandom: true },
    { isRandom: true },
    { isRandom: true },
    { isRandom: true },
    { isRandom: true },
    { isRandom: true },
  ];
  const result = resetToNoRandom(cardSet).find(c => c.isRandom === true);
  expect(result).toEqual(undefined);
});

it('resetToNoRandom test #2: Checks if resets the random property of the cards to false.', () => {
  const cardSet = [
    { isRandom: false },
    { isRandom: true },
    { isRandom: false },
    { isRandom: true },
    { isRandom: false },
    { isRandom: false },
  ];
  const result = resetToNoRandom(cardSet).find(c => c.isRandom === true);
  expect(result).toEqual(undefined);
});

it('resetToNoRandom test #3: Checks if resets the random property of the cards to false without problems even if the property does not exist.', () => {
  const cardSet = [
    { isRandom: true },
    { isRandom: true },
    { name: 'I have no isRandom property.' },
    { isRandom: true },
    { isRandom: true },
    { name: 'Me too.' },
  ];
  const result = resetToNoRandom(cardSet).find(c => c.isRandom === true);
  expect(result).toEqual(undefined);
});

it("resetToNoRandom test #4: Checks if resets the isRandom property to false even to those cards that don't initially have it.", () => {
  const cardSet = [
    { isRandom: true },
    { isRandom: true },
    { name: 'I have no isRandom property.' },
    { isRandom: true },
    { isRandom: true },
    { name: 'Me too.' },
  ];
  const result = resetToNoRandom(cardSet).filter(c => c.isRandom === false);
  expect(result.length).toEqual(6);
});

// initializeQuantity tests.
it('initializeQuantity test #1: Checks if resets the quantity property.', () => {
  const cardSet = [
    { quantity: 1, rarity: 'COMMON' },
    { quantity: 1, rarity: 'COMMON' },
    { quantity: 1, rarity: 'COMMON' },
    { quantity: 1, rarity: 'COMMON' },
    { quantity: 1, rarity: 'COMMON' },
    { quantity: 1, rarity: 'COMMON' },
  ];
  const result = initializeQuantity(cardSet).filter(c => c.quantity === 2);
  expect(result.length).toEqual(6);
});

it('initializeQuantity test #2: Checks if resets the quantity property if the deck is highlander.', () => {
  const cardSet = [
    { quantity: 2, rarity: 'DOESNT MATTER' },
    { quantity: 4, rarity: 'DOESNT MATTER' },
    { quantity: 2, rarity: 'DOESNT MATTER' },
    { quantity: 1, rarity: 'DOESNT MATTER' },
    { quantity: 1, rarity: 'DOESNT MATTER' },
    { quantity: 4, rarity: 'DOESNT MATTER' },
  ];
  const result = initializeQuantity(cardSet, { isHighlander: true }).filter(c => c.quantity === 1);
  expect(result.length).toEqual(6);
});

it('initializeQuantity test #3: Checks if resets the quantity property.', () => {
  const cardSet = [
    { quantity: 2, rarity: 'RARE' },
    { quantity: 4, rarity: 'RARE' },
    { quantity: 2, rarity: 'RARE' },
    { quantity: 1, rarity: 'RARE' },
    { quantity: 1, rarity: 'RARE' },
    { quantity: 4, rarity: 'RARE' },
  ];
  const result = initializeQuantity(cardSet, { isHighlander: false }).filter(c => c.quantity === 2);
  expect(result.length).toEqual(6);
});

// cardExists tests.
it('cardExists test #1: Checks if it finds a card in the collection.', () => {
  const abomination = cards.find(c => c.name === 'Abomination');
  const chillwindYeti = cards.find(c => c.name === 'Chillwind Yeti');
  const collection = [abomination, chillwindYeti];

  const result = cardExists(collection, abomination);
  expect(result).toEqual(true);
});

it("cardExists test #2: Checks if returns undefined when it doesn't find the card in the collection.", () => {
  const abomination = cards.find(c => c.name === 'Abomination');
  const chillwindYeti = cards.find(c => c.name === 'Chillwind Yeti');
  const fungalmancer = cards.find(c => c.name === 'Fungalmancer');
  const collection = [abomination, chillwindYeti];

  const result = cardExists(collection, fungalmancer);
  expect(result).toEqual(false);
});

// getAvailableCards tests.
it('getAvailableCards test #1: Checks if returns only interesting cards.', () => {
  const interestingCards = getAvailableCards(cards, 'Druid', 'Standard', true);

  const nonInterestingCard = interestingCards.find(
    c => !c.deckFilters && !c.versions.reduce(versionsToPriorities, []),
  );

  expect(nonInterestingCard).toEqual(undefined);
});

it('getAvailableCards test #2: Checks if returns only non interesting cards.', () => {
  const nonInterestingCards = getAvailableCards(cards, 'Hunter', 'Wild', false);

  const interestingCard = nonInterestingCards.find(c => c.deckFilters || c.versions);

  expect(interestingCard).toEqual(undefined);
});

it('getAvailableCards test #3: Checks if returns all the cards (static number for Paladin in Descent of Dragons).', () => {
  const allCards = getAvailableCards(cards, 'Paladin', 'Standard');

  expect(allCards.length).toEqual(508);
});

it('getAvailableCards test #4: Checks if returns all the cards for Priest for Wild format.', () => {
  const allCards = getAvailableCards(cards, 'Priest', 'Wild');

  const allCardsCheck = cards.filter(
    c => c.cardClass.includes('PRIEST') || c.cardClass.includes('NEUTRAL'),
  );

  expect(allCardsCheck.length).toEqual(allCards.length);
});

it('getAvailableCards test #5: Checks if returns only standard cards', () => {
  const standardCards = getAvailableCards(cards, 'Mage', 'Standard');
  const wildCards = standardCards.filter(c => c.set < 8);

  expect(wildCards).toEqual([]);
});

it('getAvailableCards test #6: Checks if returns cards applicable for Warlock', () => {
  const warlockCards = getAvailableCards(cards, 'Warlock', 'Standard');
  const nonWarlockCards = warlockCards.filter(
    c => !c.cardClass.includes('WARLOCK') && !c.cardClass.includes('NEUTRAL'),
  );

  expect(nonWarlockCards).toEqual([]);
});

it('getAvailableCards test #7: Checks if returns cards applicable for Warrior', () => {
  const warriorCards = getAvailableCards(cards, 'Warrior', 'Standard', true);
  const nonWarriorCards = warriorCards.filter(
    c => !c.cardClass.includes('WARRIOR') && !c.cardClass.includes('NEUTRAL'),
  );

  expect(nonWarriorCards).toEqual([]);
});

// getCardsForPriority tests.

// cardSatisfiesFilters tests.
