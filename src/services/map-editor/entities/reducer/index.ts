import { concatReducers } from "@/reducer/utils";

import entityDeleteReducer from "./entity-delete";
import entityInsertReducer from "./entity-insert";
import entityOffsetReducer from "./entity-offset";
import mapClearReducer from "./map-clear";
import mapImportTemplateReducer from "./map-import-template";
import receiveMapConfigReducer from "./map-receive";
import prototypeInstantiateReducer from "./prototype-instantiate";

export default concatReducers(
  entityDeleteReducer,
  entityInsertReducer,
  entityOffsetReducer,
  mapClearReducer,
  mapImportTemplateReducer,
  receiveMapConfigReducer,
  prototypeInstantiateReducer
);
