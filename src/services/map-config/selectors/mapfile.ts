import values from "lodash/values";

import { createMapEntitiesSelector } from "@/services/map-editor/entities/state-utils";

export const mapFileSelector = createMapEntitiesSelector((s) =>
  values(s.entitiesByKey)
);
