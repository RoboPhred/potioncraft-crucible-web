import cloneDeep from "lodash/cloneDeep";
import { put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import {
  ACTION_MAPCONFIG_LOAD_TEMPLATE,
  MapConfigLoadTemplateAction,
} from "@/actions/map-config-load-template";
import { mapEditorMapReceive } from "@/actions/potionbase-map-editor/map-receive";
import { TemplatesByName } from "@/map-templates";

export default function* mapConfigLoadTemplate(): SagaIterator {
  yield takeEvery(ACTION_MAPCONFIG_LOAD_TEMPLATE, handleMapConfigLoadTemplate);
}

function* handleMapConfigLoadTemplate(
  action: MapConfigLoadTemplateAction
): SagaIterator {
  const { templateName } = action.payload;

  // TODO: Ask if unsaved changes.

  const template = TemplatesByName[templateName];
  if (!template) {
    return;
  }

  yield put(mapEditorMapReceive(cloneDeep(template)));
}
