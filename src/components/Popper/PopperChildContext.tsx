import * as React from "react";

export interface PopperChildContext {
  registerPopperChild(element: HTMLElement): void;
  unregisterPopperChild(element: HTMLElement): void;
}

function noop() {
  // no op.
}
const noopPopperChildContext: PopperChildContext = {
  registerPopperChild: noop,
  unregisterPopperChild: noop,
};

export const PopperChildContext =
  React.createContext<PopperChildContext | null>(null);

export const usePopperChildContext = () => React.useContext(PopperChildContext);

export const PopperChildContextProvider: React.FC<PopperChildContext> = ({
  registerPopperChild: contextRegister,
  unregisterPopperChild: contextUnregister,
  children,
}) => {
  const parent = usePopperChildContext();
  const parentRegister = parent?.registerPopperChild;
  const parentUnregister = parent?.unregisterPopperChild;

  const registerPopperChild = React.useCallback(
    (element: HTMLElement) => {
      if (parentRegister) {
        parentRegister(element);
      }
      contextRegister(element);
    },
    [contextRegister, parentRegister]
  );

  const unregisterPopperChild = React.useCallback(
    (element: HTMLElement) => {
      contextUnregister(element);
      if (parentUnregister) {
        parentUnregister;
      }
    },
    [contextUnregister, parentUnregister]
  );

  const providedContext = React.useMemo(
    () => ({
      registerPopperChild,
      unregisterPopperChild,
    }),
    [registerPopperChild, unregisterPopperChild]
  );

  return (
    <PopperChildContext.Provider value={providedContext}>
      {children}
    </PopperChildContext.Provider>
  );
};

export function usePopperChild(element: HTMLElement | null) {
  const popperContext =
    React.useContext(PopperChildContext) ?? noopPopperChildContext;

  // We do not want to trigger the effect when
  //  the context changes, as the context will change
  //  as a result of calling register and unregister.
  // As a result, we will not function right if somehow our
  //  element transfers to a different popup chain without re-rendering.
  const ctxRef = React.useRef(popperContext);
  React.useEffect(() => {
    ctxRef.current = popperContext;
  });

  React.useEffect(() => {
    if (element) {
      ctxRef.current.registerPopperChild(element);
      return () => ctxRef.current.unregisterPopperChild(element);
    }
  }, [element]);
}
