/* 
    1. Flavors are interesting, mostly standalone cards that do not 
      require a big investement in the deck compared to themes. 

    2. There are:
        (17)  Druid flavors.
        (22) Hunter flavors.
        (18)  Mage flavors.
        (20) Paladin flavors.
        (17) Priest flavors.
        (22) Rogue flavors.
        (16)  Shaman flavors.
        (16) Warlock flavors.
        (14)  Warrior flavors.
        (78) Generic flavors.

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

    4. Max (5) sample + extra cards.
*/

export const deckFlavors = [
  // Druid flavors.
  [
    {
      /* (1) */
      name: "Malorne",
      description: `Pretty good stats for the mana cost and suitable for fatigue battles.
                    An average card overall.`,
      sampleCards: ["Malorne"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (2) */
      name: "Kun",
      description: `A 0 mana 7/7 or a insane combo enabler. A staple card in Druid 
                          for sure.`,
      sampleCards: ["Kun the Forgotten King", "Malygos", "Alexstrasza"],
      decklistExtra: ["Ultimate Infestasion", "Medivh, the Guardian"],
      expansion: "7"
    },
    {
      /* (3) */
      name: "Deathknight",
      description: `Why this Deathknight costs only 7 mana? One of the best Deathknight's for sure.`,
      sampleCards: ["Malfurion the Pestilent", "Fandral Staghelm"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (4) */
      name: "Ultimate Infestation",
      description: `A card that changed the Druid class for the better. 
                    Expect a nerf sometime in the future?`,
      sampleCards: ["Ultimate Infestation", "Nourish", "Innervate"],
      decklistExtra: ["Medivh, the Guardian", "Wild Growth"],
      expansion: "9"
    },
    {
      /* (5) */
      name: "Ixlid",
      description: `The ability seems insane. The
                    deck listed here is a combo one around Malygos.
                    Can you fit him in a better deck? `,
      sampleCards: [
        "Ixlid, Fungal Lord",
        "Ultimate Infestation",
        "Jungle Giants"
      ],
      decklistExtra: ["Malygos", "Faceless Manipulator", "Moonfire"],
      expansion: "10"
    },
    {
      /* (6) */
      name: "Twig",
      description: `Mainly a combo card that can lead you to explosive turns. It 
                    would be broken if it was e.g. a warrior card.`,
      sampleCards: [
        "Twig of the World Tree",
        "Ultimate Infestation",
        "Medivh, the Guardian"
      ],
      decklistExtra: [],
      expansion: "6"
    },
    {
      /* (7) */
      name: "Cenarius",
      description: `A slow, value that can end the game if you have the board or most
                    most of the times keep you alive and create a formidable board.`,
      sampleCards: ["Cenarius", "Fandral Staghelm"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (8) */
      name: "Grizzled Guardian",
      description: `A card that needs to be explored more. If the effect triggers and
                    you've built a deck around it, it's very good.`,
      sampleCards: ["Grizzled Guardian", "Astral Tiger", "Violet Teacher"],
      decklistExtra: ["Power of the Wild"],
      expansion: "10"
    },
    {
      /* (9) */
      name: "Dark Wispers",
      description: `A weak card that is suited for token or buff decks.`,
      sampleCards: ["Dark Wispers"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (10) */
      name: "Living Mana",
      description: `A powerful card that fits well in token and aggro deck.`,
      sampleCards: ["Living Mana", "Power of the Wild", "Mark of the Lotus"],
      decklistExtra: ["Firefly", "Bloodsail Corsair", "Patches the Pirate"],
      expansion: "7"
    },
    {
      /* (11) */
      name: "Fatespinner",
      description: `The "advantage" of the card is that your opponent does not
                    know the effect you chose. Sadly it is easy to guess making
                    this card weak.`,
      sampleCards: ["Fatespinner"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (12) */
      name: "Lotus Agents",
      description: `A decent card that can fit in any deck due to the discover effect.`,
      sampleCards: ["Lotus Agents"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (13) */
      name: "Branching Paths",
      description: `Flexible is the word that can describe best this card. You pay
                    a little more than the normal for flexibility.`,
      sampleCards: [
        "Branching Paths",
        "Spreading Plague",
        "Lesser Emerald Spellstone"
      ],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (14) */
      name: "Evolving Spores",
      description: `A win more card that fits in token decks.`,
      sampleCards: ["Evolving Spores", "Living Mana", "Force of Nature"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (15) */
      name: "Tortollan Forager",
      description: `In first glance it seems a very good card but most of the times
                    it is slow for 2 mana and the 5 attack minion doesn't worth it.`,
      sampleCards: ["Tortollan Forager"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (16) */
      name: "Raven Idol",
      description: `A flexible card that synergises well with spell effects like Arcane Giants.`,
      sampleCards: ["Raven Idol", "Fandral Staghelm", "Arcane Giant"],
      decklistExtra: ["Yogg-Saron, Hope's End"],
      expansion: "4"
    },
    {
      /* (17) */
      name: "Forbidden Ancient",
      description: `A flexible but weak card that gives you a basic minion for the mana cost.`,
      sampleCards: ["Forbidden Ancient"],
      decklistExtra: [],
      expansion: "5"
    }
  ],
  // Hunter flavors.
  [
    {
      /* (1) */
      name: "Tracking",
      description: `One of the most controversial card in Hearthstone for sure. This card is
                    really good because in later turns you can get what you want and discard the cards
                    you don't want to draw.`,
      sampleCards: ["Tracking"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (2) */
      name: "Steamwheedle Sniper",
      description: `One of the first experiments to make the Hunter class more control oriented.
                    It turned out that the 2 damage per turn is too good.`,
      sampleCards: [
        "Steamwheedle Sniper",
        "Auctionmaster Beardo",
        "Justicar Trueheart"
      ],
      decklistExtra: ["Tracking"],
      expansion: "1"
    },
    {
      /* (3) */
      name: "Gahz'rilla",
      description: `A win more card that can end the game quickly if the opponent doesn't remove it
                    or leaves the Tundra Rhino alive.`,
      sampleCards: ["Gahz'rilla", "Madder Bomber", "Mad Bomber"],
      decklistExtra: ["Tundra Rhino", "Call Pet"],
      expansion: "1"
    },
    {
      /* (4) */
      name: "Dreadscale - Acidmaw",
      description: `The Dreadscale is obviously the better card here but the Acidmaw can 
                    swing the game in your favor if you combo it.`,
      sampleCards: ["Dreadscale", "Acidmaw", "Unleash the Hounds"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (5) */
      name: "Explorer's Hat",
      description: `A slow value card for a control or fatigue hunter deck.`,
      sampleCards: ["Explorer's Hat", "Lock and Load"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (6) */
      name: "Desert Camel",
      description: `The ancestor of recruit decks. It is good in meta's without 
                    or weak 1 drops.`,
      sampleCards: ["Desert Camel", "Injured Kvaldir", "Gravelsnout Knight"],
      decklistExtra: ["Zombie Chow"],
      expansion: "0"
    },
    {
      /* (7) */
      name: "Giant Sand Worm",
      description: `It is a board clear and a threat combined, 
                    if the opponent leaves it on the board.`,
      sampleCards: ["Giant Sand Worm", "Tundra Rhino", "Bestial Wrath"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (8) */
      name: "Piranha Launcher",
      description: `A slow, value card that can generate value over time. Also synergises
                    well with cards that require a beast on the board.`,
      sampleCards: ["Piranha Launcher", "Houndmaster", "Crackling Razormaw"],
      decklistExtra: ["Captain Greenskin"],
      expansion: "7"
    },
    {
      /* (9) */
      name: "Dinomancy",
      description: `A card suited for slower, board centric Hunter decks. 
                    Is it really worth it to replace one of the best hero powers
                    in the game though?`,
      sampleCards: ["Dinomancy", "Auctionmaster Beardo", "Alleycat"],
      decklistExtra: ["Houndmaster", "Crackling Razormaw"],
      expansion: "8"
    },
    {
      /* (10) */
      name: "Deathknight",
      description: `This card failed to make tier 1 Hunter decks but on the other hand
                    it is one the most fun cards in the game.`,
      sampleCards: ["Deathstalker Rexxar"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (11) */
      name: "Call of the Wild",
      description: `A card that doesn't fit in competitive hunter decks. It would be 
                    good for 1 less mana. haHAA got it?`,
      sampleCards: ["Call of the Wild"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (12) */
      name: "King Krush",
      description: `One of the best entrance animations in the game.`,
      sampleCards: ["King Krush"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (13) */
      name: "Kathrena Winterwisp",
      description: `A value card and a combo enabler. It is used mainly for it's synergy with
                    big charge minions and cube`,
      sampleCards: ["Kathrena Winterwisp", "King Krush", "Charged Devilsaur"],
      decklistExtra: ["Savannah Highmane", "Carnivorous Cube"],
      expansion: "8"
    },
    {
      /* (14) */
      name: "Swamp King Dred",
      description: `Good stats for the mana cost and an interesting effect. Sadly the are 
                    no control Hunter decks to make use of it.`,
      sampleCards: ["Swamp King Dred"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (15) */
      name: "Lesser Emerald Spellstone",
      description:
        "Probably the best Hunter card of the Kobolds and Catacombs expansion.",
      sampleCards: [
        "Lesser Emerald Spellstone",
        "Wandering Monster",
        "Eaglehorn Bow"
      ],
      decklistExtra: ["Deathstalker Rexxar", "Explosive Trap"],
      expansion: "9"
    },
    {
      /* (16) */
      name: "Knuckles",
      description: "A minion that can trade and go face at the same time!",
      sampleCards: ["Knuckles", "Crackling Razormaw", "Houndmaster"],
      decklistExtra: ["Tundra Rhino"],
      expansion: "7"
    },
    {
      /* (17) */
      name: "Ram Wrangler",
      description: "If you pull at least a 3 drop from the effect it is good.",
      sampleCards: ["Ram Wrangler", "Savannah Highmane", "Alleycat"],
      decklistExtra: ["Houndmaster", "Crackling Razormaw"],
      expansion: "3"
    },
    {
      /* (18) */
      name: "Tundra Rhino",
      description: `Tundra Rhino is one of the cards that was never overpowered but always
                    finds its way in relevant Hunter decks. I think this is a sign of good
                    game development. FeelsGoodMan`,
      sampleCards: ["Tundra Rhino", "Savannah Highmane", "Corridor Creeper"],
      decklistExtra: ["Animal Companion", "Houndmaster"],
      expansion: "10"
    },
    {
      /* (19) */
      name: "Cave Hydra",
      description: `A card that your opponent will try to remove. The 2 attack makes it easy.
                    If you manage to attack with it you'll get some sweet value.`,
      sampleCards: ["Cave Hydra", "Houndmaster", "Bestial Wrath"],
      decklistExtra: ["Crackling Razormaw"],
      expansion: "10"
    },
    {
      /* (20) */
      name: "Cloaked Huntress",
      description:
        "Really good cards the cost and card that synergises with secrets.",
      sampleCards: ["Cloaked Huntress", "Secretkeeper", "Wandering Monster"],
      decklistExtra: ["Snake Trap", "Freezing Trap"],
      expansion: "6"
    },
    {
      /* (21) */
      name: "Stitched Tracker",
      description: `A value card that can create an infinite loop of discoveries. Although 
                    it is a value card it's not so slow as it seems.`,
      sampleCards: ["Stitched Tracker", "Tracking", "Savannah Highmane"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (22) */
      name: "Candleshot",
      description: `As it turns out it's good to be able to deal 1 damage (basically for
                    free) and not take damage. Good for early game, useful for late game also.`,
      sampleCards: ["Candleshot"],
      decklistExtra: [],
      expansion: "10"
    }
  ],
  // Mage flavors.
  [
    {
      /* (1) */
      name: "Polymorphs",
      description: "Nice deathrattle card you got there!",
      sampleCards: ["Polymorph: Boar", "Polymorph", "Potion of Polymorph"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (2) */
      name: "Flame Leviathan",
      description: "A control card that is included mostly in meme decks.",
      sampleCards: ["Flame Leviathan"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (3) */
      name: "Antonidas",
      description: `A staple card in mage decks. It is an exodia piece in some decks
                    and a card that must be removed at all costs in others.`,
      sampleCards: [
        "Archmage Antonidas",
        "Mirror Image",
        "Sorcerer's Apprentice"
      ],
      decklistExtra: ["Arcane Missiles"],
      expansion: "99"
    },
    {
      /* (4) */
      name: "Rhonin",
      description: `A slow card that fits well in deck that make use of small spells.`,
      sampleCards: ["Rhonin", "Malygos", "Archmage Antonidas"],
      decklistExtra: ["Flamewaker", "Sorcerer's Apprentice"],
      expansion: "3"
    },
    {
      /* (5) */
      name: "Deathknight",
      description:
        "The goal is to make a water elemental every turn. A really powerful card.",
      sampleCards: ["Frost Lich Jaina", "Baron Geddon", "Blazecaller"],
      decklistExtra: ["Frostbolt", "Blizzard"],
      expansion: "8"
    },
    {
      /* (6) */
      name: "Aluneth",
      description: `A double edged sword that is used mainly in aggresive decks. If you don't
                    end the game quickly you may lose to fatigue. It's not weak to weapon removal.`,
      sampleCards: ["Aluneth", "Fireball", "Frostbolt"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (7) */
      name: "Deck of Wonders",
      description: `Are you ready for some memes?`,
      sampleCards: ["Deck of Wonders", "Arcane Intellect", "Arcane Tyrant"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (8) */
      name: "Pyroblast",
      description: `Imagine how could that card would be for 8 mana. Oh wait...`,
      sampleCards: ["Pyroblast"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (9) */
      name: "Sindragosa",
      description: `A slow, value card that synergises well with Frost Lich Jaina or just
                    with the mage hero power.`,
      sampleCards: ["Sindragosa"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (10) */
      name: "Firelands Portal",
      description: `One the best - annoying cards in the game.`,
      sampleCards: ["Firelands Portal"],
      decklistExtra: [],
      expansion: "6"
    },
    {
      /* (11) */
      name: "Faceless Summoner",
      description: `A card that can generates a decent board if you have overstated 3 drops.`,
      sampleCards: [
        "Faceless Summoner",
        "Injured Blademaster",
        "Hyldnir Frostrider"
      ],
      decklistExtra: ["King Mukla"],
      expansion: "5"
    },
    {
      /* (12) */
      name: "Cabalist's Tome",
      description: `A decent value card with random outcomes.`,
      sampleCards: ["Cabalist's Tome"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (13) */
      name: "Ethereal Conjurer",
      description: `Ethereal Conjurer has an aggresive statline but due to the discover 
                    effect can fit in many decks.`,
      sampleCards: ["Ethereal Conjurer"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (14) */
      name: "Flamewaker",
      description: `A staple wild card in tempo mage that can cause a lot of damage if
                    you plan it correctly.`,
      sampleCards: ["Flamewaker", "Arcane Missiles", "Sorcerer's Apprentice"],
      decklistExtra: ["Primordial Glyph", "Unstable Portal"],
      expansion: "2"
    },
    {
      /* (15) */
      name: "Kabal Courier",
      description: `Kabal Courier has a weak statline but it's battlecry is powerful 
                    because it lets you choose cards not designed for your class. It
                    is also a discover effect meaning that you can choose what you need.`,
      sampleCards: ["Kabal Courier"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (16) */
      name: "Spellslinger",
      description: `An aggresive card used in tempo mage decks. If the spell has more
                    value to you than your opponent it is good.`,
      sampleCards: ["Spellslinger", "Flamewaker", "Sorcerer's Apprentice"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (17) */
      name: "Pyros",
      description: `Pyros is a value card that has decent stats (in any form) for the mana cost.
                    It is also an elemental.`,
      sampleCards: ["Pyros"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (18) */
      name: "Shifting Scroll",
      description: `The first time you get a spell that is somehow relevant to the situation,
                    you will use it.`,
      sampleCards: ["Shifting Scroll"],
      decklistExtra: [],
      expansion: "10"
    }
  ],
  // Paladin flavors.
  [
    {
      /* (1) */
      name: "Sword of Justice",
      description: `Sword of Justice has good synergy with minion heavy decks. It is more
                    on the mid-range side because spending 3 mana for nothing in an aggro deck
                    is toom much of a tempo loss.`,
      sampleCards: ["Sword of Justice", "Argent Squire"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (2) */
      name: "Blessing of Wisdom",
      description: `A flexible card that can reduce the damage from an enemy threat or make
                    one of your minions first priority target. Does this alone is worth a 
                    deck slot?`,
      sampleCards: ["Blessing of Wisdom"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (3) */
      name: "Divine Favor",
      description: `One could say that divine favor is an example of bad design because it punishes
                    slow decks for having card advantage and rewarding the aggro decks for 
                    dumping their hands. Really powerful card.`,
      sampleCards: ["Divine Favor"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (4) */
      name: "Cobalt Guardian",
      description: `A bad card that can only be used in a mech deck.`,
      sampleCards: ["Cobalt Guardian"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (5) */
      name: "Murloc Knight",
      description: `Murloc Knight is a good card can snowball the game 
                    in your favor if not removed.`,
      sampleCards: ["Murloc Knight"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (6) */
      name: "Enter the Coliseum",
      description: `This card in most situations is a worst brawl.`,
      sampleCards: ["Enter the Coliseum"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (7) */
      name: "Eadric the Pure",
      description: `It is a good control card that can neutralize your opponents damage and 
                    buy you some extra time.`,
      sampleCards: ["Eadric the Pure"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (8) */
      name: "Tirion Fordring",
      description: `Tirion is one of the best legendaries from the start of the game until
                    now.`,
      sampleCards: ["Tirion Fordring"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (9) */
      name: "Deathknight",
      description: `It can be used in one turn kill decks with Auctionmaster Beardo or be 
                    a mediocre card if used by it's own.`,
      sampleCards: ["Uther of the Ebon Blade"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (10) */
      name: "Val'anyr",
      description: `Val'anyr is a value card that can be really good if you can manage to land
                    the buff to minions that duplicate themeselves.`,
      sampleCards: ["Val'anyr", "Saronite Chain Gang", "Doppelgangster"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (11) */
      name: "Ragnaros, Lightlord",
      description: `A control card that devolopes a large body that needs to be removed 
                    by aggro decks and heals you at the same time.`,
      sampleCards: ["Ragnaros, Lightlord"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (12) */
      name: "Vinecleaver",
      description: `Vinecleaver is a value card by it's own and a nice card with silver
                    hand recruit synergy.`,
      sampleCards: ["Vinecleaver"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (13) */
      name: "Grimestreet Protector",
      description: `A win more card that can win you the game if you have 2 minions on board or 
                    be useless if you have no board.`,
      sampleCards: ["Grimestreet Protector"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (14) */
      name: "Sunkeeper Tarim",
      description: `Doesn't matter what Paladin deck you're building, Sunkeeper Tarim fits in there.`,
      sampleCards: ["Sunkeeper Tarim"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (15) */
      name: "Call to Arms",
      description: `Insane card that is bad only in Fatigue decks.`,
      sampleCards: ["Call to Arms"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (16) */
      name: "Keeper of Uldaman",
      description: `Insane card that serves multiple roles and can
                    fit in any deck.`,
      sampleCards: ["Keeper of Uldaman"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* (17) */
      name: "Coghammer",
      description: `A flexible card and maybe one of the best
                    weapons ever printed in Hearthstone.`,
      sampleCards: ["Coghammer"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (18) */
      name: "Unidentified Maul",
      description: `Seriously the only bad outcome is taunt. Really good weapon especially
                    in fast decks.`,
      sampleCards: ["Unidentified Maul"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (19) */
      name: "Wickerflame Burnbristle",
      description: `A decent minion that begs for buffs.`,
      sampleCards: ["Wickerflame Burnbristle"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (20) */
      name: "A Light in the Darkness",
      description: `A slow discover card compared to others. Hardly the +1/+1 will ever
                    make the difference.`,
      sampleCards: ["A Light in the Darkness"],
      decklistExtra: [],
      expansion: "5"
    }
  ],
  // Priest flavors.
  [
    {
      /* (1) */
      name: "Health Swap",
      description: "Are you ready for some memes?",
      sampleCards: ["Confuse", "Crazed Alchemist", "Void Ripper"],
      decklistExtra: ["Kooky Chemist"],
      expansion: "3"
    },
    {
      /* (2) */
      name: "Shadowform",
      description:
        "It is way worse than Raza + Anduin combo even after the Raza nerf.",
      sampleCards: ["Shadowform"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (3) */
      name: "Velen",
      description: `Mainly used to kill your oppoenent in one turn but can be a defensive 
                    card also.`,
      sampleCards: ["Prophet Velen", "Mind Blast"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (4) */
      name: "Shadowfiend",
      description: `You can get some sweet tempo plays if it sticks on the board or if you
                    draw some cards in the same turn`,
      sampleCards: ["Shadowfiend", "Power Word: Shield", "Coldlight Oracle"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (5) */
      name: "Vol'jin",
      description: `Used to be a staple card in Priest. It can be really good if you
                    can deal 2 damage to finish off the minion.`,
      sampleCards: ["Vol'jin", "Holy Smite", "Holy Nova"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (6) */
      name: "Confessor Paletress",
      description: `One of the better inspire cards, but still dependes a lot on the RNG.`,
      sampleCards: ["Confessor Paletress"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (7) */
      name: "Mind Control",
      description: `If you land this on a good 5 cost minion is already worth it.`,
      sampleCards: ["Mind Control"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (8) */
      name: "Herald Volazj",
      description: `You need to have a board and some deathrattle or end of turn effect minions.
                    It is a situational card.`,
      sampleCards: ["Herald Volazj"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (9) */
      name: "Lyra",
      description: `Lyra is one the best cards from Un'Goro that synergises well with Radiant
                    elemental and cheap spells.`,
      sampleCards: [
        "Lyra the Sunshard",
        "Radiant Elemental",
        "Circle of Healing"
      ],
      decklistExtra: ["Shadow Visions", "Holy Smite"],
      expansion: "8"
    },
    {
      /* 10) */
      name: "Deathknight",
      description: `Even after the Raza nerf it remains a really interesting control card.`,
      sampleCards: ["Shadowreaper Anduin"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 11) */
      name: "Free From Amber",
      description: `The discover effect is really nice but the main purpose for running this card
                    is Spiteful Summoner and Grand Archivist.`,
      sampleCards: ["Free From Amber", "Spiteful Summoner", "Grand Archivist"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 12) */
      name: "Archbishop Benedictus",
      description: `So you wanna go to fatigue?`,
      sampleCards: ["Archbishop Benedictus"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 13) */
      name: "Shadow Essence",
      description: `Mainly used in Big Priest but it's also good if you land this on 
                    a good deathrattle or end of turn effect minion.`,
      sampleCards: ["Shadow Essence"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 14) */
      name: "Devour Mind",
      description: `Hearthstone is a game where rogues perform miracles and Priests
                    steal.`,
      sampleCards: ["Devour Mind"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 15) */
      name: "Shifting Shade",
      description: "A really nice card that can stand on it's own.",
      sampleCards: ["Shifting Shade"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* 16) */
      name: "Curious Glimmerroot",
      description:
        "A really good card that almost always steals a card from your opponent.",
      sampleCards: ["Curious Glimmerroot"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 17) */
      name: "Kabal Courier",
      description: `Kabal Courier has a weak statline but it's battlecry is powerful 
      because it lets you choose cards not designed for your class. It
      is also a discover effect meaning that you can choose what you need.`,
      sampleCards: ["Kabal Courier"],
      decklistExtra: [],
      expansion: "7"
    }
  ],
  // Rogue flavors.
  [
    {
      /* (1) */
      name: "Shadowstep",
      description: `Shadowstep can be used in many different ways. From burst damage if you
      bounce a charge minion to quest completion in a quest rogue deck.`,
      sampleCards: ["Shadowstep", "Vilespine Slayer", "Elven Minstrel"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (2) */
      name: "Gang Up",
      description: `Mainly used in mill decks for copying your Coldlight Oracles.`,
      sampleCards: ["Gang Up"],
      decklistExtra: [],
      expansion: "2"
    },
    {
      /* (3) */
      name: "Betrayal",
      description: `It requires your opponent to have at least two minions but is not 
      that bad even if it deals 3 damage to minion.`,
      sampleCards: ["Betrayal"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (4) */
      name: "Beneath the Grounds",
      description: `A meme card or a counter to Highlander decks in Wild.`,
      sampleCards: ["Beneath the Grounds", "Coldlight Oracle", "Shadowstep"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (5) */
      name: "Headcrack",
      description: `You can basically read it as Hunter hero power for 3 mana if you 
                    play a card this turn. Not so good...`,
      sampleCards: ["Headcrack"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (6) */
      name: "Anub'arak",
      description: "If rogue had survivability this card would be really good.",
      sampleCards: ["Anub'arak", "Kobold Illusionist"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (7) */
      name: "Shadowcaster",
      description:
        "Maybe the best meme card in the game. It also not that bad.",
      sampleCards: ["Shadowcaster"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (8) */
      name: "Deathknight",
      description: `Survive one extra turn and gain some sweet value in the following 
      turns for 9 mana.`,
      sampleCards: ["Valeera the Hollow"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (9) */
      name: "Spectral Pillager",
      description: `A bad card mainly used in combo one turn kill decks.`,
      sampleCards: ["Spectral Pillager", "Preparation", "Shadowstep"],
      decklistExtra: ["Counterfeit Coin"],
      expansion: "7"
    },
    {
      /* (10) */
      name: "Sonya Shadowdancer",
      description: `A value card that has great synergy with Quest rogue
      and charge minions.`,
      sampleCards: [
        "Sonya Shadowdancer",
        "The Caverns Below",
        "Southsea Deckhand"
      ],
      decklistExtra: ["Stonetusk Boar"],
      expansion: "8"
    },
    {
      /* (11) */
      name: "Thistle Tea",
      description: `It can be really powerful if it lands on the right card. Imagine that it
      could allow you to have up to 6 copies of card.`,
      sampleCards: ["Thistle Tea", "Preparation"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (12) */
      name: "Mimic Pod",
      description: `A smaller and better Thistle Tea in the same time.`,
      sampleCards: ["Mimic Pod"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (13) */
      name: "Trade Prince Gallywix",
      description: `With this card you trade tempo for value meaning that you give
                    your opponent tempo (or combo opportunities) with the coins and
                    you get value with the spell you get. At worst it is a 6 mana 5/8.`,
      sampleCards: ["Trade Prince Gallywix"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (14) */
      name: "Lotus Agents",
      description: `A decent card that can fit in any deck due to the discover effect.`,
      sampleCards: ["Lotus Agents"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (15) */
      name: "Lotus Assassin",
      description: `Decent stats for the mana cost and a great board control card. Difficult
      to find a decent Rogue deck to fit this in.`,
      sampleCards: ["Lotus Assassin"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (16) */
      name: "Elven Minstrel",
      description: `As it turns out is one of the best cards from Kobolds and Catacombs.`,
      sampleCards: ["Elven Minstrel", "Shadowstep"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (17) */
      name: "Fal'dorei Strider",
      description: `If your goal is to summon a bunch of 4/4 it's better than Beneath 
      the Grounds. :D`,
      sampleCards: ["Fal'dorei Strider", "Coldlight Oracle", "Loot Hoarder"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (18) */
      name: "Lilian Voss",
      description: `A Chillwind Yeti that does something.`,
      sampleCards: ["Lilian Voss"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (19) */
      name: "Xaril, Poisoned Mind",
      description: `This card is not so great by it's own but needs some synergy with 
      low cost spells or deathrattle.`,
      sampleCards: ["Xaril, Poisoned Mind"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (20) */
      name: "Shaku, the Collector",
      description: `Shaku is a really good card in midrange and tempo decks. It is 
      a 2/3 for 3 mana that draws you a random card the next turn.`,
      sampleCards: ["Shaku, the Collector"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (21) */
      name: "Hallucination",
      description: `The discover effect of hallucination has value by it's own but 
      also synergises well with cards such as the Gadgetzan Auctioneer and the Arcane Giant.`,
      sampleCards: ["Hallucination"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (22) */
      name: "Journey Below",
      description: `Especially good in deathrattle decks.`,
      sampleCards: ["Journey Below"],
      decklistExtra: [],
      expansion: "5"
    }
  ],
  // Shaman flavors.
  [
    {
      /* (1) */
      name: "Reincarnate",
      description: "Reincarnate can be used as a heal, or a deathrattle proc.",
      sampleCards: ["Reincarnate", "Nerubian Egg", "Ancestral Spirit"],
      decklistExtra: ["Sylvanas Windrunner"],
      expansion: "0"
    },
    {
      /* (2) */
      name: "Charged Hammer",
      description:
        "A slow weapon that upgrades your hero power in the right deck.",
      sampleCards: ["Charged Hammer"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (3) */
      name: "Mistcaller",
      description: `A reaaaaly slow Prince Keleseth that allows you to play 2 drops. Not
      good enough.`,
      sampleCards: ["Mistcaller"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (4) */
      name: "Neptulon",
      description: `Really good synergy in a murloc deck but can easily stand on it's own.`,
      sampleCards: ["Neptulon"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (5) */
      name: "Hallazeal the Ascended",
      description: `It is as it looks. Insane card in the right moment. Average most
      of the times.`,
      sampleCards: ["Hallazeal the Ascended", "Lightning Storm", "Volcano"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (6) */
      name: "Deathknight",
      description: `Probably a downgrade for your hero power in non evolve shaman decks but
      a good deathknight for it's cost overall.`,
      sampleCards: ["Thrall, Deathseer"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (7) */
      name: "Grumble",
      description: `This card has a lot potentional with battlecry cards.`,
      sampleCards: ["Grumble, Worldshaker", "Jade Spirit", "Blazecaller"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (8) */
      name: "Unstable Evolution",
      description: `The dream is to evolve a 0 or 1 mana minion to a Sorcerer's Apprentice.
      It has good synergy with cards like Arcane Giant and Yogg.`,
      sampleCards: ["Unstable Evolution", "Arcane Giant", "Corridor Creeper"],
      decklistExtra: ["Evolution"],
      expansion: "6"
    },
    {
      /* (9) */
      name: "Runespear",
      description: `It is good if you roll spells that don't need a target like damage aoe's 
      or Bloodlust.`,
      sampleCards: ["The Runespear"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (10) */
      name: "Hammer of Twilight",
      description: `A 4/2 weapon for 5 mana is not great but the 4/2 elemental makes it appealing.
       Also note that you can choose when to summon it.`,
      sampleCards: ["Hammer of Twilight"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (11) */
      name: "Lotus Agents",
      description:
        "A decent card that can fit in any deck due to the discover effect.",
      sampleCards: ["Lotus Agents"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (12) */
      name: "White Eyes",
      description: `A decent card by it's own that shines with deathrattle effects or when
       you draw the 5 mana 10/10.`,
      sampleCards: ["White Eyes"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (13) */
      name: "Ancestral Knowledge",
      description: `Shaman doesn't have many card draw so a 4 mana draw 2 cards with
       overload synergy is ok.`,
      sampleCards: ["Ancestral Knowledge"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (14) */
      name: "Cryostasis",
      description: "Yeah, sorry about that.",
      sampleCards: ["Cryostasis"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (15) */
      name: "Murmuring Elemental",
      description: `It can enable some interesting combos with Emperor Thaurissan. It's 
      still ok along with a powerful battlecry.`,
      sampleCards: ["Murmuring Elemental"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (16) */
      name: "Finders Keepers",
      description: `Overload cards tend to be powerful so you'll most likely find 
      something useful out of this.`,
      sampleCards: ["Finders Keepers"],
      decklistExtra: [],
      expansion: "7"
    }
  ],
  // Warlock flavors.
  [
    {
      /* (1) */
      name: "Summoning Portal",
      description: `Can be considered as a meme card.`,
      sampleCards: ["Summoning Portal"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (2) */
      name: "Floating Watcher",
      description: `A self damage card before it became mainstream with Kobolds and Catacombs.`,
      sampleCards: ["Floating Watcher", "Flame Imp", "Vulgar Homunculus"],
      decklistExtra: ["Lesser Amethyst Spellstone", "Kobold Librarian"],
      expansion: "1"
    },
    {
      /* (3) */
      name: "Corruption",
      description: `You play a meme deck sir!`,
      sampleCards: ["Corruption", "Corrupting Mist"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (4) */
      name: "Dreadsteed",
      description: `Can provide you infinite value until silence but the body is irrelavant 
      and mana cost is high.`,
      sampleCards: ["Dreadsteed", "Power Overwhelming", "Baron Rivendare"],
      decklistExtra: ["Anima Golem", "Mal'Ganis", "Defender of Argus"],
      expansion: "0"
    },
    {
      /* (5) */
      name: "Void Crusher",
      description: "^^",
      sampleCards: ["Void Crusher"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (6) */
      name: "Wilfred Fizzlebang",
      description: "^^",
      sampleCards: ["Wilfred Fizzlebang"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (7) */
      name: "Twisting Nether",
      description:
        "When everything else fails you can count on twisting nether.",
      sampleCards: ["Twisting Nether"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (8) */
      name: "Lord Jaraxxus",
      description:
        "One of the most fun cards in Hearthstone that inspired the Deathknight cards.",
      sampleCards: ["Lord Jaraxxus"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (9) */
      name: "Curse of Rafaam",
      description: "It's not really good. :D",
      sampleCards: ["Curse of Rafaam", "Nozdormu"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* (10) */
      name: "Deathknight",
      description:
        "The most expensive deathknight that usually wins you the game when played.",
      sampleCards: ["Bloodreaver Gul'dan", "Despicable Dreadlord", "Voidlord"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (11) */
      name: "Rin",
      description: `A interesting card that has ok stats for the cost and has deathrattle synergy.
       It gives you something to play the following turns and can win you the game in control or
        fatigue matchups.`,
      sampleCards: ["Rin, the First Disciple", "N'Zoth, the Corruptor"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (12) */
      name: "Kabal Trafficker",
      description: "An average value card with random outcomes.",
      sampleCards: ["Kabal Trafficker"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (13) */
      name: "Bane of Doom",
      description:
        "Not a very good card on average but can swing the game if you roll high.",
      sampleCards: ["Bane of Doom"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (14) */
      name: "Chittering Tunneler",
      description: "Chittering tunneler is a mediocre value card.",
      sampleCards: ["Chittering Tunneler"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (15) */
      name: "Kabal Courier",
      description: `Kabal Courier has a weak statline but it's battlecry is powerful 
      because it lets you choose cards not designed for your class. It
      is also a discover effect meaning that you can choose what you need.`,
      sampleCards: ["Kabal Courier"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (16) */
      name: "Dark Peddler",
      description: "One of the best Warlock cards ever printed.",
      sampleCards: ["Dark Peddler"],
      decklistExtra: [],
      expansion: "4"
    }
  ],
  // Warrior flavors.
  [
    {
      /* (1) */
      name: "Axe Flinger",
      description:
        "Weak stats for the cost but synergises well with self damage spells or battlcries.",
      sampleCards: ["Axe Flinger", "Whirlwind", "Cruel Taskmaster"],
      decklistExtra: ["Commanding Shout", "Bouncing Blade"],
      expansion: "1"
    },
    {
      /* (2) */
      name: "Magnataur Alpha",
      description: "A bad Cave Hydra for Warrior.",
      sampleCards: ["Magnataur Alpha", "Charge", "Commanding Shout"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (3) */
      name: "Varian Wrynn",
      description: `Varian Wrynn is basically bad only in fatigue or control matchups or in 
      games end before turn 10.`,
      sampleCards: ["Varian Wrynn"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (4) */
      name: "Grommash Hellscream",
      description: `It is used mainly as burst damage by the Warrior.`,
      sampleCards: ["Grommash Hellscream", "Cruel Taskmaster", "Inner Rage"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (5) */
      name: "Explore Un'Goro",
      description: `Have you explored the Un'Goro yet? Pack your things and 
                          get ready for some memes.`,
      sampleCards: ["Explore Un'Goro", "Shield Block", "Battle Rage"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (6) */
      name: "Deathknight",
      description: `An interesting deathknight with an insane weapon and a hero power useful 
      in the right decks.`,
      sampleCards: ["Scourgelord Garrosh"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* 7) */
      name: "Blood Warriors",
      description:
        "It can be used as a mediocre value card or in an Arcane Giant deck.",
      sampleCards: ["Blood Warriors", "Whirlwind"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* 8) */
      name: "King Mosh",
      description: `King mosh is an expensive mass execute that comes with a big body. 
      It is a good card even if you kill one minion.`,
      sampleCards: ["King Mosh"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 9) */
      name: "Geosculptor Yip",
      description:
        "A powerful end of turn effect for 8 mana that can snowball the game.",
      sampleCards: ["Geosculptor Yip", "Unidentified Shield", "Shield Block"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* 10) */
      name: "Gorehowl",
      description: `Gorehowl is card that can generate you insane value if you have 
       survivability but is really weak to weapon removal.`,
      sampleCards: ["Gorehowl", "Captain Greenskin"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* 11) */
      name: "Malkorok",
      description: "Cursed blade PTSD.",
      sampleCards: ["Malkorok"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* 12) */
      name: "Grimy Gadgeteer",
      description: "If you think of it as a 4 mana 6/5 it's not bad.",
      sampleCards: ["Grimy Gadgeteer"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* 13) */
      name: "Molten Blade",
      description: `The first decent weapon you get that is also relevant to the situation, 
       you use it.`,
      sampleCards: ["Molten Blade"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* 14) */
      name: "I Know a Guy",
      description: `You pay 1 extra mana to discover a taunt minion. Why don't you just 
      include the taunt minion you want?`,
      sampleCards: ["I Know a Guy"],
      decklistExtra: [],
      expansion: "7"
    }
  ],
  // General flavors.
  [
    {
      /* (1) */
      name: "Recombobulator",
      description: `Decent stats for a 2 drop as a tempo play on turn 2 and a powerful ability 
        that can 'heal' your minion after value trading. `,
      sampleCards: ["Recombobulator"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (2) */
      name: "Alarm-o-Bot",
      description:
        "An extremelly situational card that if it sticks for a turn allows you to cheat the curve. ",
      sampleCards: ["Alarm-o-Bot"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (3) */
      name: "Enhance-o Mechano",
      description: `A card that is useful only if you have a board. It can be an one turn kill if you 
        have big minions or infinite value board in flood decks. Definitely a 'win more' card. `,
      sampleCards: ["Enhance-o Mechano"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (4) */
      name: "Gazlowe",
      description: `A value card suited for mech decks due to spare parts, or for classes that take  
        advantage of the cheap spells. Definitely an above average legendary.`,
      sampleCards: ["Gazlowe"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (5) */
      name: "Kel'Thuzad",
      description: `An insane value - tempo card that lets you trade your board and get a new one each turn. 
        It is difficult to kill and if it sticks you win the game. It requires you to have 
        at least one valuable minion. `,
      sampleCards: ["Kel'Thuzad"],
      decklistExtra: [],
      expansion: "0"
    },
    {
      /* (6) */
      name: "Chromaggus",
      description: `Chromaggus is a really fun and valuable minion that synergizes with classes that have 
        cheap draw. It's a really expensive combo to pull though and if you don't draw at least 
        two times or the correct cards, it is a waste of tempo. `,
      sampleCards: ["Chromaggus"],
      decklistExtra: [],
      expansion: "2"
    },
    {
      /* (7) */
      name: "Majordomo",
      description: `The ability of Majordomo Executus seems more like a bad thing than good. 
         Can you make something out of it? `,
      sampleCards: ["Majordomo Executus"],
      decklistExtra: [],
      expansion: "2"
    },
    {
      /* (8) */
      name: "Malygos",
      description: `Unlimited burst if it survives for a turn. Emperor Thaurissan makes it 
        possible to one turn kill your opponent the turn you play him. 
        Decent body even if he gets silenced. `,
      sampleCards: ["Malygos"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (9) */
      name: "Auctioneer",
      description: `Infinite cycle through your deck if you protect him. Suitable for rogues and 
        combo decks that need their combo pieces fast. Can you make it until the turn he gets played? `,
      sampleCards: ["Gadgetzan Auctioneer"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (10) */
      name: "Mekgineer Thermaplugg",
      description: `A big threat that needs to be played after your opponent used big game hunter. 
        It begs for hard removal. If not removed you can push some damage with him or with the 
        leper gnomes he spanws.`,
      sampleCards: ["Mekgineer Thermaplugg"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (11) */
      name: "Nozdormu",
      description:
        "Play it last in a complicated board and quickly hit the end turn button. ",
      sampleCards: ["Nozdormu"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (12) */
      name: "Deathwing",
      description: `An insane board clear - tempo card suited for fatigue decks. The downsides? 
        You will most likely discard useful cards and it will get killed by big game 
        hunter or hard removal. `,
      sampleCards: ["Deathwing"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (13) */
      name: "Explosive Sheep",
      description: "Depending on the class is a common consecration. Yeah. ",
      sampleCards: ["Explosive Sheep"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (14) */
      name: "Wild Pyromancer",
      description: `An infinite board clear in the right class. A unexpected and gimmicky combo enabler 
        in some others. Decent stats even if played on turn 2 for tempo. `,
      sampleCards: ["Wild Pyromancer"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (15) */
      name: "Deathlord",
      description: `With insane stats for 3 mana, Deathlord is the epitome of the fatigue deck. 
        If you don't have the answer for what it spawns upon death though, you can easily lose the game. `,
      sampleCards: ["Deathlord"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (16) */
      name: "Jeeves",
      description: `Suitable for fast decks that run out of cards quickly. It can also fit in mech 
        or hobgoblin decks. `,
      sampleCards: ["Jeeves"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (17) */
      name: "Violet Teacher",
      description: `A card that synergizes well with cheap spells. If not removed it can flood the board 
        with 1/1 tokens. Decent stats due to 5 health. `,
      sampleCards: ["Violet Teacher"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (18) */
      name: "Faceless Manipulator",
      description: `Faceless is useful for burst combos and if you or your opponent runs big minions. 
        In a fast meta if you dont run big taunts it's useless. `,
      sampleCards: ["Faceless Manipulator"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (19) */
      name: "Blingtron 3000",
      description: `Weak stats for 4 mana minion and RNG based. You can combo it with Acidic Swamp Ooze, 
        Harrison Jones, water elementals to negate the RNG effect. `,
      sampleCards: ["Blingtron 3000"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (20) */
      name: "Doomsayer",
      description: `A board clear in freeze mages, behind taunts and a way to skip you opponent's early turns. 
        Weak to silence but oddly enough a decent body for buffs after silence. `,
      sampleCards: ["Doomsayer"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (21) */
      name: "Double Mind Control",
      description: `An arena dilemma (do i play around it?) and a tech card that punishes your opponent for 
        flooding the board or being ahead. Your can combo him with Brann Bronzebeard and Hungry Dragon. `,
      sampleCards: ["Mind Control Tech"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (22) */
      name: "Brewmasters",
      description: `Brewmasters are value based minions that have ok stats for their cost. They are useful 
        if you run valuable battlecries or want to mill your opponent with Coldlight Oracle. `,
      sampleCards: [
        "Youthful Brewmaster",
        "Ancient Brewmaster",
        "Zola the Gorgon"
      ],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (23) */
      name: "Fel Reaver",
      description: `A aggresive big threat that comes on turn 5 (if you are not a Druid) and wants to go face 
        in order to end the game quickly. That is because the opponent will mill your deck 
        in a few turns with Fel Reaver on the board. Another downside is that it gets killed 
        by big game hunter. `,
      sampleCards: ["Fel Reaver"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (24) */
      name: "Leeroy",
      description: `A card suited for one turn kill or super aggresive decks. The battlecry is a big 
        disadvantage if you play him without having lethal. `,
      sampleCards: ["Leeroy Jenkins"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (25) */
      name: "Hogger",
      description: `Hogger is a value card that if sticks in the board can flood it with small taunts 
        and protect you from lethal damage. The stats are too weak for the mana cost. `,
      sampleCards: ["Hogger"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (26) */
      name: "Illidan Stormrage",
      description:
        "An infinite value card that is a demon but with terrible stat distribution. ",
      sampleCards: ["Illidan Stormrage"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (27) */
      name: "Eydis - Fjola",
      description: `Legendary spider tanks. Meaning top tier stats for the cost. Their abilities are 
        powerful if you run a lot of buffs.`,
      sampleCards: ["Fjola Lightbane"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (28) */
      name: "Fencing Coach",
      description: `Weak stats for the cost but it can be a combo enabler for inspire decks. `,
      sampleCards: ["Fencing Coach"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (29) */
      name: "Nexus-Champion Saraad",
      description: `This is a fun value card that fits in control - fatigue decks. The random spells are 
        usually ok and sometimes can win you the game. The downside is that it is really slow. `,
      sampleCards: ["Nexus-Champion Saraad"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (30) */
      name: "Mukla's Champion",
      description: `Mukla's Champion is a headache for your opponent if you have a big board and he 
        doen't have removal. You must ask yourself how ofter does this happens? `,
      sampleCards: ["Mukla's Champion"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (31) */
      name: "Bolf Ramshield",
      description:
        "Hmm, if you make something good from him you are a master deck builder for sure. ",
      sampleCards: ["Bolf Ramshield"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (32) */
      name: "Kodorider",
      description: `Another value inspire card that spawn 3/5. It is definitely slow and the 3/5 stats 
        don't seem to make an impact when you play it. `,
      sampleCards: ["Kodorider"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (33) */
      name: "Justicar Trueheart",
      description: `A card that can make your hero power dreadful. Useful in control fatigue or inspire decks. `,
      sampleCards: ["Justicar Trueheart"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (34) */
      name: "Sideshow Spelleater",
      description:
        "Good if you don't draw the card you should be playing, Sir Finley Mrrgglton. ",
      sampleCards: ["Sideshow Spelleater"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (35) */
      name: "Icehowl",
      description: `A hard removal that can remove a threat and be on the board to remove another creature. 
        It can't go face unless you silence it. `,
      sampleCards: ["Icehowl", "Spellbreaker"],
      decklistExtra: [],
      expansion: "3"
    },
    {
      /* (36) */
      name: "Common Bombs",
      description: `As bomb in Hearthstone we refer to a big threat. Usualy those cards are legendary minions 
        so you can't have more than one in your deck. TGT though introduced a decent one, the 
        North Sea Kraken. Alongside the Force-Tank MAX you may be able to make something happen.`,
      sampleCards: ["North Sea Kraken", "Force-Tank MAX", "Violet Wurm"],
      decklistExtra: [],
      expansion: "1"
    },
    {
      /* (37) */

      name: "Onyxia",
      description: `One advantage of having this card is that it developes a big threat and in the same time 
        the opponent must have a board clear. Onyxia is a really good threat if your class takes 
        advantage of having minions on board. Some classes like Warrior though can remove it easily. `,
      sampleCards: ["Onyxia"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (38) */

      name: "Ysera",
      description: `Ysera is the ultimate value card that can win you the game if it sticks more than one turn 
        or you get the dream card you want. It has really good stats even silenced. 
        The disadvantages? It is slow and it's painful if your opponent can steal it from you 
        (e.g. by killing their own Sylvanas). `,
      sampleCards: ["Ysera"],
      decklistExtra: [],
      expansion: "99"
    },
    {
      /* (39) */

      name: "Brann Bronzebeard",
      description: `Brann has decent stats to battle aggresive minions on turn 3 and in the same time 
        can compliment battlecry cards for tempo or value. `,
      sampleCards: ["Brann Bronzebeard"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* (40) */

      name: "Sir Finley Mrrgglton",
      description: `A decent 1 drop for every class that enables you to play an archetype not suited 
        for your class and hero power. Control Rogue with Armor up anyone?`,
      sampleCards: ["Sir Finley Mrrgglton"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* (41) */

      name: "Elise Starseeker",
      description: `Elise Starseeker is card suited for fatigue decks that can transform your low 
        value cards into legendaries. In most matchups though you will not be able to pull 
        that combo. Another disadvantage is that you may lose valuable spells after playing the monkey. `,
      sampleCards: ["Elise Starseeker"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* (42) */

      name: "Summoning Stone",
      description: `Summoning stone is a card that requires you to build a deck around it. The six health 
        can absorb a lot of resources if you play it on an empty board and if it sticks the 
        tempo is insane. `,
      sampleCards: ["Summoning Stone"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* (43) */

      name: "Arch-Thief Rafaam",
      description: `It is definitely an end game value card just like Ysera. The card you get is better 
        but only one and the stats are not that great because it can be killed by hard removal. `,
      sampleCards: ["Arch-Thief Rafaam"],
      decklistExtra: [],
      expansion: "4"
    },
    {
      /* (44) */

      name: "Hogger, Doom of Elwynn",
      description: `A card that synergizes well with classes like Warrior that can damage it to spawn
                        more minions. The 2/2's with taunt are not that great but keep in mind that make
                        killing hogger only with minions really hard. Six health is good because 
                        it is generally hard to remove it with one hit or spell`,
      sampleCards: ["Hogger, Doom of Elwynn"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (45) */

      name: "Soggoth the Slitherer",
      description: `A really big taunt that can keep you alive and dies only by minion damage 
                        and spells that don't require a target. It has good synergy with Y'Shaarj.`,
      sampleCards: ["Soggoth the Slitherer"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (46) */

      name: "Blood of The Ancient One",
      description: `Lets be honest, this card is mainly for memes. The thing is that even
                        if you pull out the combo and summon a 30/30 it is not always enough to 
                        win you the game.`,
      sampleCards: ["Blood of The Ancient One", "Faceless Manipulator"],
      decklistExtra: [],
      expansion: "5"
    },
    {
      /* (47) */

      name: "Moroes",
      description: `A slow card that can generate value over time. It is better in a 
                        slow token deck.`,
      sampleCards: ["Moroes"],
      decklistExtra: [],
      expansion: "6"
    },
    {
      /* (48) */

      name: "Barnes",
      description: `One of the best and most frustrating cards to play against because of the
                        random outcomes. It is good if you have minions with end of turn effects 
                        like Ysera or minions with powerful dethrattles.`,
      sampleCards: ["Barnes"],
      decklistExtra: [],
      expansion: "6"
    },
    {
      /* (49) */

      name: "Medivh",
      description: `A slow control card that is vulnerable to weapon removal and has synergy
                        with big spells. If the weapon sticks it can generate you a lot of value.`,
      sampleCards: ["Medivh, the Guardian"],
      decklistExtra: [],
      expansion: "6"
    },
    // {
    //   /* (50) PROB */

    //   name: "Arcane Giant",
    //   description: `This is one of the most used giants in Hearthstone. It fits in decks that play
    //                     cheap spells and have good cycle or in combo decks.`,
    //   sampleCards: ["Arcane Giant"],
    //   decklistExtra: [],
    //   expansion: "6"
    // },
    {
      /* (51) */

      name: "Auctionmaster Beardo",
      description: `This card has good stats for its cost, but that is not enough for seeing 
                        competitive play. It can be justified if you hero power generates a lot
                        of value.`,
      sampleCards: ["Auctionmaster Beardo"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (52) */

      name: "Genzo, the Shark",
      description: `An aggressive card that fits in decks that can empty their hand quickly.`,
      sampleCards: ["Genzo, the Shark"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (53) */

      name: "Burgly Bully",
      description: `The six health makes it hard to remove only with minions and if you use
                        spells the opponent gets coins. Good in decks that can benefit from coins.`,
      sampleCards: ["Burgly Bully"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (54) */

      name: "Finja",
      description: `It seems that you will add some powerful murlocs in your deck. 
                        It is a powerful card for sure.`,
      sampleCards: [
        "Finja, the Flying Star",
        "Murloc Warleader",
        "Bluegill Warrior"
      ],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (55) */

      name: "Mayor Noggenfogger",
      description: `Ehm, yes.. I don't know about that. You will have to come up with
                        something ridiculous`,
      sampleCards: ["Mayor Noggenfogger"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (56) */

      name: "Prince Malchezaar",
      description: `Not a really powerful card because of the random outcome but one that
                        fits well in fatigue decks and can generate value in long battles.`,
      sampleCards: ["Prince Malchezaar"],
      decklistExtra: [],
      expansion: "6"
    },
    {
      /* (57) */

      name: "Patches",
      description: `Arguably the most powerful card in Hearthstone ... until it got nerfed. 
      Before the nerf you didn't have to built a deck full of pirates even a good one was enough.
      Now that's not longer the case. Still good though in pirate or token decks.`,
      sampleCards: [
        "Patches the Pirate",
        "Bloodsail Corsail",
        "Southsea Captain"
      ],
      decklistExtra: [],
      expansion: ""
    },
    {
      /* (58) */

      name: "Weasel",
      description: `Don't underestimate the meme potential of the card. Seriously though,
                        if you suffle enough of these in your opponenet's deck it can
                        disrupt some combos.`,
      sampleCards: ["Weasel Tunneler"],
      decklistExtra: [],
      expansion: "7"
    },
    {
      /* (59) */

      name: "Umbra",
      description: `Umbra is a card that can't be played on curve due to the weak statline.
      You should combo it with some decent deathrattles like Mistress of Mixtures, if you need
      the heal of course. Or you can combo it with powerful deathrattle likes the Carvivorous
      Cube for some sweet value.`,
      sampleCards: ["Spiritsinger Umbra"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (60) */

      name: "Elise",
      description: `Just like her alter ego (Elise the Starseeker), Elise the Trailblazer has 
      good stats for the mana cost and it's a value card. In drawned out games can provide you
      a lot of fuel to end the game.`,
      sampleCards: ["Elise the Trailblazer"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (61) */

      name: "The Voraxx",
      description: `Weak stats for the cost that needs to be combo'd with good buffs.`,
      sampleCards: ["The Voraxx"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (62) */

      name: "Tortollan Primalist",
      description: `If your class have good spells that don't require a target, you may consider
      it as an option. But not really, it's not good.`,
      sampleCards: ["Tortollan Primalist"],
      decklistExtra: [],
      expansion: "8"
    },
    {
      /* (63) */

      name: "Lich King",
      description: `Did you miss those really good neutral legendaries that you could put 
      in many different decks like Sylvanas and Ragnaros? Well, the Lich King is exactly that.`,
      sampleCards: ["The Lich King"],
      decklistExtra: [],
      expansion: "9"
    },
    // {
    //   /* (64) PROB */

    //   name: "Prince Keleseth",
    //   description: ``,
    //   sampleCards: ["Prince Keleseth"],
    //   decklistExtra: [],
    //   expansion: "9"
    // },
    // {
    //   /* (65) PROB */

    //   name: "Prince Taldaram",
    //   description: ``,
    //   sampleCards: ["Prince Taldaram"],
    //   decklistExtra: [],
    //   expansion: "9"
    // },
    // {
    //   /* (66) PROB */

    //   name: "Prince Valanar",
    //   description: ``,
    //   sampleCards: ["Prince Valanar"],
    //   decklistExtra: [],
    //   expansion: "9"
    // },
    {
      /* (67) */

      name: "Drakkari Enchanter",
      description: `The stats are not good but the 5 health is not the worst. It's good if 
      you have some good end of turn effects or combo it with Master Oakheart and Dragonhatcher.`,
      sampleCards: ["Drakkari Enchanter"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (68) */

      name: "Corpsetaker",
      description: `A good 4 drop if you manage to give it at least 3 out of 4 mechanics.`,
      sampleCards: ["Corpsetaker"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (69) */

      name: "Nerubian Unraveler",
      description: `Some mana disruption cards after Loatheb went to Wild! It's not on 
      the same power level though.`,
      sampleCards: ["Nerubian Unraveler"],
      decklistExtra: [],
      expansion: "9"
    },
    {
      /* (70) */

      name: "Marin",
      description: `A win more card that fits in slow decks and can make you games memorable.
      Most of the times you will not get the chance to play it.`,
      sampleCards: ["Marin the Fox", "Crazed Alchemist"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (71) */

      name: "The Darkness",
      description: `You pay 4 mana to disable the Highlander cards of your opponent for a while. 
      You may also summon a 20/20 sometime that your opponent will most likely remove.`,
      sampleCards: ["The Darkness", "Coldlight Oracle"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (72) */

      name: "King Togwaggle",
      description: `The deck i just suggested you will most likely suck. So King Togwaggle
      is the best card you could have.`,
      sampleCards: ["King Togwaggle"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (73) */

      name: "Arcane Tyrant",
      description: `A really good card that can be a 0 mana 4/4 in decks with good expensive spells.
      It rewards you for playing slow expensive spells, what more can you ask from the Hearthstone designers?
      Probably to nerf the Ultimate Infestation.`,
      sampleCards: ["Arcane Tyrant"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (74) */

      name: "Sneaky Devil",
      description: `These kind of cards are dangerous for the game. Except if they cost 4 mana
      and they suck.`,
      sampleCards: ["Sneaky Devil"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (75) */

      name: "Feral Gibberer",
      description: `An interesting card that can become dangerous if you don't remove the first one.`,
      sampleCards: ["Feral Gibberer"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (76) */

      name: "Kobold Monk",
      description: `Heal 6 life for 4 mana, but what if you give it stealth? `,
      sampleCards: ["Kobold Monk"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (77) */

      name: "Shimmering Courser",
      description: `A card that needs to be played in deck with a lot of buffs. Not that
      great even there.`,
      sampleCards: ["Shimmering Courser"],
      decklistExtra: [],
      expansion: "10"
    },
    {
      /* (78) */

      name: "Zola the Gorgon",
      description: `Zola is probably a better Youthful Brewmaster.`,
      sampleCards: ["Zola the Gorgon"],
      decklistExtra: [],
      expansion: "10"
    }
  ]
];
