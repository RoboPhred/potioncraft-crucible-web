import * as React from "react";

export function useBooleanSetState(
  defaultState: boolean = false
): [boolean, () => void, () => void] {
  const [state, setState] = React.useState(defaultState);

  const setTrue = React.useCallback(() => setState(true), []);
  const setFalse = React.useCallback(() => setState(false), []);

  return [state, setTrue, setFalse];
}
