import { MapEntity } from "@/map-config";

export type EntityTrayItemData<T extends MapEntity = MapEntity> = Omit<
  T,
  "x" | "y"
> & { i18nKey: string };
