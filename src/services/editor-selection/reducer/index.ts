import { concatReducers } from "@/reducer/utils";

import selectClearReducer from "./select-clear";
import selectEntityReducer from "./select-entity";

export default concatReducers(selectClearReducer, selectEntityReducer);
