import { addPointToRect } from "@/geometry";

import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { isSelectClearAction } from "@/actions/select-clear";

import { selectedEntityKeysSelector } from "@/services/editor-selection/selectors/selection";
import { entityFromKeySelector } from "@/services/map-entities/selectors/entities";

import { createEditorDamageReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createEditorDamageReducer((state, action, appState) => {
    if (!isSelectClearAction(action)) {
      return state;
    }

    const selectedEntityKeys = selectedEntityKeysSelector(appState);

    const damageRect = selectedEntityKeys.reduce((damageRect, entityKey) => {
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
  })
);
