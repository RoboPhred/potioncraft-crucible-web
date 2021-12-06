import { EditorDamageState, defaultEditorDamageState } from "./damage/state";
import { MapEntitiesState, defaultMapEntityStates } from "./entities/state";
import {
  EditorMouseServiceState,
  defaultEditorMouseServiceState,
} from "./mouse/state";
import {
  EditorSelectionState,
  defaultEditorSelectionState,
} from "./selection/state";
import { EditorViewState, defaultEditorViewState } from "./view/state";

export interface MapEditorState {
  potionBaseId: string | null;
  damage: EditorDamageState;
  entities: MapEntitiesState;
  mouse: EditorMouseServiceState;
  selection: EditorSelectionState;
  view: EditorViewState;
}

const _defaultState: MapEditorState = {
  potionBaseId: null,
  damage: defaultEditorDamageState,
  entities: defaultMapEntityStates,
  mouse: defaultEditorMouseServiceState,
  selection: defaultEditorSelectionState,
  view: defaultEditorViewState,
};

export const defaultMapEditorState = Object.freeze(_defaultState);
