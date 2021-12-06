import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_ZOOM = "mapeditor-zoom" as const;
export const mapEditorZoom = (zoomFactor: number) => ({
  type: ACTION_MAPEDITOR_ZOOM,
  payload: { zoomFactor },
});
export type MapEditorZoomAction = ReturnType<typeof mapEditorZoom>;
export function isMapEditorZoomAction(
  action: AnyAction
): action is MapEditorZoomAction {
  return action.type === ACTION_MAPEDITOR_ZOOM;
}
