import { fork } from "redux-saga/effects";

import loadMapConfig from "./load-map-config";

export default function* pcSaveSaga() {
  yield fork(loadMapConfig);
}
