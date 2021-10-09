import { I18NState, defaultI18NState } from "@/services/i18n/state";
import {
  MapConfigState,
  defaultMapConfigState,
} from "@/services/map-config/state";

export * from "./utils";

export interface AppState {
  services: {
    i18n: I18NState;
    mapConfig: MapConfigState;
  };
}

export const defaultAppState: Readonly<AppState> = {
  services: {
    i18n: defaultI18NState,
    mapConfig: defaultMapConfigState,
  },
};
Object.freeze(defaultAppState);
