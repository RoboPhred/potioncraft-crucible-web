import { PotionEffectMapEntity } from "@/map-config";

import { EntityDef } from "../types";

const PotionEffectDef: EntityDef<PotionEffectMapEntity> = {
  hitRadius: 0.4,
  render(
    ctx: CanvasRenderingContext2D,
    entity: PotionEffectMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    tweakStyles(ctx);
    ctx.arc(0, 0, 0.4, 0, 2 * Math.PI);
    ctx.fill();
  },
};
export default PotionEffectDef;
