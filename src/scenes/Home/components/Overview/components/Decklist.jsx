import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import CardDetail from "../../../components/CardDetail/CardDetail";

const List = styled.ul`
  padding: 10px;
  max-width: 500px;
  min-width: 250px;

  div::selection {
    color: black;
  }
  div::-moz-selection {
    color: black;
  }
`;

const CopyCodeButton = styled.button`
  font-size: 16px;
  color: white;
  background: #524b4e;
`;

const isOrigin = (deck, card) =>
  deck.history.steps[0].originCards.find(c => c.dbfId === card.dbfId);

const isOther = (deck, card) =>
  deck.history.steps[0].otherCards.find(c => c.dbfId === card.dbfId);

const Decklist = ({
  deck,
  deckCode,
  heroNumber,
  handleMouseEnter,
  handleMouseLeave,
  handleCodeCopy,
  handleOpenModal
}) => {
  return (
    <div>
      <h3 className="text-center" style={{ margin: "30px 0px 40px" }}>
        Decklist
      </h3>
      <List id="decklist">
        {deck.cards.map(card => (
          <CardDetail
            key={card.id}
            card={card}
            heroNumber={heroNumber}
            listenerML={handleMouseLeave}
            listenerMM={handleMouseEnter}
            showManaCost
            showCardClass
            boxShadowColor={
              isOrigin(deck, card)
                ? "#E48B19"
                : isOther(deck, card) && "#006AFF"
            }
          />
        ))}
      </List>
      <div className="form-group">
        <div className="input-group">
          <input
            id="deckCode"
            name="deck-code"
            className="form-control"
            type="text"
            placeholder="Readonly input here…"
            readOnly
            value={deckCode}
            onClick={e => e.target.select()}
          />
          <span className="input-group-append">
            <CopyCodeButton
              type="button"
              className="btn btn-default"
              onClick={handleCodeCopy}
            >
              <FontAwesomeIcon icon={faCopy} /> Copy code
            </CopyCodeButton>
          </span>
        </div>
      </div>
      <p style={{ paddingLeft: "10px" }}>
        <span role="img" aria-label="bullet point emoji">
          &#x2728;
        </span>
        The cards in <b>orange name</b> (if any) are completely random good
        cards. All the others are selected by the algorithm.
      </p>
      <p style={{ paddingLeft: "10px" }}>
        <span role="img" aria-label="bullet point emoji">
          &#x2728;
        </span>
        The cards in <b>orange border</b> are either the starting cards you
        select or those the algorithm selects.
      </p>
      <p style={{ paddingLeft: "10px" }}>
        <span role="img" aria-label="bullet point emoji">
          &#x2728;
        </span>
        The cards in <b>blue border</b> are the "other cards" you selected.
      </p>
      <p style={{ paddingLeft: "10px" }}>
        <span role="img" aria-label="bullet point emoji">
          &#x2728;
        </span>
        If you are interested on <b>how we select cards</b> check the
        <a
          href="#openhistory"
          onClick={e => {
            e.preventDefault();
            handleOpenModal();
          }}
        >
          {" "}
          History section{" "}
        </a>
        or see the <Link to="/FAQ">FAQ</Link>.
      </p>
    </div>
  );
};

Decklist.propTypes = {
  deck: PropTypes.object,
  deckCode: PropTypes.string,
  heroNumber: PropTypes.number,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  handleCodeCopy: PropTypes.func,
  handleOpenModal: PropTypes.func,
}

export default Decklist;
