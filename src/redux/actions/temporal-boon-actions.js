export const SET_BOSS = 'SET_BOSS';
export const ADD_ACTIVE_HEALER = 'ADD_ACTIVE_HEALER';
export const CHANGE_ACTIVE_HEALER = 'CHANGE_ACTIVE_HEALER';

export const setBoss = boss => ({
  type: SET_BOSS,
  boss
});

export const addActiveHealer = activeHealer => ({
  type: ADD_ACTIVE_HEALER,
  activeHealer
})

export const changeActiveHealer = (healerToRemove, healerToAdd) => ({
  type: CHANGE_ACTIVE_HEALER,
  healerToRemove,
  healerToAdd
}); 