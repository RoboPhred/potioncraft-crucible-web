import * as React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import { getModifiers } from "@/modifier-keys";

import { useComponentBounds } from "@/hooks/use-component-bounds";
import { useNativeEvent } from "@/hooks/use-native-event";
import { useSelector } from "@/hooks/use-selector";

import { editorZoomFactorSelector } from "@/services/editor-view/selectors/view";

import { editorViewportResize } from "@/actions/editor-viewport-resize";
import { editorZoom } from "@/actions/editor-zoom";
import { editorPan } from "@/actions/editor-pan";

import style from "./PanZoomHandler.module.css";

export interface PanZoomHandlerProps {
  className?: string;
  children: React.ReactNode;
}

export const ZOOM_FACTOR = 1.07;
export const PAN_FACTOR = 0.5;

const PanZoomHandler = ({ className, children }: PanZoomHandlerProps) => {
  const dispatch = useDispatch();
  const zoomFactor = useSelector(editorZoomFactorSelector);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const containerBounds = useComponentBounds(containerRef);

  React.useLayoutEffect(() => {
    dispatch(
      editorViewportResize(containerBounds.width, containerBounds.height)
    );
  }, [containerBounds.width, containerBounds.height]);

  const onWheel = React.useCallback(
    (e: WheelEvent) => {
      const target = containerRef.current;
      if (!target || e.defaultPrevented) {
        return;
      }

      const modifiers = getModifiers(e);

      if (modifiers.ctrlMetaKey) {
        const nextZoom =
          e.deltaY < 0 ? zoomFactor * ZOOM_FACTOR : zoomFactor / ZOOM_FACTOR;
        dispatch(editorZoom(nextZoom));
        e.preventDefault();
        e.stopPropagation();
      } else if (modifiers.shiftKey) {
        dispatch(editorPan((e.deltaY * PAN_FACTOR) / zoomFactor, 0));
        e.preventDefault();
        e.stopPropagation();
      } else {
        dispatch(editorPan(0, (e.deltaY * PAN_FACTOR) / zoomFactor));
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [zoomFactor]
  );

  // React listens to the root listener for all events,
  //  and chrome assumes the root event listener for mouse events
  //  never wants to preventDefault.
  // We need to take a local event listener and mark it as not passive.
  // https://github.com/facebook/react/issues/14856
  useNativeEvent(containerRef, "wheel", onWheel, { passive: false });

  return (
    <div
      className={classNames(className, style["pan-zoom-handler"])}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default PanZoomHandler;
