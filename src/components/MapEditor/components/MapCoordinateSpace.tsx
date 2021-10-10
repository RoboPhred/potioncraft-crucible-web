import * as React from "react";
import { Group } from "react-konva";

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
    <Group scaleX={zoomFactor} scaleY={zoomFactor}>
      <Group offsetX={offsetX - 60} offsetY={offsetY - 60}>
        <Group scaleY={-1}>{children}</Group>
      </Group>
    </Group>
  );
};

export default MapCoordinateSpace;