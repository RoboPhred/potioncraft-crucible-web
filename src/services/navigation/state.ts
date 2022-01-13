import { emptyFrozenArray } from "@/arrays";

export interface NavigationState {
  expandedNavTreeValues: string[];
}

const _defaultState: NavigationState = {
  expandedNavTreeValues: emptyFrozenArray<string>(),
};

export const defaultNavigationState = Object.freeze(_defaultState);
