import { fork } from "redux-saga/effects";

import packageLoadFileSaga from "./package-load-file";
import packageSaveSaga from "./package-save";

export default function* packageSaga() {
  yield fork(packageLoadFileSaga);
  yield fork(packageSaveSaga);
}
