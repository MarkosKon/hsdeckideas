import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const CustomTooltip = styled.button`
  background-color: #6c757db2;
  color: white;
  border-radius: 50%;
  font-size: 8px;
  font-weight: normal;
  border: 0;
  padding: 4px;
  width: 20px;
  height: 20px;
  margin-left: 6px;

  ::after {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px !important;
    text-align: left;
  }
  svg {
    margin: auto;
  }
`;

const Tooltip = ({ text, direction }) => (
  <CustomTooltip
    role="tooltip"
    aria-label={text}
    data-microtip-position={direction}
    data-microtip-size="medium"
    data-microtip-font-size="16px"
  >
    <FontAwesomeIcon icon={faQuestion} />
  </CustomTooltip>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  direction: PropTypes.string,
};
Tooltip.defaultProps = {
  direction: 'top-right',
};

export default Tooltip;
