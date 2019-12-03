import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ProgressiveImage from 'react-progressive-image';
import styled from 'styled-components';
import { Row, Column, Button } from 'already-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const root = document.getElementById('root');
Modal.setAppElement(root);

const ButtonTopRight = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;
const CardName = styled.h1`
  font-size: 4.236em;
  margin: 27px 0;
  line-height: 1.1;
  color: burlywood;
`;
const Property = styled.div`
  margin-bottom: 6.75px;
  ul {
    margin: 6.75px 0 0;
  }

  ul ul {
    margin: 0;
  }
`;
const PropertyLabel = styled.span`
  font-weight: bold;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: burlywood;
`;
const Image = styled.img`
  width: 286px;
  height: 395px;
  @media screen and (max-width: 767px) {
    margin-bottom: 30px;
  }
`;

const CardDetailsModal = ({ isOpen, closeModal, card }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    closeTimeoutMS={300}
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '1001',
        display: 'flex',
        alignItems: 'center',
      },
      content: {
        position: 'static',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '50px 15px',
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        maxWidth: '702px',
        margin: 'auto',
      },
    }}
    appElement={root}
    contentLabel="Card details modal"
  >
    {card && (
      <div>
        <ButtonTopRight
          aria-label="close modal"
          transparent
          c="white"
          fs="60px"
          hc="burlywood"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </ButtonTopRight>
        <Row ai="center" gutters gutterSize="27px">
          <Column md="100%">
            <CardName>{card.name}</CardName>
            <Property>
              <PropertyLabel>Rating (1-4): </PropertyLabel>
              {card.rating}
            </Property>
            <Property>
              <PropertyLabel>Extra Attributes: </PropertyLabel>
              {card.extra.map((item, index) => (item === 'GENERAL'
                ? 'No extra attributes'
                : `${item}${index === card.extra.length - 1 ? '' : ', '}`))}
            </Property>
            <Property>
              <PropertyLabel>Has Priorities? </PropertyLabel>
              {card.versions
                ? `Yes, ${card.name} has ${card.versions.length} version(s) of priorities, and thus is considered an "interesting" card. `
                : `No, ${card.name} doesn't have any priorities, and thus is considered a "non-interesting" card.`}
            </Property>
          </Column>
          <Column md="100%">
            <ProgressiveImage
              src={`/resources/images/${card.imageUrl}`}
              placeholder="/resources/images/cardback.webp"
            >
              {(src, loading) => <Image src={src} loading={loading} alt="card full size" />}
            </ProgressiveImage>
          </Column>
          {card.versions && (
            <Column xl="100%">
              <h2 style={{ color: 'burlywood', lineHeight: 1.1, margin: '0 0 27px' }}>Versions</h2>
              {card.versions.map((version, index) => (
                <Property key={card.name + version.name}>
                  <Property>
                    <PropertyLabel>
Version #
                      {index + 1}
:
                      {' '}
                    </PropertyLabel>
                    {version.name}
                  </Property>
                  <PropertyLabel>
                    Priorities of &quot;
                    {version.name}
                    &quot; version:
                  </PropertyLabel>
                  <ul>
                    {version.priorities.map(priority => (
                      <li key={priority.id}>
                        [
                        {`${priority.minCards} - ${priority.maxCards}`}
] cards where:
                        <ul>
                          {priority.filters.map(filter => (
                            <li key={priority.id + JSON.stringify(filter)}>
                              Card
                              {` ${filter.property} ${filter.operation} ${filter.minValue}`}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </Property>
              ))}
            </Column>
          )}
        </Row>
      </div>
    )}
  </Modal>
);

CardDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  card: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    rating: PropTypes.number,
    extra: PropTypes.arrayOf(PropTypes.string),
    versions: PropTypes.arrayOf(PropTypes.object),
  }),
};

CardDetailsModal.defaultProps = {
  card: null,
};

export default CardDetailsModal;
