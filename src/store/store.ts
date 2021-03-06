import {
  compose,
  createStore as createReduxStore,
  applyMiddleware,
} from "redux";

import createSagaMiddleware from "redux-saga";

import { defaultAppState } from "@/state";
import { initialize } from "@/actions/initialize";

import reducer from "@/reducer";

import { loadPersistedState, savePersistedState } from "./persist";

import {
  actionSanitizer,
  stateSanitizer,
  actionsBlacklist,
} from "./devtool-sanitizer";

import saga from "./saga";

function createStore() {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer,
        actionsBlacklist,
      })) ||
    compose;

  const sagaMiddleware = createSagaMiddleware();

  const initialState = loadPersistedState(defaultAppState);

  const store = createReduxStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(saga);

  store.subscribe(() => savePersistedState(store.getState()));
  store.dispatch(initialize());

  return store;
}

const store = createStore();
export default store;
