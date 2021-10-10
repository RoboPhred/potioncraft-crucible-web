import { combineReducers, AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

import editorDragReducer from "@/services/editor-drag/reducer";
import editorSelectionReducer from "@/services/editor-selection/reducer";
import i18nReducer from "@/services/i18n/reducer";
import mapConfigReducer from "@/services/map-config/reducer";

const servicesReducer = combineReducers({
  editorDrag: editorDragReducer,
  editorSelection: editorSelectionReducer,
  i18n: i18nReducer,
  mapConfig: mapConfigReducer,
});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    services: servicesReducer(state.services, action),
  };
}
