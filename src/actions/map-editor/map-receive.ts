import { AnyAction } from "redux";

import { MapEntity } from "@/map-config";

export const ACTION_MAPEDITOR_MAP_RECEIVE = "mapeditor-map-receive" as const;
export const mapEditorMapReceive = (entities: MapEntity[]) => ({
  type: ACTION_MAPEDITOR_MAP_RECEIVE,
  payload: { entities },
});
export type MapEditorMapReceiveAction = ReturnType<typeof mapEditorMapReceive>;
export function isMapEditorMapReceiveAction(
  action: AnyAction
): action is MapEditorMapReceiveAction {
  return action.type === ACTION_MAPEDITOR_MAP_RECEIVE;
}
