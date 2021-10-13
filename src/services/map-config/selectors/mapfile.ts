import values from "lodash/values";

import { createMapConfigSelector } from "../state-utils";

export const mapFileSelector = createMapConfigSelector((state) => {
  return {
    entities: values(state.entitiesByKey),
  };
});
