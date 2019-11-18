import { timelineDataReducer } from "./timeline-data";
import { types } from "../../actions/types";
import { defaultObject } from "../defaultState";

const rowOne = {
  bossSpellName: "Noxious Blast",
  id: 1,
  timing: 0
};

const expectedRowOne = {
  1: {
    ...rowOne,
    castSpells: []
  }
};

const rowTwo = {
  bossSpellName: "Prismatic Strike",
  id: 2,
  timing: 30
};

const expectedRowTwo = {
  2: {
    ...rowTwo,
    castSpells: []
  }
};

const rowThree = {
  bossSpellName: "Blood Feast",
  id: 3,
  timing: 60
};

const expectedRowThree = {
  3: {
    ...rowThree,
    castSpells: [1, 2, 3]
  }
};

const twoRowStore = {
  ...expectedRowOne,
  ...expectedRowTwo
};

const threeRowStore = {
  ...twoRowStore,
  ...expectedRowThree
};

describe("Timeline Data Reducer", () => {
  it("Returns default", () => {
    const newState = timelineDataReducer(undefined, {});
    expect(newState).toStrictEqual(defaultObject);
  });

  it("Adding timeline row", () => {
    const action = {
      type: types.ADD_TIMELINE_ROW,
      payload: {
        ...rowOne
      }
    };
    const newState = timelineDataReducer(undefined, action);
    expect(newState).toStrictEqual(expectedRowOne);
  });

  it("Adding second timeline row", () => {
    const action = {
      type: types.ADD_TIMELINE_ROW,
      payload: {
        ...rowTwo
      }
    };
    const newState = timelineDataReducer(expectedRowOne, action);
    expect(newState).toStrictEqual({ ...expectedRowOne, ...expectedRowTwo });
  });

  it("Update boss spell", () => {
    const action = {
      type: types.UPDATE_TIMELINE_BOSS_SPELL,
      payload: {
        id: 2,
        bossSpellName: "Turbo Overload"
      }
    };
    const newState = timelineDataReducer(twoRowStore, action);
    expect(newState).toStrictEqual({
      ...expectedRowOne,
      2: { ...rowTwo, castSpells: [], bossSpellName: "Turbo Overload" }
    });
  });

  it("Update timing", () => {
    const action = {
      type: types.UPDATE_TIMING,
      payload: {
        id: 2,
        timing: 60
      }
    };
    const newState = timelineDataReducer(twoRowStore, action);
    expect(newState).toStrictEqual({
      ...expectedRowOne,
      2: { ...rowTwo, timing: 60, castSpells: [] }
    });
  });

  it("Update notes", () => {
    const action = {
      type: types.UPDATE_NOTES,
      payload: {
        id: 2,
        notes: "Here is a new note"
      }
    };
    const newState = timelineDataReducer(twoRowStore, action);
    expect(newState).toStrictEqual({
      ...expectedRowOne,
      2: { ...rowTwo, castSpells: [], notes: "Here is a new note" }
    });
  });

  it("Add healer spell", () => {
    const action = {
      type: types.ADD_HEALER_SPELL,
      payload: {
        rowId: 1,
        castSpellId: 1
      }
    };
    const newState = timelineDataReducer(threeRowStore, action);
    const expectedOutcome = {
      1: { ...rowOne, castSpells: [1] },
      ...expectedRowTwo,
      ...expectedRowThree
    };
    expect(newState).toStrictEqual(expectedOutcome);
  });

  it("Change active healer", () => {
    const action = {
      type: types.CHANGE_ACTIVE_HEALER,
      payload: {
        castSpellsForHealer: [1, 2]
      }
    };
    const newState = timelineDataReducer(threeRowStore, action);
    const expectedOutcome = {
      ...expectedRowOne,
      ...expectedRowTwo,
      3: { ...rowThree, castSpells: [3] }
    };
    expect(newState).toStrictEqual(expectedOutcome);
  });
});
