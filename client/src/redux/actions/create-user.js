import axios from "axios";
import { types } from "./types";

export const createUser = payload => async dispatch =>
  await axios
    .post("/api/create_user", payload)
    .then(res => {
      if (res.data.status) {
        dispatch({ type: types.LOG_IN });
      }
      return res.data;
    })
    .catch(err => {
      // TODO: figure out how to handle network errors on an app level
    });
