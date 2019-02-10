// Inspiration from a Curran Kelleher video https://www.youtube.com/watch?v=NlBt-7PuaLk.
// Later I altered some code to flip the bar chart upside down from
// this example https://beta.observablehq.com/@mbostock/d3-bar-chart
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

const AnimatedBars = styled.rect`
  transition: y 1s cubic-bezier(0.22, 0.61, 0.36, 1), height 1s cubic-bezier(0.22, 0.61, 0.36, 1);
`;

const BarChart = ({ data, chartColor }) => {
  // refs used for rendering the axes in componentDidMount/componentDidUpdate
  // methods (side-effects)
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const [xScale, setXScale] = useState(null);
  const [yScale, setYScale] = useState(null);

  const margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 50,
  };
  const svgWidth = 400;
  const svgHeight = 230;
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = svgHeight - margin.top - margin.bottom;

  //  If the data change.
  useEffect(() => {
    // Update the x/y SCALES in the state
    const xScaleTemp = scaleBand()
      .domain(data.map(d => d.manaCost))
      .range([0, innerWidth])
      .padding(0.2);
    const yScaleTemp = scaleLinear()
      .domain([0, max(data, d => d.cardCount)])
      .range([innerHeight + margin.top, margin.top]);
    // For functions as state in hooks see:
    // https://github.com/facebook/react/issues/14087#issuecomment-435612340
    setXScale(() => xScaleTemp);
    setYScale(() => yScaleTemp);
    // Draw the AXES, notice that we don't wait for setStates.
    axisBottom(xScaleTemp)
      .tickSize(0)
      .tickPadding(5)(select(xAxisRef.current));
    axisLeft(yScaleTemp)
      .ticks(5)
      .tickSize(-innerWidth)
      .tickSizeOuter([0])(select(yAxisRef.current));
  }, [data]);

  return (
    <svg
      id="barChart"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="xMinYMin"
      width="100%"
      height="100%"
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g id="yAxis" ref={yAxisRef} />
        <g ref={xAxisRef} transform={`translate(0, ${svgHeight - margin.bottom})`} />
        {xScale
          && data.map(entry => (
            <AnimatedBars
              key={entry.manaCost}
              x={xScale(entry.manaCost)}
              y={yScale(entry.cardCount)}
              width={xScale.bandwidth()}
              height={yScale(0) - yScale(entry.cardCount)}
              fill={chartColor}
            />
          ))}
        <text style={{ transform: 'rotateZ(-90deg)' }} y="-30" x="-132">
          Card count
        </text>
        <text x="140" y="200">
          Mana cost
        </text>
      </g>
    </svg>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ manaCost: PropTypes.string, cardCount: PropTypes.number }),
  ).isRequired,
  chartColor: PropTypes.string,
};
BarChart.defaultProps = {
  chartColor: 'steelblue',
};

export default BarChart;
