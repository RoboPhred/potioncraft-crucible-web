import { AnyAction } from "redux";
import { v4 as uuidV4 } from "uuid";

import { Point } from "@/geometry";
import { MapEntityPrototype } from "@/map-config";

export const ACTION_ENTITY_PROTOTYPE_INSTANTIATE =
  "editor-prototype-instantiate" as const;
export const entityPrototypeInstantiate = (
  prototype: MapEntityPrototype,
  worldPos: Point
) => ({
  type: ACTION_ENTITY_PROTOTYPE_INSTANTIATE,
  payload: { prototype, worldPos, entityKey: uuidV4() },
});
export type EntityPrototypeInstantiateAction = ReturnType<
  typeof entityPrototypeInstantiate
>;
export function isEntityPrototypeInstantiateAction(
  action: AnyAction
): action is EntityPrototypeInstantiateAction {
  return action.type === ACTION_ENTITY_PROTOTYPE_INSTANTIATE;
}
