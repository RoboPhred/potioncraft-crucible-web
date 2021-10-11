import {
  EditorDragServiceState,
  defaultEditorDragServiceState,
} from "@/services/editor-drag/state";
import {
  EditorSelectionState,
  defaultEditorSelectionState,
} from "@/services/editor-selection/state";
import {
  EditorViewState,
  defaultEditorViewState,
} from "@/services/editor-view/state";
import { I18NState, defaultI18NState } from "@/services/i18n/state";
import {
  MapConfigState,
  defaultMapConfigState,
} from "@/services/map-config/state";

export interface ServicesState {
  editorDrag: EditorDragServiceState;
  editorSelection: EditorSelectionState;
  editorView: EditorViewState;
  i18n: I18NState;
  mapConfig: MapConfigState;
}

export const defaultServicesState: Readonly<ServicesState> = Object.freeze({
  editorDrag: defaultEditorDragServiceState,
  editorSelection: defaultEditorSelectionState,
  editorView: defaultEditorViewState,
  i18n: defaultI18NState,
  mapConfig: defaultMapConfigState,
});
