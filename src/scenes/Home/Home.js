import React, { Component } from "react";
import anime from "animejs";
import Waypoint from "react-waypoint";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filters from "../Home/components/Filters/Filters";
import Overview from "../Home/components/Overview/Overview";
import History from "../Home/components/History/History";
import Info from "../Home/components/Info/Info";
import NewFeatures from "../Home/components/NewFeatures/NewFeatures";
import TreeDiagram from "../Home/components/TreeDiagram/TreeDiagram";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Fab from "../../components/Fab/Fab";
// import CRUDFilterModalContent from "./components/CRUDFilterModalContent/CRUDFilterModalContent";
// import Modal from 'react-modal';
import { getRandom } from "../../utils/random";
import { getAvailableCards } from "../../utils/cardUtils";
import deckUtils from 'workerize-loader!../../utils/deckUtils'; // eslint-disable-line import/no-webpack-loader-syntax
import LazyLoad from "react-lazyload"; 

var sortBy = require("lodash.sortby");
// const root = document.getElementById("root");
// Modal.setAppElement(root);

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
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);

    this.pastHeader = true;
    this.worker = deckUtils();

    this.state = {
      loading: true,
      UIVisible: false,
      pressedButton: false,
      // // External data.
      haveData: false,
      interestingCards: [],
      nonInterestingCards: [],
      // Suggestion state.
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
      selectNonInterestingCards: ["None"]
      // modalIsOpen: false
    };
  }

  componentDidMount() {
    if (this.state.haveData) 
      this.setState({ 
        loading: false 
      }, this.animateHeader);
  }

  static getDerivedStateFromProps(props, state) {
    // When the data are available the first time 
    // calculate the new state.
    if (!state.haveData && props.cards.length > 0)
      return {
        haveData: true,
        loading: false,
        interestingCards: sortBy(
          getAvailableCards(props.cards, "Random", "Standard", true),
          ["set", "name"]
        ),
        nonInterestingCards: sortBy(
          getAvailableCards(props.cards, "Random", "Standard", false),
          ["set", "name"]
        )
      };
    return null;
  }

  // mostly animations here.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.pressedButton && !this.pastHeader) 
      this.animateScrollTop();
    
    if (prevState.pressedButton && !prevState.UIVisible)
      this.animateUIHidden()
    else if(prevState.pressedButton) 
      this.animateUIVisible()
    
  }

  // openModal() {
  //   this.setState({modalIsOpen: true});
  // }

  // afterOpenModal() {
  // }

  // closeModal() {
  //   this.setState({modalIsOpen: false});
  // }

  render() {
    // console.log('Home render method called');
    return (
      <div id="parent" className={"hero" + this.state.hero}>
        {this.props.errorMessage ? (
          <ErrorAlert message={this.props.errorMessage} />
        ) : null}
        <ProgressBar visible={this.state.loading} />
        <Header />
        <Waypoint
          scrollableAncestor={window}
          onEnter={this.handleWaypointEnter}
          onLeave={this.handleWaypointLeave}
        >
          <span id="header-end" />
        </Waypoint>
        <Fab onClick={this.handleQuery} />

        {/* <button onClick={this.openModal}>Open Modal</button> */}
        <main id="main">
          <div className="container-fluid">
            <div className="row">
              <div
                className={
                  this.state.UIVisible ? "col-lg-6" : "col-lg-8 col-lg-offset-2"
                }
              >
                <Filters
                  hero={this.state.hero}
                  selectHero={this.state.selectHero}
                  format={this.state.selectFormat}
                  archetype={
                    this.state.selectArchetype.name
                      ? this.state.selectArchetype.name
                      : this.state.selectArchetype
                  }
                  heroes={this.props.heroes}
                  selectInterestingCards={this.state.selectInterestingCards}
                  selectNonInterestingCards={
                    this.state.selectNonInterestingCards
                  }
                  interestingCards={this.state.interestingCards}
                  nonInterestingCards={this.state.nonInterestingCards}
                  archetypes={this.props.archetypes}
                  listenerSF={this.handleSelectFormat}
                  listenerSH={this.handleSelectHero}
                  listenerSA={this.handleSelectArchetype}
                  listenerSO={this.handleSelectInterestingCards}
                  listenerSOT={this.handleSelectNonInterestingCards}
                />
                {this.state.UIVisible ?
                  <React.Fragment>
                    <Info
                      archetype={this.state.archetype}
                      hero={this.props.heroes[this.state.hero]}
                      originCards={this.state.chosenInterestingCards}
                      otherCards={this.state.chosenNonInterestingCards}
                    />
                    <Overview
                      heroNumber={this.state.hero}
                      deckCode={this.state.deckCode}
                      deckForUI={this.state.deckForUI}
                      chartData={this.state.manaCurve}
                      listenerMM={this.handleMouseMove}
                      listenerML={this.handleMouseLeave}
                    />
                    <LazyLoad height={35} offset={100} once>
                      <TreeDiagram
                        deck={this.state.deckForUI}
                      />
                    </LazyLoad>
                  </React.Fragment>
                  : null}
              </div>
              <div className="col-lg-6">
                {this.state.UIVisible ?
                  <History
                    deck={this.state.deckForUI}
                    listenerMM={this.handleMouseMove}
                    listenerML={this.handleMouseLeave}
                  />
                  : null}
              </div>
            </div>
          </div>
          <img
            id="cardHover"
            style={{ display: "none", width: "250px" }}
            alt="card full size"
          />
          <NewFeatures UIVisible={this.state.UIVisible} />
        </main>
        <Footer />
        {/* <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              padding               : '0'
            },
            overlay: {
              backgroundColor      : 'rgba(0, 0, 0, 0.7)',
              zIndex               : '1001'
            }
          }}
          appElement={root}
          contentLabel="Example Modal"
        >
          <CRUDFilterModalContent 
            listenerCM={this.closeModal}
          />
          
        </Modal> */}
      </div>
    );
  }

  suggest(callback) {
    // console.log("%cA suggestion starts...", "color: black; font-size: x-large");
    // const t1 = performance.now();

    // 0. App is loading...
    this.setState({ loading: true, pressedButton: true });

    // 1. Choose a hero.
    let newHeroNumber =
      this.state.selectHero === 99 ? getRandom(0, 8) : this.state.selectHero;

    const newHero = this.props.heroes[newHeroNumber];
    const newHeroPower = this.props.heroPowers[newHeroNumber];

    // 2. Choose an interesting card.
    let newInterestingCards 
      = this.state.selectInterestingCards.includes("Random")
        ? null
        : this.state.selectInterestingCards;

    let otherCards = this.state.selectNonInterestingCards.includes("None")
      ? null
      : this.state.selectNonInterestingCards;

    this.worker
      .getDeck(
        this.props.cards,
        newHero,
        newHeroPower,
        this.state.selectFormat,
        this.state.selectArchetype,
        this.props.archetypes,
        newInterestingCards,
        otherCards
      )
      .then(deckUI =>
        Promise.all([
          this.worker.getDeckCode(
            deckUI,
            this.props.heroCodes[newHeroNumber],
            this.state.selectFormat
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

    // const t2 = performance.now();
    // console.log("Time elapsed: ", t2 - t1);
    // console.log("%cA suggestion ends.", "color: black; font-size: x-large");
  }

  // Listeners.

  handleQuery(e) {
    e.preventDefault();
    this.suggest();
  }

  handleSelectHero(e) {
    const selectedHero = Number(e.target.value);

    const heroForInterestingCards =
      selectedHero === 99 ? "Random" : this.props.heroes[selectedHero];

    this.setState({
      selectHero: selectedHero,
      selectInterestingCards: ["Random"],
      selectNonInterestingCards: ["None"],
      interestingCards: sortBy(
        getAvailableCards(
          this.props.cards,
          heroForInterestingCards,
          this.state.selectFormat,
          true
        ),
        ["set", "name"]
      ),
      nonInterestingCards: sortBy(
        getAvailableCards(
          this.props.cards,
          heroForInterestingCards,
          this.state.selectFormat,
          false
        ),
        ["set", "name"]
      )
    });
  }

  handleSelectFormat(e) {
    const selectedFormat = e.target.value;

    const heroForInterestingCards =
      this.state.selectHero === 99
        ? "Random"
        : this.props.heroes[this.state.selectHero];

    this.setState({
      selectFormat: selectedFormat,
      selectInterestingCards: ["Random"],
      selectNonInterestingCards: ["None"],
      interestingCards: sortBy(
        getAvailableCards(
          this.props.cards,
          heroForInterestingCards,
          selectedFormat,
          true
        ),
        ["set", "name"]
      ),
      nonInterestingCards: sortBy(
        getAvailableCards(
          this.props.cards,
          heroForInterestingCards,
          selectedFormat,
          false
        ),
        ["set", "name"]
      )
    });
  }

  handleSelectArchetype(e) {
    const selectedArchetypeName = e.target.value;

    const selectedArchetype = this.props.archetypes.find(
      a => a.name === selectedArchetypeName
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

  // The image source changes many times. Consider
  // finding a better solution.
  handleMouseMove(e) {
    let cardHover = document.getElementById("cardHover");
    cardHover.style.display = "inline";
    cardHover.style.position = "fixed";
    cardHover.style.zIndex = 1000;
    cardHover.style.top = `${e.clientY - 150}px`;
    cardHover.style.left = `${e.clientX + 50}px`;

    let cardImageUrl = e.target.parentNode.dataset.imageUrl;
    if (cardImageUrl) {
      cardHover.src = window.location.href + "resources/images/" + cardImageUrl;
    }
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
    anime(
      this.fadeIn(
        ["#deck-filters", "#deck-info", "#deck-overview", "#deck-history"],
        200
      )
    );
  }

  animateUIVisible() {
    anime(this.fadeIn("#deckList li", 40));
    anime(this.fadeIn(".decklist-snapshot li", 30));
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
      duration: 300,
      delay: (target, index) => index * itemDelay,
      easing: "linear",
      elasticity: 0
    };
  }

  // animateList(targets, itemDelay) {
  //   return {
  //     targets: targets,
  //     translateX: ['-5%', 0],
  //     duration: 500,
  //     delay: (target, index) => index * itemDelay
  //   }
  // }

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
