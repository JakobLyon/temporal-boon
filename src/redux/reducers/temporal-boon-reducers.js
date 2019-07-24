import { combineReducers } from 'redux';
import { SET_BOSS } from '../actions/temporal-boon-actions';

const currentRaid = 'The Eternal Palace';
const currentBoss = 'Abyssal Commander Sivara';

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

export const temporalBoonReducers = combineReducers({
 selectedRaid: selectedRaidReducer,
 selectedBoss: selectedBossReducer
});