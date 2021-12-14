import { MapEntity, MapEntityPrototype } from "@/map-config";

export type DropButtonEntityPrefab<T extends MapEntity = MapEntity> = {
  i18nKey: string;
} & MapEntityPrototype<T>;
