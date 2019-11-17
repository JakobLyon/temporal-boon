import { types } from "../../actions/types";

export const defaultBoss = "Abyssal Commander Sivara";

export const selectedBossReducer = (state = defaultBoss, action) => {
  switch (action.type) {
    case types.SET_BOSS:
      return action.boss;
    default:
      return state;
  }
};
