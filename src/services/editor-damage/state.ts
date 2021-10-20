import { Rectangle } from "@/geometry";

export interface EditorDamageState {
  damageWorldRect: Rectangle | null;
}

const _defaultState: EditorDamageState = {
  damageWorldRect: null,
};

export const defaultEditorDamageState = Object.freeze(_defaultState);
