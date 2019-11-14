import {
  CHANGE_ACTIVE_HEALER,
  ADD_TIMELINE_ROW,
  UPDATE_TIMELINE_BOSS_SPELL,
  UPDATE_TIMING,
  UPDATE_NOTES,
  ADD_HEALER_SPELL,
  LOG_IN,
  LOG_OUT
} from '../actions/temporal-boon-actions';

const bosses = {
  'Abyssal Commander Sivara': {
    spells: [
      'Toxic Brand',
      'Frost Mark',
      'Unstable Mixture'
    ]
  },
  'Blackwater Behemoth': {
    spells: [
      'Toxic Spine',
      'Bioluminescence',
      'Shock Pulse'
    ]
  }
};

const spells = {
  'Toxic Brand': {
    name: 'Toxic Brand',
    spellId: 294715,
    description: 'Marks the player with a poisonous brand, inflicting 8717 Nature damage every 5 seconds and reduces healing received by 5%. This effect stacks.',
    frequencyOrTrigger: 'Applied at the beginning of the encounter. Stacks throughout the fight. Stacks reset when you take Frost damage.'
  },
  'Frost Mark': {
    name: 'Frost Mark',
    spellId: 294711,
    description: 'Marks the player with a frigid brand, inflicting 1745 Frost damage every 1 sec and reducing movement speed by 5%. This effect stacks.',
    frequencyOrTrigger: 'Applied at the beginning of the encounter. Stacks throughout the fight. Stacks reset when you take Nature damage.'
  },
  'Unstable Mixture': {
    name: 'Unstable Mixture',
    spellId: 294847,
    description: 'A mix of poisons catalyzes in the player, causing them to explode, inflicting 7144 Nature damage to all allies every 1 sec for 3 sec.',
    frequencyOrTrigger: 'Occurs any time a player is hit by the opposite damage type. Will happen by accident and will also happen at set periods due to the need to reset stacks of Toxic Brand or Frost Mark. Exact timings of this will be based on strat used.'
  },
  'Toxic Spine': {
    name: 'Toxic Spine',
    spellId: 292167,
    description: 'Fires a set of Toxic Spines at Multiple Players, inflicting 57100 Nature damage every 3 sec for 12 sec.',
    frequencyOrTrigger: 'Every 30 seconds while on a platform. Lasts 12 seconds.'
  },
  'Bioluminescence': {
    name: 'Bioluminescence',
    spellId: 292133,
    description: 'Blocks the effects of Darkest Depths, enabling incoming healing as normal.',
    frequencyOrTrigger: 'Should be up most of the platform. Aquired by killing the Pufferfish. Track when not present on target.'
  },
  'Shock Pulse': {
    name: 'Shock Pulse',
    spellId: 292279,
    description: 'Inflicts up to 270000 Nature damage to all players, decreasing in damage the further away players are from the Behemoth. The damage reduction over distance ends at 80 yards away.',
    frequencyOrTrigger: 'Every 30 seconds while on platform.'
  }
}

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

export const bossesReducer = (state = bosses, action) => {
  return state;
}

export const spellsReducer = (state = spells, action) => {
  return state;
}

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
export const castHealerSpellsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_HEALER_SPELL:
      return {
        ...state,
        [action.payload.castSpellId]: {
          castSpellId: action.payload.castSpellId,
          healerId: action.payload.healerId,
          spellId: action.payload.spellId,
          timing: action.payload.timing
        }
      }
    case CHANGE_ACTIVE_HEALER:
      const newState = Object.values(state).reduce(
        (acc, cur) => {
          if (!action.payload.castSpellsForHealer.includes(cur.castSpellId)) {
            return {
              ...acc,
              [cur.id]: {
                ...cur
              }
            }
          }
          return acc;
        },
        {}
      );
      
      return newState;
    default:
      return state;
  }
}

export const isLoggedInReducer = (state = false, action) => {
  switch (action.type) {
    case LOG_IN:
      return true;
    case LOG_OUT:
      return false;
    default:
      return state;
  }
}