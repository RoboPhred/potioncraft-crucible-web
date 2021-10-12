import { UnpositionedMapEntity } from "@/map-config";

export interface EntityDef<
  T extends UnpositionedMapEntity = UnpositionedMapEntity
> {
  hitRadius: number;
  render(
    ctx: CanvasRenderingContext2D,
    entity: T,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ): void;
}
