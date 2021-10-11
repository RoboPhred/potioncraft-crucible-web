import { isEntityDeleteAction } from "@/actions/entity-delete";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer((state, action) => {
  if (!isEntityDeleteAction(action)) {
    return state;
  }

  const { entityKeys } = action.payload;

  return {
    ...state,
    selectedEntityKeys: state.selectedEntityKeys.filter(
      (x) => !entityKeys.includes(x)
    ),
  };
});
