import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PropTypes from "prop-types";
import $ from "jquery";

const CustomPopover = styled.a`
  border-radius: 50%;
  margin-left: 5px;

  &:focus {
    color: white;
  }
`;

class Popover extends Component {
  componentDidMount() {
    $(`#popover${this.props.cardId}`).popover({ html: true });
  }

  render() {
    const { cardId, title, text } = this.props;
    return (
      <CustomPopover
        id={`popover${cardId}`}
        tabIndex="0"
        className="btn btn-sm btn-info"
        role="button"
        data-toggle="popover"
        data-trigger="focus"
        title={title}
        data-content={text}
        aria-label="show card versions"
      >
        <FontAwesomeIcon icon={faQuestion} />
      </CustomPopover>
    );
  }
}

Popover.propTypes = {
  cardId: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string
};

Popover.defaultProps = {
  cardId: 1,
  title: "Popover title",
  text: "Popover text"
};

export default Popover;
