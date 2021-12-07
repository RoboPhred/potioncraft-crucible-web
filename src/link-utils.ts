import history from "@/history";
import { isModifierPressed } from "@/modifier-keys";
import React from "react";

export function useLinkClicked(
  to: string,
  target?: string,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
) {
  return React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(event);
      }

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!target || target === "_self") && // let browser handle "target=_blank" etc.
        !isModifierPressed(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();

        history.push(to);
      }
    },
    [to, target, onClick]
  );
}
