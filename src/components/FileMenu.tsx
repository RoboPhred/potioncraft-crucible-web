import React from "react";

import { mapConfigLoadBlank } from "@/actions/map-config-load-blank";
import { mapConfigLoadTemplate } from "@/actions/map-config-load-template";

import { useClickAction } from "@/hooks/use-action";

import Menu from "@/components/Menus/Menu";
import MenuItem from "@/components/Menus/MenuItem";
import DividerMenuItem from "@/components/Menus/DividerMenuItem";
import SubMenuItem from "@/components/Menus/SubMenuItem";
import AbstractLoadButton from "./AbstractLoadButton";

const FileMenu = () => {
  const onNewBlankMap = useClickAction(mapConfigLoadBlank);
  return (
    <Menu>
      <MenuItem onClick={onNewBlankMap}>New Blank Map</MenuItem>
      <SubMenuItem content={<MapFromTemplateMenu />}>
        New Map from Template
      </SubMenuItem>
      <DividerMenuItem />
      <AbstractLoadButton>
        {({ disabled, onClick }) => (
          <MenuItem
            autoDismissMenu={false}
            disabled={disabled}
            onClick={onClick}
          >
            Load Map
          </MenuItem>
        )}
      </AbstractLoadButton>
    </Menu>
  );
};

const MapFromTemplateMenu = () => {
  const onNewWaterMap = useClickAction(mapConfigLoadTemplate, "water");
  const onNewOilMap = useClickAction(mapConfigLoadTemplate, "oil");
  return (
    <Menu>
      <MenuItem onClick={onNewWaterMap}>Water</MenuItem>
      <MenuItem onClick={onNewOilMap}>Oil</MenuItem>
    </Menu>
  );
};

export default FileMenu;
