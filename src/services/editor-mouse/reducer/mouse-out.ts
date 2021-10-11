import { isEditorMouseOutAction } from "@/actions/editor-mouse-out";

import { defaultEditorMouseServiceState } from "../state";
import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isEditorMouseOutAction(action)) {
    return state;
  }

  return defaultEditorMouseServiceState;
});
