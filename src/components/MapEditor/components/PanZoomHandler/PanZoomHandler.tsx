import * as React from "react";
import classNames from "classnames";

import { useComponentBounds } from "@/hooks/use-component-bounds";
import { useNativeEvent } from "@/hooks/use-native-event";

import { useViewportContext } from "../../contexts/viewport-context";

import style from "./PanZoomHandler.module.css";
import { getModifiers } from "@/modifier-keys";

const SCALE_FACTOR = 1.07;
const SCROLL_FACTOR = 0.5;

export interface PanZoomHandlerProps {
  className?: string;
  children: React.ReactNode;
}

const PanZoomHandler = ({ className, children }: PanZoomHandlerProps) => {
  const setInitialZoomRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const containerBounds = useComponentBounds(containerRef);

  const { zoomFactor, translateX, translateY, setZoomFactor, offset } =
    useViewportContext();

  // Wait for the initial render and default the zoom to fill the screen.
  // This might take a few render passes before we get a value.
  React.useLayoutEffect(() => {
    if (!setInitialZoomRef.current && containerBounds.width > 20) {
      setInitialZoomRef.current = true;
      setZoomFactor((containerBounds.width - 20) / 120);
    }
  });

  const onWheel = React.useCallback(
    (e: WheelEvent) => {
      const target = containerRef.current;
      if (!target || e.defaultPrevented) {
        return;
      }

      const modifiers = getModifiers(e);

      if (modifiers.ctrlMetaKey) {
        const nextZoom =
          e.deltaY < 0 ? zoomFactor * SCALE_FACTOR : zoomFactor / SCALE_FACTOR;
        setZoomFactor(nextZoom);

        e.preventDefault();
        e.stopPropagation();
      } else if (modifiers.shiftKey) {
        offset((-e.deltaY * SCROLL_FACTOR) / zoomFactor, 0);
      } else {
        offset(0, (-e.deltaY * SCROLL_FACTOR) / zoomFactor);
      }
    },
    [zoomFactor, translateX, translateY]
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
