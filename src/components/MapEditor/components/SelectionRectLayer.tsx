import * as React from "react";
import { Layer, Rect } from "react-konva";

import { normalizeRectangle, ZeroPoint } from "@/geometry";

import { useSelector } from "@/hooks/use-selector";

import { dragSelectionRectSelector } from "@/services/editor-drag/selectors/drag-select";
import { useWorldToClient } from "@/services/editor-view/hooks/use-world-to-client";

const SelectRectLayer = () => {
  const worldToClient = useWorldToClient();

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
    <Layer listening={false}>
      <Rect
        x={selectionRect.p1.x}
        y={selectionRect.p1.y}
        width={selectionRect.p2.x - selectionRect.p1.x}
        height={selectionRect.p2.y - selectionRect.p1.y}
        strokeWidth={2}
        strokeDasharray="5,3"
        stroke="skyblue"
        fill="transparent"
      />
    </Layer>
  );
};

export default SelectRectLayer;
