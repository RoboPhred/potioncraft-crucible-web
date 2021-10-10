export interface EditorSelectionState {
  selectedEntityIds: string[];
}

const _defaultState: EditorSelectionState = {
  selectedEntityIds: [],
};

export const defaultEditorSelectionState = Object.freeze(_defaultState);
