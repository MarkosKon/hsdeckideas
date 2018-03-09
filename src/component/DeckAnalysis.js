import React from "react";
import CardDetail from "./CardDetail"
import { getCardsForPriority } from "../util/deckUtils"

const DeckAnalysis = (props) => {
    return(
        <div className="col-sm-6">
            {props.archetype ?
            <div className="panel">
                <div className="panel-heading">
                    <h2 className="text-center">Deck analysis</h2>
                </div>

                <div className="panel-body">
                    <p className="well" style={{backgroundColor: "azure"}}>
                        This section groups the deck cards (<b>AFTER</b> creation) based on the {props.archetype.name} archetype priorities.
                        That way it is easier for you to replace poor choices, remove cards that over-satisfy a priority or add cards
                        to a priority that has none.
                    </p>
                    <div className="grid-container">
                        {props.archetype.priorities.map((priority, index) => (
                            <div key={index}
                                // className={props.deck.cards.find(c => c.isFrom === priority.id) ? "col-lg-4 col-md-6" : "col-lg-0 col-md-0"}
                                className="grid-item"
                            >
                                {/*props.deck.cards.find(c => c.isFrom === priority.id) 
                                    ?*/ priority.cardTypeExtra 
                                        ? priority.cardCost 
                                                ? <h4>{`*${priority.cardTypeExtra.split("_").join(" ")} 
                                                        (${priority.cardType.join(" or ").toLowerCase()}) 
                                                        with mana cost -> ${priority.cardCost.operation} ${priority.cardCost.value}. 
                                                        We want ${priority.minCards} min - ${priority.maxCards} max. We have in the deck:`}</h4>
                                                : <h4>{`*${priority.cardTypeExtra.split("_").join(" ")}
                                                        (${priority.cardType.join(" or ").toLowerCase()}). 
                                                        We want ${priority.minCards} min - ${priority.maxCards} max. We have in the deck:`}</h4>
                                        : <h4>{`*${priority.cardType.join(" or ").toLowerCase()} 
                                                with mana cost -> ${priority.cardCost.operation.toLowerCase()} ${priority.cardCost.value}. 
                                                We want ${priority.minCards} min - ${priority.maxCards} max. We have in the deck:`}</h4>
                                    /*: null*/}
                                <ul className="decklist decklist-snapshot">
                                {getCardsForPriority(props.deck.cards, priority)
                                    .map((card, innerIndex) => (
                                        <CardDetail
                                            key={innerIndex}
                                            card={card}
                                        />
                                ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : null}
        </div>
    )
}

export default DeckAnalysis;