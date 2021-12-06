import * as React from "react";
import classNames from "classnames";

import { useSelector } from "@/hooks/use-selector";

import { viewportMousePosSelector } from "@/services/map-editor/mouse/selectors/viewport";
import {
  currentToolSelector,
  toolViewportRadiusSelector,
} from "@/services/map-editor/mouse/selectors/tools";
import { dragSelectionRectSelector } from "@/services/map-editor/mouse/selectors/drag-select";

import styles from "./MapWidgets.module.css";

export interface MapWidgetsProps {
  className?: string;
}

const MapWidgets = ({ className }: MapWidgetsProps) => {
  const selectionRect = useSelector(dragSelectionRectSelector);
  const mousePos = useSelector(viewportMousePosSelector);
  const toolRadius = useSelector(toolViewportRadiusSelector);
  const tool = useSelector(currentToolSelector);

  return (
    <svg
      className={classNames(className, styles["map-widgets"])}
      width="100%"
      height="100%"
    >
      {selectionRect && (
        <rect
          x={selectionRect.p1.x}
          y={selectionRect.p1.y}
          width={selectionRect.p2.x - selectionRect.p1.x}
          height={selectionRect.p2.y - selectionRect.p1.y}
          stroke="lightblue"
          strokeWidth={3}
          opacity={0.5}
          strokeDasharray="6,6"
        />
      )}
      {mousePos && (tool === "eraser" || tool === "paint-danger-zone") && (
        <circle
          cx={mousePos.x}
          cy={mousePos.y}
          r={toolRadius}
          stroke="lightblue"
          opacity={0.5}
          strokeWidth={3}
        />
      )}
    </svg>
  );
};

export default MapWidgets;
