import { concatReducers } from "@/reducer/utils";

import i18nReducer from "./i18n/reducer";
import mapConfigReducer from "./map-config/reducer";
import mapEditorReducer from "./map-editor/reducer";
import packageReducer from "./package/reducer";

export default concatReducers(
  i18nReducer,
  mapConfigReducer,
  mapEditorReducer,
  packageReducer
);
