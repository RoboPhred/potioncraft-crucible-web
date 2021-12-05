import { concatReducers } from "@/reducer/utils";

import editorDamageReducer from "./editor-damage/reducer";
import editorMouseReducer from "./editor-mouse/reducer";
import editorSelectionReducer from "./editor-selection/reducer";
import editorViewReducer from "./editor-view/reducer";
import i18nReducer from "./i18n/reducer";
import mapConfigReducer from "./map-config/reducer";
import mapEntitiesReducer from "./map-entities/reducer";
import packageReducer from "./package/reducer";

export default concatReducers(
  editorDamageReducer,
  editorMouseReducer,
  editorSelectionReducer,
  editorViewReducer,
  i18nReducer,
  mapConfigReducer,
  mapEntitiesReducer,
  packageReducer
);
