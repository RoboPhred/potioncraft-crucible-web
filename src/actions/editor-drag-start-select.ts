import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_EDITOR_DRAG_START_SELECT =
  "editor-drag-start-select" as const;
export const editorDragStartSelect = (
  p: Point,
  modifierKeys: ModifierKeys
) => ({
  type: ACTION_EDITOR_DRAG_START_SELECT,
  payload: {
    ...p,
    modifierKeys,
  },
});
export type EditorDragStartSelectAction = ReturnType<
  typeof editorDragStartSelect
>;
export function isEditorDragStartSelectAction(
  action: AnyAction
): action is EditorDragStartSelectAction {
  return action.type === ACTION_EDITOR_DRAG_START_SELECT;
}
