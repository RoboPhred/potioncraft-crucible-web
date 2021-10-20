import { LargestEntityRadius } from "@/entities";
import { fpSet } from "@/fp-set";
import { Point, pointAdd, Rectangle } from "@/geometry";

export interface MapRegionContainer {
  entityRegions: MapRegion[];
  outOfBoundsRegion: MapRegion;
}

export interface MapRegion {
  entityKeys: string[];
}

const MAP_WIDTH = 120;
const MAP_HEIGHT = 120;
const REGION_WIDTH = 10;
const REGION_HEIGHT = 10;

const ORIGIN_OFFSET: Point = { x: 60, y: 60 };

export const REGION_COUNT =
  (MAP_WIDTH / REGION_WIDTH) * (MAP_HEIGHT / REGION_HEIGHT);

// FIXME: Entities can be in multiple regions due to their hit radius.  Widen the point and return multiple region indexes from here.
export function getRegionIndexsFromPoint(p: Point): number[] {
  const r = {
    p1: {
      x: p.x - LargestEntityRadius,
      y: p.y - LargestEntityRadius,
    },
    p2: {
      x: p.x + LargestEntityRadius,
      y: p.y + LargestEntityRadius,
    },
  };

  return getRegionIndexesFromRect(r);
}

export function getEntityKeysFromPoint(
  container: MapRegionContainer,
  p: Point
): string[] {
  const regionIndexes = getRegionIndexsFromPoint(p);
  const regionKeys: string[] = [];
  regionIndexes.forEach((regionIndex) => {
    if (regionIndex === -1) {
      regionKeys.push(...container.outOfBoundsRegion.entityKeys);
    } else {
      regionKeys.push(...container.entityRegions[regionIndex].entityKeys);
    }
  });

  return regionKeys;
}

export function getRegionIndexesFromRect(r: Rectangle): number[] {
  let { p1, p2 } = r;
  p1 = pointAdd(p1, ORIGIN_OFFSET);
  p2 = pointAdd(p2, ORIGIN_OFFSET);

  let x1 = Math.floor((p1.x - LargestEntityRadius) / REGION_WIDTH);
  let y1 = Math.floor((p1.y - LargestEntityRadius) / REGION_HEIGHT);
  let x2 = Math.floor((p2.x + LargestEntityRadius) / REGION_WIDTH);
  let y2 = Math.floor((p2.y + LargestEntityRadius) / REGION_HEIGHT);

  const indexes = [];

  let addedOOB = false;
  const addOOB = () => {
    if (addedOOB) {
      return;
    }
    indexes.push(-1);
    addedOOB = true;
  };

  if (x1 < 0) {
    x1 = 0;
    addOOB();
  }

  if (x2 < 0) {
    x2 = 0;
    addOOB();
  }

  if (x1 >= MAP_WIDTH / REGION_WIDTH) {
    x1 = MAP_WIDTH / REGION_WIDTH - 1;
    addOOB();
  }

  if (x2 >= MAP_WIDTH / REGION_WIDTH) {
    x2 = MAP_WIDTH / REGION_WIDTH - 1;
    addOOB();
  }

  if (y1 < 0) {
    y1 = 0;
    addOOB();
  }

  if (y2 < 0) {
    y2 = 0;
    addOOB();
  }

  if (y1 >= MAP_HEIGHT / REGION_HEIGHT) {
    y1 = MAP_HEIGHT / REGION_HEIGHT - 1;
    addOOB();
  }

  if (y2 >= MAP_HEIGHT / REGION_HEIGHT) {
    y2 = MAP_HEIGHT / REGION_HEIGHT - 1;
    addOOB();
  }

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      const index = x + y * (MAP_WIDTH / REGION_WIDTH);
      if (index >= REGION_COUNT) {
        console.log(
          `Tried to calculate index ${index} at ${x} ${y} but it is out of bounds ${REGION_COUNT}`
        );
      }
      indexes.push(index);
    }
  }

  return indexes;
}

export function getEntityKeysFromRect(
  container: MapRegionContainer,
  r: Rectangle
): string[] {
  const regionIndexes = getRegionIndexesFromRect(r);
  const regionKeys: string[] = [];
  regionIndexes.forEach((regionIndex) => {
    if (regionIndex === -1) {
      regionKeys.push(...container.outOfBoundsRegion.entityKeys);
    } else if (regionIndex >= container.entityRegions.length) {
      console.log(
        "!! regionIndex",
        regionIndex,
        "outside of limits",
        container.entityRegions.length
      );
    } else if (!container.entityRegions[regionIndex]) {
      console.log("Index in range but region is undefined!", regionIndex);
    } else {
      regionKeys.push(...container.entityRegions[regionIndex].entityKeys);
    }
  });

  return regionKeys;
}

export function addToRegionContainer<T extends MapRegionContainer>(
  container: T,
  p: Point,
  entityKey: string
) {
  const regionIndexes = getRegionIndexsFromPoint(p);
  return regionIndexes.reduce((container, regionIndex) => {
    if (regionIndex === -1) {
      return fpSet(container, "outOfBoundsRegion", (region) =>
        addToRegion(region, entityKey)
      );
    } else {
      return fpSet(container, "entityRegions", regionIndex, (region) =>
        addToRegion(region, entityKey)
      );
    }
  }, container);
}

export function removeFromRegionContainer<T extends MapRegionContainer>(
  container: T,
  p: Point,
  entityKey: string
) {
  const regionIndexes = getRegionIndexsFromPoint(p);
  return regionIndexes.reduce((container, regionIndex) => {
    if (regionIndex === -1) {
      return fpSet(container, "outOfBoundsRegion", (region) =>
        removeFromRegion(region, entityKey)
      );
    } else {
      return fpSet(container, "entityRegions", regionIndex, (region) =>
        removeFromRegion(region, entityKey)
      );
    }
  }, container);
}

function addToRegion(region: MapRegion, entityKey: string): MapRegion {
  return {
    ...region,
    entityKeys: [...region.entityKeys, entityKey],
  };
}

function removeFromRegion(region: MapRegion, entityKey: string): MapRegion {
  return {
    ...region,
    entityKeys: region.entityKeys.filter((x) => x !== entityKey),
  };
}
