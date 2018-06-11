import React, { Component } from "react";
import anime from "animejs";
import LazyLoad from "react-lazyload";
import ProgressiveImage from "react-progressive-image";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.expansions = [
      "Nax/HOF",
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
      "Basic/Classic"
    ];
  }

  render() {
    const selectInterestingCards = 
      this.props.selectInterestingCards.includes("Random") || 
      this.props.selectInterestingCards.length === 0
        ? {value: "Random", label: "Random"}
        : this.props.selectInterestingCards.map(c => {
          return {value: c.dbfId, label: c.name}
        });
        
    const selectNonInterestingCards =
      this.props.selectNonInterestingCards.includes("None") || 
      this.props.selectNonInterestingCards.length === 0
        ? {value: "None", label: "None"}
        : this.props.selectNonInterestingCards.map(c => {
          return {value: c.dbfId, label: c.name}
        });

    const imageSrc = `resources/images/${
      this.props.hero !== null ? this.props.hero : 99
    }.jpg`;

    // let expansionLabel = label => (
    //   <span style={{textAlign: "right"}}>{label}</span>
    // );

    return (
      <div 
        id="deck-filters"
        className="panel"
        >
        <div className="panel-heading">
          <h2 className="text-center">Filters</h2>
        </div>
        <div className="panel-body">
          <div className="select-input-area">
            <div className="select-item select-item-format">
              <label htmlFor="formatSelect" className="control-label">
                <div className="tooltip-w3">
                  Format
                  <span className="tooltiptext">
                    If you select the Wild format you will get much more starting cards to choose from.
                    Be careful when you change this the starting cards reset to random.
                  </span>
                </div>
              </label>
              <select
                id="formatSelect"
                name="formatSelect"
                className="form-control"
                onChange={this.props.listenerSF}
                value={this.props.format}
              >
                <option value="Standard">Standard</option>
                <option value="Wild">Wild</option>
              </select>
            </div>
            <div className="select-item select-item-hero">
              <label htmlFor="heroSelect" className="control-label">
                <div className="tooltip-w3">
                  Hero
                  <span className="tooltiptext">
                    If you select a hero you will get more starting cards to choose from.
                    Be careful when you change this the starting cards reset to random.
                  </span>
                </div>
              </label>
              <select
                id="heroSelect"
                name="heroSelect"
                className="form-control"
                onChange={this.props.listenerSH}
                value={this.props.selectHero}
              >
                <option value="99">Random</option>
                {this.props.heroes.map((hero, index) => (
                  <option key={index} value={index}>
                    {hero}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-item select-item-archetype">
              <label htmlFor="archetype-select" className="control-label">
                <div className="tooltip-w3">
                  Archetype
                  <span className="tooltiptext">
                    Better leave it at random and let the algorithm decide the
                    type of the deck. In the other hand if you get irrelevant archetypes for 
                    the starting cards you chose, feel free to change it.
                  </span>
                </div>
              </label>
              <select
                id="archetype-select"
                name="archetype-select"
                className="form-control"
                onChange={this.props.listenerSA}
                value={this.props.archetype}
              >
                <option value="Random">Random</option>
                {this.props.archetypes.map((archetype, index) => (
                  <option key={index} value={archetype.name}>
                    {archetype.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-item select-item-origin-card">
              <label htmlFor="origin-card-select" className="control-label">
                <div className="tooltip-w3">
                  Starting cards ({this.props.interestingCards.length})
                  <span className="tooltiptext">
                    This list contains cards that depend on other cards to be good.
                    You can select up to 15 starting cards but i don't suggest
                    more than 3 because most of the card priorities will be ignored.
                  </span>
                </div>
              </label>
              <Select
                id="origin-card-select"
                name="origin-card-select"
                style={{width: "100%"}}
                multi={true}
                value={selectInterestingCards}
                onChange={this.props.listenerSO}
                wrapperStyle={{zIndex: "9"}}
                options={this.props.interestingCards.map(c => {
                  return {value: c.dbfId, label: `${c.set === 99 ? this.expansions[12]: this.expansions[c.set]} - ${c.name}`}
                }).reduce((array, v) => {
                  array.push(v);
                  return array;
                }, [{value: "Random", label: "Random"}])}
              />
            </div>
            <div className="select-item select-item-other-card">
              <label htmlFor="other-card-select" className="control-label">
                <div className="tooltip-w3">
                  Other cards ({this.props.nonInterestingCards.length})
                  <span className="tooltiptext">
                    This list contains the cards that are not included
                    in the "starting cards".
                    Use it if you want to force some specific cards into 
                    the deck. You can select up to 10 cards. If there are
                    no spots left in the deck these cards (or a part of them)
                    will be ignored.
                  </span>
                </div>
              </label>
              <Select
                id="other-card-select"
                name="other-card-select"
                style={{width: "100%"}}
                multi={true}
                value={selectNonInterestingCards}
                onChange={this.props.listenerSOT}
                wrapperStyle={{zIndex: "8"}}
                options={this.props.nonInterestingCards.map(c => {
                  return {value: c.dbfId, label: `${c.set === 99 ? this.expansions[12]: this.expansions[c.set]} - ${c.name}`}
                }).reduce((array, v) => {
                  array.push(v);
                  return array;
                }, [{value: "None", label: "None"}])}
              />
            </div>
          </div>
          <div className="tip" style={{margin: "5px"}}>
              <p>
                <span role="img" aria-label="thinking face emoji"> &#x1f914;</span>
                Don't forget to choose or even combine Highlander cards, Genn, Baku, Princes, Quests, Deathknights. 
                  
              </p>
          </div>
          <div className="resultImage-container" style={{minHeight: "10vh", backgroundColor: "#333"}}>
            {this.props.hero !== 99
              ? (
                <h3 style={{ zIndex: 1 }}>
                  {this.props.heroes[this.props.hero]}
                </h3>
              )
              : null}
            <LazyLoad height={200} offset={400}>
              <ProgressiveImage src={imageSrc} placeholder={imageSrc}>
                {(src, loading) => (
                  <img
                    id="resultImage"
                    style={{ opacity: loading ? 0.5 : 1 }}
                    src={src}
                    className="img-responsive"
                    alt={
                      this.props.hero !== 99
                        ? this.props.heroes[this.props.hero]
                        : "random hero"
                    }
                    onLoad={this.handleOnLoad}
                  />
                )}
              </ProgressiveImage>
            </LazyLoad>
          </div>
        </div>
      </div>
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
}

export default Filters;
