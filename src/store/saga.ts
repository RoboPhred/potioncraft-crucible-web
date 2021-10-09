import { fork } from "redux-saga/effects";

import pcSaveSaga from "@/services/map-config/saga";

export default function* rootSaga() {
  yield fork(pcSaveSaga);
}
