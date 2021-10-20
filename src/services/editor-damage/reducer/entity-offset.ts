import { isEntityOffsetAction } from "@/actions/entity-offset";
import { addPointToRect } from "@/geometry";
import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { createEditorDamageReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createEditorDamageReducer((state, action, appState) => {
    if (!isEntityOffsetAction(action)) {
      return state;
    }

    const { entityKeys, offsetX, offsetY } = action.payload;

    const damageRect = entityKeys.reduce((damageRect, entityKey) => {
      const entity = appState.services.mapConfig.entitiesByKey[entityKey];
      if (damageRect == null) {
        damageRect = {
          p1: { x: entity.x, y: entity.y },
          p2: { x: entity.x, y: entity.y },
        };
      } else {
        damageRect = addPointToRect(damageRect, entity);
      }

      return addPointToRect(damageRect, {
        x: entity.x + offsetX,
        y: entity.y + offsetY,
      });
    }, state.damageWorldRect);

    return {
      ...state,
      damageWorldRect: damageRect,
    };
  })
);
