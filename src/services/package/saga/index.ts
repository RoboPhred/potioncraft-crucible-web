import { fork } from "redux-saga/effects";

import packageLoadFileSaga from "./package-load-file";
import packageSaveSaga from "./package-save";
import potionBaseNewSaga from "./potionbase-new";

export default function* packageSaga() {
  yield fork(packageLoadFileSaga);
  yield fork(packageSaveSaga);
  yield fork(potionBaseNewSaga);
}
