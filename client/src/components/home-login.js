import React from "react";
import { Center } from "./layout/center-hoc";
import { Login } from "./login";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { isLoggedIn } from "../redux/selectors/temporal-boon-selectors";
import { logIn } from "../redux/actions/temporal-boon-actions";

// wrap in redux(providers) and center for styling
// move app specific stuff from login up here? like requests?
// add height in here
// next steps: isLoggedIn + setLoggedIn action

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn())
});

const HomeLoginComponent = ({ isLoggedIn, logIn }) =>
  isLoggedIn ? <Redirect to="/cooldowns" /> : <Login logIn={logIn} />;

export const HomeLogin = Center(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeLoginComponent)
);
