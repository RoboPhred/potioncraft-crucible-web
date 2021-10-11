import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/arrays";

export const ACTION_ENTITY_OFFSET = "entity-offset" as const;
export const entityOffset = (
  entityKeys: MaybeArray<string>,
  offsetX: number,
  offsetY: number
) => ({
  type: ACTION_ENTITY_OFFSET,
  payload: {
    entityKeys: asArray(entityKeys),
    offsetX,
    offsetY,
  },
});
export type EntityOffsetAction = ReturnType<typeof entityOffset>;
export function isEntityOffsetAction(
  action: AnyAction
): action is EntityOffsetAction {
  return action.type === ACTION_ENTITY_OFFSET;
}
