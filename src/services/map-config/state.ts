import { MapEntity } from "./entities";

export interface MapConfigState {
  loadingStatus: "idle" | "loading" | "loaded" | "error";
  entitiesByKey: Record<string, MapEntity>;
  errorMessage: string | null;
}

const _defaultPCSaveState: MapConfigState = {
  loadingStatus: "idle",
  entitiesByKey: {},
  errorMessage: null,
};

export const defaultMapConfigState = Object.freeze(_defaultPCSaveState);
