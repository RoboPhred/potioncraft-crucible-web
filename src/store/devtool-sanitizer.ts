import { AnyAction } from "redux";

import { AppState } from "@/state";

import { ACTION_EDITOR_MOUSE_MOVE } from "@/actions/editor-mouse-move";
import { ACTION_EDITOR_PAN } from "@/actions/editor-pan";
import { ACTION_EDITOR_ZOOM } from "@/actions/editor-zoom";

export const actionsBlacklist: string[] = [
  ACTION_EDITOR_MOUSE_MOVE,
  ACTION_EDITOR_PAN,
  ACTION_EDITOR_ZOOM,
];

export function actionSanitizer(action: AnyAction): AnyAction {
  return action;
}

export function stateSanitizer(state: AppState): any {
  return state;
}
