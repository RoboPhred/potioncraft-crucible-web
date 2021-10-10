import * as React from "react";
import { useDispatch } from "react-redux";

import { Point } from "@/geometry";

import { useSelector } from "@/hooks/use-selector";

import { getModifiers } from "@/modifier-keys";

import { clearSelection } from "@/actions/select-clear";

import { useViewportContext } from "../contexts/viewport-context";

// import { useMouseCoords } from "../hooks/useMouseCoords";

const MouseLayer: React.FC = React.memo(function DragSelectLayer() {
  const dispatch = useDispatch();
  // const { zoomFactor } = useViewportContext();

  // const isDragging = useSelector((state) =>
  //   isEditorDraggingSelector(state, editorId)
  // );

  // const selectionRect = useSelector(selectionRectSelector);

  // function counterScale(value: number) {
  //   return value * (1 / zoomFactor);
  // }

  // const getCoords = useMouseCoords();

  const onClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) {
        return;
      }
      const modifiers = getModifiers(e);
      if (!modifiers.ctrlMetaKey && !modifiers.shiftKey) {
        dispatch(clearSelection());
      }
    },
    [dispatch]
  );

  // const onDragStart = React.useCallback(
  //   (e: MouseEvent, originalPoint: Point) => {
  //     const p = getCoords(originalPoint);
  //     const modifierKeys = getModifiers(e);
  //     dispatch(circuitEditorDragStartSelect(p, modifierKeys, editorId));
  //   },
  //   [dispatch, editorId, getCoords]
  // );

  // const { startTracking: onMouseDown } = useMouseDragDetector({
  //   onClick,
  //   onDragStart,
  // });

  return (
    <g className="map-editor-mouselayer">
      <rect
        /*
         Our width and height get scaled by the parent scaler.
         We have to be inside the parent scaler to make our mouse coordinate values match up.
         Scale us back out so we continue to cover the whole screen.
         */
        x={-60}
        y={-60}
        width={120}
        height={120}
        fill="transparent"
        // onMouseDown={onMouseDown}
        onClick={onClick}
      />
      {/* {isDragging && selectionRect && (
        <g
          transform={`translate(${selectionRect.p1.x}, ${selectionRect.p1.y})`}
        >
          <rect
            width={selectionRect.p2.x - selectionRect.p1.x}
            height={selectionRect.p2.y - selectionRect.p1.y}
            strokeWidth={counterScale(2)}
            strokeDasharray={`${counterScale(5)} ${counterScale(3)}`}
            stroke="skyblue"
            fill="transparent"
          />
        </g>
      )} */}
    </g>
  );
});

export default MouseLayer;
