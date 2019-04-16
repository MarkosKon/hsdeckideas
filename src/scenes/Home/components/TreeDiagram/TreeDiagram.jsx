// Major inspiration from a Curran Kelleher video: https://www.youtube.com/watch?v=jfpV7OBptYE

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'already-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { select, event } from 'd3-selection';
import { tree, hierarchy } from 'd3-hierarchy';
import { linkVertical } from 'd3-shape';
import { zoom } from 'd3-zoom';

import UICard from '../../../../components/UICard/UICard';
import getDendrogramData from '../../../../utils/D3Dendrogram';

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

const TreeDiagram = ({ closeModal, deck }) => {
  const wrapperRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    margin: {
      top: 0,
      right: 20,
      bottom: 50,
      left: 20,
    },
  });
  const [nodes, setNodes] = useState(null);
  const [links, setLinks] = useState(null);

  const { margin } = dimensions;

  useEffect(() => {
    // 100% width, 800px arbitrary height.
    const svgWidth = wrapperRef.current.clientWidth;
    const svgHeight = 800;
    // Inner width max 2200px or else svgWidth * 3.
    // Inner height follows the d3 margin convention.
    const innerWidth = svgWidth * 3 > 2200 ? 2200 : svgWidth * 3;
    const innerHeight = svgHeight - margin.top - margin.bottom;
    select('svg#dendrogram').call(
      zoom().on('zoom', () => {
        select('g#parentGroup').attr('transform', event.transform);
      }),
    );
    const data = getDendrogramData(deck);
    const treeLayout = tree().size([innerWidth, innerHeight]);
    const root = hierarchy(data);
    setLinks(treeLayout(root).links());
    setNodes(root.descendants());
    // The following could be in a useRef, but because
    // of the d3 zoom and the access of 'current' of a
    // null object, it gets weird.
    setDimensions({
      ...dimensions,
      svgWidth,
      svgHeight,
      innerWidth,
      innerHeight,
    });
  }, []);
  return (
    <ContainerCard
      id="dendrogram"
      title="Deck Diagram"
      modalButton={(
        <Button
          aria-label="close modal"
          transparent
          c="black"
          fs="60px"
          hc="darkorange"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
)}
    >
      <StyledCard withHeader={false}>
        <p>
          <span role="img" aria-label="text-bullet">
            ✨
          </span>
          This section shows you in a
          <b> visual </b>
          way the
          <b> card selection process. </b>
          Some of the cards have
          <b> priorities </b>
          and those priorities lead to other cards and so on. At some point we add a
          <b> suitable archetype </b>
          and based on that archetype&apos;s priorities we add some more cards.
        </p>
        <p>
          <span role="img" aria-label="text-bullet">
            ✨
          </span>
          You can
          <b> zoom-in </b>
          and
          <b> move </b>
          in all directions in this graph.
        </p>
        <p>
          <span role="img" aria-label="text-bullet">
            ✨
          </span>
          Also it&apos;s really hard to see it in mobile because of text overlapping.
        </p>
      </StyledCard>
      <div ref={wrapperRef} style={{ backgroundColor: '#1d1d1d' }}>
        <svg id="dendrogram" width={dimensions.svgWidth} height={dimensions.svgHeight}>
          <g id="parentGroup" transform={`translate(${margin.left}, ${margin.top})`}>
            {links
              && links.map(link => (
                <path
                  key={link.target.x + link.target.y}
                  d={linkPathGenerator(link)}
                  fill="none"
                  stroke="#FF8C00"
                />
              ))}
            {nodes
              && nodes.map(node => (
                <text
                  key={node.data.name}
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  fontSize="12px"
                  fontFamily="'Open Sans', sans serif"
                  style={{
                    pointerEvents: 'none',
                    fill: '#19B5FE',
                    textShadow:
                      '-1px -1px 3px #1d1d1d, -1px 1px 3px #1d1d1d, 1px -1px 3px #1d1d1d, 1px 1px 3px #1d1d1d',
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
};

TreeDiagram.propTypes = {
  deck: PropTypes.shape({
    cards: PropTypes.array,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default TreeDiagram;
