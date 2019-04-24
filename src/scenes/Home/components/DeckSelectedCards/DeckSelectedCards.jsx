import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tooltip from '../../../../components/Tooltip/Tooltip';
import DeckListCard from '../DeckListCard/DeckListCard';

const SelectedCardsList = styled.ul`
  color: whitesmoke;
  background-color: #595255;
  list-style-type: none;
  padding: 0;
`;

const SelectedCard = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #333;
  padding: 5px 10px;

  span {
    flex: 4;
  }

  select {
    flex: 3;
    display: inline-block;
  }
`;

const DeckSelectedCards = ({
  selectInterestingCards,
  handleSelectVersion,
  handleOpenCardDetailsModal,
}) => (
  <div>
    <h3 style={{ textAlign: 'center' }}>
      <span>Selected Cards</span>
      <Tooltip
        id="tooltip-selected-cards"
        text={`This area lists the "starting cards" you selected (aka interesting cards). The main catch here
         is that you can see the different versions of the cards and select any version
         you like. Most of the cards though have only one version at the moment. `}
        direction="up"
      />
    </h3>
    {!selectInterestingCards.includes('Random') && (
      <p style={{ textAlign: 'center' }}>
        (Click on the card tile images to see details about the card)
      </p>
    )}
    <SelectedCardsList>
      {selectInterestingCards.includes('Random') ? (
        <SelectedCard>No selected cards</SelectedCard>
      ) : (
        selectInterestingCards.map((selectedCard, i) => (
          <SelectedCard key={selectedCard.name}>
            <span>
              <ul style={{ paddingLeft: 0 }}>
                <DeckListCard
                  key={`${selectedCard.id}_sel`}
                  card={selectedCard}
                  handleOpenCardDetailsModal={handleOpenCardDetailsModal}
                />
              </ul>
            </span>
            <select
              name="versionSelect"
              onChange={e => handleSelectVersion(e, i)}
              value={selectedCard.activeVersion}
            >
              {selectedCard.versions.map((version, versionIndex) => (
                <option key={version.name} value={versionIndex}>
                  {version.name}
                </option>
              ))}
            </select>
          </SelectedCard>
        ))
      )}
    </SelectedCardsList>
  </div>
);

DeckSelectedCards.propTypes = {
  selectInterestingCards: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  handleSelectVersion: PropTypes.func.isRequired,
  handleOpenCardDetailsModal: PropTypes.func.isRequired,
};

export default DeckSelectedCards;
