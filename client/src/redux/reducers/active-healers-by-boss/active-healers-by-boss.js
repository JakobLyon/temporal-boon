import { types } from "../../actions/types";
import { defaultActiveHealersByBoss } from "../defaultState";

/*
  Healer ids for each boss

  {
    'Boss Name': [
      1, 2, 3, ...
    ],
    'Boss Name 2': [
      4, 5, 6, ...
    ],
    ...
  }
*/
export const activeHealersByBossReducer = (
  state = defaultActiveHealersByBoss,
  action
) => {
  switch (action.type) {
    case types.ADD_ACTIVE_HEALER:
      const { selectedBoss, id } = action.payload;
      return state[selectedBoss]
        ? { ...state, [selectedBoss]: [...state[selectedBoss], id] }
        : { ...state, [selectedBoss]: [id] };
    case types.CHANGE_ACTIVE_HEALER:
      const stateWithHealerRemoved = state[action.payload.selectedBoss].filter(
        healerId => healerId !== action.payload.healerIdToRemove
      );
      return {
        ...state,
        [action.payload.selectedBoss]: [
          ...stateWithHealerRemoved,
          action.payload.healerIdToAdd
        ]
      };
    default:
      return state;
  }
};
