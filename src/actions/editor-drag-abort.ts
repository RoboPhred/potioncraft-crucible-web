import { AnyAction } from "redux";

export const ACTION_EDITOR_DRAG_ABORT = "editor-drag-abort" as const;
export const editorDragAbort = () => ({
  type: ACTION_EDITOR_DRAG_ABORT,
});
export type EditorDragAbortAction = ReturnType<typeof editorDragAbort>;
export function isEditorDragAbortAction(
  action: AnyAction
): action is EditorDragAbortAction {
  return action.type === ACTION_EDITOR_DRAG_ABORT;
}
