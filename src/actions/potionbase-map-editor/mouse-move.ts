import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_MAPEDITOR_MOUSE_MOVE = "mapeditor-mouse-move" as const;
export const mapEditorMouseMove = (
  viewportPos: Point,
  modifierKeys: ModifierKeys
) => ({
  type: ACTION_MAPEDITOR_MOUSE_MOVE,
  payload: { viewportPos, modifierKeys },
});
export type MapEditorMouseMoveAction = ReturnType<typeof mapEditorMouseMove>;
export function isMapEditorMouseMoveAction(
  action: AnyAction
): action is MapEditorMouseMoveAction {
  return action.type === ACTION_MAPEDITOR_MOUSE_MOVE;
}
