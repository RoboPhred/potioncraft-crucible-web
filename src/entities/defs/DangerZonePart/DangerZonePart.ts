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

    ctx.rotate(degreesToRadians(entity.angle));

    switch (entity.type) {
      case "Fang1":
        // 0.1226418, 0.400135
        ctx.fillRect(-0.06, -0.02, 0.12, 0.4);
        break;
      case "Fang2":
        // 0.1371522, 0.2445218
        ctx.fillRect(-0.065, -0.12, 0.13, 0.24);
        break;
      case "Bone1":
        // 0.1287996, 0.6983229
        ctx.fillRect(-0.06, -0.345, 0.12, 0.69);
        break;
      case "Bone2":
        // 0.1529365, 0.7249526
        ctx.fillRect(-0.07, -0.36, 0.14, 0.72);
        break;
      case "Skull1":
      default:
        ctx.arc(0, 0, 0.24, 0, 2 * Math.PI);
        break;
    }
    ctx.fill();

    const img = DangerZoneImages[entity.type];
    if (img) {
      const w = img.width / 130;
      const h = img.height / 130;
      ctx.scale(1, -1);
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
