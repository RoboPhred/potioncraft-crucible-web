import { concatReducers } from "@/reducer/utils";

import editorMouseReducer from "@/services/editor-mouse/reducer";
import editorSelectionReducer from "@/services/editor-selection/reducer";
import editorViewReducer from "@/services/editor-view/reducer";
import i18nReducer from "@/services/i18n/reducer";
import mapConfigReducer from "@/services/map-config/reducer";

export default concatReducers(
  editorMouseReducer,
  editorSelectionReducer,
  editorViewReducer,
  i18nReducer,
  mapConfigReducer
);
