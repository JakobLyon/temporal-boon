import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

export const Button = ({ onClick, dataEnzymeId, children }) => (
  <button onClick={onClick} data-enzyme-id={dataEnzymeId} className="button">
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataEnzymeId: PropTypes.string
};

Button.defaultProps = {
  dataEnzymeId: ""
};
