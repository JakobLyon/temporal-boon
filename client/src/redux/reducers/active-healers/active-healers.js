import { types } from '../../actions/types';
import { defaultActiveHealers } from "../defaultState";

const updateActiveHealers = (state, healerIDToRemove, healerTypeToAdd, healerIDToAdd) => {
  const newState = {...state, [healerIDToAdd]: {id: healerIDToAdd, name: healerTypeToAdd}};
  delete newState[healerIDToRemove];
  return newState;
}

/*
  Healer ID: information for that healer

  [id]: {
    type,
    id,
    spells: [1, 2, 3]
  },
  [id2]: {...},
  ...
*/
export const activeHealersReducer = (state = defaultActiveHealers, action) => {
  switch (action.type) {
    case types.ADD_ACTIVE_HEALER:
      const {activeHealer, id} = action.payload;
      return {...state, [id]: {name: activeHealer, id}};
    case types.CHANGE_ACTIVE_HEALER:
      const {healerIdToRemove, healerTypeToAdd, healerIdToAdd} = action.payload;
      return updateActiveHealers(state, healerIdToRemove, healerTypeToAdd, healerIdToAdd)
    default:
      return state;
  }
};

