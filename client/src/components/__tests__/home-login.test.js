import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomeLoginComponent from "../pages/home-login";

configure({ adapter: new Adapter() });

describe("<HomeLoginComponent/>", () => {
  // isLoggedIn => false
  // --- login renders
  it("Given isLoggedIn as false, render Login", () => {
    const wrapper = shallow(<HomeLoginComponent isLoggedIn={false}/>);
    expect(wrapper.find('[data-enzyme-id="home-login-component"]').length).toBe(1);
  });
  
  // isLoggedIn => true
  // --- login _does not_ render
  it("Given isLoggedIn as true, do NOT render Login", () => {
    const wrapper = shallow(<HomeLoginComponent isLoggedIn={true}/>);
    expect(wrapper.find('[data-enzyme-id="home-login-component"]').length).toBe(0);
  });
});
