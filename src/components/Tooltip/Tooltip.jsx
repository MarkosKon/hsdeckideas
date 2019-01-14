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

  &.bigger-font::after {
    font-size: 16px !important;
    text-align: left;
  }
  svg {
    margin: auto;
  }
`;

const Tooltip = ({
  className, id, text, direction,
}) => (
  <CustomTooltip
    className={`${className} bigger-font`}
    type="button"
    data-balloon={text}
    data-balloon-pos={direction}
    data-balloon-length="medium"
    aria-label={id}
  >
    <FontAwesomeIcon icon={faQuestion} />
  </CustomTooltip>
);

Tooltip.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  direction: PropTypes.string,
};
Tooltip.defaultProps = {
  className: null,
  direction: 'up',
};

export default Tooltip;
