import * as React from "react";
import classNames from "classnames";

import styles from "./DragPreview.module.css";

import { renderEntity, transformToMap } from "@/canvas";

import { useSelector } from "@/hooks/use-selector";

import { entitiesByKeySelector } from "@/services/map-editor/entities/selectors/entities";
import { selectedEntityKeysSelector } from "@/services/map-editor/selection/selectors/selection";
import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "@/services/map-editor/view/selectors/view";
import { dragMoveOffsetSelector } from "@/services/map-editor/mouse/selectors/drag-move";
import {
  editorViewportHeightSelector,
  editorViewportWidthSelector,
} from "@/services/map-editor/view/selectors/viewport";
import { renderResourcesSelector } from "@/services/map-entitiy-prototypes/selectors/render-resources";

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
  const renderResources = useSelector(renderResourcesSelector);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d")!;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    transformToMap(ctx, zoomFactor, offsetX, offsetY, () => {
      if (dragMoveOffset != null) {
        ctx.translate(dragMoveOffset.x, dragMoveOffset.y);
        for (const key of selectedEntityKeys) {
          const entity = entitiesByKey[key];
          renderEntity(ctx, entity, true, renderResources);
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
