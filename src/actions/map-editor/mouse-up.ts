import { AnyAction } from "redux";

import { Point } from "@/geometry";
import { ModifierKeys } from "@/modifier-keys";

export const ACTION_MAPEDITOR_MOUSE_UP = "mapeditor-mouse-up" as const;
export const mapEditorMouseUp = (
  viewportPos: Point,
  modifierKeys: ModifierKeys
) => ({
  type: ACTION_MAPEDITOR_MOUSE_UP,
  payload: { viewportPos, modifierKeys },
});
export type MapEditorMouseUpAction = ReturnType<typeof mapEditorMouseUp>;
export function isMapEditorMouseUpAction(
  action: AnyAction
): action is MapEditorMouseUpAction {
  return action.type === ACTION_MAPEDITOR_MOUSE_UP;
}
