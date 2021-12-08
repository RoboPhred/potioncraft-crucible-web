import { isPackageReceiveAction } from "@/actions/packages/package-receive";

import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { defaultMapEditorState } from "../state";
import { createMapEditorReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createMapEditorReducer((state, action) => {
    if (!isPackageReceiveAction(action)) {
      return state;
    }

    return defaultMapEditorState;
  })
);
