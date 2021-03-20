import userReducer from "./user/userReducer";
import mainReducer from "./main/mainReducer";
import cafeReducer from "./cafe/cafeReducer";
import photoReducer from "./photo/photoReducer";

import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import {
  connectRouter,
  routerMiddleware,
} from "connected-react-router";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./localStoragesTools";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  photo: photoReducer,
  user: userReducer,
  main: mainReducer,
  cafe: cafeReducer,
  router: connectRouter(history),
});

const middleware = [thunk, routerMiddleware(history)];

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middleware)
);

store.subscribe(() => {
  saveToLocalStorage({
    user: {
      user: store.getState().user.user,
    },
  });
});

export default store;
