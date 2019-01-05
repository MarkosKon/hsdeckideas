import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { keyframes } from "styled-components";

const slideIn = keyframes`
    from {
        transform: translateY(-100%)
    }
    to {
        transform: translateY(0)
    }
   `;

const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 13;
  background-color: ${({ success }) => (success ? "#d4edda" : "#f8d7da")};
  color: ${({ success }) => (success ? "#155724" : "#721c24")};
  border-color: ${({ success }) => (success ? "#c3e6cb" : "#f5c6cb")};

  > p {
    max-width: 200px;
    margin: 0 auto;
  }

  animation: 0.5s ${slideIn} cubic-bezier(0.19, 1, 0.22, 1);
`;

const Alert = ({ success, message, callback, timeout }) => {
  if (timeout) setTimeout(callback, timeout);
  return (
    <AlertContainer success={success} role="alert">
      <p>{message}</p>
    </AlertContainer>
  );
};

Alert.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  timeout: PropTypes.number
};
Alert.defaultProps = {
  success: false,
  timeout: null
};

export default Alert;
