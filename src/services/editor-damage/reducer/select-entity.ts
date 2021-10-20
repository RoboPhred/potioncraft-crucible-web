import { addPointToRect } from "@/geometry";

import { isSelectEntityAction } from "@/actions/select-entity";
import { entityFromKeySelector } from "@/services/map-entities/selectors/entities";

import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action, appState) => {
  if (!isSelectEntityAction(action)) {
    return state;
  }

  const { entityKeys } = action.payload;

  const damageRect = entityKeys.reduce((damageRect, entityKey) => {
    const entity = entityFromKeySelector(appState, entityKey);
    if (!entity) {
      return damageRect;
    }

    if (damageRect == null) {
      return {
        p1: { x: entity.x, y: entity.y },
        p2: { x: entity.x, y: entity.y },
      };
    } else {
      return addPointToRect(damageRect, entity);
    }
  }, state.damageWorldRect);

  return {
    ...state,
    damageWorldRect: damageRect,
  };
});
