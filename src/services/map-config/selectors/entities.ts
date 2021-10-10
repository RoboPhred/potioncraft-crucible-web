import { createSelector } from "reselect";
import { AppState } from "@/state";

export const entitityKeysSelector = createSelector(
  (state: AppState) => state.services.mapConfig.entitiesByKey,
  (entitiesByKey) => Object.keys(entitiesByKey)
);

export const entityByKeySelector = (state: AppState, entityKey: string) =>
  state.services.mapConfig.entitiesByKey?.[entityKey];
