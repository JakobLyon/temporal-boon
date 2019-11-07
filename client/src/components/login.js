import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Radium from "radium";

const styles = {
  login: {
    width: "300px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    fontSize: "1.6rem",
    background: "linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgb(200, 200, 200))",
    padding: "0 3rem"
  },
  errorMessage: {},
  username: {
    display: "flex",
    justifyContent: "space-between",
    marginBotton: ".5rem"
  },
  username__label: {},
  username__input: {},
  password: {
    display: "flex",
    justifyContent: "space-between"
  },
  password__label: {},
  password__input: {},
  buttons: {
    display: "flex",
    justifyContent: "space-around"
  },
  buttons__login_button: {},
  buttons__create_button: {},
  button: {
    width: "9rem",
    textTransform: "uppercase",
    background: "#fff",
    color: "#777",
    borderRadius: "10rem",
    boxShadow: "0 1rem 2rem rgba(0,0,0,0.2)",
    textDecoration: "none",
    transition: "all 0.2s",
    padding: "10px",
    border: "none",
    ":hover": {
      boxShadow: "0 10px 10px rgba(0,0,0,0.2)",
      transform: "translateY(-5px)"
    },
    ":active": {
      boxShadow: "0 10px 5px rgba(0,0,0,0.2)",
      transform: "translateY(-5px)"
    }
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
      <form onSubmit={this.handleSubmit} style={[styles.login]}>
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
            style={[styles.buttons__login_button, styles.button]}
            key="login"
          >
            Login
          </button>
          <button
            onClick={this.createUser}
            style={[styles.buttons__create_button, styles.button]}
            key="create"
          >
            Create
          </button>
        </div>
      </form>
    );
  }
}

export const Login = Radium(LoginComponent);
