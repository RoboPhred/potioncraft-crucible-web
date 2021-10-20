import * as React from "react";
import { useDispatch, useStore } from "react-redux";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { getModifiers } from "@/modifier-keys";
import { normalizeRectangle, pointIntersectsRect, Rectangle } from "@/geometry";
import { MapEntity } from "@/map-config";

import {
  DRAGOBJECT_NEW_ENTITY,
  isNewEntityDragObject,
} from "@/drag-items/new-entity";

import { EntityDefsByType, LargestEntityRadius } from "@/entities";
import { POTION_RADIUS } from "@/entities/consts";

import { useSelector } from "@/hooks/use-selector";
import { useComponentBounds } from "@/hooks/use-component-bounds";
import { editorMouseDown } from "@/actions/editor-mouse-down";
import { editorMouseMove } from "@/actions/editor-mouse-move";
import { editorMouseUp } from "@/actions/editor-mouse-up";
import { entityPrototypeInstantiate } from "@/actions/entity-prototype-instantiate";
import { editorModifierKeysChanged } from "@/actions/editor-modifierkeys-changed";
import { editorRendered } from "@/actions/editor-rendered";

import {
  editorViewportHeightSelector,
  editorViewportWidthSelector,
} from "@/services/editor-view/selectors/viewport";
import { useClientToWorld } from "@/services/editor-view/hooks/use-client-to-world";
import { entitiesByKeySelector } from "@/services/map-entities/selectors/entities";
import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "@/services/editor-view/selectors/view";
import { selectedEntityKeysSelector } from "@/services/editor-selection/selectors/selection";
import { dragMoveOffsetSelector } from "@/services/editor-mouse/selectors/drag-move";
import { editorDamageRectSelector } from "@/services/editor-damage/selector/damage";
import { worldToClientSelector } from "@/services/editor-view/selectors/coordinate-mapping";

import styles from "./MapCanvas.module.css";

export interface MapCanvasProps {
  className?: string;
}

const MapCanvas = ({ className }: MapCanvasProps) => {
  const dispatch = useDispatch();
  const store = useStore();

  const pointerRef = React.useRef<number | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasBounds = useComponentBounds(canvasRef);
  const viewportWidth = useSelector(editorViewportWidthSelector);
  const viewportHeight = useSelector(editorViewportHeightSelector);

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

  const onMouseEnter = React.useCallback(() => {
    canvasRef.current?.focus();
  }, []);

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

  const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    const modifiers = getModifiers(e);
    dispatch(editorModifierKeysChanged(modifiers));
    if (e.key === "Alt") {
      e.preventDefault();
    }
  }, []);

  const onKeyUp = React.useCallback((e: React.KeyboardEvent) => {
    const modifiers = getModifiers(e);
    dispatch(editorModifierKeysChanged(modifiers));
    if (e.key === "Alt") {
      e.preventDefault();
    }
  }, []);

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

  React.useEffect(() => {
    let animationFrame: number | null = null;

    function render() {
      animationFrame = null;

      if (!canvasRef.current) {
        return;
      }

      const state = store.getState();
      const entitiesByKey = entitiesByKeySelector(state);
      const selectedEntityKeys = selectedEntityKeysSelector(state);
      const offsetX = editorOffsetXSelector(state);
      const offsetY = editorOffsetYSelector(state);
      const zoomFactor = editorZoomFactorSelector(state);
      const dragMoveOffset = dragMoveOffsetSelector(state);
      const damageRect = editorDamageRectSelector(state);

      if (!damageRect) {
        // Nothing to redraw
        return;
      }

      // Redraw a little outside the damage in case we cleared an entity partially in the rect
      const redrawRect: Rectangle = {
        p1: {
          x: damageRect.p1.x - LargestEntityRadius,
          y: damageRect.p1.y - LargestEntityRadius,
        },
        p2: {
          x: damageRect.p2.x + LargestEntityRadius,
          y: damageRect.p2.y + LargestEntityRadius,
        },
      };

      const ctx = canvasRef.current.getContext("2d")!;

      const clearClientP1 = worldToClientSelector(state, damageRect.p1);
      const clearClientP2 = worldToClientSelector(state, damageRect.p2);
      const clearRect = normalizeRectangle(clearClientP1, clearClientP2);
      ctx.clearRect(
        Math.max(0, clearRect.p1.x),
        Math.max(0, clearRect.p1.y),
        Math.min(ctx.canvas.width, clearRect.p2.x - clearRect.p1.x),
        Math.min(ctx.canvas.height, clearRect.p2.y - clearRect.p1.y)
      );

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

        let renderCount = 0;
        for (const key of Object.keys(entitiesByKey)) {
          const entity = entitiesByKey[key];
          if (!pointIntersectsRect(entity, redrawRect)) {
            continue;
          }
          const isSelected = selectedEntityKeys.includes(key);
          if (dragMoveOffset != null && isSelected) {
            continue;
          }
          renderCount++;
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

      dispatch(editorRendered());
    }

    function requestRender() {
      if (animationFrame != null) {
        return;
      }
      animationFrame = requestAnimationFrame(render);
    }

    const unsubscribe = store.subscribe(requestRender);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      tabIndex={-1}
      className={classNames(className, styles["map-canvas"])}
      ref={(ref) => {
        canvasRef.current = ref;
        dropRef(ref);
      }}
      width={viewportWidth}
      height={viewportHeight}
      onMouseEnter={onMouseEnter}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />
  );
};

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
      // This should apply a blue effect on the entity, but it doesn't seem to be taking.
      /*
      ctx.filter =
        "brightness(0) saturate(100%) invert(58%) sepia(97%) saturate(2398%) hue-rotate(155deg) brightness(86%) contrast(101%);";
      */
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
