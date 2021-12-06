import { isPackageLoadErrorAction } from "@/actions/packages/package-load-error";
import { createPackageReducer } from "../state-utils";

export default createPackageReducer((state, action) => {
  if (!isPackageLoadErrorAction(action)) {
    return state;
  }

  return {
    ...state,
    loadingStatus: "error",
    loadError: action.payload.errorMessage,
  };
});
