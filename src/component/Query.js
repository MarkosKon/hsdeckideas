import React, { Component } from "react";
import { Row } from "react-bootstrap";
import anime from "animejs";
import LazyLoad from "react-lazyload";
import ProgressiveImage from "react-progressive-image";

class Query extends Component {
  constructor(props) {
    super(props);

    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  render() {
    const imageSrc = `resources/${
      this.props.hero !== null ? this.props.hero : 99
    }.jpg`;
    return (
      <Row id="selectionArea" className="row-space">
        <div className="panel">
          <div className="panel-heading">
            <h2 className="text-center">Query</h2>
          </div>
          <div className="panel-body">
            <div className="select-input-area">
              <div className="select-item select-item-format">
                <label htmlFor="formatSelect" className="control-label">
                  Format
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
                  Hero
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
                  Archetype
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
              <div className="select-item select-item-theme">
                <label htmlFor="theme-select" className="control-label">
                  Theme
                </label>
                <select
                  id="theme-select"
                  name="theme-select"
                  className="form-control"
                  onChange={this.props.listenerST}
                  value={this.props.theme}
                >
                  <option value="Random">Random</option>
                  <option value="NoTheme">
                    No theme
                  </option>
                  {this.props.themes.map((theme, index) => (
                    <option key={index} value={theme.id}>
                      {theme.expansion >= 5
                        ? theme.isGeneric
                          ? theme.name + ` - [Generic, Standard]`
                          : theme.name +
                            ` - [${
                              this.props.heroes[this.props.selectHero]
                            }, Standard]`
                        : theme.isGeneric
                          ? theme.name + ` - [Generic, Wild]`
                          : theme.name +
                            ` - [${
                              this.props.heroes[this.props.selectHero]
                            }, Wild]`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-item select-item-flavor">
                <label htmlFor="flavor-select" className="control-label">
                  Flavor
                </label>
                <select
                  id="flavor-select"
                  name="flavor-select"
                  className="form-control"
                  onChange={this.props.listenerSFL}
                  value={this.props.flavor}
                >
                  <option value="Random">Random (66% change)</option>
                  <option value="NoFlavor">No flavors</option>
                  {this.props.flavors.map((flavor, index) => (
                    <option key={index} value={flavor.id}>
                      {flavor.expansion >= 5
                        ? flavor.isGeneric
                          ? flavor.name + ` - [Generic, Standard]`
                          : flavor.name +
                            ` - [${
                              this.props.heroes[this.props.selectHero]
                            }, Standard]`
                        : flavor.isGeneric
                          ? flavor.name + ` - [Generic, Wild]`
                          : flavor.name +
                            ` - [${
                              this.props.heroes[this.props.selectHero]
                            }, Wild]`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="resultImage-container">
              <h3 style={{ zIndex: 1 }}>
                {this.props.hero !== 99
                  ? this.props.heroes[this.props.hero]
                  : "Random Hero"}
              </h3>
              <LazyLoad height={200} offset={400}>
                <ProgressiveImage src={imageSrc} placeholder={imageSrc}>
                  {(src, loading) => (
                    <img
                      id="resultImage"
                      style={{ opacity: loading ? 0.5 : 1 }}
                      src={src}
                      className="img-rounded img-responsive"
                      alt={
                        this.props.hero !== 99
                          ? this.props.heroes[this.props.hero]
                          : "Random Hero"
                      }
                      onLoad={this.handleOnLoad}
                    />
                  )}
                </ProgressiveImage>
              </LazyLoad>
            </div>
          </div>
        </div>
      </Row>
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

export default Query;
