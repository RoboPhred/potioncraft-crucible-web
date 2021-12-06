import { AnyAction, Reducer } from "redux";
import get from "lodash/get";

import { AppState, defaultAppState } from "@/state";
import { fpSetByArray } from "@/fp-set";

export type ServiceKey = keyof AppState["services"];
export type SubServiceKey<T extends ServiceKey> = keyof AppState["services"][T];
export type ServiceState<TServiceKey extends ServiceKey> =
  AppState["services"][TServiceKey];
export type SubServiceState<
  TServiceKey extends ServiceKey,
  TSubServiceKey extends SubServiceKey<TServiceKey>
> = ServiceState<TServiceKey>[TSubServiceKey];

export interface ServiceReducer<TServiceState> {
  (
    state: Readonly<TServiceState>,
    action: AnyAction,
    appState: AppState
  ): TServiceState;
}

export function createServiceReducerCreator<TServiceKey extends ServiceKey>(
  service: TServiceKey
): (
  reducer: ServiceReducer<ServiceState<TServiceKey>>
) => Reducer<AppState, AnyAction>;
export function createServiceReducerCreator<
  TServiceKey extends ServiceKey,
  TSubServiceKey extends SubServiceKey<TServiceKey>
>(
  service: TServiceKey,
  service2: TSubServiceKey
): (
  reducer: ServiceReducer<SubServiceState<TServiceKey, TSubServiceKey>>
) => Reducer<AppState, AnyAction>;
export function createServiceReducerCreator(
  ...serviceKeys: string[]
): (reducer: ServiceReducer<any>) => Reducer<AppState, AnyAction> {
  return (reducer: ServiceReducer<any>) => {
    return (state: AppState = defaultAppState, action: AnyAction) => {
      const oldState = get(state.services, serviceKeys);
      const newState = reducer(oldState, action, state);
      if (oldState != newState) {
        return fpSetByArray(state, ["services", ...serviceKeys], newState);
      }
      return state;
    };
  };
}

export interface ServiceSelectorA0<TServiceState, TReturn> {
  (s: AppState): TReturn;
  local(s: TServiceState): TReturn;
}

export interface ServiceSelectorA1<TServiceState, TA1, TReturn> {
  (s: AppState, a1: TA1): TReturn;
  local(s: TServiceState, a1: TA1): TReturn;
}

export interface ServiceSelectorA2<TServiceState, TA1, TA2, TReturn> {
  (s: AppState, a1: TA1, a2: TA2): TReturn;
  local(s: TServiceState, a1: TA1, a2: TA2): TReturn;
}

export interface ServiceSelectorCreator<TServiceKey extends ServiceKey> {
  <TReturn>(
    selector: (s: ServiceState<TServiceKey>) => TReturn
  ): ServiceSelectorA0<ServiceState<TServiceKey>, TReturn>;
  <TA1, TReturn>(
    selector: (s: ServiceState<TServiceKey>, a1: TA1) => TReturn
  ): ServiceSelectorA1<ServiceState<TServiceKey>, TA1, TReturn>;
  <TA1, TA2, TReturn>(
    selector: (s: ServiceState<TServiceKey>, a1: TA1, a2: TA2) => TReturn
  ): ServiceSelectorA2<ServiceState<TServiceKey>, TA1, TA2, TReturn>;
}

export interface SubServiceSelectorCreator<
  TServiceKey extends ServiceKey,
  TSubServiceKey extends SubServiceKey<TServiceKey>
> {
  <TReturn>(
    selector: (s: SubServiceState<TServiceKey, TSubServiceKey>) => TReturn
  ): ServiceSelectorA0<SubServiceState<TServiceKey, TSubServiceKey>, TReturn>;
  <TA1, TReturn>(
    selector: (
      s: SubServiceState<TServiceKey, TSubServiceKey>,
      a1: TA1
    ) => TReturn
  ): ServiceSelectorA1<
    SubServiceState<TServiceKey, TSubServiceKey>,
    TA1,
    TReturn
  >;
  <TA1, TA2, TReturn>(
    selector: (
      s: SubServiceState<TServiceKey, TSubServiceKey>,
      a1: TA1,
      a2: TA2
    ) => TReturn
  ): ServiceSelectorA2<
    SubServiceState<TServiceKey, TSubServiceKey>,
    TA1,
    TA2,
    TReturn
  >;
}

export function createServiceSelectorCreator<TServiceKey extends ServiceKey>(
  service: TServiceKey
): ServiceSelectorCreator<TServiceKey>;
export function createServiceSelectorCreator<
  TServiceKey extends ServiceKey,
  TSubServiceKey extends SubServiceKey<TServiceKey>
>(
  service: TServiceKey,
  subService: TSubServiceKey
): SubServiceSelectorCreator<TServiceKey, TSubServiceKey>;
export function createServiceSelectorCreator<TServiceKey extends ServiceKey>(
  ...serviceKeys: string[]
): ServiceSelectorCreator<any> {
  return <TArgs, TReturn>(
    selector: (s: ServiceState<TServiceKey>, ...args: TArgs[]) => TReturn
  ) => {
    const appSelector: any = (s: AppState, ...args: TArgs[]) => {
      const state = get(s.services, serviceKeys);
      return selector(state, ...args);
    };
    appSelector.local = selector;
    return appSelector;
  };
}
