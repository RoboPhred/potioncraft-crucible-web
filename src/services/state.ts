import { I18NState, defaultI18NState } from "./i18n/state";
import { MapEditorState, defaultMapEditorState } from "./map-editor/state";
import { PackageState, defaultPackageState } from "./package/state";

export interface ServicesState {
  i18n: I18NState;
  mapEditor: MapEditorState;
  package: PackageState;
}

export const defaultServicesState: Readonly<ServicesState> = Object.freeze({
  i18n: defaultI18NState,
  mapEditor: defaultMapEditorState,
  package: defaultPackageState,
});
