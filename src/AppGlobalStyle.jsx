import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Oswald|Open+Sans');

  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    line-height: 1.3;
    font-display: swap;
    background-color: #7a7a7a;
    color: #2d2d2d;
  }

  h1,
  h2,
  h3,
  h4,
  h5, 
  h6 {
    color: #2d2d2d;
    font-family: 'Oswald', serif;
    font-weight: 700;
    font-display: swap;
  }

  ::-moz-selection {
    background: rgb(255, 255, 79);
  }

  ::selection {
    background: rgb(255, 255, 79);
  }

  img::-moz-selection {
    color: white;
    background: transparent;
  }

  img::selection {
    color: white;
    background: transparent;
  }

  /* react-modal */
  .ReactModal__Body--open {
    overflow: hidden;
  }

  .ReactModal__Overlay {
    overflow: auto;
  }

  .ReactModal__Content {
    opacity: 0;
    width: 100%!important;
    margin: 0!important;
    transition: opacity .3s ease-out;
  }

  .ReactModal__Content--after-open {
    opacity: 1;
  }

  .ReactModal__Content--before-close {
    opacity: 0;
  }

  /* d3 barchart styles */
  svg#barChart text {
    font-family: 'Open Sans', sans-serif;
    pointer-events: none;
  }

  g#yAxis .tick line {
    opacity: .2;
  }

  .domain {
    opacity: .5;
  }
`;

export default GlobalStyle;
