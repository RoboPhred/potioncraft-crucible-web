import values from "lodash/values";

import { AppState } from "@/state";

export const mapFileSelector = (state: AppState) => {
  return {
    entities: values(state.services.mapEntities.entitiesByKey),
  };
};
