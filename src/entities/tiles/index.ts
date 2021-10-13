import {
  calcSize,
  normalizeRectangle,
  Point,
  pointIntersectsRect,
  Rectangle,
} from "@/geometry";
import { MapEntity } from "@/map-config";

interface TileData {
  entities: MapEntity[];
}

const TileDataByType: Record<string, TileData> = {
  "danger-zone": require("./danger-zone.json"),
};

export function generateTileEntities(
  tileType: string,
  rect: Rectangle
): MapEntity[] {
  const data = TileDataByType[tileType];
  if (!data) {
    return [];
  }
  return tileEntities(data, rect);
}

function tileEntities(tileData: TileData, rect: Rectangle): MapEntity[] {
  rect = normalizeRectangle(rect);
  console.log("spawning tile at", rect);
  const { entities: tileEntities } = tileData;
  const tileBounds: Rectangle = {
    p1: {
      x: tileEntities.reduce((x, e) => Math.min(x, e.x), 0),
      y: tileEntities.reduce((y, e) => Math.min(y, e.y), 0),
    },
    p2: {
      x: tileEntities.reduce((x, e) => Math.max(x, e.x), 0),
      y: tileEntities.reduce((y, e) => Math.max(y, e.y), 0),
    },
  };

  const tileSize = calcSize(tileBounds);

  const entities: MapEntity[] = [];

  for (
    let tileXOrdinal = Math.floor(rect.p1.x / tileSize.width);
    tileXOrdinal <= Math.ceil(rect.p2.x / tileSize.width);
    tileXOrdinal++
  ) {
    for (
      let tileYOrdinal = Math.floor(rect.p1.y / tileSize.height);
      tileYOrdinal <= Math.ceil(rect.p2.y / tileSize.height);
      tileYOrdinal++
    ) {
      console.log("processing tile at", tileXOrdinal, tileYOrdinal);
      for (let i = 0; i < tileEntities.length; i++) {
        const tileEntity = tileEntities[i];
        const p: Point = {
          x: tileEntity.x + tileSize.width * tileXOrdinal,
          y: tileEntity.y + tileSize.height * tileYOrdinal,
        };
        if (!pointIntersectsRect(p, rect)) {
          continue;
        }
        entities.push({
          ...tileEntity,
          ...p,
        });
      }
    }
  }

  return entities;
}
