import { timelineDataIdsByBossReducer } from "./timeline-data-ids-by-boss";
import { types } from "../../actions/types";
import { defaultTimelineDataByIds } from "../defaultState";

describe("Timeline Data Ids By Boss Reducer", () => {
  it("Returns default", () => {
    const newState = timelineDataIdsByBossReducer(undefined, {});
    expect(newState).toStrictEqual(defaultTimelineDataByIds);
  });

  it("Add Id for new Boss", () => {
    const action = {
      type: types.ADD_TIMELINE_ROW,
      payload: {
        bossName: "Orgoza",
        id: 1
      }
    };
    const newState = timelineDataIdsByBossReducer(undefined, action);
    const expectedOutcome = { Orgoza: [1] };
    expect(newState).toStrictEqual(expectedOutcome);
  });

  it("Add Id for existing Boss", () => {
    const initialState = { Orgoza: [1] };
    const action = {
      type: types.ADD_TIMELINE_ROW,
      payload: {
        bossName: "Orgoza",
        id: 2
      }
    };
    const newState = timelineDataIdsByBossReducer(initialState, action);
    const expectedOutcome = { Orgoza: [1, 2] };
    expect(newState).toStrictEqual(expectedOutcome);
  });

  it("Add Id for new boss on state with existing boss", () => {
    const initialState = { Orgoza: [1, 2] };
    const action = {
      type: types.ADD_TIMELINE_ROW,
      payload: {
        bossName: "Snake Lady",
        id: 3
      }
    };
    const newState = timelineDataIdsByBossReducer(initialState, action);
    const expectedOutcome = { Orgoza: [1, 2], "Snake Lady": [3] };
    expect(newState).toStrictEqual(expectedOutcome);
  });
});
