import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import BootstrapCard from "../../components/BootstrapCard/BootstrapCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const DT = styled.dt`
  margin-bottom: 5px;
`;

const DD = styled.dd`
  margin-bottom: 10px;
`;

const Donation = ({ children }) => (
  <div>
    <sup>{children}</sup>
    <span style={{ marginLeft: "10px" }}>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
        style={{ display: "inline" }}
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="WFPMCC7TB2H8Q" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
          border="0"
          name="submit"
          alt="PayPal - The safer, easier way to pay online!"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </span>
  </div>
);

Donation.propTypes = {
  children: PropTypes.node
};
Donation.defaultProps = {
  children: "Message"
};

const FAQ = () => (
  <React.Fragment>
    <Helmet>
      <title>Hearthstone Deck Ideas - FAQ</title>
      <meta
        name="description"
        content="In this page we share some personal information and explain how the random deck generator works by answering some frequently asked questions. "
      />
    </Helmet>
    <Header
      title="Frequently Asked Questions"
      paragraphs={[
        "In this section i will try to explain how the app works and share some",
        "personal info by answering some questions that no one asked."
      ]}
    >
      <Navbar />
    </Header>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <BootstrapCard className="mt-3" title="FAQ" id="faq">
            <sup>
              <Link to="/"> Go back.</Link>
            </sup>
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
            <Donation>
              ** If you liked this app and have the money to spare, consider
              making a donation.
            </Donation>
            <dl>
              <DT>Why did you create this app?</DT>
              <DD>
                My inspiration to create this app was a streamer's realization
                (i believe it was <b>Trump</b>) about a Malygos
                <b> miracle rogue deck.</b>
                That deck got popular and was the best deck
                <b> after 1 year of the game's release.</b> All good until now.
                The weird thing is that the deck
                <b> had cards that were available from day 1</b>. So, no one had
                though to put this deck together for over a year.
              </DD>

              <DT>
                Lol, and this app will help us discover "hidden" meta decks?
              </DT>
              <DD>
                No, probably not. It will suggest you a non competitive deck
                that
                <b> makes sense</b> and has some <b>decent synergy</b>. The
                <b> main benefit</b> for you is that you'll be forced to play
                and learn some cards you don't usually have the chance to play
                with.
                <b> You can also use it</b> to have fun at low ranks, play
                unusual decks with your friends or complete a specific quest.
                Don't forget that nowadays you can share your decks with your
                friends. So you can create a bunch of decks here and give them
                to your friends.
              </DD>

              <DT>How does this app work?</DT>
              <DD>
                The algorithm selects a card as a <b> starting point</b> and
                then adds cards that <b> work well</b> with the starting card.
                Then does the <b> same thing for each of the added cards</b>.
                Think of it as a <b> tree</b>. If the added cards don't have any
                requirements (i call them <b> priorities</b>) the algorithm
                <b> selects a different card</b> with priorities and then
                repeats the process. At some point the app tries to figure out
                what
                <b> type of deck (archetype)</b> we have so far in order to add
                some critical cards for that archetype. If the deck is still not
                complete, we add completely random good cards until is full.
                Also note that we always try to select the <b> best card</b>{" "}
                available to make the deck as competitive as possible.
                Hearthstone can be really frustrating when you lose.
              </DD>

              <DT>
                The generated decks have legendaries i don't own, they are too
                expensive.
              </DT>
              <DD>
                I could let you import your collection and only choose cards you
                own. But in this case the algorithm will struggle to find
                synergies and you'll end up with completely random cards. I
                think the <b> best solution</b> is to choose a more aggressive
                archetype because they are cheap or choose a bunch of cards you
                own in the filters. Anyway, if you would like that feature leave
                me a{" "}
                <Link
                  to="https://markon.herokuapp.com#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  message.
                </Link>
              </DD>

              <DT>What's your battletag?</DT>
              <DD>
                You can add me at <b> foobar#21251</b>.
              </DD>

              <DT>How long do you play Hearthstone?</DT>
              <DD>I started playing 1 month before the open beta.</DD>

              <DT>How good are you in Hearthstone?</DT>
              <DD>
                I've hit legend 6 times but i have never climbed above top 500.
              </DD>

              <DT>Who are you in real life?</DT>
              <DD>
                My name is Markos Konstantopoulos and i am a web developer.
              </DD>

              <DT>Where are you from?</DT>
              <DD>I am from Greece.</DD>

              <DT>Why do you think we care who you are?</DT>
              <DD>FeelsBadMan</DD>
            </dl>
          </BootstrapCard>
        </div>
      </div>
    </div>

    <Footer />
  </React.Fragment>
);

export default FAQ;
