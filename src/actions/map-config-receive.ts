import { AnyAction } from "redux";

import { MapEntity } from "@/map-config";

export const ACTION_MAPFILE_RECEIVE = "receive-mapfile" as const;
export const mapConfigReceive = (entities: MapEntity[]) => ({
  type: ACTION_MAPFILE_RECEIVE,
  payload: { entities },
});
export type MapConfigReceiveAction = ReturnType<typeof mapConfigReceive>;
export function isMapConfigReceiveAction(
  action: AnyAction
): action is MapConfigReceiveAction {
  return action.type === ACTION_MAPFILE_RECEIVE;
}
