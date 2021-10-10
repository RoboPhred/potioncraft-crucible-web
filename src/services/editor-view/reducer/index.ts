import { reduceReducers } from "@/store/utils";

import panReducer from "./pan";
import { viewportResizeReducer } from "./viewport-resize";
import { zoomReducer } from "./zoom";

export default reduceReducers(panReducer, viewportResizeReducer, zoomReducer);
