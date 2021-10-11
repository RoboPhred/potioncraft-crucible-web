import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_EDITOR_MOUSE_MOVE = "editor-mouse-move" as const;
export const editorMouseMove = (
  viewportPos: Point,
  modifierKeys: ModifierKeys
) => ({
  type: ACTION_EDITOR_MOUSE_MOVE,
  payload: { viewportPos, modifierKeys },
});
export type EditorMouseMoveAction = ReturnType<typeof editorMouseMove>;
export function isEditorMouseMoveAction(
  action: AnyAction
): action is EditorMouseMoveAction {
  return action.type === ACTION_EDITOR_MOUSE_MOVE;
}
