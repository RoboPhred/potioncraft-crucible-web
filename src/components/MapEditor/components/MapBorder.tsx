import * as React from "react";

import { useViewportContext } from "../contexts/viewport-context";

const MapBorder = () => {
  const { zoomFactor } = useViewportContext();
  const counterZoom = 1 / zoomFactor;
  return (
    <rect
      stroke="black"
      strokeWidth={1 * counterZoom}
      strokeDasharray={`${5 * counterZoom},${5 * counterZoom}`}
      fill="none"
      x="-60"
      y="-60"
      width="120"
      height="120"
    />
  );
};

export default MapBorder;
