import React from "react";

const Login = () => (
  <form className="login">
    {false && <div className="login__errorMessage"></div>}
    <div className="login__username">
      <label for="username"></label>
      <input type="text" name="username" />
    </div>
    <div className="login__password">
      <label for="password">Password: </label>
      <input type="text" name="password" />
    </div>
    <div className="login__buttons">
      <button type="button" className="login__login-button">
        Login
      </button>
      <button type="button" className="login__create-button">
        Create
      </button>
    </div>
  </form>
);
