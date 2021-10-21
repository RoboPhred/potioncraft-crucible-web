import * as React from "react";
import classNames from "classnames";

import styles from "./DragPreview.module.css";

import { renderEntity, transformToMap } from "@/canvas";

import { useSelector } from "@/hooks/use-selector";

import { entitiesByKeySelector } from "@/services/map-entities/selectors/entities";
import { selectedEntityKeysSelector } from "@/services/editor-selection/selectors/selection";
import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "@/services/editor-view/selectors/view";
import { dragMoveOffsetSelector } from "@/services/editor-mouse/selectors/drag-move";
import {
  editorViewportHeightSelector,
  editorViewportWidthSelector,
} from "@/services/editor-view/selectors/viewport";

export interface DragPreviewProps {
  className?: string;
}
const DragPreview = ({ className }: DragPreviewProps) => {
  const entitiesByKey = useSelector(entitiesByKeySelector);
  const selectedEntityKeys = useSelector(selectedEntityKeysSelector);
  const offsetX = useSelector(editorOffsetXSelector);
  const offsetY = useSelector(editorOffsetYSelector);
  const zoomFactor = useSelector(editorZoomFactorSelector);
  const viewportWidth = useSelector(editorViewportWidthSelector);
  const viewportHeight = useSelector(editorViewportHeightSelector);
  const dragMoveOffset = useSelector(dragMoveOffsetSelector);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d")!;

    console.log("Redrawing drag preview");

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    transformToMap(ctx, zoomFactor, offsetX, offsetY, () => {
      if (dragMoveOffset != null) {
        ctx.translate(dragMoveOffset.x, dragMoveOffset.y);
        for (const key of selectedEntityKeys) {
          const entity = entitiesByKey[key];
          renderEntity(ctx, entity, true);
        }
      }
    });
  }, [
    entitiesByKey,
    selectedEntityKeys,
    offsetX,
    offsetY,
    zoomFactor,
    dragMoveOffset,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={classNames(className, styles["drag-preview"])}
      width={viewportWidth}
      height={viewportHeight}
    />
  );
};

export default DragPreview;
