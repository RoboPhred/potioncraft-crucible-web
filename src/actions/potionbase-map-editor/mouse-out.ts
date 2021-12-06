import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_MOUSE_OUT = "mapeditor-mouse-out" as const;
export const mapEditorMouseOut = () => ({
  type: ACTION_MAPEDITOR_MOUSE_OUT,
});
export type MapEditorMouseOutAction = ReturnType<typeof mapEditorMouseOut>;
export function isMapEditorMouseOutAction(
  action: AnyAction
): action is MapEditorMouseOutAction {
  return action.type === ACTION_MAPEDITOR_MOUSE_OUT;
}
