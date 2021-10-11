import { fork } from "redux-saga/effects";

import { servicesSaga } from "@/services/saga";

export default function* rootSaga() {
  yield fork(servicesSaga);
}
