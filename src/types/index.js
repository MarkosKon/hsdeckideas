// @flow

export type CardType = {
  name: string,
  artist: string,
  cardClass: string,
  collectible: boolean,
  cost: number,
  dbfId: number,
  flavor: string,
  id: string,
  mechanics: string,
  playRequirements: Object, // to generic?
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

export type FilterType = {
  property: string,
  operation: string,
  minValue: number | string | Array<string>,
  maxValue?: number | string | Array<string>,
  initiatorName?: string,
};
