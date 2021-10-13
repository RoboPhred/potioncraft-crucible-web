import { fork } from "redux-saga/effects";

import mapConfigLoadBlankSaga from "./map-config-load-blank";
import mapConfigLoadFileSaga from "./map-config-load-file";
import mapConfigLoadTemplateSaga from "./map-config-load-template";
import mapConfigSaveSaga from "./map-config-save";

export default function* mapConfigSaga() {
  yield fork(mapConfigLoadBlankSaga);
  yield fork(mapConfigLoadFileSaga);
  yield fork(mapConfigLoadTemplateSaga);
  yield fork(mapConfigSaveSaga);
}
