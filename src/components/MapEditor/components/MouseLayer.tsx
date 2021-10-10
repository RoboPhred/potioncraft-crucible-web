import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Point } from "@/geometry";

import { getModifiers } from "@/modifier-keys";

import { clearSelection } from "@/actions/select-clear";
import { editorDragStartSelect } from "@/actions/editor-drag-start-select";
import { editorDragAbort } from "@/actions/editor-drag-abort";
import { editorDragContinue } from "@/actions/editor-drag-continue";
import { editorDragEnd } from "@/actions/editor-drag-end";

import { useMouseDragDetector } from "@/hooks/use-mouse-drag-detector";

import { isDraggingSelector } from "@/services/editor-drag/selectors/drag";
import { useClientToWorld } from "@/services/editor-view/hooks/use-client-to-world";

const MouseLayer = () => {
  const dispatch = useDispatch();
  const isDragging = useSelector(isDraggingSelector);
  const clientToWorld = useClientToWorld();

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
      const p = clientToWorld(originalPoint);
      const modifierKeys = getModifiers(e);
      dispatch(editorDragStartSelect(p, modifierKeys));
    },
    [clientToWorld]
  );

  const { startTracking: onMouseDown } = useMouseDragDetector({
    onClick,
    onDragStart,
  });

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && e.buttons === 0) {
        // It would be nice if we could take a mouse capture and get notified
        // of the mouse up elsewhere, but we need to allow other circuit editors
        // to receive the mouse events so the drag can transfer.
        // As a second best, detect mouse up when it comes back into us and cancel.
        dispatch(editorDragAbort());
        return;
      }

      const coords = clientToWorld({ x: e.pageX, y: e.pageY });
      const modifierKeys = getModifiers(e);
      dispatch(editorDragContinue(coords, modifierKeys));
    },
    [clientToWorld]
  );

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      const coords = clientToWorld({ x: e.pageX, y: e.pageY });
      const modifierKeys = getModifiers(e);
      dispatch(editorDragEnd(coords, modifierKeys));
    },
    [dispatch, clientToWorld]
  );

  return (
    <rect
      x={0}
      y={0}
      width="100%"
      height="100%"
      fill="transparent"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default MouseLayer;
