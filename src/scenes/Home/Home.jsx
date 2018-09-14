import React, { Component } from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import styled from "styled-components";
import Waypoint from "react-waypoint";
import { Helmet } from "react-helmet";
import update from "immutability-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filters from "./components/Filters/Filters";
import Overview from "./components/Overview/Overview";
import History from "./components/History/History";
import TreeDiagram from "./components/TreeDiagram/TreeDiagram";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Fab from "../../components/Fab/Fab";
import Modal from "react-modal";
import { getRandom } from "some-utils";
import { getAvailableCards } from "../../utils/card";
import deckUtils from "workerize-loader!../../utils/deck"; // eslint-disable-line import/no-webpack-loader-syntax
import Navbar from "../../components/Navbar/Navbar";
import { initializeDeck } from "../../utils/deck";
import HoverImage from "./components/HoverImage/HoverImage";

var sortBy = require("lodash.sortby");
const root = document.getElementById("root");
Modal.setAppElement(root);

const heroColors = [
  "rgb(116, 80, 8)",
  "darkolivegreen",
  "#8f95b5",
  "#b3843b",
  "#b5bbbd",
  "#595255",
  "#343663",
  "#6d4075",
  "#652523"
];

const Parent = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  transition: background-color 0.5s ease-in-out;
`;

Parent.propTypes = {
  bgColor: PropTypes.string
};

Parent.defaultProps = {
  bgColor: "7a7a7a"
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleQuery = this.handleQuery.bind(this);
    this.handleSelectHero = this.handleSelectHero.bind(this);
    this.handleSelectFormat = this.handleSelectFormat.bind(this);
    this.handleSelectArchetype = this.handleSelectArchetype.bind(this);
    this.handleSelectInterestingCards = this.handleSelectInterestingCards.bind(
      this
    );
    this.handleSelectNonInterestingCards = this.handleSelectNonInterestingCards.bind(
      this
    );
    this.handleSelectVersion = this.handleSelectVersion.bind(this);
    this.handleSelectExtraDeckWideFilters = this.handleSelectExtraDeckWideFilters.bind(
      this
    );
    this.handleCompetitiveCheckbox = this.handleCompetitiveCheckbox.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.pastHeader = true;
    this.worker = deckUtils();

    this.state = {
      loading: true,
      UIVisible: false,
      pressedButton: false,
      ideaButtonClickedOnce: false,
      // // External data.
      haveData: false,
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
      manaCurve: null,
      // UI Selects.
      selectHero: 99,
      selectFormat: "Standard",
      selectArchetype: "Random",
      selectInterestingCards: ["Random"],
      selectNonInterestingCards: ["None"],
      selectedExtraDeckWideFilters: [],
      modalIsOpen: false
    };
  }

  componentDidMount() {
    if (this.state.haveData)
      this.setState({ loading: false }, this.animateHeader);
  }

  static getDerivedStateFromProps(props, state) {
    // When the data are available the first time
    // calculate the new state.
    if (!state.haveData && props.cards.length > 0) {
      const format = "Standard";
      const heroName = "Random";
      return {
        haveData: true,
        loading: false,
        interestingCards: sortBy(
          getAvailableCards(props.cards, heroName, format, true),
          ["set", "name"]
        ),
        nonInterestingCards: sortBy(
          getAvailableCards(props.cards, heroName, format, false),
          ["set", "name"]
        ),
        extraDeckWideFilters: getAvailableExtraDeckWideFilters(
          props.extraDeckWideFilters,
          format
        )
      };
    }
    return null;
  }

  // mostly animations here.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.pressedButton && !this.pastHeader) this.animateScrollTop();

    if (prevState.pressedButton && !prevState.UIVisible) this.animateUIHidden();
    else if (prevState.pressedButton) this.animateUIVisible();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const {
      hero: heroNumber,
      loading,
      UIVisible,
      modalIsOpen,
      ideaButtonClickedOnce,
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
      manaCurve
    } = this.state;
    const { errorMessage, heroes, archetypes } = this.props;
    return (
      <Parent bgColor={heroNumber !== 99 ? heroColors[heroNumber] : null}>
        <Helmet>
          <title>Hearthstone Deck Ideas - Home</title>
          <meta
            name="description"
            content="Hearthstone Deck Ideas is a random deck generator for the game of Hearthstone. You can let the algorithm give you a deck idea or select some filters and get the result you want."
          />
        </Helmet>
        {errorMessage && <ErrorAlert message={errorMessage} />}
        <ProgressBar visible={loading} />
        <Header
          title={"Hearthstone Deck Ideas"}
          paragraphs={[
            "This is a random deck generator for Hearthstone.",
            "Press the button at the bottom right to generate a random deck.",
            "You can also select filters to get the deck you want."
          ]}
        >
          <Navbar UIVisible={UIVisible} />
        </Header>
        <Waypoint
          scrollableAncestor={window}
          onEnter={this.handleWaypointEnter}
          onLeave={this.handleWaypointLeave}
        >
          <span id="header-end" />
        </Waypoint>
        <Fab
          aria-label={"Generate Idea"}
          onClick={this.handleQuery}
          pulse={!ideaButtonClickedOnce}
        >
          <FontAwesomeIcon icon={faLightbulb} />
        </Fab>

        <main id="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 px-sm-3 px-1">
                <Filters
                  isCompetitive={isCompetitive}
                  selectHero={selectHero}
                  format={selectFormat}
                  archetype={
                    selectArchetype.name
                      ? selectArchetype.name
                      : selectArchetype
                  }
                  heroes={heroes}
                  selectInterestingCards={selectInterestingCards}
                  selectNonInterestingCards={selectNonInterestingCards}
                  selectExtraDeckWideFilters={selectedExtraDeckWideFilters}
                  interestingCards={interestingCards}
                  nonInterestingCards={nonInterestingCards}
                  extraDeckWideFilters={extraDeckWideFilters}
                  archetypes={archetypes}
                  listenerSF={this.handleSelectFormat}
                  listenerSH={this.handleSelectHero}
                  listenerSA={this.handleSelectArchetype}
                  listenerSO={this.handleSelectInterestingCards}
                  listenerSOT={this.handleSelectNonInterestingCards}
                  handleCompetitiveCheckbox={this.handleCompetitiveCheckbox}
                  handleSelectVersion={this.handleSelectVersion}
                  handleSelectExtraDeckWideFilters={
                    this.handleSelectExtraDeckWideFilters
                  }
                />
                {UIVisible && (
                  <React.Fragment>
                    <Overview
                      heroes={heroes}
                      heroNumber={heroNumber}
                      deckCode={deckCode}
                      deck={deckForUI}
                      chartData={manaCurve}
                      listenerMM={this.handleMouseMove}
                      listenerML={this.handleMouseLeave}
                      handleOpenModal={this.openModal}
                      interestingCards={chosenInterestingCards}
                      nonInterestingCards={chosenNonInterestingCards}
                    />
                    <TreeDiagram
                      deck={deckForUI}
                      handleOpenModal={this.openModal}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <HoverImage />
        </main>
        <Footer />
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="history-modal"
          style={{
            content: {
              top: "auto",
              left: "5%",
              right: "auto",
              bottom: "auto",
              width: "90%",
              margin: "auto",
              padding: "0"
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: "1001"
            }
          }}
          appElement={root}
          contentLabel="History modal"
        >
          <History
            deck={deckForUI}
            listenerMM={this.handleMouseMove}
            listenerML={this.handleMouseLeave}
            closeModal={this.closeModal}
          />
        </Modal>
      </Parent>
    );
  }

  suggest() {
    const { heroes, heroPowers, heroCodes, cards, archetypes } = this.props;
    const {
      selectHero,
      selectInterestingCards,
      selectNonInterestingCards,
      selectFormat,
      selectArchetype,
      isCompetitive,
      selectedExtraDeckWideFilters
    } = this.state;

    // App is loading...
    this.setState({
      loading: true,
      pressedButton: true,
      ideaButtonClickedOnce: true
    });

    // Choose a hero.
    let newHeroNumber = selectHero === 99 ? getRandom(0, 8) : selectHero;
    const newHero = heroes[newHeroNumber];
    const newHeroPower = heroPowers[newHeroNumber];

    // Choose an interesting card.
    let newInterestingCards = selectInterestingCards.includes("Random")
      ? null
      : selectInterestingCards;

    // Choose other cards
    let otherCards = selectNonInterestingCards.includes("None")
      ? null
      : selectNonInterestingCards;

    // Find the available cards, initialize the deck.
    let availableCards = getAvailableCards(cards, newHero, selectFormat);
    let deck = initializeDeck({
      heroName: newHero,
      heroPower: newHeroPower,
      archetype: selectArchetype,
      isCompetitive: isCompetitive
    });

    this.worker
      .getDeck(
        deck,
        availableCards,
        archetypes,
        newInterestingCards,
        otherCards,
        selectedExtraDeckWideFilters
      )
      .then(deckUI =>
        Promise.all([
          this.worker.getDeckCode(
            deckUI,
            heroCodes[newHeroNumber],
            selectFormat
          ),
          this.worker.getManaCurve(deckUI)
        ]).then(results =>
          this.setState({
            loading: false,
            pressedButton: false,
            UIVisible: true,
            deckCode: results[0],
            deckForUI: deckUI,
            manaCurve: results[1],
            hero: newHeroNumber,
            archetype: deckUI.archetype,
            chosenInterestingCards: deckUI.history.steps[0].originCards, // Watch this..
            chosenNonInterestingCards: otherCards
          })
        )
      );
  }

  handleQuery(e) {
    e.preventDefault();
    this.suggest();
  }

  handleSelectHero(e) {
    const selectedHero = Number(e.target.value);
    const { cards, heroes } = this.props;
    const { selectFormat } = this.state;

    const heroForInterestingCards =
      selectedHero === 99 ? "Random" : heroes[selectedHero];

    this.setState({
      selectHero: selectedHero,
      selectInterestingCards: ["Random"],
      selectNonInterestingCards: ["None"],
      interestingCards: sortBy(
        getAvailableCards(cards, heroForInterestingCards, selectFormat, true),
        ["set", "name"]
      ),
      nonInterestingCards: sortBy(
        getAvailableCards(cards, heroForInterestingCards, selectFormat, false),
        ["set", "name"]
      )
    });
  }

  handleSelectFormat(e) {
    const { selectHero } = this.state;
    const { cards, heroes, extraDeckWideFilters } = this.props;
    const selectedFormat = e.target.value;

    const heroForInterestingCards =
      selectHero === 99 ? "Random" : heroes[selectHero];

    this.setState({
      selectFormat: selectedFormat,
      selectInterestingCards: ["Random"],
      selectNonInterestingCards: ["None"],
      selectedExtraDeckWideFilters: [],
      interestingCards: sortBy(
        getAvailableCards(cards, heroForInterestingCards, selectedFormat, true),
        ["set", "name"]
      ),
      nonInterestingCards: sortBy(
        getAvailableCards(
          cards,
          heroForInterestingCards,
          selectedFormat,
          false
        ),
        ["set", "name"]
      ),
      extraDeckWideFilters: getAvailableExtraDeckWideFilters(
        extraDeckWideFilters,
        selectedFormat
      )
    });
  }

  handleSelectArchetype(e) {
    const selectedArchetypeName = e.target.value;

    const selectedArchetype = this.props.archetypes.find(
      archetype => archetype.name === selectedArchetypeName
    );

    this.setState({
      selectArchetype: selectedArchetype ? selectedArchetype : "Random"
    });
  }

  handleSelectInterestingCards(e) {
    const interestingCards = e.map(v => v.value);
    let selectInterestingCards;
    if (
      (interestingCards.length === 1 && interestingCards.includes("Random")) ||
      interestingCards.length === 0
    ) {
      selectInterestingCards = ["Random"];
    } else {
      selectInterestingCards = this.state.interestingCards
        .filter(c => interestingCards.includes(c.dbfId))
        .slice(0, 15); // the user can select up to 15.
    }
    this.setState({
      selectInterestingCards: selectInterestingCards
    });
  }

  handleSelectNonInterestingCards(e) {
    const nonInterestingCards = e.map(v => v.value);
    let selectNonInterestingCards;
    if (
      (nonInterestingCards.length === 1 &&
        nonInterestingCards.includes("None")) ||
      nonInterestingCards.length === 0
    ) {
      selectNonInterestingCards = ["None"];
    } else {
      selectNonInterestingCards = this.state.nonInterestingCards
        .filter(c => nonInterestingCards.includes(c.dbfId))
        .slice(0, 10); // the user can select up to 10.
    }
    this.setState({
      selectNonInterestingCards: selectNonInterestingCards
    });
  }

  handleSelectVersion(e, index) {
    const newState = update(this.state, {
      selectInterestingCards: {
        [index]: {
          activeVersion: { $set: Number(e.target.value) }
        }
      }
    });
    this.setState(newState);
  }

  handleSelectExtraDeckWideFilters(e) {
    const ids = e.map(value => value.value);
    const newSelectedExtraDeckWideFilters = this.props.extraDeckWideFilters.filter(
      filter => ids.includes(filter.dbfId)
    );
    this.setState({
      selectedExtraDeckWideFilters: newSelectedExtraDeckWideFilters
    });
  }

  handleCompetitiveCheckbox(e) {
    this.setState({
      isCompetitive: e.target.checked
    });
  }

  handleMouseMove(e) {
    const cardImageUrl = e.target.dataset.imageUrl;
    const cardHover = document.getElementById("cardHover");

    cardHover.style.display = "inline";
    cardHover.style.position = "fixed";
    cardHover.style.zIndex = 1050;
    cardHover.style.top = `${e.clientY - 150}px`;
    cardHover.style.left = `${e.clientX + 50}px`;

    if (cardImageUrl) cardHover.src = "/resources/images/" + cardImageUrl;
  }

  handleMouseLeave(e) {
    let cardHover = document.getElementById("cardHover");
    cardHover.style.display = "none";
  }

  handleWaypointEnter() {
    this.pastHeader = false;
  }

  handleWaypointLeave() {
    this.pastHeader = true;
  }

  // Animations with animejs.

  animateUIHidden() {
    anime(this.fadeIn(["#deck-filters", "#deck-overview"], 200));
  }

  animateUIVisible() {
    anime(this.fadeIn("#decklist li", 40));
  }

  animateHeader() {
    anime({
      targets: ".header-content",
      translateX: ["-100%", 0],
      duration: 2000
    });
  }

  fadeIn(targets, itemDelay) {
    return {
      targets: targets,
      opacity: [0, 1],
      duration: 200,
      delay: (target, index) => index * itemDelay,
      easing: "linear",
      elasticity: 0
    };
  }

  animateScrollTop() {
    anime({
      targets: "html, body",
      scrollTop: [
        window.pageYOffset,
        document.querySelector("#header-end").offsetTop + 1
      ],
      duration: 1300
    });
  }
}

export default Home;

const getAvailableExtraDeckWideFilters = (filters, format) =>
  format === "Wild" ? filters : filters.filter(filter => filter.set > 8);
