import { AppState } from "@/state";

export const isEntitySelectedSelector = (state: AppState, entityKey: string) =>
  state.services.editorSelection.selectedEntityKeys.includes(entityKey);

export const selectedEntityKeysSelector = (state: AppState) =>
  state.services.editorSelection.selectedEntityKeys;
