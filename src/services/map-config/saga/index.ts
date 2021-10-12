import { fork } from "redux-saga/effects";

import mapConfigLoadBlankSaga from "./map-config-load-blank";
import mapConfigLoadFileSaga from "./map-config-load-file";
import mapConfigLoadTemplateSaga from "./map-config-load-template";

export default function* mapConfigSaga() {
  yield fork(mapConfigLoadBlankSaga);
  yield fork(mapConfigLoadFileSaga);
  yield fork(mapConfigLoadTemplateSaga);
}
