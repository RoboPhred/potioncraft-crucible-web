import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_SELECTION_DELETE =
  "mapeditor-selection-delete" as const;
export const mapEditorSelectionDelete = () => ({
  type: ACTION_MAPEDITOR_SELECTION_DELETE,
});
export type MapEditorSelectionDeleteAction = ReturnType<
  typeof mapEditorSelectionDelete
>;
export function isMapEditorSelectionDeleteAction(
  action: AnyAction
): action is MapEditorSelectionDeleteAction {
  return action.type === ACTION_MAPEDITOR_SELECTION_DELETE;
}
