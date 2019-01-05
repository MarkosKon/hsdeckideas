// Major inspiration from a Curran Kelleher video: https://www.youtube.com/watch?v=jfpV7OBptYE

import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "already-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { select, event } from "d3-selection";
import { tree, hierarchy } from "d3-hierarchy";
import { linkVertical } from "d3-shape";
import { zoom } from "d3-zoom";

import UICard from "../../../../components/UICard/UICard";
import { getDendrogramData } from "../../../../utils/D3Dendrogram";

const ContainerCard = styled(UICard)`
  overflow: auto;

  @media screen and (max-width: 767px) {
    text {
      font-size: 4px;
    }
  }
`;

const StyledCard = styled(UICard)`
  background-color: whitesmoke !important;
  box-shadow: none !important;
`;

const linkPathGenerator = linkVertical()
  .x(d => d.x)
  .y(d => d.y);

class TreeDiagram extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();

    this.state = {
      deck: {},
      margin: { top: 0, right: 20, bottom: 50, left: 20 }
    };
  }

  componentDidMount() {
    // Dom is ready, ref stuff.
    const { margin } = this.state;

    const svgWidth = this.wrapperRef.current.clientWidth;
    const svgHeight = document.body.clientHeight;
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;
    this.setState({
      svgWidth,
      svgHeight,
      margin,
      innerWidth,
      innerHeight
    });

    // how to zoom the react way? maybe it's not possible?
    select("svg#dendrogram").call(
      zoom().on("zoom", () => {
        select("g#parentGroup").attr("transform", event.transform);
      })
    );
  }

  static getDerivedStateFromProps(props, state) {
    // The first check because we want to run it after componentDidMount.
    // The second check because we wanto to run it if the deck changes.
    if (state.innerWidth && props.deck !== state.deck) {
      const data = getDendrogramData(props.deck);
      const { innerWidth, innerHeight } = state;
      const treeLayout = tree().size([innerWidth, innerHeight]);
      const root = hierarchy(data);
      const links = treeLayout(root).links();
      const nodes = root.descendants();
      return {
        deck: props.deck,
        links,
        nodes
      };
    }
    return null;
  }

  render() {
    const { closeModal } = this.props;
    const { svgWidth, svgHeight, margin, links, nodes } = this.state;
    return (
      <ContainerCard
        id="dendrogram"
        title="Deck Diagram"
        modalButton={
          <Button
            transparent
            c="black"
            fs="60px"
            hc="darkorange"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        }
      >
        <StyledCard withHeader={false}>
          <p>
            <span role="img" aria-label="text-bullet">
              ✨
            </span>{" "}
            This sections shows you in a <b>visual</b> way the{" "}
            <b>card selection process</b>. Some of the cards have{" "}
            <b>priorities</b> and those priorities lead to other cards and so
            on. At some point we add a <b>suitable archetype</b> and based on
            that archetype's priorities we add some more cards.
          </p>
          <p>
            <span role="img" aria-label="text-bullet">
              ✨
            </span>{" "}
            You can <b>zoom-in</b> and <b>move</b> in all directions in this
            graph.
          </p>
          <p>
            <span role="img" aria-label="text-bullet">
              ✨
            </span>
            Also it's really hard to see it in mobile because of text
            overlapping.
          </p>
        </StyledCard>
        <div ref={this.wrapperRef} style={{ backgroundColor: "#1d1d1d" }}>
          <svg id="dendrogram" width={svgWidth} height={svgHeight}>
            <g
              id="parentGroup"
              transform={`translate(${margin.left}, ${margin.top})`}
            >
              {links &&
                links.map(link => (
                  <path
                    key={link.target.x + link.target.y}
                    d={linkPathGenerator(link)}
                    fill="none"
                    stroke="#FF8C00"
                  />
                ))}
              {nodes &&
                nodes.map(node => (
                  <text
                    key={node.data.name}
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    fontSize={node.depth > 1 ? "8px" : "16px"}
                    fontFamily="'Open Sans', sans serif"
                    style={{
                      pointerEvents: "none",
                      fill: "#19B5FE",
                      textShadow:
                        "-1px -1px 3px #1d1d1d, -1px 1px 3px #1d1d1d, 1px -1px 3px #1d1d1d, 1px 1px 3px #1d1d1d"
                    }}
                  >
                    {node.data.name}
                  </text>
                ))}
            </g>
          </svg>
        </div>
      </ContainerCard>
    );
  }
}

TreeDiagram.propTypes = {
  deck: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default TreeDiagram;
