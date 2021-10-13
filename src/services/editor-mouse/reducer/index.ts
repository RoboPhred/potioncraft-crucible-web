import { concatReducers } from "@/reducer/utils";

import mouseDownReducer from "./mouse-down";
import mouseMoveReducer from "./mouse-move";
import mouseOutReducer from "./mouse-out";
import mouseUpReducer from "./mouse-up";
import toolSetReducer from "./tool-set";

export default concatReducers(
  mouseDownReducer,
  mouseMoveReducer,
  mouseOutReducer,
  mouseUpReducer,
  toolSetReducer
);
