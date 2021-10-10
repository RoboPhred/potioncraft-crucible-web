import { createSelector } from "reselect";
import { AppState } from "@/state";

export const entityIdsSelector = createSelector(
  (state: AppState) => state.services.mapConfig.entitiesByKey,
  (entitiesByKey) => Object.keys(entitiesByKey)
);

export const entitiesByIdSelector = (state: AppState) =>
  state.services.mapConfig.entitiesByKey;

export const entityFromIdSelector = (state: AppState, entityKey: string) =>
  state.services.mapConfig.entitiesByKey?.[entityKey];
