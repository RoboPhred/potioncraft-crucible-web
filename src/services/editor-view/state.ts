export interface EditorViewState {
  viewportWidth: number;
  viewportHeight: number;
  offsetX: number;
  offsetY: number;
  zoomFactor: number;
}

const _defaultState: EditorViewState = {
  viewportWidth: 0,
  viewportHeight: 0,
  offsetX: 0,
  offsetY: 0,
  zoomFactor: 1,
};

export const defaultEditorViewState = Object.freeze(_defaultState);
