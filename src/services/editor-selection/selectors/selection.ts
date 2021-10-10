import { AppState } from "@/state";

export const isEntitySelectedSelector = (state: AppState, entityId: string) =>
  state.services.editorSelection.selectedEntityIds.includes(entityId);
