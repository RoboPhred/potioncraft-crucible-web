import { reduceReducers } from "@/store/utils";

import selectClearReducer from "./select-clear";
import selectEntityReducer from "./select-entity";

export default reduceReducers(selectClearReducer, selectEntityReducer);
