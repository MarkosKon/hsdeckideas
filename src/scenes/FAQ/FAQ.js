import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default () => (
  <React.Fragment>
    <Header />
    <div className="panel panel-info" style={{ marginTop: 20, border: 0 }}>
      <div
        className="panel-heading"
        style={{
          color: "black",
          backgroundColor: "beige",
          border: 0
        }}
      >
        <h2 className="text-center panel-title" style={{ fontSize: "30px" }}>
          FAQ
        </h2>
      </div>
      <div className="panel-body">
        <div className="col-md-8 col-md-offset-2">
          <sup>
            <Link to="/"> Go back.</Link>
          </sup>
          <div className="alert alert-warning text-center" role="alert">
            This section is outdated i will update it soon&trade;
          </div>
          <div>
            <sup>
              * You can{" "}
              <Link
                to="https://markon.herokuapp.com#contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                contact me{" "}
              </Link>{" "}
              for anything related to the app like bugs, suggestions, theme
              ideas your personal problems etc. (it may take some seconds to
              load).
            </sup>
          </div>
          <dl>
            <dt>Why did you create this app?</dt>
            <dd>
              My inspiration to create this app was a streamer's realization (i
              believe it was Trump) about a Malygos miracle rogue deck. That
              deck got popular and was the best deck after 1 year of the game's
              release. All good until now. The weird thing is that the deck had
              cards that were available from day 1. So, no one had though to put
              this deck together for over a year.
            </dd>

            <dt>
              Lol, and this app will help us discover "hidden" meta decks?
            </dt>
            <dd>
              For sure not. It will suggest you a non competitive deck that
              hopefully makes sense. You can use it to have fun at low ranks,
              play with your friends or complete a specific quest.
            </dd>

            <dt>How does this app work?</dt>
            <dd>
              When you hit the button 3 sections will pop up. The "Idea", the
              "Overview" and the "Explanation". The idea tells you in one
              sentence what the deck is about. The explanation explains you in
              detail what the idea section means by slicing the idea in deck
              archetype, theme and optionally a flavor (more about those terms
              later). The Overview gives you a code and a deck list that
              contains some of the cards that come from the rolled
              theme-flavor-archetype. There are also cards that come from the
              archetype priorities. E.g. a control deck needs at least 2 AOE
              Spells. Those cards are in yellow color. Finally if there are free
              spots left in the deck we fill it with completely random cards,
              the red ones.
            </dd>

            <dt>What do you mean by deck "archetype"?</dt>
            <dd>
              By saying deck archetype i mean what your deck tries to accomplish
              against other decks. For example if i tag a deck as aggro i mean
              that the deck will try to take the board in the early game and
              finish the game in the mid game. In contrast a control deck will
              usually try to remove early and mid game threats and win the game
              in the late game.
            </dd>

            <dt>What do you mean by deck "theme"?</dt>
            <dd>
              Deck theme is collection of cards that synergize well together.
              For example a dragon Priest deck evolves around dragons and their
              synergistic cards.
            </dd>

            <dt>What do you mean by deck "flavor"?</dt>
            <dd>
              Deck flavors are mainly good cards that don't necessarily need
              other cards to show their worth. For example think about Dr. Boom.
              It fits well in any archetype and theme but doesn't need N'Zoth
              and the deathrattle synergy to be worth it.
            </dd>

            <dt>
              The generated decks have legendaries i don't own, they are too
              expensive.
            </dt>
            <dd>
              I could let you import your collection and only choose cards you
              own. If you would like that leave me a{" "}
              <Link
                to="https://markon.herokuapp.com#contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                message.
              </Link>
            </dd>

            <dt>What's your battletag?</dt>
            <dd>You can add me at foobar#21251.</dd>

            <dt>How long do you play Hearthstone?</dt>
            <dd>I started playing 1 month before the open beta.</dd>

            <dt>How good are you in Hearthstone?</dt>
            <dd>
              I've hit legend 6 times but i have never climbed above top 500.
            </dd>

            <dt>Who are you in real life?</dt>
            <dd>My name is Markos Konstantopoulos and i am a web developer.</dd>

            <dt>Where are you from?</dt>
            <dd>I am from Greece.</dd>

            <dt>Why do you think we care who you are?</dt>
            <dd>FeelsBadMan</dd>
          </dl>
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
);
