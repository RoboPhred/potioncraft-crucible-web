import { AnyAction } from "redux";

export const ACTION_EDITOR_VIEWPORT_RESIZE = "editor-viewport-resize" as const;
export const editorViewportResize = (width: number, height: number) => ({
  type: ACTION_EDITOR_VIEWPORT_RESIZE,
  payload: { width, height },
});
export type EditorViewportResizeAction = ReturnType<
  typeof editorViewportResize
>;
export function isEditorViewportResizeAction(
  action: AnyAction
): action is EditorViewportResizeAction {
  return action.type === ACTION_EDITOR_VIEWPORT_RESIZE;
}
