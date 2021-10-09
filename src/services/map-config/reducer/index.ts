import { reduceReducers } from "@/store/utils";

import loadPCSaveReducer from "./load-map-config";
import receivePCSaveReducer from "./receive-map-config";

export default reduceReducers(loadPCSaveReducer, receivePCSaveReducer);
