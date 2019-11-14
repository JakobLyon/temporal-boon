import { types } from "../../actions/types";
import { defaultTimelineDataByIds } from "../defaultState";

const timelineDataIdsByBossAddTimelineRow = (state, payload) => {
  const { bossName, id } = payload;
  if (state[bossName]) {
    return {
      ...state,
      [bossName]: [...state[bossName], id]
    };
  }
  return {
    ...state,
    [bossName]: [id]
  };
};

/*
  {
    'Lady Ashvane': [
      1, 2, 3
    ],
    'Tectus': [
      4, 5, 6
    ]
  }
*/
export const timelineDataIdsByBossReducer = (state = defaultTimelineDataByIds, action) => {
  switch (action.type) {
    case types.ADD_TIMELINE_ROW:
      return timelineDataIdsByBossAddTimelineRow(state, action.payload);
    default:
      return state;
  }
};
