import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_EDITOR_DRAG_END = "editor-drag-end" as const;
export const editorDragEnd = (p: Point, modifierKeys: ModifierKeys) => ({
  type: ACTION_EDITOR_DRAG_END,
  payload: { ...p, modifierKeys },
});
export type EditorDragEndAction = ReturnType<typeof editorDragEnd>;
export function isEditorDragEndAction(
  action: AnyAction
): action is EditorDragEndAction {
  return action.type === ACTION_EDITOR_DRAG_END;
}
