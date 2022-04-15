import { put, takeLatest } from "redux-saga/effects";

import { ACTION_MAPEDITOR_ENTITY_DELETE } from "@/actions/map-editor/entity-delete";
import { ACTION_MAPEDITOR_ENTITY_INSERT } from "@/actions/map-editor/entity-insert";
import { ACTION_MAPEDITOR_ENTITY_OFFSET } from "@/actions/map-editor/entity-offset";
import { ACTION_MAPEDITOR_ENTITY_PROTOTYPE_INSTANTIATE } from "@/actions/map-editor/entity-prototype-instantiate";
import { ACTION_MAPEDITOR_MAP_CLEAR } from "@/actions/map-editor/map-clear";
import { ACTION_MAPEDITOR_MAP_IMPORT_TEMPLATE } from "@/actions/map-editor/map-import-template";
import { ACTION_MAPEDITOR_SELECTION_DELETE } from "@/actions/map-editor/selection-delete";
import { ACTION_MAPEDITOR_MOUSE_UP } from "@/actions/map-editor/mouse-up";

import { editorCommitQueue } from "@/actions/editors/commit-queue";

const MapModifyActions = [
  ACTION_MAPEDITOR_ENTITY_DELETE,
  ACTION_MAPEDITOR_ENTITY_INSERT,
  ACTION_MAPEDITOR_ENTITY_OFFSET,
  ACTION_MAPEDITOR_ENTITY_PROTOTYPE_INSTANTIATE,
  ACTION_MAPEDITOR_MAP_CLEAR,
  ACTION_MAPEDITOR_MAP_IMPORT_TEMPLATE,
  ACTION_MAPEDITOR_SELECTION_DELETE,
  ACTION_MAPEDITOR_MOUSE_UP,
];

export default function* mapModifySaga() {
  yield takeLatest(MapModifyActions, handleMapModified);
}

function* handleMapModified() {
  yield put(editorCommitQueue());
}
