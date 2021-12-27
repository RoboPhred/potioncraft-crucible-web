import { concatReducers } from "@/reducer/utils";

import packageDataSetByIdReducer from "./package-data-set-byid";
import packageDataSetReducer from "./package-data-set";
import packageIdObjectNewReducer from "./package-idobject-new";
import packageLoadErrorReducer from "./package-load-error";
import packageLoadFileReducer from "./package-load-file";
import packageNewReducer from "./package-new";
import packageReceiveReducer from "./package-receive";
import packageResourceSetById from "./package-resource-set-byid";

export default concatReducers(
  packageDataSetByIdReducer,
  packageDataSetReducer,
  packageIdObjectNewReducer,
  packageLoadErrorReducer,
  packageLoadFileReducer,
  packageNewReducer,
  packageReceiveReducer,
  packageResourceSetById
);
