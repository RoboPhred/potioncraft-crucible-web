import { MapEntity } from "@/map-config";

export type EntityPrototype<T extends MapEntity = MapEntity> = Omit<
  T,
  "x" | "y"
> & { displayName: string };
