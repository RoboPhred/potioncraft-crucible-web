import { MapEntityPrototype } from "@/map-config";

export interface EntityDef<T extends MapEntityPrototype = MapEntityPrototype> {
  hitRadius: number;
  render(
    ctx: CanvasRenderingContext2D,
    entity: T,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ): void;
}
