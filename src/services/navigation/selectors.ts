import { createNavigationSelector } from "./state-utils";

export const navtreeExpandedValuesSelector = createNavigationSelector(
  (state) => state.expandedNavTreeValues
);
