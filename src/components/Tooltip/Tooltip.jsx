import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PropTypes from "prop-types"
import $ from "jquery";

const CustomTooltip = styled.button`
  background-color: #6c757db2;
  border-radius: 50%;
  font-size: 8px;
  font-weight: normal;
  border: 0;
  padding: 4px;
  width: 20px;
  height: 20px;
  margin-left: 6px;

  svg {
    margin: auto;
  }
`;

class Tooltip extends Component {
  componentDidMount() {
    $(`#${this.props.id}`).tooltip();
  }

  render() {
    const { id, text } = this.props;
    return (
      <CustomTooltip
        id={id}
        type="button"
        aria-label={id}
        className="btn btn-secondary btn-sm"
        data-toggle="tooltip"
        data-placement="top"
        title={text}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </CustomTooltip>
    );
  }
}

Tooltip.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string
};

Tooltip.defaultProps = {
  id: "tooltip-id",
  text: "Tooltip text"
};


export default Tooltip;
