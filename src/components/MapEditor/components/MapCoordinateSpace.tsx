import * as React from "react";

import { useSelector } from "@/hooks/use-selector";

import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "@/services/editor-view/selectors/view";

export interface MapCoordinateSpaceProps {
  children: React.ReactNode;
}
const MapCoordinateSpace = ({ children }: MapCoordinateSpaceProps) => {
  const zoomFactor = useSelector(editorZoomFactorSelector);
  const offsetX = useSelector(editorOffsetXSelector);
  const offsetY = useSelector(editorOffsetYSelector);
  return (
    <g
      transform={`scale(${zoomFactor}) translate(60,60) translate(${-offsetX},${-offsetY}) scale(1,-1)`}
    >
      {children}
    </g>
  );
};

export default MapCoordinateSpace;
