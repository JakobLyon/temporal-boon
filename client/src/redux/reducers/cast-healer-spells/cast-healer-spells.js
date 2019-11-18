import { defaultObject } from "../defaultState";
import { types } from "../../actions/types";

/*
{
  [castSpellId]: {
    castSpellId: 3
    healerId: 1,
    spellId: 1,
    timing: 30
  },
  ...

}
*/
export const castHealerSpellsReducer = (state = defaultObject, action) => {
  switch (action.type) {
    case types.ADD_HEALER_SPELL:
      return {
        ...state,
        [action.payload.castSpellId]: {
          castSpellId: action.payload.castSpellId,
          healerId: action.payload.healerId,
          spellId: action.payload.spellId,
          timing: action.payload.timing
        }
      };
    case types.CHANGE_ACTIVE_HEALER:
      const newState = Object.values(state).reduce((acc, cur) => {
        if (!action.payload.castSpellsForHealer.includes(cur.castSpellId)) {
          return {
            ...acc,
            [cur.castSpellId]: {
              ...cur
            }
          };
        }
        return acc;
      }, {});

      return newState;
    default:
      return state;
  }
};
