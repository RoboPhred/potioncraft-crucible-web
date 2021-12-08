import { concatReducers } from "@/reducer/utils";

import packageDataSetByIdReducer from "./package-data-set-byid";
import packageDataSetReducer from "./package-data-set";
import packageLoadErrorReducer from "./package-load-error";
import packageLoadFileReducer from "./package-load-file";
import packageNewReducer from "./package-new";
import packageReceiveReducer from "./package-receive";

export default concatReducers(
  packageDataSetByIdReducer,
  packageDataSetReducer,
  packageLoadErrorReducer,
  packageLoadFileReducer,
  packageNewReducer,
  packageReceiveReducer
);
