import { concatReducers } from "@/reducer/utils";

import panReducer from "./pan";
import viewportResizeReducer from "./viewport-resize";
import zoomReducer from "./zoom";

export default concatReducers(panReducer, viewportResizeReducer, zoomReducer);
