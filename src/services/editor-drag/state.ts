import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export interface EditorDragServiceNullState {
  dragMode: null;
}

export interface EditorDragServiceActiveState {
  dragStart: Point;
  dragEnd: Point | null;
  dragModifierKeys: ModifierKeys;
}

export interface EditorDragServiceSelectionState
  extends EditorDragServiceActiveState {
  dragMode: "select";
}

export type EditorDragServiceState =
  | EditorDragServiceNullState
  | EditorDragServiceSelectionState;

const _defaultState: EditorDragServiceNullState = {
  dragMode: null,
};

export const defaultEditorDragServiceState = Object.freeze(_defaultState);
