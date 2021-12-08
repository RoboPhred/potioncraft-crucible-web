import { addPointToRect } from "@/geometry";

import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { isMapEditorEntityOffsetAction } from "@/actions/map-editor/entity-offset";

import { entityFromKeySelector } from "@/services/map-editor/entities/selectors/entities";

import { createEditorDamageReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createEditorDamageReducer((state, action, appState) => {
    if (!isMapEditorEntityOffsetAction(action)) {
      return state;
    }

    const { entityKeys, offsetX, offsetY } = action.payload;

    const damageRect = entityKeys.reduce((damageRect, entityKey) => {
      const entity = entityFromKeySelector(appState, entityKey);
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
