import { concatReducers } from "@/reducer/utils";

import loadMapConfig from "./load-map-config";
import receiveMapConfig from "./receive-map-config";

export default concatReducers(loadMapConfig, receiveMapConfig);
