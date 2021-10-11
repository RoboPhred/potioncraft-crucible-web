import { Point } from "@/geometry";
import { AppState } from "@/state";

import { clientToWorld, worldToClient } from "../utils";

export const clientToWorldSelector = (state: AppState, p: Point) => {
  return clientToWorld(
    p,
    state.services.editorView.offsetX,
    state.services.editorView.offsetY,
    state.services.editorView.zoomFactor
  );
};

export const worldToClientSelector = (state: AppState, p: Point) => {
  return worldToClient(
    p,
    state.services.editorView.offsetX,
    state.services.editorView.offsetY,
    state.services.editorView.zoomFactor
  );
};
