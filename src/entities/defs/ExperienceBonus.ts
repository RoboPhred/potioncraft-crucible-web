import { ExperienceBonusMapEntity } from "@/services/map-config/entities";

import { EntityDef } from "../types";

const ExperienceBonusDef: EntityDef<ExperienceBonusMapEntity> = {
  hitRadius: 0.3,
  render(
    ctx: CanvasRenderingContext2D,
    entity: ExperienceBonusMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ) {
    ctx.beginPath();
    ctx.fillStyle = "green";
    tweakStyles(ctx);
    ctx.arc(0, 0, 0.3, 0, 2 * Math.PI);
    ctx.fill();
  },
};
export default ExperienceBonusDef;
