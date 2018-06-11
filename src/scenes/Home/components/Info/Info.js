import React from "react";

export default props => {
  const originCards =
    props.originCards.length > 0
      ? props.originCards.map(c => c.name).join(", ")
      : "Loading..";
  const otherCards =
    props.otherCards && props.otherCards.length > 0
      ? props.otherCards.map(c => c.name).join(", ")
      : "None";
  return (
    <div id="deck-info" className="panel">
      <div className="panel-heading">
        <h2 className="text-center">Deck Info</h2>
      </div>
      <div className="panel-body">
        <div className="well">
          <p>
            <b>Class: </b>
            {props.hero ? props.hero : "Loading.."}
          </p>
          <p>
            <b>Archetype: </b>
            {props.archetype ? props.archetype.name : "Loading.."}
          </p>
          <p>
            <b>Archetype Description: </b>
            {props.archetype ? props.archetype.description : "Loading.."}
          </p>
          <p>
            <b>Starting point: </b>
            {originCards}
          </p>
          <p>
            <b>Other cards: </b>
            {otherCards}
          </p>
        </div>
      </div>
    </div>
  );
};
