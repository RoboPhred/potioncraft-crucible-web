import { AnyAction } from "redux";

export const ACTION_MAPCONFIG_LOAD_FILE = "mapconfig-load-file" as const;
export const mapConfigLoadFile = (file: File) => ({
  type: ACTION_MAPCONFIG_LOAD_FILE,
  payload: { file },
});
export type MapConfigLoadFileAction = ReturnType<typeof mapConfigLoadFile>;
export function isMapConfigLoadFileAction(
  action: AnyAction
): action is MapConfigLoadFileAction {
  return action.type === ACTION_MAPCONFIG_LOAD_FILE;
}
