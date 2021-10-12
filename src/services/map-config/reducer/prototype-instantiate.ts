import { isEntityPrototypeInstantiateAction } from "@/actions/entity-prototype-instantiate";
import { MapEntity } from "@/map-config";
import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer((state, action) => {
  if (!isEntityPrototypeInstantiateAction(action)) {
    return state;
  }

  const { prototype, worldPos, key } = action.payload;

  const entity = {
    ...prototype,
    x: worldPos.x,
    y: worldPos.y,
  } as MapEntity;

  return {
    ...state,
    entitiesByKey: {
      ...state.entitiesByKey,
      [key]: entity,
    },
  };
});
