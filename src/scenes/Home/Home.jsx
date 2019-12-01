import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Row, Column } from 'already-styled-components';
import update from 'immutability-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { getRandom } from 'some-utils';
import Loadable from 'react-loadable';
import ReactGA from 'react-ga';

import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Filters from './components/Filters/Filters';
import Navbar from '../../components/Navbar';
import { getAvailableCards } from '../../utils/card';
import {
  initializeDeck, getDeck, getDeckCode, getManaCurveChartData,
} from '../../utils/deck';
// import deckUtils from '../../utils/deck';
import UICard from '../../components/UICard/UICard';
import SEO from '../../components/SEO/SEO';
import Fab from '../../components/Fab';

/* eslint-disable comma-dangle */
const LoadableDeckList = Loadable({
  loader: () => import(
    /* webpackChunkName: "decklist", webpackPrefetch: true */ './components/DeckList/Decklist'
  ),
  loading: Loading,
});
const LoadableDeckInfo = Loadable({
  loader: () => import(
    /* webpackChunkName: "deckinfo", webpackPrefetch: true */ './components/DeckInfo/DeckInfo'
  ),
  loading: Loading,
});
const LoadableDeckStats = Loadable({
  loader: () => import(
    /* webpackChunkName: "deckstats", webpackPrefetch: true */ './components/DeckStats/DeckStats'
  ),
  loading: Loading,
});
const LoadableDiagramModal = Loadable({
  loader: () => import(
    /* webpackChunkName: "diagrammodal", webpackPrefetch: true */ './components/Modals/DiagramModal'
  ),
  loading: Loading,
});
const LoadableCardDetailsModal = Loadable({
  loader: () => import(
    /* webpackChunkName: "carddetailsmodal", webpackPrefetch: true */ './components/Modals/CardDetailsModal'
  ),
  loading: Loading,
});
const LoadableHistoryModal = Loadable({
  loader: () => import(
    /* webpackChunkName: "historymodal", webpackPrefetch: true */ './components/Modals/HistoryModal'
  ),
  loading: Loading,
});
/* eslint-enable comma-dangle */

const sortBy = require('lodash.sortby');

const getAvailableExtraDeckWideFilters = (filters, format) => (format === 'Wild' ? filters : filters.filter(filter => filter.set > 8));

const heroColors = [
  'rgb(116, 80, 8)',
  'darkolivegreen',
  '#8f95b5',
  '#b3843b',
  '#b5bbbd',
  '#595255',
  '#343663',
  '#6d4075',
  '#652523',
];

const Parent = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  transition: background-color 0.5s ease-in-out;
  ${({ backgroundBlur }) => backgroundBlur && 'filter: blur(10px);'}
`;

Parent.propTypes = {
  bgColor: PropTypes.string,
  backgroundBlur: PropTypes.bool.isRequired,
};

Parent.defaultProps = {
  bgColor: '7a7a7a',
};

class Home extends Component {
  constructor(props) {
    super(props);

    // Binding handlers, lots of them.
    this.handleQuery = this.handleQuery.bind(this);
    this.handleSelectHero = this.handleSelectHero.bind(this);
    this.handleSelectFormat = this.handleSelectFormat.bind(this);
    this.handleSelectArchetype = this.handleSelectArchetype.bind(this);
    this.handleSelectInterestingCards = this.handleSelectInterestingCards.bind(this);
    this.handleSelectNonInterestingCards = this.handleSelectNonInterestingCards.bind(this);
    this.handleSelectVersion = this.handleSelectVersion.bind(this);
    this.handleSelectExtraDeckWideFilters = this.handleSelectExtraDeckWideFilters.bind(this);
    this.handleCompetitiveCheckbox = this.handleCompetitiveCheckbox.bind(this);
    this.openHistoryModal = this.openHistoryModal.bind(this);
    this.closeHistoryModal = this.closeHistoryModal.bind(this);
    this.openDiagramModal = this.openDiagramModal.bind(this);
    this.closeDiagramModal = this.closeDiagramModal.bind(this);
    this.openCardDetailsModal = this.openCardDetailsModal.bind(this);
    this.closeCardDetailsModal = this.closeCardDetailsModal.bind(this);

    // this.worker = deckUtils();

    this.state = {
      firstSuggestionLoaded: false,
      haveData: false,
      // External data.
      interestingCards: [],
      nonInterestingCards: [],
      extraDeckWideFilters: [],
      // Suggestion state.
      isCompetitive: true,
      hero: 99,
      archetype: null,
      chosenInterestingCards: [],
      chosenNonInterestingCards: [],
      deckForUI: {},
      deckCode: null,
      manaCurveChartData: null,
      // UI Selects.
      selectHero: 99,
      selectFormat: 'Standard',
      selectArchetype: 'Random',
      selectInterestingCards: ['Random'],
      selectNonInterestingCards: ['None'],
      selectedExtraDeckWideFilters: [],
      // Modals
      historyModalOpen: false,
      diagramModalOpen: false,
      cardDetailsModalOpen: false,
      cardDetailsModalCard: null,
    };
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

  static getDerivedStateFromProps(props, state) {
    // When the data are available the first time
    // calculate the new state.
    if (!state.haveData && props.cards.length > 0) {
      const format = 'Standard';
      const heroName = 'Random';
      return {
        haveData: true,
        interestingCards: sortBy(getAvailableCards(props.cards, heroName, format, true), [
          'set',
          'name',
        ]),
        nonInterestingCards: sortBy(getAvailableCards(props.cards, heroName, format, false), [
          'set',
          'name',
        ]),
        extraDeckWideFilters: getAvailableExtraDeckWideFilters(props.extraDeckWideFilters, format),
      };
    }
    return null;
  }

  openHistoryModal() {
    this.setState({ historyModalOpen: true });
  }

  closeHistoryModal() {
    this.setState({ historyModalOpen: false });
  }

  openDiagramModal() {
    this.setState({ diagramModalOpen: true });
  }

  closeDiagramModal() {
    this.setState({ diagramModalOpen: false });
  }

  openCardDetailsModal(card) {
    this.setState({ cardDetailsModalOpen: true, cardDetailsModalCard: card });
  }

  closeCardDetailsModal() {
    this.setState({ cardDetailsModalOpen: false });
  }

  suggest() {
    const {
      heroes, heroPowers, heroCodes, cards, archetypes,
    } = this.props;
    const {
      selectHero,
      selectInterestingCards,
      selectNonInterestingCards,
      selectFormat,
      selectArchetype,
      isCompetitive,
      selectedExtraDeckWideFilters,
    } = this.state;

    // Choose a hero.
    const newHeroNumber = selectHero === 99 ? getRandom(0, 8) : selectHero;
    const newHero = heroes[newHeroNumber];
    const newHeroPower = heroPowers[newHeroNumber];

    // Choose an interesting card.
    const interestingCards = !selectInterestingCards.includes('Random') && selectInterestingCards;

    // Choose other cards
    const otherCards = !selectNonInterestingCards.includes('None') && selectNonInterestingCards;

    // Find the available cards, initialize the deck.
    const availableCards = getAvailableCards(cards, newHero, selectFormat);

    // No web worker, check the comments below for the alternative.
    const initialDeck = initializeDeck({
      heroName: newHero,
      heroPower: newHeroPower,
      archetype: selectArchetype,
      isCompetitive,
    });
    const deck = getDeck({
      initialDeck,
      availableCards,
      archetypes,
      interestingCards,
      otherCards,
      extraDeckWideFilters: selectedExtraDeckWideFilters,
    });
    this.setState({
      firstSuggestionLoaded: true,
      deckCode: getDeckCode(deck, heroCodes[newHeroNumber], selectFormat),
      deckForUI: deck,
      manaCurveChartData: getManaCurveChartData(deck),
      hero: newHeroNumber,
      archetype: deck.archetype,
      chosenInterestingCards: deck.history.steps[0].originCards,
      chosenNonInterestingCards: otherCards || null,
    });

    // dropped the worker from workerize-loader because I can't mock it in tests.
    //   this.worker
    //     .initializeDeck({
    //       heroName: newHero,
    //       heroPower: newHeroPower,
    //       archetype: selectArchetype,
    //       isCompetitive,
    //     })
    //     .then(deck => this.worker
    //       .getDeck({
    //         deck,
    //         availableCards,
    //         archetypes,
    //         interestingCards,
    //         otherCards,
    //         extraDeckWideFilters: selectedExtraDeckWideFilters,
    //       })
    //       .then(deckUI => Promise.all([
    //         this.worker.getDeckCode(deckUI, heroCodes[newHeroNumber], selectFormat),
    //         this.worker.getManaCurveChartData(deckUI),
    //       ]).then(results => this.setState({
    //         firstSuggestionLoaded: true,
    //         deckCode: results[0],
    //         deckForUI: deckUI,
    //         manaCurveChartData: results[1],
    //         hero: newHeroNumber,
    //         archetype: deckUI.archetype,
    //         chosenInterestingCards: deckUI.history.steps[0].originCards, // Watch this..
    //         chosenNonInterestingCards: otherCards || null,
    //       }))));
  }

  handleQuery() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'User',
        action: 'Generated deck',
      });
    }
    this.suggest();
  }

  handleSelectHero(e) {
    const selectedHero = Number(e.target.value);
    const { cards, heroes } = this.props;
    const { selectFormat } = this.state;

    const heroForInterestingCards = selectedHero === 99 ? 'Random' : heroes[selectedHero];

    this.setState({
      selectHero: selectedHero,
      selectInterestingCards: ['Random'],
      selectNonInterestingCards: ['None'],
      interestingCards: sortBy(
        getAvailableCards(cards, heroForInterestingCards, selectFormat, true),
        ['set', 'name'],
      ),
      nonInterestingCards: sortBy(
        getAvailableCards(cards, heroForInterestingCards, selectFormat, false),
        ['set', 'name'],
      ),
    });
  }

  handleSelectFormat(e) {
    const { selectHero } = this.state;
    const { cards, heroes, extraDeckWideFilters } = this.props;
    const selectedFormat = e.target.value;

    const heroForInterestingCards = selectHero === 99 ? 'Random' : heroes[selectHero];

    this.setState({
      selectFormat: selectedFormat,
      selectInterestingCards: ['Random'],
      selectNonInterestingCards: ['None'],
      selectedExtraDeckWideFilters: [],
      interestingCards: sortBy(
        getAvailableCards(cards, heroForInterestingCards, selectedFormat, true),
        ['set', 'name'],
      ),
      nonInterestingCards: sortBy(
        getAvailableCards(cards, heroForInterestingCards, selectedFormat, false),
        ['set', 'name'],
      ),
      extraDeckWideFilters: getAvailableExtraDeckWideFilters(extraDeckWideFilters, selectedFormat),
    });
  }

  handleSelectArchetype(e) {
    const { archetypes } = this.props;
    const selectedArchetypeName = e.target.value;

    const selectedArchetype = archetypes.find(
      archetype => archetype.name === selectedArchetypeName,
    );

    this.setState({
      selectArchetype: selectedArchetype || 'Random',
    });
  }

  handleSelectInterestingCards(e) {
    const { interestingCards } = this.state;
    const currentInterestingCards = e.map(v => v.value);
    let selectInterestingCards;
    if (
      (currentInterestingCards.length === 1 && currentInterestingCards.includes('Random'))
      || currentInterestingCards.length === 0
    ) {
      selectInterestingCards = ['Random'];
    } else {
      selectInterestingCards = interestingCards
        .filter(c => currentInterestingCards.includes(c.dbfId))
        .slice(0, 15); // the user can select up to 15.
    }
    this.setState({
      selectInterestingCards,
    });
  }

  handleSelectNonInterestingCards(e) {
    const { nonInterestingCards } = this.state;
    const currentNonInterestingCards = e.map(v => v.value);
    let selectNonInterestingCards;
    if (
      (currentNonInterestingCards.length === 1 && currentNonInterestingCards.includes('None'))
      || currentNonInterestingCards.length === 0
    ) {
      selectNonInterestingCards = ['None'];
    } else {
      selectNonInterestingCards = nonInterestingCards
        .filter(c => currentNonInterestingCards.includes(c.dbfId))
        .slice(0, 10); // the user can select up to 10.
    }
    this.setState({
      selectNonInterestingCards,
    });
  }

  handleSelectVersion(e, index) {
    const newState = update(this.state, {
      selectInterestingCards: {
        [index]: {
          activeVersion: { $set: Number(e.target.value) },
        },
      },
    });
    this.setState(newState);
  }

  handleSelectExtraDeckWideFilters(e) {
    const { extraDeckWideFilters: edwfilters } = this.props;
    const ids = e.map(value => value.value);
    const newSelectedExtraDeckWideFilters = edwfilters.filter(filter => ids.includes(filter.dbfId));
    this.setState({
      selectedExtraDeckWideFilters: newSelectedExtraDeckWideFilters,
    });
  }

  handleCompetitiveCheckbox(e) {
    this.setState({
      isCompetitive: e.target.checked,
    });
  }

  render() {
    const {
      hero: heroNumber,
      firstSuggestionLoaded,
      historyModalOpen,
      diagramModalOpen,
      cardDetailsModalOpen,
      cardDetailsModalCard,
      isCompetitive,
      selectHero,
      selectFormat,
      selectArchetype,
      selectInterestingCards,
      selectNonInterestingCards,
      selectedExtraDeckWideFilters,
      interestingCards,
      nonInterestingCards,
      chosenInterestingCards,
      chosenNonInterestingCards,
      extraDeckWideFilters,
      deckCode,
      deckForUI,
      manaCurveChartData,
    } = this.state;
    const { heroes, archetypes } = this.props;
    return (
      <Parent
        bgColor={heroColors[heroNumber]}
        backgroundBlur={historyModalOpen || diagramModalOpen || cardDetailsModalOpen}
      >
        <SEO
          lang="en"
          title="Hearthstone Deck Ideas - Random deck generator"
          description="Hearthstone Deck Ideas is a random deck generator for Hearthstone that creates decks with synergy. Create a random deck in seconds or select some filters and get the deck you want."
          image="https://hsdeckideas.netlify.com/app-preview.jpg"
          url="https://hsdeckideas.netlify.com/"
          keywords="hearthstone random deck generator"
        />
        <Header
          title="Hearthstone Deck Ideas"
          paragraphs={[
            'A random deck generator for Hearthstone.',
            'Press the button at the bottom right to generate a random deck.',
            'You can also select filters to get the deck you want.',
          ]}
        >
          <Navbar />
        </Header>
        <Fab
          tab-index="1"
          aria-label="Generate Idea"
          onClick={this.handleQuery}
          bc="darkorange"
          pulse={!firstSuggestionLoaded}
        >
          <FontAwesomeIcon icon={faLightbulb} />
        </Fab>

        <Container fluid>
          <Row>
            <Column>
              <Filters
                heroes={heroes}
                archetypes={archetypes}
                interestingCards={interestingCards}
                nonInterestingCards={nonInterestingCards}
                extraDeckWideFilters={extraDeckWideFilters}
                format={selectFormat}
                selectHero={selectHero}
                archetype={selectArchetype.name ? selectArchetype.name : selectArchetype}
                selectInterestingCards={selectInterestingCards}
                selectNonInterestingCards={selectNonInterestingCards}
                selectExtraDeckWideFilters={selectedExtraDeckWideFilters}
                isCompetitive={isCompetitive}
                handleSelectFormat={this.handleSelectFormat}
                handleSelectHero={this.handleSelectHero}
                handleSelectArchetype={this.handleSelectArchetype}
                handleSelectInterestingCards={this.handleSelectInterestingCards}
                handleSelectNonInterestingCards={this.handleSelectNonInterestingCards}
                handleCompetitiveCheckbox={this.handleCompetitiveCheckbox}
                handleSelectExtraDeckWideFilters={this.handleSelectExtraDeckWideFilters}
                handleSelectVersion={this.handleSelectVersion}
                handleOpenCardDetailsModal={this.openCardDetailsModal}
              />
            </Column>
          </Row>
          {firstSuggestionLoaded && (
            <UICard id="deck-overview" title="Deck overview">
              <Row gutters>
                <LoadableDeckList
                  deck={deckForUI}
                  deckCode={deckCode}
                  heroNumber={heroNumber}
                  handleOpenHistoryModal={this.openHistoryModal}
                  handleOpenDiagramModal={this.openDiagramModal}
                  handleOpenCardDetailsModal={this.openCardDetailsModal}
                />
                <LoadableDeckInfo
                  deck={deckForUI}
                  heroes={heroes}
                  heroNumber={heroNumber}
                  chosenInterestingCards={chosenInterestingCards}
                  chosenNonInterestingCards={chosenNonInterestingCards}
                  cardColor={heroColors[heroNumber]}
                />
                <LoadableDeckStats
                  deck={deckForUI}
                  manaCurveChartData={manaCurveChartData}
                  chartColor={heroColors[heroNumber]}
                />
              </Row>
            </UICard>
          )}
        </Container>
        <Footer />
        <LoadableCardDetailsModal
          isOpen={cardDetailsModalOpen}
          card={cardDetailsModalCard}
          closeModal={this.closeCardDetailsModal}
        />
        <LoadableHistoryModal
          deck={deckForUI}
          isOpen={historyModalOpen}
          closeModal={this.closeHistoryModal}
        />
        <LoadableDiagramModal
          deck={deckForUI}
          isOpen={diagramModalOpen}
          closeModal={this.closeDiagramModal}
        />
      </Parent>
    );
  }
}

Home.propTypes = {
  heroes: PropTypes.arrayOf(PropTypes.string).isRequired,
  archetypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  heroPowers: PropTypes.arrayOf(PropTypes.object).isRequired,
  heroCodes: PropTypes.arrayOf(PropTypes.number).isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  extraDeckWideFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Home;
