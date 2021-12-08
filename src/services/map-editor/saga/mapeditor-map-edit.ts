import { put, select, takeLatest } from "redux-saga/effects";
import find from "lodash/find";

import history from "@/history";

import {
  ACTION_POTIONBASE_MAP_EDIT,
  PotionBaseMapEditAction,
} from "@/actions/potion-bases/map-edit";

import { packageDataSelector } from "@/services/package/selectors/package";
import { CruciblePackage } from "@/services/package/types";
import { mapEditorMapReceive } from "@/actions/map-editor/map-receive";

export default function* mapEditorMapEditSaga() {
  yield takeLatest(ACTION_POTIONBASE_MAP_EDIT, handleMapEdit);
}

function* handleMapEdit(action: PotionBaseMapEditAction) {
  const { potionBaseId } = action.payload;

  const pkg: CruciblePackage | null = yield select(packageDataSelector);
  if (!pkg) {
    return;
  }

  const potionBase = find(pkg.potionBases ?? [], (p) => p.id === potionBaseId);
  if (!potionBase) {
    return;
  }

  yield put(mapEditorMapReceive(potionBase.mapEntities ?? []));

  const path = `/potion-bases/${potionBaseId}/map-editor`;
  if (history.location.pathname !== path) {
    history.push(path);
  }
}
