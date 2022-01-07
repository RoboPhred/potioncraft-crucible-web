import { PotionEffectMapEntity } from "@/map-config";

import { POTION_RADIUS } from "../../consts";
import { EntityDef } from "../../types";

function makeImg(src: string): HTMLImageElement {
  const img = new Image();
  img.onerror = console.error.bind(console);
  img.src = src;
  return img;
}

const PotionEffectImages: Record<string, HTMLImageElement> = {
  Acid: makeImg(require("@/assets/PotionEffects/Acid.webp")),
  Berserker: makeImg(require("@/assets/PotionEffects/Berserker.webp")),
  Bounce: makeImg(require("@/assets/PotionEffects/Bounce.webp")),
  Charm: makeImg(require("@/assets/PotionEffects/Charm.webp")),
  Crop: makeImg(require("@/assets/PotionEffects/Crop.webp")),
  Explosion: makeImg(require("@/assets/PotionEffects/Explosion.webp")),
  Fire: makeImg(require("@/assets/PotionEffects/Fire.webp")),
  Fly: makeImg(require("@/assets/PotionEffects/Fly.webp")),
  Frost: makeImg(require("@/assets/PotionEffects/Frost.webp")),
  Growth: makeImg(require("@/assets/PotionEffects/Growth.webp")),
  Hallucinations: makeImg(
    require("@/assets/PotionEffects/Hallucinations.webp")
  ),
  Healing: makeImg(require("@/assets/PotionEffects/Healing.webp")),
  Invisibility: makeImg(require("@/assets/PotionEffects/Invisibility.webp")),
  Libido: makeImg(require("@/assets/PotionEffects/Libido.webp")),
  Light: makeImg(require("@/assets/PotionEffects/Light.webp")),
  Lightning: makeImg(require("@/assets/PotionEffects/Lightning.webp")),
  Mana: makeImg(require("@/assets/PotionEffects/Mana.webp")),
  Necromancy: makeImg(require("@/assets/PotionEffects/Necromancy.webp")),
  Poison: makeImg(require("@/assets/PotionEffects/Poison.webp")),
  SharpVision: makeImg(require("@/assets/PotionEffects/SharpVision.webp")),
  Sleep: makeImg(require("@/assets/PotionEffects/Sleep.webp")),
  SlowDown: makeImg(require("@/assets/PotionEffects/SlowDown.webp")),
  StoneSkin: makeImg(require("@/assets/PotionEffects/StoneSkin.webp")),
};

const PotionEffectDef: EntityDef<PotionEffectMapEntity> = {
  hitRadius: POTION_RADIUS,
  render(
    ctx: CanvasRenderingContext2D,
    entity: PotionEffectMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ) {
    ctx.save();

    ctx.fillStyle = "red";
    tweakStyles(ctx);

    ctx.beginPath();
    ctx.arc(0, 0, POTION_RADIUS, 0, 2 * Math.PI);
    ctx.rect(-0.2, POTION_RADIUS - 0.04, 0.4, 0.24);
    ctx.fill();

    const img = PotionEffectImages[entity.effect];
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
