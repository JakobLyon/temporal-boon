import { selectedRaidReducer } from "./selected-raid";
import { defaultRaid } from "../defaultState";

describe("Selected Raid Reducer", () => {
  it("Returns default", () => {
    const newState = selectedRaidReducer(undefined, {});
    expect(newState).toBe(defaultRaid);
  });
});
