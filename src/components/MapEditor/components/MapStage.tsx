import * as React from "react";
import Konva from "konva";
import { useDispatch } from "react-redux";

import { getModifiers } from "@/modifier-keys";
import { Point } from "@/geometry";

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

import ReduxStage from "@/components/ReduxStage";

import EntitiesLayer from "./EntitiesLayer";
import SelectRectLayer from "./SelectionRectLayer";

const MapStage = () => {
  const viewportWidth = useSelector(editorViewportWidthSelector);
  const viewportHeight = useSelector(editorViewportHeightSelector);

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

  const { startTracking } = useMouseDragDetector({
    onClick,
    onDragStart,
  });
  const onMouseDown = React.useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      startTracking(e.evt);
    },
    [startTracking]
  );

  const onMouseMove = React.useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (isDragging && e.evt.buttons === 0) {
        // It would be nice if we could take a mouse capture and get notified
        // of the mouse up elsewhere, but we need to allow other circuit editors
        // to receive the mouse events so the drag can transfer.
        // As a second best, detect mouse up when it comes back into us and cancel.
        dispatch(editorDragAbort());
        return;
      }

      const coords = clientToWorld({ x: e.evt.clientX, y: e.evt.clientY });
      const modifierKeys = getModifiers(e.evt);
      dispatch(editorDragContinue(coords, modifierKeys));
    },
    [clientToWorld]
  );

  const onMouseUp = React.useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const coords = clientToWorld({ x: e.evt.clientX, y: e.evt.clientY });
      const modifierKeys = getModifiers(e.evt);
      dispatch(editorDragEnd(coords, modifierKeys));
    },
    [dispatch, clientToWorld]
  );

  return (
    <ReduxStage
      width={viewportWidth}
      height={viewportHeight}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <EntitiesLayer />
      <SelectRectLayer />
    </ReduxStage>
  );
};

export default MapStage;
