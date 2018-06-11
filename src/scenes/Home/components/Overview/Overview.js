import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import SuccessAlert from "../../../../components/SuccessAlert/SuccessAlert";

class Overview extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleCodeCopy = this.handleCodeCopy.bind(this);
    this.toggleState = this.toggleState.bind(this);

    this.state = {
      showAlert: false,
      chartData: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7+"],
        datasets: [
          {
            label: "card count",
            data: this.props.chartData,
            backgroundColor: "rgba(255, 165, 0, 0.8)",
            borderColor: "rgba(255, 165, 0, 0.8)",
            borderWidth: 1
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      heroColors: [
        "rgb(116, 80, 8)",
        "darkolivegreen",
        "#8f95b5",
        "#b3843b",
        "#b5bbbd",
        "#595255",
        "#343663",
        "#6d4075",
        "#652523"
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chartData !== nextProps.chartData) {
      this.setState({
        chartData: {
          labels: ["0", "1", "2", "3", "4", "5", "6", "7+"],
          datasets: [
            {
              label: "card count",
              data: nextProps.chartData,
              backgroundColor: "rgba(255, 165, 0, 0.8)",
              borderColor: "rgba(255, 165, 0, 0.8)",
              borderWidth: 1
            }
          ]
        }
      });
    }
  }

  render() {
    const classColor = {
      backgroundColor: `${this.state.heroColors[this.props.heroNumber]}`
    };
    const neutralColor = { backgroundColor: `white` };
    return (
      <div id="deck-overview" className="panel">
        {this.state.showAlert ? (
          <SuccessAlert
            message="Copied to clipboard!"
            listener={this.toggleState}
          />
        ) : null}
        <div className="panel-heading">
          <h2 className="text-center">Deck overview </h2>
        </div>
        <div className="panel-body">
          <div className="form-group clearfix">
            <label className="col-xs-3" htmlFor="deckCode">
              Deck code:
            </label>
            <div className="input-group col-xs-9">
              <input
                id="deckCode"
                name="deck-code"
                className="form-control"
                type="text"
                placeholder="Readonly input here…"
                readOnly
                value={this.props.deckCode}
                onClick={this.handleClick}
              />
              <span className="input-group-btn">
                <button
                  id="codeCopy"
                  type="button"
                  className="btn btn-default"
                  onClick={this.handleCodeCopy}
                >
                  <i className="far fa-copy" /> Copy
                </button>
              </span>
            </div>
          </div>
          <div className="col-lg-5 col-sm-6 col-lg-push-7 col-sm-push-6">
            <h3 className="text-center">Mana Curve</h3>
            <Bar
              data={this.state.chartData}
              options={this.state.chartOptions}
            />
            <div
              className="deck-statistics text-center"
              style={{ margin: "2em 0" }}
            >
              <h3>Statistics</h3>
              <div className="total-dust">
                Total dust:{" "}
                <b className="total-dust-number">
                  {this.props.deckForUI.totalDust}
                </b>
              </div>
              <div className="deck-quality">
                <div className="tooltip-w3">
                  Raw card quality:
                  <span className="tooltiptext">
                    The cards are rated from 1 to 4. This number generally
                    doesn't mean much. But If you get below 90, then the deck
                    has a lot of memes.
                  </span>
                </div>
                <b>{this.props.deckForUI.score} / 120</b>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-sm-6 col-lg-pull-5 col-sm-pull-6">
            <h3 className="text-center">Decklist</h3>
            <div id="deckList" className="list-group">
              <ul className="decklist">
                {this.props.deckForUI.cards.map((card, index) => (
                  <li
                    key={card.id}
                    id={card.id}
                    data-image-url={card.imageUrl}
                    onMouseMove={this.props.listenerMM}
                    onMouseLeave={this.props.listenerML}
                  >
                    <div className={"mana-cost " + card.rarity.toLowerCase()}>
                      {card.cost}
                    </div>
                    <LazyLoad height={35} offset={400} once>
                      <div
                        className={card.isRandom ? "name random" : "name"}
                        style={{
                          background: `linear-gradient(to right, black 0%, black 70%, rgba(255, 255, 255, 0)) 30%, url(/resources/images/${
                            card.tile
                          }) top right no-repeat`
                        }}
                      >
                        {card.name}
                      </div>
                    </LazyLoad>
                    <div className="quantity">
                      {card.rarity === "LEGENDARY" ? (
                        <div>
                          <i className="fas fa-star" />
                        </div>
                      ) : (
                        card.quantity
                      )}
                    </div>
                    <div
                      className="class-color"
                      style={
                        card.cardClass.includes("NEUTRAL")
                          ? neutralColor
                          : classColor
                      }
                    />
                  </li>
                ))}
              </ul>
              <p style={{ paddingLeft: "10px" }}>
                <span role="img" aria-label="bullet point emoji">
                  &#x2728;
                </span>
                The cards in <b>orange</b> (if any) are completely random good
                cards. All the others are selected by the algorithm. If you are
                interested on how we select cards check the "Card selection
                history" section or see the <Link to="/FAQ">FAQ</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClick(e) {
    e.target.select();
  }

  handleCodeCopy(e) {
    const input = document.getElementById("deckCode");
    input.select();

    try {
      document.execCommand("copy");
      this.setState({
        showAlert: true
      });
    } catch (err) {
      console.log("Unable to copy.");
    }
  }

  toggleState() {
    this.setState({
      showAlert: false
    });
  }
}

export default Overview;
