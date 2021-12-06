import { addPointToRect } from "@/geometry";

import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { isMapEditorSelectClearAction } from "@/actions/potionbase-map-editor/select-clear";

import { selectedEntityKeysSelector } from "@/services/map-editor/selection/selectors/selection";
import { entityFromKeySelector } from "@/services/map-editor/entities/selectors/entities";

import { createEditorDamageReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createEditorDamageReducer((state, action, appState) => {
    if (!isMapEditorSelectClearAction(action)) {
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
