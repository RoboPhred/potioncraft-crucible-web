import { Point } from "@/geometry";
import { ModifierKeys, MODIFIER_KEYS_NONE } from "@/modifier-keys";

export type EditorMouseTool = "pointer" | "eraser";
export type EditorMousePointerGesture = "pan" | "drag-select" | "drag-move";

export interface EditorMouseServiceState {
  currentTool: EditorMouseTool;
  toolRadius: number;
  currentPointerGesture: null | EditorMousePointerGesture;
  mouseDownViewportPos: Point | null;
  mouseViewportPos: Point | null;
  modifierKeys: ModifierKeys;
}

const _defaultState: EditorMouseServiceState = {
  currentTool: "pointer",
  toolRadius: 2,
  currentPointerGesture: null,
  mouseDownViewportPos: null,
  mouseViewportPos: null,
  modifierKeys: MODIFIER_KEYS_NONE,
};

export const defaultEditorMouseServiceState = Object.freeze(_defaultState);
