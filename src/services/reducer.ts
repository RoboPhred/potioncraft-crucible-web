import { concatReducers } from "@/reducer/utils";

import editorDragReducer from "@/services/editor-drag/reducer";
import editorSelectionReducer from "@/services/editor-selection/reducer";
import editorViewReducer from "@/services/editor-view/reducer";
import i18nReducer from "@/services/i18n/reducer";
import mapConfigReducer from "@/services/map-config/reducer";

export default concatReducers(
  editorDragReducer,
  editorSelectionReducer,
  editorViewReducer,
  i18nReducer,
  mapConfigReducer
);
