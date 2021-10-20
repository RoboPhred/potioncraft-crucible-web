import values from "lodash/values";

export * from "./types";
export * from "./defs";

import { EntityDefsByType } from "./defs";
export const LargestEntityRadius = values(EntityDefsByType).reduce(
  (x, def) => Math.max(x, def.hitRadius),
  0
);
