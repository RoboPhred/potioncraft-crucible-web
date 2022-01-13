import { concatReducers } from "@/reducer/utils";

import i18nReducer from "./i18n/reducer";
import mapEditorReducer from "./map-editor/reducer";
import navigationReducer from "./navigation/reducer";
import packageReducer from "./package/reducer";

export default concatReducers(
  i18nReducer,
  mapEditorReducer,
  navigationReducer,
  packageReducer
);
