import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Column } from 'already-styled-components';
import LazyLoad from 'react-lazyload';
import ProgressiveImage from 'react-progressive-image';

const Content = styled.div`
  padding: 10px;
`;
const Heading = styled.h3`
  margin: 30px 0 40px;
  text-align: center;
  font-size: 30px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
  max-width: 350px;
  border-radius: 5px;
  margin: auto;
  border: 10px solid ${({ borderColor }) => borderColor};
`;
Image.propTypes = {
  loading: PropTypes.bool,
};
Image.defaultProps = {
  loading: false,
};
const DeckInfo = ({
  deck: { hero, archetype },
  heroes,
  heroNumber,
  chosenInterestingCards,
  chosenNonInterestingCards,
  cardColor,
}) => {
  const heroImage = `resources/images/${heroNumber}.jpg`;
  return (
    <Column lg="50%">
      <Heading>Basic info</Heading>
      <Content>
        <LazyLoad height={350} offset={400}>
          <ProgressiveImage src={heroImage} placeholder={heroImage}>
            {(src, loading) => (
              <Image
                id="resultImage"
                src={src}
                loading={loading}
                borderColor={cardColor}
                alt={heroNumber !== 99 ? heroes[heroNumber] : 'random hero'}
              />
            )}
          </ProgressiveImage>
        </LazyLoad>
        <p>
          <b>Class: </b>
          {hero}
        </p>
        <p>
          <b>Archetype: </b>
          {archetype.name}
        </p>
        <p>
          <b>Archetype Description: </b>
          {archetype.description}
        </p>
        <p>
          <b>Starting point: </b>
          {chosenInterestingCards.map(card => card.name).join(', ')}
        </p>
        <p>
          <b>Other cards: </b>
          {chosenNonInterestingCards
            ? chosenNonInterestingCards.map(card => card.name).join(', ')
            : 'No cards selected'}
        </p>
      </Content>
    </Column>
  );
};

DeckInfo.propTypes = {
  deck: PropTypes.shape({
    hero: PropTypes.string,
    archetype: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
  heroes: PropTypes.arrayOf(PropTypes.string).isRequired,
  heroNumber: PropTypes.number.isRequired,
  chosenInterestingCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  chosenNonInterestingCards: PropTypes.arrayOf(PropTypes.object),
  cardColor: PropTypes.string.isRequired,
};

DeckInfo.defaultProps = {
  chosenNonInterestingCards: null,
};

export default DeckInfo;
