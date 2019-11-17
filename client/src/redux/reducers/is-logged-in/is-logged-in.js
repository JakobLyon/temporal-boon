import { types } from "../../actions/types";
import { defaultFalse } from "../defaultState";

export const isLoggedInReducer = (state = defaultFalse, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return true;
    case types.LOG_OUT:
      return false;
    default:
      return state;
  }
};
