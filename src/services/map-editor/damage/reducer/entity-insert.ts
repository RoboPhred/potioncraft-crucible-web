import values from "lodash/values";

import { isMapEditorEntityInsertAction } from "@/actions/map-editor/entity-insert";
import { addPointToRect } from "@/geometry";

import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action) => {
  if (!isMapEditorEntityInsertAction(action)) {
    return state;
  }

  const { entities } = action.payload;

  const damageRect = values(entities).reduce((damageRect, entity) => {
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
});
