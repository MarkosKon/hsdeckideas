import {
  getManaCurve,
  getTotalDust,
  getDeckScore,
  message,
  getDeck,
  completeDeckRandomly,
  getClosestArchetype,
  toCardCount,
  computeMaxCount,
  deckSatisfiesPriority,
  getCardThatRequestedPriority,
  extractPriorities,
  extractDeckWideFilters,
  addCardsByPriority,
  getInfoFromPriorities,
  initializeDeck,
  initializeStep
} from "./deckUtils";
import { chooseInterestingCard, getSize, getAvailableCards, isCardInteresting } from "./cardUtils";
import { byName } from "./sort";

// Data init.
const data = require("../../public/resources/data/data.json");
const cards = data[0].content;
const archetypes = data[1].content;
const heroPowers = data[3].content;

// getManaCurve tests
it("getManaCurve test #1: Checks if returns the expected mana curve for a deck.", () => {
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
      { cost: 10, quantity: 2 }
    ]
  };
  const result = getManaCurve(deck);
  expect(result).toEqual([0, 4, 6, 4, 3, 3, 3, 7]);
});

it("getManaCurve test #2: Checks if returns a mana curve of 0s for a deck with empty card array.", () => {
  const deck = {
    cards: []
  };
  const result = getManaCurve(deck);
  expect(result).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
});

it("getManaCurve test #3: Checks if returns the expected mana curve for a deck.", () => {
  const deck = {
    cards: [
      { cost: 0, quantity: 1 },
      { cost: 1, quantity: 6 },
      { cost: 2, quantity: 6 },
      { cost: 3, quantity: 5 },
      { cost: 4, quantity: 4 },
      { cost: 5, quantity: 4 },
      { cost: 6, quantity: 2 },
      { cost: 10, quantity: 2 }
    ]
  };
  const result = getManaCurve(deck);
  expect(result).toEqual([1, 6, 6, 5, 4, 4, 2, 2]);
});

it("getManaCurve test #4: Checks if returns the expected mana curve for a deck with missing quantities.", () => {
  const deck = {
    cards: [
      { cost: 0, quantity: 1 },
      { cost: 1, quantity: 6 },
      { cost: 2, quantity: 6 },
      { cost: 3, quantity: 5 },
      { cost: 4 },
      { cost: 5, quantity: 4 },
      { cost: 6, quantity: 2 },
      { cost: 10, quantity: 2 }
    ]
  };
  const result = getManaCurve(deck);
  expect(result).toEqual([1, 6, 6, 5, NaN, 4, 2, 2]);
});

it("getManaCurve test #5: Checks if returns the expected mana curve for a `real` deck.", () => {
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
      { cost: 10, quantity: 2 }
    ]
  };
  const result = getManaCurve(deck);
  expect(result).toEqual([0, 4, 6, 4, 3, 3, 3, 7]);
});

it("getManaCurve test #6: Checks if returns undefined for a deck with no cards property", () => {
  const deck = {};
  const result = getManaCurve(deck);
  expect(result).toEqual(undefined);
});

// getTotalDust tests
it("getTotalDust test #1: Checks if returns the expected total dust for a deck.", () => {
  const deck = {
    cards: [
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "COMMON", quantity: 2 }
    ]
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(480);
});

it("getTotalDust test #2: Checks if returns the expected total dust for a deck.", () => {
  const deck = {
    cards: [
      { rarity: "EPIC", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "LEGENDARY", quantity: 1 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "RARE", quantity: 2 },
      { rarity: "COMMON", quantity: 2 }
    ]
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(320 + 200 + 400 + 1600);
});

it("getTotalDust test #3: Checks if returns the expected total dust for a deck with duplicate legendary.", () => {
  const deck = {
    cards: [
      { rarity: "EPIC", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "LEGENDARY", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "RARE", quantity: 2 },
      { rarity: "COMMON", quantity: 2 }
    ]
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(320 + 200 + 400 + 1600);
});

it("getTotalDust test #4: Checks if returns the expected total dust for a deck with a rarity that doesn't exist.", () => {
  const deck = {
    cards: [
      { rarity: "EPIC", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "WRONG_RARITY", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "RARE", quantity: 2 },
      { rarity: "COMMON", quantity: 2 }
    ]
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(320 + 200 + 400);
});

it("getTotalDust test #5: Checks if returns the expected total dust for a deck with cards that don't have rarity.", () => {
  const deck = {
    cards: [
      { rarity: "EPIC", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "COMMON", quantity: 2 },
      { quantity: 2 },
      { rarity: "COMMON", quantity: 1 },
      { rarity: "RARE", quantity: 2 },
      { quantity: 2 }
    ]
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(240 + 200 + 400);
});

it("getTotalDust test #5: Checks if returns 0 for a deck with no cards", () => {
  const deck = {
    cards: []
  };
  const result = getTotalDust(deck);
  expect(result).toEqual(0);
});

// getDeckScore tests.
it("getDeckScore test #1: Checks if returns the expected score.", () => {
  const deck = {
    cards: [
      { rating: 1, quantity: 1 },
      { rating: 1, quantity: 2 },
      { rating: 2, quantity: 1 },
      { rating: 2, quantity: 2 },
      { rating: 4, quantity: 2 },
      { rating: 1, quantity: 2 },
      { rating: 3, quantity: 2 },
      { rating: 4, quantity: 2 }
    ]
  };
  const result = getDeckScore(deck);
  expect(result).toEqual(5 + 6 + 6 + 16);
});

it("getDeckScore test #2: Checks if returns the expected score.", () => {
  const deck = {
    cards: [
      { rating: 1, quantity: 1 },
      { rating: 0, quantity: 2 },
      { rating: 2, quantity: 1 },
      { rating: 2, quantity: 2 },
      { rating: 4, quantity: 2 },
      { rating: 1, quantity: 2 },
      { rating: 3, quantity: 2 },
      { rating: 4, quantity: 2 }
    ]
  };
  const result = getDeckScore(deck);
  expect(result).toEqual(3 + 6 + 6 + 16);
});

// initializeDeck tests.
it("initializeDeck test #1: Checks if initializes the deck correctly.", () => {
  const heroName = "Paladin";
  const paladinHeroPower = heroPowers.find(hp => hp.name === "Reinforce");
  const result = initializeDeck(heroName, paladinHeroPower);

  expect(result).toEqual({
    cards: [],
    hero: heroName,
    heroPower: paladinHeroPower,
    totalDust: 0,
    score: 0,
    history: {
      steps: [],
      totalPrioritiesExamined: {},
      totalDeckFiltersExamined: {}
    },
    size: 0
  });
});

// editStep tests.
it("initializeStep test #1: Checks if edits the step correctly", () => {
  const step = initializeStep([]);

  expect(step).toEqual({
    originCards: [],
    extra: "In this step the priorities come from the origin card(s).",
    totalAddedCards: []
  });
});

// message tests.
it("message test #1: Checks if returns the default message", () => {
  const result = message["default"];

  expect(result).toEqual("In this step the priorities come from the origin card(s).");
});

it("message test #2: Checks if returns the defaultPlus message", () => {
  const result = message["defaultPlus"];

  expect(result).toEqual("In this step the priorities come from the origin card(s) and from the archetype you selected.");
});

it("message test #3: Checks if returns the noAvailableCards message", () => {
  const result = message["noAvailableCards"];

  expect(result).toEqual("Yeah.. really smart choices congratulations... " +
    "There are no available cards to fill the deck.");
});

it("message test #4: Checks if returns the deckWideFilters message", () => {
  const result = message["deckWideFilters"];

  expect(result).toEqual("In this step the origin card(s) have deck wide filters. In " +
    "this case we'll limit the available card pool according to the filters and remove " +
    "the inappropriate cards from the deck. Finally we'll proceed with the priorities " +
    "(if any).");
});

it("message test #5: Checks if returns the noOriginCards message", () => {
  const result = message["noOriginCards"];

  expect(result).toEqual("We don't have 'origin' cards for this step. This happens when the cards " +
    "don't have any priorities or when the priorities of the cards added are already satisfied " +
    "or when we don't have cards for the priority. So because we are still at the start " +
    "(the deck size is less or equal to 10 cards) we continue by adding an additional " +
    "'interesting' card.");
});

it("message test #6: Checks if returns the archetypeIn message", () => {
  const result = message.archetypeIn("Control");

  expect(result).toEqual("The following priorities come from the archetype that better represents the deck we have so " +
    "far, which is the Control archetype. We do that when the cards from the previous " +
    "step don't have any new priorities and the deck size is more that 10 cards. This can also happen " +
    "when the cards from the previous step have priorities but deck is already at least 17 cards deep. " +
    "We do that because at that point we want to stop adding synergy and start adding vital cards.");
});

// getDeck tests.
it("getDeck test #1: Checks if returns a deck with 30 cards for Standard Druid.", () => {
  const heroName = "Druid";
  const druidHeroPower = heroPowers.find(hp => hp.name === "Shapeshift");
  const format = "Standard"
  const availableCards = getAvailableCards(cards, heroName, format);

  const result = getDeck(cards, heroName, druidHeroPower, format, "Random", archetypes, null, null);

  expect(getSize(result.cards)).toEqual(30);
});

// it("getDeck test #2: Checks if returns a deck with 30 cards for Standard Hunter if the user selected all the interesting cards.", () => {
//   const heroName = "Hunter";
//   const druidHeroPower = heroPowers.find(hp => hp.name === "Steady Shot");
//   const format = "Standard"
//   const availableCards = getAvailableCards(cards, heroName, format);
//   const allInterestingCards = availableCards.filter(isCardInteresting);
//   console.log(allInterestingCards.length);

//   const result = getDeck(cards, heroName, druidHeroPower, format, "Random", archetypes, allInterestingCards, null);

//   expect(getSize(result.cards)).toEqual(30);
// });

it("getDeck test #3: Checks if returns a deck with 30 cards for Standard Hunter if the user selected all the non interesting cards.", () => {
  const heroName = "Hunter";
  const druidHeroPower = heroPowers.find(hp => hp.name === "Steady Shot");
  const format = "Standard"
  const availableCards = getAvailableCards(cards, heroName, format);
  const allOtherCards = availableCards.filter(c => !isCardInteresting(c));

  const result = getDeck(cards, heroName, druidHeroPower, format, "Random", archetypes, null, allOtherCards);

  expect(getSize(result.cards)).toEqual(30);
});

it("getDeck test #4: Checks if the deck has duplicate cards.", () => {
  const heroName = "Druid";
  const druidHeroPower = heroPowers.find(hp => hp.name === "Shapeshift");
  const format = "Standard"
  const availableCards = getAvailableCards(cards, heroName, format);

  const result = getDeck(cards, heroName, druidHeroPower, format, "Random", archetypes, null, null);

  expect(hasDuplicates(result)).toEqual(false);
});

it("getDeck test #5: Checks if the deck has duplicate cards.", () => {
  const heroName = "Druid";
  const druidHeroPower = heroPowers.find(hp => hp.name === "Shapeshift");
  const format = "Standard"
  const availableCards = getAvailableCards(cards, heroName, format);
  const ui = cards.find(c => c.name === "Ultimate Infestation");
  ui.quantity = 2;
  const nourish = cards.find(c => c.name === "Nourish");
  nourish.quantity = 2;

  const result = getDeck(cards, heroName, druidHeroPower, format, "Random", archetypes, [ui, nourish], null);

  expect(hasDuplicates(result)).toEqual(false);
});

// hasDuplicates function and tests.
const hasDuplicates = deck =>
  deck.cards
    .sort(byName)
    .reduce((prev, card, i, cards) =>
      i === cards.length - 1
        ? prev
        : card.name === cards[i + 1].name || prev
          ? true
          : false
      , false)

it("hasDuplicates test #1: Checks if works.", () => {
  const deck = {
    cards: [
      { name: "One" },
      { name: "Two" },
      { name: "Three" },
      { name: "Four" }
    ]
  };

  expect(hasDuplicates(deck)).toEqual(false);
});

it("hasDuplicates test #2: Checks if works.", () => {
  const deck = {
    cards: [
      { name: "One" },
      { name: "Two" },
      { name: "Two" },
      { name: "Three" }
    ]
  };

  expect(hasDuplicates(deck)).toEqual(true);
});

it("hasDuplicates test #3: Checks if works.", () => {
  const deck = {
    cards: [
      { name: "One" },
      { name: "Two" },
      { name: "Three" },
      { name:  "One" }
    ]
  };

  expect(hasDuplicates(deck)).toEqual(true);
});

// completeDeckRandomly tests
it("completeDeckRandomly test #1: Checks if returns a deck with 30 cards.", () => {
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, cards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #2: Checks if returns a deck with 30 cards for Druid.", () => {
  const availableCards = getAvailableCards(cards, "Druid", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #3: Checks if returns a deck with 30 cards for Hunter.", () => {
  const availableCards = getAvailableCards(cards, "Hunter", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #4: Checks if returns a deck with 30 cards for Mage.", () => {
  const availableCards = getAvailableCards(cards, "Mage", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #5: Checks if returns a deck with 30 cards for Paladin.", () => {
  const availableCards = getAvailableCards(cards, "Paladin", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #6: Checks if returns a deck with 30 cards for Priest.", () => {
  const availableCards = getAvailableCards(cards, "Priest", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #7: Checks if returns a deck with 30 cards for Rogue.", () => {
  const availableCards = getAvailableCards(cards, "Rogue", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #8: Checks if returns a deck with 30 cards for Shaman.", () => {
  const availableCards = getAvailableCards(cards, "Shaman", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #9: Checks if returns a deck with 30 cards for Warrior.", () => {
  const availableCards = getAvailableCards(cards, "Warrior", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #10: Checks if returns a deck with 30 cards for Warlock.", () => {
  const availableCards = getAvailableCards(cards, "Warlock", "Standard");
  const deck = {
    cards: []
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(getSize(result.cards)).toEqual(30);
});

it("completeDeckRandomly test #11: Checks if returns a deck with duplicates", () => {
  const ui = cards.find(c => c.name === "Ultimate Infestation");
  ui.quantity = 2;
  const nourish = cards.find(c => c.name === "Nourish");
  nourish.quantity = 2;
  const availableCards = getAvailableCards(cards, "Druid", "Standard");
  const deck = {
    cards: [ui, nourish]
  };
  const result = completeDeckRandomly(deck, availableCards, false);
  expect(hasDuplicates(result)).toEqual(false);
});

// getClosestArchetype tests
it("getClosestArchetype test #1: Checks if returns the expected archetype.", () => {
  const aggroArchetype = archetypes.find(a => a.name === "Aggro");
  const deckCards = 
    cards
      .filter(c => ["Leper Gnome", "Headcrack"].includes(c.name))
      .map(c => { c.quantity = 2; return c; });
  const rogueHeroPower = heroPowers.find(hp => hp.name === "Dagger Mastery");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower
  };
  const result = getClosestArchetype(deck, archetypes);
  expect(result).toEqual(aggroArchetype);
});

it("getClosestArchetype test #2: Checks if returns the expected archetype.", () => {
  const aggroArchetype = archetypes.find(a => a.name === "Aggro");
  const deckCards = 
    cards
      .filter(c => ["Leper Gnome", "Leeroy Jenkins", "Heroic Strike", "King's Defender", "Argent Horserider"].includes(c.name))
      .map(c => { c.quantity = 2; return c; });
  const warriorHeroPower = heroPowers.find(hp => hp.name === "Armor Up!");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: warriorHeroPower
  };
  const result = getClosestArchetype(deck, archetypes);
  expect(result).toEqual(aggroArchetype);
});

it("getClosestArchetype test #3: Checks if returns the expected archetype.", () => {
  const tempoArchetype = archetypes.find(a => a.name === "Tempo");
  const deckCards = 
    cards
      .filter(c => [
        "Ravasaur Runt", "Fire Fly", "Eggnapper", "Vryghoul", 
        "Dark Iron Dwarf", "Glacial Mysteries", "Explosive Runes",
        "Counterspell", "Mirror Entity", "Ice Barrier"
      ].includes(c.name))
      .map(c => { c.quantity = 2; return c; });
  const mageHeroPower = heroPowers.find(hp => hp.name === "Fireblast");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: mageHeroPower
  };
  const result = getClosestArchetype(deck, archetypes);
  expect(result).toEqual(tempoArchetype);
});

// TODO toStats tests

// toCardCount tests.
it("toCardCount test #1: Checks if returns the expected value.", () => {
  const aggroArchetype = archetypes.find(a => a.name === "Aggro");
  const deckCards = 
    cards
      .filter(c => ["Leper Gnome", "Headcrack"].includes(c.name))
      .map(c => { c.quantity = 2; return c; });
  const damagePriority = aggroArchetype.priorities[2]
  const rogueHeroPower = heroPowers.find(hp => hp.name === "Dagger Mastery");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower
  };
  const result = toCardCount(damagePriority, deck);
  expect(result).toEqual(4);
});

it("toCardCount test #2: Checks if returns the expected value.", () => {
  const aggroArchetype = archetypes.find(a => a.name === "Aggro");
  const deckCards = 
    cards
      .filter(c => ["Leper Gnome", "Headcrack"].includes(c.name))
      .map(c => { c.quantity = 2; return c; });
  const oneCostFastMinions = aggroArchetype.priorities[0]
  const rogueHeroPower = heroPowers.find(hp => hp.name === "Dagger Mastery");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower
  };
  const result = toCardCount(oneCostFastMinions, deck);
  expect(result).toEqual(2);
});

it("toCardCount test #3: Checks if returns the expected value.", () => {
  const aggroArchetype = archetypes.find(a => a.name === "Aggro");
  const deckCards = 
    cards
      .filter(c => ["Leper Gnome", "Headcrack"].includes(c.name))
      .map(c => { c.quantity = 2; return c; });
  const twoCostFastMinions = aggroArchetype.priorities[1]
  const rogueHeroPower = heroPowers.find(hp => hp.name === "Dagger Mastery");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower
  };
  const result = toCardCount(twoCostFastMinions, deck);
  expect(result).toEqual(0);
});

it("toCardCount test #4: Checks if takes into account the hero power for +2 cards.", () => {
  const deckCards = 
    cards
      .filter(c => ["Leper Gnome", "Headcrack", "Captain Greenskin"].includes(c.name))
      .map(c => { c.quantity = 2; return c; });
  const captainGreenskinsWeapon = deckCards[2].priorities[0];
  const rogueHeroPower = heroPowers.find(hp => hp.name === "Dagger Mastery");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: rogueHeroPower
  };
  const result = toCardCount(captainGreenskinsWeapon, deck);
  expect(result).toEqual(2);
});

// computeMaxCount tests
it("computeMaxCount test #1: Checks if returns the expected value.", () => {
  const result = computeMaxCount(5, {cardCount: 6});
  expect(result).toEqual(6);
});

it("computeMaxCount test #2: Checks if returns the expected value.", () => {
  const result = computeMaxCount(7, {cardCount: 6});
  expect(result).toEqual(7);
});

it("computeMaxCount test #3: Checks if returns the expected value.", () => {
  const result = computeMaxCount(6, {cardCount: 6});
  expect(result).toEqual(6);
});

it("computeMaxCount test #4: Checks if returns the expected value.", () => {
  const result = computeMaxCount(0, {cardCount: 6});
  expect(result).toEqual(6);
});

it("computeMaxCount test #5: Checks if returns the expected value.", () => {
  const result = computeMaxCount(6, {cardCount: 0});
  expect(result).toEqual(6);
});

it("computeMaxCount test #6: Checks if returns NaN when one of the numbers is NaN.", () => {
  const result = computeMaxCount(NaN, {cardCount: 0});
  expect(result).toEqual(NaN);
});

it("computeMaxCount test #7: Checks if returns NaN when one of the numbers is a string.", () => {
  const result = computeMaxCount(77, {cardCount: "string"});
  expect(result).toEqual(NaN);
});

it("computeMaxCount test #8: Checks if ignores a third parameter.", () => {
  const result = computeMaxCount(0, {cardCount: 1}, 66);
  expect(result).toEqual(1);
});

it("computeMaxCount test #9: Checks if returns NaN when cardCount is missing", () => {
  const result = computeMaxCount(9, {});
  expect(result).toEqual(NaN);
});

it("computeMaxCount test #10: Checks if returns undefined when the parameters are missing", () => {
  expect(computeMaxCount).toThrow();
});

// deckSatisfiesPriority tests
it("deckSatisfiesPriority test #1: Checks if returns the count of cards in deck that satisfy the priority.", () => {
  const knifeJuggler = cards.find(c => c.name === "Knife Juggler");
  const violetTeacher = cards.find(c => c.name === "Violet Teacher");
  const mireKeeper = cards.find(c => c.name === "Mire Keeper");
  const deckCards = 
    [knifeJuggler, violetTeacher, mireKeeper]
    .map(c => { 
      c.quantity = 2; 
      return c;
    });
  const druidHeroPower = heroPowers.find(hp => hp.name === "Shapeshift");

  const deck = {
    cards: deckCards,
    history: {},
    heroPower: druidHeroPower
  };

  const result = deckSatisfiesPriority(deck, knifeJuggler.priorities[0]);
  expect(result).toEqual(4);
});

it("deckSatisfiesPriority test #2: Checks if returns the count of cards in deck that satisfy the priority.", () => {
  const knifeJuggler = cards.find(c => c.name === "Knife Juggler");
  const deckCards = 
    [knifeJuggler]
    .map(c => { 
      c.quantity = 2; 
      return c;
    });
  const druidHeroPower = heroPowers.find(hp => hp.name === "Shapeshift");

  const deck = {
    cards: deckCards,
    history: {},
    heroPower: druidHeroPower
  };

  const result = deckSatisfiesPriority(deck, knifeJuggler.priorities[0]);
  expect(result).toEqual(0);
});

it("deckSatisfiesPriority test #3: Checks if returns true when the deck over-satisfies the priority.", () => {
  const knifeJuggler = cards.find(c => c.name === "Knife Juggler");
  const violetTeacher = cards.find(c => c.name === "Violet Teacher");
  const mireKeeper = cards.find(c => c.name === "Mire Keeper");
  const kodoRider = cards.find(c => c.name === "Kodorider");
  const deckCards = 
    [knifeJuggler, violetTeacher, mireKeeper, kodoRider]
    .map(c => { 
      c.quantity = 2; 
      return c;
    });
  const druidHeroPower = heroPowers.find(hp => hp.name === "Shapeshift");
  const deck = {
    cards: deckCards,
    history: {},
    heroPower: druidHeroPower
  };

  const result = deckSatisfiesPriority(deck, knifeJuggler.priorities[0]);
  expect(result).toEqual(true);
});


// getCardThatRequestedPriority tests
it("getCardThatRequestedPriority test #1: Checks if returns the card that request the priority.", () => {
  const knifeJuggler = cards.find(c => c.name === "Knife Juggler");
  const argentSquire = cards.find(c => c.name === "Argent Squire");
  const bonemare = cards.find(c => c.name === "Bonemare");

  const deck = {
    cards: [knifeJuggler, argentSquire, bonemare],
    history: {}
  };
  const result = getCardThatRequestedPriority(deck, knifeJuggler.priorities[0].id);
  expect(result).toEqual(knifeJuggler);
});

// extractPriorities tests.
it("extractPriorities test #1: Checks if extracts the priorities of a deck without cards correctly", () => {
  const deck = {
    cards: [],
    history: {
      totalPrioritiesExamined: []
    }
  };
  const result = extractPriorities(deck);
  expect(result).toEqual([]);
});

it("extractPriorities test #2: Checks if extracts the priorities of a deck with 1 card correctly", () => {
  const soulOfTheForest = cards.find(c => c.name === "Soul of the Forest");
  const deck = {
    cards: [soulOfTheForest],
    history: {
      totalPrioritiesExamined: []
    }
  };
  const result = extractPriorities(deck);
  expect(result).toEqual(soulOfTheForest.priorities);
});

it("extractPriorities test #3: Checks if extracts the priorities of a deck with 2 cards.", () => {
  const cardNames = ["Soul of the Forest", "Jungle Giants"]
  const twoCards = cards.filter(c => cardNames.includes(c.name));
  const deck = {
    cards: twoCards,
    history: {
      totalPrioritiesExamined: []
    }
  };
  const result = extractPriorities(deck);
  expect(result).toEqual(twoCards[0].priorities.concat(twoCards[1].priorities));
});

it("extractPriorities test #4: Checks if extracts the priorities of a deck with 2 cards and 1 of them already examined.", () => {
  const soulOfTheForest = cards.find(c => c.name === "Soul of the Forest");
  const jungleGiants = cards.find(c => c.name === "Jungle Giants");
  
  const deck = {
    cards: [soulOfTheForest, jungleGiants],
    history: {
      totalPrioritiesExamined: {
        "25f04c7a-5598-4a32-a1ff-83e13939432b": soulOfTheForest.priorities[0],
        "d929cc68-2c90-4810-8728-8eead6290f4d": soulOfTheForest.priorities[1]
      }
    }
  };
  const result = extractPriorities(deck);
  expect(result).toEqual(jungleGiants.priorities);
});

it("extractPriorities test #5: Checks if extracts the priorities of a deck with 2 cards and both of them already examined.", () => {
  const soulOfTheForest = cards.find(c => c.name === "Soul of the Forest");
  const jungleGiants = cards.find(c => c.name === "Jungle Giants");
  
  const deck = {
    cards: [soulOfTheForest, jungleGiants],
    history: {
      totalPrioritiesExamined: {
        "25f04c7a-5598-4a32-a1ff-83e13939432b": soulOfTheForest.priorities[0],
        "d929cc68-2c90-4810-8728-8eead6290f4d": soulOfTheForest.priorities[1],
        "9510e0a3-8645-4c9d-bb13-da9c023b8860": jungleGiants.priorities[0],
        "84bff91e-644b-41e7-8012-28e51e17c1a2": jungleGiants.priorities[1],
        "c246a843-a6e3-472f-82af-879360e09e83": jungleGiants.priorities[2]
      }
    }
  };
  const result = extractPriorities(deck);
  expect(result).toEqual([]);
});

// extractDeckWideFilters tests
it("extractDeckWideFilters test #1: Checks if extracts the deck-wide filters of a deck.", () => {
  const princeKeleseth = cards.find(c => c.name === "Prince Keleseth");
  const saroniteChainGang = cards.find(c => c.name === "Saronite Chain Gang");
  const deck = {
    cards: [princeKeleseth, saroniteChainGang],
    history: {
      totalDeckFiltersExamined: {}
    }
  };
  const result = extractDeckWideFilters(deck);
  expect(result).toEqual(princeKeleseth.deckFilters);
});

it("extractDeckWideFilters test #2: Checks if returns an empty array when it has already examined the deck-wide filters", () => {
  const princeKeleseth = cards.find(c => c.name === "Prince Keleseth");
  const saroniteChainGang = cards.find(c => c.name === "Saronite Chain Gang");
  const deck = {
    cards: [princeKeleseth, saroniteChainGang],
    history: {
      totalDeckFiltersExamined: {"ff990949-71c3-4a6c-b179-64a3c70d9052": princeKeleseth.deckFilters[0]}
    }
  };
  const result = extractDeckWideFilters(deck);
  expect(result).toEqual([]);
});

it("extractDeckWideFilters test #3: Checks if returns an empty array when the cards have no deck-wide filters", () => {
  const frostwolfGrunt = cards.find(c => c.name === "Frostwolf Grunt");
  const voidWalker = cards.find(c => c.name === "Voidwalker");
  const saroniteChainGang = cards.find(c => c.name === "Saronite Chain Gang");
  const deck = {
    cards: [frostwolfGrunt, voidWalker, saroniteChainGang],
    history: {
      totalDeckFiltersExamined: {}
    }
  };
  const result = extractDeckWideFilters(deck);
  expect(result).toEqual([]);
});

it("extractDeckWideFilters test #4: Checks if returns an empty array when the deck has no cards.", () => {

  const deck = {
    cards: [],
    history: {
      totalDeckFiltersExamined: {}
    }
  };
  const result = extractDeckWideFilters(deck);
  expect(result).toEqual([]);
});

// getInfoFromPriorities tests.
it("getInfoFromPriorities test #1: Checks if gets info from priorities correctly", () => {
  const priorities = [{ no: "1" }, { no: "2" }, { no: "3" }];

  const result = getInfoFromPriorities(priorities);
  expect(result).toEqual([
    {
      priority: { no: "1" },
      priorityAddedCards: [],
      extra: "Priority not processed"
    },
    {
      priority: { no: "2" },
      priorityAddedCards: [],
      extra: "Priority not processed"
    },
    {
      priority: { no: "3" },
      priorityAddedCards: [],
      extra: "Priority not processed"
    }
  ]);
});

it("getInfoFromPriorities test #2: Checks if gets info from priorities correctly", () => {
  const priorities = cards.find(c => c.name === "Effigy").priorities;

  const result = getInfoFromPriorities(priorities);
  expect(result).toEqual([
    {
      priority: {
        minCards: 2,
        maxCards: 4,
        id: "9bc9edd8-57e9-47c8-ac90-a6dbbc50710c",
        filters: [
          {
            property: "type",
            operation: "EQUALS",
            minValue: "MINION"
          },
          {
            property: "cost",
            operation: "GREATER_THAN",
            minValue: 3
          },
          {
            property: "extra",
            operation: "INCLUDES",
            minValue: "VALUE"
          }
        ]
      },
      priorityAddedCards: [],
      extra: "Priority not processed"
    }
  ]);
});

// addCardsByPriority tests
// it('checks if adds cards by priority to an 1 card deck', ()=> {
//     const soulOfTheForest = cards.find(c => c.name === "Soul of the Forest");
//     const deck = {
//         cards: [soulOfTheForest],
//         history: {
//             steps: [
//                 {
//                     originCards: [soulOfTheForest],
//                     prioritiesInfo: [
//                         {
//                            priority: {},
//                            priorityAddedCards: [],
//                            extra: "The priorities come from the origin cards for this step. "
//                         }
//                     ],
//                     totalAddedCards: []
//                 }
//             ],
//             totalPrioritiesExamined: []
//         }
//     }
//     const result = addCardsByPriority(cards, deck, deck.cards[0].priorities[0], false);
//     // console.log(result.cards.map(c => c.name));
//     console.log(result.history.steps[0].totalAddedCards.map(c=>c.name));
//     expect(result).not.toBeNull();
// });
