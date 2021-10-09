import * as React from "react";

export interface ViewportContext {
  zoomFactor: number;
  zoom(factor: number): void;
}

const viewportContext = React.createContext<ViewportContext>({
  zoomFactor: 1,
  zoom: () => {
    /* no op */
  },
});

export function useViewportContext(): ViewportContext {
  return React.useContext(viewportContext);
}

const SCALE_FACTOR = 1.03;

export interface ViewportContextProviderProps {
  zoomFactor: number;
  setZoomFactor(value: number): void;
  children: React.ReactNode;
}

export const ViewportContextProvider = ({
  zoomFactor,
  setZoomFactor,
  children,
}: ViewportContextProviderProps) => {
  const zoom = React.useCallback(
    (delta: number) => {
      setZoomFactor(
        delta > 0
          ? zoomFactor * delta * SCALE_FACTOR
          : zoomFactor / (-delta * SCALE_FACTOR)
      );
    },
    [zoomFactor]
  );

  const context = React.useMemo<ViewportContext>(
    () => ({
      zoomFactor,
      zoom,
    }),
    [zoom, zoomFactor]
  );
  return (
    <viewportContext.Provider value={context}>
      {children}
    </viewportContext.Provider>
  );
};
