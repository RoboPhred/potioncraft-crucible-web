import { AnyAction } from "redux";

export const ACTION_NAVTREE_EXPANDEDVALUES_SET =
  "navtree-expandedvalues-set" as const;
export const navtreeExpandedValuesSet = (expandedValues: string[]) => ({
  type: ACTION_NAVTREE_EXPANDEDVALUES_SET,
  payload: { expandedValues },
});
export type NavtreeExpandedValuesSetAction = ReturnType<
  typeof navtreeExpandedValuesSet
>;
export function isNavtreeExpandedValuesSetAction(
  action: AnyAction
): action is NavtreeExpandedValuesSetAction {
  return action.type === ACTION_NAVTREE_EXPANDEDVALUES_SET;
}
