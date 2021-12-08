import { debounce, put } from "redux-saga/effects";

import { editorCommit } from "@/actions/editors/commit";
import { ACTION_EDITOR_COMMIT_QUEUE } from "@/actions/editors/commit-queue";

export default function* commitQueueSaga() {
  yield debounce(1000, ACTION_EDITOR_COMMIT_QUEUE, doCommit);
}

function* doCommit() {
  yield put(editorCommit());
}
