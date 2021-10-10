import { I18NState, defaultI18NState } from "@/services/i18n/state";
import {
  MapConfigState,
  defaultMapConfigState,
} from "@/services/map-config/state";
import {
  SelectionState,
  defaultSelectionState,
} from "@/services/selection/state";

export * from "./utils";

export interface AppState {
  services: {
    i18n: I18NState;
    mapConfig: MapConfigState;
    selection: SelectionState;
  };
}

export const defaultAppState: Readonly<AppState> = {
  services: {
    i18n: defaultI18NState,
    mapConfig: defaultMapConfigState,
    selection: defaultSelectionState,
  },
};
Object.freeze(defaultAppState);
