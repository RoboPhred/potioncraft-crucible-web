import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_VIEWPORT_RESIZE =
  "mapeditor-viewport-resize" as const;
export const mapEditorViewportResize = (width: number, height: number) => ({
  type: ACTION_MAPEDITOR_VIEWPORT_RESIZE,
  payload: { width, height },
});
export type MapEditorViewportResizeAction = ReturnType<
  typeof mapEditorViewportResize
>;
export function isMapEditorViewportResizeAction(
  action: AnyAction
): action is MapEditorViewportResizeAction {
  return action.type === ACTION_MAPEDITOR_VIEWPORT_RESIZE;
}
