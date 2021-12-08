import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_MAP_CLEAR = "mapeditor-map-clear" as const;
export const mapEditorMapClear = () => ({
  type: ACTION_MAPEDITOR_MAP_CLEAR,
});
export type MapEditorMapClearAction = ReturnType<typeof mapEditorMapClear>;
export function isMapEditorMapClearAction(
  action: AnyAction
): action is MapEditorMapClearAction {
  return action.type === ACTION_MAPEDITOR_MAP_CLEAR;
}
