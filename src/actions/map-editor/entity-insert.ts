import { AnyAction } from "redux";
import mapKeys from "lodash/mapKeys";
import { v4 as uuidV4 } from "uuid";

import { asArray, MaybeArray } from "@/arrays";
import { MapEntity } from "@/map-config";

export const ACTION_MAPEDITOR_ENTITY_INSERT = "mapeditor-entity-insert";
export const mapEditorEntityInsert = (entity: MaybeArray<MapEntity>) => ({
  type: ACTION_MAPEDITOR_ENTITY_INSERT,
  payload: { entities: mapKeys(asArray(entity), (x) => uuidV4()) },
});
export type MapEditorEntityInsertAction = ReturnType<
  typeof mapEditorEntityInsert
>;
export function isMapEditorEntityInsertAction(
  action: AnyAction
): action is MapEditorEntityInsertAction {
  return action.type === ACTION_MAPEDITOR_ENTITY_INSERT;
}
