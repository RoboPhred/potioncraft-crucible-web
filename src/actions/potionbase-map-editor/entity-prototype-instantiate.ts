import { AnyAction } from "redux";
import { v4 as uuidV4 } from "uuid";

import { Point } from "@/geometry";
import { MapEntityPrototype } from "@/map-config";

export const ACTION_MAPEDITOR_ENTITY_PROTOTYPE_INSTANTIATE =
  "mapeditor-prototype-instantiate" as const;
export const mapEditorEntityPrototypeInstantiate = (
  prototype: MapEntityPrototype,
  worldPos: Point
) => ({
  type: ACTION_MAPEDITOR_ENTITY_PROTOTYPE_INSTANTIATE,
  payload: { prototype, worldPos, entityKey: uuidV4() },
});
export type MapEditorEntityPrototypeInstantiateAction = ReturnType<
  typeof mapEditorEntityPrototypeInstantiate
>;
export function isMapEditorEntityPrototypeInstantiateAction(
  action: AnyAction
): action is MapEditorEntityPrototypeInstantiateAction {
  return action.type === ACTION_MAPEDITOR_ENTITY_PROTOTYPE_INSTANTIATE;
}
