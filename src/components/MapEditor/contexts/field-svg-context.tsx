import * as React from "react";

export interface MapEditorSvgContext {
  svgRef: React.RefObject<SVGSVGElement | null>;
  scalerRef: React.RefObject<SVGGraphicsElement | null>;
}
const nullRef = { current: null };
export const mapEditorSvgContext = React.createContext<MapEditorSvgContext>({
  svgRef: nullRef,
  scalerRef: nullRef,
});

const ContextProvider = mapEditorSvgContext.Provider;

export const MapEditorSvgProvider: React.FC<{
  svgRef: React.RefObject<SVGSVGElement | null>;
  scalerRef: React.RefObject<SVGGraphicsElement | null>;
}> = ({ svgRef, scalerRef, children }) => {
  const context = React.useMemo(
    () => ({
      svgRef,
      scalerRef,
    }),
    [svgRef, scalerRef]
  );
  return <ContextProvider value={context}>{children}</ContextProvider>;
};
