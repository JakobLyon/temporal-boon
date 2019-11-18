import { types } from "../../actions/types";
import { defaultObject } from "../defaultState";

/* 
  Holds data for a row in the Timeline

  {
    [id]: {
      bossSpellName: 'Toxic Mark',
      timing: 30,
      castSpells: [1, 2, ...],
      id
    }
  }
*/
export const timelineDataReducer = (state = defaultObject, action) => {
  switch (action.type) {
    case types.ADD_TIMELINE_ROW:
      const { bossSpellName, id, timing } = action.payload;
      return {
        ...state,
        [id]: {
          bossSpellName,
          id,
          timing,
          castSpells: []
        }
      };
    case types.UPDATE_TIMELINE_BOSS_SPELL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          bossSpellName: action.payload.bossSpellName
        }
      };
    case types.UPDATE_TIMING:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          timing: action.payload.timing
        }
      };
    case types.UPDATE_NOTES:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          notes: action.payload.notes
        }
      };
    case types.ADD_HEALER_SPELL:
      const timelineDataRow = state[action.payload.rowId];
      const timelineDataCastSpells = timelineDataRow.castSpells;
      return {
        ...state,
        [action.payload.rowId]: {
          ...timelineDataRow,
          castSpells: [...timelineDataCastSpells, action.payload.castSpellId]
        }
      };
    case types.CHANGE_ACTIVE_HEALER:
      return Object.values(state).reduce((cur, timelineRow) => {
        return {
          ...cur,
          [timelineRow.id]: {
            ...timelineRow,
            castSpells: timelineRow.castSpells.filter(
              castSpell =>
                !action.payload.castSpellsForHealer.includes(castSpell)
            )
          }
        };
      }, {});
    default:
      return state;
  }
};
