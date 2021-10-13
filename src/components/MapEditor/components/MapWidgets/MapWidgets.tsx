import * as React from "react";
import classNames from "classnames";

import { useSelector } from "@/hooks/use-selector";

import { viewportMousePosSelector } from "@/services/editor-mouse/selectors/viewport";
import {
  currentToolSelector,
  toolViewportRadiusSelector,
} from "@/services/editor-mouse/selectors/tools";

import styles from "./MapWidgets.module.css";

export interface MapWidgetsProps {
  className?: string;
}

const MapWidgets = ({ className }: MapWidgetsProps) => {
  const mousePos = useSelector(viewportMousePosSelector);
  const toolRadius = useSelector(toolViewportRadiusSelector);
  const tool = useSelector(currentToolSelector);

  return (
    <svg
      className={classNames(className, styles["map-widgets"])}
      width="100%"
      height="100%"
    >
      {mousePos && tool === "eraser" && (
        <circle
          cx={mousePos.x}
          cy={mousePos.y}
          r={toolRadius - 1.5}
          stroke="lightblue"
          opacity={0.5}
          strokeWidth={3}
        />
      )}
    </svg>
  );
};

export default MapWidgets;
