import { fork } from "redux-saga/effects";

import packageLoadFileSaga from "./package-load-file";

export default function* packageSaga() {
  yield fork(packageLoadFileSaga);
}
