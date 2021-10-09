import React from "react";

export interface UseControlledScroll {
  scrollX: number;
  scrollY: number;
  scrollTo(x: number, y: number): void;
}

export function useControlledScroll(
  ref: React.RefObject<HTMLElement>
): UseControlledScroll {
  const [scrollX, setScrollX] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);

  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    function handleScroll(ev: Event) {
      const htmlElement = ev.currentTarget as HTMLElement;
      setScrollX(htmlElement.scrollLeft);
      setScrollY(htmlElement.scrollTop);
    }
    element.addEventListener("scroll", handleScroll);
    return () => element!.removeEventListener("scroll", handleScroll);
  });

  const scrollTo = React.useCallback((x: number, y: number) => {
    const element = ref.current;
    if (element) {
      element.scrollTo({ left: x, top: y });
    }
  }, []);

  return {
    scrollX,
    scrollY,
    scrollTo,
  };
}
