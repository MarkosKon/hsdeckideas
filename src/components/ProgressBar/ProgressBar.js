import React from "react";

export default props => (
  <div
    className={
      props.visible
        ? "ipl-progress-indicator"
        : "ipl-progress-indicator available"
    }
    id="ipl-progress-indicator"
  >
    <div className="ipl-progress-indicator-head">
      <div className="first-indicator" />
      <div className="second-indicator" />
    </div>
  </div>
);
