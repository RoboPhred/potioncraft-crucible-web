import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/arrays";

export const ACTION_ENTITY_DELETE = "entity-delete" as const;
export const entityDelete = (entityKeys: MaybeArray<string>) => ({
  type: ACTION_ENTITY_DELETE,
  payload: {
    entityKeys: asArray(entityKeys),
  },
});
export type EntityDeleteAction = ReturnType<typeof entityDelete>;
export function isEntityDeleteAction(
  action: AnyAction
): action is EntityDeleteAction {
  return action.type === ACTION_ENTITY_DELETE;
}
