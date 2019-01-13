import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Column, Button } from 'already-styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import DeckListCard from '../DeckListCard/DeckListCard';

const List = styled.ul`
  padding: 10px;
  max-width: 500px;
  min-width: 250px;
  font-size: 16px;
  margin: auto;

  div::selection {
    color: black;
  }
  div::-moz-selection {
    color: black;
  }
`;
const Heading = styled.h3`
  margin: 30px 0 40px;
  text-align: center;
  font-size: 30px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;

  button {
    font-size: 16px;
    border-radius: 0;
  }

  @media screen and (max-width: 420px) {
    flex-direction: column;
  }
`;
const Paragraph = styled.p`
  padding-left: 10px;
  a {
    text-decoration: none;
  }
`;

// eslint-disable-next-line max-len
const isOrigin = (deck, card) => deck.history.steps[0].originCards.find(c => c.dbfId === card.dbfId);

const isOther = (deck, card) => deck.history.steps[0].otherCards.find(c => c.dbfId === card.dbfId);

const Decklist = ({
  deck,
  deckCode,
  heroNumber,
  handleCodeCopy,
  handleOpenCardDetailsModal,
  handleOpenHistoryModal,
  handleOpenDiagramModal,
}) => (
  <Column lg="50%" md="100%">
    <Heading>Decklist</Heading>
    <List id="decklist">
      {deck.cards.map(card => (
        <DeckListCard
          key={card.id}
          card={card}
          heroNumber={heroNumber}
          handleOpenCardDetailsModal={handleOpenCardDetailsModal}
          showManaCost
          showCardClass
          boxShadowColor={isOrigin(deck, card) ? '#E48B19' : isOther(deck, card) && '#006AFF'}
        />
      ))}
    </List>
    <ButtonGroup>
      <Button bc="rebeccapurple" onClick={handleOpenDiagramModal}>
        Deck Diagram
      </Button>
      <Button bc="orangered" onClick={handleOpenHistoryModal}>
        Deck History
      </Button>
      <CopyToClipboard text={deckCode} onCopy={handleCodeCopy}>
        <Button bc="#524b4e" c="white">
          Copy Code
        </Button>
      </CopyToClipboard>
    </ButtonGroup>
    <Paragraph>
      <span role="img" aria-label="bullet point emoji">
        &#x2728;
      </span>
      The cards in
      {' '}
      <b>orange name</b>
      {' '}
(if any) are completely random good cards. All the others are
      selected by the algorithm.
    </Paragraph>
    <Paragraph>
      <span role="img" aria-label="bullet point emoji">
        &#x2728;
      </span>
      The cards in
      {' '}
      <b>orange border</b>
      {' '}
are either the starting cards you select or those the
      algorithm selects.
    </Paragraph>
    <Paragraph>
      <span role="img" aria-label="bullet point emoji">
        &#x2728;
      </span>
      The cards in
      {' '}
      <b>blue border</b>
      {' '}
are the &apos;other cards&apos; you selected.
    </Paragraph>
    <Paragraph>
      <span role="img" aria-label="bullet point emoji">
        &#x2728;
      </span>
      If you are interested on
      {' '}
      <b>how we select cards</b>
      {' '}
check the
      <a href="#openhistory" onClick={e => e.preventDefault() || handleOpenHistoryModal()}>
        {' '}
        History section
        {' '}
      </a>
      or see the
      {' '}
      <Link to="/faq/">FAQ</Link>
.
    </Paragraph>
  </Column>
);

Decklist.propTypes = {
  deck: PropTypes.shape({
    cards: PropTypes.array,
    history: PropTypes.object,
  }).isRequired,
  deckCode: PropTypes.string.isRequired,
  heroNumber: PropTypes.number.isRequired,
  handleOpenCardDetailsModal: PropTypes.func.isRequired,
  handleCodeCopy: PropTypes.func.isRequired,
  handleOpenHistoryModal: PropTypes.func.isRequired,
  handleOpenDiagramModal: PropTypes.func.isRequired,
};

export default Decklist;
