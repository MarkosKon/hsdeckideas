/*  
    1. Themes are an idea or a set of cards that when combined 
       together define a deck. E.g. if i have 10 cards with
       the keyword Jade in a Druid deck i play a Jade Druid.

    2. There are: 
        (23) Druid themes (double taunt, beast).
        (15) Hunter themes (double beast).
        (19) Mage themes (double spellpower).
        (23) Paladin themes (double divine shield).
        (18) Priest themes (double silence).
        (21) Rogue themes (double stealth, deathrattle). 
        (23) Shaman themes (double windfury, battlecry).
        (16) Warlock themes.
        (18) Warrior themes (double charge).

        () Generic themes.

    3. Expansion number-name table follows:

        0  : Curse of Naxxramas, Hall of fame.           
        1  : Goblins vs. Gnomes.           
        2  : Blackrock Mountain.           
        3  : The Grand Tournament.         
        4  : League of Explorers.          
        5  : Whispers of the Old Gods.     
        6  : One Night in Karazhan.        
        7  : Mean Streets of Gadgetzan.    
        8  : Journey to Un'Goro.           
        9  : Knights of the Frozen Throne. 
        10 : Kobolds & Catacombs.
        99 : Basic-Classic.

    4. Max (6) sample + extra cards.

    TODO more than one card.
    TODO Life tap? Meaning will the hearthstone api retrieve life tap as a card?
    TODO They are class specific. Meaning one turn kill or buff cards are class specific and they are in general.
*/
export const deckThemes = [
  /* Druid themes.*/
  [
    {
      /* (1) */
      name: "Savagery",
      description: `Basically remove a minion with a spell like Claw or Savage Roar and then remove another one 
        for 1 mana (Savagery). `,
      sampleCards: ["Savagery", "Claw", "Savage Combatant"],
      decklistExtra: ["Bite", "Gnash", "Feral Rage"],
      expansion: "3"
    },
    {
      /* (2) DOUBLE STANDARD*/
      name: "Savagery",
      description: `Basically remove a minion with a spell like Claw or Savage Roar and then remove another one 
      for 1 mana (Savagery). `,
      sampleCards: ["Savagery", "Claw", "Gnash"],
      decklistExtra: ["Bite"],
      expansion: "9"
    },
    {
      /* (3) */
      name: "Ramp",
      description: `Druid has the unique ability to cheat the curve with cards like Wild Growth and Innervate. `,
      sampleCards: ["Wild Growth", "Nourish", "Innervate"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (4) */
      name: "Heal",
      description:
        "Druid has some decent heal spells like Healing Touch and Tree of Life. Heal baby heal. ",
      sampleCards: ["Healing Touch", "Tree of Life", "Antique Healbot"],
      decklistExtra: ["Moonglade Portal", "Cult Apothecary"],
      expansion: "1"
    },
    {
      /* (5) */
      name: "Poison Seeds",
      description: `Can be used as mass a polymorph or can upgrade your 1/1 and trigger their
      deathrattles. You will probably want to do both.`,
      sampleCards: ["Poison Seeds", "Starfall", "Soul of the Forest"],
      decklistExtra: ["Evolving Spores", "Mark of the Lotus"],
      expansion: "0"
    },
    {
      /* (6) */
      name: "Costs(x) less",
      description: `Blackrock mountain expansion introduced cards that get cheeper while minions
      die and they are in your hand. Can be played for a swing turn.`,
      sampleCards: ["Volcanic Lumberer", "Volcanic Drake", "Corridor Creeper"],
      decklistExtra: ["Lunar Visions"],
      expansion: "2"
    },
    {
      /* (7) */
      name: "Tree of Life",
      description: `A bad card that in the best case scenario can be used as a Reno Jackson and
      a full heal for your big minions.`,
      sampleCards: ["Tree of Life", "Ysera", "Malygos"],
      decklistExtra: ["Wild Growth", "Ancient of War"],
      expansion: "1"
    },
    {
      /* (8) GENERAL ALSO*/
      name: "Taunt",
      description: `Taunt minions generally have poor stats for their cost and leave you behind in tempo. 
      Their advantage is that they can keep you alive against aggresive decks or force bad trades. `,
      sampleCards: ["Druid of the Claw", "Ancient of War", "Sunwalker"],
      decklistExtra: ["Cenarius", "Ironbark Protector"],
      expansion: "99"
    },
    {
      /* (9) GENERAL ALSO, DOUBLE WILD*/
      name: "Beast",
      description: `This archetype is mostly suited for Druid and Hunter. Other than that, there are 
      powerful common beasts that let you build a decent deck if you want to be gimmicky. `,
      sampleCards: ["Mounted Raptor", "Wildwalker", "Haunted Creeper"],
      decklistExtra: ["Menagerie Warden"],
      expansion: "0"
    },
    {
      /* (10) GENERAL ALSO, DOUBLE STANDARD*/
      name: "Beast",
      description: `This archetype is mostly suited for Druid and Hunter. Other than that, there are 
      powerful common beasts that let you build a decent deck if you want to be gimmicky. `,
      sampleCards: ["Giant Anaconda", "Grizzled Guardian", "Hadronox"],
      decklistExtra: ["Arfus", "Stegodon"],
      expansion: "8"
    },
    {
      /* (11) */
      name: "Astral Communion",
      description: `A powerful card that leaves behind in tempo but allows you to play only big 
      minions. It's good if you have card draw.`,
      sampleCards: ["Astral Communion", "Nourish", "Lunar Visions"],
      decklistExtra: [
        "Ultimate Infestasion",
        "The Lich King",
        "Y'Shaarj, Rage Unbound"
      ],
      expansion: "3"
    },
    {
      /* (12) */
      name: "Soul of the Forest",
      description: `It's a mass buff for your minion that is suited for token decks. 
      The catch here is that doesn't make your board more threating but more resistant to AOE damage.`,
      sampleCards: ["Soul of the Forest", "Power of the Wild", "Living Mana"],
      decklistExtra: ["Mark of the Lotus", "Force of Nature"],
      expansion: "7"
    },
    {
      /* (13) */
      name: "Aviana",
      description: `A really good card that can either be a 1 mana 5/5 at turn 10,
                          or a combo enabler especially if you combine it with Kun.`,
      sampleCards: ["Aviana", "Kun the Forgotten King", "Ultimate Infestasion"],
      decklistExtra: ["Y'Shaarj, Rage Unbound", "Ysera"],
      expansion: "3"
    },
    {
      /* (14) */
      name: "Choose both!",
      description: `Obviously Fandral is the card that makes this deck theme possible. 
                          Almost every competitive Druid deck makes use of this theme.`,
      sampleCards: ["Fandral Staghelm", "Nourish", "Wrath"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (15) */
      name: "Jade",
      description: `There is already a well defined Jade Druid deck, but you may
                          come up with something better.`,
      sampleCards: ["Jade Idol", "Jade Behemoth", "Jade Spirit"],
      decklistExtra: ["Aya Blackpaw", "Jade Blossom"],
      expansion: "7"
    },
    {
      /* (16) GENERAL ALSO */
      name: "Token",
      description: `Druid no matter the expansion it seems he can always built a
                          decent token deck.`,
      sampleCards: ["Power of the Wild", "Violet Teacher", "Mark of the Lotus"],
      decklistExtra: ["Living Mana"],
      expansion: "7"
    },
    {
      /* (17) */
      name: "Pilfered Power",
      description: `This card wants you to have a weird game plan. You want to have some
                          early game token style minions, play the card and then because of the
                          quick ramp play late game minions. Not a very solid strategy.`,
      sampleCards: ["Pilfered Power", "Patches the Pirate", "Fire Fly"],
      decklistExtra: ["Bloodsail Corsair", "The Lich King"],
      expansion: "7"
    },
    {
      /* (18) */
      name: "Quest",
      description: `Cards like Cursed Disciple and Giant Anaconda make the completion of this
      quest easier. You'll probably need card after that.`,
      sampleCards: ["Jungle Giants", "Giant Anaconda", "Cursed Disciple"],
      decklistExtra: ["Ultimate Infestasion", "Kun the Forgotten King"],
      expansion: "8"
    },
    {
      /* (19) */
      name: "Hadronox",
      description: `It's a slow card but the effect is comparable to N'Zoth or Bloodreaver Gul'dan`,
      sampleCards: ["Hadronox", "Druid of the Claw", "The Lich King"],
      decklistExtra: ["Primordial Drake"],
      expansion: "8"
    },
    {
      /* (20) GENERAL ALSO */
      name: "Recruit",
      description: `Druid has a recruit theme centered around 4 cost minions. Can be used in 
      many different ways.`,
      sampleCards: ["Oaken Summons", "Grizzled Guardian", "Astral Tiger"],
      decklistExtra: ["Violet Teacher", "Fandral Staghelm", "Ironwood Golem"],
      expansion: "10"
    },
    {
      /* (21) */
      name: "Armor",
      description: `Druid was always the second armor class after Warrior but now he got a 
      lot of extra tools and can be considered as the class that utilizes armor the most.`,
      sampleCards: [
        "Branching Paths",
        "Oaken Summons",
        "Lesser Jasper Spellstone"
      ],
      decklistExtra: ["Barkskin"],
      expansion: "10"
    },
    {
      /* (22) DOUBLE STANDARD */
      name: "Buff",
      description: `This theme allows you to transform regular minions into big threats.
      The bad thing is that you must always have a minion on the board.`,
      sampleCards: ["Mark of the Wild", "Mark of Nature", "Barkskin"],
      decklistExtra: ["Branching Paths", "Mark of Y'Shaarj"],
      expansion: "10"
    },
    {
      /* (23) DOUBLE WILD */
      name: "Buff",
      description: `This theme allows you to transform regular minions into big threats.
      The bad thing is that you must always have a minion on the board.`,
      sampleCards: ["Mark of the Wild", "Dark Wispers", "Barkskin"],
      decklistExtra: ["Branching Paths", "Mark of Y'Shaarj"],
      expansion: "10"
    },
    {
      /* (24) */
      name: "Druids",
      description: `Inception.`,
      sampleCards: ["Druid of the Saber", "Druid of the Swarm", "Druid of the Claw"],
      decklistExtra: ["Druid of the Fang", "Druid of the Flame", "Enchanted Raven"],
      expansion: "1"
    },
    {
      /* (25) */
      name: "Ancient",
      description: `In this theme you'll find really old guys and trees.`,
      sampleCards: ["Ancient of War", "Ancient of Lore", "Ancient of Blossoms"],
      decklistExtra: ["Forbidden Ancient", "Ancient Brewmaster", "Wild Growth"],
      expansion: "1"
    },
    {
      /* (26) */
      name: "Wisp",
      description: ``,
      sampleCards: ["Wisp", "Dark Wispers", "Wisps of the Old Gods"],
      decklistExtra: ["Power of the Wild", "Fandral Staghelm", "Mark of the Lotus"],
      expansion: "1"
    }
  ],

  /* Hunter themes.*/
  [
    {
      /* 1) */
      name: "Pirate",
      description: `Pirate is a minion tag that is not as expensive as others, meaning that
      they usually have good stats for their mana cost. If play a class with weapons or throw
       patches in, you have a decent deck.`,
      sampleCards: ["Bloodsail Raider", "Eaglehorn Bow", "Southsea Deckhand"],
      decklistExtra: [
        "Southesea Captain",
        "Captain Greenskin",
        "Patches the Pirate"
      ],
      expansion: "99"
    },
    {
      /* 2) */
      name: "Feign Death",
      description: `A powerful effect that requires you to build a deck around deathrattle minions.
      Not a really good card if you don't have a board.`,
      sampleCards: ["Feign Death", "Nerubian Egg", "Terrorscale Stalker"],
      decklistExtra: ["Sylvanas Wilnrunner", "Twilight Summoner"],
      expansion: "0"
    },
    {
      /* 3) */
      name: "Secret",
      description: `Secrets in Hunter cost 2 mana and are a staple in any Hunter deck because of
       the Eaglehorn Bow.`,
      sampleCards: ["Freezing Trap", "Wandering Monster", "Snake Trap"],
      decklistExtra: ["Lesser Emerald Spellstone", "Eaglehorn Bow"],
      expansion: "10"
    },
    {
      /* 4) */
      name: "Weapon",
      description: `Weapons are mainly considered as tempo removals if you have the life to 
      spare. Other weapons can have unique, deck defining effects but in this case they lose you 
      tempo. `,
      sampleCards: ["Eaglehorn Bow", "Captain Greenskin", "Candleshot"],
      decklistExtra: ["Bloodsail Raider", "Naga Corsair"],
      expansion: "10"
    },
    {
      /* 5) */
      name: "Empty hand",
      description: `The title is self explanatory. You play your hand quickly and get some
      extra benefits.`,
      sampleCards: ["Quick Shot", "Core Rager", "Brave Archer"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* 6) */
      name: "Call Pet",
      description: `The cost reduction can enable some sweet combos. To be worth it you need
      at least half your deck to be beasts and especially high cost beasts.`,
      sampleCards: ["Call Pet", "Tundra Rhino", "Savannah Highmane"],
      decklistExtra: ["Giant Sand Worm", "Dispatch Kodo", "Bearshark"],
      expansion: "1"
    },
    {
      /* 7) GENERAL ALSO */
      name: "Beast",
      description: `This archetype is mostly suited for Druid and Hunter. Other than that, there are 
      powerful common beasts that let you build a decent deck if you want to be gimmicky. `,
      sampleCards: ["Houndmaster", "Animal Companion", "Savannah Highmane"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* 8) */
      name: "Lock and Load",
      description: `A theme that has a lot of meme potential.`,
      sampleCards: ["Lock and Load", "Tracking", "Hunter's Mark"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* 9) */
      name: "Ball of Spiders",
      description: `A bad value card. `,
      sampleCards: ["Ball of Spiders", "Infest", "Alleycat"],
      decklistExtra: ["Houndmaster"],
      expansion: "3"
    },
    {
      /* 10) */
      name: "Handbuff",
      description: `Many handbuff cards seem good on paper but in practice they are too slow.
      In addition they may land in the wrong minions or you maybe don't have any minios in
      your hand.`,
      sampleCards: ["Shaky Zipgunner", "Dispatch Kodo", "Trogg Beastrager"],
      decklistExtra: ["Smuggler's Crate", "Rat Pack"],
      expansion: "7"
    },
    {
      /* 11) */
      name: "Stampede",
      description: `It's similar to Lock and Load. They are both used in meme decks.`,
      sampleCards: ["Stampede", "Snowflipper Penguin", "Jeweled Macaw"],
      decklistExtra: ["Alleycat"],
      expansion: "8"
    },
    {
      /* 12) */
      name: "Quest",
      description: `A mediocre quest.`,
      sampleCards: ["The Marsh Queen", "Fire Fly", "Tol'vir Warden"],
      decklistExtra: ["Jeweled Macaw", "Alleycat", "Tundra Rhino"],
      expansion: "8"
    },
    {
      /* 13) */
      name: "Professor Putricide",
      description: `Has potential, but keep in mind that he you could give a quest you intend
      to play next. Mad scientist is still better.`,
      sampleCards: [
        "Professor Putricide",
        "Venomstrike Trap",
        "Wandering Monster"
      ],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 14) */
      name: "Spell hunter",
      description: `This theme was considered as a meme when it first came out but has
      proven that is more than that.`,
      sampleCards: ["Lesser Emerald Spellstone", "To My Side!", "Rhok'delar"],
      decklistExtra: ["Wandering Monster", "Explosive Trap"],
      expansion: "10"
    },
    {
      /* 15) */
      name: "Recruit",
      description: `The Hunter recruit deck depends on Kathrena Winterwisp and the combos
      that brings to the table with charge minions and Carnivorous Cubes.`,
      sampleCards: [
        "Kathrena Winterwisp",
        "Carnivorous Cube",
        "Charged Devilsaur"
      ],
      decklistExtra: ["Play Dead", "King Krush"],
      expansion: "9"
    },
    {
      /* 16) */
      name: "Trogg",
      description: ``,
      sampleCards: [
        "Trogg Beastrager",
        "Stonesplinter Trogg",
        "Burly Rockjaw Trogg"
      ],
      decklistExtra: ["Trogg Gloomeater", "Troggzor the Earthinator"],
      expansion: "1"
    },
    {
      /* 17) */
      name: "King",
      description: ``,
      sampleCards: [
        "King Mukla",
        "King Krush",
        "Swamp King Dred"
      ],
      decklistExtra: ["King of Beasts", "King's Elekk", "The Lich King"],
      expansion: "1"
    },
    {
      /* (18) */
      name: "Dinosaur",
      description: ``,
      sampleCards: ["Volcanosaur", "King Krush", "Crackling Razormaw"],
      decklistExtra: ["Vicious Fledgling", "Houndmaster", "Bloodfen Raptor"],
      expansion: "8"
    }
  ],

  /* Mage themes.*/

  [
    {
      /* 1) */
      name: "Secret",
      description: `The mage quests are the most expensive in the game. And the most powerful
      of course. Blizzard was pushing this theme from the start of the game, so there are a lot
      of synergistic cards to choose from.`,
      sampleCards: ["Explosive Runes", "Arcanologist", "Counterspell"],
      decklistExtra: ["Aluneth", "Kabal Crystal Runner", "Medivh's Vallet"],
      expansion: "6"
    },
    {
      /* 2) */
      name: "Freeze enemy board",
      description: `Mage has a lot of spells that can freeze your enemy's board. If your 
      are behind you can stall until you draw a board clear. If you are even or ahead you can 
      push damage for lethal.`,
      sampleCards: ["Frost Nova", "Cone of Cold", "Blizzard"],
      decklistExtra: ["Pyroblast", "Frost Elemental", "Water Elemental"],
      expansion: "99"
    },
    {
      /* 3) */
      name: "Echo of Medivh",
      description: `A powerful card that can refil you hand if you have a board. Can be used
      with cheap minions in a flood deck or with mid-range minions in a value deck.`,
      sampleCards: ["Echo of Medivh", "Duplicate", "Sludge Belcher"],
      decklistExtra: ["Water Elemental"],
      expansion: "0"
    },
    {
      /* 4) */
      name: "Minions that Freeze",
      description: `Mage has a lot of minions that freeze enemies either by hit or with an
      ability. This strategy is not solid but can be effective against weapon classes.`,
      sampleCards: ["Snowchugger", "Water Elemental", "Ice Walker"],
      decklistExtra: ["Frost Elemental", "Demented Frostcaller"],
      expansion: "1"
    },
    {
      /* 5) */
      name: "Burn",
      description: `Your strategy is simple. Burn your opponent with early minions or 
      spells. Mostly suited for aggressive archetypes but control archetypes (freeze mage)
      can also use it.`,
      sampleCards: ["Frostbolt", "Fireball", "Pyroblast"],
      decklistExtra: ["Explosive Runes", "Aluneth"],
      expansion: "10"
    },
    {
      /* 6) GENERAL ALSO */
      name: "Spell Damage",
      description: `Wild mage has some good spell damage minions in her disposal. Combine them with
                          cheap spells and make some mess.`,
      sampleCards: ["Soot Spewer", "Dalaran Aspirant", "Master of Ceremonies"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* 7) */
      name: "Duplicate - Effigy",
      description: `Your goal here is to trigger the secrets on high value minions. You'll also 
      want cards like Mad Scientist to draw the secrets.`,
      sampleCards: ["Duplicate", "Effigy", "Sludge Belcher"],
      decklistExtra: ["Mad Scientist", "Arcanologist", "Water Elemental"],
      expansion: "0"
    },
    {
      /* 8) */
      name: "Coldarra Drake",
      description: `This dragon has decent stats and an interesting ability. You'll most likely
      play a dragon deck and you'll want to make your hero power stronger and cheaper.`,
      sampleCards: ["Coldarra Drake", "Kabal Courier", "Twilight Guardian"],
      decklistExtra: [
        "Blackwing Corruptor",
        "Azure Drake",
        "Justicar Trueheart"
      ],
      expansion: "3"
    },
    {
      /* 9) */
      name: "Costs(x) less",
      description: `Blackrock mountain expansion introduced cards that get cheeper while minions
      die and they are in your hand. Can be played for a swing turn.`,
      sampleCards: ["Dragon's Breath", "Volcanic Drake", "Corridor Creeper"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* 10) */
      name: "Animated Armor",
      description: `Animated Armor has a unique ability that can save you at least 4 health.
      If you manage to hide it behind a taunt, it can save you even more. Still a bad 
      card overall.`,
      sampleCards: ["Animated Armor", "Sludge Belcher"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* 11) */
      name: "Demented Frostcaller",
      description: `Demented Frostcaller can freeze lock your opponent's board if you 
      combine it with cheap spells. It's still a bad card though.`,
      sampleCards: ["Demented Frostcaller", "Mirror Image", "Arcane Missiles"],
      decklistExtra: ["Sorcerer's Apprentice", "Arcane Intellect"],
      expansion: "5"
    },
    // {
    //   /* 12) PROB*/
    //   name: "Highlander",
    //   description: "",
    //   sampleCards: ["Inkmaster Solia", "Reno Jackson", "Kazakus"],
    //   decklistExtra: ["Kabal Courier"],
    //   expansion: "4"
    // },
    {
      /* 13) */
      name: "Quest",
      description: `It is one of the better quests that's used to kill the opponent in one turn.
      Or to be precise in two turns. It is used in control decks that try to stall the game until
      they complete the quest or draw the combo.`,
      sampleCards: [
        "Open the Waygate",
        "Primordial Glyph",
        "Shimmering Tempest"
      ],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 14) GENERAL ALSO */
      name: "Elemental",
      description: `An interesting minion tag that came along with the Un'Goro expansion. Elemental
      synergistic cards require you to play an elemental on the previous turn. That makes them minion
      heavy decks that play on curve.`,
      sampleCards: ["Pyros", "Shimmering Tempest", "Blazecaller"],
      decklistExtra: [
        "Lesser Ruby Spellstone",
        "Fire Fly",
        "Leyline Manipulator"
      ],
      expansion: "8"
    },
    {
      /* 15) */
      name: "Minion copy",
      description: `The goal here is to copy our minions because they are awesome! If the
       minions cost more than the cards that copy, we are good.`,
      sampleCards: [
        "Molten Reflection",
        "Faceless Manipulator",
        "Faceless Shambler"
      ],
      decklistExtra: ["Sorcerer's Apprentice"],
      expansion: "8"
    },
    {
      /* 16) */
      name: "Big Spell",
      description: `With Dragon's Fury, Mage can easily play a deck that is full of AOE. Raven
      Familiar helps with card draw and Dragoncaller Alanna closes out games.`,
      sampleCards: ["Dragon's Fury", "Raven Familiar", "Dragoncaller Alanna"],
      decklistExtra: ["Meteor", "Firelands Portal"],
      expansion: "6"
    },
    {
      /* 17) */
      name: "Not from deck",
      description: `Mage with Leyline Manipulator can have some tempo plays with the random cards
      she generates from Cabalist Tome or similar cards. `,
      sampleCards: [
        "Leyline Manipulator",
        "Cabalist's Tome",
        "Lesser Ruby Spellstone"
      ],
      decklistExtra: ["Fire Fly", "Primordial Glyph"],
      expansion: "5"
    },
    {
      /* 18) */
      name: "Spellstone",
      description: `The Mage spellstone pushes further the elemental theme on the class. Leyline
      Manipulator can generate some tempo in a crazy theme that can create explosive turns. 
      It's not very consistent and it's hard to set up those explosive turns.`,
      sampleCards: [
        "Leyline Manipulator",
        "Fire Fly",
        "Lesser Ruby Spellstone"
      ],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 19) */
      name: "Glacial Mysteries",
      description: `One may think that if this card pull out 3 secrets you are fine. The bad
      thing is that Mage secrets don't synergise well together.`,
      sampleCards: ["Glacial Mysteries", "Mirror Image", "Explosive Runes"],
      decklistExtra: ["Ice Block", "Counterspell"],
      expansion: "9"
    },
    {
      /* 20) */
      name: "Kabal",
      description: `Kabal family specializes in magic. They are value minions that generate you 
      card advantage. They can also give you cards from other classes.`,
      sampleCards: ["Kabal Courier", "Kabal Crystal Runner", "Kabal Chemist"],
      decklistExtra: ["Kabal Lackey", "Explosive Runes", "Counterspell"],
      expansion: "7"
    },
    {
      /* 21) */
      name: "Arcane",
      description: ``,
      sampleCards: ["Arcane Blast", "Arcane Missiles", "Greater Arcane Missiles"],
      decklistExtra: ["Arcane Explosion", "Arcane Intellect", "Arcane Giant"],
      expansion: "1"
    }
  ],

  /* Paladin themes.*/
  [
    {
      /* 1) */
      name: "Pirate",
      description: `Pirate is a minion tag that is not as expensive as others, meaning that
      they usually have good stats for their mana cost. If play a class with weapons or throw
       patches in, you have a decent deck.`,
      sampleCards: [
        "Bloodsail Raider",
        "Truesilver Champion",
        "Southsea Deckhand"
      ],
      decklistExtra: ["Southsea Captain", "Captain Greenskin"],
      expansion: "99"
    },
    {
      /* 2) */
      name: "Heal",
      description: `Paladin is one of the classes that can heal effectively. Not a 
       very effective strategy for aggressive decks.`,
      sampleCards: ["Lay on Hands", "Holy Light", "Ragnaros, Lightlord"],
      decklistExtra: ["Blackguard", "Benevolent Djinn"],
      expansion: "5"
    },
    {
      /* 3) DOUBLE STANDARD */
      name: "Heal",
      description: `Paladin is one of the classes that can heal effectively. Not a 
      very effective strategy for aggressive decks.`,
      sampleCards: [
        "Lay on Hands",
        "Lesser Pearl Spellstone",
        "Benevolent Djinn"
      ],
      decklistExtra: ["Blackguard"],
      expansion: "9"
    },
    {
      /* 4) */
      name: "Secret",
      description: `Paladin has the cheapest secrets in the game. A secret Paladin deck
       used to be the best deck in the game due to the power level of Avenge and 
       Mysterious Challenger.`,
      sampleCards: ["Avenge", "Redemption", "Noble Sacrifice"],
      decklistExtra: ["Mysterious Challenger"],
      expansion: "0"
    },
    {
      /* 5) */
      name: "Holy Wrath",
      description: `Not a vary solid strategy. Your goal is to use it, draw a molten giant 
      and deal 25 damage out of nowhere.`,
      sampleCards: ["Holy Wrath", "Mountain Giant", "Molten Giant"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* 6) */
      name: "Weapon",
      description: `Weapons are mainly considered as tempo removals if you have the life to 
      spare. Other weapons can have unique, deck defining effects but in this case they lose you 
      tempo. `,
      sampleCards: [
        "Captain Greenskin",
        "Light's Justice",
        "Truesilver Champion"
      ],
      decklistExtra: ["Muster for Battle"],
      expansion: "99"
    },
    {
      /* 7) */
      name: "1 attack",
      description: `Paladin has a lot of cards that neutralize your opponent's minions. If 
      combo'd with a Stampeding Kodo can be also be used as hard removal.`,
      sampleCards: ["Humility", "Aldor Peacekeeper", "Stampeding Kodo"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* 8) */
      name: "Blessed Champion",
      description: `A combo theme that wants to deal a lot of damage to the 
      opponent in one turn.`,
      sampleCards: ["Blessed Champion", "Blessing of Might", "Leeroy Jenkins"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* 9) DOUBLE WILD */
      name: "Silver Hand Recruit",
      description: `A theme that synergises with the Paladin hero power. The wild version
      is much stronger.`,
      sampleCards: ["Muster for Battle", "Warhorse Trainer", "Quartermaster"],
      decklistExtra: ["Level Up!"],
      expansion: "1"
    },
    {
      /* 10) */
      name: "Divine Shield",
      description: `Just like taunt minions they have poor stats but they can 2 for 1 if played the right moment. 
      They get a lot of value in buff - board control decks. Also don't forget that you can 
      develop early in the game a big threat like Blood Knight. `,
      sampleCards: ["Shielded Minibot", "Coghammer", "Seal of Champions"],
      decklistExtra: ["Righteous Protector", "Blood Knight"],
      expansion: "1"
    },
    {
      /* 11) DOUBLE STANDARD */
      name: "Divine Shield",
      description: `Just like taunt minions they have poor stats but they can 2 for 1 if played the right moment. 
      They get a lot of value in buff - board control decks. Also don't forget that you can 
      develop early in the game a big threat like Blood Knight. `,
      sampleCards: [
        "Righteous Protector",
        "Howling Commander",
        "Light's Sorrow"
      ],
      decklistExtra: ["Argent Squire"],
      expansion: "9"
    },
    {
      /* 12) */
      name: "Costs(x) less",
      description: `Blackrock mountain expansion introduced cards that get cheeper while minions
      die and they are in your hand. Can be played for a swing turn.`,
      sampleCards: ["Solemn Vigil", "Volcanic Drake", "Doomsayer"],
      decklistExtra: ["Corridor Creeper"],
      expansion: "2"
    },
    {
      /* 13) */
      name: "Reduce to 1 health",
      description: `The compination of Wild Pyromacer + Equality or Equality + Consecration are
      two of most effective board clears in the game.`,
      sampleCards: ["Equality", "Repentance", "Consecration"],
      decklistExtra: ["Avenging Wrath", "Wild Pyromancer"],
      expansion: "99"
    },
    {
      /* 14) */
      name: "Mysterious Challenger",
      description: `This card used to be one of the most broken cards in Hearthstone due to
      Avenge and cards like Muster for Battle and Shielded Minibot. `,
      sampleCards: ["Mysterious Challenger", "Avenge", "Noble Sacrifice"],
      decklistExtra: ["Secretkeeper", "Hydrologist"],
      expansion: "3"
    },
    {
      /* 15) */
      name: "Anyfin Can Happen",
      description: `You can use this card as a powerful combo in a control deck or 
      as a board refil in a Murloc deck.`,
      sampleCards: [
        "Anyfin Can Happen",
        "Murloc Warleader",
        "Bluegill Warrior"
      ],
      decklistExtra: ["Finja, the Flying Star"],
      expansion: "4"
    },
    {
      /* 16) */
      name: "Steward of Darkshire",
      description: `A theme that synergises well with the Paladin hero power or the 
      Silver Hand Recruit theme.`,
      sampleCards: [
        "Steward of Darkshire",
        "Muster for Battle",
        "Stand Against Darkness"
      ],
      decklistExtra: ["Silver Hand Regent", "Blessing of Kings"],
      expansion: "3"
    },
    {
      /* 17) GENERAL ALSO */
      name: "Murloc",
      description: `The most synergistic minion tag in the game. This can lead to a ridiculous early 
      victory if the opponent has no answers but more likely than that, there were not be 
      enough murlocs in the board for you to win. Paladin, Shaman and Warlock have some extra cards 
      in their arsenal if they choose to build a deck around Murlocs. `,
      sampleCards: ["Vilefin Inquisitor", "Hydrologist", "Grimscale Chum"],
      decklistExtra: ["Rockpool Hunter", "Murloc Warleader"],
      expansion: "5"
    },
    {
      /* 18) */
      name: "Handbuff",
      description: `Many handbuff cards seem good on paper but in practice they are too slow.
      In addition they may land in the wrong minions or you maybe don't have any minios in
      your hand.`,
      sampleCards: [
        "Smuggler's Run",
        "Grimestreet Enforcer",
        "Grimestreet Outfitter"
      ],
      decklistExtra: ["Doppelgangster", "Val'anyr"],
      expansion: "7"
    },
    {
      /* 19) */
      name: "Quest",
      description: `One of the worst quests but let's be honest. Who doesn't want to
      summon Galvadon?`,
      sampleCards: [
        "The Last Kaleidosaur",
        "Primalfin Champion",
        "Lynessa Sunsorrow"
      ],
      decklistExtra: ["Spikeridged Steed", "Adaptation", "Blessing of Might"],
      expansion: "8"
    },
    {
      /* 20) DOUBLE STANDARD */
      name: "Silver Hand Recruit",
      description: `A theme that synergises with the Paladin hero power. The wild version
      is much stronger.`,
      sampleCards: ["Vinecleaver", "Level Up!", "Sunkeeper Tarim"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 21) */
      name: "Recruit",
      description: `Paladin has arguably the best recruit card, Call to Arms. It fills your
      board, it's too good for 4 mana and also thins your deck, so you can have better top decks.`,
      sampleCards: ["Call to Arms", "Knife Juggler", "Millhouse Manastorm"],
      decklistExtra: ["Righteous Protector", "Argent Squire"],
      expansion: "9"
    },
    {
      /* (22) DOUBLE STANDARD */
      name: "Buff",
      description: `This theme allows you to transform regular minions into big threats.
      The bad thing is that you must always have a minion on the board.`,
      sampleCards: [
        "Blessing of Kings",
        "Spikeridged Steed",
        "Silvermoon Portal"
      ],
      decklistExtra: ["Blessing of Might", "Divine Strength"],
      expansion: "6"
    },
    {
      /* (23) DOUBLE WILD */
      name: "Buff",
      description: `This theme allows you to transform regular minions into big threats.
      The bad thing is that you must always have a minion on the board.`,
      sampleCards: [
        "Blessing of Kings",
        "Spikeridged Steed",
        "Seal of Champions"
      ],
      decklistExtra: ["Silvermoon Portal", "Divine Strength"],
      expansion: "6"
    },
    {
      /* (24) */
      name: "Argent",
      description: ``,
      sampleCards: [
        "Argent Horserider",
        "Argent Commander",
        "Argent Protector"
      ],
      decklistExtra: ["Argent Lance", "Argent Squire", "Argent Watchman"],
      expansion: "2"
    }
  ],

  /* Priest themes.*/
  [
    {
      /* 1) */
      name: "Inner Fire",
      description: `One really old theme that is regularly used in competitive decks. You want
      to stick a big health minion on the board, buff it and kill your opponent.`,
      sampleCards: ["Inner Fire", "Divine Spirit", "Stormwind Knight"],
      decklistExtra: ["Twilight Drake", "Shadow Visions", "Power Word: Shield"],
      expansion: "8"
    },
    {
      /* 2) */
      name: "Resurrect",
      description: `Your goal here is to play powerful minions and bring them back to life
      efficiently, with spells like resurrect and minions like Onyx Bishop.`,
      sampleCards: ["Resurrect", "Onyx Bishop", "Lesser Diamond Spellstone"],
      decklistExtra: ["Eternal Servitude", "Obsidian Statue", "The Lich King"],
      expansion: "2"
    },
    {
      /* 3) */
      name: "Silence",
      description: `Weak stats for their cost but sometimes by silencing the right target can net you 
      a big advantage and relief. `,
      sampleCards: ["Silence", "Mass Dispel", "Spellbreaker"],
      decklistExtra: ["Humongous Razorleaf", "Ancient Watcher"],
      expansion: "99"
    },
    {
      /* 4) */
      name: "Steal",
      description: `Yeah, in Hearthstone the Priests steal and the
                    Rogues perform miracles. Get over it.`,
      sampleCards: ["Mind Vision", "Thoughtsteal", "Cabal Shadow Priest"],
      decklistExtra: ["Devour Mind", "Psionic Probe"],
      expansion: "9"
    },
    {
      /* 5) */
      name: "Burn",
      description: `Your strategy is simple. Burn your opponent with early minions or 
      spells. Mostly suited for aggressive archetypes but control archetypes (freeze mage)
      can also use it.`,
      sampleCards: ["Mind Blast", "Auchenai Soulpriest", "Flash Heal"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* 6) */
      name: "Lightbomb",
      description: `Lightbomb is an extremely effective AOE that is really hard to play around.
      You can build your deck to take advantage of Lightbomb by adding high health minions.`,
      sampleCards: ["Lightbomb", "Deathlord", "Velen's Chosen"],
      decklistExtra: ["Divine Spirit", "Twilight Drake"],
      expansion: "1"
    },
    {
      /* 7) */
      name: "Heal",
      description: `Priest is obviously the best heal class in the game. When your opponent
      thinks your are finished, you bounce back with cards like Greater Healing Potion and extend
       the game for one more turn.`,
      sampleCards: ["Flash Heal", "Light of the Naaru", "Justicar Trueheart"],
      decklistExtra: ["Greater Healing Potion"],
      expansion: "3"
    },
    {
      /* 8) */
      name: "Heal to damage",
      description: `Priest has a lot of effective healing. But with cards like Auchenai
       Soulpriest it's possible to turn this healing into damage, which is unfair. `,
      sampleCards: ["Auchenai Soulpriest", "Circle of Healing"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* 9) */
      name: "Heal synergies",
      description: `Priest has a vast amount of healing options and a lot of cards
       that take advantage of that.`,
      sampleCards: ["Northshire Cleric", "Power Word: Glory", "Holy Champion"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* 10) */
      name: "Plus health",
      description: `This is a buff deck for Priest. Your goal is to stick a minion
      on the board and buff it. You can take trades or cast Inner Fire and go face.`,
      sampleCards: ["Power Word: Shield", "Velen's Chosen", "Divine Spirit"],
      decklistExtra: ["Inner Fire"],
      expansion: "1"
    },
    {
      /* 11) DOUBLE STANDARD */
      name: "Plus health",
      description: `This is a buff deck for Priest. Your goal is to stick a minion
      on the board and buff it. You can take trades or cast Inner Fire and go face.`,
      sampleCards: [
        "Power Word: Shield",
        "Unidentified Elixir",
        "Divine Spirit"
      ],
      decklistExtra: ["Inner Fire"],
      expansion: "1"
    },
    {
      /* 12) GENERAL ALSO */
      name: "Silence benefits minions",
      description: `In this theme you can negate the downsides of some minions by silencing them 
        or by giving them taunt. `,
      sampleCards: ["Ancient Watcher", "Purify", "Humongous Razorleaf"],
      decklistExtra: ["Silence"],
      expansion: "6"
    },
    // {
    //   /* 13) PROB */
    //   name: "Highlander",
    //   description: "",
    //   sampleCards: ["Raza the Chained", "Reno Jackson", "Kazakus"],
    //   decklistExtra: ["Shadowreaper Anduin", "Shadow Visions"],
    //   expansion: "4"
    // },
    {
      /* 14) */
      name: "Quest",
      description: `The Priest quest requires you to play a bunch of deathrattle minions.
       The reward is Amara that has a Reno like effect. You can also go full meme and play weasel.`,
      sampleCards: [
        "Awaken the Makers",
        "Crystalline Oracle",
        "Twilight's Call"
      ],
      decklistExtra: ["Loot Hoarder"],
      expansion: "8"
    },
    {
      /* 15) */
      name: "Big Priest",
      description: `A powerful theme that tries to summon powerful minions with Barnes and
       bring them back to life with Eternal Servitude or the Spellstone.`,
      sampleCards: ["Obsidian Statue", "Shadow Essence", "Eternal Servitude"],
      decklistExtra: ["Lesser Diamond Spellstone", "The Lich King", "Barnes"],
      expansion: "6"
    },
    {
      /* 16) */
      name: "Dragon Soul",
      description: `Dragon Soul is a weak weapon with a promising effect. If you can spawn some
      early game dragons or combine it with Lyra, you'll have a good time.`,
      sampleCards: ["Dragon Soul", "Power Word: Shield", "Circle of Healing"],
      decklistExtra: ["Lyra the Sunshard", "Silence"],
      expansion: "8"
    },
    {
      /* 17) */
      name: "Temporus",
      description: `A powerful effect not only for you but for your opponent also. It
       is mainly for the memes.`,
      sampleCards: ["Temporus", "Divine Spirit", "Inner Fire"],
      decklistExtra: ["Psychic Scream", "Twilight Drake"],
      expansion: "10"
    },
    {
      /* 18) */
      name: "Twilight's Call",
      description: `This card is mainly used in quest decks. You can use it early game with 
      Loot Hoarder and Bloodmage Thalnos to draw some cards or late game with high value 
      deathrattle minions.`,
      sampleCards: ["Twilight's Call", "Loot Hoarder", "Cairne Bloodhoof"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* 19) */
      name: "Twilight",
      description: `Oh man those movies suck.`,
      sampleCards: ["Twilight Whelp", "Twilight Acolyte", "Twilight Guardian"],
      decklistExtra: ["Twilight Darkmender", "Twilight Drake", "Twilight Summoner"],
      expansion: "2"
    },
    {
      /* 20) */
      name: "Kabal",
      description: `Kabal family specializes in magic. They are value minions that generate you 
      card advantage. They can also give you cards from other classes.`,
      sampleCards: ["Kabal Courier", "Kabal Talonpriest", "Kabal Chemist"],
      decklistExtra: ["Kabal Songstealer"],
      expansion: "7"
    }
  ],

  /* Rogue themes.*/
  [
    {
      /* (1) */
      name: "Pirate",
      description: `Pirate is a minion tag that is not as expensive as others, meaning that
      they usually have good stats for their mana cost. If play a class with weapons or throw
       patches in, you have a decent deck.`,
      sampleCards: ["Buccaneer", "Shady Dealer", "Ship's Cannon"],
      decklistExtra: ["Swashburglar", "Southsea Squidface", "Southsea Captain"],
      expansion: "1"
    },
    {
      /* (2) DOUBLE WILD */
      name: "Stealth",
      description: `Stealth minions have ok stats for their cost and because of their ability 
      you can choose where they attack which is very useful. Because of the stealth 
      they are also excellent in buff decks. Be careful though to not play them into a board clear. `,
      sampleCards: ["Conceal", "Ogre Ninja", "Shade of Naxxramas"],
      decklistExtra: ["Shadow Sensei", "Lotus Assassin"],
      expansion: "1"
    },
    {
      /* (3) DOUBLE STANDARD */
      name: "Stealth",
      description: `Stealth minions have ok stats for their cost and because of their ability 
      you can choose where they attack which is very useful. Because of the stealth 
      they are also excellent in buff decks. Be careful though to not play them into a board clear. `,
      sampleCards: [
        "Valeera the Hollow",
        "Shaku, the Collector",
        "Shadow Sensei"
      ],
      decklistExtra: ["Lotus Assassin", "Jade Swarmer"],
      expansion: "7"
    },
    {
      /* (4) DOUBLE WILD */
      name: "Weapon",
      description: `Weapons are mainly considered as tempo removals if you have the life to 
      spare. Other weapons can have unique, deck defining effects but in this case they lose you 
      tempo. `,
      sampleCards: ["Deadly Poison", "Tinker's Sharpsword Oil", "Kingsbane"],
      decklistExtra: ["Captain Greenskin", "Cavern Shinyfinder"],
      expansion: "1"
    },
    {
      /* (5) DOUBLE STANDARD */
      name: "Weapon",
      description: `Weapons are mainly considered as tempo removals if you have the life to 
      spare. Other weapons can have unique, deck defining effects but in this case they lose you 
      tempo. `,
      sampleCards: ["Deadly Poison", "Shadowblade", "Kingsbane"],
      decklistExtra: ["Cavern Shinyfinder"],
      expansion: "9"
    },
    {
      /* (6) */
      name: "Oil",
      description: `Tinker's Sharpsword Oil used to be an insane card in combination with
      the unerfed Blade Flurry. Nowdays can be used as burst card with cheap charge minions or
       to buff Kingsbane.`,
      sampleCards: [
        "Tinker's Sharpsword Oil",
        "Southsea Deckhand",
        "Blade Flurry"
      ],
      decklistExtra: ["Deadly Poison"],
      expansion: "1"
    },
    {
      /* (7) */
      name: "Burn",
      description: `Your strategy is simple. Burn your opponent with early minions or 
      spells. Mostly suited for aggressive archetypes but control archetypes (freeze mage)
      can also use it.`,
      sampleCards: ["Sinister Strike", "Eviscerate", "Cold Blood"],
      decklistExtra: ["Southsea Deckhand", "Leeroy Jenkins"],
      expansion: "99"
    },
    {
      /* (8) */
      name: "Sap spells",
      description: `Sap spells are the epitome of tempo. They neutralize threats for a turn or
      two and allow you to end the game or extend it until you draw your combo.`,
      sampleCards: ["Sap", "Vanish", "Kidnapper"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (9) */
      name: "Combo text",
      description: `Combo is a core mechanic of the Rogue class. They cost less, but require you 
      to play other cards first. That's why coin is important for Rogue. Cheap spells like 
      Shadowstep and Preparation also help.`,
      sampleCards: ["Defias Ringleader", "SI:7 Agent", "Edwin VanCleef"],
      decklistExtra: ["Elven Minstrel", "Shadowstep"],
      expansion: "99"
    },
    {
      /* (10) */
      name: "Burgle",
      description: `Rogues oddly enough, are good in stealing stuff.`,
      sampleCards: ["Burgle", "Ethereal Peddler", "Swashburglar"],
      decklistExtra: ["Shaku, the Collector", "Hallucination"],
      expansion: "3"
    },
    {
      /* (11) DOUBLE WILD */
      name: "Deathrattle",
      description: `They usually have insane stats for their mana cost value wise. They are not good tempo plays 
      but they stick in the board. With cards like Kel'Thuzad, Baron Rivedare or N'Zoth 
      they can quickly go out of control. `,
      sampleCards: ["Unearthed Raptor", "Tomb Pillager", "Nerubian Egg"],
      decklistExtra: ["Sylvanas Windrunner"],
      expansion: "0"
    },
    {
      /* (12) DOUBLE STANDARD */
      name: "Deathrattle",
      description: `They usually have insane stats for their mana cost value wise. They are not good tempo plays 
      but they stick in the board. With cards like Kel'Thuzad, Baron Rivedare or N'Zoth 
      they can quickly go out of control. `,
      sampleCards: [
        "Kobold Illusionist",
        "Roll the Bones",
        "Lesser Onyx Spellstone"
      ],
      decklistExtra: ["Sylvanas Windrunner", "N'Zoth, the Corruptor"],
      expansion: "5"
    },
    {
      /* (13) */
      name: "Miracle",
      description: `One of the oldest decks for the Rogue class, that tries to cycle through
      the deck with Gadgetzan Auctioneer and end the game with burst. It's weak when you 
      dont draw the Auctioneer in time.`,
      sampleCards: ["Gadgetzan Auctioneer", "Preparation", "Counterfeit Coin"],
      decklistExtra: ["Fan of Knives"],
      expansion: "7"
    },
    {
      /* (14) */
      name: "More than 2 copies of a card",
      description: `Imagine a deck with 8 backstabs! Oh wait.`,
      sampleCards: ["Thistle Tea", "Mimic Pod"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (15) */
      name: "Jade",
      description: `The Rogue Jade deck is not on the same power level as the Druid one, but still
      is a solid deck. You can combine it with some deathrattle cards.`,
      sampleCards: ["Jade Shuriken", "Aya Blackpaw", "Jade Swarmer"],
      decklistExtra: ["Shadowstep", "Jade Spirit"],
      expansion: "7"
    },
    {
      /* (16) */
      name: "Non rogue cards",
      description: `The game plan is simple. You steal cards from your opponent and when
                          you have stolen enough you play Ethereal Peddler to make them cheap.`,
      sampleCards: ["Ethereal Peddler", "Swashburglar", "Shaku, the Collector"],
      decklistExtra: [],
      expansion: "6"
    },
    {
      /* (17) */
      name: "Quest",
      description: `The best quest before the nerf is nowdays a fun deck that punishes slow decks. 
      Sonya Shadowdancer with charge minions can help you complete the quest faster.`,
      sampleCards: ["The Caverns Below", "Fire Fly", "Shadowstep"],
      decklistExtra: [
        "Stonetusk Boar",
        "Southsea Deckhand",
        "Sonya Shadowdancer"
      ],
      expansion: "8"
    },
    {
      /* (18) */
      name: "Flower",
      description: `They may seem beautiful at first glance but don't let them fool you!`,
      sampleCards: [
        "Razorpetal Lasher",
        "Vilespine Slayer",
        "Sherazin, Corpse Flower"
      ],
      decklistExtra: ["Hallucination"],
      expansion: "8"
    },
    {
      /* (19) */
      name: "Kingsbane",
      description: `One of the best weapons from Kobolds and Catacombs expansion that is not 
      vulnerable to weapon destruction. The most common archetype that uses this card is a mill
      deck. `,
      sampleCards: ["Kingsbane", "Cavern Shinyfinder", "Elven Minstrel"],
      decklistExtra: ["Deadly Poison", "Leeching Poison"],
      expansion: "9"
    },
    {
      /* (20) */
      name: "Secret",
      description: `In Kobolds and Catacombs Rogue became the fourth class in Hearthstone that
      uses secrets. They are interesting cards but there is not enough synergy yet.`,
      sampleCards: ["Cheat Death", "Evasion", "Sudden Betrayal"],
      decklistExtra: ["Secretkeeper"],
      expansion: "10"
    },
    {
      /* (21) */
      name: "Assassin",
      description: ``,
      sampleCards: ["Lotus Assassin", "Assassinate", "Patient Assassin"],
      decklistExtra: ["Assassin's Blade", "Ravenholdt Assassin"],
      expansion: "7"
    }
  ],

  /* Shaman themes.*/
  [
    {
      /* 1) */
      name: "Pirate",
      description: `Pirate is a minion tag that is not as expensive as others, meaning that
      they usually have good stats for their mana cost. If play a class with weapons or throw
       patches in, you have a decent deck.`,
      sampleCards: [
        "Captain Greenskin",
        "Southsea Deckhand",
        "Bloodsail Raider"
      ],
      decklistExtra: ["Southsea Captain"],
      expansion: "99"
    },
    {
      /* 2) */
      name: "Weapon",
      description: `Weapons are mainly considered as tempo removals if you have the life to 
      spare. Other weapons can have unique, deck defining effects but in this case they lose you 
      tempo. `,
      sampleCards: ["Captain Greenskin", "Jade Claws", "Doomhammer"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* 3) */
      name: "Totem",
      description: `Totem Shaman is a token deck that tries to fill the board with small minions
      and burst the opponent with Bloodlust. It can also spawn Al'akir in turn 5 with Windshear 
      Stormcaller`,
      sampleCards: [
        "Totemic Might",
        "Tuskarr Totemic",
        "Thunder Bluff Valiant"
      ],
      decklistExtra: ["Totem Golem", "Flametongue Totem", "Totemic Might"],
      expansion: "3"
    },
    {
      /* 4) DOUBLE WILD */
      name: "Bloodlust",
      description: `In this theme you'll want to flood the board with cheap minions and burst 
      your opponent with Bloodlust. `,
      sampleCards: ["Haunted Creeper", "Bloodlust", "Everyfin is Awesome"],
      decklistExtra: ["Fire Fly", "Flametongue Totem"],
      expansion: "0"
    },
    {
      /* 5) DOUBLE STANDARD */
      name: "Bloodlust",
      description: `In this theme you'll want to flood the board with cheap minions and burst 
      your opponent with Bloodlust. `,
      sampleCards: ["Fire Fly", "Bloodlust", "Primalfin Totem"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 6) GENERAL ALSO */
      name: "Windfury",
      description: `A high health minion with windfury can easily trade 2 for 1 with smaller minions 
      but in most cases you will use the ability for pressure or lethal damage. `,
      sampleCards: ["Whirling Zap-o-matic", "Windfury", "Rockbiter Weapon"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* 7) */
      name: "Lava Shock (Overload)",
      description: `Overload is a core mechanic in Shaman. It allows you to have some explosive 
      tempo turns in the expense of the following turn. If you include cards that synergise well
       with Overloard and plan your turns carefully you'll be successful.`,
      sampleCards: ["Lava Shock", "Tunnel Trogg", "Feral Spirit"],
      decklistExtra: [
        "Totem Golem",
        "Flamewreathed Faceless",
        "Snowfury Giant"
      ],
      expansion: "2"
    },
    {
      /* 8) */
      name: "Ancestor's Call",
      description: `You'll want to run this card in a contol deck with Malygos and
      burst spells. If you have the hard removal you can play it in deck with expensive
      minions also.`,
      sampleCards: ["Ancestor's Call", "Malygos", "Lightning Bolt"],
      decklistExtra: ["Far Sight"],
      expansion: "1"
    },
    {
      /* 9) */
      name: "Burn",
      description: `Your strategy is simple. Burn your opponent with early minions or 
      spells. Mostly suited for aggressive archetypes but control archetypes (freeze mage)
      can also use it.`,
      sampleCards: ["Lightning Bolt", "Rockbiter Weapon", "Lava Burst"],
      decklistExtra: ["Doomhammer"],
      expansion: "99"
    },
    {
      /* 10) DOUBLE WILD*/
      name: "Heal",
      description: `Shaman didn't start as a class that could heal but over the years 
      got some sweet heal cards.`,
      sampleCards: ["Vitality Totem", "Healing Wave", "Antique Healbot"],
      decklistExtra: ["Healing Rain"],
      expansion: "1"
    },
    {
      /* 11) DOUBLE STANDARD */
      name: "Heal",
      description: `Shaman didn't start as a class that could heal but over the years 
      got some sweet heal cards.`,
      sampleCards: ["Hot Spring Guardian", "Healing Rain", "Tidal Surge"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 12) */
      name: "Thunder Bluff Valiant",
      description: `Thunder Bluff Valiant can be a devasting card if you have totems on 
      board. If the opponent doesn't remove it immediately, it can snowball hard.`,
      sampleCards: [
        "Thunder Bluff Valiant",
        "Tuskarr Totemic",
        "Draenei Totemcarver"
      ],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* 13) GENERAL ALSO */
      name: "Battlecry",
      description: `If you want to build a deck with battlecry minions it will most likely be a minion 
      based deck because most of the good battlecries require to have minions in play 
      in order to be good. They can also remove enemy minions while developing a minion, 
      allowing you some tempo plays. With Crowd Favorite introduced in TGT we also 
      have some synergy. `,
      sampleCards: ["Rumbling Elemental", "Fire Elemental", "Abusive Sergeant"],
      decklistExtra: ["Brann Bronzebeard"],
      expansion: "4"
    },
    {
      /* 14) */
      name: "Everyfin is Awesome",
      description: `A mass buff card that can be effective if you have murlocs on the board.
       It has really good synergy with the Call in the Finishers.`,
      sampleCards: [
        "Everyfin is Awesome",
        "Murloc Tidehunter",
        "Call in the Finishers"
      ],
      decklistExtra: ["Rockpool Hunter", "Coldlight Seer"],
      expansion: "4"
    },
    {
      /* 15) */
      name: "Evolve",
      description: `Evolve is a recent RNG based theme for Shaman. It has seen competitive
      play and it's extremely fun. In the other hand it feels really bad when the RNG gods
       have forsaken you.`,
      sampleCards: ["Evolve", "Doppelgangster", "Thrall, Deathseer"],
      decklistExtra: ["Corridor Creeper", "Nerubian Prophet"],
      expansion: "5"
    },
    {
      /* 16) */
      name: "Jade",
      description: `Jades are a good fit for Shaman because he can take advantage of the multiple 
      bodies on the board. The most important factor though is that the Shaman has some 
      really powerful Jade cards. `,
      sampleCards: ["Jade Claws", "Jade Lightning", "Jade Chieftain"],
      decklistExtra: ["Jade Spirit", "Grumble, Worldshaker"],
      expansion: "7"
    },
    {
      /* 17) GENERAL ALSO */
      name: "Elemental",
      description: `An interesting minion tag that came along with the Un'Goro expansion. Elemental
      synergistic cards require you to play an elemental on the previous turn. That makes them minion
      heavy decks that play on curve.`,
      sampleCards: [
        "Fire Plume Harbinger",
        "Stone Sentinel",
        "Kalimos, Primal Lord"
      ],
      decklistExtra: ["Fire Fly", "Blazecaller", "Servant of Kalimos"],
      expansion: "8"
    },
    {
      /* 18) */
      name: "Quest",
      description: `A weak but fun quest. Cards like Call in the Finishers make the completion easier
      than it seems. Murlocs are extremelly synergistic but weak to AOE and to other aggressive 
      decks. If they stick on board you have a good chance of winning.`,
      sampleCards: [
        "Unite the Murlocs",
        "Murloc Tidecaller",
        "Gentle Megasaur"
      ],
      decklistExtra: [
        "Murloc Warleader",
        "Call in the Finishers",
        "Rockpool Hunter"
      ],
      expansion: "7"
    },
    {
      /* 19) */
      name: "Spirit Echo",
      description: `Spirit Echo is not powerful card but shines when you develop a decent board 
      because it makes it durable.`,
      sampleCards: ["Spirit Echo", "Saronite Chain Gang", "Fire Fly"],
      decklistExtra: ["Doppelgangster"],
      expansion: "7"
    },
    {
      /* 20) */
      name: "Freeze",
      description: `Blizzard is trying really hard to push the freeze theme into Shaman. 
      So far it has been a disaster. It is one of the most meme decks you could play.`,
      sampleCards: ["Moorabi", "Ice Breaker", "Voodoo Hexxer"],
      decklistExtra: ["Cryostasis", "Glacial Shard", "Avalanche"],
      expansion: "8"
    },
    {
      /* 21) */
      name: "Windshear Stormcaller",
      description: `Windshear Stormcaller is a decent minion for the cost and a win condition 
      if you build your deck around it. Better to trigger the effect end game to take advantage
       of the extra mana.`,
      sampleCards: [
        "Windshear Stormcaller",
        "Primal Talismans",
        "Kobold Hermit"
      ],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* 22) */
      name: "Recruit",
      description: `Shaman doesn't have any class specific recruit cards but has a 
      really powerful 4 mana drop that can pull from Guild Recruiter.`,
      sampleCards: [
        "Flamewreathed Faceless",
        "Guild Recruiter",
        "Injured Blademaster"
      ],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* 23) */
      name: "Spellstone",
      description: `Arguably the worst spellstone in the game. You'll want to build a control deck 
      with high value cards that overload you. Earth elemental is the perfect fit here.`,
      sampleCards: [
        "Lesser Sapphire Spellstone",
        "Snowfury Giant",
        "Ancestral Spirit"
      ],
      decklistExtra: ["Feral Spirit", "Earth Elemental"],
      expansion: "10"
    },
    {
      /* 24) */
      name: "Trogg",
      description: ``,
      sampleCards: [
        "Tunnel Trogg",
        "Stonesplinter Trogg",
        "Burly Rockjaw Trogg"
      ],
      decklistExtra: ["Trogg Gloomeater", "Troggzor the Earthinator"],
      expansion: "1"
    }
  ],

  /* Warlock themes.*/
  [
    {
      /* 1) DOUBLE WILD */
      name: "Demon",
      description: `Demons are weary of Warlocks because they will sacrifice them in 
      the first chance. Seriously though they are usually powerful minions with unique effects.
       Warlocks have insane synergy with them.`,
      sampleCards: ["Imp Gang Boss", "Voidcaller", "Mal'Ganis"],
      decklistExtra: ["Bloodreaver Gul'dan", "Voidlord", "Doomguard"],
      expansion: "1"
    },
    {
      /* 2) DOUBLE STANDARD*/
      name: "Demon",
      description: `Demons are weary of Warlocks because they will sacrifice them in 
      the first chance. Seriously though they are usually powerful minions with unique effects.
       Warlocks have insane synergy with them.`,
      sampleCards: ["Doomguard", "Voidlord", "Possessed Lackey"],
      decklistExtra: ["Bloodreaver Gul'dan", "Skull of the Man'ari"],
      expansion: "10"
    },
    {
      /* 3) */
      name: "Demonwrath",
      description: `Demonwrath is an effective aoe that can be unfair if your decks has
       a lot of demons.`,
      sampleCards: ["Demonwrath", "Imp Gang Boss", "Voidcaller"],
      decklistExtra: ["Flame Imp"],
      expansion: "2"
    },
    {
      /* 4) */
      name: "Discard",
      description: `Warlock has a lot of synergy with the discard mechanic. It's not a 
      very effective strategy because you can't choose what cards to discard. If you could it
       would be unfair.`,
      sampleCards: ["Malchezaar's Imp", "Cataclysm", "Doomguard"],
      decklistExtra: ["Lakkari Sacrifice", "Cruel Dinomancer"],
      expansion: "6"
    },
    {
      /* 5) */
      name: "Void terror",
      description: `Void terror is a powerful card that can be used to trigger your 
      deathrattles and develop a big body at the same turn.`,
      sampleCards: ["Void Terror", "Power Overwhelming", "Nerubian Egg"],
      decklistExtra: ["Devilsaur Egg", "Twilight Summoner"],
      expansion: "0"
    },
    {
      /* 6) */
      name: "Self damage",
      description: `Warlock has many minions that are too powerful for their mana cost but have
       a downside. Self damage. You'll take advantage of the tempo they offer and use cards that 
       take advantage of your decreasing life. Be careful not to die.`,
      sampleCards: ["Flame Imp", "Pit Lord", "Molten Giant"],
      decklistExtra: ["Lesser Amethyst Spellstone", "Kobold Librarian"],
      expansion: "99"
    },
    {
      /* 7) */
      name: "Voidcaller",
      description: `Voidcaller is an interesing minion that your opponent will hesitate to kill. 
      You can cheat out powerful demons like Mal'Ganis or Doomguard and overwhelm you opponent.`,
      sampleCards: ["Voidcaller", "Doomguard", "Mal'Ganis"],
      decklistExtra: ["Void Terror"],
      expansion: "1"
    },
    {
      /* 8) */
      name: "Renounce Darkness",
      description: `Renounce Darkness is a synonym of meme. `,
      sampleCards: ["Renounce Darkness", "Barnes", "Y'Shaarj, Rage Unbound"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* 9) GENERAL ALSO */
      name: "Murloc",
      description: `The most synergistic minion tag in the game. This can lead to a ridiculous early 
      victory if the opponent has no answers but more likely than that, there were not be 
      enough murlocs in the board for you to win. Paladin, Shaman and Warlock have some extra cards 
      in their arsenal if they choose to build a deck around Murlocs. `,
      sampleCards: ["Seadevil Stinger", "Murloc Warleader", "Bluegill Warrior"],
      decklistExtra: ["Finja, the Flying Star"],
      expansion: "5"
    },
    {
      /* 11) */
      name: "Quest",
      description: `The Warlock quest is arguably the worst quest in the game. The reward provides 
       you a constant flow of demons on the board but the discard mechanic is not consistent 
       enough. It's not that bad if you complete it with Malchezaar's Imp and Cataclysm.`,
      sampleCards: [
        "Lakkari Sacrifice",
        "Clutchmother Zavas",
        "Cruel Dinomancer"
      ],
      decklistExtra: ["Cataclysm"],
      expansion: "8"
    },
    {
      /* 12) GENERAL ALSO */
      name: "Elemental",
      description: `An interesting minion tag that came along with the Un'Goro expansion. Elemental
      synergistic cards require you to play an elemental on the previous turn. That makes them minion
      heavy decks that play on curve.`,
      sampleCards: ["Tar Lurker", "Servant of Kalimos", "Tar Creeper"],
      decklistExtra: ["Blazecaller", "Tol'vir Stoneshaper"],
      expansion: "8"
    },
    {
      /* 13) */
      name: "Treachery",
      description: `A really nice idea that can ruin your opponents hopes and dreams. You'll 
      want to give them a Howlfiend and proc it as many times as possible with Defile. Hopefully
       they'll discard important cards.`,
      sampleCards: ["Treachery", "Howlfiend", "Defile"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 14) */
      name: "Man'ari",
      description: `Skull of the Man'ari is another Warlock card that synergises with Demons. It's
      weak to weapon destruction but if it stays can provide you a lot of tempo and combo
       opportunities.`,
      sampleCards: ["Skull of the Man'ari", "Voidlord", "Doomguard"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* 15) */
      name: "Kabal",
      description: `Kabal family specializes in magic. They are value minions that generate you 
      card advantage. They can also give you cards from other classes.`,
      sampleCards: ["Kabal Courier", "Kabal Trafficker", "Kabal Chemist"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* 16) */
      name: "Buff",
      description: `Buff Warlock decks unlike other classes can buff only Demons. Demons
      are powerful minions for their cost so they'll probably stick on the board.`,
      sampleCards: ["Bloodfury Potion", "Demonfire", "Demonheart"],
      decklistExtra: ["Imp Gang Boss", "Flame Imp", "Vulgar Homunculus"],
      expansion: "2"
    },
    {
      /* 17) */
      name: "Imp",
      description: ``,
      sampleCards: ["Blood Imp", "Flame Imp", "Malchezaar's Imp"],
      decklistExtra: ["Imp Gang Boss", "Imp Master", "Imp-losion"],
      expansion: "2"
    }
  ],

  /* Warrior themes.*/
  [
    {
      /* 1) DOUBLE WILD */
      name: "Pirate",
      description: `Pirate is a minion tag that is not as expensive as others, meaning that
      they usually have good stats for their mana cost. If play a class with weapons or throw
       patches in, you have a decent deck.`,
      sampleCards: ["Death's Bite", "Bloodsail Raider", "Dread Corsair"],
      decklistExtra: ["Southesea Captain", "Southsea Deckhand"],
      expansion: "0"
    },
    {
      /* 2) DOUBLE STANDARD */
      name: "Pirate",
      description: `Pirate is a minion tag that is not as expensive as others, meaning that
      they usually have good stats for their mana cost. If play a class with weapons or throw
       patches in, you have a decent deck.`,
      sampleCards: [
        "N'Zoth's First Mate",
        "Bloodsail Cultist",
        "Patches the Pirate"
      ],
      decklistExtra: ["Southsea Captain", "Southsea Deckhand"],
      expansion: "6"
    },
    {
      /* 3) */
      name: "Weapon",
      description: `Weapons are mainly considered as tempo removals if you have the life to 
      spare. Other weapons can have unique, deck defining effects but in this case they lose you 
      tempo. `,
      sampleCards: ["Upgrade!", "Fiery War Axe", "Gorehowl"],
      decklistExtra: ["Captain Greenskin"],
      expansion: "99"
    },
    {
      /* 4) */
      name: "Enrage",
      description: `Enrage mechanic is not exclusive to Warrior. But Warrior has a lot of ways to
      damage his own minions. Enrage minions offer a considerable advantage when damaged, so they
       are first priority targets.`,
      sampleCards: [
        "Cruel Taskmaster",
        "Frothing Berserker",
        "Amani Berserker"
      ],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* 5) */
      name: "Iron Juggernaut",
      description: `Here you'll want to shuffle as many bombs as possible in your opponent's
      deck with the help of bouncing cards like Youthful Brewmaster.`,
      sampleCards: [
        "Iron Juggernaut",
        "Youthful Brewmaster",
        "Brann Bronzebeard"
      ],
      decklistExtra: ["Coldlight Oracle", "Zola the Gorgon"],
      expansion: "1"
    },
    {
      /* 6) */
      name: "Bomber",
      description: `Warrior loves to damage his own minions. So does the Bomber goblins.`,
      sampleCards: ["Frothing Berserker", "Mad Bomber", "Madder Bomber"],
      decklistExtra: ["Amani Berserker", "Axe Flinger"],
      expansion: "1"
    },
    {
      /* 7) */
      name: "Burn",
      description: `Your strategy is simple. Burn your opponent with early minions or 
      spells. Mostly suited for aggressive archetypes but control archetypes (freeze mage)
      can also use it.`,
      sampleCards: ["Heroic Strike", "Mortal Strike", "Grommash Hellscream"],
      decklistExtra: ["Inner Rage"],
      expansion: "99"
    },
    {
      /* 8) */
      name: "Damage your minions",
      description: `Warrior has a lot of ways to damage his own minions. If you throw in some
       minions or spells that benefit from that you've got yourself a deck.`,
      sampleCards: ["Frothing Berserker", "Amani Berserker", "Raging Worgen"],
      decklistExtra: ["Inner Rage", "Whirlwind", "Battle Rage"],
      expansion: "99"
    },
    {
      /* 9) */
      name: "Armor synergy",
      description: `Armor synergy is a core part in Warrior decks. You have very efficient removals 
      like Shield Slam to devasting AOE's like Reckless Flurry. You can also snowball the game
       with Yip's end of turn effect.`,
      sampleCards: ["Shield Slam", "Shield Block", "Geosculptor Yip"],
      decklistExtra: ["Unidentified Shield", "Reckless Flurry"],
      expansion: "10"
    },
    {
      /* 10) GENERAL ALSO */
      name: "Charge",
      description: `Charge minions can be used as slightly expensive removal available to classes 
      that don't have many removals. But in reality you will must likely use them 
      in an aggresive deck to smack your opponent's face. `,
      sampleCards: ["Charge", "Kor'kron Elite", "Grommash Hellscream"],
      decklistExtra: ["Leeroy Jenkins", "Charged Devilsaur"],
      expansion: "8"
    },
    {
      /* 11) */
      name: "Bolster",
      description: `Taunt Warrior became a meme with Bolster and later a meta deck 
      with the Quest.`,
      sampleCards: ["Bolster", "Sparring Partner", "Hobgoblin"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* 12) */
      name: "Infinite Value",
      description: `Control Warriors are notorious for their ability to outvalue their opponents. 
      Cards like Dead Man's Hand go that concept a little further. To infinity.`,
      sampleCards: ["Tentacles for Arms", "Dead Man's Hand"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* 13) GENERAL ALSO */
      name: "Taunt",
      description: `Taunt minions generally have poor stats for their cost and leave you behind in tempo. 
      Their advantage is that they can keep you alive against aggresive decks or force bad trades. `,
      sampleCards: [
        "Alley Armorsmith",
        "Fire Plume's Heart",
        "Direhorn Hatchling"
      ],
      decklistExtra: ["Primordial Drake", "Gemstudded Golem"],
      expansion: "7"
    },
    {
      /* 14) */
      name: "Handbuff",
      description: `Many handbuff cards seem good on paper but in practice they are too slow.
      In addition they may land in the wrong minions or you maybe don't have any minios in
      your hand.`,
      sampleCards: ["Grimy Gadgeteer", "Don Han'Cho", "Brass Knuckles"],
      decklistExtra: ["Grimestreet Smuggler"],
      expansion: "7"
    },
    {
      /* 15) */
      name: "Quest",
      description: `One of the best quests, Fire Plume's Heart rewards for playing taunt minions
       with ragnaros ability. You can deal 8 damage to random minion after you destroy your
       3 cost, 4/2 weapon. Best used in slower decks.`,
      sampleCards: [
        "Fire Plume's Heart",
        "Direhorn Hatchling",
        "Stonehill Defender"
      ],
      decklistExtra: ["Alley Armorsmith"],
      expansion: "8"
    },
    {
      /* 16) */
      name: "Sudden Genesis",
      description: `Probably, you'll want to use this card with big charge minions. You 
       could also use it in a minion heavy deck to develop you board. Another option is 
       to use it with big end of turn or deathrattle minions.`,
      sampleCards: ["Sudden Genesis", "Whirlwind", "Grommash Hellscream"],
      decklistExtra: ["Inner Rage"],
      expansion: "8"
    },
    {
      /* 17) */
      name: "Dead Man's Hand",
      description: `If you cast Dead Man's Hand while having another copy in you hand, you
       will never run out of cards. This theme as you may have guessed, is better used in 
       slower decks. `,
      sampleCards: ["Dead Man's Hand", "Battle Rage", "Bring It On!"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 18) */
      name: "Recruit",
      description: `Recruit Warrior decks synergise well with big minions. They have no
       mana limitations like Druid recruit (4 mana), but you'll want to include some 
       expensive minions for optimal results.`,
      sampleCards: ["Gather Your Party", "Woecleaver", "Ysera"],
      decklistExtra: ["The Lich King", "Y'Shaarj, Rage Unbound"],
      expansion: "10"
    },
    {
      /* 19) */
      name: "Berserker",
      description: `Those guys get easily mad, so be careful.`,
      sampleCards: ["Animated Berserker", "Frothing Berserker", "Gurubashi Berserker"],
      decklistExtra: ["Amani Berserker", "Aberrant Berserker"],
      expansion: "5"
    }
  ],

  /* Generic themes.*/
  [
    {
      /* (1) DOUBLE WILD */
      name: "Beast",
      description: `This archetype is mostly suited for Druid and Hunter. Other than that, there are 
      powerful common beasts that let you build a decent deck if you want to be gimmicky. `,
      sampleCards: ["Haunted Creeper", "Jeweled Scarab", "Stampeding Kodo"],
      decklistExtra: ["Tomb Spider", "The Curator"],
      expansion: "0"
    },
    {
      /* (2) DOUBLE STANDARD */
      name: "Beast",
      description: `This archetype is mostly suited for Druid and Hunter. Other than that, there are 
      powerful common beasts that let you build a decent deck if you want to be gimmicky. `,
      sampleCards: ["Corridor Creeper", "Vicious Fledgling", "Golakka Crawler"],
      decklistExtra: ["Dire Mole", "Jungle Panther"],
      expansion: "8"
    },
    {
      /* (3) DOUBLE WILD */
      name: "Dragon",
      description: `One of the biggest reasons to play a Dragon deck is Blackwing Corruptor. 
        That deck is usually slow because the good dragons are expensive minions 
        but you can go faster with cards like fiery dragon, Blackwing Corruptor and Drakonid Crusher. `,
      sampleCards: [
        "Twilight Drake",
        "Twilight Guardian",
        "Blackwing Corruptor"
      ],
      decklistExtra: ["Cobalt Scalebane", "Azure Drake"],
      expansion: "2"
    },
    {
      /* (4) DOUBLE STANDARD */
      name: "Dragon",
      description: `Dragon decks no longer have insane synergistic cards like Blackwing Corruptor (except Priest). 
        They now have solid expensive cards like Primordial Drake or aggressive ones 
        like Cobalt Scalebane.`,
      sampleCards: ["Twilight Drake", "Cobalt Scalebane", "Primordial Drake"],
      decklistExtra: ["Bone Drake"],
      expansion: "8"
    },
    {
      /* (5) DOUBLE WILD */
      name: "Charge",
      description: `Charge minions can be used as slightly expensive removal available to classes 
        that don't have many removals. But in reality you will must likely use them 
        in an aggresive deck to smack your opponent's face. `,
      sampleCards: ["Argent Horserider", "Argent Commander", "Wolfrider"],
      decklistExtra: ["Stormwind Knight", "Leeroy Jenkins"],
      expansion: "3"
    },
    {
      /* (6) DOUBLE STANDARD */
      name: "Charge",
      description: `Charge minions can be used as slightly expensive removal available to classes 
      that don't have many removals. But in reality you will must likely use them 
      in an aggresive deck to smack your opponent's face. `,
      sampleCards: ["Charged Devilsaur", "Argent Commander", "Wolfrider"],
      decklistExtra: ["Leeroy Jenkins"],
      expansion: "8"
    },
    {
      /* (7) DOUBLE WILD */
      name: "Taunt",
      description: `Taunt minions generally have poor stats for their cost and leave you behind in tempo. 
      Their advantage is that they can keep you alive against aggresive decks or force bad trades. `,
      sampleCards: ["Sunwalker", "Sen'jin Shieldmasta", "Sludge Belcher"],
      decklistExtra: ["Primordial Drake", "The Lich King"],
      expansion: "0"
    },
    {
      /* (8) DOUBLE STANDARD */
      name: "Taunt",
      description: `Taunt minions generally have poor stats for their cost and leave you behind in tempo. 
      Their advantage is that they can keep you alive against aggresive decks or force bad trades. `,
      sampleCards: ["Tar Creeper", "Primordial Drake", "Corpsetaker"],
      decklistExtra: ["The Lich King"],
      expansion: "8"
    },
    {
      /* (9) DOUBLE WILD */
      name: "Divine Shield",
      description: `Just like taunt minions they have poor stats but they can 2 for 1 if played the right moment. 
        They get a lot of value in buff - board control decks. Also don't forget that you can 
        develop early in the game a big threat like Blood Knight. `,
      sampleCards: ["Silent Knight", "Sunwalker", "Blood Knight"],
      decklistExtra: ["Argent Commander", "Annoy-o-Tron"],
      expansion: "3"
    },
    {
      /* (10) DOUBLE STANDARD */
      name: "Divine Shield",
      description: `Just like taunt minions they have poor stats but they can 2 for 1 if played the right moment. 
      They get a lot of value in buff - board control decks. Also don't forget that you can 
      develop early in the game a big threat like Blood Knight. `,
      sampleCards: ["Stoneskin Basilisk", "Sunwalker", "Blood Knight"],
      decklistExtra: ["Argent Squire", "Tainted Zealot"],
      expansion: "9"
    },
    {
      /* (11) DOUBLE WILD */
      name: "Deathrattle",
      description: `They usually have insane stats for their mana cost value wise. They are not good tempo plays 
        but they stick in the board. With cards like Kel'Thuzad, Baron Rivedare or N'Zoth 
        they can quickly go out of control. `,
      sampleCards: [
        "Baron Rivendare",
        "Piloted Shredder",
        "Sneed's Old Shredder"
      ],
      decklistExtra: ["Kel'Thuzad", "N'Zoth, the Corruptor", "Dr. Boom"],
      expansion: "0"
    },
    {
      /* (12) DOUBLE STANDARD */
      name: "Deathrattle",
      description: `They usually have insane stats for their mana cost value wise. They are not good tempo plays 
      but they stick in the board. With cards like Kel'Thuzad, Baron Rivedare or N'Zoth 
      they can quickly go out of control. `,
      sampleCards: ["Plated Beetle", "Bone Drake", "Cairne Bloodhoof"],
      decklistExtra: ["Loot Hoarder", "N'Zoth, the Corruptor"],
      expansion: "5"
    },
    {
      /* (13) DOUBLE WILD */
      name: "Spell Damage",
      description: `Except Azure Drake and Bloodmage Thalnos there are not many good spellpower minions 
        but with Master of Ceremonies introduced in TGT we now have some synergy. 
        They synergize well with cheap spells. `,
      sampleCards: ["Master of Ceremonies", "Azure Drake", "Bloodmage Thalnos"],
      decklistExtra: ["Malygos", "Tainted Zealot"],
      expansion: "0"
    },
    {
      /* (14)  DOUBLE STANDARD */
      name: "Spell Damage",
      description: `Except Azure Drake and Bloodmage Thalnos there are not many good spellpower minions 
      but with Master of Ceremonies introduced in TGT we now have some synergy. 
      They synergize well with cheap spells. `,
      sampleCards: ["Tuskarr Fisherman", "Malygos", "Bloodmage Thalnos"],
      decklistExtra: ["Tainted Zealot", "Archmage"],
      expansion: "9"
    },
    {
      /* (15) DOUBLE WILD */
      name: "Token",
      description: `A token deck is flood deck that wants to fill the board with sticky minions, or 
        with minions that spawn from other minions (tokens). They can be really powerful 
        if you can take advantage of a big board, protect them and refil your hand. `,
      sampleCards: ["Violet Teacher", "Silver Hand Regent", "Onyxia"],
      decklistExtra: ["Onyxia"],
      expansion: "3"
    },
    {
      /* (16)  DOUBLE STANDARD */
      name: "Token",
      description: `A token deck is flood deck that wants to fill the board with sticky minions, or 
      with minions that spawn from other minions (tokens). They can be really powerful 
      if you can take advantage of a big board, protect them and refil your hand. `,
      sampleCards: ["Violet Teacher", "Eggnapper", "Shrieking Shroom"],
      decklistExtra: ["Fire Fly"],
      expansion: "3"
    },
    {
      /* (17) */
      name: "Mech",
      description: `Mech decks are usually fast board centric decks that take advantage of the cost 
        reduction that the Mechwarper offers. Lately we saw value cards like Gorillabot A-3. 
        Maybe they can fit in slower decks also.  `,
      sampleCards: ["Mechwarper", "Spider Tank", "Fel Reaver"],
      decklistExtra: ["Piloted Shreder", "Gorillabot A-3"],
      expansion: "1"
    },
    {
      /* (18) DOUBLE WILD */
      name: "Battlecry",
      description: `If you want to build a deck with battlecry minions it will most likely be a minion 
      based deck because most of the good battlecries require to have minions in play 
      in order to be good. They can also remove enemy minions while developing a minion, 
      allowing you some tempo plays. With Crowd Favorite introduced in TGT we also 
      have some synergy. `,
      sampleCards: ["Crowd Favorite", "Dark Iron Dwarf", "Bomb Lobber"],
      decklistExtra: ["Azure Drake", "Abusive Sergeant"],
      expansion: "1"
    },
    {
      /* (20) DOUBLE STANDARD */
      name: "Battlecry",
      description: `If you want to build a deck with battlecry minions it will most likely be a minion 
      based deck because most of the good battlecries require to have minions in play 
      in order to be good. They can also remove enemy minions while developing a minion, 
      allowing you some tempo plays. With Crowd Favorite introduced in TGT we also 
      have some synergy. `,
      sampleCards: ["Lone Champion", "Dark Iron Dwarf", "Defender of Argus"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (21) DOUBLE WILD */
      name: "Stealth",
      description: `Stealth minions have ok stats for their cost and because of their ability 
      you can choose where they attack which is very useful. Because of the stealth 
      they are also excellent in buff decks. Be careful though to not play them into a board clear. `,
      sampleCards: [
        "Gilblin Stalker",
        "Shade of Naxxramas",
        "Stranglethorn Tiger"
      ],
      decklistExtra: ["Worgen Infiltrator", "Jungle Panther"],
      expansion: "0"
    },
    {
      /* (22) DOUBLE STANDARD*/
      name: "Stealth",
      description: `Stealth minions have ok stats for their cost and because of their ability 
      you can choose where they attack which is very useful. Because of the stealth 
      they are also excellent in buff decks. Be careful though to not play them into a board clear. `,
      sampleCards: [
        "Sneaky Devil",
        "Sabretooth Stalker",
        "Stranglethorn Tiger"
      ],
      decklistExtra: ["Worgen Infiltrator", "Jungle Panther"],
      expansion: "8"
    },
    {
      /* (23) */
      name: "Murloc",
      description: `The most synergistic minion tag in the game. This can lead to a ridiculous early 
      victory if the opponent has no answers but more likely than that, there were not be 
      enough murlocs in the board for you to win. Paladin, Shaman and Warlock have some extra cards 
      in their arsenal if they choose to build a deck around Murlocs. `,
      sampleCards: ["Coldlight Seer", "Murloc Warleader", "Rockpool Hunter"],
      decklistExtra: ["Murloc Tidecaller", "Primalfin Lookout"],
      expansion: "8"
    },
    {
      /* (24) DOUBLE WILD */
      name: "Windfury",
      description: `A high health minion with windfury can easily trade 2 for 1 with smaller minions 
        but in most cases you will use the ability for pressure or lethal damage. `,
      sampleCards: ["Raging Worgen", "Dragonhawk Rider", "Windfury Harpy"],
      decklistExtra: ["Stormwatcher"],
      expansion: "3"
    },
    {
      /* (25) DOUBLE STANDARD*/
      name: "Windfury",
      description: `A high health minion with windfury can easily trade 2 for 1 with smaller minions 
      but in most cases you will use the ability for pressure or lethal damage. `,
      sampleCards: ["Raging Worgen", "Stormwatcher", "Corpsetaker"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (26) */
      name: "Antispell",
      description: `There are some times that you are really bored of the things the Rogues do to you. 
        Likely enough, there are some cards that can help you win against them or againest 
        other spell heavy classes. `,
      sampleCards: [
        "Burly Rockjaw Trogg",
        "Troggzor the Earthinator",
        "Loatheb"
      ],
      decklistExtra: ["Nerubian Unraveler"],
      expansion: "0"
    },
    {
      /* (27) */
      name: "Double BGH",
      description: `No one expects a second Big Game Hunter. So it can be game winning choice in a control metagame. `,
      sampleCards: ["Big Game Hunter", "Dark Iron Dwarf", "Abusive Sergeant"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (28) */
      name: "Hobgoblin",
      description: `Hobgoblin can compliment 1 attack minions and can also transform your petiful minions 
        into considerable threats in the late game if you have a plan. `,
      sampleCards: ["Hobgoblin", "Argent Squire", "Fire Fly"],
      decklistExtra: ["Abusive Sergeant"],
      expansion: "1"
    },
    {
      /* (29) */
      name: "Counter (tech cards)",
      description: `Those cards when they hit their target they are game changers. Why not make a deck 
        with all of them to see what happens? `,
      sampleCards: ["Mind Control Tech", "Harrison Jones", "Acidic Swamp Ooze"],
      decklistExtra: ["Big Game Hunter"],
      expansion: "99"
    },
    {
      /* (30) */
      name: "Feugen - Stalagg",
      description: `Feugen has really good stats for the cost but Stalagg is only good against expensive 
        minions. If they both die in the same game (not so usual) you develop a big threat with 
        a small cost. `,
      sampleCards: ["Feugen", "Stalagg", "Carnivorous Cube"],
      decklistExtra: [],
      expansion: "0"
    },
    {
      /* (31) */
      name: "Grim Patron",
      description: `If your class has a way to deal 1 damage to the patron you can make a full board of them. `,
      sampleCards: ["Grim Patron", "Mad Bomber"],
      decklistExtra: [],
      expansion: "2"
    },
    {
      /* (32) */
      name: "Untargetable",
      description: `Those minions can be a real headache if your opponent relies on removing your minions 
        with spells. Mage has an extra minion the Wee Spellstopper. `,
      sampleCards: [
        "Faerie Dragon",
        "Arcane Nullifier X-21",
        "Spectral Knight"
      ],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (33) */
      name: "Ogre",
      description: `Their characteristic is that they have really good stats for their cost. 
        Their disadvantage is that they are stupid. `,
      sampleCards: ["Ogre Brute", "Boulderfist Ogre", "Mogor the Ogre"],
      decklistExtra: ["Big-Time Racketeer", "Mogor the Ogre"],
      expansion: "1"
    },
    {
      /* (34) */
      name: "Giant",
      description: `Giants are big 8/8 bodies that can be tempo plays if their conditions are met. `,
      sampleCards: ["Sea Giant", "Mountain Giant", "Molten Giant"],
      decklistExtra: ["Clockwork Giant"],
      expansion: "99"
    },
    {
      /* (35) */
      name: `Plus attack`,
      description: `The most notable combo of those battlecry minions is to buff the attack of an 
        enemy creature and then Big Game Hunter it. `,
      sampleCards: ["Abusive Sergeant", "Dark Iron Dwarf", "Big Game Hunter"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (36) */
      name: "Big hand",
      description:
        "You draw cards and then play Twilight Drake and Mountain Giant on turn 4. Simple.",
      sampleCards: ["Mountain Giant", "Coldlight Oracle", "Twilight Drake"],
      decklistExtra: ["Loot Hoarder", "Novice Engineer"],
      expansion: "99"
    },
    {
      /* (37) */
      name: "Inspire",
      description: `And you thought Dragon decks are slow.. Inspire decks are reaally slow and can be 
        used only in classes that have decent hero powers and not situational ones. `,
      sampleCards: ["Garrison Commander", "Mukla's Champion", "Kvaldir Raider"],
      decklistExtra: ["Justicar Trueheart", "Silver Hand Regent"],
      expansion: "3"
    },
    {
      /* (38) */
      name: "Joust",
      description: `If their effect hits they are really good for their cost. More likely than not 
        that wont happen though because you lose even in draw. So your deck has to be 
        heavier than your opponent's and you must trust your luck. `,
      sampleCards: ["Gadgetzan Jouster", "Master Jouster", "Molten Giant"],
      decklistExtra: ["Armored Warhorse"],
      expansion: "3"
    },
    {
      /* (39) */
      name: "Silence",
      description: `Weak stats for their cost but sometimes by silencing the right target can net you 
        a big advantage and relief. `,
      sampleCards: ["Ironbeak Owl", "Spellbreaker"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (41) */
      name: "Deal damage minions",
      description:
        "This is a subset of battlecry minions that can net you tempo when played. ",
      sampleCards: ["Blackwing Corruptor", "Bomb Lobber", "North Sea Kraken"],
      decklistExtra: ["Azure Drake", "Twilight Guardian", "Faerie Dragon"],
      expansion: "1"
    },
    {
      /* (43) */
      name: "Card draw",
      description: `In this theme you choose minions or spells that let you draw cards and cycle
        your deck quickly. `,
      sampleCards: ["Coldlight Oracle", "Azure Drake", "Loot Hoarder"],
      decklistExtra: ["Novice Engineer"],
      expansion: "0"
    },
    {
      /* (44) */
      name: "Silence benefits minions",
      description: `In this theme you can negate the downsides of some minions by silencing or by giving them taunt. `,
      sampleCards: ["Ancient Watcher", "Fel Reaver", "Eerie Statue"],
      decklistExtra: ["Spellbreaker", "Ironbeak Owl"],
      expansion: "1"
    },
    {
      /* (45) */
      name: "Mana disruption",
      description: `Do you feel that your opponent will have a good play next turn? Why not ruin it then? `,
      sampleCards: ["Nerub'ar Weblord", "Mana Wraith", "Loatheb"],
      decklistExtra: ["Saboteur", "Nerubian Unraveler"],
      expansion: "0"
    },
    {
      /* (46) */
      name: "Discover",
      description: `League of Explorers introduced this mechanic that lets you find answers that are 
        not inside your deck. It has random outcomes but at least you can choose. `,
      sampleCards: ["Jeweled Scarab", "Tomb Spider", "Arch-Thief Rafaam"],
      decklistExtra: ["Lotus Agents", "Stonehill Defender"],
      expansion: "4"
    },
    {
      /* (47) DOUBLE STANDARD */
      name: "Discover",
      description: `League of Explorers introduced this mechanic that lets you find answers that are 
      not inside your deck. It has random outcomes but at least you can choose. `,
      sampleCards: ["Stonehill Defender", "Servant of Kalimos", "Fire Fly"],
      decklistExtra: ["Blazecaller"],
      expansion: "8"
    },
    // {
    //   /* (48) PROB */
    //   name: "Reno",
    //   description:
    //     "Some classes like Warlock have so many good cards that playing only 1 copy of each cards is not a big problem. The ability is so powerful that slowed considerably the meta and made new decks viable. Every aggresive, mid range player has nightmares with this card. ",
    //   sampleCards: ["Reno Jackson"],
    //   decklistExtra: [],
    //   expansion: "4"
    // },
    {
      /* (49) */
      name: "Naga Sea Witch",
      description: `Decent stats for the cost but with an ability difficult to be useful. 
        It can be good on turn 6 if you have a 9 mana minion and your opponent 
        cant remove it or on turn 10 by developing a big threat and a 5/5. 
        In the other hand it is not good to spend 5 mana for your cheaper cards. Finally
        it's broken with Giants.`,
      sampleCards: ["Naga Sea Witch", "Sea Giant", "Mountain Giant"],
      decklistExtra: ["Molten Giant"],
      expansion: "4"
    },
    {
      /* (50) */
      name: "C'Thun",
      description: `Build a deck that worships this powerful Old God! You are searching for cards that
                          are not bad to grow your C'Thun and for cards that benefit from your big C'Thun.
                          If you can somehow double the battlecry effect of the C'Thun, it is unstoppable.`,
      sampleCards: ["C'Thun", "Disciple of C'Thun", "Twin Emperor Vek'lor"],
      decklistExtra: ["C'Thun's Chosen", "Beckoner of Evil"],
      expansion: "5"
    },
    {
      /* (51) */
      name: "N'Zoth",
      description: `This Old God needs you to put some powerful deathrattle minions in your deck. 
                          Best played after a board clear to refil your board and hopefuly checkmate
                          your opponent.`,
      sampleCards: [
        "N'Zoth, the Corruptor",
        "Twilight Summoner",
        "Cairne Bloodhoof"
      ],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (52) WEIRD */
      name: "Yogg",
      description: `Used to be at least a reliable board clear before the nerf, but it is still
                          strong enough. You will have to praise Yogg though.`,
      sampleCards: ["Yogg-Saron, Hope's End", "Arcane Giant", "Burgly Bully"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (53) */
      name: "Y'Shaarj",
      description: `An end-game card that has good synergy with big minions. It is also great
                          when pulled out of you deck with Barnes (the other way around is painful though).`,
      sampleCards: [
        "Y'Shaarj, Rage Unbound",
        "The Lich King",
        "Primordial Drake"
      ],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (54) */
      name: "Triple type syngergy!",
      description: `A theme that came out in Karazhan and benefits if your deck has dragons, murlocs
                          and beasts. Even two minion types sometimes are enough.`,
      sampleCards: ["Zoobot", "Menagerie Magician", "The Curator"],
      decklistExtra: [],
      expansion: "6"
    },
    {
      /* (55) */
      name: "Hogs rock!",
      description: `Really tough to make a good deck with these... Good luck!`,
      sampleCards: [
        "Tanaris Hogchopper",
        "Spiked Hogrider",
        "Leatherclad Hogleader"
      ],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (56) */
      name: "Elemental",
      description: `An interesting minion tag that came along with the Un'Goro expansion. Elemental
      synergistic cards require you to play an elemental on the previous turn. That makes them minion
      heavy decks that play on curve.`,
      sampleCards: ["Fire Fly", "Blazecaller", "Tar Creeper"],
      decklistExtra: ["Fire Plume Phoenix", "Servant of Kalimos"],
      expansion: "8"
    },
    {
      /* (57) */
      name: "Adapt",
      description: `Similar to the discover mechanic, adapt is also random but you can choose
      an option out of three random ones. Adapt minions are also DINOSAURS!`,
      sampleCards: ["Volcanosaur", "Vicious Fledgling", "Ravasaur Runt"],
      decklistExtra: ["Pterrordax Hatchling"],
      expansion: "8"
    },
    {
      /* (58) WEIRD */
      name: "Hemet",
      description: `Decent body for the mana cost with a unique effect. It is not suited for
      control versus control but it's useful to thin out your deck and only draw your 
      late game cards.`,
      sampleCards: ["Hemet, Jungle Hunter"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (59) */
      name: "Lifesteal",
      description: `Lifesteal cards are very expensive for their mana cost. They can fully heal 
      you if they stick on the board and you buff them.`,
      sampleCards: ["Bloodworm", "Corpsetaker", "Deathaxe Punisher"],
      decklistExtra: ["Dreadscale Knight"],
      expansion: "9"
    },
    {
      /* (60) */
      name: "Recruit",
      description: `Recruit mechanic for neutral minions is centered around 5 mana cost with
      Guild Recruiter (we have cookies!) and 8 cost minions with Silver Vanguard.`,
      sampleCards: ["Guild Recruiter", "Silver Vanguard", "Master Oakheart"],
      decklistExtra: ["The Lich King", "Drakkari Enchanter"],
      expansion: "10"
    },
    {
      /* (61) WEIRD */
      name: "Big Spell",
      description: `Spiteful Summoner and Grand Archivist allow you to play minion heavy 
      decks with the requirement to put some expensive spells in your deck.`,
      sampleCards: ["Spiteful Summoner", "Grand Archivist"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (62) */
      name: "Master Oakheart",
      description: `Master Oakheart can pull out some really powerful combo's. The most popular,
      is the one listed here with Drakkari Enchanter and Dragonhatcher.`,
      sampleCards: ["Master Oakheart", "Drakkari Enchanter", "Dragonhatcher"],
      decklistExtra: ["Deathwing", "Sleepy Dragon", "Ysera"],
      expansion: "10"
    },
    {
      /* (63) */
      name: "Minions w downsides",
      description: `These are minions that have much better stats for their mana cost but they
      come with a downside. If you can play around those downsides they are worth it.`,
      sampleCards: ["Gravelsnout Knight", "Hungry Ettin", "Hoarding Dragon"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (64) */
      name: "Knight",
      description: ``,
      sampleCards: ["Silver Hand Knight", "Spectral Knight", "Silent Knight"],
      decklistExtra: ["Gravelsnout Knight", "Stormwind Knight", "The Black Knight"],
      expansion: "10"
    },
    {
      /* (65) */
      name: "Egg",
      description: ``,
      sampleCards: ["Dragon Egg", "Nerubian Egg", "Devilsaur Egg"],
      decklistExtra: ["Runic Egg", "Eggnapper", "Abusive Sergeant"],
      expansion: "0"
    },
    {
      /* (66) */
      name: "Creeper",
      description: ``,
      sampleCards: ["Haunted Creeper", "Fen Creeper", "Bog Creeper"],
      decklistExtra: ["Tar Creeper", "Corridor Creeper"],
      expansion: "0"
    },
    {
      /* (67) */
      name: "Adventurer",
      description: ``,
      sampleCards: ["Marin the Fox", "Elise Starseeker", "Sir Finley Mrrgglton"],
      decklistExtra: ["Questing Adventurer", "Elise the Trailblazer", "Brann Bronzebeard"],
      expansion: "4"
    },
    {
      /* (68) */
      name: "Dinosaur",
      description: ``,
      sampleCards: ["Volcanosaur", "Charged Devilsaur", "Vicious Fledgling"],
      decklistExtra: ["Stegodon", "Pterrodax Hatchling", "Ravasaur Runt"],
      expansion: "8"
    }
  ]
];
