import { DangerZonePartMapEntity } from "@/services/map-config/entities";

import { EntityDef } from "../types";

const DangerZonePartDef: EntityDef<DangerZonePartMapEntity> = {
  hitRadius: 0.2,
  render(
    ctx: CanvasRenderingContext2D,
    entity: DangerZonePartMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    tweakStyles(ctx);
    ctx.arc(0, 0, 0.2, 0, 2 * Math.PI);
    ctx.fill();
  },
};
export default DangerZonePartDef;
