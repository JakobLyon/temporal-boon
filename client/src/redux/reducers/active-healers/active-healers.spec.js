import { activeHealersReducer } from "./active-healers";
import { types } from "../../actions/types";

const newHealerOne = { activeHealer: "First Healer", id: 1 };
const newHealerTwo = { activeHealer: "Second Healer", id: 2 };

const healerOneOutput = { 1: { name: "First Healer", id: 1 } };
const healerTwoOutput = { 2: { name: "Second Healer", id: 2 } };
const healerThreeOutput = { 3: { name: "Third Healer", id: 3 } };

describe("Active Healers Reducer", () => {
  it("Returns default", () => {
    const newState = activeHealersReducer(undefined, {});
    expect(newState).toStrictEqual({});
  });

  it("Adding a healer from scratch", () => {
    const action = { type: types.ADD_ACTIVE_HEALER, payload: newHealerOne };
    const newState = activeHealersReducer(undefined, action);
    expect(newState).toStrictEqual(healerOneOutput);
  });

  it("Adding a second healer", () => {
    const action = { type: types.ADD_ACTIVE_HEALER, payload: newHealerTwo };

    const newState = activeHealersReducer(healerOneOutput, action);
    const expectedOutput = { ...healerOneOutput, ...healerTwoOutput };
    expect(newState).toStrictEqual(expectedOutput);
  });

  it("Changing an active healer", () => {
    const action = {
      type: types.CHANGE_ACTIVE_HEALER,
      payload: {
        healerIdToRemove: 1,
        healerTypeToAdd: "Third Healer",
        healerIdToAdd: 3
      }
    };
    const newState = activeHealersReducer(
      { ...healerOneOutput, ...healerTwoOutput },
      action
    );

    expect(newState).toStrictEqual({
      ...healerTwoOutput,
      ...healerThreeOutput
    });
  });
});
