import React, { Component } from "react";
import CardDetail from "../CardDetail/CardDetail";
import { sortAscBy } from "../../../../utils/sort";
import { getCardThatRequestedPriority } from "../../../../utils/deckUtils";

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
    // Aliases.
    const history = this.props.deck.history;
    const steps = history ? history.steps : 0;
    const deckWideFilters = history ? history.totalDeckFiltersExamined : 0;
    return (
      <div id="deck-history" className="panel">
        <div className="panel-heading">
          <h2 className="text-center">History (text)</h2>
        </div>
        <div className="panel-body">
          <div className="well" style={{ backgroundColor: "azure" }}>
            <p>
              <b>
                You totally don't have to read this because is not completely
                human readable. Only read this if you are curious of how the
                algorithm works. You can also check the tree diagram.
              </b>
            </p>
            <p>
              This section shows you a detailed view of the decisions we make
              during deck creation. Each step starts with some cards as a
              starting point, the "origin" cards. Those cards have one or more
              requirements that need to be met in order to be good. We examine
              each of these requirements and add the best cards possible.
            </p>
            <p>
              Also keep in mind that we take into account the hero power for
              some priorities. A hero power that satisfies a priority is worth 2
              cards in the deck.
            </p>
          </div>
          {steps !== 0 ? (
            <div>
              We examined{" "}
              <b>{Object.keys(history.totalPrioritiesExamined).length}</b>
              <div className="tooltip-w3">
                priorities
                <span className="tooltiptext">
                  Most of the cards have some requirements in order to be good.
                  Those requirements are the "priorities". The archetypes have
                  priorities too.
                </span>
              </div>
              in <b>{steps.length}</b> step(s)
            </div>
          ) : null}
          {deckWideFilters !== 0 ? (
            <div>
              We examined <b>{Object.keys(deckWideFilters).length}</b>
              <div className="tooltip-w3">
                deck wide filters.
                <span className="tooltiptext">
                  Some cards in addition to "priorities" may have some extra
                  requirements. For example the Baku decks filter out the even
                  cards or the Highlander decks want only one copy of each card.
                  Those are the "deck wide filters".
                </span>
              </div>
            </div>
          ) : null}
          {steps === 0 ? (
            <p>No content available yet</p>
          ) : (
            steps.map((step, index) => (
              <div className="step" key={index}>
                <h3 className="step-title">Step {index + 1}</h3>
                <div>
                  {step.originCards && step.originCards.length > 0 ? (
                    <div className="step-origin-cards">
                      <h4>The "origin" cards for this step:</h4>
                      <ul className="decklist decklist-snapshot">
                        {step.originCards
                          .sort(sortAscBy("cost"))
                          .map((oc, innerIndex1) => (
                            <CardDetail
                              key={oc.id}
                              card={oc}
                              listenerMM={this.props.listenerMM}
                              listenerML={this.props.listenerML}
                            />
                          ))}
                      </ul>
                    </div>
                  ) : null}
                  {step.otherCards && step.otherCards.length > 0 ? (
                    <div className="step-other-cards">
                      <h4>Other cards you selected:</h4>
                      <ul className="decklist decklist-snapshot">
                        {step.otherCards
                          .sort(sortAscBy("cost"))
                          .map((oc, i) => (
                            <CardDetail
                              key={oc.id}
                              card={oc}
                              listenerMM={this.props.listenerMM}
                              listenerML={this.props.listenerML}
                            />
                          ))}
                      </ul>
                    </div>
                  ) : null}
                  <h4>The priorities for this step:</h4>
                  <p>Note: {step.extra}</p>
                  <ol>
                    {step.prioritiesInfo.map((pi, innerIndex2) => (
                      <li key={innerIndex2}>
                        <div className="priority">
                          <div className="priority-description">
                            <b>Priority requirements: </b>
                            {pi.priority.minCards === pi.priority.maxCards
                              ? pi.priority.minCards
                              : "[" +
                                pi.priority.minCards +
                                "-" +
                                pi.priority.maxCards +
                                "]"}{" "}
                            card(s) where:
                            <ol style={{ listStyleType: "lower-alpha" }}>
                              {pi.priority.filters.map(
                                (filter, superInner1) => (
                                  <li key={superInner1}>
                                    {" "}
                                    {filter.property} {filter.operation}{" "}
                                    {Array.isArray(filter.minValue)
                                      ? filter.minValue.join(" or ")
                                      : filter.minValue}{" "}
                                  </li>
                                )
                              )}
                            </ol>
                          </div>
                          <div className="priority-result">
                            <b>Result:</b> {pi.extra}
                          </div>
                          {pi.priorityAddedCards &&
                          pi.priorityAddedCards.length > 0 ? (
                            <div className="priority-added-cards">
                              <b>Cards added:</b>
                              <ul className="decklist decklist-snapshot">
                                {pi.priorityAddedCards
                                  .sort(sortAscBy("cost"))
                                  .map((ac, superInner2) => (
                                    <CardDetail
                                      key={ac.id}
                                      card={ac}
                                      showManaCost={true}
                                      listenerMM={this.props.listenerMM}
                                      listenerML={this.props.listenerML}
                                    />
                                  ))}
                              </ul>
                            </div>
                          ) : null}
                          {getCardThatRequestedPriority(
                            this.props.deck,
                            pi.priority.id
                          ) ? (
                            <div className="card-requested-priority">
                              <strong>Card that requested the priority:</strong>
                              <ul className="decklist decklist-snapshot">
                                {this.renderSingleCardDetails(
                                  this.props.deck,
                                  pi.priority.id
                                )}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                  {step.totalAddedCards && step.totalAddedCards.length > 0 ? (
                    <div className="step-total-added-cards">
                      <h4>Total cards we added in this step:</h4>
                      <ul className="decklist decklist-snapshot">
                        {step.totalAddedCards
                          .sort(sortAscBy("cost"))
                          .map((tc, innerIndex3) => (
                            <CardDetail
                              key={tc.id}
                              card={tc}
                              listenerMM={this.props.listenerMM}
                              listenerML={this.props.listenerML}
                            />
                          ))}
                      </ul>
                    </div>
                  ) : null}
                  {step.cardsRemoved && step.cardsRemoved.length > 0 ? (
                    <div>
                      <h4>Cards we removed from the deck: </h4>
                      <ul className="decklist decklist-snapshot">
                        {step.cardsRemoved
                          .sort(sortAscBy("cost"))
                          .map((c, innerIndex4) => (
                            <CardDetail
                              key={c.id}
                              card={c}
                              listenerMM={this.props.listenerMM}
                              listenerML={this.props.listenerML}
                            />
                          ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default History;
