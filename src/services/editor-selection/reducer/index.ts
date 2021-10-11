import { concatReducers } from "@/reducer/utils";

import entityDeleteReducer from "./entity-delete";
import selectClearReducer from "./select-clear";
import selectEntityReducer from "./select-entity";
import selectionDeleteReducer from "./selection-delete";

export default concatReducers(
  entityDeleteReducer,
  selectClearReducer,
  selectEntityReducer,
  selectionDeleteReducer
);
