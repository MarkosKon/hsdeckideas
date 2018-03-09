import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import anime from "animejs";
import ProgressiveImage from "react-progressive-image";

class Explanation extends Component {
  constructor(props) {
    super(props);

    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  render() {
    let fClassName = null;
    let tClassName = null;
    if (this.props.flavor && this.props.flavor.cards) {
      switch (this.props.flavor.cards.length) {
        case 1:
          fClassName = "col-sm-4 col-sm-offset-4 card-container";
          break;
        case 2:
          fClassName = "col-sm-4 col-sm-offset-1 card-container";
          break;
        default:
          fClassName = "col-sm-4 card-container";
          break;
      }
    }
    if (this.props.theme && this.props.theme.cards) {
      switch (this.props.theme.cards.length) {
        case 1:
          tClassName = "col-sm-4 col-sm-offset-4 card-container";
          break;
        case 2:
          tClassName = "col-sm-4 col-sm-offset-1 card-container";
          break;
        default:
          tClassName = "col-sm-4 card-container";
          break;
      }
    }
    return (
      <div
        id="explanationArea"
        className={this.props.UIVisible ? "col-sm-6" : "col-md-0"}
      >
        <div className="col-md-12">
          {this.props.archetype ? (
            <div className="row row-space">
              <div className="panel">
                <div className="panel-heading" id="panel-violet">
                  <h2 className="text-center">Explanation</h2>
                </div>

                <div className="panel-body">
                  <div className="row">
                    <div className="col-xs-12">
                      <h3>
                        Deck archtype =
                        <span id="deckArchtypeName">
                          {" " + this.props.archetype.name}
                        </span>
                      </h3>
                      <div id="deckArchtypeExplanation">
                        <p>{this.props.archetype.description}</p>
                      </div>
                      <div className="sample-cards">
                        <sup>staple cards:</sup>
                      </div>
                      <div id="deckArchtypeCards" className="row">
                        {this.props.archetype.cards.map((card, index) => (
                          <div key={index} className="col-sm-4 card-container">
                            <LazyLoad height={200} offset={400}>
                              <ProgressiveImage
                                src={card.imageUrl}
                                placeholder={card.imageUrl}
                              >
                                {(src, loading) => (
                                  <img
                                    style={{ opacity: loading ? 0.5 : 1 }}
                                    src={src}
                                    alt={card.name}
                                    className="img-rounded img-responsive"
                                    onLoad={loading ? null : this.handleOnLoad}
                                  />
                                )}
                              </ProgressiveImage>
                            </LazyLoad>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {this.props.theme && this.props.theme.cards ? (
                    <div className="row">
                      <div className="col-xs-12">
                        <h3>
                          Deck theme =
                          <span id="deckThemeName">
                            {" " + this.props.theme.name}
                          </span>
                        </h3>
                        <div id="deckThemeExplanation">
                          <p>{this.props.theme.description}</p>
                        </div>
                        <div className="sample-cards">
                          <sup>staple cards:</sup>
                        </div>
                        <div id="deckThemeCards">
                          {this.props.theme.cards.map((card, index) => (
                            <div key={index} className={tClassName}>
                              <LazyLoad height={200} offset={400}>
                                <ProgressiveImage
                                  src={card.imageUrl}
                                  placeholder={card.imageUrl}
                                >
                                  {(src, loading) => (
                                    <img
                                      style={{ opacity: loading ? 0.5 : 1 }}
                                      src={src}
                                      alt={card.name}
                                      className="img-rounded img-responsive"
                                      onLoad={
                                        loading ? null : this.handleOnLoad
                                      }
                                    />
                                  )}
                                </ProgressiveImage>
                              </LazyLoad>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {this.props.flavor && this.props.flavor.cards ? (
                    <div className="row">
                      <div className="col-xs-12" id="deck-flavor-container">
                        <h3>
                          Deck flavor =
                          <span id="deckFlavorName">
                            {" " + this.props.flavor.name}
                          </span>
                        </h3>
                        <div id="deckFlavorExplanation">
                          <p>{this.props.flavor.description}</p>
                        </div>
                        <div className="sample-cards">
                          <sup>staple cards:</sup>
                        </div>
                        <div id="deckFlavorCards">
                          {this.props.flavor.cards.map((card, index) => (
                            <div key={index} className={fClassName}>
                              <LazyLoad height={200} offset={400}>
                                <ProgressiveImage
                                  src={card.imageUrl}
                                  placeholder={card.imageUrl}
                                >
                                  {(src, loading) => (
                                    <img
                                      style={{ opacity: loading ? 0.5 : 1 }}
                                      src={src}
                                      alt={card.name}
                                      className="img-rounded img-responsive"
                                      onLoad={
                                        loading ? null : this.handleOnLoad
                                      }
                                    />
                                  )}
                                </ProgressiveImage>
                              </LazyLoad>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  handleOnLoad(e) {
    anime({
      targets: e.target,
      scale: [0.8, 1],
      duration: 1000,
      delay: 0
    });
  }
}

export default Explanation;
