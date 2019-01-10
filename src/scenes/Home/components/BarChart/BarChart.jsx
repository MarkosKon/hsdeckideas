// Inspiration from a Curran Kelleher video https://www.youtube.com/watch?v=NlBt-7PuaLk.
// Later I altered some code to flip the bar chart upside down from
// this example https://beta.observablehq.com/@mbostock/d3-bar-chart
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

const AnimatedBars = styled.rect`
  transition: y 1s cubic-bezier(0.22, 0.61, 0.36, 1), height 1s cubic-bezier(0.22, 0.61, 0.36, 1);
`;
class BarChart extends React.Component {
  constructor(props) {
    super(props);

    // refs used for rendering the axes in componentDidMount/componentDidUpdate
    // methods (side-effects)
    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();

    // The d3 margin convention (margin, svgWidth/svgHeight, innerWidth/innerHeight)
    const margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 50,
    };
    const svgWidth = 400;
    const svgHeight = 230;

    this.state = {
      svgWidth,
      svgHeight,
      innerWidth: svgWidth - margin.left - margin.right,
      // eslint-disable-next-line react/no-unused-state
      innerHeight: svgHeight - margin.top - margin.bottom,
      margin,
      data: [],
      xScale: {},
      yScale: {},
    };
  }

  //  If the data change, update the data and the x/y scales in the state
  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.data) {
      const { data } = props;
      return {
        data,
        xScale: scaleBand()
          .domain(data.map(d => d.manaCost))
          .range([0, state.innerWidth])
          .padding(0.2),
        yScale: scaleLinear()
          .domain([0, max(data, d => d.cardCount)])
          .range([state.innerHeight + state.margin.top, state.margin.top]),
      };
    }
    return null;
  }

  // Draw the axes for the initial load
  // * Note: I could have written it in the following format:
  // select(this.xAxisRef.current).call(axisBottom(this.state.xScale));
  componentDidMount() {
    const { xScale, yScale, innerWidth } = this.state;
    axisBottom(xScale)
      .tickSize(0)
      .tickPadding(5)(select(this.xAxisRef.current));
    axisLeft(yScale)
      .ticks(5)
      .tickSize(-innerWidth)
      .tickSizeOuter([0])(select(this.yAxisRef.current));
  }

  // Draw the axes for any subsquent loads if the data changed
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const { xScale, yScale, innerWidth } = this.state;
    if (data !== prevProps.data) {
      axisBottom(xScale)
        .tickSize(0)
        .tickPadding(5)(select(this.xAxisRef.current));
      axisLeft(yScale)
        .ticks(5)
        .tickSize(-innerWidth)
        .tickSizeOuter([0])(select(this.yAxisRef.current));
    }
  }

  render() {
    const { chartColor } = this.props;
    const {
      svgWidth, svgHeight, margin, data, xScale, yScale,
    } = this.state;
    return (
      <svg
        id="barChart"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMinYMin"
        width="100%"
        height="100%"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g id="yAxis" ref={this.yAxisRef} />
          <g ref={this.xAxisRef} transform={`translate(0, ${svgHeight - margin.bottom})`} />
          {data
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
  }
}

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
