import { MapEntity } from "@/map-config";

import { MapRegionContainer, REGION_COUNT } from "./regions";

export interface MapEntitiesState extends MapRegionContainer {
  entitiesByKey: Record<string, MapEntity>;
}

const defaultRegion = Object.freeze({
  entityKeys: [],
});

const _defaultState: MapEntitiesState = {
  entitiesByKey: {},
  entityRegions: new Array(REGION_COUNT).fill(defaultRegion),
  outOfBoundsRegion: defaultRegion,
};

export const defaultMapEntityStates = Object.freeze(_defaultState);
