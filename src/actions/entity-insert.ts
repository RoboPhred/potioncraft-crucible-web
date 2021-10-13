import { AnyAction } from "redux";
import mapKeys from "lodash/mapKeys";
import { v4 as uuidV4 } from "uuid";

import { asArray, MaybeArray } from "@/arrays";
import { MapEntity } from "@/map-config";

export const ACTION_ENTITY_INSERT = "action-entity-insert";
export const entityInsert = (entity: MaybeArray<MapEntity>) => ({
  type: ACTION_ENTITY_INSERT,
  payload: { entities: mapKeys(asArray(entity), (x) => uuidV4()) },
});
export type EntityInsertAction = ReturnType<typeof entityInsert>;
export function isEntityInsertAction(
  action: AnyAction
): action is EntityInsertAction {
  return action.type === ACTION_ENTITY_INSERT;
}
