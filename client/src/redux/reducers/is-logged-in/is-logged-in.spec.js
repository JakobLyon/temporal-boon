import { isLoggedInReducer } from "./is-logged-in";
import { types } from "../../actions/types";
import { defaultFalse } from "../defaultState";

describe("Is Logged In Reducer", () => {
  it("Returns default", () => {
    const newState = isLoggedInReducer(undefined, {});
    expect(newState).toBe(defaultFalse);
  });

  it("Logging in", () => {
    const action = { type: types.LOG_IN };
    const newState = isLoggedInReducer(undefined, action);
    expect(newState).toBe(true);
  });

  it("Logging out", () => {
    const action = { type: types.LOG_OUT };
    const newState = isLoggedInReducer(undefined, action);
    expect(newState).toBe(false);
  });
});
