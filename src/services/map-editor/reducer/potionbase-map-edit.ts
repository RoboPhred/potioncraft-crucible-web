import { isPotionBaseMapEditAction } from "@/actions/potionbase-edit-map";
import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { defaultMapEditorState } from "../state";
import { createMapEditorReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createMapEditorReducer((state, action) => {
    if (!isPotionBaseMapEditAction(action)) {
      return state;
    }

    const { potionBaseId } = action.payload;

    return {
      ...defaultMapEditorState,
      potionBaseId: potionBaseId,
    };
  })
);
