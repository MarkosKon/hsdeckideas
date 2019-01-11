# Hearthstone Deck Ideas

## Description

Hearthstone Deck Ideas is a **random deck generator** for **Hearthstone** built with React. It's a hobby project that helps me put into practice what I learn about JavaScript and React. I also use it as an excuse to play Hearthstone while "testing" new features on the ladder.

### Visit the live application

[Live Demo](https://hsdeckideas.netlify.com)

## How it works

The algorithm selects a card as a **starting point** and then adds cards that **work well** with the starting card. Then does the **same thing for each of the added cards**. Think of it as a **tree**. If the added cards don't have any requirements (i call them **priorities**) the algorithm **selects a different card** with priorities and then repeats [the process](https://en.wikipedia.org/wiki/Philadelphia_76ers#2013%E2%80%93present:_The_Process_era). At some point the app tries to figure out what **type of deck** (**archetype**) we have so far in order to add some critical cards for that archetype. If the deck is still not complete, we add completely random good cards until is full. Also note that we always try to select the **best card** available to make the deck as competitive as possible. Hearthstone can be really frustrating when you lose.

## Coding style

In the beginning the app was implemented with an **imperative** style. In my mind I thought I was writing functional programming... Then it came to a point where it was really **hard to maintain** it and started reading articles about **functional programming**. After that, I **refactored** most of the code. The main method that produces the deck, _getDeck_ from [deckUtils](https://github.com/MarkosKon/hsdeckideas/blob/master/src/utils/deckUtils.js) is still imperative (along with _completeDeckByPriorities_ and _addCardsByPriority_). I tried to refactor them but it wasn't possible because they were really hard to test. Probably I would have to write them from scratch sometime in the future.

## Run it locally

(Instructions from Captain Obvious)

- You'll need [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/).
- Open you favorite terminal.
- Clone the repository into your machine `git clone https://github.com/MarkosKon/hsdeckideas.git` It may take a while because of the [images](https://github.com/MarkosKon/hsdeckideas/tree/master/public/resources/images).
- cd into the directory `cd hsdeckideas`
- Install dependencies and start the application `yarn install && yarn start`
- Run tests `yarn test`

## Contributions

All kinds of contributions are welcome, but I'm especially interested in [data](https://github.com/MarkosKon/hsdeckideas/blob/master/src/data/data.json) contributions.

### Data contributions

The decks this app creates are **as good as the data** it relies on. For the last 4-5 expansions I write the "priorities" for the new cards some days before the expansion's release. I don't play much anymore and I mainly rely on streamers prediction videos. As you can imagine, I could use a lot of help with card priorities. So if you want to submit your ideas for card priorities, I would be more than happy to add them to the app. You can also provide card ratings if feel something is off. You can submit your ideas in many ways:

1. You can leave me a message at [twitter](https://twitter.com/HsDeckIdeas), [Reddit](https://www.reddit.com/user/AffectionateDoor), at my [blog](https://mkdevdiary.netlify.com/contact) or even in-game at foobar#21251 with your suggestion. It doesn't have to be in JSON format. Just describe it and I'll add it in the project. The only reason to not add it is if makes zero sense.
2. If you are familiar with Github you can create a pull request. Preferably for the [src/data/data.json](https://github.com/MarkosKon/hsdeckideas/blob/master/src/data/data.json) file. The previous is the formatted JSON file and [this one](https://github.com/MarkosKon/hsdeckideas/blob/master/public/resources/data/data.json) is the same thing but minified for production.

**If you contribute an idea** in this project, I can create **a page that lists the contributors** with data like how many ideas they've contributed, with their names etc. You can also **name your idea** and I will include that name in the card "version". Most of the cards right now have only one version and it's usually named "default".

✨ If you have any questions, you can ask me by using one of the links above.