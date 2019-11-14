import { applyMiddleware, createStore } from "redux";
import rootReducer from "./../src/redux/reducers/index";
import { middlewares } from "./../src/createStore";

export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
