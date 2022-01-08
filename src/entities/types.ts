import { MapEntityPrototype } from "@/map-config";
import { RenderResources } from "@/services/map-entitiy-prototypes/types";

export interface EntityDef<T extends MapEntityPrototype = MapEntityPrototype> {
  hitRadius: number;
  render(
    ctx: CanvasRenderingContext2D,
    entity: T,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void,
    renderResources: RenderResources
  ): void;
}
