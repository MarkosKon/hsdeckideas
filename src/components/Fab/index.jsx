import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  darken, transparentize, getLuminance, lighten,
} from 'polished';
import animation from '../../utils/animations';

const Fab = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  z-index: ${({ zi }) => zi};
  color: ${({ c }) => c};
  background-color: ${({ bc }) => bc};
  width: ${({ w }) => w};
  height: ${({ w }) => w};
  top: ${({ t }) => t};
  right: ${({ r }) => r};
  bottom: ${({ b }) => b};
  left: ${({ l }) => l};
  font-size: ${({ fs }) => fs};
  border: 0;
  border-radius: 100%;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-transition: background-color 0.5s ease-in, right 1s;
  transition: background-color 0.5s ease-in, right 1s;
  ${({ ripple }) => ripple && 'overflow: hidden; transform: translate3d(0, 0, 0);'};
  ${({ pulse, bc }) => pulse
    && css`
      animation: ${animation.pulse(transparentize(0.5, bc))} 4s 2s infinite;
    `};

  &:hover {
    animation: none;
    background-color: ${({ bc }) => (getLuminance(bc) < 0.06 ? lighten(0.15, bc) : darken(0.07, bc))};
  }

  &:focus {
    animation: none;
    ${({ bc }) => `box-shadow: 0 0 0 0.4rem ${
    getLuminance(bc) > 0.8 ? darken(0.15, bc) : transparentize(0.7, bc)
  };`};
  }

  &:after {
    ${({ ripple }) => ripple
      && `
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
    ${({ ripple }) => ripple && 'transform: scale(0, 0); opacity: 0.2; transition: 0s;'};
  }
`;

Fab.propTypes = {
  pulse: PropTypes.bool,
  ripple: PropTypes.bool,
  c: PropTypes.string,
  bc: PropTypes.string,
  fs: PropTypes.string,
  w: PropTypes.string,
  t: PropTypes.string,
  r: PropTypes.string,
  b: PropTypes.string,
  l: PropTypes.string,
  zi: PropTypes.number,
};

Fab.defaultProps = {
  pulse: false,
  ripple: true,
  c: '#FFF',
  bc: 'crimson',
  fs: '30px',
  w: '80px',
  t: null,
  r: '3%',
  b: '3%',
  l: null,
  zi: 1,
};

export default Fab;
