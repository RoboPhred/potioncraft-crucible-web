import {
  EditorDragServiceState,
  defaultEditorDragServiceState,
} from "@/services/editor-drag/state";
import { I18NState, defaultI18NState } from "@/services/i18n/state";
import {
  MapConfigState,
  defaultMapConfigState,
} from "@/services/map-config/state";
import {
  EditorSelectionState,
  defaultEditorSelectionState,
} from "@/services/editor-selection/state";

export * from "./utils";

export interface AppState {
  services: {
    editorDrag: EditorDragServiceState;
    editorSelection: EditorSelectionState;
    i18n: I18NState;
    mapConfig: MapConfigState;
  };
}

export const defaultAppState: Readonly<AppState> = {
  services: {
    editorDrag: defaultEditorDragServiceState,
    editorSelection: defaultEditorSelectionState,
    i18n: defaultI18NState,
    mapConfig: defaultMapConfigState,
  },
};
Object.freeze(defaultAppState);
