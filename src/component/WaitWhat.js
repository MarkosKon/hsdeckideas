import React, { Component }from "react";
import CardDetail from "./CardDetail"

class WaitWhat extends Component {
    render() {
        const marginTop = {marginTop: "3rem"};
        return (
            <div className="row">
            {this.props.deck && this.props.deck.cards? (
                <div className="panel">
                    <div className="panel-heading">
                    <h2 className="text-center">Wait.. why did you put that in the deck?</h2>
                    </div>

                    <div className="panel-body">
                        <p className="well" style={{backgroundColor: "antiquewhite"}}>
                            This section explains where cards are coming from and why we choose them <b>DURING</b> deck creation.
                            By doing that it will be easier for you to replace a card with a better one that fills the same role.
                        </p>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="grid-container">
                                    <div className="grid-item">
                                        <h3>{this.props.archetype.name} archetype staple cards</h3>
                                        <ul className="decklist decklist-snapshot">
                                        {this.props.deck.cards
                                            .filter(c => c.isFrom === "Archetype")
                                            .map((card, index) => (
                                                <CardDetail 
                                                    key={index}
                                                    card={card}
                                                />
                                            )
                                        )}
                                        </ul>
                                    </div>
                                    {this.props.theme ? (
                                    <div className="grid-item">
                                        <h3>"{this.props.theme.name}" theme staple cards</h3>
                                        <ul className="decklist decklist-snapshot">
                                        {this.props.deck.cards
                                            .filter(c => c.isFrom === "Theme")
                                            .map((card, index) => (
                                                <CardDetail 
                                                    key={index}
                                                    card={card}
                                                />
                                            )
                                        )}
                                        </ul>
                                    </div>
                                    ) : null}
                                    {this.props.flavor ? (
                                    <div className="grid-item">
                                        <h3>"{this.props.flavor.name}" flavor staple card(s)</h3>
                                        <ul className="decklist decklist-snapshot">
                                        {this.props.deck.cards
                                            .filter(c => c.isFrom === "Flavor")
                                            .map((card, index) => (
                                                <CardDetail 
                                                    key={index}
                                                    card={card}
                                                />
                                            )
                                        )}
                                        </ul>
                                    </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-12"
                                 style={marginTop}>
                                <h3>From archetype priorities</h3>
                                <div className="grid-container">
                                    {this.props.archetype.priorities
                                        .map((priority, index) => (
                                            <div key={index} className={this.props.deck.cards.find(c => c.isFrom === priority.id) ? "grid-item" : "hidden"}>
                                                {this.props.deck.cards.find(c => c.isFrom === priority.id) 
                                                    ? priority.cardTypeExtra 
                                                        ? priority.cardCost 
                                                                ? <h4>{`*${priority.cardTypeExtra.split("_").join(" ")} 
                                                                        (${priority.cardType.join(" or ").toLowerCase()})
                                                                        with mana cost -> ${priority.cardCost.operation} ${priority.cardCost.value}.
                                                                        We want ${priority.minCards} min - ${priority.maxCards} max. We added: `}</h4>
                                                                : <h4>{`*${priority.cardTypeExtra.split("_").join(" ")} 
                                                                        (${priority.cardType.join(" or ").toLowerCase()}).
                                                                        We want ${priority.minCards} min - ${priority.maxCards} max. We added: `}</h4>
                                                        : <h4>{`*${priority.cardType.join(" or ").toLowerCase()} 
                                                                with mana cost -> ${priority.cardCost.operation.toLowerCase()} ${priority.cardCost.value}.
                                                                We want ${priority.minCards} min - ${priority.maxCards} max. We added: `}</h4>
                                                    : null}
                                                <ul className="decklist decklist-snapshot">
                                                {this.props.deck.cards
                                                    .filter(c => c.isFrom === priority.id)
                                                    .map((card, innerIndex) => (
                                                        <CardDetail 
                                                            key={innerIndex}
                                                            card={card}
                                                        />
                                                    ))
                                                }
                                                </ul>
                                            </div>
                                            )
                                        )}
                                </div>
                            </div>
                            {this.props.deck.cards.find(c => c.isFrom === "Random") ?
                            <div className="col-lg-4 col-md-6"
                                 style={marginTop}>
                                <h3>Random good cards</h3>
                                <ul className="decklist decklist-snapshot">
                                {this.props.deck.cards
                                    .filter(c => c.isFrom === "Random")
                                    .map((card, index) => (
                                        <CardDetail 
                                            key={index}
                                            card={card}
                                        />
                                    )
                                )}
                                </ul>
                            </div>
                                : null}
                        </div>
                    </div>
                </div>) : null}
            </div>
        );
    }
}

export default WaitWhat;