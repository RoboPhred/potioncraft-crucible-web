import { DangerZonePartMapEntity } from "@/map-config";

import { EntityDef } from "../../types";

function makeImg(src: string): HTMLImageElement {
  const img = new Image();
  img.onerror = console.error.bind(console);
  img.src = src;
  return img;
}

const DangerZoneImages: Record<string, HTMLImageElement> = {
  Bone1: makeImg(require("./Bone1.png").default),
  Bone2: makeImg(require("./Bone2.png").default),
  Fang1: makeImg(require("./Fang1.png").default),
  Fang2: makeImg(require("./Fang2.png").default),
  Skull1: makeImg(require("./Skull1.png").default),
};

const DangerZonePartDef: EntityDef<DangerZonePartMapEntity> = {
  hitRadius: 0.2,
  render(
    ctx: CanvasRenderingContext2D,
    entity: DangerZonePartMapEntity,
    tweakStyles: (ctx: CanvasRenderingContext2D) => void
  ) {
    ctx.save();
    ctx.beginPath();

    ctx.fillStyle = "gray";

    tweakStyles(ctx);

    ctx.arc(0, 0, 0.2, 0, 2 * Math.PI);
    ctx.fill();

    const img = DangerZoneImages[entity.type];
    if (img) {
      const w = img.width / 170;
      const h = img.height / 170;
      ctx.rotate(degreesToRadians(180 - entity.angle));
      ctx.translate(-w / 2, -h / 2);
      ctx.drawImage(img, 0, 0, w, h);
    }
    ctx.restore();
  },
};
export default DangerZonePartDef;

function degreesToRadians(degress: number): number {
  return (degress * Math.PI) / 180;
}
