import { bossesReducer } from "./bosses";
import { defaultBosses } from "../defaultState";

describe("Bosses Reducer", () => {
  it("Returns default", () => {
    const newState = bossesReducer(undefined, {});
    expect(newState).toStrictEqual(defaultBosses);
  });
});
