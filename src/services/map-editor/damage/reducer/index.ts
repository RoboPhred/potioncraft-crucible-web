import { concatReducers } from "@/reducer/utils";

import editorRenderedReducer from "./editor-rendered";
import editorViewportReducer from "./editor-viewport";
import entityDeleteReducer from "./entity-delete";
import entityInsertReducer from "./entity-insert";
import entityOffsetReducer from "./entity-offset";
import entityPrototypeInstantiateReducer from "./entity-prototype-instantiate";
import mapClearReducer from "./map-clear";
import mapImportTemplateReducer from "./map-import-template";
import mapReceiveReducer from "./map-receive";
import selectClearReducer from "./select-clear";
import selectEntityReducer from "./select-entity";

export default concatReducers(
  editorRenderedReducer,
  editorViewportReducer,
  entityDeleteReducer,
  entityInsertReducer,
  entityOffsetReducer,
  entityPrototypeInstantiateReducer,
  mapClearReducer,
  mapImportTemplateReducer,
  mapReceiveReducer,
  selectClearReducer,
  selectEntityReducer
);
