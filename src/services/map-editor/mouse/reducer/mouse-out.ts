import { isMapEditorMouseOutAction } from "@/actions/map-editor/mouse-out";

import { defaultEditorMouseServiceState } from "../state";
import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isMapEditorMouseOutAction(action)) {
    return state;
  }

  return defaultEditorMouseServiceState;
});
