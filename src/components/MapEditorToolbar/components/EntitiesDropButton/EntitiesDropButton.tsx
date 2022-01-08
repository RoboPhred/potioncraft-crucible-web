import * as React from "react";

import Button from "@/components/Button";

import EntitiesDropList from "./EntitiesDropList";

import { useBooleanSetState } from "@/hooks/use-boolean-state";

import { SpawnableEntityPrototype } from "@/services/map-entitiy-prototypes/types";

import Popper from "@/components/Popper";
import { MenuCloseListener } from "@/components/Menus/MenuCloseContext";

export interface EntitiesDropButtonProps {
  entityPrototypes: SpawnableEntityPrototype[];
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
      <Button variant="primary" ref={anchorEl} onClick={setOpen}>
        {children}
      </Button>
      <Popper
        anchorEl={anchorEl.current}
        isOpen={isOpen}
        placement="bottom-start"
        onRequestClose={setClosed}
      >
        {isOpen && <EntitiesDropList entityPrototypes={entityPrototypes} />}
      </Popper>
    </MenuCloseListener>
  );
};

export default EntitiesDropButton;
