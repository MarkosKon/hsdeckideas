export const cardProperties = [
  { value: 'activeVersion', label: 'Active version' },
  { value: 'armor', label: 'Armor' },
  { value: 'artist', label: 'Artist' },
  { value: 'attack', label: 'Attack' },
  { value: 'cardClass', label: 'Card class' },
  { value: 'classes', label: 'Classes' },
  { value: 'collectible', label: 'Collectible' },
  { value: 'collectionText', label: 'Collection text' },
  { value: 'cost', label: 'Cost' },
  { value: 'dbfId', label: 'DbfId' },
  { value: 'deckFilters', label: 'Deck filters' },
  { value: 'durability', label: 'Durability' },
  { value: 'elite', label: 'Elite' },
  { value: 'entourage', label: 'Entourage' },
  { value: 'extra', label: 'Extra' },
  { value: 'faction', label: 'Faction' },
  { value: 'flavor', label: 'Flavor' },
  { value: 'health', label: 'Health' },
  { value: 'hideStats', label: 'Hide stats' },
  { value: 'howToEarn', label: 'How to earn' },
  { value: 'howToEarnGolden', label: 'How to earn golden' },
  { value: 'id', label: 'Id' },
  { value: 'imageUrl', label: 'Image URL' },
  { value: 'mechanics', label: 'Mechanics' },
  { value: 'multiClassGroup', label: 'Multi-class group' },
  { value: 'name', label: 'Name' },
  { value: 'overload', label: 'Overload' },
  { value: 'playRequirements', label: 'Play requirements' },
  { value: 'race', label: 'Race' },
  { value: 'rarity', label: 'Rarity' },
  { value: 'rating', label: 'Rating' },
  { value: 'referencedTags', label: 'Referenced tags' },
  { value: 'set', label: 'Set' },
  { value: 'spellDamage', label: 'Spell-damage' },
  { value: 'targetingArrowText', label: 'Targeting arrow text' },
  { value: 'text', label: 'Text' },
  { value: 'tile', label: 'Tile' },
  { value: 'type', label: 'Type' },
  { value: 'versions', label: 'Versions' },
];

export const cardExtra = [
  { value: 'AOE', label: 'AOE' },
  { value: 'BUFF', label: 'Buff' },
  { value: 'CARD_DRAW', label: 'Card draw' },
  { value: 'DAMAGE', label: 'Damage' },
  { value: 'FAST', label: 'Fast' },
  { value: 'GENERAL', label: 'General' },
  { value: 'HARD_REMOVAL', label: 'Hard removal' },
  { value: 'HEAL', label: 'Heal' },
  { value: 'MIN_GEN', label: 'Generates minions' },
  { value: 'SECRET', label: 'Secret' },
  { value: 'SMALL_REMOVAL', label: 'Small removal' },
  { value: 'STALL', label: 'Stall' },
  { value: 'TEMPO', label: 'Tempo' },
  { value: 'VALUE', label: 'Value' },
];

// const orderBy = require('lodash.orderby')
export const operations = [
  { value: 'EQUALS', label: 'Equals' },
  { value: 'GREATER_THAN', label: 'Greater than' },
  { value: 'HIGH_HEALTH_MINION', label: 'High health minion' },
  { value: 'HIGHLANDER', label: 'Highlander' },
  { value: 'INCLUDES', label: 'Includes' },
  { value: 'IS_EVEN', label: 'Is even' },
  { value: 'IS_INCLUDED_IN', label: 'Is included in' },
  { value: 'IS_ODD', label: 'Is odd' },
  { value: 'IS_UNDEFINED', label: 'Is undefined' },
  { value: 'LESS_THAN', label: 'Less than' },
  { value: 'MATCH', label: 'Match' },
  { value: 'MATCH_CASE_SENSITIVE', label: 'Match---case-sensitive' },
  { value: 'NOT_EQUALS', label: 'Not equals' },
  { value: 'NOT_INCLUDED_IN', label: 'Not included in' },
  { value: 'NOT_INCLUDES', label: 'Not includes' },
  { value: 'NOT_MATCH', label: 'Not match' },
];

// console.log(orderBy(operations, 'label'))