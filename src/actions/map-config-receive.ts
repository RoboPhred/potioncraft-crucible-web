import { AnyAction } from "redux";

import { MapConfig } from "@/services/map-config/types";

export const ACTION_MAPFILE_RECEIVE = "receive-mapfile" as const;
export const mapConfigReceive = (mapConfig: MapConfig) => ({
  type: ACTION_MAPFILE_RECEIVE,
  payload: { mapConfig },
});
export type MapConfigReceiveAction = ReturnType<typeof mapConfigReceive>;
export function isMapConfigReceiveAction(
  action: AnyAction
): action is MapConfigReceiveAction {
  return action.type === ACTION_MAPFILE_RECEIVE;
}
