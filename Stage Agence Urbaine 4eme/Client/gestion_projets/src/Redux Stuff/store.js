import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const saveStateToSessionStorage = state => {
  sessionStorage.setItem("state", JSON.stringify(state));
};

const getStateFromSessionStorage = () => {
  if (sessionStorage.getItem("state")) {
    return JSON.parse(sessionStorage.getItem("state"));
  } else {
    return {};
  }
};

const InitialState = getStateFromSessionStorage();

const store = createStore(
  rootReducer,
  InitialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveStateToSessionStorage(store.getState());
});
export default store;
