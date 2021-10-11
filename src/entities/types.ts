import { MapEntity } from "@/services/map-config/entities";

export interface EntityDef<T extends MapEntity = MapEntity> {
  hitRadius: number;
  render(
    ctx: CanvasRenderingContext2D,
    entity: T,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ): void;
}
