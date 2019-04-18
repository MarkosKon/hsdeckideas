// @flow

type Card = {
  name: string,
  artist: string,
  cardClass: string,
  collectible: boolean,
  cost: number,
  dbfId: number,
  flavor: string,
  id: string,
  mechanics: string,
  playRequirements: Object, // too generic?
  rarity: string,
  set: number,
  rating: number,
  text: string,
  type: string,
  extra: string,
  imageUrl: string,
  tile: string,
  activeVersion: number,
  versions: Object, // too generic?
  attack: number,
  elite: boolean,
  health: number,
  race: string,
  howToEarn: string,
  howToEarnGolden: string,
  entourage: string,
  faction: string,
  referencedTags: string,
  spellDamage: number,
  deckFilters: Array<Object>, // too generic?
  targetingArrowText: string,
  durability: number,
  overload: number,
  armor: number,
  collectionText: string,
  classes: string,
  multiClassGroup: string,
  hideStats: boolean,
  quantity: number,
};

type Filter = {
  property: string,
  operation: string,
  minValue: number | string | Array<string>,
  maxValue?: number | string | Array<string>,
  initiatorName?: string,
};

type Priority = {};

type Step = {
  deckWideFilters: Array<Object>, // too generic?
  extra: string,
  originCards: Array<Card>,
  otherCards: Array<Card>,
  priorities: Array<Priority>,
  prioritiesInfo: Array<Object>, // too generic?,
  sizeBefore: number,
  totalAddedCards: Array<Card>,
};

type Archetype = {};
type Deck = {
  archetype: Archetype,
  cards: Array<Card>,
  hero: string,
  heroPower: Object,
  history: {
    steps: Array<Step>,
    totalDeckFiltersExamined: Array<Filter>,
    totalPrioritiesExamined: Array<Priority>,
  },
  isCompetitive: boolean,
  isHighlander: boolean,
  score: number,
  size: number,
  totalDust: number,
};

export type {
  Card, Filter, Step, Deck,
};
