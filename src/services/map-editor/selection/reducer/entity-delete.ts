import { isMapEditorEntityDeleteAction } from "@/actions/map-editor/entity-delete";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer((state, action) => {
  if (!isMapEditorEntityDeleteAction(action)) {
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
