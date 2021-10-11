import * as React from "react";
import { useDispatch } from "react-redux";

import { getModifiers } from "@/modifier-keys";
import { normalizeRectangle, Point, Rectangle } from "@/geometry";

import { EntityDefsByType } from "@/entities";

import { useSelector } from "@/hooks/use-selector";
import { useMouseDragDetector } from "@/hooks/use-mouse-drag-detector";
import { useComponentBounds } from "@/hooks/use-component-bounds";

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
import { MapEntity } from "@/services/map-config/entities";
import { selectedEntityIdsSelector } from "@/services/editor-selection/selectors/selection";

const MapCanvas = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasBounds = useComponentBounds(canvasRef);
  const viewportWidth = useSelector(editorViewportWidthSelector);
  const viewportHeight = useSelector(editorViewportHeightSelector);
  const entitiesInView = useSelector(entityKeysInViewSelector);
  const entitiesByKey = useSelector(entitiesByKeySelector);
  const selectedEntityIds = useSelector(selectedEntityIdsSelector);
  const offsetX = useSelector(editorOffsetXSelector);
  const offsetY = useSelector(editorOffsetYSelector);
  const zoomFactor = useSelector(editorZoomFactorSelector);
  const selectionRect = useSelector(dragSelectionRectSelector);
  const isDragging = useSelector(isDraggingSelector);

  const dispatch = useDispatch();
  const clientToWorld = useClientToWorld();
  const worldToClient = useWorldToClient();

  const eventCanvasPoint = React.useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      return {
        x: e.clientX - canvasBounds.left,
        y: e.clientY - canvasBounds.top,
      };
    },
    [canvasBounds]
  );

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
      const p = clientToWorld({
        x: originalPoint.x - canvasBounds.left,
        y: originalPoint.y - canvasBounds.top,
      });
      const modifierKeys = getModifiers(e);
      dispatch(editorDragStartSelect(p, modifierKeys));
    },
    [clientToWorld, canvasBounds]
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

      const coords = clientToWorld(eventCanvasPoint(e));
      const modifierKeys = getModifiers(e);
      dispatch(editorDragContinue(coords, modifierKeys));
    },
    [clientToWorld, eventCanvasPoint]
  );

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) {
        return;
      }
      const coords = clientToWorld(eventCanvasPoint(e));
      const modifierKeys = getModifiers(e);
      dispatch(editorDragEnd(coords, modifierKeys));
    },
    [clientToWorld, eventCanvasPoint, isDragging]
  );

  React.useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d")!;

    clear(ctx);

    transformToMap(ctx, zoomFactor, offsetX, offsetY, () => {
      renderPotionStart(ctx);

      for (const key of entitiesInView) {
        const entity = entitiesByKey[key];
        const isSelected = selectedEntityIds.includes(key);
        renderEntity(ctx, entity, isSelected);
      }
    });

    if (selectionRect) {
      let r = {
        p1: worldToClient(selectionRect.p1),
        p2: worldToClient(selectionRect.p2),
      };
      r = normalizeRectangle(r);

      renderSelectionRect(ctx, r);
    }
  }, [entitiesInView, entitiesByKey, selectionRect, selectedEntityIds]);

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

function clear(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function transformToMap(
  ctx: CanvasRenderingContext2D,
  zoomFactor: number,
  offsetX: number,
  offsetY: number,
  handler: () => void
) {
  ctx.save();
  ctx.scale(zoomFactor, zoomFactor);
  ctx.translate(-offsetX + 60, -offsetY + 60);
  ctx.scale(1, -1);

  handler();
  ctx.restore();
}

function renderPotionStart(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.arc(0, 0, 0.5, 0, 2 * Math.PI);
  ctx.fill();
}

function renderEntity(
  ctx: CanvasRenderingContext2D,
  entity: MapEntity,
  isSelected: boolean
) {
  const type = EntityDefsByType[entity.entityType];
  if (!type) {
    return;
  }

  ctx.save();

  ctx.translate(entity.x, entity.y);
  type.render(ctx, entity, (ctx) => {
    if (isSelected) {
      ctx.fillStyle = "lightblue";
    }
  });

  ctx.restore();
}

function renderSelectionRect(ctx: CanvasRenderingContext2D, r: Rectangle) {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.rect(r.p1.x, r.p1.y, r.p2.x - r.p1.x, r.p2.y - r.p1.y);
  ctx.stroke();
}

export default MapCanvas;
