import React from "react";

export default props => (
  <button
    type="button"
    className="fabidea ripple"
    aria-label="Generate Idea"
    onClick={props.onClick}
  >
    <i className="far fa-lightbulb" />
  </button>
);
