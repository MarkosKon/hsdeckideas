import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  /* open-sans-regular - latin */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/open-sans-v15-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url('/fonts/open-sans-v15-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/open-sans-v15-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/open-sans-v15-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('/fonts/open-sans-v15-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/open-sans-v15-latin-regular.svg#OpenSans') format('svg'); /* Legacy iOS */
  }
  /* open-sans-700 - latin */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/open-sans-v15-latin-700.eot'); /* IE9 Compat Modes */
    src: local('Open Sans Bold'), local('OpenSans-Bold'),
        url('/fonts/open-sans-v15-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/open-sans-v15-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/open-sans-v15-latin-700.woff') format('woff'), /* Modern Browsers */
        url('/fonts/open-sans-v15-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/open-sans-v15-latin-700.svg#OpenSans') format('svg'); /* Legacy iOS */
  }
  /* oswald-regular - latin (We use it as pseudo-bold)*/
  @font-face {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/oswald-v16-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Oswald Regular'), local('Oswald-Regular'),
        url('/fonts/oswald-v16-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/oswald-v16-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/oswald-v16-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('/fonts/oswald-v16-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/oswald-v16-latin-regular.svg#Oswald') format('svg'); /* Legacy iOS */
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    line-height: 1.3;
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
    opacity: 0;
    transition: opacity .3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  .ReactModal__Content {
    width: 100%!important;
    margin: 0!important;
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
