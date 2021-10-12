import { AnyAction } from "redux";

import { TemplateName } from "@/map-templates";

export const ACTION_MAPCONFIG_LOAD_TEMPLATE =
  "mapconfig-load-template" as const;
export const mapConfigLoadTemplate = (templateName: TemplateName) => ({
  type: ACTION_MAPCONFIG_LOAD_TEMPLATE,
  payload: { templateName },
});
export type MapConfigLoadTemplateAction = ReturnType<
  typeof mapConfigLoadTemplate
>;
export function isMapConfigLoadTemplateAction(
  action: AnyAction
): action is MapConfigLoadTemplateAction {
  return action.type === ACTION_MAPCONFIG_LOAD_TEMPLATE;
}
