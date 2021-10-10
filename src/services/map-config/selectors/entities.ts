import { createSelector } from "reselect";
import { AppState } from "@/state";

export const entitityKeysSelector = createSelector(
  (state: AppState) => state.services.mapConfig.entitiesByKey,
  (entitiesByKey) => Object.keys(entitiesByKey)
);

export const entitiesByKeySelector = (state: AppState) =>
  state.services.mapConfig.entitiesByKey;

export const entityFromKeySelector = (state: AppState, entityKey: string) =>
  state.services.mapConfig.entitiesByKey?.[entityKey];
