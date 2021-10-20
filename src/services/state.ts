import {
  EditorDamageState,
  defaultEditorDamageState,
} from "./editor-damage/state";
import {
  EditorMouseServiceState,
  defaultEditorMouseServiceState,
} from "./editor-mouse/state";
import {
  EditorSelectionState,
  defaultEditorSelectionState,
} from "./editor-selection/state";
import { EditorViewState, defaultEditorViewState } from "./editor-view/state";
import { I18NState, defaultI18NState } from "./i18n/state";
import { MapConfigState, defaultMapConfigState } from "./map-config/state";
import { MapEntitiesState, defaultMapEntityStates } from "./map-entities/state";

export interface ServicesState {
  editorDamage: EditorDamageState;
  editorMouse: EditorMouseServiceState;
  editorSelection: EditorSelectionState;
  editorView: EditorViewState;
  i18n: I18NState;
  mapConfig: MapConfigState;
  mapEntities: MapEntitiesState;
}

export const defaultServicesState: Readonly<ServicesState> = Object.freeze({
  editorDamage: defaultEditorDamageState,
  editorMouse: defaultEditorMouseServiceState,
  editorSelection: defaultEditorSelectionState,
  editorView: defaultEditorViewState,
  i18n: defaultI18NState,
  mapConfig: defaultMapConfigState,
  mapEntities: defaultMapEntityStates,
});
