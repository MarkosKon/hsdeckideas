import React, { Component } from "react";
import { Button } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import SuccessAlert from "./SuccessAlert";
import { Bar } from "react-chartjs-2";

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
      }
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
    return (
      <div id="deckSampleArea" className="row">
        {this.props.deckCode && this.props.chartData ? (
          <div className="thumbnail">
            {this.state.showAlert ? (
              <SuccessAlert
                message="Copied to clipboard!"
                listener={this.toggleState}
              />
            ) : null}
            <h2 className="text-center">Overview </h2>
            <div className="form-group clearfix">
              <label className="col-xs-3" htmlFor="deckCode">
                Deck code:
              </label>
              <div className="col-xs-9">
                <div className="input-group">
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
                    <Button
                      bsStyle="default"
                      id="codeCopy"
                      onClick={this.handleCodeCopy}
                    >
                      <i className="far fa-copy" /> Copy
                    </Button>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-lg-push-7 col-md-push-6">
              <h3 className="text-center">Mana Curve</h3>
              <Bar
                data={this.state.chartData}
                options={this.state.chartOptions}
              />
            </div>
            <div className="col-lg-7 col-md-6 col-lg-pull-5 col-md-pull-6">
              <h3 className="text-center">Decklist</h3>
              <div id="deckList" className="list-group">
                <ul className="decklist">
                  {this.props.deckForUI.cards.map((card, index) => (
                    <li key={index}>
                      <div className={"mana-cost " + card.rarity.toLowerCase()}>
                        {card.cost}
                      </div>
                      <LazyLoad height={35} offset={400}>
                        <div
                          className={
                            card.isRandom
                              ? "name random"
                              : card.isSuperRandom
                                ? "name super-random"
                                : "name"
                          }
                          style={{
                            background: `linear-gradient(to right, black 0%, black 70%, rgba(255, 255, 255, 0)) 30%, url(/resources/${
                              card.tile
                            }) top right no-repeat`
                          }}
                        >
                          {card.name}
                        </div>
                      </LazyLoad>
                      <div className="quantity">{card.rarity === "LEGENDARY" ? <div><i className="fas fa-star"></i></div> :card.quantity}</div>
                    </li>
                  ))}
                </ul>
                <sup>
                  * The cards with white name come from the theme and flavor.
                  The yellow are selected based on the archetype. If there are
                  not enough cards for the archetype, we populate the deck with
                  completely random "good cards", the red ones.
                </sup>
                <div className="total-dust text-left">
                  Total dust:{" "}
                  <b className="total-dust-number">
                    {this.props.deckForUI.totalDust}
                  </b>
                </div>
                <div>
                  Raw card quality: <b>{this.props.deckForUI.score} / 120</b>
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
