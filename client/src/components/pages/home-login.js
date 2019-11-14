import React from "react";
import PropTypes from "prop-types";
import { Login } from "../login";
import { Redirect } from "react-router-dom";
import "./home-login.scss";

import { connect } from "react-redux";
import { isLoggedIn } from "../../redux/selectors/temporal-boon-selectors";

import { logIn } from "../../redux/actions/log-in";
import { createUser } from "../../redux/actions/create-user";

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state)
});

const HomeLoginComponent = ({ isLoggedIn, logIn, createUser }) =>
  isLoggedIn ? (
    <Redirect to="/cooldowns" />
  ) : (
    <div data-enzyme-id="home-login-component" className="outer">
      <div className="inner">
        <Login handleLogIn={logIn} handleCreateUser={createUser} />
      </div>
    </div>
  );

HomeLoginComponent.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  createUser: PropTypes.func
};

HomeLoginComponent.defaultProps = {
  isLoggedIn: false,
  logIn: () => {},
  createUser: () => {}
};

export default HomeLoginComponent;

export const HomeLogin = connect(
  mapStateToProps,
  { logIn, createUser }
)(HomeLoginComponent);
