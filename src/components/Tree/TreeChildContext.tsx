import * as React from "react";

import { emptyFrozenArray } from "@/arrays";

export interface TreeChildContext {
  expandedValues: string[];
  setExpandedValues(values: string[]): void;
}

function noop() {}

export const TreeChildContext = React.createContext<TreeChildContext>({
  expandedValues: emptyFrozenArray<string>(),
  setExpandedValues: noop,
});

export function useTreeChildContext() {
  return React.useContext(TreeChildContext);
}
