import { keyframes } from 'styled-components';

export default {
  fadeIn: keyframes`
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
   `,
  fadeOut: keyframes`
    from {
        opacity: 1
    }
    to {
        opacity: 0
    }
   `,
  pulse: color => keyframes`
    0% {
    -moz-box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 0 0 0 ${color};
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 0 0 0 ${color};
  }
  40% {
      -moz-box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 0 0 15px rgba(0,0,0, 0);
      box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 0 0 15px rgba(0,0,0, 0);
      transform: scale(1.2);
  }
  100% {
      -moz-box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 0 0 0 rgba(0,0,0, 0);
      box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 0 0 0 rgba(0,0,0, 0);
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
    `,
};
