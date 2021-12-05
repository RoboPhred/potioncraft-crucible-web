import { put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { ACTION_MAPCONFIG_LOAD_BLANK } from "@/actions/map-config-load-blank";
import { mapConfigReceive } from "@/actions/map-config-receive";

export default function* mapConfigLoadBlank(): SagaIterator {
  yield takeEvery(ACTION_MAPCONFIG_LOAD_BLANK, handleMapConfigLoadBlank);
}

function* handleMapConfigLoadBlank(): SagaIterator {
  // TODO: Ask if unsaved changes.

  yield put(mapConfigReceive([]));
}
