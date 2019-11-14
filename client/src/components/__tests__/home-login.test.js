import React from "react";
import { shallow } from "enzyme";
import HomeLoginComponent from "../pages/home-login";
import { testStore } from "../../../utils";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  return shallow(<HomeLoginComponent store={store} />);
};

describe("<HomeLoginComponent/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("Logged in default false, render Login component", () => {
    expect(wrapper.find('[data-enzyme-id="home-login-component"]').length).toBe(
      1
    );
  });

  // isLoggedIn => true
  // --- login _does not_ render
  it("Given isLoggedIn as true, do NOT render Login", () => {
    const wrapper = shallow(<HomeLoginComponent isLoggedIn={true} />);
    expect(wrapper.find('[data-enzyme-id="home-login-component"]').length).toBe(
      0
    );
  });
});
