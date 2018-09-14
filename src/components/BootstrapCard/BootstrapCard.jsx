import React from "react";
import PropTypes from "prop-types";
import AnchorLink from "../AnchorLink/AnchorLink";

const BootstrapCard = ({ id, className, title, withHeader, modalButton, children }) => (
  <div id={id} className={className && `card ${className}`}>
    {withHeader && (
      <div className="card-header">
        <div className="h2 text-center">
          <AnchorLink sectionId={id} /> {title}
        </div>
        {modalButton && modalButton}
      </div>
    )}

    <div className="card-body">
      <div className="container-fluid">{children}</div>
    </div>
  </div>
);

BootstrapCard.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  withHeader: PropTypes.bool,
  modalButton: PropTypes.element,
  children: PropTypes.node
};

BootstrapCard.defaultProps = {
  id: null,
  className: "card",
  title: null,
  withHeader: true,
  modalButton: null
};

export default BootstrapCard;
