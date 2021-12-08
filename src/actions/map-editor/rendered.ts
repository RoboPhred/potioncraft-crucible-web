import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_RENDERED = "mapeditor-rendered" as const;
export const mapEditorRendered = () => ({
  type: ACTION_MAPEDITOR_RENDERED,
});
export function isMapEditorRenderedAction(action: AnyAction): boolean {
  return action.type === ACTION_MAPEDITOR_RENDERED;
}
