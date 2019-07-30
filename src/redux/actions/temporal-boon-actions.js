export const SET_BOSS = 'SET_BOSS';
export const ADD_ACTIVE_HEALER = 'ADD_ACTIVE_HEALER';
export const CHANGE_ACTIVE_HEALER = 'CHANGE_ACTIVE_HEALER';

export const setBoss = boss => ({
  type: SET_BOSS,
  boss
});

export const addActiveHealer = (activeHealer, id) => ({
  type: ADD_ACTIVE_HEALER,
  payload: {
    activeHealer,
    id
  }
});

export const changeActiveHealer = (healerIDToRemove, healerTypeToAdd, healerIDToAdd) => ({
  type: CHANGE_ACTIVE_HEALER,
  payload: {
    healerIDToRemove,
    healerTypeToAdd,
    healerIDToAdd
  }
}); 