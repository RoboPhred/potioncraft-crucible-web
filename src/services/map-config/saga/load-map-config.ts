import { put, call, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import {
  ACTION_MAPFILE_LOAD,
  LoadMapConfigAction,
} from "@/actions/load-map-config";
import { receiveMapConfig } from "@/actions/receive-map-config";
import { MapConfig } from "../types";

export default function* loadMapConfig(): SagaIterator {
  yield takeEvery(ACTION_MAPFILE_LOAD, handleMapConfigLoad);
}

function* handleMapConfigLoad(action: LoadMapConfigAction): SagaIterator {
  const { file } = action.payload;

  // TODO: catch errors and report
  const text = yield call(() => file.text());

  const mapConfig = JSON.parse(text) as MapConfig;

  // TODO: Validate config

  yield put(receiveMapConfig(mapConfig));
}
