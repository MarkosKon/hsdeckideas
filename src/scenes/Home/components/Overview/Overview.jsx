import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import { Bar } from "react-chartjs-2";
import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";
import SuccessAlert from "../../../../components/SuccessAlert/SuccessAlert";
import BootstrapCard from "../../../../components/BootstrapCard/BootstrapCard";
import Tooltip from "../../../../components/Tooltip/Tooltip";
import Decklist from "./components/Decklist";

const StyledCard = styled(BootstrapCard)`
  .container-fluid {
    padding: 0;
  }
`;

const ImageContainer = styled.div`
  max-height: 350px;
  max-width: 350px;
  min-height: 220px;
  min-width: 222px;
  border-radius: 50%;
  margin-top: 10px;
  position: relative;
  background-color: #333;
  margin: auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;

Image.propTypes = {
  loading: PropTypes.bool
};

Image.defaultProps = {
  loading: false
};

const Statistics = styled.div`
  margin-top: 2em 0;
  font-size: 1em;
  text-align: center;
`;

const StatisticsTitle = styled.h3`
  margin: 40px 0 30px;
`;

const StatisticsList = styled.div`
  list-style: none;
`;

const StatisticsTag = styled.span`
  display: inline-block;
  font-size: 20px;
  margin: 0 5px;
`;

const StatisticsNumber = styled.span`
  font-size: 30px;
`;

class Overview extends Component {
  constructor(props) {
    super(props);

    this.handleCodeCopy = this.handleCodeCopy.bind(this);
    this.toggleState = this.toggleState.bind(this);

    const { chartData, heroNumber } = this.props;
    this.state = {
      showAlert: false,
      chartData: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7+"],
        datasets: [
          {
            label: "card count",
            data: chartData,
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
      imageSrc: `resources/images/${heroNumber}.jpg`
    };
  }

  componentWillReceiveProps({ heroNumber, chartData }) {
    if (this.props.chartData !== chartData) {
      this.setState({
        chartData: {
          labels: ["0", "1", "2", "3", "4", "5", "6", "7+"],
          datasets: [
            {
              label: "card count",
              data: chartData,
              backgroundColor: "rgba(255, 165, 0, 0.8)",
              borderColor: "rgba(255, 165, 0, 0.8)",
              borderWidth: 1
            }
          ]
        },
        imageSrc: `resources/images/${heroNumber}.jpg`
      });
    }
  }

  render() {
    const {
      heroNumber,
      heroes,
      deck,
      deckCode,
      handleOpenModal,
      listenerMM,
      listenerML,
      interestingCards,
      nonInterestingCards
    } = this.props;

    const { showAlert, chartData, chartOptions, imageSrc } = this.state;

    return (
      <StyledCard id="deck-overview" title="Deck overview">
        {showAlert && (
          <SuccessAlert
            message="Copied to clipboard!"
            listener={this.toggleState}
          />
        )}
        <div className="row">
          <div className="col-xl-4 col-md-6 col-xs-12 order-xl-1">
            <h3 className="text-center" style={{ margin: "30px 0px 40px" }}>
              Basic info
            </h3>
            <div
              className="card mb-3"
              style={{ backgroundColor: "honeydew", boxShadow: "none" }}
            >
              <div className="card-body">
                <ImageContainer className="shadow-lg mb-5">
                  <LazyLoad height={200} offset={400}>
                    <ProgressiveImage src={imageSrc} placeholder={imageSrc}>
                      {(src, loading) => (
                        <Image
                          id="resultImage"
                          className="rounded-circle"
                          src={src}
                          loading={loading}
                          alt={
                            heroNumber !== 99
                              ? heroes[heroNumber]
                              : "random hero"
                          }
                          onLoad={this.handleOnLoad}
                        />
                      )}
                    </ProgressiveImage>
                  </LazyLoad>
                </ImageContainer>
                <p>
                  <b>Class: </b>
                  {deck.hero}
                </p>
                <p>
                  <b>Archetype: </b>
                  {deck.archetype.name}
                </p>
                <p>
                  <b>Archetype Description: </b>
                  {deck.archetype.description}
                </p>
                <p>
                  <b>Starting point: </b>
                  {interestingCards.map(card => card.name).join(", ")}
                </p>
                <p>
                  <b>Other cards: </b>
                  {nonInterestingCards
                    ? nonInterestingCards.map(card => card.name).join(", ")
                    : "No cards selected"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-xs-12 order-xl-2">
            <h3 className="text-center" style={{ margin: "30px 0px 40px" }}>
              Mana Curve
            </h3>
            <Bar data={chartData} options={chartOptions} />
            <Statistics>
              <StatisticsTitle>Statistics</StatisticsTitle>
              <StatisticsList>
                <li>
                  <StatisticsTag>Size: </StatisticsTag>
                  <StatisticsNumber>{deck.size}</StatisticsNumber>
                </li>
                <li>
                  <StatisticsTag>Total dust:</StatisticsTag>
                  <StatisticsNumber>{deck.totalDust}</StatisticsNumber>
                </li>
                <li>
                  <Tooltip
                    id="tooltip-card-quality"
                    text="The cards are rated from 1 to 4. This number generally
                      doesn't mean much. But If you get below 90, then the deck
                      has a lot of memes."
                  />
                  <StatisticsTag>Raw card quality:</StatisticsTag>
                  <StatisticsNumber>
                    {deck.score}
                    /120
                  </StatisticsNumber>
                </li>
              </StatisticsList>
            </Statistics>
            <div className="text-center">
              <h3 style={{ margin: "50px 0px 10px" }}>Additional actions</h3>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleOpenModal}
              >
                Open detailed History
              </button>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-xs-12 order-xl-0">
            <Decklist
              deck={deck}
              deckCode={deckCode}
              heroNumber={heroNumber}
              handleMouseEnter={listenerMM}
              handleMouseLeave={listenerML}
              handleCodeCopy={this.handleCodeCopy}
              handleOpenModal={handleOpenModal}
            />
          </div>
        </div>
      </StyledCard>
    );
  }

  handleCodeCopy() {
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

Overview.propTypes = {
  heroNumber: PropTypes.number,
  heroes: PropTypes.array,
  deck: PropTypes.object,
  deckCode: PropTypes.string,
  chartData: PropTypes.array,
  handleOpenModal: PropTypes.func,
  listenerMM: PropTypes.func,
  listenerML: PropTypes.func,
  interestingCards: PropTypes.array,
  nonInterestingCards: PropTypes.array
};

export default Overview;
