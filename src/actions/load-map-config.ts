import { AnyAction } from "redux";

export const ACTION_MAPFILE_LOAD = "load-mapfile" as const;
export const loadMapConfig = (file: File) => ({
  type: ACTION_MAPFILE_LOAD,
  payload: { file },
});
export type LoadMapConfigAction = ReturnType<typeof loadMapConfig>;
export function isLoadMapConfigAction(
  action: AnyAction
): action is LoadMapConfigAction {
  return action.type === ACTION_MAPFILE_LOAD;
}
