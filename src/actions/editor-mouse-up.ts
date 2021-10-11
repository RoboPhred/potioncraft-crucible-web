import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_EDITOR_MOUSE_UP = "editor-mouse-up" as const;
export const editorMouseUp = (
  viewportPos: Point,
  modifierKeys: ModifierKeys
) => ({
  type: ACTION_EDITOR_MOUSE_UP,
  payload: { viewportPos, modifierKeys },
});
export type EditorMouseUpAction = ReturnType<typeof editorMouseUp>;
export function isEditorMouseUpAction(
  action: AnyAction
): action is EditorMouseUpAction {
  return action.type === ACTION_EDITOR_MOUSE_UP;
}
