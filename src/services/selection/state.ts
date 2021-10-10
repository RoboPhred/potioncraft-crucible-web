export interface SelectionState {
  selectedEntityIds: string[];
}

const _defaultState: SelectionState = {
  selectedEntityIds: [],
};

export const defaultSelectionState = Object.freeze(_defaultState);
