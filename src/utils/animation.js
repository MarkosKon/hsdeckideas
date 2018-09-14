import { keyframes } from "styled-components";

export default {
  pulse: keyframes`
    0% {
    -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.8);
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.8);
  }
  40% {
      -moz-box-shadow: 0 0 0 15px rgba(204,169,44, 0);
      box-shadow: 0 0 0 15px rgba(204,169,44, 0);
      transform: scale(1.2);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
    `,
    
  firstIndicator: keyframes`
    0% {
        transform: translate(0%) scaleX(0);
    }
    25% {
        transform: translate(0%) scaleX(0.5);
    }
    50% {
        transform: translate(25%) scaleX(0.75);
    }
    75% {
        transform: translate(100%) scaleX(0);
    }
    100% {
        transform: translate(100%) scaleX(0);
    }
    `,

  secondIndicator: keyframes`
    0% {
        transform: translate(0%) scaleX(0);
    }
    60% {
        transform: translate(0%) scaleX(0);
    }
    80% {
        transform: translate(0%) scaleX(0.6);
    }
    100% {
        transform: translate(100%) scaleX(0.1);
    }
    `
};
