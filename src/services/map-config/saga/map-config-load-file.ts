import { put, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { MapConfig } from "@/map-config";

import {
  ACTION_MAPCONFIG_LOAD_FILE,
  MapConfigLoadFileAction,
} from "@/actions/map-config-load-file";
import { mapConfigReceive } from "@/actions/map-config-receive";

export default function* mapConfigLoadFileSaga(): SagaIterator {
  yield takeEvery(ACTION_MAPCONFIG_LOAD_FILE, handleMapConfigLoadFile);
}

function* handleMapConfigLoadFile(
  action: MapConfigLoadFileAction
): SagaIterator {
  const { file } = action.payload;

  // TODO: Ask if unsaved changes.

  // TODO: catch errors and report
  const text = yield call(() => file.text());

  const mapConfig = JSON.parse(text) as MapConfig;

  // TODO: Validate config

  yield put(mapConfigReceive(mapConfig));
}
