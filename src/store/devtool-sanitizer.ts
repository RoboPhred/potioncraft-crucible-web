import { AnyAction } from "redux";

import { AppState } from "@/state";

import { ACTION_MAPEDITOR_MOUSE_MOVE } from "@/actions/potionbase-map-editor/mouse-move";
import { ACTION_MAPEDITOR_PAN } from "@/actions/potionbase-map-editor/pan";
import { ACTION_MAPEDITOR_ZOOM } from "@/actions/potionbase-map-editor/zoom";
import { ACTION_MAPEDITOR_RENDERED } from "@/actions/potionbase-map-editor/rendered";

export const actionsBlacklist: string[] = [
  ACTION_MAPEDITOR_MOUSE_MOVE,
  ACTION_MAPEDITOR_PAN,
  ACTION_MAPEDITOR_ZOOM,
  ACTION_MAPEDITOR_RENDERED,
];

export function actionSanitizer(action: AnyAction): AnyAction {
  return action;
}

export function stateSanitizer(state: AppState): any {
  return state;
}
