# Hearthstone Deck Ideas

## Description
Hearthstone Deck Ideas is a **random deck generator** for **Hearthstone** built with React. It is a hobby project that helps me put into practice what i learn about JavaScript and React. I also use it as an excuse to play Hearthstone while "testing" new features on the ladder.

### Visit the live application
[Live Demo](https://hsdeckideas.netlify.com)

## How it works
The algorithm selects a card as a **starting point** and then adds cards that **work well** with the starting card. Then does the **same thing for each of the added cards**. Think of it as a **tree**. If the added cards don't have any requirements (i call them **priorities**) the algorithm **selects a different card** with priorities and then repeats [the process](https://en.wikipedia.org/wiki/Philadelphia_76ers#2013%E2%80%93present:_The_Process_era). At some point the app tries to figure out what **type of deck** (**archetype**) we have so far in order to add  some critical cards for that archetype. If the deck is still not complete, we add completely random good cards until is full. Also note that we always try to select the **best card** available to make the deck as competitive as possible. Hearthstone can be really frustrating when you lose.

## Coding style
In the beginning the app was implemented with an **imperative** style. In my mind i thought i was writing functional programming... Then it came to a point where it was really **hard to maintain** it and started reading articles about **functional programming**. After that i **refactored** most of the code. The main method that produces the deck, *getDeck* from [deckUtils](https://github.com/MarkosKon/hsdeckideas/blob/master/src/utils/deckUtils.js), is still imperative (along with *completeDeckByPriorities* and *addCardsByPriority*). I tried to refactor them but wasn't possible because they were really hard to test. Probably i would have to write them from scratch sometime in the future.  

## Run it locally
* You'll need [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/).
* Open you favorite terminal.
* Clone the repository into your machine `git clone https://github.com/MarkosKon/hsdeckideas.git` It may take a while because of the [images](https://github.com/MarkosKon/hsdeckideas/tree/master/public/resources/images).
* cd into the directory `cd hsdeckideas`
* Install dependencies and start the application `npm install && npm start`
* Run tests `npm test`

## Contributions
*This repository is not the repository i work with because i don't really expect contributors (if your are interested let me know i can change that)*. A part of the application that **i could use some help** are the [data](https://github.com/MarkosKon/hsdeckideas/blob/master/public/resources/data/data.json) and more specifically the **card priorities**. I have a really good understanding of the game but i'm not in any way an expert deck builder. I think the **best solution** with that is to **let the users submit filters** for the cards. In order to achieve that i plan to link the app with a [Firebase](https://firebase.google.com/) back-end and implement an interface where the user can create filters (priorities) for the cards, save them locally or submit them to Firebase. I don't expect this to be that hard and is something i plan to do in the summer when i find some time.    

