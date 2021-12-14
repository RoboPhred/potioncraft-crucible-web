import * as React from "react";

import Button from "@/components/Button";
import AutoPopover from "@/components/AutoPopover";

import EntitiesDropList from "./EntitiesDropList";

import { DropButtonEntityPrefab } from "./types";
import { useBooleanSetState } from "@/hooks/use-boolean-state";
import Popover from "@/components/Popover";
import { MenuCloseListener } from "@/components/Menus/MenuCloseContext";

export interface EntitiesDropButtonProps {
  entityPrototypes: DropButtonEntityPrefab[];
  children: React.ReactNode;
}

const EntitiesDropButton = ({
  entityPrototypes,
  children,
}: EntitiesDropButtonProps) => {
  const anchorEl = React.useRef<HTMLButtonElement | null>(null);

  const [isOpen, setOpen, setClosed] = useBooleanSetState();

  return (
    <MenuCloseListener onClose={setClosed}>
      <Button ref={anchorEl} onClick={setOpen}>
        {children}
      </Button>
      <Popover
        anchorEl={anchorEl.current}
        isOpen={isOpen}
        placement="bottom-start"
        onRequestClose={setClosed}
      >
        {isOpen && <EntitiesDropList entityPrototypes={entityPrototypes} />}
      </Popover>
    </MenuCloseListener>
  );
};

export default EntitiesDropButton;
