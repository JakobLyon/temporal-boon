import { createStore, applyMiddleware } from "redux";
import RootReducer from "./redux/reducers";
import ReduxThunk from "redux-thunk";

// middleware
export const middlewares = [ReduxThunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(
  createStore
);

export const store = createStoreWithMiddleware(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
