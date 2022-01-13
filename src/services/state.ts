import { I18NState, defaultI18NState } from "./i18n/state";
import { MapEditorState, defaultMapEditorState } from "./map-editor/state";
import { NavigationState, defaultNavigationState } from "./navigation/state";
import { PackageState, defaultPackageState } from "./package/state";

export interface ServicesState {
  i18n: I18NState;
  mapEditor: MapEditorState;
  navigation: NavigationState;
  package: PackageState;
}

export const defaultServicesState: Readonly<ServicesState> = Object.freeze({
  i18n: defaultI18NState,
  mapEditor: defaultMapEditorState,
  navigation: defaultNavigationState,
  package: defaultPackageState,
});
