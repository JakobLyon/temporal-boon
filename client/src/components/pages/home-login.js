import React from "react";
import PropTypes from "prop-types";
import { Login } from "../login";
import { Redirect } from "react-router-dom";
import Radium from "radium";

import { connect } from "react-redux";
import { isLoggedIn } from "../../redux/selectors/temporal-boon-selectors";

import { logIn } from "../../redux/actions/log-in";
import { createUser } from "../../redux/actions/create-user";

const styles = {
  outer: {
    position: "relative",
    width: "100%",
    height: "50vh"
  },
  inner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
};

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state)
});

const HomeLoginComponent = ({ isLoggedIn, logIn, createUser }) =>
  isLoggedIn ? (
    <Redirect to="/cooldowns" />
  ) : (
    <div data-enzyme-id="home-login-component" style={[styles.outer]}>
      <div style={[styles.inner]}>
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
)(Radium(HomeLoginComponent));
