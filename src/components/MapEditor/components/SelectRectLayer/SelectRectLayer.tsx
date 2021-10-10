import * as React from "react";
import classNames from "classnames";

import { useSelector } from "@/hooks/use-selector";

import { dragSelectionRectSelector } from "@/services/editor-drag/selectors/drag-select";
import { useViewportContext } from "../../contexts/viewport-context";
import { normalizeRectangle, ZeroPoint } from "@/geometry";

import styles from "./SelectRectLayer.module.css";

export interface SelectRectLayerProps {
  className?: string;
}

const SelectRectLayer = ({ className }: SelectRectLayerProps) => {
  const { worldToClient } = useViewportContext();

  let selectionRect = useSelector(dragSelectionRectSelector);
  if (!selectionRect) {
    return null;
  }

  selectionRect = {
    p1: worldToClient(selectionRect?.p1 ?? ZeroPoint),
    p2: worldToClient(selectionRect?.p2 ?? ZeroPoint),
  };
  selectionRect = normalizeRectangle(selectionRect);

  return (
    <svg className={classNames(className, styles["select-rect-layer"])}>
      {selectionRect && (
        <rect
          x={selectionRect.p1.x}
          y={selectionRect.p1.y}
          width={selectionRect.p2.x - selectionRect.p1.x}
          height={selectionRect.p2.y - selectionRect.p1.y}
          strokeWidth={2}
          strokeDasharray="5,3"
          stroke="skyblue"
          fill="transparent"
        />
      )}
    </svg>
  );
};

export default SelectRectLayer;
