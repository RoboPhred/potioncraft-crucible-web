import { fork } from "redux-saga/effects";

import packageSaga from "./package/saga";
import potionBaseSaga from "./package-potionbases/saga";

export function* servicesSaga() {
  yield fork(packageSaga);
  yield fork(potionBaseSaga);
}
