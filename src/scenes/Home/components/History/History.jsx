import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CardDetail from "../CardDetail/CardDetail";
import { sortAscBy } from "some-utils";
import { getCardThatRequestedPriority } from "../../../../utils/deck";
import Tooltip from "../../../../components/Tooltip/Tooltip";
import BootstrapCard from "../../../../components/BootstrapCard/BootstrapCard";

const ContainerCard = styled(BootstrapCard)`
  overflow: auto;
`;

const StyledCard = styled(BootstrapCard)`
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

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 32px;
  position: absolute;
  right: 5px;
  top: 0;

  &:hover {
    color: darkorange;
    background-color: transparent;
  }

  @media screen and (min-width: 350px) {
    right: 0;
  }
`;

class History extends Component {
  renderSingleCardDetails(deck, priorityId) {
    const card = getCardThatRequestedPriority(deck, priorityId);
    return card ? (
      <CardDetail
        card={card}
        listenerMM={this.props.listenerMM}
        listenerML={this.props.listenerML}
      />
    ) : null;
  }

  render() {
    const { closeModal, deck, listenerML, listenerMM } = this.props;
    const { history } = deck;
    const {
      steps,
      totalPrioritiesExamined,
      totalDeckFiltersExamined: deckWideFilters
    } = history;
    return (
      <ContainerCard
        id="deck-history"
        className="mb-0"
        title="History (text)"
        modalButton={
          <CloseButton
            type="button"
            className="btn btn-primary"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        }
      >
        <StyledCard withHeader={false}>
          <p>
            The <b>main reason </b> this section exists is for <b> debugging</b>
            . I use it to make sure the algorithm <b>works as intended</b>. The{" "}
            <b>other reason</b> this section exists is because i want the inner
            workings of the algorithm to be <b>transparent</b> to anyone
            interested. Having said that, i must{" "}
            <b>warn you that it's not really user friendly.</b>
          </p>
          <p>
            This section gives you details on{" "}
            <b>why we select the cards we add to the deck</b>. Each <b>step</b>{" "}
            starts with some cards as a{" "}
            <b>starting point, the "origin" cards.</b> Those cards have one or
            more
            <b> requirements </b> that need to be met in order <b>to be good</b>
            . We <b>examine </b>
            each of these requirements and add the <b>best cards possible.</b>
          </p>
          <p>
            Also <b>keep in mind</b> that we take into account the{" "}
            <b>hero power</b> for some priorities. A hero power that satisfies a
            priority is worth <b>2 </b>
            cards in the deck.
          </p>
        </StyledCard>
        <div>
          We examined <b>{Object.keys(totalPrioritiesExamined).length}</b>
          <span> priorities</span>
          <Tooltip
            id={"tooltip-history-priorities"}
            text={`Most of the cards have some requirements in order to be good.
                Those requirements are the "priorities". The archetypes have
                priorities too.`}
          />
          <span>
            {" "}
            in <b>{steps.length}</b> step(s)
          </span>
        </div>
        {deckWideFilters && (
          <div>
            We examined <b>{Object.keys(deckWideFilters).length}</b>
            <span> deck wide filters</span>
            <Tooltip
              id={"tooltip-history-filters"}
              text={`Some cards in addition to "priorities" may have some extra
                requirements. For example the Baku decks filter out the even
                cards or the Highlander decks want only one copy of each card.
                Those are the "deck wide filters".`}
            />
          </div>
        )}
        {steps.map((step, index) => (
          <Step key={index}>
            <h3>Step {index + 1}</h3>
            <p>
              The deck size is: <b>{step.sizeBefore}</b>
            </p>
            <div>
              <div className="step-origin-cards">
                <h4>The "origin" cards for this step:</h4>
                <List>
                  {step.originCards.sort(sortAscBy("cost")).map(originCard => (
                    <CardDetail
                      key={originCard.id}
                      card={originCard}
                      listenerMM={listenerMM}
                      listenerML={listenerML}
                    />
                  ))}
                </List>
              </div>
              {step.otherCards &&
                step.otherCards.length > 0 && (
                  <div className="step-other-cards">
                    <h4>Other cards you selected:</h4>
                    <List>
                      {step.otherCards
                        .sort(sortAscBy("cost"))
                        .map(otherCard => (
                          <CardDetail
                            key={otherCard.id}
                            card={otherCard}
                            listenerMM={listenerMM}
                            listenerML={listenerML}
                          />
                        ))}
                    </List>
                  </div>
                )}
              <h4>The priorities for this step:</h4>
              <p>Note: {step.extra}</p>
              <ol>
                {step.prioritiesInfo.map(
                  ({
                    priority: { id, minCards, maxCards, filters },
                    priorityAddedCards,
                    extra
                  }) => (
                    <li key={id}>
                      <div className="priority">
                        <div className="priority-description">
                          <b>Priority requirements: </b>
                          {minCards === maxCards
                            ? minCards
                            : `[${minCards} - ${maxCards}] card(s) where:`}
                          <ol style={{ listStyleType: "lower-alpha" }}>
                            {filters.map((filter, index) => (
                              <li key={index}>
                                {`${filter.property} ${filter.operation} ${
                                  Array.isArray(filter.minValue)
                                    ? filter.minValue.join(" or ")
                                    : filter.minValue
                                }`}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="priority-result">
                          <b>Result:</b> {extra}
                        </div>
                        {priorityAddedCards &&
                          priorityAddedCards.length > 0 && (
                            <div className="priority-added-cards">
                              <b>Cards added:</b>
                              <List>
                                {priorityAddedCards
                                  .sort(sortAscBy("cost"))
                                  .map(card => (
                                    <CardDetail
                                      key={card.id}
                                      card={card}
                                      showManaCost
                                      listenerMM={listenerMM}
                                      listenerML={listenerML}
                                    />
                                  ))}
                              </List>
                            </div>
                          )}
                        {getCardThatRequestedPriority(deck, id) && (
                          <div>
                            <strong>Card that requested the priority:</strong>
                            <List>
                              {this.renderSingleCardDetails(deck, id)}
                            </List>
                          </div>
                        )}
                      </div>
                    </li>
                  )
                )}
              </ol>
              {step.totalAddedCards &&
                step.totalAddedCards.length > 0 && (
                  <div className="step-total-added-cards">
                    <h4>Total cards we added in this step:</h4>
                    <List>
                      {step.totalAddedCards
                        .sort(sortAscBy("cost"))
                        .map(card => (
                          <CardDetail
                            key={card.id}
                            card={card}
                            listenerMM={listenerMM}
                            listenerML={listenerML}
                          />
                        ))}
                    </List>
                  </div>
                )}
              {step.cardsRemoved && (
                <div>
                  <h4>Cards we removed from the deck: </h4>
                  <List>
                    {step.cardsRemoved.sort(sortAscBy("cost")).map(card => (
                      <CardDetail
                        key={card.id}
                        card={card}
                        listenerMM={listenerMM}
                        listenerML={listenerML}
                      />
                    ))}
                  </List>
                </div>
              )}
            </div>
          </Step>
        ))}
      </ContainerCard>
    );
  }
}

History.propTypes = {
  deck: PropTypes.object,
  closeModal: PropTypes.func,
  listenerML: PropTypes.func,
  listenerMM: PropTypes.func
};

export default History;
