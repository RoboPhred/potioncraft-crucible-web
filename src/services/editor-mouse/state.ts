import { Point } from "@/geometry";
import { ModifierKeys, MODIFIER_KEYS_NONE } from "@/modifier-keys";

export interface EditorMouseServiceState {
  currentGesture: null | "pan" | "drag-select" | "drag-move";
  mouseDownViewportPos: Point | null;
  mouseViewportPos: Point | null;
  modifierKeys: ModifierKeys;
}

const _defaultState: EditorMouseServiceState = {
  currentGesture: null,
  mouseDownViewportPos: null,
  mouseViewportPos: null,
  modifierKeys: MODIFIER_KEYS_NONE,
};

export const defaultEditorMouseServiceState = Object.freeze(_defaultState);
