import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import anime from "animejs";
import Waypoint from "react-waypoint";
import "../css/hsideas.css";
import Header from "./Header";
import Footer from "./Footer";
import Query from "./Query";
import Idea from "./Idea";
import Overview from "./Overview";
import Explanation from "./Explanation";
import WaitWhat from "./WaitWhat";
import DeckAnalysis from "./DeckAnalysis";
import ErrorAlert from "./ErrorAlert";
import { getRandom } from "../util/random";
import { byName } from "../util/sort";
import {getManaCurve, getDeckCode, getDeck} from "../util/deckUtils";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleQuery = this.handleQuery.bind(this);
    this.handleSelectHero = this.handleSelectHero.bind(this);
    this.handleSelectFormat = this.handleSelectFormat.bind(this);
    this.handleSelectArchetype = this.handleSelectArchetype.bind(this);
    this.handleSelectTheme = this.handleSelectTheme.bind(this);
    this.handleSelectFlavor = this.handleSelectFlavor.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);

    this.state = {
      serverUrl: `${window.location.protocol === "https:" ? "https" : "http"}://hsdeckideas.herokuapp.com`,
      // serverUrl: `${window.location.protocol === "https:" ? "https" : "http"}://localhost:3000`,
      dataVersion: 5, // REMEMBER TO CHANGE THIS WHENEVER WE CHANGE THE DATA. :)
      UIVisible: true,
      progressBarVisible: true,
      pastHeader: false,
      hero: null,
      selectHero: 99,
      selectedFormat: "Standard",
      idea: null,
      deckForUI: {},
      deckCode: null,
      archetype: null,
      selectArchetype: "Random",
      theme: null,
      selectTheme: "Random",
      flavor: null,
      selectFlavor: "Random",
      manaCurve: null,
      // External data.
      cards: [],
      heroes: [],
      heroCodes: [274, 31, 637, 671, 813, 930, 1066, 893, 7],
      archetypes: [],
      flavors: [],
      flavorsWild: [],
      flavorsStandard: [],
      availableFlavors: [],
      themes: [],
      themesWild: [],
      themesStandard: [],
      availableThemes: []
    };
  }

  componentDidMount() {
    anime({
      targets: ".header-content",
      translateX: ["-100%", 0],
      duration: 2000
    });
    const cachedData = localStorage.getItem("data");
    const cachedVersion = parseInt(localStorage.getItem("version"), 10);
    if (cachedData && cachedVersion === this.state.dataVersion) {
      this.setData(JSON.parse(cachedData));
    } else {
      this.fetchData();
    }
  }

  render() {
    return (
      <div id="parent" className={"hero" + this.state.hero}>
        {this.state.errorMessage ? (
          <ErrorAlert message={this.state.errorMessage} />
        ) : null}
        <div
          className={
            this.state.progressBarVisible
              ? "ipl-progress-indicator"
              : "ipl-progress-indicator available"
          }
          id="ipl-progress-indicator"
        >
          <div className="ipl-progress-indicator-head">
            <div className="first-indicator" />
            <div className="second-indicator" />
          </div>
        </div>
        <Header />
        <span id="header-end">
          <Waypoint
            scrollableAncestor={window}
            onEnter={this.handleWaypointEnter}
            onLeave={this.handleWaypointLeave}
          />
        </span>
        <button
          type="button"
          className="fabidea"
          aria-label="Generate Idea"
          onClick={this.handleQuery}
        >
          <i className="far fa-lightbulb" />
        </button>

        <main id="main">
          <section id="generateDeckIdea">
            <Grid fluid={true}>
              <Row>
                <div
                  className={
                    this.state.UIVisible
                      ? "sel-rel-area-parent col-sm-6"
                      : "sel-rel-area-parent col-md-8 col-md-offset-2"
                  }
                >
                  <div className="col-md-12">
                    <Query
                      hero={this.state.hero}
                      selectHero={this.state.selectHero}
                      format={this.state.selectedFormat}
                      archetype={
                        this.state.selectArchetype.name
                          ? this.state.selectArchetype.name
                          : this.state.selectArchetype
                      }
                      theme={
                        this.state.selectTheme.id
                          ? this.state.selectTheme.id
                          : this.state.selectTheme
                      }
                      flavor={
                        this.state.selectFlavor.id
                          ? this.state.selectFlavor.id
                          : this.state.selectFlavor
                      }
                      heroes={this.state.heroes}
                      archetypes={this.state.archetypes}
                      themes={this.state.availableThemes}
                      flavors={this.state.availableFlavors}
                      listenerSF={this.handleSelectFormat}
                      listenerSH={this.handleSelectHero}
                      listenerSA={this.handleSelectArchetype}
                      listenerST={this.handleSelectTheme}
                      listenerSFL={this.handleSelectFlavor}
                    />
                    <Idea idea={this.state.idea} />
                    {this.state.manaCurve ? (
                      <Overview
                        deckCode={this.state.deckCode}
                        deckForUI={this.state.deckForUI}
                        chartData={this.state.manaCurve}
                      />
                    ) : null}
                    <WaitWhat 
                      deck={this.state.deckForUI}
                      archetype={this.state.archetype}
                      theme={this.state.theme}
                      flavor={this.state.flavor}
                    />
                  </div>
                </div>
                <Explanation
                  UIVisible={this.state.UIVisible}
                  archetype={this.state.archetype}
                  theme={this.state.theme}
                  flavor={this.state.flavor}
                />
                <DeckAnalysis
                  archetype={this.state.archetype}
                  deck={this.state.deckForUI}
                />
              </Row>
            </Grid>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  fetchData() {
    fetch(this.state.serverUrl + "/resources/data/data.json")
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("version", this.state.dataVersion);
        this.setData(data);
      })
      .catch(error =>
        this.setState({
          errorMessage: error.message
        })
      );
  }

  setData(data) {
    const standardFlvrs = this.getStandardThemesOrFlavors(data[2].content);
    const standardThemes = this.getStandardThemesOrFlavors(data[3].content);
    this.setState(
      {
        heroes: data[4].content,
        cards: data[0].content.sort((a, b) => b.rating - a.rating),
        archetypes: data[1].content.sort(byName),
        flavors: standardFlvrs,
        flavorsWild: data[2].content,
        flavorsStandard: standardFlvrs,
        availableFlavors: standardFlvrs[9].sort(byName),
        themes: standardThemes,
        themesWild: data[3].content,
        themesStandard: standardThemes,
        availableThemes: standardThemes[9].sort(byName)
      },
      () => {
        this.suggest(() => {
          if (!this.state.UIVisible) {
            this.animateUIHidden();
            this.setState({
              UIVisible: true
            });
          } else {
            this.animateUIVisible();
          }
        });
        const ele = document.getElementById("ipl-progress-indicator");
        if (ele) {
          this.setState({
            progressBarVisible: false
          });
        }
      }
    );
  }

  suggest(callback) {
    // console.log("%cA suggestion starts...", "color: black; font-size: x-large");
    // const t1 = performance.now();

    // 1. Choose deck archetype.
    const newArchetype =
      this.state.selectArchetype === "Random"
        ? this.state.archetypes[getRandom(0, this.state.archetypes.length - 1)]
        : this.state.selectArchetype;

    // 2. Choose a hero.
    let newHeroNumber = 
      this.state.selectHero === 99
        ? getRandom(0, 8)
        : this.state.selectHero;

    const newHero = this.state.heroes[newHeroNumber];
    let decklistCards = this.getCardsByNames(
      newArchetype.sampleCards[newHeroNumber]
        .concat(newArchetype.decklistExtra[newHeroNumber]), 
      "Archetype");

    // 3. If the theme is random we roll to determine generic theme (1) or class specific theme (0).
    //    In the other hand we use the selected theme.
    let randomDeckTheme;
    let arraySize;
    if (this.state.selectTheme === "Random") {
      if (getRandom(0, 1)) {
        arraySize = this.state.themes[9].length;
        randomDeckTheme = this.state.themes[9][getRandom(0, arraySize - 1)];
      } else {
        arraySize = this.state.themes[newHeroNumber].length;
        randomDeckTheme = this.state.themes[newHeroNumber][
          getRandom(0, arraySize - 1)
        ];
      }
    } else if (this.state.selectTheme === "NoTheme") {
      randomDeckTheme = {};
      randomDeckTheme.sampleCards = [];
      randomDeckTheme.decklistExtra = [];
    } else {
      randomDeckTheme = this.state.selectTheme;
    }
    decklistCards = decklistCards.concat(
      this.getCardsByNames(randomDeckTheme.sampleCards.concat(randomDeckTheme.decklistExtra), "Theme")
    );

    // 4. A roll to determine if we will have an extra "flavor"(1,2 66% chance)
    // and a roll for generic flavor (1, 50%) or class specific flavor(0, 50%).
    // 5. Compile the suggestion, clear the existing one and present it to the user.
    let flavor;
    let suggestion;
    if (this.state.selectFlavor === "NoFlavor") {
      flavor = {};
      flavor.sampleCards = [];
      flavor.decklistExtra = [];
    } else if (this.state.selectFlavor !== "Random") {
      flavor = this.state.selectFlavor;
      decklistCards = decklistCards.concat(
        this.getCardsByNames(flavor.sampleCards.concat(flavor.decklistExtra), "Flavor")
      );
    } else {
      if (getRandom(0, 2)) {
        if (getRandom(0, 1)) {
          arraySize = this.state.flavors[9].length;
          flavor = this.state.flavors[9][getRandom(0, arraySize - 1)];
        } else {
          arraySize = this.state.flavors[newHeroNumber].length;
          flavor = this.state.flavors[newHeroNumber][getRandom(0, arraySize - 1)];
        }
        decklistCards = decklistCards.concat(
          this.getCardsByNames(flavor.sampleCards.concat(flavor.decklistExtra), "Flavor")
        );
      } else {
        flavor = null;
      }
    }
    suggestion = `[${newArchetype.name}]
                  ${randomDeckTheme.name ? " - " + randomDeckTheme.name: ""}
                  ${flavor && flavor.name ? 
                    randomDeckTheme.name ? " with " + flavor.name : " - " + flavor.name
                    : ""} - ${newHero}`;
    decklistCards = this.verifyUnique(decklistCards);
    // console.log("--- Decklistcards before the algorithms: ", decklistCards);

    newArchetype.cards = this.getCardsByNames(
      newArchetype.sampleCards[newHeroNumber]
    );
    if (randomDeckTheme.sampleCards.length > 0) {
      randomDeckTheme.cards = this.getCardsByNames(randomDeckTheme.sampleCards);
    }
    if (flavor && flavor.sampleCards.length > 0) {
      flavor.cards = this.getCardsByNames(flavor.sampleCards);
    }

    const deckUI = getDeck(
      this.state.cards,
      decklistCards,
      this.state.selectedFormat,
      newHero,
      newArchetype
    );

    this.setState(
      {
        deckCode: getDeckCode(
          deckUI,
          this.state.heroCodes[newHeroNumber],
          this.state.selectedFormat
        ),
        deckForUI: deckUI,
        manaCurve: getManaCurve(deckUI),
        idea: suggestion,
        hero: newHeroNumber,
        archetype: newArchetype,
        theme: randomDeckTheme,
        flavor: flavor
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
    // const t2 = performance.now();
    // console.log("Time elapsed: ", t2 - t1);
    // console.log("%cA suggestion ends.", "color: black; font-size: x-large");
  }

  handleQuery(e) {
    if (!this.state.pastHeader) {
      // Animate scroll top.
      anime({
        targets: "html, body",
        scrollTop: [
          window.pageYOffset,
          document.querySelector("#header-end > span").offsetTop
        ],
        duration: 1300
      });
    }
    this.suggest(() => {
      if (!this.state.UIVisible) {
        this.animateUIHidden();
        this.setState({
          UIVisible: true
        });
      } else {
        this.animateUIVisible();
      }
    });
  }

  handleSelectHero(e) {
    const selectedHero = Number(
      document.querySelector("select[name=heroSelect] option:checked").value
    );

    let availableThemes, availableFlavors;
    if (selectedHero !== 99) {
      availableThemes = this.state.themes[9]
        .concat(this.state.themes[selectedHero])
        .sort(byName);
      availableFlavors = this.state.flavors[9]
        .concat(this.state.flavors[selectedHero])
        .sort(byName);
      this.setState({
        selectHero: selectedHero,
        selectTheme: "Random",
        selectFlavor: "Random",
        availableThemes: availableThemes,
        availableFlavors: availableFlavors
      });
    } else {
      availableThemes = this.state.themes[9].sort(byName);
      availableFlavors = this.state.flavors[9].sort(byName);
      this.setState({
        selectHero: 99,
        selectTheme: "Random",
        selectFlavor: "Random",
        availableThemes: availableThemes,
        availableFlavors: availableFlavors
      });
    }
  }

  handleSelectFormat(e) {
    const selectedFormat = document.querySelector(
      "select[name=formatSelect] option:checked"
    ).value;

    let themeDb, flavorDb, availableThemes, availableFlavors;
    if (selectedFormat === "Standard") {
      themeDb = this.state.themesStandard;
      flavorDb = this.state.flavorsStandard;
    } else {
      themeDb = this.state.themesWild;
      flavorDb = this.state.flavorsWild;
    }

    if (this.state.selectHero === 99) {
      availableThemes = themeDb[9].sort(byName);
      availableFlavors = flavorDb[9].sort(byName);
    } else {
      availableThemes = themeDb[9]
        .concat(themeDb[this.state.selectHero])
        .sort(byName);
      availableFlavors = flavorDb[9]
        .concat(flavorDb[this.state.selectHero])
        .sort(byName);
    }

    this.setState({
      selectedFormat: selectedFormat,
      availableThemes: availableThemes,
      availableFlavors: availableFlavors,
      flavors: flavorDb,
      themes: themeDb,
      selectTheme: "Random",
      selectFlavor: "Random"
    });
  }

  handleSelectArchetype() {
    const selectedArchetypeName = document.querySelector(
      "select[name=archetype-select] option:checked"
    ).value;

    const selectedArchetype = this.state.archetypes.find(
      a => a.name === selectedArchetypeName
    );
    this.setState({
      selectArchetype: selectedArchetype ? selectedArchetype : "Random"
    });
  }

  handleSelectTheme() {
    const themeId = document.querySelector(
      "select[name=theme-select] option:checked"
    ).value;

    const theme = this.state.availableThemes.find(t => t.id == themeId);
    this.setState({
      selectTheme: theme ? theme : themeId
    });
  }

  handleSelectFlavor() {
    const flavorId = document.querySelector(
      "select[name=flavor-select] option:checked"
    ).value;

    const flavor = this.state.availableFlavors.find(f => f.id == flavorId);
    this.setState({
        selectFlavor: flavor ? flavor : flavorId
    });
  }

  handleWaypointEnter() {
    this.setState({
      pastHeader: false
    });
  }

  handleWaypointLeave() {
    this.setState({
      pastHeader: true
    });
  }

  animateUIVisible() {
    anime({
      targets: "#result",
      rotateX: [90, 0],
      opacity: [0, 1],
      duration: 2000,
      delay: 0
    });
    anime({
      targets: "#deckList li",
      rotateX: [90, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: function(target, index) {
        return index * 30;
      },
      elasticity: 0
    });
  }

  animateUIHidden() {
    anime
      .timeline({
        targets: "#explanationArea",
        translateX: ["20%", 0],
        duration: 2000
      })
      .add({
        targets: ["#resultArea", "#deckSampleArea", "#selectionArea"],
        translateX: ["-20%", 0],
        duration: 2000
      });
  }

  getCardsByNames(cardNames, isFrom) {
    if (isFrom) {
      return this.state.cards
        .filter(card => cardNames.indexOf(card.name) !== -1)
        .map(card => {
          card.isFrom = isFrom
          card.quantity = card.rarity === "LEGENDARY" ? 1 : 2;
          return card;
        }); 
    } else {
      return this.state.cards.filter(card => cardNames.indexOf(card.name) !== -1);
    }
  }

  verifyUnique(cards) {
    let cardNames = [];
    return cards.filter(card => {
      if (!cardNames[card.name]) {
        cardNames[card.name] = card.name
        return card;
      } else {
        return null;
      }
    });
  }

  /**
   * This function filters the standard themes and flavors.
   * @param {*} arrayOfArrays
   */
  getStandardThemesOrFlavors(arrayOfArrays) {
    let filteredArray = [];
    arrayOfArrays.forEach(function(array) {
      let filteredItems = array.filter(function(item) {
        return item.expansion >= 5 && item.expansion <= 10;
      });
      filteredArray.push(filteredItems);
    });
    return filteredArray;
  }
}

export default App;
