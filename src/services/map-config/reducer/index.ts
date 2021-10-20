import { concatReducers } from "@/reducer/utils";

import entityDeleteReducer from "../../map-entities/reducer/entity-delete";
import loadMapConfig from "./load-map-config";
import receiveMapConfig from "./receive-map-config";

export default concatReducers(
  entityDeleteReducer,
  loadMapConfig,
  receiveMapConfig
);
