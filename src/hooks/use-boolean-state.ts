import * as React from "react";

export function useBooleanSetState(): [boolean, () => void, () => void] {
  const [state, setState] = React.useState(false);

  const setTrue = React.useCallback(() => setState(true), []);
  const setFalse = React.useCallback(() => setState(false), []);

  return [state, setTrue, setFalse];
}
