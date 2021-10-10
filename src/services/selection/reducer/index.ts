import { reduceReducers } from "@/store/utils";

import selectEntityReducer from "./select-entity";

export default reduceReducers(selectEntityReducer);
