import { AnyAction } from "redux";

export const ACTION_EDITOR_ZOOM = "editor-zoom" as const;
export const editorZoom = (zoomFactor: number) => ({
  type: ACTION_EDITOR_ZOOM,
  payload: { zoomFactor },
});
export type EditorZoomAction = ReturnType<typeof editorZoom>;
export function isEditorZoomAction(
  action: AnyAction
): action is EditorZoomAction {
  return action.type === ACTION_EDITOR_ZOOM;
}
