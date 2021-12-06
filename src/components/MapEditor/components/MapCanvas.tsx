import * as React from "react";
import { useDispatch, useStore } from "react-redux";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { getModifiers } from "@/modifier-keys";
import { normalizeRectangle, pointIntersectsRect, Rectangle } from "@/geometry";

import { renderEntity, renderPotionStart, transformToMap } from "@/canvas";

import {
  DRAGOBJECT_NEW_ENTITY,
  isNewEntityDragObject,
} from "@/drag-items/new-entity";

import { LargestEntityRadius } from "@/entities";

import { useSelector } from "@/hooks/use-selector";
import { useComponentBounds } from "@/hooks/use-component-bounds";
import { mapEditorMouseDown } from "@/actions/potionbase-map-editor/mouse-down";
import { mapEditorMouseMove } from "@/actions/potionbase-map-editor/mouse-move";
import { mapEditorMouseUp } from "@/actions/potionbase-map-editor/mouse-up";
import { mapEditorEntityPrototypeInstantiate } from "@/actions/potionbase-map-editor/entity-prototype-instantiate";
import { mapEditorModifierKeysChanged } from "@/actions/potionbase-map-editor/modifierkeys-changed";
import { mapEditorRendered } from "@/actions/potionbase-map-editor/rendered";

import {
  editorViewportHeightSelector,
  editorViewportWidthSelector,
} from "@/services/map-editor/view/selectors/viewport";
import { useClientToWorld } from "@/services/map-editor/view/hooks/use-client-to-world";
import { entitiesByKeySelector } from "@/services/map-editor/entities/selectors/entities";
import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "@/services/map-editor/view/selectors/view";
import { selectedEntityKeysSelector } from "@/services/map-editor/selection/selectors/selection";
import { dragMoveOffsetSelector } from "@/services/map-editor/mouse/selectors/drag-move";
import { editorDamageRectSelector } from "@/services/map-editor/damage/selector/damage";
import { worldToClientSelector } from "@/services/map-editor/view/selectors/coordinate-mapping";

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
      dispatch(mapEditorMouseDown(p, modifiers));
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
      dispatch(mapEditorMouseMove(p, modifiers));
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
      dispatch(mapEditorMouseUp(p, modifiers));
    },
    [eventCanvasPoint]
  );

  const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    const modifiers = getModifiers(e);
    dispatch(mapEditorModifierKeysChanged(modifiers));
    if (e.key === "Alt") {
      e.preventDefault();
    }
  }, []);

  const onKeyUp = React.useCallback((e: React.KeyboardEvent) => {
    const modifiers = getModifiers(e);
    dispatch(mapEditorModifierKeysChanged(modifiers));
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
        dispatch(mapEditorEntityPrototypeInstantiate(prototype, worldP));
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
      let damageRect = editorDamageRectSelector(state);

      if (!damageRect) {
        // Nothing to redraw
        return;
      }

      // Increment the damage rect to account for entity radius that needs to be cleared.
      // TODO: Restrict this to the visible viewport.
      damageRect = {
        p1: {
          x: damageRect.p1.x - LargestEntityRadius,
          y: damageRect.p1.y - LargestEntityRadius,
        },
        p2: {
          x: damageRect.p2.x + LargestEntityRadius,
          y: damageRect.p2.y + LargestEntityRadius,
        },
      };

      // Increment redraw yet again to redraw entities that were partially cut by the clear
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
      });

      dispatch(mapEditorRendered());
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

export default MapCanvas;
