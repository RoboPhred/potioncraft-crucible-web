export interface EditorSelectionState {
  selectedEntityKeys: string[];
}

const _defaultState: EditorSelectionState = {
  selectedEntityKeys: [],
};

export const defaultEditorSelectionState = Object.freeze(_defaultState);
