import { MapEntity } from "./entities";

export type MapEntityPrototype<T extends MapEntity = MapEntity> = Omit<
  T,
  "x" | "y"
>;
