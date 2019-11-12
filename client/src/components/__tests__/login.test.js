import React from "react";
import { Login } from "../login";
import { mount } from "enzyme";

describe("<Login/>", () => {
  it("Login button calls provided function", async () => {
    const logIn = () => Promise.resolve({ status: true });
    const wrapper = mount(<Login handleLogIn={logIn} />);
    // find and click login
    const loginButton = wrapper.find('[data-enzyme-id="login-button"]');
    loginButton.simulate("click");
    await wrapper.find("form").simulate("submit");
    expect(wrapper.find('[data-enzyme-id="error-message"]').length).toBe(0);
  });

  it("Create button calls provided function", async () => {
    const createUser = () => Promise.resolve({ status: true });
    const wrapper = mount(<Login handleCreateUser={createUser} />);
    // find and click create
    const createButton = wrapper.find('[data-enzyme-id="create-button"]');
    createButton.simulate("click");
    await wrapper.find("form").simulate("submit");
    expect(wrapper.find('[data-enzyme-id="error-message"]').length).toBe(0);
  });

  it("Login fails, error message renders", async () => {
    const logIn = () => {
      return Promise.resolve({ status: false, message: "failed" })
    };
    const wrapper = mount(<Login handleLogIn={logIn} />);
    // find and click login
    const loginButton = wrapper.find('[data-enzyme-id="login-button"]');
    loginButton.simulate("click");
    await wrapper.find("form").simulate("submit");
    wrapper.update();
    expect(wrapper.find('[data-enzyme-id="error-message"]').length).toBe(1);
  });

  it("Create fails, error message renders", async () => {
    const createUser = () =>
      Promise.resolve({ status: false, message: "failed" });
    const wrapper = mount(<Login handleCreateUser={createUser} />);
    // find and click create
    const createButton = wrapper.find('[data-enzyme-id="create-button"]');
    createButton.simulate("click");
    await wrapper.find("form").simulate("submit");
    wrapper.update();
    expect(wrapper.find('[data-enzyme-id="error-message"]').length).toBe(1);
  });
});
