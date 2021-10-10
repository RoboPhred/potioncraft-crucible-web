import * as React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { entitityKeysSelector } from "@/services/map-config/selectors/entities";

import { useNativeEvent } from "@/hooks/use-native-event";
import { useComponentBounds } from "@/hooks/use-component-bounds";

import { ViewportContextProvider } from "./contexts/viewport-context";
import MapBorder from "./components/MapBorder";

import Entity from "./components/Entity";

import styles from "./MapEditor.module.css";
import PotionOrigin from "./components/PotionOrigin";

const SCALE_FACTOR = 1.07;

const fieldWidth = 120;
const fieldHeight = 120;

const MapEditor = () => {
  const entitiyKeys = useSelector(entitityKeysSelector);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const containerBounds = useComponentBounds(containerRef);
  const [zoomFactor, setZoomFactor] = React.useState(0);

  // Wait for the initial render and default the zoom to fill the screen.
  // This might take a few render passes before we get a value.
  React.useLayoutEffect(() => {
    if (zoomFactor === 0 && containerBounds.width > 20) {
      setZoomFactor((containerBounds.width - 20) / 120);
    }
  });

  const width = Math.max(800, fieldWidth * zoomFactor);
  const height = Math.max(800, fieldHeight * zoomFactor);

  const onWheel = React.useCallback(
    (e: WheelEvent) => {
      const target = containerRef.current;
      if (!target || e.defaultPrevented) {
        return;
      }

      if (e.ctrlKey) {
        const nextZoom =
          e.deltaY < 0 ? zoomFactor * SCALE_FACTOR : zoomFactor / SCALE_FACTOR;
        setZoomFactor(nextZoom);

        // FIXME: This sucks.
        // It doesnt zoom centered on the mouse, but seems leak to the left on both zoom in and zoom out.
        // It also randomly throws the scroll position by sigificant amounts, possibly when the browser runs two wheel events before re-rendering.
        // const rawX = e.clientX + target.scrollLeft;
        // const rawY = e.clientY + target.scrollTop;
        // const mouseFieldX = rawX * zoomFactor;
        // const mouseFieldY = rawY * zoomFactor;
        // const nextFieldX = rawX * nextZoom;
        // const nextFieldY = rawY * nextZoom;
        // // Shouldn't this divide by the next zoom?  Things get much less accurate when we do...  Especially on zooming out.
        // const diffX = (nextFieldX - mouseFieldX) / zoomFactor;
        // const diffY = (nextFieldY - mouseFieldY) / zoomFactor;
        // // Part of the problem might be we are immediately applying the scroll but actually resizing waits until
        // // the browser has rendered, but the same problems happen if we defer this to a layout effect.
        // target.scrollLeft += diffX;
        // target.scrollTop += diffY;

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

  const entityComponents = React.useMemo(
    () => entitiyKeys.map((key) => <Entity key={key} entityId={key} />),
    [entitiyKeys]
  );

  return (
    <div
      ref={containerRef}
      className={classNames("map-editor", styles["map-editor"])}
    >
      <ViewportContextProvider
        zoomFactor={zoomFactor}
        setZoomFactor={setZoomFactor}
      >
        <svg
          width={`${width}px`}
          height={`${height}px`}
          transform={`scale(1,-1)`}
        >
          <g transform={`scale(${zoomFactor}) translate(60,60)`}>
            <MapBorder />
            <PotionOrigin />
            {entityComponents}
          </g>
        </svg>
      </ViewportContextProvider>
    </div>
  );
};

export default MapEditor;
