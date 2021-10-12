import { MapEntity } from "./entities";

export interface MapConfig {
  entities: MapEntity[];
}

export type MapEntityPrototype<T extends MapEntity = MapEntity> = Omit<
  T,
  "x" | "y"
>;
