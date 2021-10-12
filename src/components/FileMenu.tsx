import React from "react";
import { useTranslation } from "react-i18next";

import { mapConfigLoadBlank } from "@/actions/map-config-load-blank";
import { mapConfigLoadTemplate } from "@/actions/map-config-load-template";

import { useClickAction } from "@/hooks/use-action";

import Menu from "@/components/Menus/Menu";
import MenuItem from "@/components/Menus/MenuItem";
import DividerMenuItem from "@/components/Menus/DividerMenuItem";
import SubMenuItem from "@/components/Menus/SubMenuItem";

import AbstractLoadButton from "./AbstractLoadButton";

const FileMenu = () => {
  const { t } = useTranslation();
  const onNewBlankMap = useClickAction(mapConfigLoadBlank);
  return (
    <Menu>
      <MenuItem onClick={onNewBlankMap}>
        {t("menus.file.new_map.blank")}
      </MenuItem>
      <SubMenuItem content={<MapFromTemplateMenu />}>
        {t("menus.file.new_map.template")}
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
  const { t } = useTranslation();
  const onNewWaterMap = useClickAction(mapConfigLoadTemplate, "water");
  const onNewOilMap = useClickAction(mapConfigLoadTemplate, "oil");
  return (
    <Menu>
      <MenuItem onClick={onNewWaterMap}>
        {t("potioncraft:bases.water_titlecase")}
      </MenuItem>
      <MenuItem onClick={onNewOilMap}>
        {t("potioncraft:bases.oil_titlecase")}
      </MenuItem>
    </Menu>
  );
};

export default FileMenu;
