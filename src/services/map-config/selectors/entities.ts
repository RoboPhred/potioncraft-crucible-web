import { createSelector } from "reselect";
import { AppState } from "@/state";
import { magnitude, Point, pointSubtract } from "@/geometry";
import { EntityDefsByType } from "@/entities";

export const entitityKeysSelector = createSelector(
  (state: AppState) => state.services.mapConfig.entitiesByKey,
  (entitiesByKey) => Object.keys(entitiesByKey)
);

export const entitiesByKeySelector = (state: AppState) =>
  state.services.mapConfig.entitiesByKey;

export const entityFromKeySelector = (state: AppState, entityKey: string) =>
  state.services.mapConfig.entitiesByKey?.[entityKey];

export const entityKeyAtPointSelector = (
  state: AppState,
  worldPoint: Point
) => {
  const entitiesByKey = entitiesByKeySelector(state);
  for (const key of Object.keys(entitiesByKey)) {
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
};

export const entityKeysAtPointSelector = (
  state: AppState,
  worldPoint: Point,
  radius: number = 0,
  ignoreHitRadius = false
) => {
  const entitiesByKey = entitiesByKeySelector(state);
  const keys = Object.keys(entitiesByKey);
  const result = [];
  for (const key of keys) {
    const entity = entitiesByKey[key];
    const type = EntityDefsByType[entity.entityType];
    if (!type) {
      continue;
    }

    const vec = pointSubtract(worldPoint, entity);
    if (magnitude(vec) <= (ignoreHitRadius ? 0 : type.hitRadius) + radius) {
      result.push(key);
    }
  }

  return result;
};
