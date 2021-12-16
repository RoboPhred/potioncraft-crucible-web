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
  Acid: makeImg(require("./Acid.webp")),
  Berserker: makeImg(require("./Berserker.webp")),
  Bounce: makeImg(require("./Bounce.webp")),
  Charm: makeImg(require("./Charm.webp")),
  Crop: makeImg(require("./Crop.webp")),
  Explosion: makeImg(require("./Explosion.webp")),
  Fire: makeImg(require("./Fire.webp")),
  Fly: makeImg(require("./Fly.webp")),
  Frost: makeImg(require("./Frost.webp")),
  Growth: makeImg(require("./Growth.webp")),
  Hallucinations: makeImg(require("./Hallucinations.webp")),
  Healing: makeImg(require("./Healing.webp")),
  Invisibility: makeImg(require("./Invisibility.webp")),
  Libido: makeImg(require("./Libido.webp")),
  Light: makeImg(require("./Light.webp")),
  Lightning: makeImg(require("./Lightning.webp")),
  Mana: makeImg(require("./Mana.webp")),
  Necromancy: makeImg(require("./Necromancy.webp")),
  Poison: makeImg(require("./Poison.webp")),
  SharpVision: makeImg(require("./SharpVision.webp")),
  Sleep: makeImg(require("./Sleep.webp")),
  SlowDown: makeImg(require("./SlowDown.webp")),
  StoneSkin: makeImg(require("./StoneSkin.webp")),
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
