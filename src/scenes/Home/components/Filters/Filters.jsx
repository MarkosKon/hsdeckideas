import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Column } from 'already-styled-components';
import memoize from 'memoize-one';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import Tooltip from '../../../../components/Tooltip/Tooltip';
import UICard from '../../../../components/UICard/UICard';
import DeckSelectedCards from '../DeckSelectedCards/DeckSelectedCards';

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
    font-weight: 700;
  }

  .Select-value {
    margin-bottom: 5px;
  }

  select {
    flex: 3;
    background-color: white;
    border-color: #d9d9d9 #ccc #b3b3b3;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #333;
    border-spacing: 0;
    border-collapse: separate;
    height: 36px;
    overflow: hidden;
    position: relative;
  }

  & > div {
    flex: 3;
  }

  input[type='checkbox'] {
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

const toReactSelect = ({ dbfId, name }) => ({ value: dbfId, label: name });

class Filters extends Component {
  constructor(props) {
    super(props);

    this.toReactSelectPrefix = this.toReactSelectPrefix.bind(this);

    this.parseSelectedInterestingCards = memoize(list => (list.includes('Random') || list.length === 0
      ? { value: 'Random', label: 'Random' }
      : list.map(toReactSelect)));
    this.parseSelectedNonInterestingCards = memoize(list => (list.includes('None') || list.length === 0
      ? { value: 'None', label: 'None' }
      : list.map(toReactSelect)));
    this.parseSelectedExtraDeckWideFilters = memoize(list => list.map(toReactSelect));
    this.parseAllInterestingCards = memoize(list => list.reduce(this.toReactSelectPrefix, [{ value: 'Random', label: 'Random' }]));
    this.parseAllNonInterestingCards = memoize(list => list.reduce(this.toReactSelectPrefix, [{ value: 'None', label: 'None' }]));
    this.parseAllExtraDeckWideFilters = memoize(list => list.map(toReactSelect));
    this.parseAllInterestingCardsFilterOptions = memoize(list => createFilterOptions({
      options: list,
      indexes: ['text', 'label'],
    }));
    this.parseAllNonInterestingCardsFilterOptions = memoize(list => createFilterOptions({
      options: list,
      indexes: ['text', 'label'],
    }));

    this.expansions = [
      'HOF',
      'Nax',
      'GvG',
      'BRM',
      'TGT',
      'LoE',
      'WOtG',
      'Kara',
      'MSG',
      "Un'Goro",
      'KFT',
      'KnC',
      'TW',
      'BP',
      'RR',
      'RoS',
      'Classic',
      'Basic',
    ];
  }

  toReactSelectPrefix(cards, {
    dbfId, set, name, text,
  }) {
    const setEquals98 = set === 98 ? this.expansions[16] : this.expansions[set];
    return cards.concat({
      value: dbfId,
      label: `${set === 99 ? this.expansions[17] : setEquals98} - ${name}`,
      text,
    });
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
      handleOpenCardDetailsModal,
    } = this.props;

    const selectedInterestingCards = this.parseSelectedInterestingCards(selectInterestingCards);
    const selectedNonInterestingCards = this.parseSelectedNonInterestingCards(
      selectNonInterestingCards,
    );
    const selectedExtraDeckWideFilters = this.parseSelectedExtraDeckWideFilters(
      selectExtraDeckWideFilters,
    );
    const allExtraDeckWideFilters = this.parseAllExtraDeckWideFilters(extraDeckWideFilters);
    const allInterestingCards = this.parseAllInterestingCards(interestingCards);
    const allNonInterestingCards = this.parseAllNonInterestingCards(nonInterestingCards);
    const allInterestingCardFilterOptions = this.parseAllInterestingCardsFilterOptions(
      allInterestingCards,
    );
    const allNonInterestingCardFilterOptions = this.parseAllNonInterestingCardsFilterOptions(
      allNonInterestingCards,
    );

    return (
      <UICard id="deck-filters" title="Filters">
        <Row gutters>
          <Column md="100%">
            <Filter>
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
              <label htmlFor="formatSelect">
                Format
                <Tooltip
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
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
              <label htmlFor="heroSelect">
                Hero
                <Tooltip
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
                  <option key={hero} value={index}>
                    {hero}
                  </option>
                ))}
              </select>
            </Filter>
            <Filter>
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
              <label htmlFor="archetype-select">
                Archetype
                <Tooltip
                  text="Better leave it at random and let the algorithm decide the
                        type of the deck. Change it if you get irrelevant archetypes for
                        the starting cards you chose."
                />
              </label>
              <select
                id="archetype-select"
                name="archetype-select"
                onChange={handleSelectArchetype}
                value={archetype}
              >
                <option value="Random">Random</option>
                {archetypes.map(arch => (
                  <option key={arch.name} value={arch.name}>
                    {arch.name}
                  </option>
                ))}
              </select>
            </Filter>
            <Filter>
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="origin-card-select">
                Starting cards (
                {interestingCards.length}
                )
                <Tooltip
                  text="This list contains cards that depend on other cards to be good.
                        You can select up to 15 starting cards but i don't suggest
                        more than 3 because most of the card priorities will be ignored."
                  direction="top"
                />
              </label>
              <Select
                id="origin-card-select"
                name="origin-card-select"
                multi
                value={selectedInterestingCards}
                onChange={handleSelectInterestingCards}
                options={allInterestingCards}
                filterOptions={allInterestingCardFilterOptions}
              />
            </Filter>
            <Filter>
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="other-card-select">
                Other cards (
                {nonInterestingCards.length}
                )
                <Tooltip
                  text={`This list contains the cards that are not included
                        in the "starting cards".
                        Use it if you want to force some specific cards into
                        the deck. You can select up to 10 cards.`}
                  direction="top"
                />
              </label>
              <Select
                id="other-card-select"
                name="other-card-select"
                multi
                value={selectedNonInterestingCards}
                onChange={handleSelectNonInterestingCards}
                options={allNonInterestingCards}
                filterOptions={allNonInterestingCardFilterOptions}
              />
            </Filter>
            <Filter>
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="extra-filters-select">
                Extra filters (
                {extraDeckWideFilters.length}
                )
                <Tooltip
                  text={`These filters limit the available card pool. You can
                          select card rarities and expansions. Don't forget to
                          change the format to Wild otherwise you won't see
                          the wild expansions.
                        `}
                  direction="top"
                />
              </label>
              <Select
                id="extra-filters-select"
                name="extra-filters-select"
                multi
                value={selectedExtraDeckWideFilters}
                onChange={handleSelectExtraDeckWideFilters}
                options={allExtraDeckWideFilters}
                placeholder="None"
              />
            </Filter>
            <Filter>
              <label htmlFor="checkbox">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={isCompetitive}
                  onChange={handleCompetitiveCheckbox}
                />
                Competitive Deck
                <Tooltip
                  text="By default we select the best available card in order
                        to make the deck as competitive as possible. This has
                        it's drawbacks though, as some cards will almost always
                        appear because they are too good."
                  direction="top"
                />
              </label>
            </Filter>
            <Tip>
              <div>
                <span
                  role="img"
                  aria-label="thinking face emoji"
                  style={{
                    marginRight: '8px',
                  }}
                >
                  {' '}
                  &#x1f914;
                </span>
                <span>
                  Don&apos;t forget to choose or even combine
                  <b> Highlander </b>
                  cards,
                  <b> Genn, Baku, Princes, Quests or Deathknights. </b>
                </span>
              </div>
              <div>
                <span
                  role="img"
                  aria-label="thinking face emoji"
                  style={{
                    marginRight: '8px',
                  }}
                >
                  {' '}
                  &#x1f914;
                </span>
                <span>
                  Also remember that you can
                  <b> search </b>
                  for card
                  <b> name </b>
                  and card
                  <b> text. </b>
                  For example you can search for &quot;Ysera&quot; or &quot;divine shield&quot;.
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
}

Filters.propTypes = {
  isCompetitive: PropTypes.bool.isRequired,
  selectHero: PropTypes.number.isRequired,
  format: PropTypes.string.isRequired,
  archetype: PropTypes.string.isRequired,
  heroes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectInterestingCards: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  selectNonInterestingCards: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  selectExtraDeckWideFilters: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  interestingCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  nonInterestingCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  extraDeckWideFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  archetypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelectFormat: PropTypes.func.isRequired,
  handleSelectHero: PropTypes.func.isRequired,
  handleSelectArchetype: PropTypes.func.isRequired,
  handleSelectInterestingCards: PropTypes.func.isRequired,
  handleSelectNonInterestingCards: PropTypes.func.isRequired,
  handleCompetitiveCheckbox: PropTypes.func.isRequired,
  handleSelectVersion: PropTypes.func.isRequired,
  handleSelectExtraDeckWideFilters: PropTypes.func.isRequired,
  handleOpenCardDetailsModal: PropTypes.func.isRequired,
};

export default Filters;
