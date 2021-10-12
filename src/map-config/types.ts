import { MapEntity } from "./entities";

export interface MapConfig {
  entities: MapEntity[];
}

export type UnpositionedMapEntity<T extends MapEntity = MapEntity> = Omit<
  T,
  "x" | "y"
>;
