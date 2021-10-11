import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

import servicesReducer from "@/services/reducer";
import { finalizeReducerList } from "./utils";

const finalizedReducer = finalizeReducerList(servicesReducer);

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return finalizedReducer(state, action);
}
