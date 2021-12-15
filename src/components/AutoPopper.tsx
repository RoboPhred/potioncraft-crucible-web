import * as React from "react";
import { Options } from "@popperjs/core";

import Popper from "./Popper";
import { MenuCloseListener } from "./Menus/MenuCloseContext";

export interface AutoPopperProps {
  content: JSX.Element;
  placement?: Options["placement"];
}

const AutoPopper: React.FC<AutoPopperProps> = ({
  content,
  placement,
  children,
}) => {
  const anchorEl = React.useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = React.useState(false);
  const onClick = React.useCallback(() => {
    setOpen(true);
  }, []);
  const onClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <MenuCloseListener onClose={onClose}>
      <div ref={anchorEl} onClick={onClick}>
        {children}
      </div>
      <Popper
        anchorEl={anchorEl.current}
        isOpen={open}
        placement={placement}
        onRequestClose={onClose}
      >
        {open && content}
      </Popper>
    </MenuCloseListener>
  );
};

export default AutoPopper;
