import { AppState } from "@/state";

export const entitityKeysSelector = (state: AppState) =>
  Object.keys(state.services.mapConfig.entitiesByKey ?? {});

export const entityByKeySelector = (state: AppState, entityKey: string) =>
  state.services.mapConfig.entitiesByKey?.[entityKey];
