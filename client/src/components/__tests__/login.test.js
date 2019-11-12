import React from "react";
import { Login } from "../login";
import { mount } from "enzyme";
import axiosMock from "axios";

describe("<Login/>", () => {
  it("login fails and renders error message", async () => {
    axiosMock.post.mockResolvedValueOnce({data:{ status: false, message: "test content" }});

    const logInFunc = jest.fn();
    const wrapper = mount(<Login logIn={logInFunc} />);

    // find and click login
    const loginButton = wrapper.find('[data-enzyme-id="login-button"]');
    loginButton.simulate("click");
    // fail
    await wrapper.find("form").simulate("submit");
    expect(logInFunc).toHaveBeenCalledTimes(0);

    expect(
      wrapper.render().find('[data-enzyme-id="error-message"]').length
    ).toBe(1);

    expect(
      wrapper.render().find('[data-enzyme-id="error-message"]').text()
    ).toBe("test content");
  });

  it("create fails and renders error message", async () => {
    axiosMock.post.mockResolvedValueOnce({data:{ status: false, message: "test content" }});

    const logInFunc = jest.fn();
    const wrapper = mount(<Login logIn={logInFunc} />);

    // find and click login
    const loginButton = wrapper.find('[data-enzyme-id="create-button"]');
    loginButton.simulate("click");
    // fail
    await wrapper.find("form").simulate("submit");
    expect(logInFunc).toHaveBeenCalledTimes(0);

    expect(
      wrapper.render().find('[data-enzyme-id="error-message"]').length
    ).toBe(1);

    expect(
      wrapper.render().find('[data-enzyme-id="error-message"]').text()
    ).toBe("test content");
  });

  it("login succeeds", async () => {
    axiosMock.post.mockResolvedValueOnce({data:{ status: true}});

    const logInFunc = jest.fn();
    const wrapper = mount(<Login logIn={logInFunc} />);

    // find and click login
    const loginButton = wrapper.find('[data-enzyme-id="login-button"]');
    loginButton.simulate("click");
    // succeed
    await wrapper.find("form").simulate("submit");
    expect(logInFunc).toHaveBeenCalledTimes(1);

    expect(
      wrapper.render().find('[data-enzyme-id="error-message"]').length
    ).toBe(0);
  });

  it("create succeeds", async () => {
    axiosMock.post.mockResolvedValueOnce({data:{ status: true}});

    const logInFunc = jest.fn();
    const wrapper = mount(<Login logIn={logInFunc} />);

    // find and click login
    const loginButton = wrapper.find('[data-enzyme-id="create-button"]');
    loginButton.simulate("click");
    // succeed
    await wrapper.find("form").simulate("submit");
    expect(logInFunc).toHaveBeenCalledTimes(1);

    expect(
      wrapper.render().find('[data-enzyme-id="error-message"]').length
    ).toBe(0);
  });
});
