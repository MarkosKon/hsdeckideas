import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import BootstrapCard from "../../components/BootstrapCard/BootstrapCard";

const TableWrapper = styled.div`
  background-color: whitesmoke;
  border: 1px solid #ddd;

  td {
    white-space: normal !important;
  }
`;

const NewFeatures = () => (
  <React.Fragment>
    <Helmet>
      <title>Hearthstone Deck Ideas - New Features</title>
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
    <div className="container-fluid">
      <BootstrapCard id="new-features" title="New Features" className="mt-4">
        <TableWrapper className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td className="hidden-xs">Order</td>
                <td>Feature</td>
                <td>Description</td>
                <td className="hidden-xs">ETA</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="hidden-xs">1</td>
                <td>User integration</td>
                <td>
                  Add users in order for you to make filter suggestions, card
                  ratings and more. The filter suggestions for cards is
                  especially exciting because first of all it's fun to create a
                  filter and see what cards come out from the database. For this
                  to work a card will have different versions, something that
                  makes sense because the same card can be played differently
                  from deck to deck. For example Defender of Argus is a card
                  that in an aggro deck requires some fast low cost minions and
                  in a handlock deck requires molten and mountain giants. Also
                  the existing filters represent my personal view on the game.
                  You will probably see the cards in a different way. So by
                  submitting your ideas you will have fun and in the same time
                  you will help make this app better.
                </td>
                <td className="hidden-xs">
                  not sure when, hopefully sometime in Summer 2018
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrapper>
      </BootstrapCard>
      <BootstrapCard id="changelog" title="Changelog">
        <TableWrapper className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td>Feature</td>
                <td className="hidden-xs">Date Added</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Performance improvements, a navigation bar and some new pages.{" "}
                </td>
                <td className="hidden-xs">
                  {new Date(2018, 5, 12).toLocaleDateString()}
                </td>
                <td>
                  Nothing too fancy here. The performance improvements are
                  probably noticeable in mid-low end mobile phones. I also added
                  this page and updated the FAQ page.
                </td>
              </tr>
              <tr>
                <td>Updated to Witchwood</td>
                <td className="hidden-xs">
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
                  Dropped the themes and flavors for a tree like deck generation
                </td>
                <td className="hidden-xs">
                  {new Date(2018, 3, 6).toLocaleDateString()}
                </td>
                <td>
                  The themes and flavors were static groups of cards that had
                  synergy. For example taunt theme in Warrior had Bolster and
                  taunt minions. The problem with themes was that were hard to
                  maintain, static and usually resulted in meme decks. I think
                  the new approach has more potential. Also the user interface
                  changed a lot by removing the previous sections and by adding
                  a dendrogram and the History section that explains in details
                  the decisions of the algorithm.
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrapper>
      </BootstrapCard>
    </div>

    <Footer />
  </React.Fragment>
);

export default NewFeatures;
