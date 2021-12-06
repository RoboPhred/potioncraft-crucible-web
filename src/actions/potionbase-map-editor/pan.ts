import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_PAN = "mapeditor-pan" as const;
export const mapEditorPan = (xOffset: number, yOffset: number) => ({
  type: ACTION_MAPEDITOR_PAN,
  payload: { x: xOffset, y: yOffset },
});
export type MapEditorPanAction = ReturnType<typeof mapEditorPan>;
export function isMapEditorPanAction(
  action: AnyAction
): action is MapEditorPanAction {
  return action.type === ACTION_MAPEDITOR_PAN;
}
