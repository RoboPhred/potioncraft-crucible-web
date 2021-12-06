import { Point } from "@/geometry";

import { EditorViewState } from "../state";
import { createEditorViewSelector } from "../state-utils";

import { clientToWorld, worldToClient } from "../utils";

export const clientToWorldSelector = createEditorViewSelector(
  (s: EditorViewState, p: Point) =>
    clientToWorld(p, s.offsetX, s.offsetY, s.zoomFactor)
);

export const worldToClientSelector = createEditorViewSelector(
  (s: EditorViewState, p: Point) =>
    worldToClient(p, s.offsetX, s.offsetY, s.zoomFactor)
);
