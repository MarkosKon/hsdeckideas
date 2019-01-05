import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "already-styled-components";
import memoize from "memoize-one";
import Select from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "balloon-css/balloon.css";

import Tooltip from "../../../../components/Tooltip/Tooltip";
import UICard from "../../../../components/UICard/UICard";
import DeckSelectedCards from "../DeckSelectedCards/DeckSelectedCards";

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  flex-wrap: wrap;
  list-style: none;

  label {
    flex: 1;
    margin: 0;
    margin-right: 5px;
    font-size: 1.1rem;
  }

  .Select-value {
    margin-bottom: 5px;
  }

  select {
    flex: 3;
    border-color: #d9d9d9 #ccc #b3b3b3;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #333;
    cursor: default;
    border-spacing: 0;
    border-collapse: separate;
    height: 36px;
    outline: none;
    overflow: hidden;
    position: relative;
  }

  & > div {
    flex: 3;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }

  @media screen and (max-width: 576px) {
    margin-bottom: 20px;
    select,
    .Select {
      flex: 0 0 100%;
    }
  }
`;

const Tip = styled.div`
  margin: 40px 5px 10px;
`;

class Filters extends Component {
  constructor(props) {
    super(props);

    this.toReactSelectPrefix = this.toReactSelectPrefix.bind(this);

    this.parseSelectedInterestingCards = memoize(list =>
      list.includes("Random") || list.length === 0
        ? { value: "Random", label: "Random" }
        : list.map(this.toReactSelect)
    );
    this.parseSelectedNonInterestingCards = memoize(list =>
      list.includes("None") || list.length === 0
        ? { value: "None", label: "None" }
        : list.map(this.toReactSelect)
    );
    this.parseSelectedExtraDeckWideFilters = memoize(list =>
      list.map(this.toReactSelect)
    );
    this.parseAllInterestingCards = memoize(list =>
      list.reduce(this.toReactSelectPrefix, [
        { value: "Random", label: "Random" }
      ])
    );
    this.parseAllNonInterestingCards = memoize(list =>
      list.reduce(this.toReactSelectPrefix, [{ value: "None", label: "None" }])
    );
    this.parseAllExtraDeckWideFilters = memoize(list =>
      list.map(this.toReactSelect)
    );
    this.parseAllInterestingCardsFilterOptions = memoize(list =>
      createFilterOptions({
        options: list,
        indexes: ["text", "label"]
      })
    );
    this.parseAllNonInterestingCardsFilterOptions = memoize(list =>
      createFilterOptions({
        options: list,
        indexes: ["text", "label"]
      })
    );

    this.expansions = [
      "HOF",
      "Nax",
      "GvG",
      "BRM",
      "TGT",
      "LoE",
      "WOtG",
      "Kara",
      "MSG",
      "Un'Goro",
      "KFT",
      "KnC",
      "TW",
      "BP",
      "RR",
      "Classic",
      "Basic"
    ];
  }

  render() {
    const {
      isCompetitive,
      selectHero,
      format,
      archetype,
      heroes,
      selectInterestingCards,
      selectNonInterestingCards,
      selectExtraDeckWideFilters,
      interestingCards,
      nonInterestingCards,
      extraDeckWideFilters,
      archetypes,
      handleSelectFormat,
      handleSelectHero,
      handleSelectArchetype,
      handleSelectInterestingCards,
      handleSelectNonInterestingCards,
      handleCompetitiveCheckbox,
      handleSelectExtraDeckWideFilters,
      handleSelectVersion,
      handleOpenCardDetailsModal
    } = this.props;

    const selectedInterestingCards = this.parseSelectedInterestingCards(
      selectInterestingCards
    );
    const selectedNonInterestingCards = this.parseSelectedNonInterestingCards(
      selectNonInterestingCards
    );
    const selectedExtraDeckWideFilters = this.parseSelectedExtraDeckWideFilters(
      selectExtraDeckWideFilters
    );
    const allExtraDeckWideFilters = this.parseAllExtraDeckWideFilters(
      extraDeckWideFilters
    );
    const allInterestingCards = this.parseAllInterestingCards(interestingCards);
    const allNonInterestingCards = this.parseAllNonInterestingCards(
      nonInterestingCards
    );
    const allInterestingCardFilterOptions = this.parseAllInterestingCardsFilterOptions(
      allInterestingCards
    );
    const allNonInterestingCardFilterOptions = this.parseAllNonInterestingCardsFilterOptions(
      allNonInterestingCards
    );

    return (
      <UICard id="deck-filters" title="Filters">
        <Row gutters>
          <Column md="100%">
            <Filter>
              <label htmlFor="formatSelect">
                Format
                <Tooltip
                  id={"tooltip-format"}
                  text="If you select the Wild format you will get much more starting cards to choose from.
                        Be careful when you change this the starting cards reset to random."
                  direction="right"
                />
              </label>
              <select
                id="formatSelect"
                name="formatSelect"
                onChange={handleSelectFormat}
                value={format}
              >
                <option value="Standard">Standard</option>
                <option value="Wild">Wild</option>
              </select>
            </Filter>
            <Filter>
              <label htmlFor="heroSelect">
                Hero
                <Tooltip
                  id={"tooltip-hero"}
                  text="If you select a hero you will get more starting cards to choose from.
                        Be careful when you change this the starting cards reset to random."
                  direction="right"
                />
              </label>
              <select
                id="heroSelect"
                name="heroSelect"
                onChange={handleSelectHero}
                value={selectHero}
              >
                <option value="99">Random</option>
                {heroes.map((hero, index) => (
                  <option key={index} value={index}>
                    {hero}
                  </option>
                ))}
              </select>
            </Filter>
            <Filter>
              <label htmlFor="archetype-select">
                Archetype
                <Tooltip
                  id={"tooltip-archetype"}
                  text="Better leave it at random and let the algorithm decide the
                        type of the deck. In the other hand if you get irrelevant archetypes for 
                        the starting cards you chose, feel free to change it."
                />
              </label>
              <select
                id="archetype-select"
                name="archetype-select"
                onChange={handleSelectArchetype}
                value={archetype}
              >
                <option value="Random">Random</option>
                {archetypes.map((archetype, index) => (
                  <option key={index} value={archetype.name}>
                    {archetype.name}
                  </option>
                ))}
              </select>
            </Filter>
            <Filter>
              <label htmlFor="origin-card-select">
                Starting cards ({interestingCards.length})
                <Tooltip
                  id={"tooltip-starting-cards"}
                  text="This list contains cards that depend on other cards to be good.
                        You can select up to 15 starting cards but i don't suggest
                        more than 3 because most of the card priorities will be ignored."
                />
              </label>
              <Select
                id="origin-card-select"
                name="origin-card-select"
                multi={true}
                value={selectedInterestingCards}
                onChange={handleSelectInterestingCards}
                options={allInterestingCards}
                filterOptions={allInterestingCardFilterOptions}
              />
            </Filter>
            <Filter>
              <label htmlFor="other-card-select">
                Other cards ({nonInterestingCards.length})
                <Tooltip
                  id={"tooltip-other-cards"}
                  text={`This list contains the cards that are not included
                        in the "starting cards".
                        Use it if you want to force some specific cards into 
                        the deck. You can select up to 10 cards. If there are
                        no spots left in the deck these cards (or a part of them)
                        will be ignored.`}
                />
              </label>
              <Select
                id="other-card-select"
                name="other-card-select"
                multi={true}
                value={selectedNonInterestingCards}
                onChange={handleSelectNonInterestingCards}
                options={allNonInterestingCards}
                filterOptions={allNonInterestingCardFilterOptions}
              />
            </Filter>
            <Filter>
              <label htmlFor="extra-filters-select">
                Extra filters ({extraDeckWideFilters.length})
                <Tooltip
                  id={"tooltip-extra-filters"}
                  text={`These filters limit the available card pool. You can
                          select card rarities and expansions. For example you can
                          make a GvG retro deck by selecting (basic, classic, hof, naxx and gvg).
                          Or you can make decks from different expansions and see
                          which is the most powerful. *Don't forget to change the format
                          to Wild otherwise you won't see the wild expansions. 
                        `}
                />
              </label>
              <Select
                id="extra-filters-select"
                name="extra-filters-select"
                multi={true}
                value={selectedExtraDeckWideFilters}
                onChange={handleSelectExtraDeckWideFilters}
                options={allExtraDeckWideFilters}
                placeholder={"None"}
              />
            </Filter>
            <Filter>
              <label>
                <input
                  type="checkbox"
                  checked={isCompetitive}
                  onChange={handleCompetitiveCheckbox}
                />
                Competitive Deck
                <Tooltip
                  id={"tooltip-competitive-deck"}
                  text="By default we select the best available card in order
                        to make the deck as competitive as possible. This has
                        it's drawbacks though, as some cards will almost always 
                        appear because they are too good. If you want a more 
                        random deck, deselect this option."
                />
              </label>
            </Filter>
            <Tip>
              <div>
                <span
                  role="img"
                  aria-label="thinking face emoji"
                  style={{
                    marginRight: "8px"
                  }}
                >
                  {" "}
                  &#x1f914;
                </span>
                <span>
                  Don't forget to choose or even combine <b>Highlander</b>{" "}
                  cards, <b>Genn, </b>
                  <b>Baku</b>, <b>Princes</b>, <b>Quests</b>,{" "}
                  <b>Deathknights</b>.
                </span>
              </div>
              <div>
                <span
                  role="img"
                  aria-label="thinking face emoji"
                  style={{
                    marginRight: "8px"
                  }}
                >
                  {" "}
                  &#x1f914;
                </span>
                <span>
                  Also remember that you can <b>search</b> for card
                  <b> name</b> and card <b>text</b>. For example you can search
                  for "Ysera" or "divine shield".
                </span>
              </div>
            </Tip>
          </Column>

          <Column md="100%">
            <DeckSelectedCards
              selectInterestingCards={selectInterestingCards}
              handleSelectVersion={handleSelectVersion}
              handleOpenCardDetailsModal={handleOpenCardDetailsModal}
            />
          </Column>
        </Row>
      </UICard>
    );
  }

  toReactSelect(card) {
    return { value: card.dbfId, label: card.name };
  }

  toReactSelectPrefix(cards, card) {
    return cards.concat({
      value: card.dbfId,
      label: `${
        card.set === 99
          ? this.expansions[16]
          : card.set === 98
          ? this.expansions[15]
          : this.expansions[card.set]
      } - ${card.name}`,
      text: card.text
    });
  }
}

Filters.propTypes = {
  isCompetitive: PropTypes.bool.isRequired,
  selectHero: PropTypes.number.isRequired,
  format: PropTypes.string.isRequired,
  archetype: PropTypes.string.isRequired,
  heroes: PropTypes.array.isRequired,
  selectInterestingCards: PropTypes.array.isRequired,
  selectNonInterestingCards: PropTypes.array.isRequired,
  selectExtraDeckWideFilters: PropTypes.array.isRequired,
  interestingCards: PropTypes.array.isRequired,
  nonInterestingCards: PropTypes.array.isRequired,
  extraDeckWideFilters: PropTypes.array.isRequired,
  archetypes: PropTypes.array.isRequired,
  handleSelectFormat: PropTypes.func.isRequired,
  handleSelectHero: PropTypes.func.isRequired,
  handleSelectArchetype: PropTypes.func.isRequired,
  handleSelectInterestingCards: PropTypes.func.isRequired,
  handleSelectNonInterestingCards: PropTypes.func.isRequired,
  handleCompetitiveCheckbox: PropTypes.func.isRequired,
  handleSelectVersion: PropTypes.func.isRequired,
  handleSelectExtraDeckWideFilters: PropTypes.func.isRequired,
  handleOpenCardDetailsModal: PropTypes.func.isRequired
};

export default Filters;
