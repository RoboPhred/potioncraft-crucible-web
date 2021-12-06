import { isMapEditorEntityDeleteAction } from "@/actions/potionbase-map-editor/entity-delete";
import { addPointToRect } from "@/geometry";
import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";
import { entityFromKeySelector } from "@/services/map-editor/entities/selectors/entities";

import { createEditorDamageReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createEditorDamageReducer((state, action, appState) => {
    if (!isMapEditorEntityDeleteAction(action)) {
      return state;
    }

    const { entityKeys } = action.payload;

    const damageRect = entityKeys.reduce((damageRect, entityKey) => {
      const entity = entityFromKeySelector(appState, entityKey);
      if (damageRect == null) {
        return {
          p1: { x: entity.x, y: entity.y },
          p2: { x: entity.x, y: entity.y },
        };
      }
      return addPointToRect(damageRect, entity);
    }, state.damageWorldRect);

    return {
      ...state,
      damageWorldRect: damageRect,
    };
  })
);
