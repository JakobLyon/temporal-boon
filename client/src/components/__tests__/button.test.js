import React from "react";
import { Button } from "../core/button/button";
import { mount } from "enzyme";

describe("<Button/>", () => {
  it("Calls passed onClick", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Button onClick={onClick} data-enzyme-id="button" />
    );
    wrapper.find('[data-enzyme-id="button"]').simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});