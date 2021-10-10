import { Point } from "@/geometry";
import * as React from "react";

export interface ViewportContext {
  zoomFactor: number;
  translateX: number;
  translateY: number;
  setZoomFactor(zoomFactor: number): void;
  offset(x: number, y: number): void;
  clientToWorld(p: Point): Point;
  worldToClient(p: Point): Point;
}

const viewportContext = React.createContext<ViewportContext>({
  zoomFactor: 1,
  translateX: 0,
  translateY: 0,
  setZoomFactor: () => {},
  offset: () => {},
  clientToWorld: () => ({ x: 0, y: 0 }),
  worldToClient: () => ({ x: 0, y: 0 }),
});

export function useViewportContext(): ViewportContext {
  return React.useContext(viewportContext);
}

export interface ViewportContextProviderProps {
  children: React.ReactNode;
}

export const ViewportContextProvider = ({
  children,
}: ViewportContextProviderProps) => {
  const [zoomFactor, setZoomFactor] = React.useState(1);
  const [translateX, setTranslateX] = React.useState(0);
  const [translateY, setTranslateY] = React.useState(0);
  const zoom = React.useCallback((delta: number) => {}, [zoomFactor]);
  const offset = React.useCallback(
    (x: number, y: number) => {
      setTranslateX(translateX + x);
      setTranslateY(translateY + y);
    },
    [translateX, translateY]
  );
  const clientToWorld = React.useCallback(
    (p: Point) => ({
      x: p.x / zoomFactor - 60,
      y: (p.y / zoomFactor - 60) * -1,
    }),
    [translateX, translateY, zoomFactor]
  );
  const worldToClient = React.useCallback(
    (p: Point) => ({
      x: (p.x + 60) * zoomFactor,
      y: (-p.y + 60) * zoomFactor,
    }),
    [translateX, translateY, zoomFactor]
  );

  const context = React.useMemo<ViewportContext>(
    () => ({
      zoomFactor,
      translateX,
      translateY,
      setZoomFactor,
      offset,
      clientToWorld,
      worldToClient,
    }),
    [zoom, zoomFactor, translateX, translateY]
  );
  return (
    <viewportContext.Provider value={context}>
      {children}
    </viewportContext.Provider>
  );
};
