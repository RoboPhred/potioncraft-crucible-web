import * as React from "react";
import { useViewportContext } from "../contexts/viewport-context";

export interface MapCoordinateSpaceProps {
  children: React.ReactNode;
}
const MapCoordinateSpace = ({ children }: MapCoordinateSpaceProps) => {
  const { zoomFactor, translateX, translateY } = useViewportContext();
  return (
    <g
      transform={`scale(${zoomFactor}) translate(60,60) translate(${translateX},${translateY}) scale(1,-1)`}
    >
      {children}
    </g>
  );
};

export default MapCoordinateSpace;
