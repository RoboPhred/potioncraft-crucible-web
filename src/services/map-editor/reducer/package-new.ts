import { isPackageNewAction } from "@/actions/packages/package-new";

import { PRIORITY_PRE, reducerPriority } from "@/reducer/priorities";

import { defaultMapEditorState } from "../state";
import { createMapEditorReducer } from "../state-utils";

export default reducerPriority(
  PRIORITY_PRE,
  createMapEditorReducer((state, action) => {
    if (!isPackageNewAction(action)) {
      return state;
    }

    return defaultMapEditorState;
  })
);
