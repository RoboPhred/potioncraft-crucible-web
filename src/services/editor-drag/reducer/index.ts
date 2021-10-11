import { concatReducers } from "@/reducer/utils";

import dragAbortReducer from "./drag-abort";
import dragContinueReducer from "./drag-continue";
import dragEndReducer from "./drag-end";
import dragStartSelectReducer from "./drag-start-select";

export default concatReducers(
  dragAbortReducer,
  dragContinueReducer,
  dragEndReducer,
  dragStartSelectReducer
);
