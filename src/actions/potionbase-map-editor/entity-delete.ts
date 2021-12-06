import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/arrays";

export const ACTION_MAPEDITOR_ENTITY_DELETE =
  "mapeditor-entity-delete" as const;
export const mapEditorEntityDelete = (entityKeys: MaybeArray<string>) => ({
  type: ACTION_MAPEDITOR_ENTITY_DELETE,
  payload: {
    entityKeys: asArray(entityKeys),
  },
});
export type MapEditorEntityDeleteAction = ReturnType<
  typeof mapEditorEntityDelete
>;
export function isMapEditorEntityDeleteAction(
  action: AnyAction
): action is MapEditorEntityDeleteAction {
  return action.type === ACTION_MAPEDITOR_ENTITY_DELETE;
}
