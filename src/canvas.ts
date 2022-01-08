import { EntityDefsByType } from "./entities";
import { POTION_RADIUS } from "./entities/consts";
import { MapEntity } from "./map-config";
import { RenderResources } from "./services/map-entitiy-prototypes/types";

export function transformToMap(
  ctx: CanvasRenderingContext2D,
  zoomFactor: number,
  offsetX: number,
  offsetY: number,
  handler: () => void
) {
  ctx.save();
  ctx.scale(zoomFactor, zoomFactor);
  ctx.translate(-offsetX + 60, -offsetY + 60);
  ctx.scale(1, -1);

  handler();
  ctx.restore();
}

export function renderPotionStart(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.arc(0, 0, POTION_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
}

export function renderEntity(
  ctx: CanvasRenderingContext2D,
  entity: MapEntity,
  isSelected: boolean,
  renderResources: RenderResources
) {
  const type = EntityDefsByType[entity.entityType];
  if (!type) {
    return;
  }

  ctx.save();

  ctx.translate(entity.x, entity.y);
  type.render(
    ctx,
    entity,
    (ctx) => {
      if (isSelected) {
        ctx.fillStyle = "lightblue";
      }
    },
    renderResources
  );

  ctx.restore();
}
