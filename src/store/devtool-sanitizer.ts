import { AnyAction } from "redux";

import { AppState } from "@/state";

import { ACTION_EDITOR_DRAG_CONTINUE } from "@/actions/editor-drag-continue";

export const actionsBlacklist: string[] = [ACTION_EDITOR_DRAG_CONTINUE];

export function actionSanitizer(action: AnyAction): AnyAction {
  return action;
}

export function stateSanitizer(state: AppState): any {
  return state;
}
