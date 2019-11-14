import { activeHealersByBossReducer } from "./active-healers-by-boss";
import { types } from "../../actions/types";
import { defaultActiveHealersByBoss } from "../defaultState";

describe("Active Healers By Boss Reducer", () => {
  it("Returns default", () => {
    const newState = activeHealersByBossReducer(undefined, {});
    expect(newState).toBe(defaultActiveHealersByBoss);
  });

  it("Add an active healer for new boss", () => {
    const action = {
      type: types.ADD_ACTIVE_HEALER,
      payload: { selectedBoss: "Orgoza", id: 1 }
    };
    const newState = activeHealersByBossReducer(undefined, action);

    const expectedOutcome = { Orgoza: [1] };
    expect(newState).toStrictEqual(expectedOutcome);
  });

  it("Add another active healer for new boss", () => {
    const initialState = { Orgoza: [1] };
    const action = {
      type: types.ADD_ACTIVE_HEALER,
      payload: { selectedBoss: "Snake Lady", id: 2 }
    };
    const newState = activeHealersByBossReducer(initialState, action);

    const expectedOutcome = { Orgoza: [1], "Snake Lady": [2] };
    expect(newState).toStrictEqual(expectedOutcome);
  });

  it("Add an active healer for existing boss", () => {
    const initialState = { Orgoza: [1] };
    const action = {
      type: types.ADD_ACTIVE_HEALER,
      payload: { selectedBoss: "Orgoza", id: 3 }
    };
    const newState = activeHealersByBossReducer(initialState, action);
    const expectedOutcome = { Orgoza: [1, 3] };
    expect(newState).toStrictEqual(expectedOutcome);
  });

  it("Change active healer", () => {
    const initialState = { Orgoza: [1, 2] };
    const action = {
      type: types.CHANGE_ACTIVE_HEALER,
      payload: { selectedBoss: "Orgoza", healerIdToRemove: 1, healerIdToAdd: 3 }
    };
    const newState = activeHealersByBossReducer(initialState, action);
    const expectedOutcome = { Orgoza: [2, 3] };
    expect(newState).toStrictEqual(expectedOutcome);
  });
});
