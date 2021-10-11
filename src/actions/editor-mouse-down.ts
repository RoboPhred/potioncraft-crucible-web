import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_EDITOR_MOUSE_DOWN = "editor-mouse-down" as const;
export const editorMouseDown = (
  viewportPos: Point,
  modifierKeys: ModifierKeys
) => ({
  type: ACTION_EDITOR_MOUSE_DOWN,
  payload: { viewportPos, modifierKeys },
});
export type EditorMouseDownAction = ReturnType<typeof editorMouseDown>;
export function isEditorMouseDownAction(
  action: AnyAction
): action is EditorMouseDownAction {
  return action.type === ACTION_EDITOR_MOUSE_DOWN;
}
