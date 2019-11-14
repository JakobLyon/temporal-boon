import selectedBossReducer, { defaultBoss } from "./selected-boss";
import { types } from "../../actions/types";

describe("Selected Boss Reducer", () => {
  it("Returns state by default", () => {
    const newState = selectedBossReducer(undefined, {});
    expect(newState).toEqual(defaultBoss);
  });

  it("Returns new boss when changed", () => {
    const newBoss = "newBoss";
    const newState = selectedBossReducer(undefined, {
      type: types.SET_BOSS,
      boss: newBoss 
    });
    expect(newState).toEqual(newBoss);
  });
});
