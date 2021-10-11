export * from "./utils";

import { ServicesState, defaultServicesState } from "@/services/state";

export interface AppState {
  services: ServicesState;
}

export const defaultAppState: Readonly<AppState> = Object.freeze({
  services: defaultServicesState,
});
