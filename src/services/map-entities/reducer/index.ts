import { concatReducers } from "@/reducer/utils";

import entityDeleteReducer from "./entity-delete";
import entityInsertReducer from "./entity-insert";
import entityOffsetReducer from "./entity-offset";
import prototypeInstantiateReducer from "./prototype-instantiate";
import receiveMapConfigReducer from "./receive-map-config";

export default concatReducers(
  entityDeleteReducer,
  entityInsertReducer,
  entityOffsetReducer,
  prototypeInstantiateReducer,
  receiveMapConfigReducer
);
