import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_SELECT_CLEAR = "mapeditor-select-clear" as const;
export const mapEditorSelectClear = () => ({
  type: ACTION_MAPEDITOR_SELECT_CLEAR,
});
export type MapEditorSelectClearAction = ReturnType<
  typeof mapEditorSelectClear
>;
export function isMapEditorSelectClearAction(
  action: AnyAction
): action is MapEditorSelectClearAction {
  return action.type === ACTION_MAPEDITOR_SELECT_CLEAR;
}
