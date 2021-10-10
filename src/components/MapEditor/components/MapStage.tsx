import * as React from "react";
import { useDispatch } from "react-redux";

import { getModifiers } from "@/modifier-keys";
import { normalizeRectangle, Point } from "@/geometry";

import { useSelector } from "@/hooks/use-selector";
import { useMouseDragDetector } from "@/hooks/use-mouse-drag-detector";

import { editorDragEnd } from "@/actions/editor-drag-end";
import { editorDragContinue } from "@/actions/editor-drag-continue";
import { editorDragAbort } from "@/actions/editor-drag-abort";
import { editorDragStartSelect } from "@/actions/editor-drag-start-select";
import { clearSelection } from "@/actions/select-clear";

import {
  editorViewportHeightSelector,
  editorViewportWidthSelector,
} from "@/services/editor-view/selectors/viewport";
import { useClientToWorld } from "@/services/editor-view/hooks/use-client-to-world";
import { isDraggingSelector } from "@/services/editor-drag/selectors/drag";
import { entityKeysInViewSelector } from "@/services/editor-view/selectors/entities";
import { entitiesByKeySelector } from "@/services/map-config/selectors/entities";
import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "@/services/editor-view/selectors/view";
import { dragSelectionRectSelector } from "@/services/editor-drag/selectors/drag-select";
import { useWorldToClient } from "@/services/editor-view/hooks/use-world-to-client";

const MapStage = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const viewportWidth = useSelector(editorViewportWidthSelector);
  const viewportHeight = useSelector(editorViewportHeightSelector);
  const entitiesInView = useSelector(entityKeysInViewSelector);
  const entitiesByKey = useSelector(entitiesByKeySelector);
  const offsetX = useSelector(editorOffsetXSelector);
  const offsetY = useSelector(editorOffsetYSelector);
  const zoomFactor = useSelector(editorZoomFactorSelector);
  const selectionRect = useSelector(dragSelectionRectSelector);
  const isDragging = useSelector(isDraggingSelector);

  const dispatch = useDispatch();
  const clientToWorld = useClientToWorld();
  const worldToClient = useWorldToClient();

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

      const coords = clientToWorld({ x: e.clientX, y: e.clientY });
      const modifierKeys = getModifiers(e);
      dispatch(editorDragContinue(coords, modifierKeys));
    },
    [clientToWorld]
  );

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      const coords = clientToWorld({ x: e.clientX, y: e.clientY });
      const modifierKeys = getModifiers(e);
      dispatch(editorDragEnd(coords, modifierKeys));
    },
    [dispatch, clientToWorld]
  );

  React.useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!canvasRef.current) {
        return;
      }
      const ctx = canvasRef.current.getContext("2d")!;
      ctx.clearRect(0, 0, viewportWidth, viewportHeight);

      ctx.save();

      ctx.scale(zoomFactor, zoomFactor);
      ctx.translate(-offsetX + 60, -offsetY + 60);
      ctx.scale(1, -1);

      for (const key of entitiesInView) {
        const entity = entitiesByKey[key];

        ctx.beginPath();
        ctx.arc(entity.x, entity.y, 0.2, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.restore();

      if (selectionRect) {
        let r = {
          p1: worldToClient(selectionRect.p1),
          p2: worldToClient(selectionRect.p2),
        };
        r = normalizeRectangle(r);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.rect(r.p1.x, r.p1.y, r.p2.x - r.p1.x, r.p2.y - r.p1.y);
        ctx.fill();
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [entitiesInView, entitiesByKey, selectionRect]);

  return (
    <canvas
      ref={canvasRef}
      width={viewportWidth}
      height={viewportHeight}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default MapStage;
