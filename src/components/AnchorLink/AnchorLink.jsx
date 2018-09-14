import React from "react";
import PropTypes from "prop-types";
import anime from "animejs";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const StyledButton = styled.button`
  font-size: 20px;
  color: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const AnchorLink = ({
  color,
  opacity,
  sectionId,
  children,
  callback
}) => (
  <StyledButton
    color={color}
    opacity={opacity}
    aria-label={`go to ${sectionId} section`}
    onClick={() => handleClick(sectionId, callback)}
  >
    {children}
  </StyledButton>
);

AnchorLink.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.number,
  sectionId: PropTypes.string,
  children: PropTypes.element,
  callback: PropTypes.func
};

AnchorLink.defaultProps = {
  color: "black",
  opacity: 0.5,
  children: <FontAwesomeIcon icon={faLink} />
};

export default AnchorLink;

const handleClick = (sectionId, callback) => {
  const sectionRect = document
    .querySelector(`#${sectionId}`)
    .getBoundingClientRect();
  anime({
    targets: "html, body",
    scrollTop: [window.pageYOffset, sectionRect.top + window.pageYOffset],
    duration: 300,
    easing: "easeInSine"
  });
  if (callback) callback();
};
