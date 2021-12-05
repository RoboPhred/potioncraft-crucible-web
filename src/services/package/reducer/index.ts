import { concatReducers } from "@/reducer/utils";

import packageLoadErrorReducer from "./package-load-error";
import packageLoadFileReducer from "./package-load-file";
import packageReceiveReducer from "./package-receive";

export default concatReducers(
  packageLoadErrorReducer,
  packageLoadFileReducer,
  packageReceiveReducer
);
