import { Point, ZeroPoint } from "@/geometry";
import { ModifierKeys, MODIFIER_KEYS_NONE } from "@/modifier-keys";

export interface EditorMouseServiceState {
  currentGesture: null | "drag-select";
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