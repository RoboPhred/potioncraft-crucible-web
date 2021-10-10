import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/array";
import { SelectionMode } from "@/selection-mode";

export const ACTION_SELECT_ENTITY = "select-entity" as const;
export const selectEntity = (
  entityIds: MaybeArray<string>,
  mode: SelectionMode = "set"
) => ({
  type: ACTION_SELECT_ENTITY,
  payload: { entityIds: asArray(entityIds), mode },
});
export type SelectEntityAction = ReturnType<typeof selectEntity>;
export function isSelectEntityAction(
  action: AnyAction
): action is SelectEntityAction {
  return action.type === ACTION_SELECT_ENTITY;
}
