import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Column } from 'already-styled-components';

import BarChart from '../BarChart/BarChart';
import Tooltip from '../../../../components/Tooltip/Tooltip';

const Statistics = styled.div`
  margin-top: 2em 0;
  font-size: 1em;
  text-align: center;
`;
const Heading = styled.h3`
  margin: 30px 0 40px;
  text-align: center;
  font-size: 28px;
`;
const StatisticsTitle = styled(Heading)`
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

const DeckStats = ({ deck: { size, totalDust, score }, manaCurveChartData, chartColor }) => (
  <Column lg="50%">
    <Heading>Mana Curve</Heading>
    <div>
      <BarChart data={manaCurveChartData} chartColor={chartColor} />
    </div>
    <Statistics>
      <StatisticsTitle>Statistics</StatisticsTitle>
      <StatisticsList>
        <li>
          <StatisticsTag>Size: </StatisticsTag>
          <StatisticsNumber>{size}</StatisticsNumber>
        </li>
        <li>
          <StatisticsTag>Total dust:</StatisticsTag>
          <StatisticsNumber>{totalDust}</StatisticsNumber>
        </li>
        <li>
          <Tooltip
            id="tooltip-card-quality"
            text="The cards are rated from 1 to 4. This number generally
                      doesn't mean much. But If you get below 90, then the deck
                      has a lot of memes."
            direction="right"
          />
          <StatisticsTag>Raw card quality:</StatisticsTag>
          <StatisticsNumber>
            {score}
            /120
          </StatisticsNumber>
        </li>
      </StatisticsList>
    </Statistics>
  </Column>
);

DeckStats.propTypes = {
  deck: PropTypes.shape({
    size: PropTypes.number,
    totalDust: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  manaCurveChartData: PropTypes.arrayOf(
    PropTypes.shape({ manaCost: PropTypes.string, cardCount: PropTypes.number }),
  ).isRequired,
  chartColor: PropTypes.string.isRequired,
};

export default DeckStats;
