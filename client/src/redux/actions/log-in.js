import axios from "axios";
import { types } from "./types";

export const logIn = payload => async dispatch =>
  await axios
    .post("/api/login", payload)
    .then(res => {
      if (res.data.status) {
        dispatch({
          type: types.LOG_IN
        });
      }
      return res.data;
    })
    .catch(err => {
      // TODO: do something with this
    });
