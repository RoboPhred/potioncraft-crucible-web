import { v4 as uuidV4 } from "uuid";

import { TemplatesByName } from "@/map-templates";
import { MapEntity } from "@/map-config";

import { isMapEditorMapImportTemplateAction } from "@/actions/potionbase-map-editor/map-import-template";

import { createMapEntitiesReducer } from "../state-utils";
import { addToRegionContainer } from "../regions";

export default createMapEntitiesReducer((state, action) => {
  if (!isMapEditorMapImportTemplateAction(action)) {
    return state;
  }

  const { templateId } = action.payload;

  const entities = TemplatesByName[templateId];
  if (!entities) {
    return state;
  }

  const entitiesByKey: Record<string, MapEntity> = {};
  for (let entity of entities) {
    entitiesByKey[uuidV4()] = entity;
  }

  for (const entityKey of Object.keys(entitiesByKey)) {
    const entity = entitiesByKey[entityKey];
    state = addToRegionContainer(state, entity, entityKey);
  }

  return {
    ...state,
    entitiesByKey,
  };
});
