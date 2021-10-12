import { MapEntityPrototype } from "@/map-config";

export const DRAGOBJECT_NEW_ENTITY = "entity-new" as const;
export const newEntityDragObject = (prototype: MapEntityPrototype) => ({
  type: DRAGOBJECT_NEW_ENTITY,
  payload: { prototype },
});
export type NewEntityDragObject = ReturnType<typeof newEntityDragObject>;
export function isNewEntityDragObject(item: any): item is NewEntityDragObject {
  return item.type === DRAGOBJECT_NEW_ENTITY;
}
