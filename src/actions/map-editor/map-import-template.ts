import { AnyAction } from "redux";

import { TemplatesByName } from "@/map-templates";

export const ACTION_MAPEDITOR_MAP_IMPORT_TEMPLATE =
  "mapeditor-map-import-template" as const;
export const mapEditorMapImportTemplate = (
  templateId: keyof typeof TemplatesByName
) => ({
  type: ACTION_MAPEDITOR_MAP_IMPORT_TEMPLATE,
  payload: {
    templateId,
  },
});
export type MapEditorMapImportTemplateAction = ReturnType<
  typeof mapEditorMapImportTemplate
>;
export function isMapEditorMapImportTemplateAction(
  action: AnyAction
): action is MapEditorMapImportTemplateAction {
  return action.type === ACTION_MAPEDITOR_MAP_IMPORT_TEMPLATE;
}
