import { fork } from "redux-saga/effects";

import editorCommitSaga from "./editor-commit";
import mapModifySaga from "./map-modify";
import mapEditorMapEditSaga from "./mapeditor-map-edit";

export default function* mapEditorSaga() {
  yield fork(editorCommitSaga);
  yield fork(mapModifySaga);
  yield fork(mapEditorMapEditSaga);
}
