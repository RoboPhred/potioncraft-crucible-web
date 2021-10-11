import { isEntityDeleteAction } from "@/actions/entity-delete";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer((state, action) => {
  if (!isEntityDeleteAction(action)) {
    return state;
  }

  const { entityIds } = action.payload;

  return {
    ...state,
    selectedEntityIds: state.selectedEntityIds.filter(
      (x) => !entityIds.includes(x)
    ),
  };
});
