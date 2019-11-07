import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Radium from "radium";

const styles = {
  login: {

  },
  errorMessage: {

  },
  username: {

  },
  username__label: {

  },
  username__input: {

  },
  password: {

  },
  password__label: {

  },
  password__input: {

  },
  buttons: {

  },
  buttons__login_button: {

  },
  buttons__create_button: {

  }
};

class LoginComponent extends React.Component {
  static propTypes = {
    logIn: PropTypes.func
  };

  static defaultProps = {
    logIn: () => {}
  };

  state = {
    error: false,
    errorMessage: "",
    submitType: "",
    username: "",
    password: ""
  };

  loginUser = () => {
    this.setState({ submitType: "login" });
  };

  createUser = () => {
    this.setState({ submitType: "create" });
  };

  handleSubmit = async event => {
    event.preventDefault();
    // if login, hit login end point
    // else, hit create
    if (this.state.submitType === "login") {
      await axios
        .post("/api/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(({ data }) => {
          const { status, message } = data;
          if (status) {
            // switch views
            this.props.logIn();
          } else {
            // trigger error state
            this.setState({ error: true, errorMessage: message });
          }
        })
        .catch(error => console.log(error));
    } else {
      await axios
        .post("/api/create_user", {
          username: this.state.username,
          password: this.state.password
        })
        .then(({ data }) => {
          const { status, message } = data;
          if (status) {
            // switch views
            this.props.logIn();
          } else {
            // trigger error state
            this.setState({ error: true, errorMessage: message });
          }
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={[styles.login]}
      >
        {this.state.error && (
          <div style={[styles.errorMessage]}>{this.state.errorMessage}</div>
        )}
        <div style={[styles.username]}>
          <label htmlFor="username" style={[styles.username__label]}>
            Username:{" "}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            style={[styles.username__input]}
          />
        </div>
        <div style={[styles.password]}>
          <label htmlFor="password" style={[styles.password__label]}>
            Password:{" "}
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            style={[styles.password__input]}
          />
        </div>
        <div style={[styles.buttons]}>
          <button
            onClick={this.loginUser}
            style={[styles.buttons__login_button]}
          >
            Login
          </button>
          <button
            onClick={this.createUser}
            style={[styles.buttons__create_button]}
          >
            Create
          </button>
        </div>
      </form>
    );
  }
}

export const Login = Radium(LoginComponent);