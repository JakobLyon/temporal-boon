import { combineReducers } from 'redux';
import {
  SET_BOSS,
  ADD_ACTIVE_HEALER,
  CHANGE_ACTIVE_HEALER,
  ADD_TIMELINE_ROW,
  UPDATE_TIMELINE_BOSS_SPELL,
  UPDATE_TIMING,
  UPDATE_NOTES
} from '../actions/temporal-boon-actions';

const currentRaid = 'The Eternal Palace';
const currentBoss = 'Abyssal Commander Sivara';

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

const healers = ['Holy Paladin', 'Resto Shaman', 'Disc Priest'];

// {type: 'resto shaman', id: 1}

const updateActiveHealers = (state, healerIDToRemove, healerTypeToAdd, healerIDToAdd) => {
  const newState = {...state, [healerIDToAdd]: {id: healerIDToAdd, type: healerTypeToAdd}};
  delete newState[healerIDToRemove];
  return newState;
}

const selectedRaidReducer = (state = currentRaid, action) => {
  return state;
}

const selectedBossReducer = (state = currentBoss, action) => {
  switch (action.type) {
    case SET_BOSS:
      return action.boss;
    default:
      return state;
  }
}

const bossesReducer = (state = bosses, action) => {
  return state;
}

const spellsReducer = (state = spells, action) => {
  return state;
}

/*
  [id]: {
    type,
    id
  },
  [id2]: {...},
  ...
*/
const activeHealersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ACTIVE_HEALER:
      const {activeHealer, id} = action.payload;
      return {...state, [id]: {type: activeHealer, id}};
    case CHANGE_ACTIVE_HEALER:
      const {healerIdToRemove, healerTypeToAdd, healerIdToAdd} = action.payload;
      return updateActiveHealers(state, healerIdToRemove, healerTypeToAdd, healerIdToAdd)
    default:
      return state;
  }
};

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
const activeHealersByBossReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ACTIVE_HEALER: 
      const {selectedBoss, healerIdToRemove, healerIdToAdd, id} = action.payload;
      return state[selectedBoss]
        ? {...state, [selectedBoss]: [...state[selectedBoss], id]}
        : {...state, [selectedBoss]: [id]};
    case CHANGE_ACTIVE_HEALER:
      const stateWithHealerRemoved = state[selectedBoss].filter(healerId => healerId !== healerIdToRemove);
      return {...state, [selectedBoss]: [...stateWithHealerRemoved, healerIdToAdd]};
    default:
      return state;
  }
}

const timelineDataIdsByBossAddTimelineRow = (state, payload) => {
  const {bossName, id} = payload;
  if (state[bossName]) {
    return {
      ...state,
      [bossName]: [
        ...state[bossName],
        id
      ]
    };
  }
  return {
    ...state,
    [bossName]: [
      id
    ]
  };
}

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
const timelineDataIdsByBossReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TIMELINE_ROW:
      return timelineDataIdsByBossAddTimelineRow(state, action.payload);
    default:
      return state;
  }
};

/* 
  {
    [id]: {
      bossSpellName: 'Toxic Mark',
      timing: 30
    }
  }
*/
const timelineDataReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TIMELINE_ROW:
      const {bossSpellName, id, timing} = action.payload;
      return {
        ...state,
        [id]: {
          bossSpellName,
          id,
          timing
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
    default:
      return state;
  }
}

export const temporalBoonReducers = combineReducers({
 selectedRaid: selectedRaidReducer,
 selectedBoss: selectedBossReducer,
 bosses: bossesReducer,
 spells: spellsReducer,
 healers: () => healers,
 activeHealers: activeHealersReducer,
 activeHealersByBoss: activeHealersByBossReducer,
 timelineDataIdsByBoss: timelineDataIdsByBossReducer,
 timelineData: timelineDataReducer
});