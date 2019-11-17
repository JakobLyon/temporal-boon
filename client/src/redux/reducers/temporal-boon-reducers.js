import {
  CHANGE_ACTIVE_HEALER,
  ADD_TIMELINE_ROW,
  UPDATE_TIMELINE_BOSS_SPELL,
  UPDATE_TIMING,
  UPDATE_NOTES,
  ADD_HEALER_SPELL
} from '../actions/temporal-boon-actions';

export const healerSpells = {
  'Wings': {
    name: 'Wings',
    cooldown: 90,
    id: 1
  },
  'Holy Shock': {
    name: 'Holy Shock',
    cooldown: 60,
    id: 2
  },
  'Ascension': {
    name: 'Ascension',
    cooldown: 120,
    id: 3
  },
  'Healing Tide Totem': {
    name: 'Healing Tide Totem',
    cooldown: 60,
    id: 4
  }
};

export const healerTypes = {
  'Holy Paladin': {
    name: 'Holy Paladin',
    id: 1,
    spells: [
      'Wings', 'Holy Shock'
    ]
  },
  'Resto Shaman': {
    name: 'Resto Shaman',
    id: 2,
    spells: [
      'Ascension', 'Healing Tide Totem'
    ]
  },
  'Disc Priest': {
    name: 'Disc Priest',
    id: 3
  }
};

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
export const timelineDataReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TIMELINE_ROW:
      const {bossSpellName, id, timing} = action.payload;
      return {
        ...state,
        [id]: {
          bossSpellName,
          id,
          timing,
          castSpells: []
        }
      };
    case UPDATE_TIMELINE_BOSS_SPELL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          bossSpellName: action.payload.bossSpellName
        }
      }
    case UPDATE_TIMING:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          timing: action.payload.timing
        }
      }
    case UPDATE_NOTES: 
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          notes: action.payload.notes
        }
      }
    case ADD_HEALER_SPELL:
      const timelineDataRow = state[action.payload.rowId];
      const timelineDataCastSpells = timelineDataRow.castSpells;
      return {
        ...state,
        [action.payload.rowId]: {
          ...timelineDataRow,
          castSpells: [...timelineDataCastSpells, action.payload.castSpellId]
        }
      };
    case CHANGE_ACTIVE_HEALER:
      return Object.values(state).reduce(
        (cur, timelineRow) => {
          return {
            ...cur,
            [timelineRow.id]: {
              ...timelineRow,
              castSpells: timelineRow.castSpells.filter(castSpell =>
                !action.payload.castSpellsForHealer.includes(castSpell))
            }
          }
        },
        {}
      )
    default:
      return state;
  }
}