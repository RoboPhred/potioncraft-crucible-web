import { MapEntity, MapEntityPrototype } from "@/map-config";

export type SpawnableEntityPrototype<T extends MapEntity = MapEntity> = {
  i18nKey?: string;
  displayName?: string;
} & MapEntityPrototype<T>;
