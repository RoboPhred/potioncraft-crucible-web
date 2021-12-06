import { addPointToRect } from "@/geometry";

import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { isMapEditorSelectEntityAction } from "@/actions/potionbase-map-editor/select-entity";
import { entityFromKeySelector } from "@/services/map-editor/entities/selectors/entities";
import { selectedEntityKeysSelector } from "@/services/map-editor/selection/selectors/selection";

import { createEditorDamageReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createEditorDamageReducer((state, action, appState) => {
    if (!isMapEditorSelectEntityAction(action)) {
      return state;
    }

    const { entityKeys } = action.payload;

    // Might need to re-render previously selected items to unselect them
    const selectedEntityKeys = selectedEntityKeysSelector(appState);

    let damageRect = selectedEntityKeys.reduce((damageRect, entityKey) => {
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

    damageRect = entityKeys.reduce((damageRect, entityKey) => {
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
    }, damageRect);

    return {
      ...state,
      damageWorldRect: damageRect,
    };
  })
);
