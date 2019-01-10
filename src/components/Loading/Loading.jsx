import React from 'react';
import styled from 'styled-components';
import { Button } from 'already-styled-components';

import Spinner from '../Spinner/Spinner';

const ErrorBackground = styled.div`
  background-color: black;
  font-size: 24px;
  color: white;
  opacity: 0.7;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1;

  button {
    margin-top: 20px;
    font-size: 22px;
    display: block;
    text-align: left;
  }
`;

// eslint-disable-next-line react/prop-types
const Loading = ({ error, retry, pastDelay }) => {
  if (error) {
    // When the loader has errored
    return (
      <ErrorBackground>
        <div>
          <div>Oops! Something went wrong..</div>
          <Button bc="#28a745" c="white" aria-label="Reload" onClick={retry}>
            Retry
          </Button>
        </div>
      </ErrorBackground>
    );
  }

  if (pastDelay) return <Spinner />;
  return null; // When the loader has just started
};

export default Loading;
