import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_EDITOR_DRAG_CONTINUE = "editor-drag-continue" as const;
export const editorDragContinue = (p: Point, modifierKeys: ModifierKeys) => ({
  type: ACTION_EDITOR_DRAG_CONTINUE,
  payload: { ...p, modifierKeys },
});
export type EditorDragContinueAction = ReturnType<typeof editorDragContinue>;
export function isEditorDragContinueAction(
  action: AnyAction
): action is EditorDragContinueAction {
  return action.type === ACTION_EDITOR_DRAG_CONTINUE;
}
