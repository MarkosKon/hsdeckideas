import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'already-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AlertContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 13;
  background-color: ${({ success }) => (success ? '#d4edda' : '#f8d7da')};
  color: ${({ success }) => (success ? '#155724' : '#721c24')};
  border-color: ${({ success }) => (success ? '#c3e6cb' : '#f5c6cb')};

  > p {
    max-width: 200px;
    margin: 0 auto;
  }
`;

const Alert = ({
  success, message, callback, style, timeout,
}) => {
  useEffect(() => {
    let timer;
    if (timeout) timer = setTimeout(callback, timeout);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertContainer success={success} role="alert" style={style}>
      <p>{message}</p>
      <Button
        transparent
        c={success ? '#155724' : '#721c24'}
        fs="22px"
        hc="darkorange"
        onClick={callback}
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </AlertContainer>
  );
};

Alert.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  timeout: PropTypes.number,
  style: PropTypes.shape({
    transform: PropTypes.string.isRequired,
  }).isRequired,
};
Alert.defaultProps = {
  success: false,
  timeout: null,
};

export default Alert;
