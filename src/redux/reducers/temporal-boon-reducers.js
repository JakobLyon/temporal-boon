import { combineReducers } from 'redux';
import { SET_BOSS } from '../actions/temporal-boon-actions';

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

export const temporalBoonReducers = combineReducers({
 selectedRaid: selectedRaidReducer,
 selectedBoss: selectedBossReducer,
 bosses: bossesReducer,
 spells: spellsReducer
});