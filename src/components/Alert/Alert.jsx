import styled from "styled-components";
import PropTypes from "prop-types";

const Alert = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 13;

  > p {
    max-width: 200px;
    margin: 0 auto;
  }
`;

Alert.propTypes = {
  className: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

Alert.defaultProps = {
  role: "alert",
}

export default Alert;
