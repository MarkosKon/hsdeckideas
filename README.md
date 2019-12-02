# Hearthstone Deck Ideas

## Description

Hearthstone Deck Ideas is a **random deck generator** for **Hearthstone** built with React. It's a hobby project that helps me put into practice what I learn about JavaScript and React. I also use it as an excuse to play Hearthstone while "testing" new features on the ladder.

### Visit the live application

[Live Demo](https://hsdeckideas.netlify.com)

## How it works

The algorithm selects a card as a **starting point** and then adds cards that **work well** with the starting card. Then does the **same thing for each of the added cards**. Think of it as a **tree**. If the added cards don't have any requirements (i call them **priorities**) the algorithm **selects a different card** with priorities and then repeats [the process](https://en.wikipedia.org/wiki/Philadelphia_76ers#2013%E2%80%93present:_The_Process_era). At some point the app tries to figure out what **type of deck** (**archetype**) we have so far in order to add some critical cards for that archetype. If the deck is still not complete, we add completely random good cards until is full. Also note that we always try to select the **best card** available to make the deck as competitive as possible. Hearthstone can be really frustrating when you lose.

## Run it locally

- You'll need [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/).
- Open you favorite terminal.
- Clone the repository into your machine `git clone https://github.com/MarkosKon/hsdeckideas.git` It may take a while because of the [images](https://github.com/MarkosKon/hsdeckideas/tree/master/public/resources/images).
- cd into the directory `cd hsdeckideas`
- Install dependencies and start the application `yarn install && yarn start`
- Run tests `yarn test`
