import { isNavtreeExpandedValuesSetAction } from "@/actions/navigation/navtree-expanded-set";

import { createNavigationReducer } from "../state-utils";

export default createNavigationReducer((state, action) => {
  if (!isNavtreeExpandedValuesSetAction(action)) {
    return state;
  }

  return {
    ...state,
    expandedNavTreeValues: action.payload.expandedValues,
  };
});
