export interface NavigationState {
  expandedNavTreeValues: string[];
}

const _defaultState: NavigationState = {
  expandedNavTreeValues: ["home"],
};

export const defaultNavigationState = Object.freeze(_defaultState);
