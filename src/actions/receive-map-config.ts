import { AnyAction } from "redux";

import { MapConfig } from "@/services/map-config/types";

export const ACTION_MAPFILE_RECEIVE = "receive-mapfile" as const;
export const receiveMapConfig = (mapConfig: MapConfig) => ({
  type: ACTION_MAPFILE_RECEIVE,
  payload: { mapConfig },
});
export type ReceiveMapConfigAction = ReturnType<typeof receiveMapConfig>;
export function isReceiveMapConfigAction(
  action: AnyAction
): action is ReceiveMapConfigAction {
  return action.type === ACTION_MAPFILE_RECEIVE;
}
