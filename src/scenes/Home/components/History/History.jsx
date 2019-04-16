import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sortAscBy } from 'some-utils';
import { Button } from 'already-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import DeckListCard from '../DeckListCard/DeckListCard';
import { getCardThatRequestedPriority } from '../../../../utils/deck';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import UICard from '../../../../components/UICard/UICard';

const ContainerCard = styled(UICard)`
  overflow: auto;
`;

const StyledCard = styled(UICard)`
  background-color: azure !important;
  box-shadow: none !important;
`;

const Step = styled.div`
  margin-bottom: 2vh;
`;

const List = styled.ul`
  padding: 0;
  margin: 10px 0 10px 10px;
  min-width: 250px;
  max-width: 300px;
`;

const renderSingleCardDetails = (deck, priorityId) => {
  const card = getCardThatRequestedPriority(deck, priorityId);
  return card ? <DeckListCard card={card} /> : null;
};

const History = ({
  closeModal,
  deck,
  deck: {
    history: { steps, totalPrioritiesExamined, totalDeckFiltersExamined: deckWideFilters },
  },
}) => (
  <ContainerCard
    id="deck-history"
    title="History (text)"
    modalButton={(
      <Button
        aria-label="close modal"
        transparent
        c="black"
        hc="darkorange"
        fs="60px"
        onClick={closeModal}
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
)}
  >
    <StyledCard withHeader={false}>
      <p>
        The
        <b> main reason </b>
        this section exists is for
        <b> debugging. </b>
I use it to make sure the algorithm
        <b> works as intended. </b>
        The
        <b> other reason </b>
        this section exists is because i want the inner workings of the algorithm to be
        <b> transparent </b>
        to anyone interested. Having said that, i must
        <b> warn you that it&apos;s not really user friendly. </b>
      </p>
      <p>
        This section gives you details on
        <b> why we select the cards we add to the deck. </b>
        Each
        <b> step </b>
        starts with some cards as a
        <b> starting point, the &quot;origin&quot; cards. </b>
        Those cards have one or more
        <b> requirements </b>
        that need to be met in order
        <b> to be good. </b>
        We
        <b> examine </b>
        each of these requirements and add the
        <b> best cards possible. </b>
      </p>
      <p>
        Also
        <b> keep in mind </b>
        that we take into account the
        <b> hero power </b>
        for some priorities. A hero power that satisfies a priority is worth
        <b> 2 </b>
        cards in the deck.
      </p>
    </StyledCard>
    <div>
      <Tooltip
        id="tooltip-history-priorities"
        text={`Most of the cards have some requirements in order to be good.
                Those requirements are the "priorities". The archetypes have
                priorities too.`}
        direction="right"
      />
      We examined
      {' '}
      <b>{Object.keys(totalPrioritiesExamined).length}</b>
      <span> priorities</span>
      <span>
        {' '}
        in
        {' '}
        <b>{steps.length}</b>
        {' '}
step(s)
      </span>
    </div>
    {deckWideFilters && (
      <div>
        <Tooltip
          id="tooltip-history-filters"
          text={`Some cards in addition to "priorities" may have some extra
              requirements. For example the Baku decks filter out the even
              cards or the Highlander decks want only one copy of each card.
              Those are the "deck wide filters".`}
          direction="right"
        />
        We examined
        {' '}
        <b>{Object.keys(deckWideFilters).length}</b>
        <span> deck wide filters</span>
      </div>
    )}
    {steps.map((step, index) => (
      <Step key={index /* eslint-disable-line react/no-array-index-key */}>
        <h3>
          Step
          {index + 1}
        </h3>
        <p>
          The deck size is:
          {' '}
          <b>{step.sizeBefore}</b>
        </p>
        <div>
          <div>
            <h4>The &quot;origin&quot; cards for this step:</h4>
            <List>
              {step.originCards.sort(sortAscBy('cost')).map(originCard => (
                <DeckListCard key={originCard.id} card={originCard} />
              ))}
            </List>
          </div>
          {step.otherCards && step.otherCards.length > 0 && (
            <div>
              <h4>Other cards you selected:</h4>
              <List>
                {step.otherCards.sort(sortAscBy('cost')).map(otherCard => (
                  <DeckListCard key={otherCard.id} card={otherCard} />
                ))}
              </List>
            </div>
          )}
          <h4>The priorities for this step:</h4>
          <p>
            Note:
            {step.extra}
          </p>
          <ol>
            {step.prioritiesInfo.map(
              ({
                priority: {
                  id, minCards, maxCards, filters,
                }, priorityAddedCards, extra,
              }) => (
                <li key={id}>
                  <div>
                    <div>
                      <b>Priority requirements: </b>
                      {minCards === maxCards
                        ? minCards
                        : `[${minCards} - ${maxCards}] card(s) where:`}
                      <ol style={{ listStyleType: 'lower-alpha' }}>
                        {filters.map(filter => (
                          <li key={`${id}-${JSON.stringify(filter)}`}>
                            {`${filter.property} ${filter.operation}
                                ${
                                  Array.isArray(filter.minValue)
                                    ? filter.minValue.join(' or ')
                                    : filter.minValue
                                }`}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <b>Result:</b>
                      {' '}
                      {extra}
                    </div>
                    {priorityAddedCards && priorityAddedCards.length > 0 && (
                    <div>
                      <b>Cards added:</b>
                      <List>
                        {priorityAddedCards.sort(sortAscBy('cost')).map(card => (
                          <DeckListCard key={card.id} card={card} showManaCost />
                        ))}
                      </List>
                    </div>
                    )}
                    {getCardThatRequestedPriority(deck, id) && (
                    <div>
                      <strong>Card that requested the priority:</strong>
                      <List>{renderSingleCardDetails(deck, id)}</List>
                    </div>
                    )}
                  </div>
                </li>
              ),
            )}
          </ol>
          {step.totalAddedCards && step.totalAddedCards.length > 0 && (
            <div>
              <h4>Total cards we added in this step:</h4>
              <List>
                {step.totalAddedCards.sort(sortAscBy('cost')).map(card => (
                  <DeckListCard key={card.id} card={card} />
                ))}
              </List>
            </div>
          )}
          {step.cardsRemoved && (
            <div>
              <h4>Cards we removed from the deck: </h4>
              <List>
                {step.cardsRemoved.sort(sortAscBy('cost')).map(card => (
                  <DeckListCard key={card.id} card={card} />
                ))}
              </List>
            </div>
          )}
        </div>
      </Step>
    ))}
  </ContainerCard>
);

History.propTypes = {
  deck: PropTypes.shape({
    history: PropTypes.shape({
      steps: PropTypes.array,
      totalPrioritiesExamined: PropTypes.object,
      totalDeckFiltersExamined: PropTypes.object,
    }),
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default History;
