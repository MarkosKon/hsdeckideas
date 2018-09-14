import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import animation from "../../utils/animation";

const ProgressIndicator = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  position: fixed;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: none;
  -webkit-transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
  -moz-transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
  transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
  z-index: 9999;
`;
const ProgressIndicatorHead = styled.div`
  background-color: #ffe4b2;
  height: 4px;
  overflow: hidden;
  position: relative;
`;

const Indicator = styled.div`
  background-color: orange;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  transform-origin: left center;
  -webkit-transform: scaleX(0);
  -moz-transform: scaleX(0);
  transform: scaleX(0);
  animation: ${({ animation }) => animation} 2000ms linear infinite;
`;

const ProgressBar = ({ visible }) => (
  <ProgressIndicator id="ipl-progress-indicator" visible={visible}>
    <ProgressIndicatorHead>
      <Indicator animation={animation.firstIndicator} />
      <Indicator animation={animation.secondIndicator} />
    </ProgressIndicatorHead>
  </ProgressIndicator>
);

ProgressBar.propTypes = {
  visible: PropTypes.bool
};
ProgressBar.defaultProps = {
  visible: true
};
export default ProgressBar;
