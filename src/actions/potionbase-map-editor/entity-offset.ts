import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/arrays";

export const ACTION_MAPEDITOR_ENTITY_OFFSET =
  "mapeditor-entity-offset" as const;
export const mapEditorEntityOffset = (
  entityKeys: MaybeArray<string>,
  offsetX: number,
  offsetY: number
) => ({
  type: ACTION_MAPEDITOR_ENTITY_OFFSET,
  payload: {
    entityKeys: asArray(entityKeys),
    offsetX,
    offsetY,
  },
});
export type MapEditorEntityOffsetAction = ReturnType<
  typeof mapEditorEntityOffset
>;
export function isMapEditorEntityOffsetAction(
  action: AnyAction
): action is MapEditorEntityOffsetAction {
  return action.type === ACTION_MAPEDITOR_ENTITY_OFFSET;
}
