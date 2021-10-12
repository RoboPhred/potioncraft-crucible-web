import { VortexMapEntity } from "@/map-config";

import { EntityDef } from "../types";

const VortexDef: EntityDef<VortexMapEntity> = {
  hitRadius: 0.6,
  render(
    ctx: CanvasRenderingContext2D,
    entity: VortexMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ) {
    ctx.beginPath();
    ctx.fillStyle = "gray";
    tweakStyles(ctx);
    const size = entity.size == "VortexMedium" ? 0.5 : 0.6;
    ctx.arc(0, 0, size, 0, 2 * Math.PI);
    ctx.fill();
  },
};
export default VortexDef;
