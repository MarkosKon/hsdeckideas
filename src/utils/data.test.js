import {
  getManaCurve,
  extractPriorities,
  addCardsByPriority
} from "./deckUtils";

import { getAvailableCards, getCardsForFilters } from "./cardUtils";

// Data init.
const data = require("../../public/resources/data/data.json");
const cards = data[0].content;
const heroPowers = data[3].content;

// 1. Data tests.
it("Data test #1: Checks how many cards we have.", () => {
  expect(cards.length).toEqual(1594);
});

it("Data test #2:  Checks if the priorities of cards have unique uuids.", () => {
  let duplicateIds = [];
  let result = cards
    .filter(c => c.priorities) // filter cards w priorities.
    .reduce((priorityIds, c) => {
      return priorityIds.concat(c.priorities.map(p => p.id));
    }, [])
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

it("Data test #3: Checks if all cards have ratings.", () => {
  let result = cards.reduce((sum, card) => {
    return card.rating ? (sum += 1) : sum;
  }, 0);
  expect(result).toEqual(1594);
});

const cardCountWPrioritiesThatFindNothing = (availableCards, interestingCards, boundary) => {
    return interestingCards
            .reduce((priorityArray, card) => {
                if (card.priorities) {
                    card.priorities.forEach(priority => {
                        priorityArray.push(priority);
                    });
                }
                return priorityArray;
            }, [])
            .reduce((shitCardCount, priority) => {
                if(getCardsForFilters(availableCards, priority.filters).length === boundary) {
                    // console.log(priority.id);
                    shitCardCount++;
                }
                return shitCardCount;
            }, 0);
};

const cardCountWithUnsatisfiedPrioritiesButNot0 = (availableCards, interestingCards) => {
    return interestingCards
            .reduce((priorityArray, card) => {
                if (card.priorities) {
                    card.priorities.forEach(priority => {
                        priorityArray.push(priority);
                    });
                }
                return priorityArray;
            }, [])
            .reduce((shitCardCount, priority) => {
                let maxPossibleNumber 
                    = getCardsForFilters(availableCards, priority.filters)
                        .reduce((maxPossible, c) => {
                            if (c.rarity === "LEGENDARY") {
                                maxPossible++;
                            } else {
                                maxPossible+=2;
                            }
                            return maxPossible;
                        }, 0);
                if(maxPossibleNumber !== 0 && maxPossibleNumber < priority.minCards) {
                    // console.log(priority.id);
                    shitCardCount++;
                }
                return shitCardCount;
            }, 0);
};

// Mad scientist
it("Data test #4: Keeps track of the Wild Druid-Neutral cards that their priorities don't find any cards.", () => {
  const availableCards = getAvailableCards(cards, "Druid", "Wild"); 
  const interestingCards = getAvailableCards(cards, "Druid", "Wild", true); 

  const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);

  expect(result).toEqual(1); 
});

// Twig of the World Tree
it("Data test #5: Keeps track of the Standard Druid-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Druid", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Druid", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(1); 
});

it("Data test #6: Keeps track of the Wild Hunter-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Hunter", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Hunter", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(0); 
});

// The Voraxx, Shimmering Courser
it("Data test #7: Keeps track of the Standard Hunter-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Hunter", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Hunter", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(2); 
});

// Shimmering Courser, The Voraxx, Hench-Clan Thug, Southsea Captain,  
// Bloodsail Raider, Djinni of Zephyrs, Phantom Freebooter, Spiteful Smith,
// Naga Corsair, Small-Time Buccaneer, Dragonkin Sorcerer, Eydis Darkbane, 
// Fjola Lightbane, Dread Corsair
it("Data test #8: Keeps track of the Wild Mage-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Mage", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Mage", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(14); 
});

// Hench-Clan Thug, The Voraxx, Southsea Captain, Dread Corsair, Bloodsail Raider,
// Shimmering Courser, Phantom Freebooter, Spiteful Smith
it("Data test #9: Keeps track of the Standard Mage-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Mage", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Mage", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(8); 
});

// Darkmire Moonkin, Malygos, Spellweaver
it("Data test #10: Keeps track of the Wild Paladin-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Paladin", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Paladin", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(3); 
});

// Darkmire Moonkin, Val'anyr, Spellweaver, Malygos
it("Data test #11: Keeps track of the Standard Paladin-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Paladin", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Paladin", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(4); 
});

// Hench-Clan Thug, Southsea Captain, Dread Corsair, Bloodsail Raider
// Phantom Freebooter, Mad Scientist, Spiteful Smith, Naga Corsair
// Small-Time Buccaneer
it("Data test #12: Keeps track of the Wild Priest-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Priest", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Priest", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(9); 
});

// Hench-Clan Thug, Southsea Captain, Dread Corsair, Bloodsail Raider
// Phantom Freebooter, Spiteful Smith
it("Data test #13: Keeps track of the Standard Priest-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Priest", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Priest", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(6); 
});

it("Data test #14: Keeps track of the Wild Rogue-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Rogue", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Rogue", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(0); 
});

// Obsidian Shard (Ethereal Peddler)
it("Data test #15: Keeps track of the Standard Rogue-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Rogue", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Rogue", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(1); 
});

// Mad Scientist
it("Data test #16: Keeps track of the Wild Shaman-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Shaman", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Shaman", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(1); 
});

// Unite the Murlocs (Call in the Finishers)
it("Data test #17: Keeps track of the Standard Shaman-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Shaman", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Shaman", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(1); 
});

// Hench-Clan Thug, The Voraxx, Southsea Captain, Dread Corsair,
//  Bloodsail Raider, Shimmering Courser, Djinni of Zephyrs, Phantom Freebooter
// Mad Scientist, Spiteful Smith, Naga Corsair, Small-Time Buccaneer
// Dragonkin Sorcerer, Eydis Darkbane, Fjola Lightbane
it("Data test #18: Keeps track of the Wild Warlock-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Warlock", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Warlock", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(15); 
});

// Hench-Clan Thug, The Voraxx, Southsea Captain, Dread Corsair
// Bloodsail Raider, Shimmering Courser, Sanguine Reveler, Phantom Freebooter
// Spiteful Smith
it("Data test #19: Keeps track of the Standard Warlock-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Warlock", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Warlock", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(8); 
});

// Mad Scientist
it("Data test #20: Keeps track of the Wild Warrior-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Warrior", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Warrior", "Wild", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(1); 
});

it("Data test #21: Keeps track of the Standard Warrior-Neutral cards that their priorities don't find any cards.", () => {
    const availableCards = getAvailableCards(cards, "Warrior", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Warrior", "Standard", true); 
  
    const result = cardCountWPrioritiesThatFindNothing(availableCards, interestingCards, 0);
  
    expect(result).toEqual(0); 
});

// Baku the Mooneater, Genn Greymane, Hench-Clan Thug, Gloom Stag
// Blackwater Pirate, Southsea Captain, Captain Greenskin, Dread Corsair
// Bloodsail Raider, Rummaging Kobold, Reno Jackson, Furnacefire Colossus
// Phantom Freebooter, Spiteful Smith, Aya Blackpaw, Small-Time Buccaneer
// Jade Spirit, Naga Corsair, Jade Behemoth
it("Data test #22: Keeps track of the Wild Druid-Neutral cards that their priorities are not satisfied but return at least 1 card.", () => {
    const availableCards = getAvailableCards(cards, "Druid", "Wild"); 
    const interestingCards = getAvailableCards(cards, "Druid", "Wild", true); 
  
    const result = cardCountWithUnsatisfiedPrioritiesButNot0(availableCards, interestingCards);
  
    expect(result).toEqual(19); 
});

// Baku the Mooneater, Genn Greymane, Scaleworm, Hench-Clan Thug
// Wyrmguard, Gloom Stag, Ravasaur Runt, Southsea Captain
// Captain Greenskin, Dread Corsair, Bloodsail Raider, Rummaging Kobold
// Furnacefire Colossus, Phantom Freebooter, Savagery, Spiteful Smith
it("Data test #23: Keeps track of the Standard Druid-Neutral cards that their priorities are not satisfied but return at least 1 card.", () => {
    const availableCards = getAvailableCards(cards, "Druid", "Standard"); 
    const interestingCards = getAvailableCards(cards, "Druid", "Standard", true); 
  
    const result = cardCountWithUnsatisfiedPrioritiesButNot0(availableCards, interestingCards);
  
    expect(result).toEqual(16); 
});