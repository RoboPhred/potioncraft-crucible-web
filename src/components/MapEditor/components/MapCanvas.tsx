import * as React from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { getModifiers } from "@/modifier-keys";
import { Rectangle } from "@/geometry";
import { MapEntity } from "@/map-config";

import {
  DRAGOBJECT_NEW_ENTITY,
  isNewEntityDragObject,
} from "@/drag-items/new-entity";

import { EntityDefsByType } from "@/entities";
import { POTION_RADIUS } from "@/entities/consts";

import { useSelector } from "@/hooks/use-selector";
import { useComponentBounds } from "@/hooks/use-component-bounds";
import { editorMouseDown } from "@/actions/editor-mouse-down";
import { editorMouseMove } from "@/actions/editor-mouse-move";
import { editorMouseUp } from "@/actions/editor-mouse-up";
import { entityPrototypeInstantiate } from "@/actions/entity-prototype-instantiate";

import {
  editorViewportHeightSelector,
  editorViewportWidthSelector,
} from "@/services/editor-view/selectors/viewport";
import { useClientToWorld } from "@/services/editor-view/hooks/use-client-to-world";
import { entityKeysInViewSelector } from "@/services/editor-view/selectors/entities";
import { entitiesByKeySelector } from "@/services/map-config/selectors/entities";
import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "@/services/editor-view/selectors/view";
import { dragSelectionRectSelector } from "@/services/editor-mouse/selectors/drag-select";
import { selectedEntityKeysSelector } from "@/services/editor-selection/selectors/selection";
import { dragMoveOffsetSelector } from "@/services/editor-mouse/selectors/drag-move";

const MapCanvas = () => {
  const dispatch = useDispatch();

  const pointerRef = React.useRef<number | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasBounds = useComponentBounds(canvasRef);
  const viewportWidth = useSelector(editorViewportWidthSelector);
  const viewportHeight = useSelector(editorViewportHeightSelector);
  const entitiesInView = useSelector(entityKeysInViewSelector);
  const entitiesByKey = useSelector(entitiesByKeySelector);
  const selectedEntityKeys = useSelector(selectedEntityKeysSelector);
  const offsetX = useSelector(editorOffsetXSelector);
  const offsetY = useSelector(editorOffsetYSelector);
  const zoomFactor = useSelector(editorZoomFactorSelector);
  const selectionRect = useSelector(dragSelectionRectSelector);
  const dragMoveOffset = useSelector(dragMoveOffsetSelector);
  const clientToWorld = useClientToWorld();

  const eventCanvasPoint = React.useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      return {
        x: e.clientX - canvasBounds.left,
        y: e.clientY - canvasBounds.top,
      };
    },
    [canvasBounds]
  );

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (pointerRef.current !== null && pointerRef.current !== e.pointerId) {
        return;
      }
      pointerRef.current = e.pointerId;
      e.currentTarget.setPointerCapture(e.pointerId);

      const modifiers = getModifiers(e);
      const p = eventCanvasPoint(e);
      dispatch(editorMouseDown(p, modifiers));
    },
    [eventCanvasPoint]
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (pointerRef.current !== null && pointerRef.current !== e.pointerId) {
        return;
      }

      const modifiers = getModifiers(e);
      const p = eventCanvasPoint(e);
      dispatch(editorMouseMove(p, modifiers));
    },
    [eventCanvasPoint]
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (pointerRef.current !== null && pointerRef.current !== e.pointerId) {
        return;
      }

      e.currentTarget.releasePointerCapture(e.pointerId);
      pointerRef.current = null;

      const modifiers = getModifiers(e);
      const p = eventCanvasPoint(e);
      dispatch(editorMouseUp(p, modifiers));
    },
    [eventCanvasPoint]
  );

  const [_, dropRef] = useDrop(
    {
      accept: DRAGOBJECT_NEW_ENTITY,
      drop: (item, monitor) => {
        if (!isNewEntityDragObject(item)) {
          return;
        }

        const { prototype } = item.payload;

        const p = monitor.getClientOffset();
        if (!p) {
          return;
        }
        p.x -= canvasBounds.left;
        p.y -= canvasBounds.top;
        const worldP = clientToWorld(p);
        dispatch(entityPrototypeInstantiate(prototype, worldP));
      },
    },
    [clientToWorld, canvasBounds]
  );

  React.useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d")!;

    clear(ctx);

    transformToMap(ctx, zoomFactor, offsetX, offsetY, () => {
      ctx.beginPath();
      ctx.lineWidth = 0.2;
      ctx.setLineDash([2, 2]);
      ctx.moveTo(-60, -60);
      ctx.lineTo(-60, 60);
      ctx.lineTo(60, 60);
      ctx.lineTo(60, -60);
      ctx.lineTo(-60, -60);
      ctx.stroke();

      renderPotionStart(ctx);

      for (const key of entitiesInView) {
        const entity = entitiesByKey[key];
        const isSelected = selectedEntityKeys.includes(key);
        if (dragMoveOffset != null && isSelected) {
          continue;
        }
        renderEntity(ctx, entity, isSelected);
      }

      if (dragMoveOffset != null) {
        ctx.save();
        ctx.translate(dragMoveOffset.x, dragMoveOffset.y);
        for (const key of selectedEntityKeys) {
          const entity = entitiesByKey[key];
          renderEntity(ctx, entity, true);
        }
        ctx.restore();
      }
    });

    if (selectionRect) {
      renderSelectionRect(ctx, selectionRect);
    }
  }, [
    entitiesInView,
    entitiesByKey,
    selectionRect,
    selectedEntityKeys,
    dragMoveOffset,
  ]);

  return (
    <canvas
      ref={(ref) => {
        canvasRef.current = ref;
        dropRef(ref);
      }}
      width={viewportWidth}
      height={viewportHeight}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
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
  ctx.arc(0, 0, POTION_RADIUS, 0, 2 * Math.PI);
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
