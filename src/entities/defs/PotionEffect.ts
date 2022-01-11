import { PotionEffectMapEntity } from "@/map-config";
import { RenderResources } from "@/services/map-editor/entities/types";

import { POTION_RADIUS } from "../consts";
import { EntityDef } from "../types";

interface ResourceCacheItem {
  image: HTMLImageElement;
  data: string;
}
const resourceCache: Record<string, ResourceCacheItem> = {};
function resourceToImage(
  resourceId: string,
  content: string
): HTMLImageElement {
  if (resourceCache[resourceId] && resourceCache[resourceId].data === content) {
    return resourceCache[resourceId].image;
  }

  const img = new Image();
  img.onerror = console.error.bind(console);
  img.src = content;
  resourceCache[resourceId] = {
    image: img,
    data: content,
  };
  return img;
}

function tryGetResourceImage(
  effectId: string,
  renderResources: RenderResources
): HTMLImageElement | null {
  const key = `potionEffect::${effectId}`;
  if (!renderResources[key]) {
    return null;
  }
  return resourceToImage(key, renderResources[key]);
}

const PotionEffectDef: EntityDef<PotionEffectMapEntity> = {
  hitRadius: POTION_RADIUS,
  render(
    ctx: CanvasRenderingContext2D,
    entity: PotionEffectMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void,
    renderResources: RenderResources
  ) {
    ctx.save();

    ctx.fillStyle = "red";
    tweakStyles(ctx);

    ctx.beginPath();
    ctx.arc(0, 0, POTION_RADIUS, 0, 2 * Math.PI);
    ctx.rect(-0.2, POTION_RADIUS - 0.04, 0.4, 0.24);
    ctx.fill();

    const img = tryGetResourceImage(entity.effect, renderResources);
    if (img) {
      const w = img.width / 30;
      const h = img.height / 30;
      ctx.scale(1, -1);
      ctx.translate(-w / 2, -h / 2);
      ctx.drawImage(img, 0, 0, w, h);
    }

    ctx.restore();
  },
};
export default PotionEffectDef;
