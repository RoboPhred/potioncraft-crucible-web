import { reduceReducers } from "@/store/utils";

import dragAbortReducer from "./drag-abort";
import dragContinueReducer from "./drag-continue";
import dragEndReducer from "./drag-end";
import dragStartSelectReducer from "./drag-start-select";

export default reduceReducers(
  dragAbortReducer,
  dragContinueReducer,
  dragEndReducer,
  dragStartSelectReducer
);
