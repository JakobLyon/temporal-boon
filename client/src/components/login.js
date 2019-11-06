import React from "react";
import Radium from "radium";
import axios from "axios";

const styles = {
  login: {},
  errorMessage: {}
};

class LoginComponent extends React.Component {
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
        .get("/api/login")
        .then(response => {
          debugger;
          console.log(response);
        })
        .catch(error => console.log(error));
    } else {
      await axios
        .post("/api/create_user")
        .then(response => {
          debugger;
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        {this.state.error && (
          <div className="errorMessage">{this.state.errorMessage}</div>
        )}
        <div className="username">
          <label for="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
          />
        </div>
        <div className="password">
          <label for="password">Password: </label>
          <input
            type="text"
            name="password"
            id="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
        </div>
        <div className="buttons">
          <button onClick={this.loginUser} className="login-button">
            Login
          </button>
          <button onClick={this.createUser} className="create-button">
            Create
          </button>
        </div>
      </form>
    );
  }
}

export const Login = Radium(LoginComponent);
