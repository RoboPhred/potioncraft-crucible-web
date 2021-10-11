import { fork } from "redux-saga/effects";

import mapConfigSaga from "./map-config/saga";

export function* servicesSaga() {
  yield fork(mapConfigSaga);
}
