import * as React from "react";
import { useDispatch } from "react-redux";

import { Point } from "@/geometry";

import { useSelector } from "@/hooks/use-selector";

import { getModifiers } from "@/modifier-keys";

import { clearSelection } from "@/actions/select-clear";
import { editorDragStartSelect } from "@/actions/editor-drag-start-select";
import { editorDragAbort } from "@/actions/editor-drag-abort";
import { editorDragContinue } from "@/actions/editor-drag-continue";
import { editorDragEnd } from "@/actions/editor-drag-end";

import { useMouseDragDetector } from "@/hooks/use-mouse-drag-detector";

import { dragSelectionRectSelector } from "@/services/editor-drag/selectors/drag-select";

import { useMouseCoords } from "../hooks/use-mouse-coords";
import { useViewportContext } from "../contexts/viewport-context";

const MouseLayer: React.FC = React.memo(function DragSelectLayer() {
  const dispatch = useDispatch();
  const { zoomFactor } = useViewportContext();
  function counterScale(value: number) {
    return value * (1 / zoomFactor);
  }

  const selectionRect = useSelector(dragSelectionRectSelector);

  const getCoords = useMouseCoords();

  const onClick = React.useCallback(
    (e: MouseEvent) => {
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

  const onDragStart = React.useCallback(
    (e: MouseEvent, originalPoint: Point) => {
      const p = getCoords(originalPoint);
      const modifierKeys = getModifiers(e);
      dispatch(editorDragStartSelect(p, modifierKeys));
    },
    [getCoords]
  );

  const { startTracking: onMouseDown } = useMouseDragDetector({
    onClick,
    onDragStart,
  });

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.buttons === 0) {
        // It would be nice if we could take a mouse capture and get notified
        // of the mouse up elsewhere, but we need to allow other circuit editors
        // to receive the mouse events so the drag can transfer.
        // As a second best, detect mouse up when it comes back into us and cancel.
        dispatch(editorDragAbort());
        return;
      }

      const coords = getCoords({ x: e.pageX, y: e.pageY });
      const modifierKeys = getModifiers(e);
      dispatch(editorDragContinue(coords, modifierKeys));
    },
    [getCoords]
  );

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      const coords = getCoords({ x: e.pageX, y: e.pageY });
      const modifierKeys = getModifiers(e);
      dispatch(editorDragEnd(coords, modifierKeys));
    },
    [dispatch, getCoords]
  );

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
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      {selectionRect && (
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
      )}
    </g>
  );
});

export default MouseLayer;
