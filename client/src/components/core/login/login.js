import React from "react";
import PropTypes from "prop-types";
import "./login.scss";
import { Button } from "../button/button";

export class Login extends React.Component {
  static propTypes = {
    handleLogIn: PropTypes.func,
    handleCreateUser: PropTypes.func
  };

  static defaultProps = {
    handleLogIn: () => {},
    handleCreateUser: PropTypes.func
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

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.submitType === "login") {
      this.props
        .handleLogIn({
          username: this.state.username,
          password: this.state.password
        })
        .then(data => {
          const { status, message } = data;
          if (!status) {
            this.setState({ error: true, errorMessage: message });
          }
        });
    } else {
      this.props
        .handleCreateUser({
          username: this.state.username,
          password: this.state.password
        })
        .then(data => {
          const { status, message } = data;
          if (!status) {
            this.setState({ error: true, errorMessage: message });
          }
        });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="login">
        {this.state.error && (
          <div data-enzyme-id="error-message" className="login__error-message">
            {this.state.errorMessage}
          </div>
        )}
        <div className="login__username-container">
          <label htmlFor="username" className="login__username-label">
            Username:{" "}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            className="login__username-input"
          />
        </div>
        <div className="login__password-container">
          <label htmlFor="password" className="login__password-label">
            Password:{" "}
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            className="login__password-input"
          />
        </div>
        <div className="login__buttons">
          <Button
            onClick={this.loginUser}
            data-enzyme-id="login-button"
          >
            Login
          </Button>
          <Button
            onClick={this.createUser}
            data-enzyme-id="create-button"
          >
            Create
          </Button>
        </div>
      </form>
    );
  }
}
