import * as React from "react";
import classNames from "classnames";

import { useSelector } from "@/hooks/use-selector";

import { viewportMousePosSelector } from "@/services/editor-mouse/selectors/viewport";

import styles from "./MapWidgets.module.css";

export interface MapWidgetsProps {
  className?: string;
}

const MapWidgets = ({ className }: MapWidgetsProps) => {
  const mousePos = useSelector(viewportMousePosSelector);

  if (!mousePos) {
    return null;
  }

  return (
    <svg
      className={classNames(className, styles["map-widgets"])}
      width="100%"
      height="100%"
    >
      {/* <circle cx={mousePos.x} cy={mousePos.y} r="5" fill="red" /> */}
    </svg>
  );
};

export default MapWidgets;
