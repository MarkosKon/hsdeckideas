import {
  getTotalDust,
  getDeckScore,
  getDeck,
  hasDuplicates,
  completeDeckRandomly,
  getClosestArchetype,
  toCardCount,
  computeMaxCount,
  deckSatisfiesPriority,
  getCardThatRequestedPriority,
  obtainPriorities,
  obtainDeckWideFilters,
  getInfoFromPriorities,
  initializeDeck,
  initializeStep,
  addOtherCards,
  calculateHowManyCardsToPut,
  calculateCardQuantity,
  versionsToPriorities,
  getManaCurveChartData,
} from './deck';
import {
  getSize,
  getAvailableCards,
  isCardInteresting,
  findCardByName,
  initializeQuantity,
  findCardsByNames,
} from './card';

// Data init.
const data = require('../../public/resources/data/data.json');

const cards = data[0].content;
const archetypes = data[1].content;
const heroPowers = data[3].content;
const extraFilters = data[4].content;

// getManaCurve tests
it('getManaCurveChartData test #1: Checks if returns the expected mana curve for a deck.', () => {
  const deck = {
    cards: [
      { cost: 1, quantity: 4 },
      { cost: 2, quantity: 6 },
      { cost: 3, quantity: 4 },
      { cost: 4, quantity: 3 },
      { cost: 5, quantity: 3 },
      { cost: 6, quantity: 3 },
      { cost: 7, quantity: 2 },
      { cost: 8, quantity: 2 },
      { cost: 9, quantity: 1 },
      { cost: 10, quantity: 2 },
    ],
  };
  const result = getManaCurveChartData(deck);
  expect(result).toEqual([
    { manaCost: '0', cardCount: 0 },
    { manaCost: '1', cardCount: 4 },
    { manaCost: '2', cardCount: 6 },
    { manaCost: '3', cardCount: 4 },
    { manaCost: '4', cardCount: 3 },
    { manaCost: '5', cardCount: 3 },
    { manaCost: '6', cardCount: 3 },
    { manaCost: '7+', cardCount: 7 },
  ]);
});

it('getManaCurveChartData test #2: Checks if returns a mana curve of 0s for a deck with empty card array.', () => {
  const deck = {
    cards: [],
  };
  const result = getManaCurveChartData(deck);
  expect(result).toEqual([
    { manaCost: '0', cardCount: 0 },
    { manaCost: '1', cardCount: 0 },
    { manaCost: '2', cardCount: 0 },
    { manaCost: '3', cardCount: 0 },
    { manaCost: '4', cardCount: 0 },
    { manaCost: '5', cardCount: 0 },
    { manaCost: '6', cardCount: 0 },
    { manaCost: '7+', cardCount: 0 },
  ]);
});

it('getManaCurveChartData test #3: Checks if returns the expected mana curve for a deck.', () => {
  const deck = {
    cards: [
      { cost: 0, quantity: 1 },
      { cost: 1, quantity: 6 },
      { cost: 2, quantity: 6 },
      { cost: 3, quantity: 5 },
      { cost: 4, quantity: 4 },
      { cost: 5, quantity: 4 },
      { cost: 6, quantity: 2 },
      { cost: 10, quantity: 2 },
    ],
  };
  const result = getManaCurveChartData(deck);
  expect(result).toEqual([
    { manaCost: '0', cardCount: 1 },
    { manaCost: '1', cardCount: 6 },
    { manaCost: '2', cardCount: 6 },
    { manaCost: '3', cardCount: 5 },
    { manaCost: '4', cardCount: 4 },
    { manaCost: '5', cardCount: 4 },
    { manaCost: '6', cardCount: 2 },
    { manaCost: '7+', cardCount: 2 },
  ]);
});

it('getManaCurveChartData test #4: Checks if returns the expected mana curve for a deck with missing quantities.', () => {
  const deck = {
    cards: [
      { cost: 0, quantity: 1 },
      { cost: 1, quantity: 6 },
      { cost: 2, quantity: 6 },
      { cost: 3, quantity: 5 },
      { cost: 4 },
      { cost: 5, quantity: 4 },
      { cost: 6, quantity: 2 },
      { cost: 10, quantity: 2 },
    ],
  };
  const result = getManaCurveChartData(deck);
  expect(result).toEqual([
    { manaCost: '0', cardCount: 1 },
    { manaCost: '1', cardCount: 6 },
    { manaCost: '2', cardCount: 6 },
    { manaCost: '3', cardCount: 5 },
    { manaCost: '4', cardCount: NaN },
    { manaCost: '5', cardCount: 4 },
    { manaCost: '6', cardCount: 2 },
    { manaCost: '7+', cardCount: 2 },
  ]);
});

it('getManaCurveChartData test #5: Checks if returns the expected mana curve for a `real` deck.', () => {
  const deck = {
    cards: [
      { cost: 1, quantity: 2 },
      { cost: 1, quantity: 2 },
      { cost: 2, quantity: 2 },
      { cost: 2, quantity: 2 },
      { cost: 2, quantity: 1 },
      { cost: 2, quantity: 1 },
      { cost: 3, quantity: 2 },
      { cost: 3, quantity: 2 },
      { cost: 4, quantity: 2 },
      { cost: 4, quantity: 1 },
      { cost: 5, quantity: 1 },
      { cost: 5, quantity: 2 },
      { cost: 6, quantity: 2 },
      { cost: 6, quantity: 1 },
      { cost: 7, quantity: 2 },
      { cost: 8, quantity: 2 },
      { cost: 9, quantity: 1 },
      { cost: 10, quantity: 2 },
    ],
  };
  const result = getManaCurveChartData(deck);
  expect(result).toEqual([
    { manaCost: '0', cardCount: 0 },
    { manaCost: '1', cardCount: 4 },
    { manaCost: '2', cardCount: 6 },
    { manaCost: '3', cardCount: 4 },
    { manaCost: '4', cardCount: 3 },
    { manaCost: '5', cardCount: 3 },
    { manaCost: '6', cardCount: 3 },
    { manaCost: '7+', cardCount: 7 },
  ]);
});

it('getManaCurveChartData test #6: Checks if returns undefined for a deck with no cards property', () => {
  const deck = {};
  const result = getManaCurveChartData(deck);
  expect(result).toEqual(undefined);
});

// getTotalDust tests
it('getTotalDust test #1: Checks if returns the expected total dust for a deck.', () => {
  const deck = {
    cards: [
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'COMMON', quantity: 2 },
    ],
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(480);
});

it('getTotalDust test #2: Checks if returns the expected total dust for a deck.', () => {
  const deck = {
    cards: [
      { rarity: 'EPIC', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'LEGENDARY', quantity: 1 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'RARE', quantity: 2 },
      { rarity: 'COMMON', quantity: 2 },
    ],
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(320 + 200 + 400 + 1600);
});

it('getTotalDust test #3: Checks if returns the expected total dust for a deck with duplicate legendary.', () => {
  const deck = {
    cards: [
      { rarity: 'EPIC', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'LEGENDARY', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'RARE', quantity: 2 },
      { rarity: 'COMMON', quantity: 2 },
    ],
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(320 + 200 + 400 + 1600);
});

it("getTotalDust test #4: Checks if returns the expected total dust for a deck with a rarity that doesn't exist.", () => {
  const deck = {
    cards: [
      { rarity: 'EPIC', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'WRONG_RARITY', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'RARE', quantity: 2 },
      { rarity: 'COMMON', quantity: 2 },
    ],
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(320 + 200 + 400);
});

it("getTotalDust test #5: Checks if returns the expected total dust for a deck with cards that don't have rarity.", () => {
  const deck = {
    cards: [
      { rarity: 'EPIC', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'COMMON', quantity: 2 },
      { quantity: 2 },
      { rarity: 'COMMON', quantity: 1 },
      { rarity: 'RARE', quantity: 2 },
      { quantity: 2 },
    ],
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(240 + 200 + 400);
});

it('getTotalDust test #5: Checks if returns 0 for a deck with no cards', () => {
  const deck = {
    cards: [],
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(0);
});

// getDeckScore tests.
it('getDeckScore test #1: Checks if returns the expected score.', () => {
  const deck = {
    cards: [
      { rating: 1, quantity: 1 },
      { rating: 1, quantity: 2 },
      { rating: 2, quantity: 1 },
      { rating: 2, quantity: 2 },
      { rating: 4, quantity: 2 },
      { rating: 1, quantity: 2 },
      { rating: 3, quantity: 2 },
      { rating: 4, quantity: 2 },
    ],
  };
  const result = getDeckScore(deck);
  expect(result).toEqual(5 + 6 + 6 + 16);
});

it('getDeckScore test #2: Checks if returns the expected score.', () => {
  const deck = {
    cards: [
      { rating: 1, quantity: 1 },
      { rating: 0, quantity: 2 },
      { rating: 2, quantity: 1 },
      { rating: 2, quantity: 2 },
      { rating: 4, quantity: 2 },
      { rating: 1, quantity: 2 },
      { rating: 3, quantity: 2 },
      { rating: 4, quantity: 2 },
    ],
  };
  const result = getDeckScore(deck);
  expect(result).toEqual(3 + 6 + 6 + 16);
});

// initializeDeck tests.
it('initializeDeck test #1: Checks if initializes the deck correctly.', () => {
  const heroName = 'Paladin';
  const paladinHeroPower = heroPowers.find(hp => hp.name === 'Reinforce');
  const archetype = archetypes.find(a => a.name === 'Control');
  const result = initializeDeck({
    heroName,
    heroPower: paladinHeroPower,
    archetype,
  });

  expect(result).toEqual({
    cards: [],
    hero: heroName,
    heroPower: paladinHeroPower,
    archetype,
    totalDust: 0,
    score: 0,
    size: 0,
    isHighlander: false,
    history: {
      steps: [],
      totalPrioritiesExamined: {},
      totalDeckFiltersExamined: {},
    },
  });
});

// initializeStep tests.
it('initializeStep test #1: Checks if edits the step correctly', () => {
  const step = initializeStep([], { cards: [] });

  expect(step).toEqual({
    extra: 'In this step the priorities come from the origin card(s).',
    sizeBefore: 0,
    originCards: [],
    otherCards: [],
    totalAddedCards: [],
    deckWideFilters: [],
    priorities: [],
    prioritiesInfo: [],
  });
});

// getDeck tests.
it('getDeck test #1: Checks if returns a deck with 30 cards for Standard Druid.', () => {
  const heroName = 'Druid';
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');
  const format = 'Standard';
  const availableCards = getAvailableCards(cards, heroName, format);
  const deck = initializeDeck({
    heroName,
    heroPower: druidHeroPower,
    archetype: 'Random',
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
  });

  expect(getSize(result.cards)).toEqual(30);
});

// It fails.
// it(`getDeck test #2: Checks if returns a deck with 30 cards for
// Standard Hunter if the user selected all the interesting cards.`, () => {
//   const heroName = 'Hunter';
//   const druidHeroPower = heroPowers.find(hp => hp.name === 'Steady Shot');
//   const format = 'Standard';
//   const availableCards = getAvailableCards(cards, heroName, format);
//   const allInterestingCards = availableCards.filter(isCardInteresting);
//   console.log(allInterestingCards.length);

//   const result = getDeck(
//     cards,
//     heroName,
//     druidHeroPower,
//     format,
//     'Random',
//     archetypes,
//     allInterestingCards,
//     null,
//   );

//   expect(getSize(result.cards)).toEqual(30);
// });

it('getDeck test #3: Checks if returns a deck with 30 cards for Standard Hunter if the user selected all the non interesting cards.', () => {
  const heroName = 'Hunter';
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Steady Shot');
  const format = 'Standard';
  const availableCards = getAvailableCards(cards, heroName, format);
  const allOtherCards = availableCards.filter(c => !isCardInteresting(c));
  const deck = initializeDeck({
    heroName,
    heroPower: druidHeroPower,
    archetype: 'Random',
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
    otherCards: allOtherCards,
  });

  expect(getSize(result.cards)).toEqual(30);
});

it('getDeck test #4: Checks if the deck has duplicate cards.', () => {
  const heroName = 'Druid';
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');
  const format = 'Standard';
  const availableCards = getAvailableCards(cards, heroName, format);
  const deck = initializeDeck({
    heroName,
    heroPower: druidHeroPower,
    archetype: 'Random',
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
  });

  expect(hasDuplicates(result)).toEqual(false);
});

it('getDeck test #5: Checks if the deck has duplicate cards when the user selected some interesting cards.', () => {
  const heroName = 'Druid';
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');
  const format = 'Standard';
  const ui = cards.find(c => c.name === 'Ultimate Infestation');
  ui.quantity = 2;
  const nourish = cards.find(c => c.name === 'Nourish');
  nourish.quantity = 2;
  const availableCards = getAvailableCards(cards, heroName, format);
  const deck = initializeDeck({
    heroName,
    heroPower: druidHeroPower,
    archetype: 'Random',
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
    interestingCards: [ui, nourish],
  });

  expect(hasDuplicates(result)).toEqual(false);
});

it('getDeck test #6: Checks if the deck has duplicate cards when the user selected some non interesting cards.', () => {
  const heroName = 'Druid';
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');
  const format = 'Standard';
  const chargedDevilsaur = cards.find(c => c.name === 'Charged Devilsaur');
  chargedDevilsaur.quantity = 2;
  const malfurion = cards.find(c => c.name === 'Malfurion the Pestilent');
  malfurion.quantity = 1;
  const availableCards = getAvailableCards(cards, heroName, format);
  const deck = initializeDeck({
    heroName,
    heroPower: druidHeroPower,
    archetype: 'Random',
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
    otherCards: [chargedDevilsaur, malfurion],
  });

  expect(hasDuplicates(result)).toEqual(false);
});

it(`getDeck test #7: Checks if the deck has duplicate cards when the user selected some interesting
  and some non intereting cards.`, () => {
  const heroName = 'Druid';
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');
  const format = 'Standard';
  const livingMana = cards.find(c => c.name === 'Living Mana');
  livingMana.quantity = 2;
  const malfurion = cards.find(c => c.name === 'Malfurion the Pestilent');
  malfurion.quantity = 1;
  const availableCards = getAvailableCards(cards, heroName, format);
  const deck = initializeDeck({
    heroName,
    heroPower: druidHeroPower,
    archetype: 'Random',
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
    interestingCards: [livingMana],
    otherCards: [malfurion],
  });

  expect(hasDuplicates(result)).toEqual(false);
});

it(`getDeck test #8: Checks for a discovered bug related to state mutation. We used to assign
      the interesting cards to the deck.cards instead of concat and later on we changed the
      deck.cards(or interestingCards, i'm not sure) variable. As a result interesting cards was
      also assigned as the first step's origin cards. This particular card returns no cards for
      Priest (Priest has no suited weapons) and as a result it chooses another interesting and
      it seemed that the user had selected the new card also.`, () => {
  const heroName = 'Priest';
  const heroPower = heroPowers.find(hp => hp.name === 'Lesser Heal');
  const format = 'Standard';
  const phantomFreebooter = cards.find(c => c.name === 'Phantom Freebooter');
  phantomFreebooter.quantity = 2;
  const availableCards = getAvailableCards(cards, heroName, format);
  const deck = initializeDeck({
    heroName,
    heroPower,
    archetype: 'Random',
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
    interestingCards: [phantomFreebooter],
  });

  expect(result.history.steps[0].originCards.length).toEqual(1);
});

it('getDeck test #9: Checks if returns a deck with 30 cards if we have 1 extra deck wide filter', () => {
  const heroName = 'Warlock';
  const heroPower = heroPowers.find(hp => hp.name === 'Life Tap');
  const format = 'Standard';
  const availableCards = getAvailableCards(cards, heroName, format);
  const extraDeckWideFilters = extraFilters.find(filter => filter.name === 'Curse of Naxxramas');
  const deck = initializeDeck({
    heroName,
    heroPower,
    archetype: 'Random',
    isCompetitive: true,
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
    extraDeckWideFilters,
  });

  expect(getSize(result.cards)).toEqual(30);
});

it('getDeck test #10: Checks if returns a deck with 30 cards if we have multiple extra deck wide filter', () => {
  const heroName = 'Paladin';
  const heroPower = heroPowers.find(hp => hp.name === 'Reinforce');
  const format = 'Wild';
  const availableCards = getAvailableCards(cards, heroName, format);
  const expansionNames = ['Blackrock Mountain', 'The Grand Tournament'];
  const extraDeckWideFilters = extraFilters.filter(filter => expansionNames.includes(filter.name));
  const deck = initializeDeck({
    heroName,
    heroPower,
    archetype: 'Random',
    isCompetitive: true,
  });

  const result = getDeck({
    deck,
    availableCards,
    archetypes,
    extraDeckWideFilters,
  });

  expect(getSize(result.cards)).toEqual(30);
});

// hasDuplicates function and tests.
it('hasDuplicates test #1: Checks if works.', () => {
  const deck = {
    cards: [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'Four' }],
  };

  expect(hasDuplicates(deck)).toEqual(false);
});

it('hasDuplicates test #2: Checks if works.', () => {
  const deck = {
    cards: [{ name: 'One' }, { name: 'Two' }, { name: 'Two' }, { name: 'Three' }],
  };

  expect(hasDuplicates(deck)).toEqual(true);
});

it('hasDuplicates test #3: Checks if works.', () => {
  const deck = {
    cards: [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'One' }],
  };

  expect(hasDuplicates(deck)).toEqual(true);
});

it('hasDuplicates test #4: Checks if works.', () => {
  const deck = {
    cards: [{ name: '' }, { name: 'Two' }, { name: 'Three' }, { name: 'One' }],
  };

  expect(hasDuplicates(deck)).toEqual(false);
});

it('hasDuplicates test #5: Checks if works with capitalization.', () => {
  const deck = {
    cards: [{ name: 'One' }, { name: 'oNe' }, { name: 'Two' }, { name: 'Three' }],
  };

  expect(hasDuplicates(deck)).toEqual(false);
});

// completeDeckRandomly tests
it('completeDeckRandomly test #1: Checks if returns a deck with 30 cards.', () => {
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, cards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #2: Checks if returns a deck with 30 cards for Druid.', () => {
  const availableCards = getAvailableCards(cards, 'Druid', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #3: Checks if returns a deck with 30 cards for Hunter.', () => {
  const availableCards = getAvailableCards(cards, 'Hunter', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #4: Checks if returns a deck with 30 cards for Mage.', () => {
  const availableCards = getAvailableCards(cards, 'Mage', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #5: Checks if returns a deck with 30 cards for Paladin.', () => {
  const availableCards = getAvailableCards(cards, 'Paladin', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #6: Checks if returns a deck with 30 cards for Priest.', () => {
  const availableCards = getAvailableCards(cards, 'Priest', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #7: Checks if returns a deck with 30 cards for Rogue.', () => {
  const availableCards = getAvailableCards(cards, 'Rogue', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #8: Checks if returns a deck with 30 cards for Shaman.', () => {
  const availableCards = getAvailableCards(cards, 'Shaman', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #9: Checks if returns a deck with 30 cards for Warrior.', () => {
  const availableCards = getAvailableCards(cards, 'Warrior', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #10: Checks if returns a deck with 30 cards for Warlock.', () => {
  const availableCards = getAvailableCards(cards, 'Warlock', 'Standard');
  const deck = {
    cards: [],
    size: 0,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it('completeDeckRandomly test #11: Checks if returns a deck with duplicates', () => {
  const ui = cards.find(c => c.name === 'Ultimate Infestation');
  ui.quantity = 2;
  const nourish = cards.find(c => c.name === 'Nourish');
  nourish.quantity = 2;
  const availableCards = getAvailableCards(cards, 'Druid', 'Standard');
  const deck = {
    cards: [ui, nourish],
    size: 4,
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(hasDuplicates(result)).toEqual(false);
});

// completeDeckByPriorities tests.
// TODO

// addCardsForPriority tests.
// TODO

// calculateHowManyCardsToPut tests.
it('calculateHowManyCardsToPut test #1: Deck at 10 cards, priority cards in deck at the minimum value.', () => {
  const priority = {
    minCards: 4,
    maxCards: 7,
  };
  const result = calculateHowManyCardsToPut(10, 4, priority);
  expect(result).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThan(4);
});

it('calculateHowManyCardsToPut test #2: Deck at 10 cards, priority cards in deck more than the max value.', () => {
  const priority = {
    minCards: 2,
    maxCards: 4,
  };
  const result = calculateHowManyCardsToPut(10, 4, priority);
  expect(result).toEqual(0);
});

it('calculateHowManyCardsToPut test #3: Deck at 10 cards, priority cards in deck between min and max.', () => {
  const priority = {
    minCards: 3,
    maxCards: 5,
  };
  const result = calculateHowManyCardsToPut(10, 4, priority);
  expect(result).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThan(2);
});

it('calculateHowManyCardsToPut test #4: Deck will be full after, priority cards exact.', () => {
  const priority = {
    minCards: 1,
    maxCards: 1,
  };
  const result = calculateHowManyCardsToPut(29, 0, priority);
  expect(result).toEqual(1);
});

it('calculateHowManyCardsToPut test #5: Deck will be full after, priority cards more.', () => {
  const priority = {
    minCards: 3,
    maxCards: 5,
  };
  const result = calculateHowManyCardsToPut(29, 0, priority);
  expect(result).toEqual(1);
});

// calculateCardQuantity tests.
it('calculateCardQuantity test #1: ', () => {
  const deck = {
    size: 0,
    isHighlander: false,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card);
  expect(result).toEqual(2);
});

it('calculateCardQuantity test #2: ', () => {
  const deck = {
    size: 0,
    isHighlander: true,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card);
  expect(result).toEqual(1);
});

it('calculateCardQuantity test #3: ', () => {
  const deck = {
    size: 0,
    isHighlander: false,
  };
  const card = { rarity: 'LEGENDARY' };
  const result = calculateCardQuantity(deck, card);
  expect(result).toEqual(1);
});

it('calculateCardQuantity test #4: ', () => {
  const deck = {
    size: 29,
    isHighlander: false,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card);
  expect(result).toEqual(1);
});

it('calculateCardQuantity test #5: ', () => {
  const deck = {
    size: 0,
    isHighlander: false,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card, 2 > 1);
  expect(result).toEqual(1);
});

it('calculateCardQuantity test #6: ', () => {
  const deck = {
    size: 0,
    isHighlander: true,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card, false);
  expect(result).toEqual(1);
});

it('calculateCardQuantity test #7: ', () => {
  const deck = {
    size: 0,
    isHighlander: false,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card, true);
  expect(result).toEqual(1);
});

it('calculateCardQuantity test #8: ', () => {
  const deck = {
    size: 28,
    isHighlander: false,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card, 1 < 0);
  expect(result).toEqual(2);
});

it("calculateCardQuantity test #9: This will not happen because if the deck is full we don't enter here, but still.", () => {
  const deck = {
    size: 30,
    isHighlander: false,
  };
  const card = { rarity: 'COMMON' };
  const result = calculateCardQuantity(deck, card);
  expect(result).toEqual(2);
});

// getClosestArchetype tests
it('getClosestArchetype test #1: Checks if returns the expected archetype.', () => {
  const aggroArchetype = archetypes.find(a => a.name === 'Aggro');
  const deckCards = cards
    .filter(c => ['Leper Gnome', 'Headcrack'].includes(c.name))
    .map(c => ({
      ...c,
      quantity: 2,
    }));
  const rogueHeroPower = heroPowers.find(hp => hp.name === 'Dagger Mastery');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower,
  };
  const result = getClosestArchetype(deck, archetypes);
  expect(result).toEqual(aggroArchetype);
});

it('getClosestArchetype test #2: Checks if returns the expected archetype.', () => {
  const aggroArchetype = archetypes.find(a => a.name === 'Aggro');
  const deckCards = cards
    .filter(c => [
      'Leper Gnome',
      'Leeroy Jenkins',
      'Heroic Strike',
      "King's Defender",
      'Argent Horserider',
    ].includes(c.name))
    .map(c => ({
      ...c,
      quantity: 2,
    }));
  const warriorHeroPower = heroPowers.find(hp => hp.name === 'Armor Up!');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: warriorHeroPower,
  };
  const result = getClosestArchetype(deck, archetypes);
  expect(result).toEqual(aggroArchetype);
});

it('getClosestArchetype test #3: Checks if returns the expected archetype.', () => {
  const tempoArchetype = archetypes.find(a => a.name === 'Tempo');
  const deckCards = cards
    .filter(c => [
      'Ravasaur Runt',
      'Fire Fly',
      'Eggnapper',
      'Vryghoul',
      'Dark Iron Dwarf',
      'Glacial Mysteries',
      'Explosive Runes',
      'Counterspell',
      'Mirror Entity',
      'Ice Barrier',
    ].includes(c.name))
    .map(c => ({
      ...c,
      quantity: 2,
    }));
  const mageHeroPower = heroPowers.find(hp => hp.name === 'Fireblast');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: mageHeroPower,
  };
  const result = getClosestArchetype(deck, archetypes);
  expect(result).toEqual(tempoArchetype);
});

// toStats tests
// TODO

// toCardCount tests.
it('toCardCount test #1: Checks if returns the expected value.', () => {
  const aggroArchetype = archetypes.find(a => a.name === 'Aggro');
  const deckCards = cards
    .filter(c => ['Leper Gnome', 'Headcrack'].includes(c.name))
    .map(c => ({
      ...c,
      quantity: 2,
    }));
  const damagePriority = aggroArchetype.priorities[2];
  const rogueHeroPower = heroPowers.find(hp => hp.name === 'Dagger Mastery');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower,
  };
  const result = toCardCount(damagePriority, deck);
  expect(result).toEqual(4);
});

it('toCardCount test #2: Checks if returns the expected value.', () => {
  const aggroArchetype = archetypes.find(a => a.name === 'Aggro');
  const deckCards = cards
    .filter(c => ['Leper Gnome', 'Headcrack'].includes(c.name))
    .map(c => ({
      ...c,
      quantity: 2,
    }));
  const oneCostFastMinions = aggroArchetype.priorities[0];
  const rogueHeroPower = heroPowers.find(hp => hp.name === 'Dagger Mastery');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower,
  };
  const result = toCardCount(oneCostFastMinions, deck);
  expect(result).toEqual(2);
});

it('toCardCount test #3: Checks if returns the expected value.', () => {
  const aggroArchetype = archetypes.find(a => a.name === 'Aggro');
  const deckCards = cards
    .filter(c => ['Leper Gnome', 'Headcrack'].includes(c.name))
    .map(c => ({
      ...c,
      quantity: 2,
    }));
  const twoCostFastMinions = aggroArchetype.priorities[1];
  const rogueHeroPower = heroPowers.find(hp => hp.name === 'Dagger Mastery');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower,
  };
  const result = toCardCount(twoCostFastMinions, deck);
  expect(result).toEqual(0);
});

it('toCardCount test #4: Checks if takes into account the hero power for +2 cards.', () => {
  const deckCards = cards
    .filter(c => ['Leper Gnome', 'Headcrack', 'Captain Greenskin'].includes(c.name))
    .map(c => ({
      ...c,
      quantity: 2,
    }));
  const captainGreenskinsWeapon = deckCards[2].versions[0].priorities[0];
  const rogueHeroPower = heroPowers.find(hp => hp.name === 'Dagger Mastery');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower,
  };
  const result = toCardCount(captainGreenskinsWeapon, deck);
  expect(result).toEqual(2);
});

// computeMaxCount tests
it('computeMaxCount test #1: Checks if returns the expected value.', () => {
  const result = computeMaxCount(5, { cardCount: 6 });
  expect(result).toEqual(6);
});

it('computeMaxCount test #2: Checks if returns the expected value.', () => {
  const result = computeMaxCount(7, { cardCount: 6 });
  expect(result).toEqual(7);
});

it('computeMaxCount test #3: Checks if returns the expected value.', () => {
  const result = computeMaxCount(6, { cardCount: 6 });
  expect(result).toEqual(6);
});

it('computeMaxCount test #4: Checks if returns the expected value.', () => {
  const result = computeMaxCount(0, { cardCount: 6 });
  expect(result).toEqual(6);
});

it('computeMaxCount test #5: Checks if returns the expected value.', () => {
  const result = computeMaxCount(6, { cardCount: 0 });
  expect(result).toEqual(6);
});

it('computeMaxCount test #6: Checks if returns NaN when one of the numbers is NaN.', () => {
  const result = computeMaxCount(NaN, { cardCount: 0 });
  expect(result).toEqual(NaN);
});

it('computeMaxCount test #7: Checks if returns NaN when one of the numbers is a string.', () => {
  const result = computeMaxCount(77, { cardCount: 'string' });
  expect(result).toEqual(NaN);
});

it('computeMaxCount test #8: Checks if ignores a third parameter.', () => {
  const result = computeMaxCount(0, { cardCount: 1 }, 66);
  expect(result).toEqual(1);
});

it('computeMaxCount test #9: Checks if returns NaN when cardCount is missing', () => {
  const result = computeMaxCount(9, {});
  expect(result).toEqual(NaN);
});

it('computeMaxCount test #10: Checks if returns undefined when the parameters are missing', () => {
  expect(computeMaxCount).toThrow();
});

// deckSatisfiesPriority tests
it('deckSatisfiesPriority test #1: Checks if returns the count of cards in deck that satisfy the priority.', () => {
  const knifeJuggler = findCardByName(cards, 'Knife Juggler');
  const cardNames = ['Knife Juggler', 'Violet Teacher', 'Mire Keeper'];
  const deckCards = findCardsByNames(cards, cardNames).map(c => ({
    ...c,
    quantity: 2,
  }));
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');

  const deck = {
    cards: deckCards,
    history: {},
    heroPower: druidHeroPower,
  };

  const result = deckSatisfiesPriority(deck, knifeJuggler.versions[0].priorities[0]);
  expect(result).toEqual(4);
});

it('deckSatisfiesPriority test #2: Checks if returns the count of cards in deck that satisfy the priority.', () => {
  const knifeJuggler = findCardByName(cards, 'Knife Juggler');
  const deckCards = [knifeJuggler].map(c => ({
    ...c,
    quantity: 2,
  }));
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');

  const deck = {
    cards: deckCards,
    history: {},
    heroPower: druidHeroPower,
  };

  const result = deckSatisfiesPriority(deck, knifeJuggler.versions[0].priorities[0]);
  expect(result).toEqual(0);
});

it('deckSatisfiesPriority test #3: Checks if returns true when the deck over-satisfies the priority.', () => {
  const knifeJuggler = findCardByName(cards, 'Knife Juggler');
  const cardNames = ['Knife Juggler', 'Violet Teacher', 'Mire Keeper', 'Kodorider'];
  const deckCards = findCardsByNames(cards, cardNames).map(c => ({
    ...c,
    quantity: 2,
  }));
  const druidHeroPower = heroPowers.find(hp => hp.name === 'Shapeshift');
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: druidHeroPower,
  };

  const result = deckSatisfiesPriority(deck, knifeJuggler.versions[0].priorities[0]);
  expect(result).toEqual(true);
});

// getCardThatRequestedPriority tests
it('getCardThatRequestedPriority test #1: Checks if returns the card that request the priority.', () => {
  const knifeJuggler = cards.find(c => c.name === 'Knife Juggler');
  const argentSquire = cards.find(c => c.name === 'Argent Squire');
  const bonemare = cards.find(c => c.name === 'Bonemare');

  const deck = {
    cards: [knifeJuggler, argentSquire, bonemare],
    history: {},
  };
  const result = getCardThatRequestedPriority(
    deck,
    knifeJuggler.versions.reduce(versionsToPriorities, [])[0].id,
  );
  expect(result).toEqual(knifeJuggler);
});

// obtainPriorities tests.
it('obtainPriorities test #1: Checks if extracts the priorities of a deck without cards correctly', () => {
  const deck = {
    cards: [],
    history: {
      totalPrioritiesExamined: [],
    },
  };
  const result = obtainPriorities(deck);
  expect(result).toEqual([]);
});

it('obtainPriorities test #2: Checks if extracts the priorities of a deck with 1 card correctly', () => {
  const soulOfTheForest = findCardByName(cards, 'Soul of the Forest');
  const deck = {
    cards: [soulOfTheForest],
    history: {
      totalPrioritiesExamined: [],
    },
  };
  const result = obtainPriorities(deck);
  expect(result).toEqual(soulOfTheForest.versions[0].priorities);
});

it('obtainPriorities test #3: Checks if extracts the priorities of a deck with 2 cards.', () => {
  const soulOfTheForest = findCardByName(cards, 'Soul of the Forest');
  const jungleGiants = findCardByName(cards, 'Jungle Giants');
  const deck = {
    cards: [soulOfTheForest, jungleGiants],
    history: {
      totalPrioritiesExamined: [],
    },
  };
  const result = obtainPriorities(deck);
  expect(result).toEqual(
    soulOfTheForest.versions[0].priorities.concat(jungleGiants.versions[0].priorities),
  );
});

it('obtainPriorities test #4: Checks if extracts the priorities of a deck with 2 cards and 1 of them already examined.', () => {
  const soulOfTheForest = findCardByName(cards, 'Soul of the Forest');
  const jungleGiants = findCardByName(cards, 'Jungle Giants');

  const deck = {
    cards: [soulOfTheForest, jungleGiants],
    history: {
      totalPrioritiesExamined: {
        '25f04c7a-5598-4a32-a1ff-83e13939432b': soulOfTheForest.versions[0].priorities[0],
        'd929cc68-2c90-4810-8728-8eead6290f4d': soulOfTheForest.versions[0].priorities[1],
      },
    },
  };
  const result = obtainPriorities(deck);
  expect(result).toEqual(jungleGiants.versions[0].priorities);
});

it('obtainPriorities test #5: Checks if extracts the priorities of a deck with 2 cards and both of them already examined.', () => {
  const soulOfTheForest = findCardByName(cards, 'Soul of the Forest');
  const jungleGiants = findCardByName(cards, 'Jungle Giants');

  const deck = {
    cards: [soulOfTheForest, jungleGiants],
    history: {
      totalPrioritiesExamined: {
        '25f04c7a-5598-4a32-a1ff-83e13939432b': soulOfTheForest.versions[0].priorities[0],
        'd929cc68-2c90-4810-8728-8eead6290f4d': soulOfTheForest.versions[0].priorities[1],
        '9510e0a3-8645-4c9d-bb13-da9c023b8860': jungleGiants.versions[0].priorities[0],
        '84bff91e-644b-41e7-8012-28e51e17c1a2': jungleGiants.versions[0].priorities[1],
        'c246a843-a6e3-472f-82af-879360e09e83': jungleGiants.versions[0].priorities[2],
      },
    },
  };
  const result = obtainPriorities(deck);
  expect(result).toEqual([]);
});

// obtainDeckWideFilters tests
it('obtainDeckWideFilters test #1: Checks if extracts the deck-wide filters of a deck.', () => {
  const princeKeleseth = cards.find(c => c.name === 'Prince Keleseth');
  const saroniteChainGang = cards.find(c => c.name === 'Saronite Chain Gang');
  const deck = {
    cards: [princeKeleseth, saroniteChainGang],
    history: {
      totalDeckFiltersExamined: {},
    },
  };
  const result = obtainDeckWideFilters(deck);
  expect(result).toEqual(princeKeleseth.deckFilters);
});

it('obtainDeckWideFilters test #2: Checks if returns an empty array when it has already examined the deck-wide filters', () => {
  const princeKeleseth = cards.find(c => c.name === 'Prince Keleseth');
  const saroniteChainGang = cards.find(c => c.name === 'Saronite Chain Gang');
  const deck = {
    cards: [princeKeleseth, saroniteChainGang],
    history: {
      totalDeckFiltersExamined: {
        'ff990949-71c3-4a6c-b179-64a3c70d9052': princeKeleseth.deckFilters[0],
      },
    },
  };
  const result = obtainDeckWideFilters(deck);
  expect(result).toEqual([]);
});

it('obtainDeckWideFilters test #3: Checks if returns an empty array when the cards have no deck-wide filters', () => {
  const frostwolfGrunt = cards.find(c => c.name === 'Frostwolf Grunt');
  const voidWalker = cards.find(c => c.name === 'Voidwalker');
  const saroniteChainGang = cards.find(c => c.name === 'Saronite Chain Gang');
  const deck = {
    cards: [frostwolfGrunt, voidWalker, saroniteChainGang],
    history: {
      totalDeckFiltersExamined: {},
    },
  };
  const result = obtainDeckWideFilters(deck);
  expect(result).toEqual([]);
});

it('obtainDeckWideFilters test #4: Checks if returns an empty array when the deck has no cards.', () => {
  const deck = {
    cards: [],
    history: {
      totalDeckFiltersExamined: {},
    },
  };
  const result = obtainDeckWideFilters(deck);
  expect(result).toEqual([]);
});

// getInfoFromPriorities tests.
it('getInfoFromPriorities test #1: Checks if gets info from priorities correctly', () => {
  const priorities = [{ no: '1' }, { no: '2' }, { no: '3' }];

  const result = getInfoFromPriorities(priorities);
  expect(result).toEqual([
    {
      priority: { no: '1' },
      priorityAddedCards: [],
      extra: 'Priority not processed',
    },
    {
      priority: { no: '2' },
      priorityAddedCards: [],
      extra: 'Priority not processed',
    },
    {
      priority: { no: '3' },
      priorityAddedCards: [],
      extra: 'Priority not processed',
    },
  ]);
});

it('getInfoFromPriorities test #2: Checks if gets info from priorities correctly', () => {
  const priorities = findCardByName(cards, 'Effigy').versions.reduce(versionsToPriorities, []);

  const result = getInfoFromPriorities(priorities);
  expect(result).toEqual([
    {
      priority: {
        minCards: 2,
        maxCards: 4,
        id: '9bc9edd8-57e9-47c8-ac90-a6dbbc50710c',
        filters: [
          {
            property: 'type',
            operation: 'EQUALS',
            minValue: 'MINION',
          },
          {
            property: 'cost',
            operation: 'GREATER_THAN',
            minValue: 3,
          },
          {
            property: 'extra',
            operation: 'INCLUDES',
            minValue: 'VALUE',
          },
        ],
      },
      priorityAddedCards: [],
      extra: 'Priority not processed',
    },
  ]);
});

// addOtherCards tests
it(`addOtherCards test #1: Checks if returns a deck with 30 cards.
    It also checks if the the deck has 29 cards and the last card is not
    a legendary the quantity of the last card is 1.`, () => {
  let interestingCards = [
    findCardByName(cards, 'Blazecaller'),
    findCardByName(cards, 'Devilsaur Egg'),
    findCardByName(cards, 'Gentle Megasaur'),
    findCardByName(cards, 'Humongous Razorleaf'),
    findCardByName(cards, 'Primalfin Lookout'),
    findCardByName(cards, 'Marin the Fox'),
  ];
  interestingCards = initializeQuantity(interestingCards, false);

  const otherCards = [
    findCardByName(cards, 'Bittertide Hydra'),
    findCardByName(cards, 'Charged Devilsaur'),
    findCardByName(cards, 'Eggnapper'),
    findCardByName(cards, 'Emerald Hive Queen'),
    findCardByName(cards, 'Fire Fly'),
    findCardByName(cards, 'Fire Plume Phoenix'),
    findCardByName(cards, 'Frozen Crusher'),
    findCardByName(cards, 'Giant Mastodon'),
    findCardByName(cards, 'Giant Wasp'),
    findCardByName(cards, 'Gluttonous Ooze'),
  ];
  const deck = {
    cards: interestingCards,
    history: {
      totalDeckFiltersExamined: {},
    },
    size: getSize(interestingCards),
    isHighlander: false,
  };
  addOtherCards(deck, {}, otherCards);
  expect(getSize(deck.cards)).toEqual(30);
  expect(findCardByName(deck.cards, 'Gluttonous Ooze').quantity).toEqual(1);
});

it(`addOtherCards test #2: Checks if returns a deck with 30 cards.
  It also checks if the the deck has 28 cards and the last card is not
  a legendary the quantity of the last card is 2.`, () => {
  let interestingCards = [
    findCardByName(cards, 'Blazecaller'),
    findCardByName(cards, 'Devilsaur Egg'),
    findCardByName(cards, 'Gentle Megasaur'),
    findCardByName(cards, 'Humongous Razorleaf'),
    findCardByName(cards, 'Primalfin Lookout'),
  ];
  interestingCards = initializeQuantity(interestingCards, false);

  const otherCards = [
    findCardByName(cards, 'Bittertide Hydra'),
    findCardByName(cards, 'Charged Devilsaur'),
    findCardByName(cards, 'Eggnapper'),
    findCardByName(cards, 'Emerald Hive Queen'),
    findCardByName(cards, 'Fire Fly'),
    findCardByName(cards, 'Fire Plume Phoenix'),
    findCardByName(cards, 'Frozen Crusher'),
    findCardByName(cards, 'Giant Mastodon'),
    findCardByName(cards, 'Giant Wasp'),
    findCardByName(cards, 'Gluttonous Ooze'),
  ];
  const deck = {
    cards: interestingCards,
    history: {
      totalDeckFiltersExamined: {},
    },
    size: getSize(interestingCards),
    isHighlander: false,
  };
  addOtherCards(deck, {}, otherCards);
  expect(getSize(deck.cards)).toEqual(30);
  expect(findCardByName(deck.cards, 'Gluttonous Ooze').quantity).toEqual(2);
});

it("addOtherCards test #3: Checks if returns the correct deck size when we don't have interesting cards.", () => {
  const otherCards = [
    findCardByName(cards, 'Bittertide Hydra'),
    findCardByName(cards, 'Charged Devilsaur'),
  ];
  const deck = {
    cards: [],
    history: {
      totalDeckFiltersExamined: {},
    },
    size: 0,
    isHighlander: false,
  };
  addOtherCards(deck, {}, otherCards);
  expect(getSize(deck.cards)).toEqual(4);
});
