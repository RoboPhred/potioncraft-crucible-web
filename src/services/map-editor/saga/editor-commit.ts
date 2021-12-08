import { put, select, takeLatest } from "redux-saga/effects";
import values from "lodash/values";

import {
  ACTION_EDITOR_COMMIT,
  EditorCommitAction,
} from "@/actions/editors/commit";
import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import { entitiesByKeySelector } from "../entities/selectors/entities";

import { editingPotionIdSelector } from "../selectors";

export default function* editorCommitSaga() {
  yield takeLatest(ACTION_EDITOR_COMMIT, handleEditorCommit);
}

function* handleEditorCommit(action: EditorCommitAction) {
  const potionId: ReturnType<typeof editingPotionIdSelector> = yield select(
    editingPotionIdSelector
  );
  if (potionId == null) {
    return;
  }

  const entities: ReturnType<typeof entitiesByKeySelector> = yield select(
    entitiesByKeySelector
  );

  yield put(
    packageDataSetById("potionBases", potionId, "mapEntities", values(entities))
  );
}
