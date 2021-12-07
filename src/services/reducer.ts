import { concatReducers } from "@/reducer/utils";

import i18nReducer from "./i18n/reducer";
import mapEditorReducer from "./map-editor/reducer";
import packageReducer from "./package/reducer";

export default concatReducers(i18nReducer, mapEditorReducer, packageReducer);
