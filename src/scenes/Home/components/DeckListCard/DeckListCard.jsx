import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Item = styled.li`
  display: flex;
  grid-column: 2;
  flex-direction: row;
  align-items: stretch;
  border: 1px solid black;
  box-sizing: border-box;
  line-height: 30px;
  min-width: 150px;
  height: 35px;
  position: relative;
  cursor: pointer;

  &::after {
    content: ' ';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: ${({ boxShadowColor }) => boxShadowColor && `0 0 0 2px ${boxShadowColor} inset`};
  }
  &:hover {
    border: 2px solid black;
  }
`;

const CardCost = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: ${({ bc }) => bc};
`;

const CardName = styled.div`
  flex: 4;
  text-align: left;
  color: ${({ c }) => c};
  padding: 5px;
  overflow: hidden;
  background: linear-gradient(to right, black 0%, black 70%, rgba(255, 255, 255, 0)) 30%,
    url(/resources/images/${({ tile }) => tile}) top right no-repeat;
`;

const CardQuantity = styled.div`
  flex: 1;
  text-align: center;
  background-color: #333;
  color: sandybrown;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CardClass = styled.div`
  flex: 1;
  max-width: 10px;
  background-color: ${({ bgColor }) => bgColor};
`;

CardClass.propTypes = {
  bgColor: PropTypes.string,
};

CardClass.defaultProps = {
  bgColor: 'white',
};

const heroColors = [
  'rgb(116, 80, 8)',
  'darkolivegreen',
  '#8f95b5',
  '#b3843b',
  '#b5bbbd',
  '#595255',
  '#343663',
  '#6d4075',
  '#652523',
];

const rarityColors = {
  common: '#7a7a7a',
  free: '#7a7a7a',
  rare: 'blue',
  epic: 'purple',
  legendary: 'orangered',
};

const DeckListCard = ({
  card: {
    cost, tile, rarity, name, quantity, imageUrl, isRandom, cardClass,
  },
  card,
  boxShadowColor,
  showManaCost,
  showCardClass,
  heroNumber,
  handleOpenCardDetailsModal,
}) => (
  <Item
    data-image-url={imageUrl}
    boxShadowColor={boxShadowColor}
    onClick={() => handleOpenCardDetailsModal && handleOpenCardDetailsModal(card)}
  >
    {showManaCost && <CardCost bc={rarityColors[rarity.toLowerCase()]}>{cost}</CardCost>}
    <CardName c={isRandom ? 'orange' : 'white'} tile={tile}>
      {name}
    </CardName>
    <CardQuantity>
      {rarity === 'LEGENDARY' ? <FontAwesomeIcon size="xs" icon={faStar} /> : quantity || 2}
    </CardQuantity>
    {showCardClass && (
      <CardClass bgColor={cardClass.includes('NEUTRAL') ? 'white' : heroColors[heroNumber]} />
    )}
  </Item>
);

DeckListCard.propTypes = {
  card: PropTypes.shape({
    cost: PropTypes.number,
    tile: PropTypes.string,
    rarity: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    imageUrl: PropTypes.string,
    isRandom: PropTypes.bool,
    cardClass: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  showManaCost: PropTypes.bool,
  showCardClass: PropTypes.bool,
  heroNumber: PropTypes.number,
  boxShadowColor: PropTypes.string,
  handleOpenCardDetailsModal: PropTypes.func,
};

DeckListCard.defaultProps = {
  showManaCost: false,
  showCardClass: false,
  heroNumber: null,
  boxShadowColor: null,
  handleOpenCardDetailsModal: null,
};

export default DeckListCard;
