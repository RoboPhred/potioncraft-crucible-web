import { isMapEditorEntityPrototypeInstantiateAction } from "@/actions/potionbase-map-editor/entity-prototype-instantiate";
import { MapEntity } from "@/map-config";
import { addToRegionContainer } from "../regions";

import { createMapEntitiesReducer } from "../state-utils";

export default createMapEntitiesReducer((state, action) => {
  if (!isMapEditorEntityPrototypeInstantiateAction(action)) {
    return state;
  }

  const { prototype, worldPos, entityKey: key } = action.payload;

  const entity = {
    ...prototype,
    x: worldPos.x,
    y: worldPos.y,
  } as MapEntity;

  state = addToRegionContainer(state, entity, key);

  return {
    ...state,
    entitiesByKey: {
      ...state.entitiesByKey,
      [key]: entity,
    },
  };
});
