import { createSelector } from "reselect";
import { AppState } from "@/state";
import {
  magnitude,
  Point,
  pointIntersectsRect,
  pointSubtract,
  Rectangle,
} from "@/geometry";
import { EntityDefsByType } from "@/entities";

import { createMapEntitiesSelector } from "../state-utils";
import { MapEntitiesState } from "../state";
import { getEntityKeysFromPoint, getEntityKeysFromRect } from "../regions";

export const entitiesByKeySelector = createMapEntitiesSelector(
  (state) => state.entitiesByKey
);

export const entitityKeysSelector = createSelector(
  entitiesByKeySelector,
  (entitiesByKey) => Object.keys(entitiesByKey)
);

export const entityFromKeySelector = (state: AppState, entityKey: string) =>
  entitiesByKeySelector(state)[entityKey];

export const entityKeyAtPointSelector = createMapEntitiesSelector(
  (state: MapEntitiesState, worldPoint: Point) => {
    const regionKeys = getEntityKeysFromPoint(state, worldPoint);

    const entitiesByKey = state.entitiesByKey;
    for (const key of regionKeys) {
      const entity = entitiesByKey[key];
      const type = EntityDefsByType[entity.entityType];
      if (!type) {
        continue;
      }

      const vec = pointSubtract(worldPoint, entity);
      if (magnitude(vec) <= type.hitRadius) {
        return key;
      }
    }

    return null;
  }
);

export const entityKeysAtPointSelector = (
  state: AppState,
  worldPoint: Point,
  radius: number = 0,
  ignoreHitRadius = false
) => {
  const mapEntitiesState = state.services.mapEditor.entities;
  const r: Rectangle = {
    p1: {
      x: worldPoint.x - radius,
      y: worldPoint.y - radius,
    },
    p2: {
      x: worldPoint.x + radius,
      y: worldPoint.y + radius,
    },
  };
  const regionKeys = getEntityKeysFromRect(mapEntitiesState, r);
  const result = [];
  for (const entityKey of regionKeys) {
    const entity = mapEntitiesState.entitiesByKey[entityKey];
    const type = EntityDefsByType[entity.entityType];
    if (!type) {
      continue;
    }

    const vec = pointSubtract(worldPoint, entity);
    if (magnitude(vec) <= (ignoreHitRadius ? 0 : type.hitRadius) + radius) {
      result.push(entityKey);
    }
  }

  return result;
};

export const entityKeysAtRectSelector = (state: AppState, rect: Rectangle) => {
  const mapEntitiesState = state.services.mapEditor.entities;
  const regionKeys = getEntityKeysFromRect(mapEntitiesState, rect);

  return regionKeys.filter((entityKey) =>
    pointIntersectsRect(mapEntitiesState.entitiesByKey[entityKey], rect)
  );
};
