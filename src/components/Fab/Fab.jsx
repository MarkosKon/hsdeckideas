import PropTypes from "prop-types";
import styled from "styled-components";
import animation from "../../utils/animation";

const Fab = styled.button`
  position: fixed;
  display: flex;
  outline: none;
  z-index: 11;
  background-color: darkorange;
  width: 80px;
  height: 80px;
  bottom: 3%;
  right: 3%;
  font-size: 30px;
  ${({ burger }) =>
    burger &&
    `
    background-color: #0084b471;
    width: 60px;
    height: 60px;
    right: 2%;
    top: 1%;
    font-size: 24px
    `} color: white;
  border: 0;
  border-radius: 100%;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-transition: background-color 0.5s ease-in, right 1s;
  transition: background-color 0.5s ease-in, right 1s;
  ${({ ripple }) =>
    ripple &&
    `overflow: hidden; transform: translate3d(0, 0, 0);`} cursor: pointer;
  animation: ${({ pulse }) =>
    pulse ? `${animation.pulse} 4s infinite` : null};

  &:hover {
    animation: none;
    background-color: rgb(235, 131, 3);
    ${({ burger }) => burger && `background-color: #0084b4;`};
  }

  &:focus {
    ${({ burger }) => burger && `outline-color: #0084b4;`};
  }

  &:after {
    ${({ ripple }) =>
      ripple &&
      `
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition: transform 0.5s, opacity 1s;
    `};
  }

  &:active&:after {
    ${({ ripple }) =>
      ripple && `transform: scale(0, 0); opacity: 0.2; transition: 0s;`};
  }

  svg {
    margin: auto auto;
  }
`;

Fab.propTypes = {
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
  pulse: PropTypes.bool,
  burger: PropTypes.bool,
  ripple: PropTypes.bool,
}

Fab.defaultProps = {
  ariaLabel: "Do something",
  pulse: false,
  burger: false,
  ripple: true
}

export default Fab;
