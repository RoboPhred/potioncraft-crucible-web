import { fork } from "redux-saga/effects";

import mapConfigSaga from "./map-config/saga";
import packageSaga from "./package/saga";
import potionBaseSaga from "./package-potionbases/saga";

export function* servicesSaga() {
  yield fork(mapConfigSaga);
  yield fork(packageSaga);
  yield fork(potionBaseSaga);
}
