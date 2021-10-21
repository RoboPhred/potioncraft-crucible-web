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
  Acid: makeImg(require("./Acid.webp").default),
  Berserker: makeImg(require("./Berserker.webp").default),
  Bounce: makeImg(require("./Bounce.webp").default),
  Charm: makeImg(require("./Charm.webp").default),
  Crop: makeImg(require("./Crop.webp").default),
  Explosion: makeImg(require("./Explosion.webp").default),
  Fire: makeImg(require("./Fire.webp").default),
  Fly: makeImg(require("./Fly.webp").default),
  Frost: makeImg(require("./Frost.webp").default),
  Growth: makeImg(require("./Growth.webp").default),
  Hallucinations: makeImg(require("./Hallucinations.webp").default),
  Healing: makeImg(require("./Healing.webp").default),
  Invisibility: makeImg(require("./Invisibility.webp").default),
  Libido: makeImg(require("./Libido.webp").default),
  Light: makeImg(require("./Light.webp").default),
  Lightning: makeImg(require("./Lightning.webp").default),
  Mana: makeImg(require("./Mana.webp").default),
  Necromancy: makeImg(require("./Necromancy.webp").default),
  Poison: makeImg(require("./Poison.webp").default),
  SharpVision: makeImg(require("./SharpVision.webp").default),
  Sleep: makeImg(require("./Sleep.webp").default),
  SlowDown: makeImg(require("./SlowDown.webp").default),
  StoneSkin: makeImg(require("./StoneSkin.webp").default),
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
