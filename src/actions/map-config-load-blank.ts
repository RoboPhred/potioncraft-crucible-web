import { AnyAction } from "redux";

export const ACTION_MAPCONFIG_LOAD_BLANK = "mapconfig-load-blank" as const;
export const mapConfigLoadBlank = () => ({
  type: ACTION_MAPCONFIG_LOAD_BLANK,
});
export type MapConfigLoadBlankAction = ReturnType<typeof mapConfigLoadBlank>;
export function isMapConfigLoadBlankAction(
  action: AnyAction
): action is MapConfigLoadBlankAction {
  return action.type === ACTION_MAPCONFIG_LOAD_BLANK;
}
