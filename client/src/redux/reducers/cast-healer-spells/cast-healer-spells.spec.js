import { types } from "../../actions/types";
import { castHealerSpellsReducer } from "./cast-healer-spells";
import { defaultObject } from "../defaultState";

const castSpellOne = { castSpellId: 1, healerId: 1, spellId: 1, timing: 0 };
const castSpellTwo = { castSpellId: 2, healerId: 1, spellId: 2, timing: 30 };

describe("Cast Healer Spells Reducer", () => {
  it("Returns default", () => {
    const newState = castHealerSpellsReducer(undefined, {});
    expect(newState).toStrictEqual(defaultObject);
  });

  it("Add healer spell", () => {
    const action = {
      type: types.ADD_HEALER_SPELL,
      payload: { ...castSpellOne }
    };
    const newState = castHealerSpellsReducer(undefined, action);

    expect(newState).toStrictEqual({ 1: { ...castSpellOne } });
  });

  it("Add a second healer spell", () => {
    const action = {
      type: types.ADD_HEALER_SPELL,
      payload: { ...castSpellTwo }
    };
    const newState = castHealerSpellsReducer(
      { 1: { ...castSpellOne } },
      action
    );
    expect(newState).toStrictEqual({
      1: { ...castSpellOne },
      2: { ...castSpellTwo }
    });
  });

  it("Remove cast spells when active healer removed", () => {
    const action = {
      type: types.CHANGE_ACTIVE_HEALER,
      payload: { castSpellsForHealer: [1] }
    };
    const newState = castHealerSpellsReducer(
      { 1: { ...castSpellOne }, 2: { ...castSpellTwo } },
      action
    );
    expect(newState).toStrictEqual({ 2: { ...castSpellTwo } });
  });
});
