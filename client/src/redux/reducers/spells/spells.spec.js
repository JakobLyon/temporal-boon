import { spellsReducer } from "./spells";
import { defaultSpells } from "../defaultState";

describe("Spells Reducer", () => {
  it("Returns default", () => {
    const newState = spellsReducer(undefined, {});
    expect(newState).toStrictEqual(defaultSpells);
  });
});
