import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_TOOL_RADIUS_SET =
  "mapeditor-tool-radius-set" as const;
export const mapEditorToolRadiusSet = (radius: number) => ({
  type: ACTION_MAPEDITOR_TOOL_RADIUS_SET,
  payload: { radius },
});
export type MapEditorToolRadiusSetAction = ReturnType<
  typeof mapEditorToolRadiusSet
>;
export function isMapEditorToolRadiusSetAction(
  action: AnyAction
): action is MapEditorToolRadiusSetAction {
  return action.type === ACTION_MAPEDITOR_TOOL_RADIUS_SET;
}
