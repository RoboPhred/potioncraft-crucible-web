import { AnyAction } from "redux";

import { AppState } from "@/state";

import { ACTION_MAPEDITOR_MOUSE_MOVE } from "@/actions/map-editor/mouse-move";
import { ACTION_MAPEDITOR_PAN } from "@/actions/map-editor/pan";
import { ACTION_MAPEDITOR_ZOOM } from "@/actions/map-editor/zoom";
import { ACTION_MAPEDITOR_RENDERED } from "@/actions/map-editor/rendered";
import { ACTION_EDITOR_COMMIT_QUEUE } from "@/actions/editors/commit-queue";

export const actionsBlacklist: string[] = [
  ACTION_MAPEDITOR_MOUSE_MOVE,
  ACTION_MAPEDITOR_PAN,
  ACTION_MAPEDITOR_ZOOM,
  ACTION_MAPEDITOR_RENDERED,
  ACTION_EDITOR_COMMIT_QUEUE,
];

export function actionSanitizer(action: AnyAction): AnyAction {
  return action;
}

export function stateSanitizer(state: AppState): any {
  return {
    ...state,
    services: {
      ...state.services,
      package: {
        ...state.services.package,
        resources: undefined,
      },
    },
  };
}
