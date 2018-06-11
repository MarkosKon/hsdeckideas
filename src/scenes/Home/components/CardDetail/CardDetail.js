import React from "react";
import LazyLoad from "react-lazyload";

export default props => (
  <li
    data-image-url={props.card.imageUrl}
    onMouseMove={props.listenerMM}
    onMouseLeave={props.listenerML}
  >
    {props.showManaCost ? (
      <div className={"mana-cost " + props.card.rarity.toLowerCase()}>
        {props.card.cost}
      </div>
    ) : null}
    <LazyLoad height={35} offset={200} once>
      <div
        className="name"
        style={{
          background: `linear-gradient(to right, black 0%, black 70%, rgba(255, 255, 255, 0)) 30%, url(/resources/images/${
            props.card.tile
          }) top right no-repeat`
        }}
      >
        {props.card.name}
      </div>
    </LazyLoad>
    <div className="quantity">
      {props.card.rarity === "LEGENDARY" ? (
        <div>
          <i className="fas fa-star" />
        </div>
      ) : (
        props.card.quantity
      )}
    </div>
  </li>
);
