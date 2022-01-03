import { VortexMapEntity } from "@/map-config";
import { VORTEX_LARGE, VORTEX_MEDIUM } from "../consts";

import { EntityDef } from "../types";

const VortexDef: EntityDef<VortexMapEntity> = {
  hitRadius: VORTEX_LARGE,
  render(
    ctx: CanvasRenderingContext2D,
    entity: VortexMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ) {
    ctx.beginPath();
    ctx.fillStyle = "gray";
    tweakStyles(ctx);
    const size = entity.prefab == "Medium" ? VORTEX_MEDIUM : VORTEX_LARGE;
    ctx.arc(0, 0, size, 0, 2 * Math.PI);
    ctx.fill();
  },
};
export default VortexDef;
