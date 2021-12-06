import { createMapConfigSelector } from "../state-utils";

export const loadingStatusSelector = createMapConfigSelector(
  (s) => s.loadingStatus
);
