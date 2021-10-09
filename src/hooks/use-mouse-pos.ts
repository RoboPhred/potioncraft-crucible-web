import * as React from "react";

export interface UseMousePos {
  x: number;
  y: number;
}

export function useMousePos(ref: React.RefObject<HTMLElement>): UseMousePos {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  React.useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return {
    x,
    y,
  };
}
