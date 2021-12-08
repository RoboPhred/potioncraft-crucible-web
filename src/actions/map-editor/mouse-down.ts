import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_MAPEDITOR_MOUSE_DOWN = "mapeditor-mouse-down" as const;
export const mapEditorMouseDown = (
  viewportPos: Point,
  modifierKeys: ModifierKeys
) => ({
  type: ACTION_MAPEDITOR_MOUSE_DOWN,
  payload: { viewportPos, modifierKeys },
});
export type MapEditorMouseDownAction = ReturnType<typeof mapEditorMouseDown>;
export function isMapEditorMouseDownAction(
  action: AnyAction
): action is MapEditorMouseDownAction {
  return action.type === ACTION_MAPEDITOR_MOUSE_DOWN;
}
