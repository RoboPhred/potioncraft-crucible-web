import { isMapEditorEntityInsertAction } from "@/actions/potionbase-map-editor/entity-insert";

import { addToRegionContainer } from "../regions";

import { createMapEntitiesReducer } from "../state-utils";

export default createMapEntitiesReducer((state, action) => {
  if (!isMapEditorEntityInsertAction(action)) {
    return state;
  }

  const { entities } = action.payload;

  for (const entityKey of Object.keys(entities)) {
    const entity = entities[entityKey];
    state = addToRegionContainer(state, entity, entityKey);
  }

  return {
    ...state,
    entitiesByKey: {
      ...state.entitiesByKey,
      ...entities,
    },
  };
});
