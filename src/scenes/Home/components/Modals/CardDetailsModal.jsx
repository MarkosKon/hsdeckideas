import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ProgressiveImage from 'react-progressive-image';
import styled from 'styled-components';
import {
  Row, Column, Centered, Button,
} from 'already-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const root = document.getElementById('root');
Modal.setAppElement(root);

const Content = styled(Centered)`
  position: relative;
  min-height: 100%;
  font-size: 18px;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
const ButtonTopRight = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;
const LeftColumn = styled(Column)`
  @media screen and (max-width: 992px) {
    text-align: center;
  }
`;
const CardName = styled.h1`
  font-size: 4.236em;
  margin: 27px 0;
  line-height: 1.1;
  color: burlywood;
  @media screen and (max-width: 767px) {
    font-size: 46px;
  }
`;
const CardInfo = styled.div`
  margin-top: 20px;
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
        maxWidth: '100vw',
      },
      content: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '0',
        backgroundColor: 'transparent',
        border: 'none',
      },
    }}
    appElement={root}
    contentLabel="Card details modal"
  >
    <Content c="white" bc="transparent" p="50px 15px">
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
      {card && (
        <Row gutters guttersSize="2em">
          <LeftColumn ta="right" alignSelf="center" md="100%">
            <ProgressiveImage
              src={`/resources/images/${card.imageUrl}`}
              placeholder="/resources/images/cardback.webp"
            >
              {(src, loading) => <Image src={src} loading={loading} alt="card full size" />}
            </ProgressiveImage>
          </LeftColumn>
          <Column md="100%">
            <CardName>{card.name}</CardName>
            <CardInfo>
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
              {card.versions && (
                <>
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
                </>
              )}
            </CardInfo>
          </Column>
        </Row>
      )}
    </Content>
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
