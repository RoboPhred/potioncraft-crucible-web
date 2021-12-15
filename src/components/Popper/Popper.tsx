import * as React from "react";
import { createPortal } from "react-dom";

import { Options, VirtualElement } from "@popperjs/core";
import { usePopper } from "react-popper";

import { useOutsideMouseEvent } from "@/hooks/use-outside-mouse-event";
import { useArrayState } from "@/hooks/use-array-state";

import {
  PopperChildContextProvider,
  usePopperChild,
} from "./PopperChildContext";

export interface PopperProps {
  anchorEl: Element | VirtualElement | null;
  placement?: Options["placement"];
  isOpen: boolean;
  onRequestClose?(): void;
}

const noop = () => {
  /*no op*/
};

const Popper: React.FC<PopperProps> = ({
  isOpen,
  anchorEl,
  placement = "auto",
  onRequestClose = noop,
  children,
}) => {
  const [popperRef, setPopperRef] = React.useState<HTMLDivElement | null>(null);
  const { attributes, styles } = usePopper(
    isOpen ? anchorEl : null,
    popperRef,
    {
      placement,
    }
  );

  // Register us as a child of a parent popper, if any is present.
  usePopperChild(popperRef);

  const [popperChildren, registerPopperChild, unregisterPopperChild] =
    useArrayState<HTMLElement>();

  // Close when a click happens on the outside.
  // We still want to handle this even if we are a child, as the user
  // may have clicked on a parent popper which should close us.
  const insideRefs = React.useMemo(
    () => [popperRef, ...popperChildren],
    [popperChildren, popperRef]
  );
  useOutsideMouseEvent(insideRefs, onRequestClose);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <PopperChildContextProvider
      registerPopperChild={registerPopperChild}
      unregisterPopperChild={unregisterPopperChild}
    >
      <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
        {children}
      </div>
    </PopperChildContextProvider>,
    document.body
  );
};

export default Popper;
