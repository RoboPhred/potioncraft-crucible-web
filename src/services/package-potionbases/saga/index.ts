import { fork } from "redux-saga/effects";

import potionBaseMapEditSaga from "./potionbase-map-edit";

export default function* mapEditorSaga() {
  yield fork(potionBaseMapEditSaga);
}
