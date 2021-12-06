import { fork } from "redux-saga/effects";

import mapConfigSaga from "./map-config/saga";
import mapEditorSaga from "./map-editor/saga";
import packageSaga from "./package/saga";

export function* servicesSaga() {
  yield fork(mapConfigSaga);
  yield fork(mapEditorSaga);
  yield fork(packageSaga);
}
