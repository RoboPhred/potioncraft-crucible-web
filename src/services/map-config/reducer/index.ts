import { concatReducers } from "@/reducer/utils";

import entityDeleteReducer from "./entity-delete";
import entityInsertReducer from "./entity-insert";
import entityOffsetReducer from "./entity-offset";
import loadMapConfig from "./load-map-config";
import prototypeInstantiateReducer from "./prototype-instantiate";
import receiveMapConfig from "./receive-map-config";

export default concatReducers(
  entityDeleteReducer,
  entityInsertReducer,
  entityOffsetReducer,
  loadMapConfig,
  prototypeInstantiateReducer,
  receiveMapConfig
);
