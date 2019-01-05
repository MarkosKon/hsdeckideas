import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import UICard from "../../components/UICard/UICard";

const TableWrapper = styled.div`
  background-color: whitesmoke;
  border: 1px solid #ddd;

  td {
    white-space: normal !important;
  }
`;
const Table = styled.table`
  padding: 10px 15px;
`;

class NewFeatures extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV === "production")
      ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Hearthstone Deck Ideas | New Features</title>
          <meta
            name="description"
            content="The purpose of this page is to inform you about future developments and what to expect in the near future. In addition to that we list by chronological order, notable features that are already implemented."
          />
        </Helmet>
        <Header
          title={"New Features"}
          paragraphs={[
            "On this page you can find a list with the stuff i'm working on right now",
            "and also some notable features that are already implemented."
          ]}
        >
          <Navbar />
        </Header>
        <UICard id="new-features" title="New Features">
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <td>Order</td>
                  <td>Feature</td>
                  <td>Description</td>
                  <td>ETA</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>User integration</td>
                  <td>
                    Add users in order for you to make filter suggestions, card
                    ratings and more. The filter suggestions for cards is
                    especially exciting because first of all it's fun to create
                    a filter and see what cards come out from the database. For
                    this to work a card will have different versions, something
                    that makes sense because the same card can be played
                    differently from deck to deck. For example Defender of Argus
                    is a card that in an aggro deck requires some fast low cost
                    minions and in a handlock deck requires molten and mountain
                    giants. Also the existing filters represent my personal view
                    on the game. You will probably see the cards in a different
                    way. So by submitting your ideas you will have fun and in
                    the same time you will help make this app better.
                  </td>
                  <td>
                    not sure when, hopefully sometime in Summer 2018 (Abandoned
                    for now)
                  </td>
                </tr>
              </tbody>
            </Table>
          </TableWrapper>
        </UICard>
        <UICard id="changelog" title="Changelog">
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <td>Feature</td>
                  <td>Date Added</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Made the code simpler/better and the app faster to load.
                  </td>
                  <td>{new Date("December 29, 2018").toLocaleDateString()}</td>
                  <td>
                    This project was one of my first projects while learning
                    React so as you can imagine I wrote a lot of bad code.
                    During the last month I'm trying to simplify the codebase
                    and make it modern. I'm doing that in an attempt to be
                    easier to add new features in the future (no pun intended).
                  </td>
                </tr>
                <tr>
                  <td>Updated to Rastakhan's Rumble.</td>
                  <td>{new Date("December 4, 2018").toLocaleDateString()}</td>
                  <td>Title says it all!</td>
                </tr>
                <tr>
                  <td>Updated to Witchwood</td>
                  <td>
                    About 1 week after the release of the Witchwood expansion
                  </td>
                  <td>
                    The first expansion after the app went live. Hooray! I could
                    have updated it earlier but i wanted to play a bit with the
                    new cards. Also the card data are available only 1 - 2 days
                    before the release.
                  </td>
                </tr>
                <tr>
                  <td>
                    Performance improvements, a navigation bar and some new
                    pages.{" "}
                  </td>
                  <td>{new Date("May 12, 2018").toLocaleDateString()}</td>
                  <td>
                    Nothing too fancy here. The performance improvements are
                    probably noticeable in mid-low end mobile phones. I also
                    added this page and updated the FAQ page.
                  </td>
                </tr>
                <tr>
                  <td>Updated to Witchwood</td>
                  <td>
                    About 1 week after the release of the Witchwood expansion
                  </td>
                  <td>
                    The first expansion after the app went live. Hooray! I could
                    have updated it earlier but i wanted to play a bit with the
                    new cards. Also the card data are available only 1 - 2 days
                    before the release.
                  </td>
                </tr>
                <tr>
                  <td>
                    Dropped the themes and flavors for a tree like deck
                    generation
                  </td>
                  <td>{new Date("March 6, 2018").toLocaleDateString()}</td>
                  <td>
                    The themes and flavors were static groups of cards that had
                    synergy. For example taunt theme in Warrior had Bolster and
                    taunt minions. The problem with themes was that were hard to
                    maintain, static and usually resulted in meme decks. I think
                    the new approach has more potential. Also the user interface
                    changed a lot by removing the previous sections and by
                    adding a dendrogram and the History section that explains in
                    details the decisions of the algorithm.
                  </td>
                </tr>
              </tbody>
            </Table>
          </TableWrapper>
        </UICard>
        <Footer />
      </React.Fragment>
    );
  }
}

export default NewFeatures;
