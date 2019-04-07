import { versionsToPriorities } from './deck';

import { getAvailableCards, getCardsForFilters, hasPriorities } from './card';

const partial = require('lodash.partial');
const sortBy = require('lodash.sortby');

// Data init.
const data = require('../../public/resources/data/data.json');

const cards = data[0].content;

// 1. Data tests.
it('Data test #1: Checks how many cards we have.', () => {
  expect(cards.length).toEqual(2003);
});

it('Data test #2:  Checks if the priorities of cards have unique uuids.', () => {
  const duplicateIds = [];
  cards
    .filter(hasPriorities)
    .reduce((versions, card) => versions.concat(card.versions), [])
    .reduce(versionsToPriorities, [])
    .map(priority => priority.id)
    .reduce((uniqueId, priorityId) => {
      // If doesn't exist in array.
      if (uniqueId.indexOf(priorityId) === -1) {
        uniqueId.push(priorityId);
      } else {
        duplicateIds.push(priorityId);
      }
      return uniqueId;
    }, []);

  expect(duplicateIds.length).toEqual(0);
});

it('Data test #3: Checks if all cards have ratings.', () => {
  const result = cards.reduce((sum, card) => (card.rating ? sum + 1 : sum), 0);
  expect(result).toEqual(2003);
});

const prioritiesThatFindNothing = (availableCards, interestingCards, boundary) => interestingCards
  .reduce((versions, card) => versions.concat(card.versions), [])
  .reduce(versionsToPriorities, [])
  .reduce((problematicPriorities, priority) => {
    const check = getCardsForFilters(availableCards, priority.filters, false).length === boundary;
    return check ? problematicPriorities.concat(priority) : problematicPriorities;
  }, []);

const prioritiesUnsatisfiedButNo0 = (availableCards, interestingCards) => interestingCards
  .reduce((versions, card) => versions.concat(card.versions), [])
  .reduce(versionsToPriorities, [])
  .reduce((problematicPriorities, priority) => {
    const maxPossibleNumber = getCardsForFilters(availableCards, priority.filters, false).reduce(
      (maxPossible, c) => {
        if (c.rarity === 'LEGENDARY') return maxPossible + 1;
        return maxPossible + 2;
      },
      0,
    );
    if (maxPossibleNumber !== 0 && maxPossibleNumber < priority.minCards) {
      return problematicPriorities.concat(priority);
    }
    return problematicPriorities;
  }, []);

/**
 * 5 cards in Rise of Shadows
 *
 * Mad Scientist - no secrets,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #4: Keeps track of the Wild Druid-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Druid', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Druid', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(5);
});

/**
 * 17 cards in Rise of Shadows
 *
 * Spiteful Smith - No 1+ weapon,
 * Bloodsail Raider - No 1+ weapon,
 * Dread Corsair - No 1+ weapon,
 * Captain Greenskin - No weapon,
 * Southsea Captain - No 1+ weapon,
 * Hench-Clan Thug - No 1+ weapon,
 * Toxicologist - No 1+ weapon,
 * Dendrologist (Treants) - No Living Mana,
 * Flobbidinous Floop (Malygos) - Twig of the World Tree,
 * Mulchmuncher (Treants) - No Living Man
 * Treespeaker (Treants) - No Living Man
 * Zilliax (Keywords) - No Corpsetaker,
 * Electrowright - No Spiteful Summoner,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #5: Keeps track of the Standard Druid-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Druid', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Druid', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(17);
});

/**
 * 1 cards in Rise of Shadows
 *
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #6: Keeps track of the Wild Hunter-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Hunter', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Hunter', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(1);
});

/**
 * 3 cards in Rise of Shadows
 *
 * Zilliax (Keywords) - No Corpsetaker,
 * Electrowright - No Spiteful Summoner,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #7: Keeps track of the Standard Hunter-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Hunter', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Hunter', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(3);
});

// Shimmering Courser, The Voraxx, Hench-Clan Thug, Southsea Captain,
// Bloodsail Raider, Djinni of Zephyrs, Phantom Freebooter, Spiteful Smith,
// Naga Corsair, Small-Time Buccaneer, Dragonkin Sorcerer, Eydis Darkbane,
// Fjola Lightbane, Dread Corsair, Toxicologist, Gurubashi Chicken
it(`Data test #8: Keeps track of the Wild Mage-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Mage', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Mage', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0, 'MAGE');

  expect(result.length).toEqual(17);
});

// Hench-Clan Thug, The Voraxx, Southsea Captain, Dread Corsair, Bloodsail Raider,
// Shimmering Courser, Phantom Freebooter, Spiteful Smith, Toxicologist, Gurubashi Chicken
it(`Data test #9: Keeps track of the Standard Mage-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Mage', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Mage', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(11);
});

/**
 * 6 cards in Rise of Shadows
 *
 * Malygos (No cheap damage spells)
 * Darkmire Moonkin (No cheap damage spells)
 * Spellzerker (No cheap damage spells)
 * Spellweaver (No cheap damage spells)
 * Azerite Elemental (No cheap damage spells)
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #10: Keeps track of the Wild Paladin-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Paladin', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Paladin', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);
  expect(result.length).toEqual(6);
});

/**
 * 7 cards in Rise of Shadows
 *
 * Malygos (No cheap damage spells)
 * Darkmire Moonkin (No cheap damage spells)
 * Spellzerker (No cheap damage spells)
 * Azerite Elemental (No cheap damage spells)
 * Zilliax (Keywords) - No Corpsetaker,
 * Electrowright - No Spiteful Summoner,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #11: Keeps track of the Standard Paladin-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Paladin', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Paladin', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(7);
});

/**
 * 14 cards in Rise of Shadows
 *
 * Small-Time Buccaneer - No 1+ weapon,
 * Naga Corsair - No 1+ weapon,
 * Spiteful Smith - No 1+ weapon,
 * Phantom Freebooter - No 1+ weapon,
 * Bloodsail Raider - No 1+ weapon,
 * Dread Corsair - No 1+ weapon,
 * Southsea Captain - No 1+ weapon,
 * Hench-Clan Thug - No 1+ weapon,
 * Toxicologist - No 1+ weapon,
 * Mad Scientist - no secrets,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #12: Keeps track of the Wild Priest-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Priest', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Priest', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(14);
});

/**
 * 15 cards in Rise of Shadows
 *
 * Spiteful Smith - No 1+ weapon,
 * Bloodsail Raider - No 1+ weapon,
 * Dread Corsair - No 1+ weapon,
 * Captain Greenskin - No weapons,
 * Southsea Captain - No 1+ weapon,
 * Hench-Clan Thug - No 1+ weapon,
 * Toxicologist - No 1+ weapon,
 * Zilliax (Keywords) - No Corpsetaker,
 * Electrowright - No Spiteful Summoner,
 * Reckless Experimenter (Cube Priest) - No Carnivorous Cube,
 * Zerek's Cloning Gallery (Deathrattles) - No Shadow Visions,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #13: Keeps track of the Standard Priest-Neutral cards
   that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Priest', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Priest', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(15);
});

/**
 * 1 card in Rise of Shadows
 *
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #14: Keeps track of the Wild Rogue-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Rogue', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Rogue', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(1);
});

/**
 * 6 cards in Rise of Shadows
 *
 * Zilliax (Keywords) - No Corpsetaker,
 * Electrowright - No Spiteful Summoner,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #15: Keeps track of the Standard Rogue-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Rogue', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Rogue', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(6);
});

/**
 * 5 cards in Rise of Shadows
 *
 * Mad Scientist - no secrets,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Archmage Vargoth (Some valuable spells)
 */
it(`Data test #16: Keeps track of the Wild Shaman-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Shaman', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Shaman', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(5);
});

/**
 * 6 cards in Rise of Shadows
 *
 * Zilliax (Keywords) - No Corpsetaker,
 * Electrowright - No Spiteful Summoner,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Archmage Vargoth (Some valuable spells)
 */
it(`Data test #17: Keeps track of the Standard Shaman-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Shaman', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Shaman', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(6);
});

/**
 * 15 cards in Rise of Shadows
 *
 * Small-Time Buccaneer - No 1+ weapon,
 * Naga Corsair - No 1+ weapon,
 * Spiteful Smith - No 1+ weapon,
 * Phantom Freebooter - No 1+ weapon,
 * Bloodsail Raider - No 1+ weapon,
 * Dread Corsair - No 1+ weapon,
 * Southsea Captain - No 1+ weapon,
 * Hench-Clan Thug - No 1+ weapon,
 * Toxicologist - No 1+ weapon,
 * Mad Scientist - No secrets,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 * Archmage Vargoth (Some valuable spells)
 */
it(`Data test #18: Keeps track of the Wild Warlock-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Warlock', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Warlock', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(15);
});

/**
 * 18 cards in Rise of Shadows
 *
 * Spiteful Smith - No 1+ weapon,
 * Bloodsail Raider - No 1+ weapon,
 * Dread Corsair - No 1+ weapon,
 * Southsea Captain - No 1+ weapon,
 * Hench-Clan Thug - No 1+ weapon,
 * Toxicologist - No 1+ weapon,
 * Captain Greenskin - No weapon,
 * Duskbat - No Lesser Amethyst Spellstone,
 * Dark Possession - No Lesser Amethyst Spellstone,
 * Deathweb Spider - No Lesser Amethyst Spellstone,
 * Blood Witch - No Lesser Amethyst Spellstone,
 * Zilliax - No Corpsetaker,
 * Electrowright - No Spiteful Summoner,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 * Archmage Vargoth (Some valuable spells)
 */
it(`Data test #19: Keeps track of the Standard Warlock-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Warlock', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Warlock', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(18);
});

/**
 * 5 cards in Rise of Shadows.
 *
 * Mad Scientist - no secrets,
 * Subject 9 - no secrets,
 * Masked Contender - no secrets,
 * Sunreaver Spy - no secrets,
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */
it(`Data test #20: Keeps track of the Wild Warrior-Neutral cards that
    their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Warrior', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Warrior', 'Wild', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(5);
});

/**
 * 8 cards in Rise of Shadows.
 * The Boomship (Finisher) - No Charged Devilsaur,
 * The Boomship (Big Recruit Warrior) - No RECRUIT minions,
 * Zilliax (Keywords) - No Corpsetaker,
 * Electrowright (Big Spell) - Spiteful Summoner,
 * Subject 9 - secrets,
 * Masked Contender - secrets,
 * Sunreaver Spy - secrets
 * Whirlwind Tempest (Windfury(Shaman) & buffs) - Windfury (spell)
 */

it(`Data test #21: Keeps track of the Standard Warrior-Neutral cards
    that their priorities don't find any cards.`, () => {
  const availableCards = getAvailableCards(cards, 'Warrior', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Warrior', 'Standard', true);

  const result = prioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result.length).toEqual(8);
});

// Baku the Mooneater, Genn Greymane, Hench-Clan Thug, Gloom Stag
// Blackwater Pirate, Southsea Captain, Captain Greenskin, Dread Corsair
// Bloodsail Raider, Rummaging Kobold, Reno Jackson, Furnacefire Colossus
// Phantom Freebooter, Spiteful Smith, Aya Blackpaw, Small-Time Buccaneer
// Jade Spirit, Naga Corsair, Jade Behemoth, Toxicologist
it(`Data test #22: Keeps track of the Wild Druid-Neutral cards
    that their priorities are not satisfied but return at least 1 card.`, () => {
  const availableCards = getAvailableCards(cards, 'Druid', 'Wild');
  const interestingCards = getAvailableCards(cards, 'Druid', 'Wild', true);

  const result = prioritiesUnsatisfiedButNo0(availableCards, interestingCards);

  expect(result.length).toEqual(21);
});

/**
 * 4 cards in Rise of Shadows
 *
 * Baku the Mooneater
 * Genn Greymane
 * Gloom Stag
 * Archmage Vargoth (Some valuable spells)
 */
it(`Data test #23: Keeps track of the Standard Druid-Neutral cards
    that their priorities are not satisfied but return at least 1 card.`, () => {
  const availableCards = getAvailableCards(cards, 'Druid', 'Standard');
  const interestingCards = getAvailableCards(cards, 'Druid', 'Standard', true);

  const result = prioritiesUnsatisfiedButNo0(availableCards, interestingCards);

  expect(result.length).toEqual(4);
});

// or more specifically, extract unique property names from an array of objects.
const extractPropertyNames = (uniquePropertyNames, next) => Object.getOwnPropertyNames(next)
  .filter(propertyName => !uniquePropertyNames.includes(propertyName))
  .concat(uniquePropertyNames);
const extractUniqueArrayItems = (uniqueItems, nextItem) => {
  const isInUniqueArray = uniqueItems.includes(nextItem);
  return !isInUniqueArray ? uniqueItems.concat(nextItem) : uniqueItems;
};
const extractUniqueObjectProperties = (property, uniqueProperties, nextObject) => {
  const isInUniqueArray = uniqueProperties.includes(nextObject[property]);
  return !isInUniqueArray ? uniqueProperties.concat(nextObject[property]) : uniqueProperties;
};

const extractUniqueFactions = partial(extractUniqueObjectProperties, 'faction');
const extractUniqueOverloads = partial(extractUniqueObjectProperties, 'overload');
const extractUniqueRaces = partial(extractUniqueObjectProperties, 'race');
const extractUniqueCosts = partial(extractUniqueObjectProperties, 'cost');
const extractUniqueRarities = partial(extractUniqueObjectProperties, 'rarity');
const extractUniqueSets = partial(extractUniqueObjectProperties, 'set');
const extractUniqueRatings = partial(extractUniqueObjectProperties, 'rating');
const extractUniqueTypes = partial(extractUniqueObjectProperties, 'type');

const createArtistStats = (artistStats, nextArtistName) => {
  const artist = artistStats.find(indexedArtist => indexedArtist.name === nextArtistName);
  if (artist) artist.workCount += 1;
  else artistStats.push({ name: nextArtistName, workCount: 1 });

  return artistStats;
};

it('Data test #24: Checks if the unique property number of the card object is 39.', () => {
  const result = cards.reduce(extractPropertyNames, []);
  const expectedResult = [
    'hideStats',
    'armor',
    'faction',
    'entourage',
    'classes',
    'multiClassGroup',
    'collectionText',
    'deckFilters',
    'howToEarn',
    'howToEarnGolden',
    'spellDamage',
    'overload',
    'durability',
    'targetingArrowText',
    'elite',
    'referencedTags',
    'attack',
    'health',
    'race',
    'mechanics',
    'activeVersion',
    'versions',
    'name',
    'artist',
    'cardClass',
    'collectible',
    'cost',
    'dbfId',
    'flavor',
    'id',
    'playRequirements',
    'rarity',
    'set',
    'rating',
    'text',
    'type',
    'extra',
    'imageUrl',
    'tile',
  ];
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(expectedResult.length); // 39
});

it('Data test #25: Checks if the are 2 factions available.', () => {
  const expectedResult = ['ALLIANCE', 'HORDE'];
  const result = cards.filter(card => card.faction).reduce(extractUniqueFactions, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(2);
});

it('Data test #26: Checks if the are 13 options available for the cardClass property.', () => {
  const expectedResult = [
    'MAGE',
    'HUNTER',
    'PRIEST',
    'NEUTRAL',
    'WARLOCK',
    'ROGUE',
    'DRUID',
    'SHAMAN',
    'WARRIOR',
    'PALADIN',
    'HUNTER PALADIN WARRIOR',
    'MAGE PRIEST WARLOCK',
    'DRUID ROGUE SHAMAN',
  ];
  const result = cards.map(card => card.cardClass.join(' ')).reduce(extractUniqueArrayItems, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(13);
});

it('Data test #27: Checks if the are 3 options available for the overload property.', () => {
  const expectedResult = [1, 2, 3];
  const result = cards.filter(card => card.overload).reduce(extractUniqueOverloads, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(3);
});

it('Data test #28: Checks if the are 22 options available for the referencedTags property.', () => {
  const expectedResult = [
    'SPELLPOWER',
    'CHARGE',
    'TAUNT',
    'STEALTH',
    'IMMUNE',
    'DIVINE_SHIELD',
    'SECRET',
    'WINDFURY',
    'SILENCE',
    'BATTLECRY',
    'OVERLOAD',
    'FREEZE',
    'JADE_GOLEM',
    'DISCOVER',
    'CHOOSE_ONE',
    'DEATHRATTLE',
    'COUNTER',
    'POISONOUS',
    'LIFESTEAL',
    'RECRUIT',
    'ADAPT',
    'COMBO',
    'RUSH',
    'GEARS',
    'MODULAR',
  ];
  const result = cards
    .filter(card => card.referencedTags)
    .reduce((allReferencedTags, nextCard) => allReferencedTags.concat(nextCard.referencedTags), [])
    .reduce(extractUniqueArrayItems, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(25);
});

it('Data test #29: Checks if the are 41 options available for the mechanics property.', () => {
  const expectedResult = [
    'SECRET',
    'RECEIVES_DOUBLE_SPELLDAMAGE_BONUS',
    'INSPIRE',
    'BATTLECRY',
    'DEATHRATTLE',
    'InvisibleDeathrattle',
    'COMBO',
    'CHOOSE_ONE',
    'AURA',
    'OVERLOAD',
    'TAUNT',
    'CHARGE',
    'DIVINE_SHIELD',
    'FORGETFUL',
    'SPELLPOWER',
    'STEALTH',
    'CANT_ATTACK',
    'TOPDECK',
    'WINDFURY',
    'JADE_GOLEM',
    'LIFESTEAL',
    'DISCOVER',
    'FREEZE',
    'ENRAGED',
    'ADJACENT_BUFF',
    'POISONOUS',
    'SILENCE',
    'ImmuneToSpellpower',
    'CANT_BE_TARGETED_BY_SPELLS',
    'CANT_BE_TARGETED_BY_HERO_POWERS',
    'DEATH_KNIGHT',
    'RITUAL',
    'QUEST',
    'RUSH',
    'ECHO',
    'MODULAR',
    'AFFECTED_BY_SPELL_POWER',
    'TRIGGER_VISUAL',
    'FINISH_ATTACK_SPELL_ON_DAMAGE',
    'TWINSPELL',
    'MULTIPLY_BUFF_VALUE',
  ];
  const result = cards
    .filter(card => card.mechanics)
    .reduce((allMechanics, nextCard) => allMechanics.concat(nextCard.mechanics), [])
    .reduce(extractUniqueArrayItems, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(41);
});

it('Data test #30: Checks if the are 10 options available for the race property.', () => {
  const expectedResult = [
    ' ',
    'DRAGON',
    'DEMON',
    'PIRATE',
    'BEAST',
    'TOTEM',
    'MURLOC',
    'ELEMENTAL',
    'MECHANICAL',
    'ALL',
  ];
  const result = cards.filter(card => card.race).reduce(extractUniqueRaces, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(10);
});

it('Data test #31: Creates stats for the artists LOL', () => {
  const result = sortBy(cards.map(card => card.artist).reduce(createArtistStats, []), 'workCount');
  expect(result.length).toEqual(340);
});

it('Data test #32: Checks if the are 15 options available for the cost property.', () => {
  const expectedResult = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 25];
  const result = cards.reduce(extractUniqueCosts, []).sort((a, b) => a - b);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(15);
});

// TODO play requirements

it('Data test #34: Checks if the are 5 options available for the rarity property.', () => {
  const expectedResult = ['COMMON', 'RARE', 'EPIC', 'LEGENDARY', 'FREE'];
  const result = cards.reduce(extractUniqueRarities, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(5);
});

it('Data test #35: Checks if the are 18 options available for the set property.', () => {
  const expectedResult = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 98, 99];
  const result = cards.reduce(extractUniqueSets, []).sort((a, b) => a - b);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(18);
});

it('Data test #36: Checks if the are 4 options available for the rating property.', () => {
  const expectedResult = [1, 2, 3, 4];
  const result = cards.reduce(extractUniqueRatings, []).sort((a, b) => a - b);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(4);
});

it('Data test #37: Checks if the are 4 options available for the type property.', () => {
  const expectedResult = ['SPELL', 'MINION', 'WEAPON', 'HERO'];
  const result = cards.reduce(extractUniqueTypes, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(4);
});

it('Data test #38: Checks if the are 15 options available for the extra property.', () => {
  const expectedResult = [
    'HARD_REMOVAL',
    'SECRET',
    'SMALL_REMOVAL',
    'FAST',
    'TEMPO',
    'GENERAL',
    'VALUE',
    'MIN_GEN',
    'DAMAGE',
    'BUFF',
    'HEAL',
    'CARD_DRAW',
    'AOE',
    'STALL',
    '',
  ];
  const result = cards
    .reduce((allExtras, nextCard) => allExtras.concat(nextCard.extra), [])
    .reduce(extractUniqueArrayItems, []);
  expect(result).toEqual(expectedResult);
  expect(result.length).toEqual(15);
});

it('Data test #39: Checks if each expansion has the expected number of cards.', () => {
  const HOF = cards.filter(card => card.set === 0);
  const NAX = cards.filter(card => card.set === 1);
  const GVG = cards.filter(card => card.set === 2);
  const BRM = cards.filter(card => card.set === 3);
  const TGT = cards.filter(card => card.set === 4);
  const LOE = cards.filter(card => card.set === 5);
  const WOG = cards.filter(card => card.set === 6);
  const KAR = cards.filter(card => card.set === 7);
  const MSG = cards.filter(card => card.set === 8);
  const UNG = cards.filter(card => card.set === 9);
  const KFT = cards.filter(card => card.set === 10);
  const KNC = cards.filter(card => card.set === 11);
  const TWW = cards.filter(card => card.set === 12);
  const CLA = cards.filter(card => card.set === 98);
  const BAS = cards.filter(card => card.set === 99);
  expect(HOF.length).toEqual(13);
  expect(NAX.length).toEqual(30);
  expect(GVG.length).toEqual(123);
  expect(BRM.length).toEqual(31);
  expect(TGT.length).toEqual(132);
  expect(LOE.length).toEqual(45);
  expect(WOG.length).toEqual(134);
  expect(KAR.length).toEqual(45);
  expect(MSG.length).toEqual(132);
  expect(UNG.length).toEqual(135);
  expect(KFT.length).toEqual(135);
  expect(KNC.length).toEqual(135);
  expect(TWW.length).toEqual(135);
  expect(CLA.length).toEqual(240);
  expect(BAS.length).toEqual(133);
});
