import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import anime from "animejs";
import memoize from "memoize-one";
import Select from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import Popover from "../../../../components/Popover/Popover";
import Tooltip from "../../../../components/Tooltip/Tooltip";
import BootstrapCard from "../../../../components/BootstrapCard/BootstrapCard";

const SelectedCardsList = styled.ul`
  color: whitesmoke;
  background-color: #595255;
  list-style-type: none;
  padding: 0;
`;

const SelectedCard = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid #333;
  padding: 5px 10px;

  span {
    flex: 2;
  }

  select {
    flex: 3;
    text-align-last: right;
    margin-left: auto;
    display: inline-block;
    max-width: 300px;
  }

  option {
    direction: rtl;
  }
`;

const FilterArea = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr;
  grid-template-areas: "ft" "hr" "ar" "oc" "otc" "ef" "com";
  grid-gap: 5px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  grid-area: ${({ gridArea }) => gridArea};

  label {
    flex: 1;
    margin: 0;
    margin-right: 5px;
    font-size: 1.1rem;
  }

  select {
    flex: 3;
    padding: 0;
  }

  & > div {
    flex: 3;
    padding: 0;
  }

  @media (max-width: 954px) {
     {
      flex-direction: column;
      align-items: start;
    }

    label,
    select {
      margin-bottom: 5px;
    }
  }
`;

class Filters extends Component {
  constructor(props) {
    super(props);

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.toReactSelectPrefix = this.toReactSelectPrefix.bind(this);
    this.toSelectedCardsListItem = this.toSelectedCardsListItem.bind(this);

    this.parseSelectedInterestingCards = memoize(
      list =>
        list.includes("Random") || list.length === 0
          ? { value: "Random", label: "Random" }
          : list.map(this.toReactSelect)
    );
    this.parseSelectedNonInterestingCards = memoize(
      list =>
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
      listenerSF,
      listenerSH,
      listenerSA,
      listenerSO,
      listenerSOT,
      handleCompetitiveCheckbox,
      handleSelectExtraDeckWideFilters
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
      <BootstrapCard id="deck-filters" title="Filters">
        <div className="row">
          <div
            className="col-lg-7 col-md-6"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <FilterArea>
              <Filter gridArea="ft">
                <label htmlFor="formatSelect" className="control-label">
                  Format
                  <Tooltip
                    id={"tooltip-format"}
                    text="If you select the Wild format you will get much more starting cards to choose from.
                        Be careful when you change this the starting cards reset to random."
                  />
                </label>
                <select
                  id="formatSelect"
                  name="formatSelect"
                  className="form-control"
                  onChange={listenerSF}
                  value={format}
                >
                  <option value="Standard">Standard</option>
                  <option value="Wild">Wild</option>
                </select>
              </Filter>
              <Filter gridArea="hr">
                <label htmlFor="heroSelect" className="control-label">
                  Hero
                  <Tooltip
                    id={"tooltip-hero"}
                    text="If you select a hero you will get more starting cards to choose from.
                        Be careful when you change this the starting cards reset to random."
                  />
                </label>
                <select
                  id="heroSelect"
                  name="heroSelect"
                  className="form-control"
                  onChange={listenerSH}
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
              <Filter gridArea="ar">
                <label htmlFor="archetype-select" className="control-label">
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
                  className="form-control"
                  onChange={listenerSA}
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
              <Filter gridArea="oc">
                <label htmlFor="origin-card-select" className="control-label">
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
                  style={{ width: "100%" }}
                  multi={true}
                  value={selectedInterestingCards}
                  onChange={listenerSO}
                  options={allInterestingCards}
                  filterOptions={allInterestingCardFilterOptions}
                />
              </Filter>
              <Filter gridArea="otc">
                <label htmlFor="other-card-select" className="control-label">
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
                  style={{ width: "100%" }}
                  multi={true}
                  value={selectedNonInterestingCards}
                  onChange={listenerSOT}
                  options={allNonInterestingCards}
                  filterOptions={allNonInterestingCardFilterOptions}
                />
              </Filter>
              <Filter gridArea="ef">
                <label htmlFor="extra-filters-select" className="control-label">
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
                  style={{ width: "100%" }}
                  multi={true}
                  value={selectedExtraDeckWideFilters}
                  onChange={handleSelectExtraDeckWideFilters}
                  options={allExtraDeckWideFilters}
                  placeholder={"None"}
                />
              </Filter>
              <Filter gridArea="com">
                <label>
                  <input
                    type="checkbox"
                    checked={isCompetitive}
                    onChange={handleCompetitiveCheckbox}
                    className="mr-1"
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
            </FilterArea>
            <div className="tip" style={{ margin: "40px 5px 10px" }}>
              <div>
                <span
                  className="emoji"
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
                <div>
                  <span
                    className="emoji"
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
                    <b> name</b> and card <b>text</b>. For example you can
                    search for "Ysera" or "divine shield".
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-6">
            <div className="h3 text-center">
              <span>Selected Cards</span>
              <Tooltip
                id={"tooltip-selected-cards"}
                text={`This area lists the "starting cards" you selected. The main catch here
                            is that you can see the different versions of the cards and select any version
                            you like. Each version has it's own priorities and you can inspect them by clicking 
                            the greenish button with the question mark. Currently all cards have a default version only,
                            because this is a work in progress. `}
              />
            </div>

            <SelectedCardsList className="mt-4">
              {selectInterestingCards.includes("Random") ? (
                <SelectedCard>No selected cards</SelectedCard>
              ) : (
                selectInterestingCards.map(this.toSelectedCardsListItem)
              )}
            </SelectedCardsList>
          </div>
        </div>
      </BootstrapCard>
    );
  }

  handleOnLoad(e) {
    anime({
      targets: e.target,
      translateX: ["-5%", 0],
      duration: 500,
      delay: 0
    });
  }

  toReactSelect(card) {
    return { value: card.dbfId, label: card.name };
  }

  toReactSelectPrefix(cards, card) {
    return cards.concat({
      value: card.dbfId,
      label: `${
        card.set === 99
          ? this.expansions[15]
          : card.set === 98
            ? this.expansions[14]
            : this.expansions[card.set]
      } - ${card.name}`,
      text: card.text
    });
  }

  // Think about making a separate component.
  toSelectedCardsListItem(card, i) {
    return (
      <SelectedCard key={i}>
        <span>{card.name}</span>
        <select
          name="versionSelect"
          className="form-control"
          onChange={e => this.props.handleSelectVersion(e, i)}
          value={card.activeVersion}
        >
          {card.versions.map((version, i) => (
            <option key={i} value={i}>
              {version.name}
            </option>
          ))}
        </select>
        <Popover
          title={`<b>${card.name}</b> versions`}
          text={renderPopoverText(card)}
          cardId={card.dbfId}
        />
      </SelectedCard>
    );
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
  listenerSF: PropTypes.func.isRequired,
  listenerSH: PropTypes.func.isRequired,
  listenerSA: PropTypes.func.isRequired,
  listenerSO: PropTypes.func.isRequired,
  listenerSOT: PropTypes.func.isRequired,
  handleCompetitiveCheckbox: PropTypes.func.isRequired,
  handleSelectVersion: PropTypes.func.isRequired,
  handleSelectExtraDeckWideFilters: PropTypes.func.isRequired
};

export default Filters;

const renderPopoverText = card =>
  `<ol class="list-popover">
    ${card.versions
      .map(
        version =>
          `<li>
          <b>${version.name}</b> version priorities: 
        <ol class="list-popover list-latin">
          ${version.priorities
            .map(
              priority =>
                `<li>
                [${priority.minCards} - ${priority.maxCards}] cards where: 
                <ul class="list-popover">
                  ${priority.filters
                    .map(
                      filter =>
                        `<li>
                        ${filter.property} ${filter.operation} ${
                          filter.minValue
                        }
                      </li>`
                    )
                    .join(" ")}
                </ul>
              </li>`
            )
            .join(" ")}
        </ol>
      </li>`
      )
      .join(" ")}
  </ol>`;
