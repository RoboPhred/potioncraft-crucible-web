import { fork } from "redux-saga/effects";

import commitQueueSaga from "./commit-queue/saga";
import mapEditorSaga from "./map-editor/saga";
import packageSaga from "./package/saga";

export function* servicesSaga() {
  yield fork(commitQueueSaga);
  yield fork(mapEditorSaga);
  yield fork(packageSaga);
}
